import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Trash2, Eye } from 'lucide-react';
import { FormAction, ACTION_TYPES } from './types';

interface ActionListProps {
  actions: FormAction[];
  onDragEnd: (result: any) => void;
  onDeleteAction: (actionId: string) => void;
  onSelectAction: (action: FormAction) => void;
  selectedAction: FormAction | null;
}

export const ActionList: React.FC<ActionListProps> = ({
  actions,
  onDragEnd,
  onDeleteAction,
  onSelectAction,
  selectedAction
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">操作序列</h3>
      
      {actions.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>还没有添加任何操作</p>
          <p className="text-sm">从右侧选择操作类型开始</p>
        </div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="actions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {actions.map((action, index) => {
                  const actionInfo = ACTION_TYPES[action.action_type as keyof typeof ACTION_TYPES];
                  return (
                    <Draggable key={action.id} draggableId={action.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-4 rounded-lg border-2 ${
                            selectedAction?.id === action.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : actionInfo?.color || 'border-gray-200 bg-gray-50'
                          } ${snapshot.isDragging ? 'shadow-lg' : ''} transition-all`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{actionInfo?.icon || '❓'}</span>
                              <div>
                                <div className="font-medium">{actionInfo?.name || action.action_type}</div>
                                {action.description && (
                                  <div className="text-sm text-gray-600">{action.description}</div>
                                )}
                                {action.selector_value && (
                                  <div className="text-xs text-gray-500">
                                    {action.selector_type}: {action.selector_value}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => onSelectAction(action)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                title="编辑"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => onDeleteAction(action.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                title="删除"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
