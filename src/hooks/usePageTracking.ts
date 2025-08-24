'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/utils/analytics';
import { trackPageView } from '@/utils/visitorTracker';

export const usePageTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Google Analytics 페이지뷰 추적
    pageview(pathname);
    
    // 로컬 페이지뷰 추적
    trackPageView(pathname);
  }, [pathname]);
};