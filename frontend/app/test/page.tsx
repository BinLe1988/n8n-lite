export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">CSS 测试页面</h1>
        
        {/* 测试基础Tailwind类 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">基础 Tailwind CSS 测试</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-blue-800 font-medium">蓝色背景</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <p className="text-green-800 font-medium">绿色背景</p>
            </div>
            <div className="bg-red-100 p-4 rounded-lg">
              <p className="text-red-800 font-medium">红色背景</p>
            </div>
          </div>
        </div>

        {/* 测试自定义按钮类 */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">自定义按钮测试</h2>
          <div className="flex space-x-4">
            <button className="btn-primary">主要按钮</button>
            <button className="btn-secondary">次要按钮</button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              普通按钮
            </button>
          </div>
        </div>

        {/* 测试响应式 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">响应式测试</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="text-purple-800 font-medium">响应式网格 1</p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg text-center">
              <p className="text-yellow-800 font-medium">响应式网格 2</p>
            </div>
            <div className="bg-pink-100 p-4 rounded-lg text-center">
              <p className="text-pink-800 font-medium">响应式网格 3</p>
            </div>
            <div className="bg-indigo-100 p-4 rounded-lg text-center">
              <p className="text-indigo-800 font-medium">响应式网格 4</p>
            </div>
          </div>
        </div>

        {/* 测试表单元素 */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">表单元素测试</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                输入框测试
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="这是一个输入框"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                选择框测试
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>选项 1</option>
                <option>选项 2</option>
                <option>选项 3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
