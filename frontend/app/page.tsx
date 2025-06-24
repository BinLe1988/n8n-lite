import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">N8N Lite</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/product" className="text-gray-600 hover:text-primary-600">
              产品
            </Link>
            <Link href="/browserbase" className="text-gray-600 hover:text-primary-600">
              浏览器自动化
            </Link>
            <Link href="/use-cases" className="text-gray-600 hover:text-primary-600">
              应用场景
            </Link>
            <Link href="/docs" className="text-gray-600 hover:text-primary-600">
              文档
            </Link>
            <Link href="/community" className="text-gray-600 hover:text-primary-600">
              社区
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-primary-600">
              价格
            </Link>
          </nav>
          <div className="flex space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-primary-600">
              登录
            </Link>
            <Link href="/signup" className="btn-primary">
              开始使用
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* 英雄区域 */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container-custom grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                为技术团队打造的<br />
                <span className="text-blue-600">灵活AI工作流自动化平台</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                支持代码精确性与拖拽便捷性的完美结合。提供本地部署控制或云端便利。N8N Lite 比其它工具提供更强的自由度，让您实现多步骤AI代理和应用集成。
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/signup" className="btn-primary text-center">
                  免费开始使用
                </Link>
                <Link href="/contact" className="btn-secondary text-center">
                  联系销售
                </Link>
              </div>
            </div>
            <div className="relative h-80 md:h-96">
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                工作流界面预览图
              </div>
            </div>
          </div>
        </section>

        {/* 集成区域 */}
        <section className="py-16 bg-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              将AI与您的数据和500多种集成结合
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              无论是Google Sheets、Slack、MySQL还是自定义API，都能实现自动化连接
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mt-12">
              {['Cisco', 'Microsoft', 'Zendesk', 'Twilio', 'Splunk', 'Pearson'].map((brand) => (
                <div key={brand} className="bg-gray-100 rounded-lg p-6 flex items-center justify-center h-24">
                  <span className="text-lg font-semibold text-gray-600">{brand}</span>
                </div>
              ))}
            </div>
            <Link href="/integrations" className="mt-10 inline-block btn-primary">
              浏览全部集成
            </Link>
          </div>
        </section>

        {/* 特性区块 */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              在业务中快速实现AI应用的途径
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">构建多步骤代理调用自定义工具</h3>
                <p className="text-lg text-gray-600 mb-6">
                  在单个界面上创建代理系统。只需拖放即可将任何大语言模型集成到您的工作流程中。
                </p>
                <Link href="/ai-features" className="text-primary-600 font-semibold hover:text-primary-700">
                  探索AI功能 →
                </Link>
              </div>
              <div className="relative h-80">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  多步骤代理工作流图
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div className="md:order-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">本地部署一切 — 包括AI模型</h3>
                <p className="text-lg text-gray-600 mb-6">
                  通过本地部署保护您的数据安全。
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center">
                    <span className="mr-2 text-primary-600">✓</span>
                    使用Docker部署
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary-600">✓</span>
                    在Github上访问完整源代码
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-primary-600">✓</span>
                    同时提供托管版本
                  </li>
                </ul>
              </div>
              <div className="relative h-80 md:order-1">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  本地部署图示
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">与您的数据对话</h3>
                <p className="text-lg text-gray-600 mb-6">
                  使用Slack、Teams、短信、语音或我们的嵌入式聊天界面，从数据中获取准确答案，创建任务并完成工作流程。
                </p>
                <div className="bg-gray-100 rounded-lg p-6 mb-4">
                  <p className="text-gray-700 mb-2">上周谁和SpaceX开会了？</p>
                  <p className="bg-primary-50 p-3 rounded-lg text-gray-800">
                    周三，Joe在Zoom通话后将Salesforce中的状态更新为"赢得"。<br /><br />
                    周四，Sue提供了现场安装并关闭了ServiceNow工单。
                  </p>
                </div>
              </div>
              <div className="relative h-80">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  数据对话界面
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 功能区块 */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">需要时使用代码，不需要时使用UI</h2>
                <p className="text-lg text-gray-600 mb-6">
                  其他工具限制您只能使用可视化构建体验或代码。使用N8N Lite，您可以同时获得两种方式的优势。
                </p>
                <ul className="space-y-4 mb-6">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600 font-bold">•</span>
                    <div>
                      <strong className="font-semibold">编写JavaScript或Python</strong> - 您随时可以回到代码
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600 font-bold">•</span>
                    <div>
                      <strong className="font-semibold">添加库</strong> - 从npm或Python获取更多功能
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600 font-bold">•</span>
                    <div>
                      <strong className="font-semibold">粘贴cURL请求</strong> - 直接放入您的工作流
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary-600 font-bold">•</span>
                    <div>
                      <strong className="font-semibold">合并工作流分支</strong> - 不仅仅是分割它们
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative h-80">
                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  代码/UI界面图示
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 案例研究 */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">案例研究</h2>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2 p-8 md:p-12">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">某送餐公司</h3>
                  <p className="text-lg font-semibold text-gray-900 mb-6">
                    如何通过单个IT运营工作流每月节省<span className="text-primary-600">200小时</span>
                  </p>
                  <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 mb-6">
                    "自从开始使用N8N Lite进行用户管理以来，我们看到了显著的效率提升。它功能强大，同时使用简便。"
                  </blockquote>
                  <div className="mt-8">
                    <Link href="/case-studies" className="text-primary-600 font-semibold hover:text-primary-700">
                      阅读案例研究 →
                    </Link>
                  </div>
                </div>
                <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary-600 font-bold text-xl">DH</span>
                    </div>
                    <p className="font-medium">某IT服务总监</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 企业级特性 */}
        <section className="py-16 bg-white">
          <div className="container-custom text-center">
            <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium mb-4">企业级准备</span>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">安全. 可靠. 协作.</h2>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              通过可靠部署自动化，消除组织内的效率障碍。在您的服务器上完全隔离运行，或使用我们安全的云端解决方案。
            </p>
            
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/enterprise" className="btn-primary">
                探索企业版N8N Lite
              </Link>
              <Link href="/contact" className="btn-secondary">
                联系销售
              </Link>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">安全性</h3>
                <p className="text-gray-600">
                  完全本地部署选项，SSO SAML和LDAP，加密秘钥存储，版本控制，高级RBAC权限。
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">性能</h3>
                <p className="text-gray-600">
                  审计日志及第三方日志流，工作流历史记录，自定义变量，外部存储。
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">协作</h3>
                <p className="text-gray-600">
                  Git控制，隔离环境，多用户工作流。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 嵌入式自动化 */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium mb-4">N8N Lite嵌入</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">为您的客户提供自动化</h2>
              <p className="text-lg text-gray-600 mb-8">
                通过提供500+应用集成的接入，让您的客户能够自动化他们自己的工作流，从而获得惊喜。您的品牌，我们的白标技术。
              </p>
              <Link href="/embed" className="btn-primary">
                探索N8N Lite嵌入
              </Link>
            </div>
            <div className="relative h-80">
              <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                嵌入式功能展示
              </div>
            </div>
          </div>
        </section>

        {/* 行动号召 */}
        <section className="py-16 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-8">
              用N8N Lite，没有什么是您无法自动化的。
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              这是用户们的心声，不是我们自己说的。<br />
              有疑问？<span className="font-semibold">试试看</span>，自己体验一下。
            </p>
            <Link href="/signup" className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold">
              开始构建
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">N8N Lite</h3>
              <p className="mb-4">无限制的自动化</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Github
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  Discord
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">产品</h3>
              <ul className="space-y-2">
                <li><Link href="/product" className="text-gray-400 hover:text-white">产品概述</Link></li>
                <li><Link href="/integrations" className="text-gray-400 hover:text-white">集成</Link></li>
                <li><Link href="/templates" className="text-gray-400 hover:text-white">模板</Link></li>
                <li><Link href="/ai" className="text-gray-400 hover:text-white">AI功能</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">资源</h3>
              <ul className="space-y-2">
                <li><Link href="/docs" className="text-gray-400 hover:text-white">文档</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white">博客</Link></li>
                <li><Link href="/community" className="text-gray-400 hover:text-white">社区</Link></li>
                <li><Link href="/support" className="text-gray-400 hover:text-white">支持</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">公司</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">关于我们</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">招聘</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">联系我们</Link></li>
                <li><Link href="/legal" className="text-gray-400 hover:text-white">法律条款</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between">
            <p>© 2023 N8N Lite | 保留所有权利</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white">隐私政策</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white">使用条款</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 