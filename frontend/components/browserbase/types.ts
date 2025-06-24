// 操作类型定义
export const ACTION_TYPES = {
  fill_input: { name: '填写输入框', icon: '📝', color: 'bg-blue-100 border-blue-300' },
  click_button: { name: '点击按钮', icon: '👆', color: 'bg-green-100 border-green-300' },
  select_option: { name: '选择选项', icon: '📋', color: 'bg-purple-100 border-purple-300' },
  upload_file: { name: '上传文件', icon: '📁', color: 'bg-orange-100 border-orange-300' },
  navigate: { name: '页面导航', icon: '🧭', color: 'bg-indigo-100 border-indigo-300' },
  wait: { name: '等待', icon: '⏱️', color: 'bg-gray-100 border-gray-300' },
  screenshot: { name: '截图', icon: '📸', color: 'bg-pink-100 border-pink-300' },
  scroll: { name: '滚动', icon: '📜', color: 'bg-yellow-100 border-yellow-300' },
  hover: { name: '悬停', icon: '👋', color: 'bg-teal-100 border-teal-300' },
  submit_form: { name: '提交表单', icon: '✅', color: 'bg-emerald-100 border-emerald-300' }
};

export const SELECTOR_TYPES = [
  { value: 'id', label: 'ID选择器' },
  { value: 'name', label: 'Name属性' },
  { value: 'class', label: 'Class选择器' },
  { value: 'css', label: 'CSS选择器' },
  { value: 'xpath', label: 'XPath选择器' },
  { value: 'tag', label: '标签选择器' },
  { value: 'link_text', label: '链接文本' },
  { value: 'partial_link_text', label: '部分链接文本' }
];

export interface FormAction {
  id: string;
  action_type: string;
  selector_type?: string;
  selector_value?: string;
  input_value?: string;
  wait_time?: number;
  description?: string;
  retry_count?: number;
  timeout?: number;
}

export interface AutomationConfig {
  url: string;
  actions: FormAction[];
  global_timeout: number;
  screenshot_on_error: boolean;
  headless: boolean;
}

export interface BrowserbaseConfig {
  api_key: string;
  project_id: string;
}

export interface ExecutionResult {
  success: boolean;
  error?: string;
  message?: string;
  screenshots?: string[];
  execution_time?: number;
}
