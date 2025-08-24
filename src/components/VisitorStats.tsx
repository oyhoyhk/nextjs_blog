'use client';

import { useEffect, useState } from 'react';
import { getVisitorStats, updateVisitorStats } from '@/utils/visitorTracker';

interface VisitorStatsData {
  totalVisitors: number;
  todayVisitors: number;
  pageViews: number;
}

export default function VisitorStats() {
  const [stats, setStats] = useState<VisitorStatsData>({
    totalVisitors: 1250,
    todayVisitors: 45,
    pageViews: 3200
  });

  useEffect(() => {
    updateVisitorStats();
    const currentStats = getVisitorStats();
    setStats({
      totalVisitors: currentStats.totalVisitors,
      todayVisitors: currentStats.todayVisitors,
      pageViews: currentStats.pageViews
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        방문 통계
      </h3>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {stats.totalVisitors.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">총 방문자</div>
        </div>
        
        <div className="text-center border-l border-r border-gray-200">
          <div className="text-2xl font-bold text-green-600">
            {stats.todayVisitors.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">오늘 방문자</div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {stats.pageViews.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">페이지뷰</div>
        </div>
      </div>
    </div>
  );
}