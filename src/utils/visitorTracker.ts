interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  pageViews: number;
  lastVisit: string;
  isNewVisitor: boolean;
}

const STORAGE_KEY = 'blog_visitor_stats';
const VISITOR_KEY = 'blog_visitor_id';

export const getVisitorStats = (): VisitorStats => {
  if (typeof window === 'undefined') {
    return {
      totalVisitors: 1250, // 기본값 (서버사이드)
      todayVisitors: 45,
      pageViews: 3200,
      lastVisit: new Date().toISOString(),
      isNewVisitor: true
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  const today = new Date().toDateString();
  
  if (!stored) {
    const initialStats: VisitorStats = {
      totalVisitors: 1250, // 시작 값
      todayVisitors: 1,
      pageViews: 1,
      lastVisit: new Date().toISOString(),
      isNewVisitor: true
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialStats));
    localStorage.setItem(VISITOR_KEY, generateVisitorId());
    return initialStats;
  }

  return JSON.parse(stored);
};

export const updateVisitorStats = () => {
  if (typeof window === 'undefined') return;

  const stats = getVisitorStats();
  const today = new Date().toDateString();
  const lastVisitDate = new Date(stats.lastVisit).toDateString();
  const visitorId = localStorage.getItem(VISITOR_KEY);
  const isNewVisitor = !visitorId;

  let updatedStats: VisitorStats = {
    ...stats,
    pageViews: stats.pageViews + 1,
    lastVisit: new Date().toISOString(),
    isNewVisitor
  };

  // 새 방문자인 경우
  if (isNewVisitor) {
    updatedStats.totalVisitors += 1;
    localStorage.setItem(VISITOR_KEY, generateVisitorId());
  }

  // 오늘 첫 방문인 경우
  if (today !== lastVisitDate) {
    updatedStats.todayVisitors = 1;
  } else if (isNewVisitor) {
    updatedStats.todayVisitors += 1;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
};

export const trackPageView = (pagePath: string) => {
  if (typeof window === 'undefined') return;
  
  const pageViewKey = `page_views_${pagePath.replace(/\//g, '_')}`;
  const currentViews = parseInt(localStorage.getItem(pageViewKey) || '0');
  localStorage.setItem(pageViewKey, (currentViews + 1).toString());
  
  updateVisitorStats();
};

export const getPageViews = (pagePath: string): number => {
  if (typeof window === 'undefined') return 0;
  
  const pageViewKey = `page_views_${pagePath.replace(/\//g, '_')}`;
  return parseInt(localStorage.getItem(pageViewKey) || '0');
};

const generateVisitorId = (): string => {
  return `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const getPopularPosts = () => {
  if (typeof window === 'undefined') return [];
  
  const pages = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('page_views_')) {
      const pagePath = key.replace('page_views_', '').replace(/_/g, '/');
      const views = parseInt(localStorage.getItem(key) || '0');
      pages.push({ path: pagePath, views });
    }
  }
  
  return pages.sort((a, b) => b.views - a.views).slice(0, 5);
};