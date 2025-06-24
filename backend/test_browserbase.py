#!/usr/bin/env python3
"""
Browserbase自动化工具测试脚本
用于测试各种自动化场景
"""

import asyncio
import json
import os
from datetime import datetime

# 设置环境变量
os.environ["PYTHONPATH"] = "/Users/richardl/projects/n8n-lite/backend"

from src.browserbase_automation import (
    BrowserbaseAutomation,
    AutomationConfig,
    FormAction,
    ActionType,
    SelectorType,
    create_login_automation,
    create_contact_form_automation
)


async def test_basic_automation():
    """测试基础自动化功能"""
    print("🧪 测试基础自动化功能...")
    
    # 注意：这里需要替换为真实的API密钥和项目ID
    api_key = "your_browserbase_api_key"
    project_id = "your_project_id"
    
    if api_key == "your_browserbase_api_key":
        print("⚠️  请先设置真实的Browserbase API密钥和项目ID")
        return
    
    try:
        # 创建自动化工具实例
        automation = BrowserbaseAutomation(api_key=api_key, project_id=project_id)
        
        # 创建简单的测试配置
        actions = [
            FormAction(
                action_type=ActionType.NAVIGATE,
                selector_type=SelectorType.CSS,
                selector_value="",
                input_value="https://httpbin.org/forms/post",
                description="导航到测试表单页面"
            ),
            FormAction(
                action_type=ActionType.FILL_INPUT,
                selector_type=SelectorType.CSS,
                selector_value="input[name='custname']",
                input_value="测试用户",
                description="填写客户姓名"
            ),
            FormAction(
                action_type=ActionType.FILL_INPUT,
                selector_type=SelectorType.CSS,
                selector_value="input[name='custtel']",
                input_value="13800138000",
                description="填写电话号码"
            ),
            FormAction(
                action_type=ActionType.FILL_INPUT,
                selector_type=SelectorType.CSS,
                selector_value="input[name='custemail']",
                input_value="test@example.com",
                description="填写邮箱地址"
            ),
            FormAction(
                action_type=ActionType.SELECT_OPTION,
                selector_type=SelectorType.CSS,
                selector_value="select[name='size']",
                input_value="medium",
                description="选择尺寸"
            ),
            FormAction(
                action_type=ActionType.SCREENSHOT,
                selector_type=SelectorType.CSS,
                selector_value="",
                input_value="test_form_filled.png",
                description="截图保存填写结果"
            ),
            FormAction(
                action_type=ActionType.CLICK_BUTTON,
                selector_type=SelectorType.CSS,
                selector_value="input[type='submit']",
                description="提交表单",
                wait_time=3
            ),
            FormAction(
                action_type=ActionType.SCREENSHOT,
                selector_type=SelectorType.CSS,
                selector_value="",
                input_value="test_form_submitted.png",
                description="截图保存提交结果"
            )
        ]
        
        config = AutomationConfig(
            url="https://httpbin.org/forms/post",
            actions=actions,
            screenshot_on_error=True,
            headless=False  # 设置为False以便观察执行过程
        )
        
        # 执行自动化
        result = await automation.run_automation(config)
        
        print("✅ 自动化执行完成")
        print(f"📊 执行结果: {json.dumps(result, ensure_ascii=False, indent=2)}")
        
    except Exception as e:
        print(f"❌ 测试失败: {str(e)}")


def test_config_creation():
    """测试配置创建功能"""
    print("🧪 测试配置创建功能...")
    
    try:
        # 测试登录配置创建
        login_config = create_login_automation(
            url="https://example.com/login",
            username="testuser",
            password="testpass"
        )
        
        print("✅ 登录配置创建成功")
        print(f"📝 登录配置: {len(login_config.actions)} 个操作")
        
        # 测试联系表单配置创建
        contact_config = create_contact_form_automation(
            url="https://example.com/contact",
            form_data={
                "name": "张三",
                "email": "zhangsan@example.com",
                "phone": "13800138000",
                "message": "这是一条测试消息"
            }
        )
        
        print("✅ 联系表单配置创建成功")
        print(f"📝 联系表单配置: {len(contact_config.actions)} 个操作")
        
    except Exception as e:
        print(f"❌ 配置创建测试失败: {str(e)}")


def test_json_config():
    """测试JSON配置解析"""
    print("🧪 测试JSON配置解析...")
    
    try:
        # 创建JSON配置
        json_config = {
            "url": "https://example.com/test",
            "actions": [
                {
                    "action_type": "fill_input",
                    "selector_type": "id",
                    "selector_value": "username",
                    "input_value": "testuser",
                    "description": "填写用户名"
                },
                {
                    "action_type": "click_button",
                    "selector_type": "css",
                    "selector_value": "button[type='submit']",
                    "description": "点击提交按钮",
                    "wait_time": 2
                }
            ],
            "screenshot_on_error": True,
            "headless": True
        }
        
        # 模拟创建自动化工具（不需要真实API密钥）
        automation = BrowserbaseAutomation(api_key="test", project_id="test")
        
        # 解析JSON配置
        config = automation.create_form_config_from_json(json.dumps(json_config))
        
        print("✅ JSON配置解析成功")
        print(f"📝 解析结果: URL={config.url}, 操作数量={len(config.actions)}")
        
        # 验证操作类型
        for i, action in enumerate(config.actions):
            print(f"   操作 {i+1}: {action.action_type.value} - {action.description}")
        
    except Exception as e:
        print(f"❌ JSON配置解析测试失败: {str(e)}")


def test_validation():
    """测试配置验证"""
    print("🧪 测试配置验证...")
    
    try:
        # 测试有效配置
        valid_actions = [
            FormAction(
                action_type=ActionType.FILL_INPUT,
                selector_type=SelectorType.ID,
                selector_value="test",
                input_value="test_value"
            )
        ]
        
        valid_config = AutomationConfig(
            url="https://example.com",
            actions=valid_actions
        )
        
        print("✅ 有效配置创建成功")
        
        # 测试无效配置（这里可以添加更多验证逻辑）
        try:
            invalid_action = FormAction(
                action_type="invalid_action",  # 这会导致错误
                selector_type=SelectorType.ID,
                selector_value="test"
            )
            print("❌ 应该捕获到无效操作类型错误")
        except (ValueError, TypeError) as e:
            print("✅ 成功捕获无效配置错误")
        
    except Exception as e:
        print(f"❌ 配置验证测试失败: {str(e)}")


async def run_all_tests():
    """运行所有测试"""
    print("🚀 开始运行Browserbase自动化工具测试...")
    print("=" * 50)
    
    # 运行配置相关测试（不需要API密钥）
    test_config_creation()
    print()
    
    test_json_config()
    print()
    
    test_validation()
    print()
    
    # 运行实际自动化测试（需要API密钥）
    print("⚠️  以下测试需要真实的Browserbase API密钥:")
    await test_basic_automation()
    
    print("=" * 50)
    print("🎉 测试完成!")


def create_example_configs():
    """创建示例配置文件"""
    print("📝 创建示例配置文件...")
    
    examples = {
        "login_example": {
            "description": "登录表单示例",
            "config": {
                "url": "https://example.com/login",
                "actions": [
                    {
                        "action_type": "fill_input",
                        "selector_type": "css",
                        "selector_value": "input[name='username']",
                        "input_value": "your_username",
                        "description": "填写用户名"
                    },
                    {
                        "action_type": "fill_input",
                        "selector_type": "css",
                        "selector_value": "input[name='password']",
                        "input_value": "your_password",
                        "description": "填写密码"
                    },
                    {
                        "action_type": "click_button",
                        "selector_type": "css",
                        "selector_value": "button[type='submit']",
                        "description": "点击登录按钮",
                        "wait_time": 3
                    }
                ]
            }
        },
        "contact_form_example": {
            "description": "联系表单示例",
            "config": {
                "url": "https://example.com/contact",
                "actions": [
                    {
                        "action_type": "fill_input",
                        "selector_type": "id",
                        "selector_value": "name",
                        "input_value": "张三",
                        "description": "填写姓名"
                    },
                    {
                        "action_type": "fill_input",
                        "selector_type": "id",
                        "selector_value": "email",
                        "input_value": "zhangsan@example.com",
                        "description": "填写邮箱"
                    },
                    {
                        "action_type": "fill_input",
                        "selector_type": "id",
                        "selector_value": "message",
                        "input_value": "这是一条测试消息",
                        "description": "填写消息内容"
                    },
                    {
                        "action_type": "click_button",
                        "selector_type": "css",
                        "selector_value": "input[type='submit']",
                        "description": "提交表单",
                        "wait_time": 2
                    }
                ]
            }
        }
    }
    
    # 保存示例配置
    with open("browserbase_examples.json", "w", encoding="utf-8") as f:
        json.dump(examples, f, ensure_ascii=False, indent=2)
    
    print("✅ 示例配置已保存到 browserbase_examples.json")


if __name__ == "__main__":
    print("Browserbase自动化工具测试脚本")
    print("请选择要执行的操作:")
    print("1. 运行所有测试")
    print("2. 创建示例配置文件")
    print("3. 仅运行配置测试（无需API密钥）")
    
    choice = input("请输入选择 (1-3): ").strip()
    
    if choice == "1":
        asyncio.run(run_all_tests())
    elif choice == "2":
        create_example_configs()
    elif choice == "3":
        print("🧪 运行配置相关测试...")
        test_config_creation()
        print()
        test_json_config()
        print()
        test_validation()
        print("✅ 配置测试完成!")
    else:
        print("❌ 无效选择")
