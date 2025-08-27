import { BlogPost } from '@/types';

// 개별 포스트 파일들을 수동으로 import
import { post as post1 } from '../../posts/samsung-electronics-investment-strategy';
import { post as post2 } from '../../posts/apple-earnings-stock-outlook';
import { post as post3 } from '../../posts/sk-hynix-hbm-market-strategy';
import { post as post4 } from '../../posts/bitcoin-etf-market-changes';
import { post as post5 } from '../../posts/ethereum-2-0-transition-impact';
import { post as post6 } from '../../posts/seoul-apartment-market-2024';
import { post as post7 } from '../../posts/new-city-investment-opportunities';
import { post as post8 } from '../../posts/interest-rate-cut-impact-on-stock-market';
import { post as post9 } from '../../posts/interest-rate-impact-on-real-estate-market';
import { post as post10 } from '../../posts/regional-real-estate-investment-guide';
import { post as post11 } from '../../posts/jeonse-to-ownership-investment-strategy';
import { post as post12 } from '../../posts/real-estate-reits-investment-guide';
import { post as post13 } from '../../posts/income-generating-real-estate-investment-strategy';
import { post as post14 } from '../../posts/bitcoin-halving-price-cycle-analysis';
import { post as post15 } from '../../posts/cryptocurrency-portfolio-strategy-rebalancing';
import { post as post16 } from '../../posts/cbdc-impact-on-cryptocurrency-analysis';
import { post as post17 } from '../../posts/cryptocurrency-tax-optimization-guide-2025';
import { post as post18 } from '../../posts/institutional-cryptocurrency-investment-trends';
import { post as post19 } from '../../posts/dividend-stock-investment-strategy-guide';
import { post as post20 } from '../../posts/altcoin-investment-strategy-guide';
import { post as post21 } from '../../posts/officetel-investment-complete-guide';
import { post as post22 } from '../../posts/china-economic-recovery-impact-korean-stock';
import { post as post23 } from '../../posts/global-inflation-bitcoin-hedge-asset-analysis';
import { post as post24 } from '../../posts/overseas-real-estate-investment-southeast-asia';
import { post as post25 } from '../../posts/esg-investment-sustainable-management-analysis';
import { post as post26 } from '../../posts/lightning-network-bitcoin-payment-ecosystem';
import { post as post27 } from '../../posts/commercial-real-estate-investment-guide';
import { post as post28 } from '../../posts/us-stock-investment-complete-guide';
import { post as post29 } from '../../posts/defi-yield-farming-complete-guide';
import { post as post30 } from '../../posts/real-estate-auction-investment-strategy';
import { post as post31 } from '../../posts/value-vs-growth-investment-strategy';
import { post as post32 } from '../../posts/nft-investment-complete-guide';
import { post as post33 } from '../../posts/villa-investment-strategy-guide';

// 모든 포스트를 배열로 수집
const allPosts: BlogPost[] = [
  post1, post2, post3, post4, post5, post6, post7, post8, post9, post10,
  post11, post12, post13, post14, post15, post16, post17, post18, post19, post20, post21,
  post22, post23, post24, post25, post26, post27, post28, post29, post30, post31, post32, post33
];

// ID로 정렬
export const blogPosts = allPosts.sort((a, b) => parseInt(a.id) - parseInt(b.id));

// 헬퍼 함수들
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getRecentPosts(limit: number = 5): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getPopularPosts(limit: number = 5): BlogPost[] {
  return blogPosts
    .sort((a, b) => b.readTime - a.readTime)
    .slice(0, limit);
}

export default blogPosts;