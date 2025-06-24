'use client';

import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  MessageCircle, 
  Users, 
  Camera, 
  Music, 
  Car, 
  Network, 
  Tag, 
  Shield,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  features: string[];
  status: 'live' | 'beta' | 'coming-soon';
  link: string;
  color: string;
}

const products: Product[] = [
  {
    id: 'edu-grading',
    title: '智能作业批改系统',
    description: '基于AI的作业试卷批改和学情分析平台，提供个性化学习建议',
    icon: <GraduationCap className="w-8 h-8" />,
    category: '教育科技',
    features: ['自动批改', '学情分析', '个性化推荐', '进度跟踪'],
    status: 'live',
    link: '/products/edu-grading',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'retail-chatbot',
    title: '零售智能客服',
    description: '24/7在线智能客服系统，提供个性化购物建议和售后服务',
    icon: <MessageCircle className="w-8 h-8" />,
    category: '零售电商',
    features: ['智能问答', '商品推荐', '订单查询', '多渠道接入'],
    status: 'live',
    link: '/products/retail-chatbot',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'chat-platform',
    title: '陌生人1v1聊天工具',
    description: '安全的陌生人社交平台，支持实时聊天和兴趣匹配',
    icon: <Users className="w-8 h-8" />,
    category: '社交通讯',
    features: ['兴趣匹配', '安全聊天', '实时翻译', '隐私保护'],
    status: 'beta',
    link: '/products/chat-platform',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'ocr-recognition',
    title: '商品包装识别系统',
    description: '基于PaddleOCR的商品包装文字识别和信息提取系统',
    icon: <Camera className="w-8 h-8" />,
    category: '计算机视觉',
    features: ['文字识别', '信息提取', '批量处理', 'API接口'],
    status: 'live',
    link: '/products/ocr-recognition',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 'ukulele-platform',
    title: '尤克里里售卖+授课平台',
    description: '集乐器销售、在线教学、社区交流于一体的综合平台',
    icon: <Music className="w-8 h-8" />,
    category: '音乐教育',
    features: ['乐器销售', '在线教学', '社区交流', '进度跟踪'],
    status: 'coming-soon',
    link: '/products/ukulele-platform',
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: 'parking-system',
    title: '智能停车系统',
    description: '实时监测停车位状态，提供智能导航和预约服务',
    icon: <Car className="w-8 h-8" />,
    category: '智慧城市',
    features: ['实时监测', '智能导航', '预约停车', '移动支付'],
    status: 'beta',
    link: '/products/parking-system',
    color: 'from-teal-500 to-cyan-600'
  },
  {
    id: 'crm-system',
    title: 'AI知识图谱CRM系统',
    description: '基于AI知识图谱的客户关系管理系统，智能分析客户行为',
    icon: <Network className="w-8 h-8" />,
    category: '企业服务',
    features: ['知识图谱', '客户画像', '行为分析', '智能推荐'],
    status: 'live',
    link: '/products/crm-system',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'coupon-platform',
    title: '北美优惠券平台',
    description: '专为北美市场打造的本土优惠券售卖和分发网站',
    icon: <Tag className="w-8 h-8" />,
    category: '电商平台',
    features: ['本土化运营', '商家入驻', '用户积分', '移动端支持'],
    status: 'live',
    link: '/products/coupon-platform',
    color: 'from-rose-500 to-pink-600'
  },
  {
    id: 'phishing-detection',
    title: '网络钓鱼检测系统',
    description: '基于机器学习的网络钓鱼检测和防护系统',
    icon: <Shield className="w-8 h-8" />,
    category: '网络安全',
    features: ['实时检测', '威胁分析', '安全报告', 'API集成'],
    status: 'beta',
    link: '/products/phishing-detection',
    color: 'from-red-500 to-rose-600'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'live':
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">正式版</span>;
    case 'beta':
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">测试版</span>;
    case 'coming-soon':
      return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">即将推出</span>;
    default:
      return null;
  }
};

export default function ProductsPage() {
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              产品中心
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              探索我们的创新产品组合，涵盖教育、零售、社交、AI等多个领域
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{products.length}</h3>
            <p className="text-gray-600">创新产品</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{categories.length}</h3>
            <p className="text-gray-600">业务领域</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mx-auto mb-4">
              <Network className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
            <p className="text-gray-600">技术支持</p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${product.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-lg">
                    {product.icon}
                  </div>
                  {getStatusBadge(product.status)}
                </div>
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-white/90 text-sm">{product.description}</p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                    {product.category}
                  </span>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">核心功能</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={product.link}
                  className="inline-flex items-center justify-center w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 group-hover:bg-gray-800"
                >
                  了解更多
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">
              有想法？让我们一起实现
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              我们专注于将创新想法转化为实际的产品解决方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                联系我们
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/demo"
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                预约演示
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
