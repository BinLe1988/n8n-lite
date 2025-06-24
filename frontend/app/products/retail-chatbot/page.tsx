'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MessageCircle, 
  ArrowLeft, 
  Bot, 
  ShoppingCart, 
  Clock, 
  Users,
  Star,
  TrendingUp,
  Headphones,
  Zap,
  CheckCircle
} from 'lucide-react';

export default function RetailChatbotPage() {
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
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-3 bg-white/20 rounded-lg mr-4">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                  正式版
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                零售智能客服
              </h1>
              <p className="text-xl text-green-100 mb-8">
                24/7在线智能客服系统，提供个性化购物建议和专业售后服务，提升客户满意度和转化率
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  免费试用
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                  查看演示
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 flex-1">
                      <p className="text-sm">您好！我想了解这款手机的详细参数</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 flex-1">
                      <p className="text-sm">这款手机配备了最新的处理器，6.5英寸OLED屏幕，支持5G网络。根据您的使用需求，我推荐您关注以下几个特点...</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white/20 rounded-lg p-3 flex-1">
                      <p className="text-sm">价格如何？有优惠活动吗？</p>
                    </div>
                  </div>
                </div>
              </div>
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
              集成先进AI技术，提供全方位的客户服务解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">智能问答</h3>
              <p className="text-gray-600">
                基于NLP技术，理解客户意图，提供准确的产品信息和解答
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">商品推荐</h3>
              <p className="text-gray-600">
                基于用户行为和偏好，智能推荐相关商品，提升转化率
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">订单查询</h3>
              <p className="text-gray-600">
                快速查询订单状态、物流信息，处理退换货等售后服务
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">多渠道接入</h3>
              <p className="text-gray-600">
                支持网站、微信、APP等多个渠道，统一管理客户对话
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                为什么选择我们的智能客服？
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7全天候服务</h3>
                    <p className="text-gray-600">
                      无需人工值守，全天候为客户提供即时响应和专业服务
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">降低运营成本</h3>
                    <p className="text-gray-600">
                      减少人工客服需求，降低运营成本高达60%
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">提升转化率</h3>
                    <p className="text-gray-600">
                      智能推荐和个性化服务，平均提升转化率35%
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">数据驱动优化</h3>
                    <p className="text-gray-600">
                      详细的对话分析和客户行为数据，持续优化服务质量
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                服务效果统计
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                  <div className="text-gray-600">问题解决率</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">3秒</div>
                  <div className="text-gray-600">平均响应时间</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">35%</div>
                  <div className="text-gray-600">转化率提升</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">60%</div>
                  <div className="text-gray-600">成本节省</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              适用场景
            </h2>
            <p className="text-xl text-gray-600">
              覆盖零售行业的各种应用场景
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">电商平台</h3>
              <p className="text-gray-600 mb-4">
                为电商网站提供商品咨询、订单查询、售后服务等全方位支持
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 商品详情介绍</li>
                <li>• 库存查询</li>
                <li>• 促销活动推荐</li>
                <li>• 订单状态跟踪</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">实体零售</h3>
              <p className="text-gray-600 mb-4">
                为实体店提供线上线下一体化的客户服务体验
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 门店信息查询</li>
                <li>• 预约服务</li>
                <li>• 会员积分查询</li>
                <li>• 活动通知</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">品牌官网</h3>
              <p className="text-gray-600 mb-4">
                为品牌官网提供专业的产品咨询和品牌服务
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 产品选型建议</li>
                <li>• 技术支持</li>
                <li>• 保修服务</li>
                <li>• 用户反馈收集</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              客户评价
            </h2>
            <p className="text-xl text-gray-600">
              听听我们的合作伙伴怎么说
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "自从使用了智能客服系统，我们的客户满意度提升了40%，同时客服成本降低了一半。系统的智能推荐功能特别棒，转化率明显提升。"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">张</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">张总</div>
                  <div className="text-gray-600">某知名电商平台CEO</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                "24小时不间断的服务让我们的客户体验大大提升。系统能够准确理解客户需求，回答专业且贴心。部署简单，维护方便。"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold">李</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">李经理</div>
                  <div className="text-gray-600">某连锁零售品牌运营总监</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            准备提升您的客户服务体验？
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            立即体验AI驱动的智能客服系统，让客户服务更高效、更智能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              免费试用15天
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              预约产品演示
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
