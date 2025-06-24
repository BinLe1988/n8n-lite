import React from 'react';
import { Settings } from 'lucide-react';
import { AutomationConfig, BrowserbaseConfig } from './types';

interface ConfigPanelProps {
  config: AutomationConfig;
  setConfig: React.Dispatch<React.SetStateAction<AutomationConfig>>;
  browserbaseConfig: BrowserbaseConfig;
  setBrowserbaseConfig: React.Dispatch<React.SetStateAction<BrowserbaseConfig>>;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  setConfig,
  browserbaseConfig,
  setBrowserbaseConfig
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <Settings className="w-5 h-5 mr-2" />
        <h3 className="text-lg font-semibold">配置</h3>
      </div>
      
      <div className="space-y-4">
        {/* Browserbase 配置 */}
        <div>
          <h4 className="font-medium mb-2">Browserbase 配置</h4>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="API Key"
              value={browserbaseConfig.api_key}
              onChange={(e) => setBrowserbaseConfig(prev => ({ ...prev, api_key: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Project ID"
              value={browserbaseConfig.project_id}
              onChange={(e) => setBrowserbaseConfig(prev => ({ ...prev, project_id: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 目标 URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">目标 URL</label>
          <input
            type="url"
            value={config.url}
            onChange={(e) => setConfig(prev => ({ ...prev, url: e.target.value }))}
            placeholder="https://example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 全局设置 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">全局超时 (秒)</label>
          <input
            type="number"
            value={config.global_timeout}
            onChange={(e) => setConfig(prev => ({ ...prev, global_timeout: parseInt(e.target.value) || 60 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 选项 */}
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.screenshot_on_error}
              onChange={(e) => setConfig(prev => ({ ...prev, screenshot_on_error: e.target.checked }))}
              className="mr-2"
            />
            错误时截图
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.headless}
              onChange={(e) => setConfig(prev => ({ ...prev, headless: e.target.checked }))}
              className="mr-2"
            />
            无头模式
          </label>
          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 <strong>提示：</strong>如果遇到弹窗阻止错误，建议启用无头模式或在浏览器中允许弹窗
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
