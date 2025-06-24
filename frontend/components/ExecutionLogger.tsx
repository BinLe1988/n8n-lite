'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Download, Trash2, Play, Pause } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'success' | 'warning' | 'error';
  message: string;
  action?: string;
  details?: any;
}

interface ExecutionLoggerProps {
  isExecuting: boolean;
  taskId?: string | null;
  onClear?: () => void;
}

export default function ExecutionLogger({ isExecuting, taskId, onClear }: ExecutionLoggerProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  // 模拟日志生成（在实际应用中，这些日志应该来自WebSocket或轮询API）
  useEffect(() => {
    if (!isExecuting || isPaused) return;

    const interval = setInterval(() => {
      const mockLogs: LogEntry[] = [
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: '开始执行自动化任务',
          action: 'start'
        },
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: '正在导航到目标页面...',
          action: 'navigate'
        },
        {
          timestamp: new Date().toISOString(),
          level: 'success',
          message: '页面加载完成',
          action: 'page_loaded'
        },
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: '正在查找元素: input[name="username"]',
          action: 'find_element'
        },
        {
          timestamp: new Date().toISOString(),
          level: 'success',
          message: '元素找到，正在填写内容...',
          action: 'fill_input'
        },
        {
          timestamp: new Date().toISOString(),
          level: 'warning',
          message: '等待页面响应...',
          action: 'wait'
        }
      ];

      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      setLogs(prev => [...prev, {
        ...randomLog,
        timestamp: new Date().toISOString()
      }]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isExecuting, isPaused]);

  // 自动滚动到底部
  useEffect(() => {
    if (isAutoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, isAutoScroll]);

  const clearLogs = () => {
    setLogs([]);
    onClear?.();
  };

  const exportLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `browserbase_execution_log_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLogLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getLogLevelBg = (level: LogEntry['level']) => {
    switch (level) {
      case 'success':
        return 'bg-green-50 border-l-green-400';
      case 'warning':
        return 'bg-yellow-50 border-l-yellow-400';
      case 'error':
        return 'bg-red-50 border-l-red-400';
      default:
        return 'bg-gray-50 border-l-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* 头部工具栏 */}
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <div className="flex items-center">
          <Terminal className="w-5 h-5 mr-2 text-gray-600" />
          <h3 className="font-semibold text-gray-800">执行日志</h3>
          {taskId && (
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              任务: {taskId.slice(0, 8)}...
            </span>
          )}
          {isExecuting && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded animate-pulse">
              执行中
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-2 rounded ${isPaused ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'} hover:opacity-80`}
            title={isPaused ? '继续' : '暂停'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
          
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={isAutoScroll}
              onChange={(e) => setIsAutoScroll(e.target.checked)}
              className="mr-1"
            />
            自动滚动
          </label>
          
          <button
            onClick={exportLogs}
            className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
            title="导出日志"
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            onClick={clearLogs}
            className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
            title="清空日志"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 日志内容 */}
      <div 
        ref={logContainerRef}
        className="h-64 overflow-y-auto p-4 font-mono text-sm"
      >
        {logs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>暂无执行日志</p>
            <p className="text-xs">开始执行自动化任务后，日志将在此显示</p>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`p-3 border-l-4 rounded-r ${getLogLevelBg(log.level)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <span className="text-xs text-gray-500 mr-2">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`text-xs font-semibold uppercase ${getLogLevelColor(log.level)}`}>
                        {log.level}
                      </span>
                      {log.action && (
                        <span className="ml-2 px-1 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
                          {log.action}
                        </span>
                      )}
                    </div>
                    <div className="text-gray-800">
                      {log.message}
                    </div>
                    {log.details && (
                      <details className="mt-2">
                        <summary className="text-xs text-gray-500 cursor-pointer">
                          查看详情
                        </summary>
                        <pre className="mt-1 text-xs text-gray-600 bg-gray-100 p-2 rounded overflow-auto">
                          {JSON.stringify(log.details, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 底部状态栏 */}
      <div className="flex items-center justify-between p-2 border-t bg-gray-50 text-xs text-gray-600">
        <span>共 {logs.length} 条日志</span>
        <span>
          {logs.filter(l => l.level === 'error').length} 错误 | 
          {logs.filter(l => l.level === 'warning').length} 警告 | 
          {logs.filter(l => l.level === 'success').length} 成功
        </span>
      </div>
    </div>
  );
}
