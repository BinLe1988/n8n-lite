import React from 'react';
import { CheckCircle, XCircle, Clock, Image } from 'lucide-react';
import { ExecutionResult as ExecutionResultType } from './types';

interface ExecutionResultProps {
  result: ExecutionResultType | null;
  isExecuting: boolean;
}

export const ExecutionResult: React.FC<ExecutionResultProps> = ({ result, isExecuting }) => {
  if (isExecuting) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg">执行中...</span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">执行结果</h3>
        <p className="text-gray-500">点击执行按钮开始自动化</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">执行结果</h3>
      
      <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
        <div className="flex items-start">
          {result.success ? (
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
          )}
          <div className="flex-1">
            <div className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.success ? '执行成功' : '执行失败'}
            </div>
            {result.message && (
              <div className={`mt-1 text-sm ${result.success ? 'text-green-700' : 'text-red-700'}`}>
                {result.message}
              </div>
            )}
            {result.error && (
              <div className="mt-1 text-sm text-red-700">
                {result.error}
              </div>
            )}
            {result.execution_time && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                执行时间: {result.execution_time}秒
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 截图显示 */}
      {result.screenshots && result.screenshots.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <Image className="w-4 h-4 mr-2" />
            <span className="font-medium">截图</span>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {result.screenshots.map((screenshot, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <img
                  src={`data:image/png;base64,${screenshot}`}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
