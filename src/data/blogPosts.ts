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
import { post as post34 } from '../../posts/india-stock-market-investment-guide';
import { post as post35 } from '../../posts/solana-ecosystem-investment-guide';
import { post as post36 } from '../../posts/real-estate-auction-practical-investment-strategy';
import { post as post37 } from '../../posts/japan-stock-market-investment-guide';
import { post as post38 } from '../../posts/web3-gaming-token-investment-guide';
import { post as post39 } from '../../posts/lifestyle-accommodation-investment-guide';
import { post as post40 } from '../../posts/china-stock-market-investment-guide';
import { post as post41 } from '../../posts/layer2-blockchain-investment-guide';
import { post as post42 } from '../../posts/university-area-studio-investment-strategy';
import { post as post43 } from '../../posts/interest-rate-hike-impact-on-stocks';
import { post as post44 } from '../../posts/interest-rate-hike-impact-on-bitcoin';
import { post as post45 } from '../../posts/interest-rate-hike-impact-on-real-estate';
import { post as post46 } from '../../posts/interest-rate-cut-impact-on-stocks';
import { post as post47 } from '../../posts/interest-rate-cut-impact-on-bitcoin';
import { post as post48 } from '../../posts/interest-rate-cut-impact-on-real-estate';
import { post as post49 } from '../../posts/dollar-index-comprehensive-guide';
import { post as post50 } from '../../posts/ai-semiconductor-stocks-deep-analysis';
import { post as post51 } from '../../posts/bitcoin-mining-investment-guide-2025';
import { post as post52 } from '../../posts/cryptocurrency-alternative-investment-strategy';
import { post as post53 } from '../../posts/dividend-stock-portfolio-strategy';
import { post as post54 } from '../../posts/dividend-stocks-complete-guide';
import { post as post55 } from '../../posts/esg-investment-complete-guide';
import { post as post56 } from '../../posts/global-real-estate-investment-guide';
import { post as post57 } from '../../posts/korea-ipo-investment-strategy-guide';
import { post as post58 } from '../../posts/leisure-real-estate-investment-guide';
import { post as post59 } from '../../posts/officetel-vs-studio-investment-comparison';
import { post as post60 } from '../../posts/options-trading-strategy-guide';
import { post as post61 } from '../../posts/real-estate-auction-investment-guide';
import { post as post62 } from '../../posts/redevelopment-reconstruction-investment-guide';
import { post as post63 } from '../../posts/small-cap-stock-investment-guide';
import { post as post64 } from '../../posts/stablecoin-investment-guide-2025';
import { post as post65 } from '../../posts/stablecoin-market-analysis-investment-strategy';
import { post as post66 } from '../../posts/stock-tax-optimization-strategy-2025';
import { post as post67 } from '../../posts/quantitative-investing-complete-guide';
import { post as post68 } from '../../posts/real-estate-auction-complete-introduction';
import { post as post69 } from '../../posts/nvidia-stock-investment-analysis';
import { post as post70 } from '../../posts/cryptocurrency-staking-complete-guide';
import { post as post71 } from '../../posts/land-investment-complete-guide';
import { post as post72 } from '../../posts/federal-reserve-monetary-policy-analysis';
import { post as post73 } from '../../posts/python-backtesting-practical-guide';
import { post as post74 } from '../../posts/auction-rights-analysis-practical-guide';
import { post as post75 } from '../../posts/quant-investing-practical-strategies';
import { post as post76 } from '../../posts/commodity-investment-complete-guide';
import { post as post77 } from '../../posts/precious-metals-investment-guide';
import { post as post78 } from '../../posts/etf-investment-strategy-guide';
import { post as post79 } from '../../posts/crypto-wallet-security-guide';
import { post as post80 } from '../../posts/real-estate-tax-saving-strategies';
import { post as post81 } from '../../posts/bond-investment-complete-guide';
import { post as post82 } from '../../posts/machine-learning-quant-investing-guide';
import { post as post83 } from '../../posts/auction-myeongdo-practical-guide';
import { post as post84 } from '../../posts/options-trading-complete-guide';
import { post as post85 } from '../../posts/defi-protocols-investment-guide';
import { post as post86 } from '../../posts/jeonse-investment-safety-guide';
import { post as post87 } from '../../posts/forex-investment-strategy-guide';
import { post as post88 } from '../../posts/pairs-trading-statistical-arbitrage-guide';
import { post as post89 } from '../../posts/auction-appraisal-winning-bid-strategy';
import { post as post90 } from '../../posts/sector-rotation-strategy-guide';
import { post as post91 } from '../../posts/cross-chain-bridge-investment-guide';
import { post as post92 } from '../../posts/real-estate-trust-investment-guide';
import { post as post93 } from '../../posts/inflation-hedging-investment-strategy';
import { post as post94 } from '../../posts/portfolio-optimization-modern-theory';
import { post as post95 } from '../../posts/auction-loan-financing-guide';
import { post as post96 } from '../../posts/ipo-investment-strategy-complete-guide';
import { post as post97 } from '../../posts/dao-investment-governance-guide';
import { post as post98 } from '../../posts/knowledge-industry-center-investment-guide';
import { post as post99 } from '../../posts/currency-hedging-strategy-guide';
import { post as post100 } from '../../posts/high-frequency-trading-strategy-guide';
import { post as post101 } from '../../posts/public-auction-investment-complete-guide';
import { post as post102 } from '../../posts/technical-analysis-chart-patterns-guide';
import { post as post103 } from '../../posts/metaverse-token-investment-guide';
import { post as post104 } from '../../posts/housing-rental-business-registration-guide';
import { post as post105 } from '../../posts/economic-indicators-investment-guide';
import { post as post106 } from '../../posts/event-driven-quant-strategy-guide';
import { post as post107 } from '../../posts/auction-profit-maximization-strategy';
import { post as post108 } from '../../posts/global-semiconductor-etf-investment-strategy';
import { post as post109 } from '../../posts/cryptocurrency-tax-filing-guide-2025';
import { post as post110 } from '../../posts/real-estate-investment-timing-strategy';
import { post as post111 } from '../../posts/global-recession-signals-asset-allocation';
import { post as post112 } from '../../posts/algorithmic-trading-system-guide';
import { post as post113 } from '../../posts/auction-site-inspection-checklist';
import { post as post114 } from '../../posts/dividend-growth-investing-strategy';
import { post as post115 } from '../../posts/bitcoin-on-chain-analysis-guide';
import { post as post116 } from '../../posts/multi-family-housing-investment-guide';
import { post as post117 } from '../../posts/economic-cycle-investment-strategy';
import { post as post118 } from '../../posts/factor-investing-smart-beta-guide';
import { post as post119 } from '../../posts/auction-legal-risk-management-guide';
import { post as post120 } from '../../posts/global-stock-investment-strategy-guide';
import { post as post121 } from '../../posts/bitcoin-layer2-lightning-network-guide';
import { post as post122 } from '../../posts/overseas-real-estate-investment-complete-guide';
import { post as post123 } from '../../posts/central-bank-monetary-policy-guide';
import { post as post124 } from '../../posts/deep-learning-quant-trading-guide';
import { post as post125 } from '../../posts/auction-profit-maximization-complete-guide';
import { post as post126 } from '../../posts/stock-buyback-investment-strategy';
import { post as post127 } from '../../posts/bitcoin-institutional-adoption-guide';
import { post as post128 } from '../../posts/real-estate-development-investment-guide';
import { post as post129 } from '../../posts/trade-war-investment-strategy';
import { post as post130 } from '../../posts/options-arbitrage-strategy-guide';
import { post as post131 } from '../../posts/auction-tax-strategy-complete-guide';

// 모든 포스트를 배열로 수집
const allPosts: BlogPost[] = [
  post1, post2, post3, post4, post5, post6, post7, post8, post9, post10,
  post11, post12, post13, post14, post15, post16, post17, post18, post19, post20, post21,
  post22, post23, post24, post25, post26, post27, post28, post29, post30, post31, post32, post33,
  post34, post35, post36, post37, post38, post39, post40, post41, post42, post43, post44, post45,
  post46, post47, post48, post49, post50, post51, post52, post53, post54, post55, post56, post57,
  post58, post59, post60, post61, post62, post63, post64, post65, post66, post67, post68, post69,
  post70, post71, post72, post73, post74, post75, post76, post77, post78, post79, post80, post81,
  post82, post83, post84, post85, post86, post87, post88, post89, post90, post91, post92, post93,
  post94, post95, post96, post97, post98, post99, post100, post101, post102, post103, post104,
  post105, post106, post107, post108, post109, post110, post111, post112, post113, post114,
  post115, post116, post117, post118, post119, post120, post121, post122, post123, post124, post125,
  post126, post127, post128, post129, post130, post131
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