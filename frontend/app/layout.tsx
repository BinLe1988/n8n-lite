import '../styles/globals.css';
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'N8N Lite - 灵活的工作流自动化平台',
  description: '为技术团队提供灵活的AI工作流自动化平台，结合代码的精确性和拖放式的便捷性',
};

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