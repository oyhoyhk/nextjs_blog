'use client';

import { usePageTracking } from '@/hooks/usePageTracking';

interface PageTrackingWrapperProps {
  children: React.ReactNode;
}

export default function PageTrackingWrapper({ children }: PageTrackingWrapperProps) {
  usePageTracking();
  return <>{children}</>;
}