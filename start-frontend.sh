#!/bin/bash

echo "🚀 启动 N8N Lite 前端服务..."

cd frontend

echo "📦 检查依赖..."
npm list tailwindcss postcss autoprefixer

echo "🧹 清理缓存..."
rm -rf .next
rm -rf node_modules/.cache

echo "🔧 重新安装依赖..."
npm install

echo "🎨 检查 Tailwind 配置..."
npx tailwindcss --help > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Tailwind CSS 已安装"
else
    echo "❌ Tailwind CSS 未正确安装"
    npm install -D tailwindcss postcss autoprefixer
fi

echo "🌟 启动开发服务器..."
echo "访问以下链接测试 CSS:"
echo "- 主页: http://localhost:3000"
echo "- 简单测试: http://localhost:3000/simple-test"
echo "- Browserbase: http://localhost:3000/browserbase"

npm run dev
