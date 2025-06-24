# Browserbase浏览器表单提交自动化工具

这是一个基于Browserbase的浏览器表单提交自动化工具，集成到n8n-lite项目中，提供强大的浏览器自动化功能。

## 功能特性

- 🚀 基于Browserbase云浏览器服务
- 📝 支持各种表单操作（填写、点击、选择、上传等）
- 🔄 智能重试机制和错误处理
- 📸 自动截图和错误记录
- 🎯 多种元素选择器支持
- ⚡ 异步执行支持
- 🛠️ 预设常用表单模板

## 支持的操作类型

### 基础操作
- `fill_input` - 填写输入框
- `click_button` - 点击按钮
- `select_option` - 选择下拉选项
- `upload_file` - 上传文件
- `submit_form` - 提交表单

### 导航操作
- `navigate` - 页面导航
- `wait` - 等待
- `scroll` - 滚动
- `hover` - 悬停

### 辅助操作
- `screenshot` - 截图

## 支持的选择器类型

- `id` - ID选择器
- `name` - Name属性选择器
- `class` - Class选择器
- `css` - CSS选择器
- `xpath` - XPath选择器
- `tag` - 标签选择器
- `link_text` - 链接文本选择器
- `partial_link_text` - 部分链接文本选择器

## API接口

### 1. 执行自动化任务

**POST** `/browserbase/execute`

```json
{
  "browserbase_config": {
    "api_key": "your_browserbase_api_key",
    "project_id": "your_project_id"
  },
  "automation_config": {
    "url": "https://example.com/form",
    "actions": [
      {
        "action_type": "fill_input",
        "selector_type": "css",
        "selector_value": "input[name='username']",
        "input_value": "your_username",
        "description": "填写用户名"
      },
      {
        "action_type": "click_button",
        "selector_type": "css",
        "selector_value": "button[type='submit']",
        "description": "提交表单",
        "wait_time": 2
      }
    ],
    "screenshot_on_error": true,
    "headless": true
  }
}
```

### 2. 异步执行任务

**POST** `/browserbase/execute-async`

返回任务ID，可通过 `/browserbase/task/{task_id}` 查询状态。

### 3. 登录表单自动化

**POST** `/browserbase/login`

```json
{
  "browserbase_config": {
    "api_key": "your_api_key",
    "project_id": "your_project_id"
  },
  "url": "https://example.com/login",
  "username": "your_username",
  "password": "your_password",
  "username_selector": "input[name='username']",
  "password_selector": "input[name='password']",
  "submit_selector": "button[type='submit']"
}
```

### 4. 联系表单自动化

**POST** `/browserbase/contact-form`

```json
{
  "browserbase_config": {
    "api_key": "your_api_key",
    "project_id": "your_project_id"
  },
  "url": "https://example.com/contact",
  "form_data": {
    "name": "张三",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "message": "这是一条测试消息"
  }
}
```

### 5. 获取可用操作类型

**GET** `/browserbase/actions`

### 6. 验证配置

**POST** `/browserbase/validate-config`

## 使用示例

### Python代码示例

```python
import asyncio
import httpx

async def run_login_automation():
    """运行登录自动化示例"""
    
    config = {
        "browserbase_config": {
            "api_key": "your_browserbase_api_key",
            "project_id": "your_project_id"
        },
        "url": "https://example.com/login",
        "username": "your_username",
        "password": "your_password"
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/browserbase/login",
            json=config
        )
        
        result = response.json()
        print(f"执行结果: {result}")

# 运行示例
asyncio.run(run_login_automation())
```

### 复杂表单示例

```python
complex_form_config = {
    "browserbase_config": {
        "api_key": "your_api_key",
        "project_id": "your_project_id"
    },
    "automation_config": {
        "url": "https://example.com/complex-form",
        "actions": [
            # 填写个人信息
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
            
            # 选择下拉选项
            {
                "action_type": "select_option",
                "selector_type": "id",
                "selector_value": "country",
                "input_value": "中国",
                "description": "选择国家"
            },
            
            # 上传文件
            {
                "action_type": "upload_file",
                "selector_type": "css",
                "selector_value": "input[type='file']",
                "input_value": "/path/to/document.pdf",
                "description": "上传文档"
            },
            
            # 等待处理
            {
                "action_type": "wait",
                "wait_time": 3,
                "description": "等待文件上传完成"
            },
            
            # 提交表单
            {
                "action_type": "click_button",
                "selector_type": "css",
                "selector_value": "button[type='submit']",
                "description": "提交表单",
                "wait_time": 5
            },
            
            # 截图保存结果
            {
                "action_type": "screenshot",
                "input_value": "form_submission_result.png",
                "description": "截图保存提交结果"
            }
        ],
        "global_timeout": 60,
        "screenshot_on_error": true
    }
}
```

## 配置参数说明

### AutomationConfig参数

- `url`: 目标页面URL
- `actions`: 操作列表
- `browser_config`: 浏览器配置（可选）
- `global_timeout`: 全局超时时间（秒）
- `screenshot_on_error`: 错误时是否截图
- `headless`: 是否使用无头模式

### FormAction参数

- `action_type`: 操作类型
- `selector_type`: 选择器类型
- `selector_value`: 选择器值
- `input_value`: 输入值（可选）
- `wait_time`: 操作后等待时间（可选）
- `description`: 操作描述（可选）
- `retry_count`: 重试次数（默认3次）
- `timeout`: 单个操作超时时间（默认10秒）

## 错误处理

工具提供了完善的错误处理机制：

1. **重试机制**: 每个操作支持自定义重试次数
2. **超时控制**: 全局和单个操作的超时设置
3. **错误截图**: 自动保存错误时的页面截图
4. **详细日志**: 记录每个操作的执行状态和错误信息

## 最佳实践

1. **选择器优先级**: 推荐使用稳定的选择器（ID > Name > CSS）
2. **等待时间**: 为动态内容设置适当的等待时间
3. **错误处理**: 启用错误截图便于调试
4. **重试策略**: 为不稳定的操作增加重试次数
5. **超时设置**: 根据页面加载速度调整超时时间

## 安装和配置

1. 安装依赖：
```bash
pip install -r requirements.txt
```

2. 获取Browserbase API密钥：
   - 访问 [Browserbase](https://browserbase.com)
   - 创建账户并获取API密钥和项目ID

3. 启动服务：
```bash
cd backend
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

4. 访问API文档：
   - Swagger UI: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

## 注意事项

- 确保Browserbase账户有足够的配额
- 某些网站可能有反爬虫机制，需要调整策略
- 文件上传路径必须是绝对路径
- 敏感信息（如密码）建议通过环境变量传递

## 故障排除

### 常见问题

1. **元素未找到**
   - 检查选择器是否正确
   - 增加等待时间
   - 使用更稳定的选择器

2. **操作超时**
   - 增加timeout参数
   - 检查网络连接
   - 确认页面是否正常加载

3. **文件上传失败**
   - 确认文件路径正确
   - 检查文件权限
   - 验证文件格式是否支持

4. **表单提交失败**
   - 检查必填字段是否已填写
   - 确认表单验证规则
   - 查看错误截图分析问题

## 技术支持

如有问题或建议，请提交Issue或联系开发团队。
