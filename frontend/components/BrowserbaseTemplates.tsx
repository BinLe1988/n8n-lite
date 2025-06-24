'use client';

import React from 'react';
import { FileText, LogIn, Mail, ShoppingCart, Search, Download } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  config: {
    url: string;
    actions: any[];
    global_timeout: number;
    screenshot_on_error: boolean;
    headless: boolean;
  };
}

const TEMPLATES: Template[] = [
  {
    id: 'login_form',
    name: '登录表单',
    description: '自动填写用户名密码并登录',
    icon: <LogIn className="w-6 h-6" />,
    category: '表单操作',
    config: {
      url: 'https://example.com/login',
      actions: [
        {
          id: 'fill_username',
          action_type: 'fill_input',
          selector_type: 'css',
          selector_value: 'input[name="username"]',
          input_value: '{{username}}',
          description: '填写用户名',
          wait_time: 1,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'fill_password',
          action_type: 'fill_input',
          selector_type: 'css',
          selector_value: 'input[name="password"]',
          input_value: '{{password}}',
          description: '填写密码',
          wait_time: 1,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'click_login',
          action_type: 'click_button',
          selector_type: 'css',
          selector_value: 'button[type="submit"]',
          description: '点击登录按钮',
          wait_time: 3,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'screenshot_result',
          action_type: 'screenshot',
          input_value: 'login_result.png',
          description: '截图保存登录结果',
          wait_time: 1,
          retry_count: 1,
          timeout: 5
        }
      ],
      global_timeout: 60,
      screenshot_on_error: true,
      headless: true
    }
  },
  {
    id: 'contact_form',
    name: '联系表单',
    description: '填写联系表单并提交',
    icon: <Mail className="w-6 h-6" />,
    category: '表单操作',
    config: {
      url: 'https://example.com/contact',
      actions: [
        {
          id: 'fill_name',
          action_type: 'fill_input',
          selector_type: 'css',
          selector_value: 'input[name="name"]',
          input_value: '{{name}}',
          description: '填写姓名',
          wait_time: 1,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'fill_email',
          action_type: 'fill_input',
          selector_type: 'css',
          selector_value: 'input[name="email"]',
          input_value: '{{email}}',
          description: '填写邮箱',
          wait_time: 1,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'fill_phone',
          action_type: 'fill_input',
          selector_type: 'css',
          selector_value: 'input[name="phone"]',
          input_value: '{{phone}}',
          description: '填写电话',
          wait_time: 1,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'fill_message',
          action_type: 'fill_input',
          selector_type: 'css',
          selector_value: 'textarea[name="message"]',
          input_value: '{{message}}',
          description: '填写留言',
          wait_time: 1,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'submit_form',
          action_type: 'submit_form',
          selector_type: 'css',
          selector_value: 'form',
          description: '提交表单',
          wait_time: 3,
          retry_count: 3,
          timeout: 15
        }
      ],
      global_timeout: 60,
      screenshot_on_error: true,
      headless: true
    }
  },
  {
    id: 'search_and_extract',
    name: '搜索并提取',
    description: '在网站上搜索内容并提取结果',
    icon: <Search className="w-6 h-6" />,
    category: '数据提取',
    config: {
      url: 'https://example.com',
      actions: [
        {
          id: 'fill_search',
          action_type: 'fill_input',
          selector_type: 'css',
          selector_value: 'input[name="search"]',
          input_value: '{{search_term}}',
          description: '填写搜索关键词',
          wait_time: 1,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'click_search',
          action_type: 'click_button',
          selector_type: 'css',
          selector_value: 'button[type="submit"]',
          description: '点击搜索按钮',
          wait_time: 3,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'wait_results',
          action_type: 'wait',
          wait_time: 3,
          description: '等待搜索结果加载',
          retry_count: 1,
          timeout: 5
        },
        {
          id: 'screenshot_results',
          action_type: 'screenshot',
          input_value: 'search_results.png',
          description: '截图保存搜索结果',
          wait_time: 1,
          retry_count: 1,
          timeout: 5
        }
      ],
      global_timeout: 60,
      screenshot_on_error: true,
      headless: true
    }
  },
  {
    id: 'file_upload',
    name: '文件上传',
    description: '上传文件到指定网站',
    icon: <Download className="w-6 h-6" />,
    category: '文件操作',
    config: {
      url: 'https://example.com/upload',
      actions: [
        {
          id: 'select_file',
          action_type: 'upload_file',
          selector_type: 'css',
          selector_value: 'input[type="file"]',
          input_value: '{{file_path}}',
          description: '选择要上传的文件',
          wait_time: 2,
          retry_count: 3,
          timeout: 15
        },
        {
          id: 'wait_upload',
          action_type: 'wait',
          wait_time: 5,
          description: '等待文件上传完成',
          retry_count: 1,
          timeout: 10
        },
        {
          id: 'click_upload',
          action_type: 'click_button',
          selector_type: 'css',
          selector_value: 'button[type="submit"]',
          description: '点击上传按钮',
          wait_time: 3,
          retry_count: 3,
          timeout: 20
        },
        {
          id: 'screenshot_result',
          action_type: 'screenshot',
          input_value: 'upload_result.png',
          description: '截图保存上传结果',
          wait_time: 1,
          retry_count: 1,
          timeout: 5
        }
      ],
      global_timeout: 120,
      screenshot_on_error: true,
      headless: true
    }
  },
  {
    id: 'multi_page_navigation',
    name: '多页面导航',
    description: '在多个页面间导航并执行操作',
    icon: <FileText className="w-6 h-6" />,
    category: '页面导航',
    config: {
      url: 'https://example.com/page1',
      actions: [
        {
          id: 'screenshot_page1',
          action_type: 'screenshot',
          input_value: 'page1.png',
          description: '截图第一页',
          wait_time: 2,
          retry_count: 1,
          timeout: 5
        },
        {
          id: 'navigate_page2',
          action_type: 'navigate',
          input_value: 'https://example.com/page2',
          description: '导航到第二页',
          wait_time: 3,
          retry_count: 3,
          timeout: 15
        },
        {
          id: 'fill_form_page2',
          action_type: 'fill_input',
          selector_type: 'css',
          selector_value: 'input[name="data"]',
          input_value: '{{form_data}}',
          description: '在第二页填写表单',
          wait_time: 1,
          retry_count: 3,
          timeout: 10
        },
        {
          id: 'submit_page2',
          action_type: 'click_button',
          selector_type: 'css',
          selector_value: 'button[type="submit"]',
          description: '提交第二页表单',
          wait_time: 3,
          retry_count: 3,
          timeout: 15
        },
        {
          id: 'screenshot_final',
          action_type: 'screenshot',
          input_value: 'final_result.png',
          description: '截图最终结果',
          wait_time: 1,
          retry_count: 1,
          timeout: 5
        }
      ],
      global_timeout: 120,
      screenshot_on_error: true,
      headless: true
    }
  }
];

interface BrowserbaseTemplatesProps {
  onSelectTemplate: (template: Template) => void;
  onClose: () => void;
}

export default function BrowserbaseTemplates({ onSelectTemplate, onClose }: BrowserbaseTemplatesProps) {
  const categories = [...new Set(TEMPLATES.map(t => t.category))];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl max-h-[80vh] overflow-auto m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">选择自动化模板</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>

          {categories.map(category => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TEMPLATES.filter(t => t.category === category).map(template => (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onSelectTemplate(template)}
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg mr-3">
                        {template.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{template.name}</h4>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {template.config.actions.length} 个操作步骤
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">使用说明</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 选择模板后，可以根据需要修改配置</li>
              <li>• 模板中的 {`{{变量名}}`} 需要替换为实际值</li>
              <li>• 建议先在测试环境验证模板的有效性</li>
              <li>• 可以基于模板创建自定义的自动化流程</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
