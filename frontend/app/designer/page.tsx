import React from 'react';
import Link from 'next/link';

export default function WorkflowDesigner() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              N8N Lite
            </Link>
            <h1 className="text-xl font-semibold text-gray-700">工作流设计器</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary-600">
              保存
            </button>
            <button className="text-gray-600 hover:text-primary-600">
              运行
            </button>
            <button className="text-gray-600 hover:text-primary-600">
              分享
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <Link href="/dashboard" className="text-gray-600 hover:text-primary-600">
              仪表板
            </Link>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="未命名工作流"
              className="text-2xl font-semibold border-none focus:outline-none focus:ring-0 bg-transparent"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">上次保存于 5 分钟前</span>
            </div>
          </div>

          <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
            <button className="px-4 py-2 bg-white rounded-md shadow-sm text-gray-700 flex-grow text-center">
              设计器
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-md flex-grow text-center transition-all duration-200">
              代码编辑
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-md flex-grow text-center transition-all duration-200">
              执行
            </button>
            <button className="px-4 py-2 text-gray-600 hover:bg-white hover:shadow-sm rounded-md flex-grow text-center transition-all duration-200">
              设置
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-medium text-gray-800">节点类型</h2>
              </div>
              <div className="p-2">
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                    触发器
                  </h3>
                  <div className="space-y-1">
                    {['HTTP请求', '定时', 'Webhook', '数据库变更'].map((trigger) => (
                      <div
                        key={trigger}
                        className="p-2 hover:bg-gray-50 rounded-md cursor-pointer flex items-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        <span>{trigger}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                    数据操作
                  </h3>
                  <div className="space-y-1">
                    {['过滤器', '映射', '合并', '分割', '转换'].map((op) => (
                      <div
                        key={op}
                        className="p-2 hover:bg-gray-50 rounded-md cursor-pointer flex items-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                        <span>{op}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                    AI & ML
                  </h3>
                  <div className="space-y-1">
                    {['文本生成', '图像处理', '情感分析', '文本摘要', '翻译'].map((ai) => (
                      <div
                        key={ai}
                        className="p-2 hover:bg-gray-50 rounded-md cursor-pointer flex items-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                        <span>{ai}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                    集成
                  </h3>
                  <div className="space-y-1">
                    {['数据库', 'HTTP', 'Email', 'Slack', 'GitHub'].map((integration) => (
                      <div
                        key={integration}
                        className="p-2 hover:bg-gray-50 rounded-md cursor-pointer flex items-center"
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                        <span>{integration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-9">
            <div className="h-[calc(100vh-240px)] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 p-4 flex flex-col items-center justify-center text-gray-400">
                  <svg
                    className="w-16 h-16 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    ></path>
                  </svg>
                  <p className="text-center">
                    从左侧菜单拖动节点到此处开始构建您的工作流
                  </p>
                  <button className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200">
                    使用模板
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 