import React from 'react';
import { ACTION_TYPES } from './types';

interface ActionTypeSelectorProps {
  onAddAction: (actionType: string) => void;
}

export const ActionTypeSelector: React.FC<ActionTypeSelectorProps> = ({ onAddAction }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">添加操作</h3>
      <div className="grid grid-cols-1 gap-2">
        {Object.entries(ACTION_TYPES).map(([type, info]) => (
          <button
            key={type}
            onClick={() => onAddAction(type)}
            className={`flex items-center p-3 rounded-lg border-2 border-dashed ${info.color} hover:bg-opacity-50 transition-colors`}
          >
            <span className="text-2xl mr-3">{info.icon}</span>
            <span className="font-medium">{info.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
