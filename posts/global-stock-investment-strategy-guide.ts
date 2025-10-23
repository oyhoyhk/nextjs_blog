import { BlogPost } from '@/types';

export const post: BlogPost = {
  id: '120',
  title: '글로벌 주식 투자 전략: 선진국·신흥국 분산투자 완벽 가이드',
  slug: 'global-stock-investment-strategy-guide',
  category: 'stocks',
  excerpt: '미국, 유럽, 일본, 중국, 인도 등 전 세계 주식시장에 분산투자하여 리스크를 낮추고 수익을 극대화하는 전략을 상세히 안내합니다. 국가별 특성, 환율 리스크 관리, 글로벌 포트폴리오 구성법을 배워보세요.',
  content: `
# 글로벌 주식 투자 전략: 선진국·신흥국 분산투자 완벽 가이드

한국 주식시장만으로는 진정한 분산투자를 달성하기 어렵습니다. 전 세계 주식시장에 투자함으로써 지역별 리스크를 분산하고, 각국의 성장 기회를 포착할 수 있습니다. 이 가이드에서는 글로벌 주식 투자의 전략과 실전 노하우를 제공합니다.

## 1. 글로벌 투자의 필요성

### 1.1 왜 글로벌 투자인가?

**한국 시장의 한계**

\`\`\`python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import matplotlib.pyplot as plt

class GlobalInvestmentRationale:
    """글로벌 투자 필요성 분석"""

    def korea_market_limitations(self) -> pd.DataFrame:
        """한국 시장의 한계"""

        limitations = pd.DataFrame({
            '항목': [
                '시가총액 비중',
                '산업 집중도',
                '성장률',
                '밸류에이션',
                '배당수익률',
                '변동성'
            ],
            '한국': [
                '1.7% (전세계)',
                '높음 (IT 50%+)',
                '중간 (2~3%)',
                '낮음 (코리아 디스카운트)',
                '2~3%',
                '높음'
            ],
            '글로벌 분산': [
                '100% 접근 가능',
                '낮음 (다양한 산업)',
                '높음 (신흥국 5~7%)',
                '다양 (고성장↔가치)',
                '2~4%',
                '낮음 (분산 효과)'
            ],
            '차이': [
                '98.3%p 기회 상실',
                '섹터 리스크 집중',
                '성장 기회 제한',
                '저평가 지속',
                '유사',
                '포트폴리오 변동성 ↑'
            ]
        })

        return limitations

    def calculate_diversification_benefit(self,
                                         returns_data: pd.DataFrame) -> dict:
        """분산투자 효과 계산"""

        # 한국만 vs 글로벌 분산
        korea_only = returns_data['Korea']
        global_portfolio = returns_data[['US', 'Europe', 'Japan', 'Emerging']].mean(axis=1)

        # 수익률
        korea_return = (korea_only.mean() * 252)  # 연환산
        global_return = (global_portfolio.mean() * 252)

        # 변동성
        korea_vol = korea_only.std() * np.sqrt(252)
        global_vol = global_portfolio.std() * np.sqrt(252)

        # 샤프 비율 (무위험 수익률 3% 가정)
        risk_free = 0.03
        korea_sharpe = (korea_return - risk_free) / korea_vol
        global_sharpe = (global_return - risk_free) / global_vol

        # 최대 낙폭
        korea_dd = (korea_only / korea_only.cummax() - 1).min()
        global_dd = (global_portfolio / global_portfolio.cummax() - 1).min()

        return {
            'korea_only': {
                'return': korea_return * 100,
                'volatility': korea_vol * 100,
                'sharpe': korea_sharpe,
                'max_drawdown': korea_dd * 100
            },
            'global': {
                'return': global_return * 100,
                'volatility': global_vol * 100,
                'sharpe': global_sharpe,
                'max_drawdown': global_dd * 100
            },
            'improvement': {
                'volatility_reduction': (korea_vol - global_vol) * 100,
                'sharpe_improvement': global_sharpe - korea_sharpe,
                'drawdown_reduction': (korea_dd - global_dd) * 100
            }
        }

# 분석 실행
rationale = GlobalInvestmentRationale()

print("한국 시장의 한계와 글로벌 투자의 이점")
print("=" * 90)
print(rationale.korea_market_limitations().to_string(index=False))

# 가상의 수익률 데이터 (예시)
np.random.seed(42)
dates = pd.date_range(end=datetime.now(), periods=1000, freq='D')
returns_data = pd.DataFrame({
    'Korea': np.random.normal(0.0005, 0.015, 1000),
    'US': np.random.normal(0.0007, 0.012, 1000),
    'Europe': np.random.normal(0.0004, 0.013, 1000),
    'Japan': np.random.normal(0.0003, 0.011, 1000),
    'Emerging': np.random.normal(0.0008, 0.018, 1000)
}, index=dates)

diversification = rationale.calculate_diversification_benefit(returns_data)

print("\n\n분산투자 효과 (백테스트)")
print("=" * 90)
print(f"\n【한국만 투자】")
print(f"연간 수익률: {diversification['korea_only']['return']:.2f}%")
print(f"연간 변동성: {diversification['korea_only']['volatility']:.2f}%")
print(f"샤프 비율: {diversification['korea_only']['sharpe']:.2f}")
print(f"최대 낙폭: {diversification['korea_only']['max_drawdown']:.2f}%")

print(f"\n【글로벌 분산】")
print(f"연간 수익률: {diversification['global']['return']:.2f}%")
print(f"연간 변동성: {diversification['global']['volatility']:.2f}%")
print(f"샤프 비율: {diversification['global']['sharpe']:.2f}")
print(f"최대 낙폭: {diversification['global']['max_drawdown']:.2f}%")

print(f"\n【개선 효과】")
print(f"변동성 감소: {diversification['improvement']['volatility_reduction']:.2f}%p")
print(f"샤프 비율 증가: {diversification['improvement']['sharpe_improvement']:.2f}")
print(f"낙폭 감소: {diversification['improvement']['drawdown_reduction']:.2f}%p")
\`\`\`

### 1.2 글로벌 시장 구조

**시가총액 기준 비중 (2024년)**

\`\`\`python
def global_market_structure() -> pd.DataFrame:
    """글로벌 시장 구조"""

    markets = pd.DataFrame({
        '지역/국가': [
            '미국',
            '유럽',
            '일본',
            '중국',
            '영국',
            '캐나다',
            '인도',
            '한국',
            '기타'
        ],
        '시가총액 (조 달러)': [
            50.0,
            15.0,
            6.5,
            10.0,
            3.5,
            3.0,
            4.5,
            2.0,
            15.5
        ]
    })

    markets['비중 (%)'] = (markets['시가총액 (조 달러)'] / markets['시가총액 (조 달러)'].sum() * 100).round(1)
    markets['분류'] = ['선진국', '선진국', '선진국', '신흥국', '선진국',
                      '선진국', '신흥국', '신흥국', '혼합']

    return markets

market_structure = global_market_structure()

print("글로벌 주식시장 구조 (2024년)")
print("=" * 80)
print(market_structure.to_string(index=False))

print(f"\n선진국 비중: {market_structure[market_structure['분류'] == '선진국']['비중 (%)'].sum():.1f}%")
print(f"신흥국 비중: {market_structure[market_structure['분류'] == '신흥국']['비중 (%)'].sum():.1f}%")
\`\`\`

## 2. 국가/지역별 투자 전략

### 2.1 미국 (50%): 세계 경제의 중심

**특징**
- 전 세계 시총의 50%
- 혁신 기업 집중 (빅테크)
- 달러 기축통화
- 유동성 최고

\`\`\`python
class USMarketStrategy:
    """미국 시장 투자 전략"""

    def recommend_sectors(self) -> dict:
        """미국 투자 섹터별 전략"""

        sectors = {
            '기술주 (Tech)': {
                'etf': ['QQQ (나스닥100)', 'VGT (기술섹터)', 'ARKK (혁신성장)'],
                'characteristics': '고성장, 고변동성, 장기 상승 트렌드',
                'allocation': '30~40%',
                'suitable_for': '공격적 투자자, 장기 투자'
            },

            '대형주 (Large Cap)': {
                'etf': ['SPY (S&P500)', 'VOO (S&P500)', 'VTI (전체시장)'],
                'characteristics': '안정적, 저비용, 시장 대표성',
                'allocation': '40~50%',
                'suitable_for': '모든 투자자, 핵심 보유'
            },

            '배당주 (Dividend)': {
                'etf': ['VYM (고배당)', 'SCHD (배당성장)', 'DVY (배당귀족)'],
                'characteristics': '안정적 현금흐름, 방어적',
                'allocation': '10~20%',
                'suitable_for': '보수적 투자자, 은퇴 준비'
            },

            '소형주 (Small Cap)': {
                'etf': ['IWM (러셀2000)', 'VB (소형주)', 'IJR (소형가치)'],
                'characteristics': '고성장 잠재력, 고변동성',
                'allocation': '5~10%',
                'suitable_for': '위험감수 가능자'
            }
        }

        return sectors

    def calculate_optimal_us_allocation(self,
                                       investor_profile: str) -> dict:
        """투자자 프로필별 미국 배분"""

        profiles = {
            '공격적 (20~30대)': {
                'QQQ': 25,
                'VTI': 20,
                'VGT': 15,
                'IWM': 10,
                'total_us': 70
            },

            '중립적 (40~50대)': {
                'VOO': 30,
                'QQQ': 15,
                'SCHD': 10,
                'VYM': 5,
                'total_us': 60
            },

            '보수적 (60대+)': {
                'VOO': 25,
                'SCHD': 15,
                'VYM': 10,
                'total_us': 50
            }
        }

        return profiles.get(investor_profile, profiles['중립적 (40~50대)'])

# 미국 전략
us_strategy = USMarketStrategy()

print("미국 시장 섹터별 투자 전략")
print("=" * 90)
for sector, details in us_strategy.recommend_sectors().items():
    print(f"\n【{sector}】")
    print(f"추천 ETF: {', '.join(details['etf'])}")
    print(f"특징: {details['characteristics']}")
    print(f"권장 비중: {details['allocation']}")
    print(f"적합 투자자: {details['suitable_for']}")

print("\n\n투자자 프로필별 미국 포트폴리오")
print("=" * 90)
for profile in ['공격적 (20~30대)', '중립적 (40~50대)', '보수적 (60대+)']:
    allocation = us_strategy.calculate_optimal_us_allocation(profile)
    print(f"\n【{profile}】")
    for etf, pct in allocation.items():
        if etf != 'total_us':
            print(f"  {etf}: {pct}%")
    print(f"  → 미국 총 비중: {allocation['total_us']}%")
\`\`\`

### 2.2 유럽 (10~15%): 가치주와 배당의 천국

**특징**
- 성숙한 경제
- 높은 배당수익률
- 저평가된 가치주 많음
- 유로화 리스크

\`\`\`python
class EuropeStrategy:
    """유럽 투자 전략"""

    def analyze_europe_advantages(self) -> dict:
        """유럽 시장의 장점"""

        return {
            '배당': {
                'avg_yield': '3.5~4.5%',
                'reason': '성숙 기업, 주주친화 정책',
                'sectors': ['금융', '에너지', '통신', '유틸리티']
            },

            '가치주': {
                'valuation': 'P/E 12~14배 (미국 20배 대비 저평가)',
                'reason': '저성장 경제, 투자자 외면',
                'opportunity': '장기 가치 투자 매력'
            },

            '산업 다양성': {
                'luxury': 'LVMH, Hermès (명품)',
                'automotive': 'Mercedes, BMW (자동차)',
                'pharma': 'Novartis, Roche (제약)',
                'finance': 'HSBC, BNP (금융)'
            },

            '리스크': {
                'growth': '낮은 성장률 (1~2%)',
                'politics': '지정학적 불안 (러시아, 이민)',
                'currency': '유로/달러 환율 변동'
            }
        }

    def recommend_europe_etf(self) -> pd.DataFrame:
        """유럽 ETF 추천"""

        etfs = pd.DataFrame({
            'ETF': [
                'VGK',
                'EZU',
                'FEZ',
                'IEUR',
                'HEDJ'
            ],
            '종목명': [
                'Vanguard FTSE Europe',
                'iShares MSCI Eurozone',
                'SPDR EURO STOXX 50',
                'iShares Core MSCI Europe',
                'WisdomTree Europe Hedged'
            ],
            '비용': [
                '0.08%',
                '0.51%',
                '0.29%',
                '0.09%',
                '0.58%'
            ],
            '배당률': [
                '3.2%',
                '3.5%',
                '3.8%',
                '3.1%',
                '3.0%'
            ],
            '특징': [
                '유럽 전체, 저비용',
                '유로존 집중',
                '대형주 50개',
                '광범위 커버리지',
                '환헤지 (달러 강세 시 유리)'
            ]
        })

        return etfs

europe_strategy = EuropeStrategy()

print("유럽 시장 분석")
print("=" * 90)
for category, details in europe_strategy.analyze_europe_advantages().items():
    print(f"\n【{category}】")
    for key, value in details.items():
        print(f"  {key}: {value}")

print("\n\n유럽 ETF 추천")
print("=" * 90)
print(europe_strategy.recommend_europe_etf().to_string(index=False))
\`\`\`

### 2.3 일본 (5~10%): 저평가 가치 + 엔화 약세

**특징**
- PBR 1배 미만 기업 많음
- 주주환원 정책 강화
- 엔화 약세로 수출 수혜
- 고령화 리스크

\`\`\`python
class JapanStrategy:
    """일본 투자 전략"""

    def japan_investment_thesis(self) -> dict:
        """일본 투자 논리"""

        return {
            '밸류에이션 매력': {
                'pbr': '0.8~1.2배 (역사적 저점)',
                'reason': '30년 장기 침체 후 재평가 시작',
                'catalyst': '기업 지배구조 개선, 자사주 매입 증가'
            },

            '주주환원 강화': {
                'trend': '배당 + 자사주 매입 증가',
                'driver': '도쿄증권거래소의 개혁 압력',
                'impact': 'ROE 8% 이상 목표, PBR 개선'
            },

            '엔화 약세': {
                'level': '150엔/달러 수준 (2024년)',
                'benefit': '수출기업 이익 증가',
                'sectors': '자동차, 전자, 기계'
            },

            '리스크': {
                'demographics': '고령화, 인구 감소',
                'debt': 'GDP 대비 250% 정부 부채',
                'growth': '저성장 (1% 내외)'
            }
        }

    def recommend_japan_etf(self) -> pd.DataFrame:
        """일본 ETF 추천"""

        etfs = pd.DataFrame({
            'ETF': ['EWJ', 'DXJ', 'DBJP', 'JPXN', 'HEWJ'],
            '종목명': [
                'iShares MSCI Japan',
                'WisdomTree Japan Hedged',
                'Xtrackers MSCI Japan Hedged',
                'iShares JPX-Nikkei 400',
                'iShares Currency Hedged Japan'
            ],
            '환헤지': ['X', 'O', 'O', 'X', 'O'],
            '비용': ['0.50%', '0.48%', '0.45%', '0.48%', '0.48%'],
            '특징': [
                '일본 전체 시장',
                '환헤지, 대형주',
                '환헤지, 저비용',
                'JPX400 지수 추종',
                '환헤지, 배당주'
            ],
            '추천 시나리오': [
                '엔화 강세 예상',
                '엔화 약세 예상',
                '엔화 약세 예상',
                '지배구조 개선 수혜',
                '안정적 배당'
            ]
        })

        return etfs

japan_strategy = JapanStrategy()

print("일본 투자 논리")
print("=" * 90)
for theme, details in japan_strategy.japan_investment_thesis().items():
    print(f"\n【{theme}】")
    for key, value in details.items():
        print(f"  {key}: {value}")

print("\n\n일본 ETF 추천")
print("=" * 90)
print(japan_strategy.recommend_japan_etf().to_string(index=False))

print("\n\n【환헤지 여부 선택 가이드】")
print("• 엔화 약세 예상 (달러 강세) → 환헤지 ETF (DXJ, DBJP)")
print("• 엔화 강세 예상 (달러 약세) → 일반 ETF (EWJ)")
print("• 모름 → 50:50 분산 or 일반 ETF")
\`\`\`

### 2.4 신흥국 (10~20%): 고성장 기회

**중국 (5~10%)**

\`\`\`python
class ChinaStrategy:
    """중국 투자 전략"""

    def china_market_analysis(self) -> dict:
        """중국 시장 분석"""

        return {
            '기회': {
                'growth': 'GDP 5% 성장 (선진국 대비 높음)',
                'consumption': '14억 인구, 중산층 확대',
                'tech': '전기차, AI, 반도체 자립화',
                'valuation': 'P/E 10배 내외 (저평가)'
            },

            '리스크': {
                'politics': '미중 갈등, 대만 문제',
                'regulation': '정부 규제 (게임, 교육, 빅테크)',
                'real_estate': '부동산 버블 붕괴 우려',
                'delisting': 'ADR 상장폐지 리스크'
            },

            '투자 방식': {
                'A주': '중국 본토 상장 (MSCI China A)',
                'H주': '홍콩 상장 (Hang Seng)',
                'ADR': '미국 상장 (BABA, JD 등)',
                'ETF': 'MCHI, FXI, KWEB (분산 투자)'
            }
        }

    def recommend_china_etf(self) -> pd.DataFrame:
        """중국 ETF 추천"""

        etfs = pd.DataFrame({
            'ETF': ['MCHI', 'FXI', 'KWEB', 'CNYA', 'GXC'],
            '시장': ['A주+H주', 'H주 대형', '인터넷', 'A주', '소형주'],
            '리스크': ['중간', '중간', '높음', '높음', '매우 높음'],
            '성장성': ['중간', '낮음', '높음', '중간', '높음'],
            '추천 비중': ['5%', '3%', '2%', '3%', '2%']
        })

        return etfs

china = ChinaStrategy()

print("중국 시장 분석")
print("=" * 90)
for category, details in china.china_market_analysis().items():
    print(f"\n【{category}】")
    for key, value in details.items():
        print(f"  {key}: {value}")

print("\n\n중국 ETF 추천")
print("=" * 90)
print(china.recommend_china_etf().to_string(index=False))
\`\`\`

**인도 (5~10%): 차세대 성장 엔진**

\`\`\`python
class IndiaStrategy:
    """인도 투자 전략"""

    def india_growth_story(self) -> dict:
        """인도 성장 스토리"""

        return {
            '인구': {
                '규모': '14억 명 (세계 1위)',
                '구조': '평균 연령 28세 (젊은 인구)',
                'demographic_dividend': '2040년까지 인구 보너스'
            },

            '경제': {
                'gdp_growth': '6~7% (세계 최고)',
                'reform': '모디 정부의 개혁 (GST, 디지털화)',
                'manufacturing': '제조업 육성 (중국 대체)'
            },

            '시장': {
                'valuation': 'P/E 20~25배 (고평가)',
                'volatility': '높음 (신흥국 특성)',
                'access': 'ETF 투자 권장 (개별주 어려움)'
            }
        }

    def recommend_india_etf(self) -> pd.DataFrame:
        """인도 ETF 추천"""

        etfs = pd.DataFrame({
            'ETF': ['INDA', 'INDY', 'EPI', 'SMIN'],
            '지수': ['MSCI India', 'India 50', 'India Nifty 50', 'India Small Cap'],
            '비용': ['0.64%', '0.85%', '0.84%', '0.97%'],
            '특징': [
                '광범위 커버리지',
                '대형주 50개',
                '인도 대표 지수',
                '소형주 (고위험고수익)'
            ]
        })

        return etfs

india = IndiaStrategy()

print("\n\n인도 성장 스토리")
print("=" * 90)
for theme, details in india.india_growth_story().items():
    print(f"\n【{theme}】")
    for key, value in details.items():
        print(f"  {key}: {value}")

print("\n\n인도 ETF 추천")
print("=" * 90)
print(india.recommend_india_etf().to_string(index=False))
\`\`\`

## 3. 글로벌 포트폴리오 구성

### 3.1 모범 포트폴리오 예시

\`\`\`python
class GlobalPortfolioBuilder:
    """글로벌 포트폴리오 구성"""

    def build_model_portfolio(self, risk_profile: str) -> dict:
        """리스크 프로필별 모범 포트폴리오"""

        portfolios = {
            '공격적': {
                '미국': {
                    'QQQ': 20,
                    'VTI': 15,
                    'VGT': 10,
                    'IWM': 5
                },
                '유럽': {
                    'VGK': 8
                },
                '일본': {
                    'EWJ': 5
                },
                '중국': {
                    'MCHI': 7
                },
                '인도': {
                    'INDA': 8
                },
                '신흥국': {
                    'VWO': 7
                },
                '한국': 10,
                '현금': 5
            },

            '중립적': {
                '미국': {
                    'VOO': 25,
                    'QQQ': 10,
                    'SCHD': 5
                },
                '유럽': {
                    'VGK': 10
                },
                '일본': {
                    'EWJ': 7
                },
                '중국': {
                    'MCHI': 5
                },
                '인도': {
                    'INDA': 5
                },
                '한국': 15,
                '채권': 10,
                '현금': 8
            },

            '보수적': {
                '미국': {
                    'VOO': 20,
                    'SCHD': 10,
                    'VYM': 5
                },
                '유럽': {
                    'VGK': 8
                },
                '일본': {
                    'EWJ': 5
                },
                '선진국': {
                    'VEA': 10
                },
                '한국': 12,
                '채권': 20,
                '현금': 10
            }
        }

        return portfolios.get(risk_profile, portfolios['중립적'])

    def calculate_portfolio_metrics(self, portfolio: dict) -> dict:
        """포트폴리오 지표 계산"""

        # 지역별 집계
        regions = {
            'US': 0,
            'Europe': 0,
            'Japan': 0,
            'China': 0,
            'India': 0,
            'Korea': 0,
            'Emerging': 0,
            'Bonds': 0,
            'Cash': 0
        }

        region_map = {
            'QQQ': 'US', 'VTI': 'US', 'VGT': 'US', 'IWM': 'US',
            'VOO': 'US', 'SCHD': 'US', 'VYM': 'US',
            'VGK': 'Europe',
            'EWJ': 'Japan',
            'MCHI': 'China',
            'INDA': 'India',
            'VWO': 'Emerging', 'VEA': 'Emerging'
        }

        for category, items in portfolio.items():
            if isinstance(items, dict):
                for etf, weight in items.items():
                    region = region_map.get(etf, category)
                    if region in regions:
                        regions[region] += weight
            elif category in regions:
                regions[category] = items

        # 선진국 vs 신흥국
        developed = regions['US'] + regions['Europe'] + regions['Japan']
        emerging = regions['China'] + regions['India'] + regions['Emerging'] + regions['Korea']

        return {
            'regions': regions,
            'developed_pct': developed,
            'emerging_pct': emerging,
            'equity_pct': developed + emerging,
            'fixed_income_pct': regions['Bonds'],
            'cash_pct': regions['Cash']
        }

# 포트폴리오 구성
builder = GlobalPortfolioBuilder()

for profile in ['공격적', '중립적', '보수적']:
    portfolio = builder.build_model_portfolio(profile)
    metrics = builder.calculate_portfolio_metrics(portfolio)

    print(f"\n{'=' * 90}")
    print(f"{profile} 투자자 글로벌 포트폴리오")
    print("=" * 90)

    for region, allocation in portfolio.items():
        if isinstance(allocation, dict):
            print(f"\n{region}:")
            for etf, pct in allocation.items():
                print(f"  {etf}: {pct}%")
        else:
            print(f"{region}: {allocation}%")

    print(f"\n【포트폴리오 요약】")
    print(f"선진국: {metrics['developed_pct']}%")
    print(f"신흥국: {metrics['emerging_pct']}%")
    print(f"주식: {metrics['equity_pct']}%")
    print(f"채권: {metrics['fixed_income_pct']}%")
    print(f"현금: {metrics['cash_pct']}%")
\`\`\`

### 3.2 환율 리스크 관리

\`\`\`python
class CurrencyRiskManagement:
    """환율 리스크 관리"""

    def analyze_currency_impact(self,
                                portfolio_return: float,
                                fx_change: float) -> dict:
        """환율 변동 영향 분석"""

        # 달러 표시 수익률
        dollar_return = portfolio_return

        # 원화 환산 수익률
        krw_return = (1 + dollar_return/100) * (1 + fx_change/100) - 1
        krw_return *= 100

        # 환차익/손
        fx_impact = krw_return - dollar_return

        return {
            'dollar_return': dollar_return,
            'fx_change': fx_change,
            'krw_return': krw_return,
            'fx_impact': fx_impact,
            'interpretation': '환차익' if fx_impact > 0 else '환차손'
        }

    def hedging_strategies(self) -> dict:
        """환헤지 전략"""

        return {
            '전체 헤지': {
                'method': '환헤지 ETF 사용 (HEDJ, DXJ 등)',
                'pros': '환율 리스크 제거',
                'cons': '헤지 비용 (연 0.5~1%), 환차익 포기',
                'suitable': '달러 약세 예상 시'
            },

            '부분 헤지': {
                'method': '50% 일반 + 50% 헤지 ETF',
                'pros': '환율 변동 완화',
                'cons': '관리 복잡',
                'suitable': '환율 방향 불확실 시'
            },

            '무헤지': {
                'method': '일반 ETF만 투자',
                'pros': '저비용, 환차익 가능',
                'cons': '환율 변동 리스크 전체 부담',
                'suitable': '달러 강세 예상 시, 장기 투자'
            },

            '자연 헤지': {
                'method': '수출주 + 해외 투자 조합',
                'pros': '별도 헤지 비용 없음',
                'cons': '완벽한 헤지 어려움',
                'suitable': '포트폴리오 전체 관점'
            }
        }

# 환율 리스크 분석
fx_manager = CurrencyRiskManagement()

print("\n\n환율 변동 영향 시뮬레이션")
print("=" * 90)

scenarios = [
    {'name': '달러 강세 (원화 약세)', 'portfolio': 10, 'fx': 10},
    {'name': '달러 약세 (원화 강세)', 'portfolio': 10, 'fx': -10},
    {'name': '환율 중립', 'portfolio': 10, 'fx': 0},
]

for scenario in scenarios:
    result = fx_manager.analyze_currency_impact(
        scenario['portfolio'],
        scenario['fx']
    )

    print(f"\n【{scenario['name']}】")
    print(f"달러 표시 수익률: {result['dollar_return']:.1f}%")
    print(f"환율 변동: {result['fx_change']:+.1f}%")
    print(f"원화 환산 수익률: {result['krw_return']:.1f}%")
    print(f"환율 효과: {result['fx_impact']:+.1f}%p ({result['interpretation']})")

print("\n\n환헤지 전략")
print("=" * 90)
for strategy, details in fx_manager.hedging_strategies().items():
    print(f"\n【{strategy}】")
    for key, value in details.items():
        print(f"  {key}: {value}")
\`\`\`

## 4. 글로벌 투자 실전 가이드

### 4.1 계좌 개설 및 투자 방법

\`\`\`python
def investment_methods_guide() -> dict:
    """투자 방법 가이드"""

    methods = {
        '국내 상장 해외 ETF': {
            'examples': 'TIGER 미국S&P500, KODEX 미국나스닥100',
            'pros': '원화 투자, 간편, 세금 간단',
            'cons': '선택지 제한, 운용보수 높음 (0.5%)',
            'tax': '배당소득세 15.4%, 매매차익 비과세',
            'suitable': '초보자, 소액 투자자'
        },

        '해외 주식 직접 투자': {
            'examples': '미국 ETF (QQQ, SPY, VTI 등)',
            'pros': '저비용 (0.03~0.1%), 선택지 많음',
            'cons': '환전 필요, 세금 복잡',
            'tax': '배당 15% 원천징수 + 양도세 (250만원 공제)',
            'suitable': '중급자 이상, 장기 투자'
        },

        '해외 펀드': {
            'examples': '글로벌 주식형 펀드',
            'pros': '전문가 운용, 간편',
            'cons': '높은 수수료 (1~2%), 성과 불투명',
            'tax': '배당소득세 15.4%',
            'suitable': '전문가 의존형 투자자'
        }
    }

    return methods

print("\n\n글로벌 투자 방법")
print("=" * 90)

for method, details in investment_methods_guide().items():
    print(f"\n【{method}】")
    for key, value in details.items():
        print(f"{key}: {value}")

print("\n\n【권장】")
print("• 초보: 국내 ETF로 시작 → 익숙해지면 해외 직접 투자")
print("• 중급: 해외 ETF 중심 (저비용, 다양성)")
print("• 고급: 해외 ETF + 개별주 조합")
\`\`\`

### 4.2 세금 최적화

\`\`\`python
class TaxOptimization:
    """글로벌 투자 세금 최적화"""

    def calculate_tax_burden(self,
                            investment_type: str,
                            dividend: float,
                            capital_gain: float) -> dict:
        """세금 부담 계산"""

        tax_rules = {
            '국내 ETF': {
                'dividend_tax': dividend * 0.154,
                'capital_gain_tax': 0,  # 비과세
                'total_tax': dividend * 0.154
            },

            '해외 ETF': {
                'dividend_tax': dividend * 0.15,  # 미국 원천징수
                'capital_gain_tax': max((capital_gain - 2_500_000) * 0.22, 0),  # 250만원 공제
                'total_tax': dividend * 0.15 + max((capital_gain - 2_500_000) * 0.22, 0)
            },

            '해외 펀드': {
                'dividend_tax': (dividend + capital_gain) * 0.154,
                'capital_gain_tax': 0,
                'total_tax': (dividend + capital_gain) * 0.154
            }
        }

        result = tax_rules.get(investment_type, tax_rules['해외 ETF'])

        result['net_return'] = dividend + capital_gain - result['total_tax']
        result['tax_rate'] = result['total_tax'] / (dividend + capital_gain) * 100 if (dividend + capital_gain) > 0 else 0

        return result

    def tax_saving_tips(self) -> list:
        """절세 팁"""

        return [
            '양도소득 250만원 공제 활용: 매년 일부 매도하여 공제 최대화',
            '장기 보유: 배당 재투자로 복리 효과 (매도 최소화)',
            'ISA 계좌 활용: 국내 ETF 투자 시 200/400만원 비과세',
            '연금저축·IRP: 해외 ETF 가능, 세액공제 + 연금소득세 3~5%',
            '손익 통산: 수익 종목과 손실 종목 동시 매도로 과세 최소화',
            '배당 적은 ETF 선호: 배당보다 시세차익 중심 (QQQ vs VYM)'
        ]

tax_optimizer = TaxOptimization()

print("\n\n세금 부담 비교 (배당 100만원, 차익 500만원)")
print("=" * 90)

for invest_type in ['국내 ETF', '해외 ETF', '해외 펀드']:
    tax_result = tax_optimizer.calculate_tax_burden(invest_type, 1_000_000, 5_000_000)

    print(f"\n【{invest_type}】")
    print(f"배당세: {tax_result['dividend_tax']:,.0f}원")
    print(f"양도세: {tax_result['capital_gain_tax']:,.0f}원")
    print(f"총 세금: {tax_result['total_tax']:,.0f}원")
    print(f"세후 수익: {tax_result['net_return']:,.0f}원")
    print(f"실효세율: {tax_result['tax_rate']:.2f}%")

print("\n\n절세 전략")
print("=" * 90)
for i, tip in enumerate(tax_optimizer.tax_saving_tips(), 1):
    print(f"{i}. {tip}")
\`\`\`

## 5. 글로벌 투자 체크리스트

\`\`\`python
def global_investment_checklist():
    """글로벌 투자 체크리스트"""

    checklist = """
【글로벌 투자 실전 체크리스트】

■ 투자 준비
□ 투자 목적 및 기간 설정 (3년+)
□ 리스크 허용 수준 파악
□ 투자 가능 금액 결정
□ 해외 주식 계좌 개설 (필요시)

■ 포트폴리오 구성
□ 선진국 50~70% 배분
□ 신흥국 10~30% 배분
□ 국가/지역 분산 (5개국 이상)
□ 섹터 분산 (한 섹터 30% 이하)

■ ETF 선택
□ 운용보수 확인 (0.5% 이하 권장)
□ 순자산 규모 (100억 달러 이상 선호)
□ 추종 오차 확인
□ 배당 정책 확인 (재투자 vs 분배)

■ 환율 관리
□ 환율 전망 수립
□ 환헤지 여부 결정
□ 분할 매수로 환율 리스크 완화

■ 세금 관리
□ 투자 방식별 세금 이해
□ 양도소득 공제 활용 계획
□ ISA, 연금계좌 활용 검토

■ 리밸런싱
□ 리밸런싱 주기 설정 (연 1~2회)
□ 목표 비중 대비 ±5% 이탈 시 조정
□ 세금 고려하여 매도 최소화

■ 모니터링
□ 분기별 포트폴리오 점검
□ 글로벌 경제 뉴스 follow-up
□ 새로운 투자 기회 탐색
    """

    return checklist

print(global_investment_checklist())
\`\`\`

## 6. 결론: 글로벌 투자 성공 원칙

### 핵심 요약

1. **분산의 힘**: 한국만으로는 부족, 전 세계 분산 필수
2. **미국 중심**: 50~70% 미국 배분이 기본
3. **신흥국 기회**: 10~20% 중국·인도 등으로 성장 포착
4. **장기 투자**: 환율 변동에 흔들리지 않는 3년+ 관점
5. **저비용 ETF**: 수수료 0.5% 이하 상품 선택

\`\`\`python
def success_principles():
    """글로벌 투자 성공 원칙"""

    principles = {
        '분산': '한 바구니에 모든 계란을 담지 마라',
        '인내': '환율 변동은 장기적으로 수렴한다',
        '저비용': '1% 비용 차이 = 30년 후 35% 수익 차이',
        '규율': '시장 타이밍 아닌 정기 적립으로 승부',
        '학습': '글로벌 경제 흐름을 지속적으로 공부하라'
    }

    return principles

print("\n\n글로벌 투자 성공 5대 원칙")
print("=" * 90)
for principle, description in success_principles().items():
    print(f"\n{principle}:")
    print(f"  {description}")

final_message = """

"Don't put all your eggs in one basket."
한국은 전 세계 시총의 1.7%에 불과합니다.
나머지 98.3%의 기회를 놓치지 마세요.

글로벌 분산투자로
더 안정적이고 높은 수익을 추구하세요.
"""

print(final_message)
\`\`\`

---

**면책조항**: 이 글의 내용은 정보 제공 목적이며 투자 권유가 아닙니다. 해외 투자는 환율 변동, 지정학적 리스크 등 다양한 위험이 있습니다. 모든 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.
  `,
  publishedAt: '2025-01-30',
  readTime: 23,
  tags: [
    '글로벌투자',
    '해외주식',
    '미국주식',
    '신흥국',
    'ETF',
    '분산투자',
    '환율리스크',
    '중국투자',
    '인도투자',
    '일본투자',
    '포트폴리오',
    '국제분산'
  ]
};
