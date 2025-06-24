export default function SimpleTest() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1f2937', fontSize: '2rem', marginBottom: '1rem' }}>
        CSS 测试页面
      </h1>
      
      {/* 内联样式测试 */}
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        padding: '1rem', 
        borderRadius: '0.5rem',
        marginBottom: '1rem'
      }}>
        <h2 style={{ color: '#374151', marginBottom: '0.5rem' }}>内联样式测试</h2>
        <p>这个区块使用内联样式，应该显示灰色背景。</p>
      </div>

      {/* Tailwind 类测试 */}
      <div className="bg-blue-100 p-4 rounded-lg mb-4">
        <h2 className="text-gray-800 mb-2">Tailwind CSS 测试</h2>
        <p className="text-gray-600">如果你看到蓝色背景，说明 Tailwind CSS 正在工作。</p>
      </div>

      {/* 按钮测试 */}
      <div className="space-y-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Tailwind 按钮
        </button>
        
        <button 
          style={{ 
            backgroundColor: '#10b981', 
            color: 'white', 
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.25rem',
            marginLeft: '1rem'
          }}
        >
          内联样式按钮
        </button>
      </div>

      {/* 网格测试 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="bg-red-100 p-4 text-center">红色</div>
        <div className="bg-green-100 p-4 text-center">绿色</div>
        <div className="bg-yellow-100 p-4 text-center">黄色</div>
      </div>

      {/* 诊断信息 */}
      <div className="mt-8 p-4 border border-gray-300 rounded">
        <h3 className="font-bold mb-2">诊断信息:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>如果看到彩色背景，Tailwind CSS 正常工作</li>
          <li>如果只看到内联样式效果，Tailwind CSS 未加载</li>
          <li>检查浏览器开发者工具的 Network 标签查看 CSS 文件加载情况</li>
          <li>检查 Console 标签查看是否有错误信息</li>
        </ul>
      </div>
    </div>
  );
}
