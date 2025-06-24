'use client';

import React, { useState, useCallback } from 'react';
import { Play, Save, Download, Upload } from 'lucide-react';
import { ConfigPanel } from '../../components/browserbase/ConfigPanel';
import { ActionTypeSelector } from '../../components/browserbase/ActionTypeSelector';
import { ActionList } from '../../components/browserbase/ActionList';
import { ActionEditor } from '../../components/browserbase/ActionEditor';
import { ExecutionResult } from '../../components/browserbase/ExecutionResult';
import { 
  AutomationConfig, 
  BrowserbaseConfig, 
  FormAction, 
  ExecutionResult as ExecutionResultType 
} from '../../components/browserbase/types';

export default function BrowserbasePage() {
  // 状态管理
  const [config, setConfig] = useState<AutomationConfig>({
    url: '',
    actions: [],
    global_timeout: 60,
    screenshot_on_error: true,
    headless: true
  });

  const [browserbaseConfig, setBrowserbaseConfig] = useState<BrowserbaseConfig>({
    api_key: '',
    project_id: ''
  });

  const [selectedAction, setSelectedAction] = useState<FormAction | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResultType | null>(null);

  // 添加操作
  const addAction = useCallback((actionType: string) => {
    const newAction: FormAction = {
      id: `action_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      action_type: actionType,
      selector_type: 'id',
      selector_value: '',
      input_value: '',
      wait_time: actionType === 'wait' ? 3 : undefined,
      description: '',
      retry_count: 3,
      timeout: 30
    };
    
    setConfig(prev => ({
      ...prev,
      actions: [...prev.actions, newAction]
    }));
    
    setSelectedAction(newAction);
  }, []);

  // 更新操作
  const updateAction = useCallback((actionId: string, updates: Partial<FormAction>) => {
    setConfig(prev => ({
      ...prev,
      actions: prev.actions.map(action => 
        action.id === actionId ? { ...action, ...updates } : action
      )
    }));
    
    if (selectedAction?.id === actionId) {
      setSelectedAction(prev => prev ? { ...prev, ...updates } : null);
    }
  }, [selectedAction]);

  // 删除操作
  const deleteAction = useCallback((actionId: string) => {
    setConfig(prev => ({
      ...prev,
      actions: prev.actions.filter(action => action.id !== actionId)
    }));
    if (selectedAction?.id === actionId) {
      setSelectedAction(null);
    }
  }, [selectedAction]);

  // 拖拽重排序
  const onDragEnd = useCallback((result: any) => {
    if (!result.destination) return;

    const items = Array.from(config.actions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setConfig(prev => ({ ...prev, actions: items }));
  }, [config.actions]);

  // 执行自动化
  const executeAutomation = async () => {
    if (!browserbaseConfig.api_key || !browserbaseConfig.project_id || !config.url) {
      alert('请填写完整的配置信息');
      return;
    }

    setIsExecuting(true);
    setExecutionResult(null);

    try {
      const response = await fetch('/api/browserbase/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          browserbase_config: browserbaseConfig,
          automation_config: config
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      // 检查是否有弹窗相关的错误
      if (result.error && (result.error.includes('popup') || result.error.includes('blocked'))) {
        setExecutionResult({
          success: false,
          error: '检测到弹窗阻止，请检查浏览器设置或尝试无头模式执行'
        });
        return;
      }
      
      setExecutionResult(result);
    } catch (error) {
      console.error('Automation execution error:', error);
      
      let errorMessage = '执行失败';
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          errorMessage = '网络连接失败，请检查后端服务是否正常运行';
        } else if (error.message.includes('popup') || error.message.includes('blocked')) {
          errorMessage = '浏览器阻止了弹窗，请允许弹窗或使用无头模式';
        } else {
          errorMessage = error.message;
        }
      }
      
      setExecutionResult({
        success: false,
        error: errorMessage
      });
    } finally {
      setIsExecuting(false);
    }
  };

  // 保存配置
  const saveConfig = () => {
    const configData = {
      automation_config: config,
      browserbase_config: browserbaseConfig
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'browserbase-config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 加载配置
  const loadConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.automation_config) setConfig(data.automation_config);
        if (data.browserbase_config) setBrowserbaseConfig(data.browserbase_config);
      } catch (error) {
        alert('配置文件格式错误');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部工具栏 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Browserbase 自动化工具</h1>
            <div className="flex items-center space-x-3">
              <button
                onClick={executeAutomation}
                disabled={isExecuting}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                <Play className="w-4 h-4 mr-2" />
                {isExecuting ? '执行中...' : '执行自动化'}
              </button>
              <button
                onClick={saveConfig}
                className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                保存配置
              </button>
              <label className="inline-flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                加载配置
                <input
                  type="file"
                  accept=".json"
                  onChange={loadConfig}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧配置面板 */}
          <div className="lg:col-span-1 space-y-6">
            <ConfigPanel
              config={config}
              setConfig={setConfig}
              browserbaseConfig={browserbaseConfig}
              setBrowserbaseConfig={setBrowserbaseConfig}
            />
            <ActionTypeSelector onAddAction={addAction} />
          </div>

          {/* 中间操作列表 */}
          <div className="lg:col-span-2">
            <ActionList
              actions={config.actions}
              onDragEnd={onDragEnd}
              onDeleteAction={deleteAction}
              onSelectAction={setSelectedAction}
              selectedAction={selectedAction}
            />
          </div>

          {/* 右侧编辑器和结果 */}
          <div className="lg:col-span-1 space-y-6">
            <ActionEditor
              selectedAction={selectedAction}
              onUpdateAction={updateAction}
              onClose={() => setSelectedAction(null)}
            />
            <ExecutionResult
              result={executionResult}
              isExecuting={isExecuting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
