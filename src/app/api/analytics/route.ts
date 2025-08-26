import { NextResponse } from 'next/server';
import { getAllAnalyticsStats } from '@/lib/googleAnalytics';

export async function GET() {
  try {
    const stats = await getAllAnalyticsStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics API error:', error);
    
    // 에러 발생 시 기본값 반환
    return NextResponse.json({
      currentVisitors: 0,
      totalVisitors: 0,
      todayVisitors: 0,
      pageViews: 0,
      error: 'Failed to fetch analytics data'
    }, { status: 200 }); // 500 대신 200으로 반환하여 UI가 깨지지 않도록 함
  }
}