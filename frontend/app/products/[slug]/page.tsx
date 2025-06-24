'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

// 产品数据配置
const productData: Record<string, any> = {
  'chat-platform': {
    title: '陌生人1v1聊天工具',
    description: '安全的陌生人社交平台，支持实时聊天和兴趣匹配',
    status: 'beta',
    color: 'from-purple-500 to-pink-600',
    features: ['兴趣匹配', '安全聊天', '实时翻译', '隐私保护'],
    benefits: [
      { title: '智能匹配', desc: '基于兴趣爱好和性格特征进行精准匹配' },
      { title: '安全保障', desc: '多重身份验证和举报机制确保用户安全' },
      { title: '实时翻译', desc: '支持多语言实时翻译，打破语言障碍' },
      { title: '隐私保护', desc: '端到端加密，保护用户隐私信息' }
    ]
  },
  'ocr-recognition': {
    title: '商品包装识别系统',
    description: '基于PaddleOCR的商品包装文字识别和信息提取系统',
    status: 'live',
    color: 'from-orange-500 to-red-600',
    features: ['文字识别', '信息提取', '批量处理', 'API接口'],
    benefits: [
      { title: '高精度识别', desc: '基于PaddleOCR，识别准确率达99%以上' },
      { title: '批量处理', desc: '支持大批量图片的自动化处理' },
      { title: '多格式支持', desc: '支持JPG、PNG、PDF等多种格式' },
      { title: 'API集成', desc: '提供RESTful API，易于系统集成' }
    ]
  },
  'ukulele-platform': {
    title: '尤克里里售卖+授课平台',
    description: '集乐器销售、在线教学、社区交流于一体的综合平台',
    status: 'coming-soon',
    color: 'from-yellow-500 to-orange-600',
    features: ['乐器销售', '在线教学', '社区交流', '进度跟踪'],
    benefits: [
      { title: '一站式服务', desc: '从购买乐器到学习演奏的完整服务链' },
      { title: '专业教学', desc: '资深音乐老师在线一对一指导' },
      { title: '社区互动', desc: '学员之间可以交流学习心得和演奏技巧' },
      { title: '进度跟踪', desc: '详细记录学习进度和成就' }
    ]
  },
  'parking-system': {
    title: '智能停车系统',
    description: '实时监测停车位状态，提供智能导航和预约服务',
    status: 'beta',
    color: 'from-teal-500 to-cyan-600',
    features: ['实时监测', '智能导航', '预约停车', '移动支付'],
    benefits: [
      { title: '实时监测', desc: '通过传感器实时监测停车位状态' },
      { title: '智能导航', desc: '自动规划最优停车路线' },
      { title: '预约服务', desc: '支持提前预约停车位' },
      { title: '便捷支付', desc: '支持多种移动支付方式' }
    ]
  },
  'crm-system': {
    title: 'AI知识图谱CRM系统',
    description: '基于AI知识图谱的客户关系管理系统，智能分析客户行为',
    status: 'live',
    color: 'from-indigo-500 to-purple-600',
    features: ['知识图谱', '客户画像', '行为分析', '智能推荐'],
    benefits: [
      { title: '知识图谱', desc: '构建完整的客户关系网络图谱' },
      { title: '客户画像', desc: '多维度分析客户特征和偏好' },
      { title: '行为预测', desc: '基于AI算法预测客户行为' },
      { title: '智能推荐', desc: '个性化推荐产品和服务' }
    ]
  },
  'coupon-platform': {
    title: '北美优惠券平台',
    description: '专为北美市场打造的本土优惠券售卖和分发网站',
    status: 'live',
    color: 'from-rose-500 to-pink-600',
    features: ['本土化运营', '商家入驻', '用户积分', '移动端支持'],
    benefits: [
      { title: '本土化运营', desc: '深度了解北美市场，提供本土化服务' },
      { title: '商家生态', desc: '完善的商家入驻和管理系统' },
      { title: '用户激励', desc: '积分奖励机制提升用户活跃度' },
      { title: '全端覆盖', desc: '支持Web、iOS、Android多端使用' }
    ]
  },
  'phishing-detection': {
    title: '网络钓鱼检测系统',
    description: '基于机器学习的网络钓鱼检测和防护系统',
    status: 'beta',
    color: 'from-red-500 to-rose-600',
    features: ['实时检测', '威胁分析', '安全报告', 'API集成'],
    benefits: [
      { title: '实时防护', desc: '实时检测和拦截钓鱼网站和邮件' },
      { title: '威胁分析', desc: '深度分析威胁来源和攻击模式' },
      { title: '安全报告', desc: '生成详细的安全分析报告' },
      { title: '易于集成', desc: '提供API接口，易于集成到现有系统' }
    ]
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'live':
      return <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">正式版</span>;
    case 'beta':
      return <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">测试版</span>;
    case 'coming-soon':
      return <span className="px-3 py-1 bg-gray-500 text-white text-sm font-medium rounded-full">即将推出</span>;
    default:
      return null;
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = productData[slug];

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">产品未找到</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-800">
            返回产品中心
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            href="/products" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回产品中心
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${product.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              {getStatusBadge(product.status)}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {product.title}
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              {product.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {product.status === 'coming-soon' ? '预约通知' : '免费试用'}
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              核心功能特性
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              为您提供专业、高效的解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.features.map((feature: string, index: number) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature}</h3>
                <p className="text-gray-600">
                  专业的{feature}功能，满足您的业务需求
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              产品优势
            </h2>
            <p className="text-xl text-gray-600">
              为什么选择我们的解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.benefits.map((benefit: any, index: number) => (
              <div key={index} className="flex items-start bg-white rounded-xl p-6 shadow-sm">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={`py-16 bg-gradient-to-r ${product.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            准备开始使用{product.title}？
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            立即体验我们的专业解决方案，提升您的业务效率
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {product.status === 'coming-soon' ? '预约通知' : '立即开始'}
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors">
              联系我们
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
