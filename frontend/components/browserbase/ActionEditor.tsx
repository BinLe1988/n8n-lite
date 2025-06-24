import React from 'react';
import { FormAction, ACTION_TYPES, SELECTOR_TYPES } from './types';

interface ActionEditorProps {
  selectedAction: FormAction | null;
  onUpdateAction: (actionId: string, updates: Partial<FormAction>) => void;
  onClose: () => void;
}

export const ActionEditor: React.FC<ActionEditorProps> = ({
  selectedAction,
  onUpdateAction,
  onClose
}) => {
  if (!selectedAction) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">操作编辑器</h3>
        <p className="text-gray-500">选择一个操作来编辑其详细信息</p>
      </div>
    );
  }

  const actionInfo = ACTION_TYPES[selectedAction.action_type as keyof typeof ACTION_TYPES];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">编辑操作</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* 操作类型显示 */}
        <div className={`p-3 rounded-lg ${actionInfo?.color || 'bg-gray-100'}`}>
          <div className="flex items-center">
            <span className="text-xl mr-2">{actionInfo?.icon || '❓'}</span>
            <span className="font-medium">{actionInfo?.name || selectedAction.action_type}</span>
          </div>
        </div>

        {/* 描述 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
          <input
            type="text"
            value={selectedAction.description || ''}
            onChange={(e) => onUpdateAction(selectedAction.id, { description: e.target.value })}
            placeholder="操作描述（可选）"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* 选择器类型和值 */}
        {selectedAction.action_type !== 'wait' && selectedAction.action_type !== 'screenshot' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">选择器类型</label>
              <select
                value={selectedAction.selector_type || 'id'}
                onChange={(e) => onUpdateAction(selectedAction.id, { selector_type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {SELECTOR_TYPES.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">选择器值</label>
              <input
                type="text"
                value={selectedAction.selector_value || ''}
                onChange={(e) => onUpdateAction(selectedAction.id, { selector_value: e.target.value })}
                placeholder="元素选择器"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        )}

        {/* 输入值 */}
        {(selectedAction.action_type === 'fill_input' || selectedAction.action_type === 'select_option') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {selectedAction.action_type === 'fill_input' ? '输入内容' : '选项值'}
            </label>
            <input
              type="text"
              value={selectedAction.input_value || ''}
              onChange={(e) => onUpdateAction(selectedAction.id, { input_value: e.target.value })}
              placeholder={selectedAction.action_type === 'fill_input' ? '要输入的文本' : '要选择的选项'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* 等待时间 */}
        {selectedAction.action_type === 'wait' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">等待时间 (秒)</label>
            <input
              type="number"
              value={selectedAction.wait_time || 1}
              onChange={(e) => onUpdateAction(selectedAction.id, { wait_time: parseInt(e.target.value) || 1 })}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        {/* 高级设置 */}
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">高级设置</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">重试次数</label>
              <input
                type="number"
                value={selectedAction.retry_count || 3}
                onChange={(e) => onUpdateAction(selectedAction.id, { retry_count: parseInt(e.target.value) || 3 })}
                min="1"
                max="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">超时时间 (秒)</label>
              <input
                type="number"
                value={selectedAction.timeout || 30}
                onChange={(e) => onUpdateAction(selectedAction.id, { timeout: parseInt(e.target.value) || 30 })}
                min="5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
