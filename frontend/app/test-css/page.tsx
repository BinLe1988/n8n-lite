import React from 'react';

export default function TestCSS() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container-custom">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">CSS 测试页面</h1>
        
        {/* 测试基础Tailwind类 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">基础 Tailwind CSS 测试</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <p className="text-blue-800">蓝色背景</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <p className="text-green-800">绿色背景</p>
            </div>
            <div className="bg-red-100 p-4 rounded">
              <p className="text-red-800">红色背景</p>
            </div>
          </div>
        </div>

        {/* 测试自定义按钮类 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">自定义按钮测试</h2>
          <div className="space-x-4">
            <button className="btn-primary">主要按钮</button>
            <button className="btn-secondary">次要按钮</button>
          </div>
        </div>

        {/* 测试主题色 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">主题色测试</h2>
          <div className="space-y-2">
            <div className="text-primary-600">主题色文本 (text-primary-600)</div>
            <div className="bg-primary-600 text-white p-2 rounded">主题色背景 (bg-primary-600)</div>
          </div>
        </div>

        {/* 测试响应式 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">响应式测试</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-100 p-4 rounded text-center">
              <p className="text-purple-800">响应式网格 1</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded text-center">
              <p className="text-yellow-800">响应式网格 2</p>
            </div>
            <div className="bg-pink-100 p-4 rounded text-center">
              <p className="text-pink-800">响应式网格 3</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded text-center">
              <p className="text-indigo-800">响应式网格 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
