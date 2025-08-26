import { google } from 'googleapis';

const analyticsData = google.analyticsdata('v1beta');

// 서비스 계정 키 설정
const auth = new google.auth.GoogleAuth({
  credentials: {
    type: 'service_account',
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
  },
  scopes: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics'
  ],
});

const propertyId = process.env.GA4_PROPERTY_ID;

// GA4 API를 사용한 실시간 방문자 수 조회
export async function getCurrentVisitors(): Promise<number> {
  try {
    google.options({ auth });
    
    const response = await analyticsData.properties.runRealtimeReport({
      property: `properties/${propertyId}`,
      requestBody: {
        metrics: [{ name: 'activeUsers' }],
      },
    });

    const activeUsers = response.data?.rows?.[0]?.metricValues?.[0]?.value;
    return parseInt(activeUsers || '0');
  } catch (error) {
    console.error('Error fetching current visitors:', error);
    return 0; // 에러 시 0 반환
  }
}

// GA4 API를 사용한 전체 방문자 수 조회
export async function getTotalVisitors(days: number = 30): Promise<number> {
  try {
    google.options({ auth });
    
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ 
          startDate: `${days}daysAgo`, 
          endDate: 'today' 
        }],
        metrics: [{ name: 'totalUsers' }],
      },
    });

    const totalUsers = response.data?.rows?.[0]?.metricValues?.[0]?.value;
    return parseInt(totalUsers || '0');
  } catch (error) {
    console.error('Error fetching total visitors:', error);
    return 0; // 에러 시 0 반환
  }
}

// 오늘 방문자 수 조회
export async function getTodayVisitors(): Promise<number> {
  try {
    google.options({ auth });
    
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ 
          startDate: 'today', 
          endDate: 'today' 
        }],
        metrics: [{ name: 'activeUsers' }],
      },
    });

    const todayUsers = response.data?.rows?.[0]?.metricValues?.[0]?.value;
    return parseInt(todayUsers || '0');
  } catch (error) {
    console.error('Error fetching today visitors:', error);
    return 0; // 에러 시 0 반환
  }
}

// 페이지뷰 수 조회
export async function getTotalPageViews(days: number = 30): Promise<number> {
  try {
    google.options({ auth });
    
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ 
          startDate: `${days}daysAgo`, 
          endDate: 'today' 
        }],
        metrics: [{ name: 'screenPageViews' }],
      },
    });

    const pageViews = response.data?.rows?.[0]?.metricValues?.[0]?.value;
    return parseInt(pageViews || '0');
  } catch (error) {
    console.error('Error fetching page views:', error);
    return 0; // 에러 시 0 반환
  }
}

// 모든 통계를 한 번에 가져오는 함수
export async function getAllAnalyticsStats() {
  const [currentVisitors, totalVisitors, todayVisitors, pageViews] = await Promise.all([
    getCurrentVisitors(),
    getTotalVisitors(),
    getTodayVisitors(),
    getTotalPageViews()
  ]);

  return {
    currentVisitors,
    totalVisitors,
    todayVisitors,
    pageViews
  };
}