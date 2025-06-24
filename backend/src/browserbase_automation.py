"""
Browserbase浏览器表单提交自动化工具
支持多种表单操作和智能等待策略
"""

import asyncio
import json
import time
from typing import Dict, List, Optional, Any, Union
from dataclasses import dataclass
from enum import Enum
import logging

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import httpx


# 配置日志
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ActionType(Enum):
    """表单操作类型枚举"""
    FILL_INPUT = "fill_input"
    CLICK_BUTTON = "click_button"
    SELECT_OPTION = "select_option"
    UPLOAD_FILE = "upload_file"
    WAIT = "wait"
    SCROLL = "scroll"
    HOVER = "hover"
    SUBMIT_FORM = "submit_form"
    NAVIGATE = "navigate"
    SCREENSHOT = "screenshot"


class SelectorType(Enum):
    """选择器类型枚举"""
    ID = "id"
    NAME = "name"
    CLASS = "class"
    CSS = "css"
    XPATH = "xpath"
    TAG = "tag"
    LINK_TEXT = "link_text"
    PARTIAL_LINK_TEXT = "partial_link_text"


@dataclass
class FormAction:
    """表单操作配置"""
    action_type: ActionType
    selector_type: SelectorType
    selector_value: str
    input_value: Optional[str] = None
    wait_time: Optional[int] = None
    description: Optional[str] = None
    retry_count: int = 3
    timeout: int = 10


@dataclass
class AutomationConfig:
    """自动化配置"""
    url: str
    actions: List[FormAction]
    browser_config: Optional[Dict[str, Any]] = None
    global_timeout: int = 30
    screenshot_on_error: bool = True
    headless: bool = True


class BrowserbaseAutomation:
    """Browserbase浏览器自动化工具"""
    
    def __init__(self, api_key: str, project_id: str):
        """
        初始化Browserbase自动化工具
        
        Args:
            api_key: Browserbase API密钥
            project_id: Browserbase项目ID
        """
        self.api_key = api_key
        self.project_id = project_id
        self.base_url = "https://www.browserbase.com/v1"
        self.driver = None
        self.session_id = None
        
    async def create_session(self, config: Optional[Dict[str, Any]] = None) -> str:
        """
        创建浏览器会话
        
        Args:
            config: 浏览器配置
            
        Returns:
            会话ID
        """
        try:
            default_config = {
                "projectId": self.project_id,
                "browserSettings": {
                    "viewport": {"width": 1920, "height": 1080},
                    "fingerprint": True
                }
            }
            
            if config:
                default_config.update(config)
            
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/sessions",
                    json=default_config,
                    headers=headers
                )
                response.raise_for_status()
                
                session_data = response.json()
                self.session_id = session_data.get("id")
                logger.info(f"创建浏览器会话成功: {self.session_id}")
                return self.session_id
                
        except Exception as e:
            logger.error(f"创建浏览器会话失败: {str(e)}")
            raise
    
    async def get_session_info(self, session_id: str) -> Dict[str, Any]:
        """
        获取会话信息
        
        Args:
            session_id: 会话ID
            
        Returns:
            会话信息
        """
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/sessions/{session_id}",
                    headers=headers
                )
                response.raise_for_status()
                return response.json()
                
        except Exception as e:
            logger.error(f"获取会话信息失败: {str(e)}")
            raise
    
    async def end_session(self, session_id: str) -> bool:
        """
        结束浏览器会话
        
        Args:
            session_id: 会话ID
            
        Returns:
            是否成功
        """
        try:
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            async with httpx.AsyncClient() as client:
                response = await client.delete(
                    f"{self.base_url}/sessions/{session_id}",
                    headers=headers
                )
                response.raise_for_status()
                logger.info(f"结束浏览器会话成功: {session_id}")
                return True
                
        except Exception as e:
            logger.error(f"结束浏览器会话失败: {str(e)}")
            return False
    
    def setup_driver(self, session_url: str) -> webdriver.Remote:
        """
        设置Selenium WebDriver
        
        Args:
            session_url: 浏览器会话URL
            
        Returns:
            WebDriver实例
        """
        try:
            options = webdriver.ChromeOptions()
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            
            self.driver = webdriver.Remote(
                command_executor=session_url,
                options=options
            )
            
            logger.info("WebDriver设置成功")
            return self.driver
            
        except Exception as e:
            logger.error(f"WebDriver设置失败: {str(e)}")
            raise
    
    def get_element(self, selector_type: SelectorType, selector_value: str, timeout: int = 10):
        """
        获取页面元素
        
        Args:
            selector_type: 选择器类型
            selector_value: 选择器值
            timeout: 超时时间
            
        Returns:
            WebElement对象
        """
        wait = WebDriverWait(self.driver, timeout)
        
        selector_map = {
            SelectorType.ID: By.ID,
            SelectorType.NAME: By.NAME,
            SelectorType.CLASS: By.CLASS_NAME,
            SelectorType.CSS: By.CSS_SELECTOR,
            SelectorType.XPATH: By.XPATH,
            SelectorType.TAG: By.TAG_NAME,
            SelectorType.LINK_TEXT: By.LINK_TEXT,
            SelectorType.PARTIAL_LINK_TEXT: By.PARTIAL_LINK_TEXT
        }
        
        by_type = selector_map.get(selector_type)
        if not by_type:
            raise ValueError(f"不支持的选择器类型: {selector_type}")
        
        try:
            element = wait.until(EC.presence_of_element_located((by_type, selector_value)))
            return element
        except TimeoutException:
            logger.error(f"元素未找到: {selector_type.value}='{selector_value}'")
            raise
    
    def execute_action(self, action: FormAction) -> bool:
        """
        执行单个表单操作
        
        Args:
            action: 表单操作配置
            
        Returns:
            操作是否成功
        """
        try:
            logger.info(f"执行操作: {action.description or action.action_type.value}")
            
            if action.action_type == ActionType.NAVIGATE:
                self.driver.get(action.input_value)
                return True
            
            elif action.action_type == ActionType.WAIT:
                time.sleep(action.wait_time or 1)
                return True
            
            elif action.action_type == ActionType.SCREENSHOT:
                screenshot_path = action.input_value or f"screenshot_{int(time.time())}.png"
                self.driver.save_screenshot(screenshot_path)
                logger.info(f"截图保存至: {screenshot_path}")
                return True
            
            # 需要元素的操作
            element = self.get_element(
                action.selector_type, 
                action.selector_value, 
                action.timeout
            )
            
            if action.action_type == ActionType.FILL_INPUT:
                element.clear()
                element.send_keys(action.input_value or "")
                
            elif action.action_type == ActionType.CLICK_BUTTON:
                # 等待元素可点击
                wait = WebDriverWait(self.driver, action.timeout)
                clickable_element = wait.until(
                    EC.element_to_be_clickable((
                        self._get_by_type(action.selector_type), 
                        action.selector_value
                    ))
                )
                clickable_element.click()
                
            elif action.action_type == ActionType.SELECT_OPTION:
                select = Select(element)
                if action.input_value.isdigit():
                    select.select_by_index(int(action.input_value))
                else:
                    try:
                        select.select_by_value(action.input_value)
                    except NoSuchElementException:
                        select.select_by_visible_text(action.input_value)
                        
            elif action.action_type == ActionType.UPLOAD_FILE:
                element.send_keys(action.input_value)
                
            elif action.action_type == ActionType.HOVER:
                actions = ActionChains(self.driver)
                actions.move_to_element(element).perform()
                
            elif action.action_type == ActionType.SCROLL:
                self.driver.execute_script("arguments[0].scrollIntoView();", element)
                
            elif action.action_type == ActionType.SUBMIT_FORM:
                element.submit()
            
            # 操作后等待
            if action.wait_time:
                time.sleep(action.wait_time)
                
            return True
            
        except Exception as e:
            logger.error(f"操作执行失败: {str(e)}")
            return False
    
    def _get_by_type(self, selector_type: SelectorType):
        """获取Selenium By类型"""
        selector_map = {
            SelectorType.ID: By.ID,
            SelectorType.NAME: By.NAME,
            SelectorType.CLASS: By.CLASS_NAME,
            SelectorType.CSS: By.CSS_SELECTOR,
            SelectorType.XPATH: By.XPATH,
            SelectorType.TAG: By.TAG_NAME,
            SelectorType.LINK_TEXT: By.LINK_TEXT,
            SelectorType.PARTIAL_LINK_TEXT: By.PARTIAL_LINK_TEXT
        }
        return selector_map.get(selector_type)
    
    async def run_automation(self, config: AutomationConfig) -> Dict[str, Any]:
        """
        运行自动化流程
        
        Args:
            config: 自动化配置
            
        Returns:
            执行结果
        """
        results = {
            "success": False,
            "session_id": None,
            "executed_actions": 0,
            "failed_actions": 0,
            "errors": [],
            "screenshots": []
        }
        
        try:
            # 创建浏览器会话
            session_id = await self.create_session(config.browser_config)
            results["session_id"] = session_id
            
            # 获取会话连接URL
            session_info = await self.get_session_info(session_id)
            session_url = session_info.get("connectUrl")
            
            if not session_url:
                raise Exception("无法获取会话连接URL")
            
            # 设置WebDriver
            self.setup_driver(session_url)
            
            # 导航到目标URL
            self.driver.get(config.url)
            logger.info(f"导航到: {config.url}")
            
            # 执行操作序列
            for i, action in enumerate(config.actions):
                retry_count = 0
                success = False
                
                while retry_count < action.retry_count and not success:
                    try:
                        success = self.execute_action(action)
                        if success:
                            results["executed_actions"] += 1
                            logger.info(f"操作 {i+1} 执行成功")
                        else:
                            retry_count += 1
                            if retry_count < action.retry_count:
                                logger.warning(f"操作 {i+1} 失败，重试 {retry_count}/{action.retry_count}")
                                time.sleep(1)
                    except Exception as e:
                        retry_count += 1
                        error_msg = f"操作 {i+1} 执行异常: {str(e)}"
                        logger.error(error_msg)
                        results["errors"].append(error_msg)
                        
                        if config.screenshot_on_error:
                            screenshot_path = f"error_screenshot_{i+1}_{int(time.time())}.png"
                            try:
                                self.driver.save_screenshot(screenshot_path)
                                results["screenshots"].append(screenshot_path)
                            except:
                                pass
                        
                        if retry_count < action.retry_count:
                            time.sleep(2)
                
                if not success:
                    results["failed_actions"] += 1
                    logger.error(f"操作 {i+1} 最终失败")
            
            # 最终截图
            final_screenshot = f"final_screenshot_{int(time.time())}.png"
            try:
                self.driver.save_screenshot(final_screenshot)
                results["screenshots"].append(final_screenshot)
            except:
                pass
            
            results["success"] = results["failed_actions"] == 0
            
        except Exception as e:
            error_msg = f"自动化流程执行失败: {str(e)}"
            logger.error(error_msg)
            results["errors"].append(error_msg)
            
        finally:
            # 清理资源
            if self.driver:
                try:
                    self.driver.quit()
                except:
                    pass
            
            # 结束浏览器会话
            if self.session_id:
                try:
                    await self.end_session(self.session_id)
                except:
                    pass
        
        return results
    
    def create_form_config_from_json(self, json_config: str) -> AutomationConfig:
        """
        从JSON配置创建自动化配置
        
        Args:
            json_config: JSON格式的配置字符串
            
        Returns:
            AutomationConfig对象
        """
        try:
            config_dict = json.loads(json_config)
            
            actions = []
            for action_dict in config_dict.get("actions", []):
                action = FormAction(
                    action_type=ActionType(action_dict["action_type"]),
                    selector_type=SelectorType(action_dict["selector_type"]),
                    selector_value=action_dict["selector_value"],
                    input_value=action_dict.get("input_value"),
                    wait_time=action_dict.get("wait_time"),
                    description=action_dict.get("description"),
                    retry_count=action_dict.get("retry_count", 3),
                    timeout=action_dict.get("timeout", 10)
                )
                actions.append(action)
            
            return AutomationConfig(
                url=config_dict["url"],
                actions=actions,
                browser_config=config_dict.get("browser_config"),
                global_timeout=config_dict.get("global_timeout", 30),
                screenshot_on_error=config_dict.get("screenshot_on_error", True),
                headless=config_dict.get("headless", True)
            )
            
        except Exception as e:
            logger.error(f"解析JSON配置失败: {str(e)}")
            raise


# 便捷函数
def create_login_automation(url: str, username: str, password: str, 
                          username_selector: str = "input[name='username']",
                          password_selector: str = "input[name='password']",
                          submit_selector: str = "input[type='submit']") -> AutomationConfig:
    """
    创建登录表单自动化配置
    
    Args:
        url: 登录页面URL
        username: 用户名
        password: 密码
        username_selector: 用户名输入框选择器
        password_selector: 密码输入框选择器
        submit_selector: 提交按钮选择器
        
    Returns:
        AutomationConfig对象
    """
    actions = [
        FormAction(
            action_type=ActionType.FILL_INPUT,
            selector_type=SelectorType.CSS,
            selector_value=username_selector,
            input_value=username,
            description="填写用户名"
        ),
        FormAction(
            action_type=ActionType.FILL_INPUT,
            selector_type=SelectorType.CSS,
            selector_value=password_selector,
            input_value=password,
            description="填写密码"
        ),
        FormAction(
            action_type=ActionType.CLICK_BUTTON,
            selector_type=SelectorType.CSS,
            selector_value=submit_selector,
            description="点击登录按钮",
            wait_time=2
        )
    ]
    
    return AutomationConfig(url=url, actions=actions)


def create_contact_form_automation(url: str, form_data: Dict[str, str]) -> AutomationConfig:
    """
    创建联系表单自动化配置
    
    Args:
        url: 表单页面URL
        form_data: 表单数据字典
        
    Returns:
        AutomationConfig对象
    """
    actions = []
    
    # 常见表单字段映射
    field_mapping = {
        "name": "input[name='name'], input[id='name']",
        "email": "input[name='email'], input[id='email']",
        "phone": "input[name='phone'], input[id='phone']",
        "message": "textarea[name='message'], textarea[id='message']",
        "subject": "input[name='subject'], input[id='subject']"
    }
    
    for field, value in form_data.items():
        selector = field_mapping.get(field, f"input[name='{field}']")
        
        action = FormAction(
            action_type=ActionType.FILL_INPUT,
            selector_type=SelectorType.CSS,
            selector_value=selector,
            input_value=value,
            description=f"填写{field}字段"
        )
        actions.append(action)
    
    # 添加提交操作
    actions.append(FormAction(
        action_type=ActionType.CLICK_BUTTON,
        selector_type=SelectorType.CSS,
        selector_value="input[type='submit'], button[type='submit']",
        description="提交表单",
        wait_time=3
    ))
    
    return AutomationConfig(url=url, actions=actions)
