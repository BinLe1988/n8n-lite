# CSS 问题排查指南

## 问题描述
前端页面的 Tailwind CSS 样式没有正确应用。

## 已修复的配置

### 1. Tailwind 配置 (`tailwind.config.js`)
```javascript
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.css',
  ],
  // ... 其他配置
};
```

### 2. PostCSS 配置 (`postcss.config.js`)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 3. 全局样式 (`styles/globals.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    box-sizing: border-box;
  }
  
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200;
  }
  
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

### 4. 布局文件 (`app/layout.tsx`)
```tsx
import '../styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

## 排查步骤

### 1. 检查配置文件
运行检查脚本：
```bash
cd frontend
node check-css.js
```

### 2. 清理缓存
```bash
cd frontend
rm -rf .next
rm -rf node_modules/.cache
```

### 3. 重新安装依赖
```bash
cd frontend
npm install
```

### 4. 测试页面
启动开发服务器后访问：
- 简单测试页面: `http://localhost:3000/simple-test`
- 完整测试页面: `http://localhost:3000/test`

### 5. 浏览器调试
1. 打开浏览器开发者工具
2. 检查 Network 标签，确认 CSS 文件已加载
3. 检查 Elements 标签，确认 Tailwind 类已应用
4. 检查 Console 标签，查看是否有错误

## 常见问题及解决方案

### 问题1: Tailwind 类不生效
**原因**: 配置文件路径不正确
**解决**: 确保 `tailwind.config.js` 中的 `content` 路径包含所有组件文件

### 问题2: 自定义组件类不生效
**原因**: `@layer components` 语法错误
**解决**: 检查 `globals.css` 中的语法，确保使用正确的 `@apply` 指令

### 问题3: CSS 文件未加载
**原因**: 导入路径错误
**解决**: 确保在 `layout.tsx` 中正确导入 `globals.css`

### 问题4: 开发服务器缓存问题
**原因**: Next.js 缓存了旧的 CSS
**解决**: 清理 `.next` 目录并重启服务器

## 启动服务

使用提供的启动脚本：
```bash
./start-frontend.sh
```

或手动启动：
```bash
cd frontend
npm run dev
```

## 验证修复

1. 访问 `http://localhost:3000/simple-test`
2. 确认页面显示彩色背景和正确的样式
3. 检查浏览器开发者工具确认 CSS 已加载
4. 测试响应式布局和交互效果

## 如果问题仍然存在

1. 检查 Node.js 版本 (推荐 18+)
2. 检查 npm 版本
3. 尝试删除 `node_modules` 并重新安装
4. 检查是否有其他 CSS 框架冲突
5. 查看 Next.js 和 Tailwind CSS 的版本兼容性
