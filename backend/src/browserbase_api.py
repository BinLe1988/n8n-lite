"""
Browserbase自动化工具的API接口
提供RESTful API来执行浏览器自动化任务
"""

from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
import asyncio
import json
import os
from datetime import datetime

from .browserbase_automation import (
    BrowserbaseAutomation, 
    AutomationConfig, 
    FormAction, 
    ActionType, 
    SelectorType,
    create_login_automation,
    create_contact_form_automation
)

# 创建路由器
router = APIRouter(prefix="/browserbase", tags=["browserbase"])

# Pydantic模型定义
class FormActionModel(BaseModel):
    """表单操作模型"""
    action_type: str = Field(..., description="操作类型")
    selector_type: str = Field(..., description="选择器类型")
    selector_value: str = Field(..., description="选择器值")
    input_value: Optional[str] = Field(None, description="输入值")
    wait_time: Optional[int] = Field(None, description="等待时间(秒)")
    description: Optional[str] = Field(None, description="操作描述")
    retry_count: int = Field(3, description="重试次数")
    timeout: int = Field(10, description="超时时间(秒)")


class AutomationConfigModel(BaseModel):
    """自动化配置模型"""
    url: str = Field(..., description="目标URL")
    actions: List[FormActionModel] = Field(..., description="操作列表")
    browser_config: Optional[Dict[str, Any]] = Field(None, description="浏览器配置")
    global_timeout: int = Field(30, description="全局超时时间(秒)")
    screenshot_on_error: bool = Field(True, description="错误时截图")
    headless: bool = Field(True, description="无头模式")


class LoginFormModel(BaseModel):
    """登录表单模型"""
    url: str = Field(..., description="登录页面URL")
    username: str = Field(..., description="用户名")
    password: str = Field(..., description="密码")
    username_selector: str = Field("input[name='username']", description="用户名选择器")
    password_selector: str = Field("input[name='password']", description="密码选择器")
    submit_selector: str = Field("input[type='submit']", description="提交按钮选择器")


class ContactFormModel(BaseModel):
    """联系表单模型"""
    url: str = Field(..., description="表单页面URL")
    form_data: Dict[str, str] = Field(..., description="表单数据")


class BrowserbaseConfigModel(BaseModel):
    """Browserbase配置模型"""
    api_key: str = Field(..., description="Browserbase API密钥")
    project_id: str = Field(..., description="Browserbase项目ID")


class AutomationRequestModel(BaseModel):
    """自动化请求模型"""
    browserbase_config: BrowserbaseConfigModel
    automation_config: AutomationConfigModel


class AutomationResponseModel(BaseModel):
    """自动化响应模型"""
    success: bool
    session_id: Optional[str]
    executed_actions: int
    failed_actions: int
    errors: List[str]
    screenshots: List[str]
    execution_time: Optional[float]
    timestamp: str


# 全局变量存储任务状态
automation_tasks = {}


@router.post("/execute", response_model=AutomationResponseModel)
async def execute_automation(request: AutomationRequestModel):
    """
    执行浏览器自动化任务
    
    Args:
        request: 自动化请求配置
        
    Returns:
        执行结果
    """
    try:
        # 创建自动化工具实例
        automation = BrowserbaseAutomation(
            api_key=request.browserbase_config.api_key,
            project_id=request.browserbase_config.project_id
        )
        
        # 转换配置
        config = _convert_to_automation_config(request.automation_config)
        
        # 记录开始时间
        start_time = datetime.now()
        
        # 执行自动化
        result = await automation.run_automation(config)
        
        # 计算执行时间
        execution_time = (datetime.now() - start_time).total_seconds()
        
        # 构建响应
        response = AutomationResponseModel(
            success=result["success"],
            session_id=result["session_id"],
            executed_actions=result["executed_actions"],
            failed_actions=result["failed_actions"],
            errors=result["errors"],
            screenshots=result["screenshots"],
            execution_time=execution_time,
            timestamp=datetime.now().isoformat()
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"自动化执行失败: {str(e)}")


@router.post("/execute-async")
async def execute_automation_async(request: AutomationRequestModel, background_tasks: BackgroundTasks):
    """
    异步执行浏览器自动化任务
    
    Args:
        request: 自动化请求配置
        background_tasks: 后台任务
        
    Returns:
        任务ID
    """
    import uuid
    
    task_id = str(uuid.uuid4())
    
    # 初始化任务状态
    automation_tasks[task_id] = {
        "status": "pending",
        "result": None,
        "error": None,
        "created_at": datetime.now().isoformat()
    }
    
    # 添加后台任务
    background_tasks.add_task(_execute_automation_background, task_id, request)
    
    return {"task_id": task_id, "status": "pending"}


@router.get("/task/{task_id}")
async def get_task_status(task_id: str):
    """
    获取异步任务状态
    
    Args:
        task_id: 任务ID
        
    Returns:
        任务状态
    """
    if task_id not in automation_tasks:
        raise HTTPException(status_code=404, detail="任务不存在")
    
    return automation_tasks[task_id]


@router.post("/login", response_model=AutomationResponseModel)
async def execute_login_automation(
    browserbase_config: BrowserbaseConfigModel,
    login_form: LoginFormModel
):
    """
    执行登录表单自动化
    
    Args:
        browserbase_config: Browserbase配置
        login_form: 登录表单配置
        
    Returns:
        执行结果
    """
    try:
        # 创建自动化工具实例
        automation = BrowserbaseAutomation(
            api_key=browserbase_config.api_key,
            project_id=browserbase_config.project_id
        )
        
        # 创建登录自动化配置
        config = create_login_automation(
            url=login_form.url,
            username=login_form.username,
            password=login_form.password,
            username_selector=login_form.username_selector,
            password_selector=login_form.password_selector,
            submit_selector=login_form.submit_selector
        )
        
        # 记录开始时间
        start_time = datetime.now()
        
        # 执行自动化
        result = await automation.run_automation(config)
        
        # 计算执行时间
        execution_time = (datetime.now() - start_time).total_seconds()
        
        # 构建响应
        response = AutomationResponseModel(
            success=result["success"],
            session_id=result["session_id"],
            executed_actions=result["executed_actions"],
            failed_actions=result["failed_actions"],
            errors=result["errors"],
            screenshots=result["screenshots"],
            execution_time=execution_time,
            timestamp=datetime.now().isoformat()
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"登录自动化执行失败: {str(e)}")


@router.post("/contact-form", response_model=AutomationResponseModel)
async def execute_contact_form_automation(
    browserbase_config: BrowserbaseConfigModel,
    contact_form: ContactFormModel
):
    """
    执行联系表单自动化
    
    Args:
        browserbase_config: Browserbase配置
        contact_form: 联系表单配置
        
    Returns:
        执行结果
    """
    try:
        # 创建自动化工具实例
        automation = BrowserbaseAutomation(
            api_key=browserbase_config.api_key,
            project_id=browserbase_config.project_id
        )
        
        # 创建联系表单自动化配置
        config = create_contact_form_automation(
            url=contact_form.url,
            form_data=contact_form.form_data
        )
        
        # 记录开始时间
        start_time = datetime.now()
        
        # 执行自动化
        result = await automation.run_automation(config)
        
        # 计算执行时间
        execution_time = (datetime.now() - start_time).total_seconds()
        
        # 构建响应
        response = AutomationResponseModel(
            success=result["success"],
            session_id=result["session_id"],
            executed_actions=result["executed_actions"],
            failed_actions=result["failed_actions"],
            errors=result["errors"],
            screenshots=result["screenshots"],
            execution_time=execution_time,
            timestamp=datetime.now().isoformat()
        )
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"联系表单自动化执行失败: {str(e)}")


@router.get("/actions")
async def get_available_actions():
    """
    获取可用的操作类型
    
    Returns:
        操作类型列表
    """
    return {
        "action_types": [action.value for action in ActionType],
        "selector_types": [selector.value for selector in SelectorType]
    }


@router.post("/validate-config")
async def validate_automation_config(config: AutomationConfigModel):
    """
    验证自动化配置
    
    Args:
        config: 自动化配置
        
    Returns:
        验证结果
    """
    try:
        # 转换配置以验证
        automation_config = _convert_to_automation_config(config)
        
        return {
            "valid": True,
            "message": "配置验证成功",
            "actions_count": len(automation_config.actions)
        }
        
    except Exception as e:
        return {
            "valid": False,
            "message": f"配置验证失败: {str(e)}"
        }


# 辅助函数
def _convert_to_automation_config(config_model: AutomationConfigModel) -> AutomationConfig:
    """
    将Pydantic模型转换为AutomationConfig
    
    Args:
        config_model: Pydantic配置模型
        
    Returns:
        AutomationConfig对象
    """
    actions = []
    
    for action_model in config_model.actions:
        action = FormAction(
            action_type=ActionType(action_model.action_type),
            selector_type=SelectorType(action_model.selector_type),
            selector_value=action_model.selector_value,
            input_value=action_model.input_value,
            wait_time=action_model.wait_time,
            description=action_model.description,
            retry_count=action_model.retry_count,
            timeout=action_model.timeout
        )
        actions.append(action)
    
    return AutomationConfig(
        url=config_model.url,
        actions=actions,
        browser_config=config_model.browser_config,
        global_timeout=config_model.global_timeout,
        screenshot_on_error=config_model.screenshot_on_error,
        headless=config_model.headless
    )


async def _execute_automation_background(task_id: str, request: AutomationRequestModel):
    """
    后台执行自动化任务
    
    Args:
        task_id: 任务ID
        request: 自动化请求
    """
    try:
        # 更新任务状态
        automation_tasks[task_id]["status"] = "running"
        
        # 创建自动化工具实例
        automation = BrowserbaseAutomation(
            api_key=request.browserbase_config.api_key,
            project_id=request.browserbase_config.project_id
        )
        
        # 转换配置
        config = _convert_to_automation_config(request.automation_config)
        
        # 记录开始时间
        start_time = datetime.now()
        
        # 执行自动化
        result = await automation.run_automation(config)
        
        # 计算执行时间
        execution_time = (datetime.now() - start_time).total_seconds()
        
        # 构建响应
        response = {
            "success": result["success"],
            "session_id": result["session_id"],
            "executed_actions": result["executed_actions"],
            "failed_actions": result["failed_actions"],
            "errors": result["errors"],
            "screenshots": result["screenshots"],
            "execution_time": execution_time,
            "timestamp": datetime.now().isoformat()
        }
        
        # 更新任务状态
        automation_tasks[task_id]["status"] = "completed"
        automation_tasks[task_id]["result"] = response
        
    except Exception as e:
        # 更新任务状态为失败
        automation_tasks[task_id]["status"] = "failed"
        automation_tasks[task_id]["error"] = str(e)
