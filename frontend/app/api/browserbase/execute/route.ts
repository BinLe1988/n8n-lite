import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${BACKEND_URL}/browserbase/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    // 检查后端返回的错误信息，特别处理弹窗相关错误
    if (!response.ok) {
      let errorMessage = data.error || data.message || 'Unknown error';
      
      // 检测常见的弹窗阻止错误
      if (errorMessage.toLowerCase().includes('popup') || 
          errorMessage.toLowerCase().includes('blocked') ||
          errorMessage.toLowerCase().includes('permission denied')) {
        return NextResponse.json({
          success: false,
          error: '浏览器弹窗被阻止，请检查浏览器设置或使用无头模式'
        }, { status: 400 });
      }
    }
    
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('API Error:', error);
    
    let errorMessage = 'Internal server error';
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch')) {
        errorMessage = '无法连接到后端服务，请确保后端服务正在运行';
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
