'use client';

import React, { useState } from 'react';
import { Zap, Globe, LogIn, Mail, Search, Upload, Camera, MousePointer } from 'lucide-react';

interface QuickAction {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'url' | 'email' | 'password' | 'textarea' | 'file';
    placeholder?: string;
    required?: boolean;
  }>;
  generateActions: (data: Record<string, string>) => any[];
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'quick_login',
    name: '快速登录',
    description: '快速创建登录表单自动化',
    icon: <LogIn className="w-5 h-5" />,
    category: '表单操作',
    fields: [
      { name: 'url', label: '登录页面URL', type: 'url', placeholder: 'https://example.com/login', required: true },
      { name: 'username', label: '用户名', type: 'text', placeholder: '输入用户名', required: true },
      { name: 'password', label: '密码', type: 'password', placeholder: '输入密码', required: true },
      { name: 'username_selector', label: '用户名选择器', type: 'text', placeholder: 'input[name="username"]' },
      { name: 'password_selector', label: '密码选择器', type: 'text', placeholder: 'input[name="password"]' },
      { name: 'submit_selector', label: '提交按钮选择器', type: 'text', placeholder: 'button[type="submit"]' }
    ],
    generateActions: (data) => [
      {
        id: `fill_username_${Date.now()}`,
        action_type: 'fill_input',
        selector_type: 'css',
        selector_value: data.username_selector || 'input[name="username"]',
        input_value: data.username,
        description: '填写用户名',
        wait_time: 1,
        retry_count: 3,
        timeout: 10
      },
      {
        id: `fill_password_${Date.now() + 1}`,
        action_type: 'fill_input',
        selector_type: 'css',
        selector_value: data.password_selector || 'input[name="password"]',
        input_value: data.password,
        description: '填写密码',
        wait_time: 1,
        retry_count: 3,
        timeout: 10
      },
      {
        id: `click_submit_${Date.now() + 2}`,
        action_type: 'click_button',
        selector_type: 'css',
        selector_value: data.submit_selector || 'button[type="submit"]',
        description: '点击登录按钮',
        wait_time: 3,
        retry_count: 3,
        timeout: 10
      }
    ]
  },
  {
    id: 'quick_contact',
    name: '联系表单',
    description: '快速创建联系表单自动化',
    icon: <Mail className="w-5 h-5" />,
    category: '表单操作',
    fields: [
      { name: 'url', label: '表单页面URL', type: 'url', placeholder: 'https://example.com/contact', required: true },
      { name: 'name', label: '姓名', type: 'text', placeholder: '输入姓名', required: true },
      { name: 'email', label: '邮箱', type: 'email', placeholder: 'example@email.com', required: true },
      { name: 'phone', label: '电话', type: 'text', placeholder: '输入电话号码' },
      { name: 'message', label: '留言', type: 'textarea', placeholder: '输入留言内容', required: true }
    ],
    generateActions: (data) => [
      {
        id: `fill_name_${Date.now()}`,
        action_type: 'fill_input',
        selector_type: 'css',
        selector_value: 'input[name="name"]',
        input_value: data.name,
        description: '填写姓名',
        wait_time: 1,
        retry_count: 3,
        timeout: 10
      },
      {
        id: `fill_email_${Date.now() + 1}`,
        action_type: 'fill_input',
        selector_type: 'css',
        selector_value: 'input[name="email"]',
        input_value: data.email,
        description: '填写邮箱',
        wait_time: 1,
        retry_count: 3,
        timeout: 10
      },
      ...(data.phone ? [{
        id: `fill_phone_${Date.now() + 2}`,
        action_type: 'fill_input',
        selector_type: 'css',
        selector_value: 'input[name="phone"]',
        input_value: data.phone,
        description: '填写电话',
        wait_time: 1,
        retry_count: 3,
        timeout: 10
      }] : []),
      {
        id: `fill_message_${Date.now() + 3}`,
        action_type: 'fill_input',
        selector_type: 'css',
        selector_value: 'textarea[name="message"]',
        input_value: data.message,
        description: '填写留言',
        wait_time: 1,
        retry_count: 3,
        timeout: 10
      },
      {
        id: `submit_form_${Date.now() + 4}`,
        action_type: 'submit_form',
        selector_type: 'css',
        selector_value: 'form',
        description: '提交表单',
        wait_time: 3,
        retry_count: 3,
        timeout: 15
      }
    ]
  },
  {
    id: 'quick_search',
    name: '搜索操作',
    description: '在网站上执行搜索操作',
    icon: <Search className="w-5 h-5" />,
    category: '页面操作',
    fields: [
      { name: 'url', label: '搜索页面URL', type: 'url', placeholder: 'https://example.com', required: true },
      { name: 'search_term', label: '搜索关键词', type: 'text', placeholder: '输入搜索内容', required: true },
      { name: 'search_selector', label: '搜索框选择器', type: 'text', placeholder: 'input[name="search"]' },
      { name: 'submit_selector', label: '搜索按钮选择器', type: 'text', placeholder: 'button[type="submit"]' }
    ],
    generateActions: (data) => [
      {
        id: `fill_search_${Date.now()}`,
        action_type: 'fill_input',
        selector_type: 'css',
        selector_value: data.search_selector || 'input[name="search"]',
        input_value: data.search_term,
        description: '填写搜索关键词',
        wait_time: 1,
        retry_count: 3,
        timeout: 10
      },
      {
        id: `click_search_${Date.now() + 1}`,
        action_type: 'click_button',
        selector_type: 'css',
        selector_value: data.submit_selector || 'button[type="submit"]',
        description: '点击搜索按钮',
        wait_time: 3,
        retry_count: 3,
        timeout: 10
      },
      {
        id: `screenshot_results_${Date.now() + 2}`,
        action_type: 'screenshot',
        input_value: 'search_results.png',
        description: '截图保存搜索结果',
        wait_time: 1,
        retry_count: 1,
        timeout: 5
      }
    ]
  },
  {
    id: 'quick_navigate',
    name: '页面导航',
    description: '导航到指定页面并截图',
    icon: <Globe className="w-5 h-5" />,
    category: '页面操作',
    fields: [
      { name: 'url', label: '目标页面URL', type: 'url', placeholder: 'https://example.com', required: true },
      { name: 'wait_time', label: '等待时间(秒)', type: 'text', placeholder: '3' },
      { name: 'screenshot_name', label: '截图文件名', type: 'text', placeholder: 'page_screenshot.png' }
    ],
    generateActions: (data) => [
      {
        id: `navigate_${Date.now()}`,
        action_type: 'navigate',
        input_value: data.url,
        description: '导航到目标页面',
        wait_time: parseInt(data.wait_time) || 3,
        retry_count: 3,
        timeout: 15
      },
      ...(data.screenshot_name ? [{
        id: `screenshot_${Date.now() + 1}`,
        action_type: 'screenshot',
        input_value: data.screenshot_name,
        description: '截图保存页面',
        wait_time: 1,
        retry_count: 1,
        timeout: 5
      }] : [])
    ]
  }
];

interface QuickActionsProps {
  onAddActions: (actions: any[], url?: string) => void;
  onClose: () => void;
}

export default function QuickActions({ onAddActions, onClose }: QuickActionsProps) {
  const [selectedAction, setSelectedAction] = useState<QuickAction | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAction) return;

    // 验证必填字段
    const missingFields = selectedAction.fields
      .filter(field => field.required && !formData[field.name])
      .map(field => field.label);

    if (missingFields.length > 0) {
      alert(`请填写以下必填字段: ${missingFields.join(', ')}`);
      return;
    }

    const actions = selectedAction.generateActions(formData);
    const url = formData.url;
    
    onAddActions(actions, url);
    onClose();
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const categories = [...new Set(QUICK_ACTIONS.map(a => a.category))];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[80vh] overflow-auto m-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Zap className="w-6 h-6 mr-2 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">快速操作</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>

          {!selectedAction ? (
            // 操作选择界面
            <div>
              {categories.map(category => (
                <div key={category} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {QUICK_ACTIONS.filter(a => a.category === category).map(action => (
                      <div
                        key={action.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-300"
                        onClick={() => setSelectedAction(action)}
                      >
                        <div className="flex items-center mb-3">
                          <div className="p-2 bg-blue-100 rounded-lg mr-3">
                            {action.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{action.name}</h4>
                            <p className="text-sm text-gray-600">{action.description}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          {action.fields.length} 个配置项
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 表单填写界面
            <div>
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setSelectedAction(null)}
                  className="mr-4 text-gray-500 hover:text-gray-700"
                >
                  ← 返回
                </button>
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    {selectedAction.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedAction.name}</h3>
                    <p className="text-sm text-gray-600">{selectedAction.description}</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {selectedAction.fields.map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={field.placeholder}
                        rows={3}
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.name] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}

                <div className="flex items-center justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setSelectedAction(null)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    创建操作
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
