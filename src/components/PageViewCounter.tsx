'use client';

import { useEffect, useState } from 'react';
import { getPageViews } from '@/utils/visitorTracker';

interface PageViewCounterProps {
  pagePath: string;
  className?: string;
}

export default function PageViewCounter({ pagePath, className = '' }: PageViewCounterProps) {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const pageViews = getPageViews(pagePath);
    setViews(pageViews);
  }, [pagePath]);

  if (views === 0) return null;

  return (
    <div className={`flex items-center text-gray-500 text-sm ${className}`}>
      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
      </svg>
      {views.toLocaleString()} 조회
    </div>
  );
}