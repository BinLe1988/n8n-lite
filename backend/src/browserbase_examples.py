"""
Browserbase自动化工具使用示例
包含各种常见场景的配置示例
"""

import json
from .browserbase_automation import (
    AutomationConfig, 
    FormAction, 
    ActionType, 
    SelectorType,
    create_login_automation,
    create_contact_form_automation
)


def get_login_example():
    """登录表单示例"""
    return {
        "description": "登录表单自动化示例",
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
            ],
            "screenshot_on_error": True,
            "headless": False
        }
    }


def get_contact_form_example():
    """联系表单示例"""
    return {
        "description": "联系表单自动化示例",
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
                    "selector_value": "phone",
                    "input_value": "13800138000",
                    "description": "填写电话"
                },
                {
                    "action_type": "select_option",
                    "selector_type": "id",
                    "selector_value": "subject",
                    "input_value": "技术支持",
                    "description": "选择主题"
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


def get_file_upload_example():
    """文件上传示例"""
    return {
        "description": "文件上传表单示例",
        "config": {
            "url": "https://example.com/upload",
            "actions": [
                {
                    "action_type": "upload_file",
                    "selector_type": "css",
                    "selector_value": "input[type='file']",
                    "input_value": "/path/to/your/file.pdf",
                    "description": "上传文件"
                },
                {
                    "action_type": "wait",
                    "wait_time": 2,
                    "description": "等待文件上传"
                },
                {
                    "action_type": "click_button",
                    "selector_type": "id",
                    "selector_value": "upload-btn",
                    "description": "点击上传按钮"
                }
            ]
        }
    }


def get_multi_step_form_example():
    """多步骤表单示例"""
    return {
        "description": "多步骤表单自动化示例",
        "config": {
            "url": "https://example.com/multi-step-form",
            "actions": [
                # 第一步：个人信息
                {
                    "action_type": "fill_input",
                    "selector_type": "id",
                    "selector_value": "firstName",
                    "input_value": "张",
                    "description": "填写名字"
                },
                {
                    "action_type": "fill_input",
                    "selector_type": "id",
                    "selector_value": "lastName",
                    "input_value": "三",
                    "description": "填写姓氏"
                },
                {
                    "action_type": "click_button",
                    "selector_type": "id",
                    "selector_value": "next-step-1",
                    "description": "进入下一步",
                    "wait_time": 1
                },
                
                # 第二步：联系信息
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
                    "selector_value": "phone",
                    "input_value": "13800138000",
                    "description": "填写电话"
                },
                {
                    "action_type": "click_button",
                    "selector_type": "id",
                    "selector_value": "next-step-2",
                    "description": "进入下一步",
                    "wait_time": 1
                },
                
                # 第三步：确认提交
                {
                    "action_type": "click_button",
                    "selector_type": "id",
                    "selector_value": "submit-form",
                    "description": "提交表单",
                    "wait_time": 3
                }
            ]
        }
    }


def get_search_and_filter_example():
    """搜索和筛选示例"""
    return {
        "description": "搜索和筛选操作示例",
        "config": {
            "url": "https://example.com/search",
            "actions": [
                {
                    "action_type": "fill_input",
                    "selector_type": "css",
                    "selector_value": "input[name='search']",
                    "input_value": "Python开发",
                    "description": "输入搜索关键词"
                },
                {
                    "action_type": "click_button",
                    "selector_type": "css",
                    "selector_value": "button[type='submit']",
                    "description": "点击搜索按钮",
                    "wait_time": 2
                },
                {
                    "action_type": "select_option",
                    "selector_type": "id",
                    "selector_value": "category-filter",
                    "input_value": "技术",
                    "description": "选择分类筛选"
                },
                {
                    "action_type": "select_option",
                    "selector_type": "id",
                    "selector_value": "sort-by",
                    "input_value": "最新",
                    "description": "选择排序方式"
                },
                {
                    "action_type": "wait",
                    "wait_time": 2,
                    "description": "等待结果加载"
                },
                {
                    "action_type": "screenshot",
                    "input_value": "search_results.png",
                    "description": "截图保存搜索结果"
                }
            ]
        }
    }


def get_dynamic_content_example():
    """动态内容处理示例"""
    return {
        "description": "处理动态加载内容的示例",
        "config": {
            "url": "https://example.com/dynamic",
            "actions": [
                {
                    "action_type": "click_button",
                    "selector_type": "id",
                    "selector_value": "load-more",
                    "description": "点击加载更多",
                    "wait_time": 3,
                    "timeout": 15
                },
                {
                    "action_type": "scroll",
                    "selector_type": "css",
                    "selector_value": ".content-area",
                    "description": "滚动到内容区域"
                },
                {
                    "action_type": "hover",
                    "selector_type": "css",
                    "selector_value": ".dropdown-trigger",
                    "description": "悬停显示下拉菜单"
                },
                {
                    "action_type": "click_button",
                    "selector_type": "css",
                    "selector_value": ".dropdown-item:nth-child(2)",
                    "description": "点击下拉菜单项",
                    "wait_time": 1
                }
            ],
            "global_timeout": 45
        }
    }


def get_api_request_example():
    """API请求示例（用于测试）"""
    return {
        "browserbase_config": {
            "api_key": "your_browserbase_api_key",
            "project_id": "your_project_id"
        },
        "automation_config": get_login_example()["config"]
    }


def get_all_examples():
    """获取所有示例"""
    return {
        "login": get_login_example(),
        "contact_form": get_contact_form_example(),
        "file_upload": get_file_upload_example(),
        "multi_step_form": get_multi_step_form_example(),
        "search_and_filter": get_search_and_filter_example(),
        "dynamic_content": get_dynamic_content_example(),
        "api_request": get_api_request_example()
    }


def save_examples_to_file(filename: str = "browserbase_examples.json"):
    """将示例保存到JSON文件"""
    examples = get_all_examples()
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(examples, f, ensure_ascii=False, indent=2)
    
    print(f"示例已保存到: {filename}")


if __name__ == "__main__":
    # 保存示例到文件
    save_examples_to_file()
    
    # 打印登录示例
    print("登录表单示例:")
    print(json.dumps(get_login_example(), ensure_ascii=False, indent=2))
