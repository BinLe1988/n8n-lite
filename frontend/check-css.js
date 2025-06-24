const fs = require('fs');
const path = require('path');

console.log('🔍 检查CSS配置...\n');

// 检查文件是否存在
const files = [
  'tailwind.config.js',
  'postcss.config.js',
  'styles/globals.css',
  'app/layout.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} 存在`);
  } else {
    console.log(`❌ ${file} 不存在`);
  }
});

console.log('\n📋 Tailwind 配置内容:');
try {
  const tailwindConfig = require('./tailwind.config.js');
  console.log('Content paths:', tailwindConfig.content);
} catch (error) {
  console.log('❌ 无法读取 tailwind.config.js:', error.message);
}

console.log('\n📋 PostCSS 配置内容:');
try {
  const postcssConfig = require('./postcss.config.js');
  console.log('Plugins:', Object.keys(postcssConfig.plugins));
} catch (error) {
  console.log('❌ 无法读取 postcss.config.js:', error.message);
}

console.log('\n📋 globals.css 前几行:');
try {
  const cssContent = fs.readFileSync(path.join(__dirname, 'styles/globals.css'), 'utf8');
  console.log(cssContent.split('\n').slice(0, 10).join('\n'));
} catch (error) {
  console.log('❌ 无法读取 globals.css:', error.message);
}

console.log('\n🔧 建议的修复步骤:');
console.log('1. 确保所有配置文件存在');
console.log('2. 清理 .next 缓存');
console.log('3. 重新启动开发服务器');
console.log('4. 检查浏览器开发者工具中的CSS加载情况');
