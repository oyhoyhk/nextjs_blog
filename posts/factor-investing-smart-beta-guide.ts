import { BlogPost } from '@/types';

export const post: BlogPost = {
  id: '118',
  title: '팩터 투자와 스마트 베타 전략: 체계적 초과수익 추구 완벽 가이드',
  slug: 'factor-investing-smart-beta-guide',
  category: 'quant',
  excerpt: '밸류, 모멘텀, 퀄리티, 사이즈, 변동성 등 검증된 투자 팩터를 활용하여 시장 대비 초과수익(알파)을 추구하는 체계적인 전략을 상세히 안내합니다. 학계 연구로 입증된 팩터 프리미엄을 실전에 적용하는 방법을 배워보세요.',
  content: `
# 팩터 투자와 스마트 베타 전략: 체계적 초과수익 추구 완벽 가이드

팩터 투자는 학계와 실무에서 수십 년간 연구되어 검증된 투자 접근법입니다. 특정한 주식 특성(팩터)이 장기적으로 초과수익을 가져다준다는 사실을 기반으로, 체계적이고 규칙 기반의 포트폴리오를 구성합니다. 이 가이드에서는 주요 팩터의 원리와 실전 활용법을 상세히 다룹니다.

## 1. 팩터 투자의 이해

### 1.1 팩터 투자란?

**정의**
- 주식 수익률을 설명하는 체계적인 특성(팩터)을 식별
- 해당 팩터에 높은 노출도를 가진 포트폴리오 구성
- 장기적으로 시장 대비 초과수익(알파) 추구

**전통적 투자 vs 팩터 투자**

\`\`\`python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class FactorInvesting:
    """팩터 투자 기본 개념"""

    def compare_approaches(self) -> pd.DataFrame:
        """투자 접근법 비교"""

        comparison = pd.DataFrame({
            '구분': [
                '목표',
                '방법론',
                '리스크',
                '투명성',
                '수수료',
                '리밸런싱'
            ],
            '전통적 액티브': [
                '알파 추구',
                '펀드매니저 판단',
                '매니저 리스크',
                '낮음 (블랙박스)',
                '높음 (1~2%)',
                '비정기적'
            ],
            '팩터 투자': [
                '팩터 프리미엄',
                '규칙 기반 체계',
                '팩터 리스크',
                '높음 (명확한 규칙)',
                '중간 (0.3~0.8%)',
                '정기적 (분기/반기)'
            ],
            '패시브 인덱스': [
                '시장 수익률',
                '시가총액 가중',
                '시장 리스크',
                '매우 높음',
                '매우 낮음 (<0.1%)',
                '연속적'
            ]
        })

        return comparison

    def explain_factor_premium(self) -> dict:
        """팩터 프리미엄의 원천"""

        sources = {
            '리스크 기반': {
                'description': '팩터 노출은 체계적 리스크를 감수하는 것',
                'example': '가치주는 재무적 디스트레스 리스크가 높음',
                'compensation': '리스크 프리미엄으로 초과수익'
            },
            '행동적 편향': {
                'description': '투자자들의 비합리적 행동이 가격 왜곡',
                'example': '모멘텀: 과잉반응, 가치: 과소평가',
                'compensation': '편향 이용한 수익 기회'
            },
            '구조적 장벽': {
                'description': '기관투자자의 제약으로 비효율 발생',
                'example': '소형주: 유동성 제약, 저변동성: 레버리지 제약',
                'compensation': '제약 없는 투자자에게 기회'
            }
        }

        return sources

# 기본 개념 출력
factor_inv = FactorInvesting()

print("투자 접근법 비교")
print("=" * 80)
print(factor_inv.compare_approaches().to_string(index=False))

print("\n\n팩터 프리미엄의 원천")
print("=" * 80)
for source, details in factor_inv.explain_factor_premium().items():
    print(f"\n【{source}】")
    for key, value in details.items():
        print(f"{key}: {value}")
\`\`\`

### 1.2 주요 팩터 소개

**학계에서 입증된 5대 팩터 (Fama-French 5 Factor Model)**

1. **Market (시장)**: 주식 전체의 리스크 프리미엄
2. **Size (규모)**: 소형주 > 대형주
3. **Value (가치)**: 저PBR > 고PBR
4. **Profitability (수익성)**: 고수익성 > 저수익성
5. **Investment (투자)**: 저투자 > 고투자

**추가 검증된 팩터**

6. **Momentum (모멘텀)**: 과거 상승주 > 하락주
7. **Quality (퀄리티)**: 우량기업 > 부실기업
8. **Low Volatility (저변동성)**: 저변동 > 고변동

\`\`\`python
class FactorDefinitions:
    """팩터 정의 및 측정"""

    def define_factors(self) -> dict:
        """주요 팩터 정의"""

        factors = {
            'Value (가치)': {
                'metrics': ['P/B (주가순자산비율)', 'P/E (주가수익비율)',
                           'P/S (주가매출비율)', 'EV/EBITDA'],
                'selection': '낮을수록 좋음 (저평가)',
                'rebalance': '연 1회',
                'historical_premium': '연 4~5%'
            },

            'Momentum (모멘텀)': {
                'metrics': ['12개월 수익률', '6개월 수익률 (최근 1개월 제외)'],
                'selection': '높을수록 좋음 (강한 추세)',
                'rebalance': '월 1회 또는 분기 1회',
                'historical_premium': '연 6~8%'
            },

            'Quality (퀄리티)': {
                'metrics': ['ROE', 'ROA', '부채비율', '이익 안정성',
                           '자산 성장률', 'Piotroski F-Score'],
                'selection': '높을수록 좋음 (우량기업)',
                'rebalance': '연 1회',
                'historical_premium': '연 3~4%'
            },

            'Size (규모)': {
                'metrics': ['시가총액'],
                'selection': '작을수록 좋음 (소형주)',
                'rebalance': '연 1회',
                'historical_premium': '연 2~3%'
            },

            'Low Volatility (저변동성)': {
                'metrics': ['표준편차 (1년)', '베타'],
                'selection': '낮을수록 좋음 (안정적)',
                'rebalance': '연 2회',
                'historical_premium': '연 3~4% (변동성 감소 + 수익)'
            }
        }

        return factors

    def calculate_factor_scores(self, stock_data: pd.DataFrame) -> pd.DataFrame:
        """팩터 점수 계산"""

        df = stock_data.copy()

        # Value Score (낮을수록 좋음 → 역수)
        df['value_score'] = (
            (1 / df['pb_ratio']).rank(pct=True) * 0.4 +
            (1 / df['pe_ratio']).rank(pct=True) * 0.3 +
            (1 / df['ps_ratio']).rank(pct=True) * 0.3
        )

        # Momentum Score
        df['momentum_score'] = df['return_12m'].rank(pct=True)

        # Quality Score
        df['quality_score'] = (
            df['roe'].rank(pct=True) * 0.3 +
            df['roa'].rank(pct=True) * 0.2 +
            (1 / df['debt_ratio']).rank(pct=True) * 0.2 +
            df['earnings_stability'].rank(pct=True) * 0.3
        )

        # Size Score (작을수록 좋음 → 역수)
        df['size_score'] = (1 / df['market_cap']).rank(pct=True)

        # Low Volatility Score (낮을수록 좋음 → 역수)
        df['low_vol_score'] = (1 / df['volatility']).rank(pct=True)

        # Composite Score (팩터들의 가중 평균)
        df['composite_score'] = (
            df['value_score'] * 0.25 +
            df['momentum_score'] * 0.25 +
            df['quality_score'] * 0.25 +
            df['low_vol_score'] * 0.25
        )

        return df

# 사용 예시
np.random.seed(42)

# 가상의 주식 데이터
stock_data = pd.DataFrame({
    'ticker': [f'STOCK{i}' for i in range(1, 21)],
    'market_cap': np.random.uniform(1000, 50000, 20),
    'pb_ratio': np.random.uniform(0.5, 3.0, 20),
    'pe_ratio': np.random.uniform(5, 25, 20),
    'ps_ratio': np.random.uniform(0.5, 5.0, 20),
    'roe': np.random.uniform(5, 25, 20),
    'roa': np.random.uniform(3, 15, 20),
    'debt_ratio': np.random.uniform(20, 150, 20),
    'earnings_stability': np.random.uniform(0.5, 0.95, 20),
    'return_12m': np.random.uniform(-20, 50, 20),
    'volatility': np.random.uniform(15, 45, 20)
})

factor_def = FactorDefinitions()

# 팩터 설명
print("주요 팩터 정의")
print("=" * 80)
for factor_name, details in factor_def.define_factors().items():
    print(f"\n【{factor_name}】")
    print(f"측정지표: {', '.join(details['metrics'])}")
    print(f"선정기준: {details['selection']}")
    print(f"리밸런싱: {details['rebalance']}")
    print(f"역사적 프리미엄: {details['historical_premium']}")

# 팩터 점수 계산
scored_stocks = factor_def.calculate_factor_scores(stock_data)

print("\n\n팩터 점수 상위 5 종목")
print("=" * 80)
top_5 = scored_stocks.nlargest(5, 'composite_score')[
    ['ticker', 'value_score', 'momentum_score', 'quality_score',
     'low_vol_score', 'composite_score']
]
print(top_5.to_string(index=False))
\`\`\`

## 2. 단일 팩터 전략

### 2.1 가치 (Value) 팩터 전략

**원리**
- 저평가된 주식이 장기적으로 시장을 outperform
- Ben Graham의 가치투자 철학을 계량화

\`\`\`python
class ValueFactorStrategy:
    """가치 팩터 전략"""

    def __init__(self):
        self.rebalance_frequency = 'yearly'

    def calculate_value_composite(self, df: pd.DataFrame) -> pd.DataFrame:
        """복합 가치 지표 계산"""

        # 각 밸류에이션 지표 z-score
        df['pb_zscore'] = -(df['pb_ratio'] - df['pb_ratio'].mean()) / df['pb_ratio'].std()
        df['pe_zscore'] = -(df['pe_ratio'] - df['pe_ratio'].mean()) / df['pe_ratio'].std()
        df['ps_zscore'] = -(df['ps_ratio'] - df['ps_ratio'].mean()) / df['ps_ratio'].std()

        # EV/EBITDA (기업가치 대비 영업이익)
        df['ev_ebitda'] = df['enterprise_value'] / df['ebitda']
        df['ev_ebitda_zscore'] = -(df['ev_ebitda'] - df['ev_ebitda'].mean()) / df['ev_ebitda'].std()

        # 복합 가치 점수
        df['value_composite'] = (
            df['pb_zscore'] * 0.25 +
            df['pe_zscore'] * 0.25 +
            df['ps_zscore'] * 0.2 +
            df['ev_ebitda_zscore'] * 0.3
        )

        return df

    def select_value_portfolio(self, df: pd.DataFrame,
                              top_pct: float = 0.2) -> pd.DataFrame:
        """가치 포트폴리오 선정"""

        # 최소 기준 필터
        df_filtered = df[
            (df['market_cap'] > 1000) &      # 시가총액 1조 이상
            (df['pe_ratio'] > 0) &           # 적자 기업 제외
            (df['debt_ratio'] < 200) &       # 부채비율 200% 미만
            (df['liquidity'] > 100000)       # 일평균 거래대금 1억 이상
        ].copy()

        # 가치 점수 계산
        df_scored = self.calculate_value_composite(df_filtered)

        # 상위 20% 선정
        n_stocks = int(len(df_scored) * top_pct)
        portfolio = df_scored.nlargest(n_stocks, 'value_composite')

        # 동일 가중
        portfolio['weight'] = 1.0 / len(portfolio)

        return portfolio[['ticker', 'value_composite', 'pb_ratio',
                         'pe_ratio', 'weight']]

    def backtest_value_strategy(self,
                                historical_data: dict,
                                start_date: str,
                                end_date: str,
                                rebalance_freq: str = 'Y') -> pd.DataFrame:
        """가치 전략 백테스트"""

        # 리밸런싱 시점
        dates = pd.date_range(start=start_date, end=end_date, freq=rebalance_freq)

        results = []
        for date in dates:
            # 해당 시점의 데이터
            df = historical_data[date]

            # 포트폴리오 구성
            portfolio = self.select_value_portfolio(df)

            # 다음 리밸런싱까지의 수익률
            # (실제로는 historical_data에서 가져와야 함)
            period_return = np.random.uniform(-10, 30)  # 예시

            results.append({
                'date': date,
                'n_stocks': len(portfolio),
                'avg_pb': portfolio['pb_ratio'].mean(),
                'avg_pe': portfolio['pe_ratio'].mean(),
                'period_return': period_return
            })

        return pd.DataFrame(results)

# 사용 예시
value_strategy = ValueFactorStrategy()

# 가상의 우주 데이터
universe = pd.DataFrame({
    'ticker': [f'STK{i:03d}' for i in range(1, 101)],
    'market_cap': np.random.uniform(1000, 100000, 100),
    'pb_ratio': np.random.lognormal(0.5, 0.5, 100),
    'pe_ratio': np.random.lognormal(2.5, 0.6, 100),
    'ps_ratio': np.random.lognormal(0.8, 0.7, 100),
    'enterprise_value': np.random.uniform(1200, 120000, 100),
    'ebitda': np.random.uniform(100, 10000, 100),
    'debt_ratio': np.random.uniform(20, 180, 100),
    'liquidity': np.random.uniform(50000, 5000000, 100)
})

value_portfolio = value_strategy.select_value_portfolio(universe, top_pct=0.2)

print("가치 팩터 포트폴리오 (상위 20%)")
print("=" * 80)
print(value_portfolio.head(10).to_string(index=False))
print(f"\n포트폴리오 평균 P/B: {value_portfolio['pb_ratio'].mean():.2f}")
print(f"포트폴리오 평균 P/E: {value_portfolio['pe_ratio'].mean():.2f}")
\`\`\`

### 2.2 모멘텀 (Momentum) 팩터 전략

**원리**
- 과거 상승한 주식이 단기~중기적으로 계속 상승
- "Trend is your friend" - 추세 지속성

\`\`\`python
class MomentumFactorStrategy:
    """모멘텀 팩터 전략"""

    def __init__(self):
        self.rebalance_frequency = 'quarterly'
        self.lookback_period = 252  # 12개월 (거래일 기준)
        self.skip_period = 21       # 최근 1개월 제외 (반전 효과)

    def calculate_momentum(self, price_data: pd.DataFrame) -> pd.DataFrame:
        """모멘텀 지표 계산"""

        df = price_data.copy()

        # 12개월 수익률 (최근 1개월 제외)
        df['momentum_12m'] = (
            df['price'] / df['price'].shift(self.lookback_period) - 1
        ) * 100

        # 최근 1개월 수익률 (별도 계산)
        df['momentum_1m'] = (
            df['price'] / df['price'].shift(self.skip_period) - 1
        ) * 100

        # 6개월 수익률
        df['momentum_6m'] = (
            df['price'] / df['price'].shift(126) - 1
        ) * 100

        # 모멘텀 강도 (최근 고점 대비)
        df['dist_from_high'] = (df['price'] / df['price'].rolling(252).max() - 1) * 100

        # 복합 모멘텀 점수
        df['momentum_score'] = (
            df['momentum_12m'].rank(pct=True) * 0.5 +
            df['momentum_6m'].rank(pct=True) * 0.3 +
            df['dist_from_high'].rank(pct=True) * 0.2
        )

        return df

    def select_momentum_portfolio(self,
                                  df: pd.DataFrame,
                                  top_pct: float = 0.2) -> pd.DataFrame:
        """모멘텀 포트폴리오 선정"""

        # 필터링
        df_filtered = df[
            (df['momentum_12m'] > 0) &           # 양의 모멘텀
            (df['momentum_6m'] > 0) &            # 6개월도 양
            (df['volume'] > df['volume'].rolling(60).mean()) &  # 거래량 증가
            (df['market_cap'] > 1000)            # 시총 1조 이상
        ].copy()

        # 상위 선정
        n_stocks = int(len(df_filtered) * top_pct)
        portfolio = df_filtered.nlargest(n_stocks, 'momentum_score')

        # 모멘텀 강도에 따른 가중치 (상위일수록 높은 비중)
        portfolio['weight'] = portfolio['momentum_score'] / portfolio['momentum_score'].sum()

        return portfolio

    def dual_momentum_strategy(self,
                              stock_prices: pd.DataFrame,
                              market_prices: pd.DataFrame) -> str:
        """이중 모멘텀 전략 (절대 + 상대)"""

        # 상대 모멘텀: 개별 주식 vs 시장
        stock_return = (stock_prices['price'].iloc[-1] /
                       stock_prices['price'].iloc[-252] - 1) * 100

        market_return = (market_prices['price'].iloc[-1] /
                        market_prices['price'].iloc[-252] - 1) * 100

        relative_momentum = stock_return > market_return

        # 절대 모멘텀: 주식 자체의 수익률이 양수인가?
        absolute_momentum = stock_return > 0

        # 의사결정
        if absolute_momentum and relative_momentum:
            return "매수: 강한 모멘텀"
        elif absolute_momentum and not relative_momentum:
            return "보류: 시장 대비 약함"
        else:
            return "회피: 약한 모멘텀"

# 모멘텀 전략 시연
np.random.seed(42)

# 가상의 가격 데이터 생성
dates = pd.date_range(end=datetime.now(), periods=300, freq='D')
tickers = [f'STK{i:03d}' for i in range(1, 51)]

# 각 종목의 가격 시뮬레이션
price_data = {}
for ticker in tickers:
    # 랜덤 워크 + 드리프트
    returns = np.random.normal(0.001, 0.02, 300)
    returns[100:200] += 0.002  # 중간에 모멘텀 기간
    prices = 100 * (1 + returns).cumprod()

    price_data[ticker] = {
        'price': prices[-1],
        'momentum_12m': ((prices[-1] / prices[0]) - 1) * 100,
        'momentum_6m': ((prices[-1] / prices[126]) - 1) * 100,
        'momentum_1m': ((prices[-1] / prices[-21]) - 1) * 100,
        'volume': np.random.uniform(100000, 1000000),
        'market_cap': np.random.uniform(1000, 50000)
    }

momentum_df = pd.DataFrame.from_dict(price_data, orient='index')
momentum_df.index.name = 'ticker'
momentum_df = momentum_df.reset_index()

# 모멘텀 점수 계산
momentum_df['momentum_score'] = (
    momentum_df['momentum_12m'].rank(pct=True) * 0.5 +
    momentum_df['momentum_6m'].rank(pct=True) * 0.5
)

# 상위 20% 선정
momentum_strategy = MomentumFactorStrategy()
top_20pct = int(len(momentum_df) * 0.2)
momentum_portfolio = momentum_df.nlargest(top_20pct, 'momentum_score').copy()
momentum_portfolio['weight'] = momentum_portfolio['momentum_score'] / momentum_portfolio['momentum_score'].sum()

print("모멘텀 팩터 포트폴리오")
print("=" * 90)
print(momentum_portfolio[['ticker', 'momentum_12m', 'momentum_6m',
                          'momentum_score', 'weight']].to_string(index=False))
print(f"\n평균 12M 수익률: {momentum_portfolio['momentum_12m'].mean():.2f}%")
\`\`\`

### 2.3 퀄리티 (Quality) 팩터 전략

**원리**
- 우량 기업(높은 수익성, 낮은 부채, 안정적 이익)이 장기적으로 우수
- Warren Buffett의 "훌륭한 기업을 적정가에" 철학

\`\`\`python
class QualityFactorStrategy:
    """퀄리티 팩터 전략"""

    def calculate_piotroski_fscore(self, financials: pd.DataFrame) -> pd.Series:
        """Piotroski F-Score (0-9점)"""

        score = 0

        # 수익성 (4점)
        score += (financials['net_income'] > 0).astype(int)
        score += (financials['roa'] > 0).astype(int)
        score += (financials['operating_cash_flow'] > 0).astype(int)
        score += (financials['operating_cash_flow'] > financials['net_income']).astype(int)

        # 레버리지/유동성 (3점)
        score += (financials['debt_ratio_current'] < financials['debt_ratio_previous']).astype(int)
        score += (financials['current_ratio_current'] > financials['current_ratio_previous']).astype(int)
        score += (financials['shares_outstanding_current'] <= financials['shares_outstanding_previous']).astype(int)

        # 운영 효율성 (2점)
        score += (financials['gross_margin_current'] > financials['gross_margin_previous']).astype(int)
        score += (financials['asset_turnover_current'] > financials['asset_turnover_previous']).astype(int)

        return score

    def calculate_quality_score(self, df: pd.DataFrame) -> pd.DataFrame:
        """종합 퀄리티 점수"""

        # ROE (자기자본이익률)
        df['roe_score'] = df['roe'].rank(pct=True)

        # ROA (총자산이익률)
        df['roa_score'] = df['roa'].rank(pct=True)

        # 부채비율 (낮을수록 좋음)
        df['leverage_score'] = (1 / (df['debt_ratio'] + 1)).rank(pct=True)

        # 이익 안정성 (변동성이 낮을수록 좋음)
        df['stability_score'] = (1 / df['earnings_volatility']).rank(pct=True)

        # 자산 성장률 (과도한 성장은 안 좋음)
        df['asset_growth_score'] = 1 - abs(df['asset_growth'] - 0.1).rank(pct=True)

        # 현금흐름/순이익 비율
        df['cash_quality_score'] = (df['operating_cf'] / df['net_income']).rank(pct=True)

        # 종합 점수
        df['quality_score'] = (
            df['roe_score'] * 0.2 +
            df['roa_score'] * 0.15 +
            df['leverage_score'] * 0.2 +
            df['stability_score'] * 0.15 +
            df['asset_growth_score'] * 0.15 +
            df['cash_quality_score'] * 0.15
        )

        return df

    def select_quality_portfolio(self, df: pd.DataFrame,
                                top_pct: float = 0.3) -> pd.DataFrame:
        """퀄리티 포트폴리오 선정"""

        # 최소 기준
        df_filtered = df[
            (df['roe'] > 15) &                   # ROE 15% 이상
            (df['roa'] > 5) &                    # ROA 5% 이상
            (df['debt_ratio'] < 100) &           # 부채비율 100% 미만
            (df['operating_cf'] > 0) &           # 양의 영업현금흐름
            (df['consecutive_profit_years'] >= 5) # 5년 연속 흑자
        ].copy()

        # 퀄리티 점수 계산
        df_scored = self.calculate_quality_score(df_filtered)

        # 상위 선정
        n_stocks = int(len(df_scored) * top_pct)
        portfolio = df_scored.nlargest(n_stocks, 'quality_score')

        # 동일 가중
        portfolio['weight'] = 1.0 / len(portfolio)

        return portfolio

# 퀄리티 전략 시연
np.random.seed(42)

quality_universe = pd.DataFrame({
    'ticker': [f'QTY{i:03d}' for i in range(1, 101)],
    'roe': np.random.uniform(0, 30, 100),
    'roa': np.random.uniform(-5, 20, 100),
    'debt_ratio': np.random.uniform(10, 200, 100),
    'earnings_volatility': np.random.uniform(5, 50, 100),
    'asset_growth': np.random.uniform(-10, 50, 100),
    'operating_cf': np.random.uniform(-100, 500, 100),
    'net_income': np.random.uniform(-50, 400, 100),
    'consecutive_profit_years': np.random.randint(0, 15, 100),
    'market_cap': np.random.uniform(1000, 100000, 100)
})

quality_universe['operating_cf'] = quality_universe['net_income'] * np.random.uniform(0.8, 1.3, 100)

quality_strategy = QualityFactorStrategy()
quality_portfolio = quality_strategy.select_quality_portfolio(quality_universe, top_pct=0.3)

print("퀄리티 팩터 포트폴리오")
print("=" * 90)
print(quality_portfolio[['ticker', 'roe', 'roa', 'debt_ratio',
                         'quality_score', 'weight']].head(10).to_string(index=False))
print(f"\n평균 ROE: {quality_portfolio['roe'].mean():.2f}%")
print(f"평균 부채비율: {quality_portfolio['debt_ratio'].mean():.2f}%")
\`\`\`

## 3. 멀티 팩터 전략

### 3.1 팩터 결합 방법

**3가지 주요 접근법**

1. **Sequential (순차적)**: Value → Quality → Momentum 순으로 필터링
2. **Composite (복합)**: 모든 팩터 점수를 합산/가중평균
3. **Intersection (교집합)**: 각 팩터 상위 종목들의 교집합

\`\`\`python
class MultiFactorStrategy:
    """멀티 팩터 전략"""

    def sequential_approach(self, df: pd.DataFrame) -> pd.DataFrame:
        """순차적 접근"""

        # 1단계: Value - 상위 50%
        value_cutoff = df['value_score'].quantile(0.5)
        df_value = df[df['value_score'] >= value_cutoff].copy()

        # 2단계: Quality - 상위 50%
        quality_cutoff = df_value['quality_score'].quantile(0.5)
        df_quality = df_value[df_value['quality_score'] >= quality_cutoff].copy()

        # 3단계: Momentum - 상위 30%
        momentum_cutoff = df_quality['momentum_score'].quantile(0.7)
        portfolio = df_quality[df_quality['momentum_score'] >= momentum_cutoff].copy()

        portfolio['weight'] = 1.0 / len(portfolio)

        return portfolio

    def composite_approach(self, df: pd.DataFrame,
                          factor_weights: dict = None) -> pd.DataFrame:
        """복합 점수 접근"""

        if factor_weights is None:
            factor_weights = {
                'value': 0.3,
                'momentum': 0.3,
                'quality': 0.3,
                'low_volatility': 0.1
            }

        # 복합 점수 계산
        df['composite_score'] = (
            df['value_score'] * factor_weights['value'] +
            df['momentum_score'] * factor_weights['momentum'] +
            df['quality_score'] * factor_weights['quality'] +
            df['low_vol_score'] * factor_weights['low_volatility']
        )

        # 상위 20% 선정
        n_stocks = int(len(df) * 0.2)
        portfolio = df.nlargest(n_stocks, 'composite_score').copy()

        # 복합 점수에 비례한 가중치
        portfolio['weight'] = portfolio['composite_score'] / portfolio['composite_score'].sum()

        return portfolio

    def intersection_approach(self, df: pd.DataFrame,
                             top_pct: float = 0.3) -> pd.DataFrame:
        """교집합 접근"""

        n_top = int(len(df) * top_pct)

        # 각 팩터별 상위 종목
        value_top = set(df.nlargest(n_top, 'value_score')['ticker'])
        momentum_top = set(df.nlargest(n_top, 'momentum_score')['ticker'])
        quality_top = set(df.nlargest(n_top, 'quality_score')['ticker'])

        # 교집합 (최소 2개 팩터에서 상위)
        intersection = (value_top & momentum_top) | \
                      (value_top & quality_top) | \
                      (momentum_top & quality_top)

        portfolio = df[df['ticker'].isin(intersection)].copy()
        portfolio['weight'] = 1.0 / len(portfolio)

        return portfolio

    def dynamic_factor_timing(self,
                             factor_returns: pd.DataFrame,
                             lookback: int = 12) -> dict:
        """동적 팩터 타이밍 (과거 성과 기반 가중치 조정)"""

        # 최근 12개월 팩터별 수익률
        recent_returns = factor_returns.tail(lookback)

        # 샤프 비율 계산
        sharpe_ratios = {}
        for factor in recent_returns.columns:
            mean_return = recent_returns[factor].mean()
            std_return = recent_returns[factor].std()
            sharpe = mean_return / std_return if std_return > 0 else 0
            sharpe_ratios[factor] = max(sharpe, 0)  # 음수는 0으로

        # 가중치 정규화
        total_sharpe = sum(sharpe_ratios.values())
        weights = {k: v/total_sharpe for k, v in sharpe_ratios.items()} if total_sharpe > 0 else {k: 0.25 for k in sharpe_ratios}

        return weights

# 멀티 팩터 전략 비교
np.random.seed(42)

multi_universe = pd.DataFrame({
    'ticker': [f'MF{i:03d}' for i in range(1, 201)],
    'value_score': np.random.uniform(0, 1, 200),
    'momentum_score': np.random.uniform(0, 1, 200),
    'quality_score': np.random.uniform(0, 1, 200),
    'low_vol_score': np.random.uniform(0, 1, 200)
})

multi_strategy = MultiFactorStrategy()

# 1. 순차적 접근
seq_portfolio = multi_strategy.sequential_approach(multi_universe)
print("1. 순차적 접근 (Value → Quality → Momentum)")
print("=" * 80)
print(f"종목 수: {len(seq_portfolio)}")
print(seq_portfolio[['ticker', 'value_score', 'quality_score', 'momentum_score']].head(5).to_string(index=False))

# 2. 복합 점수 접근
comp_portfolio = multi_strategy.composite_approach(multi_universe)
print("\n\n2. 복합 점수 접근 (가중 평균)")
print("=" * 80)
print(f"종목 수: {len(comp_portfolio)}")
print(comp_portfolio[['ticker', 'composite_score', 'weight']].head(5).to_string(index=False))

# 3. 교집합 접근
inter_portfolio = multi_strategy.intersection_approach(multi_universe, top_pct=0.3)
print("\n\n3. 교집합 접근 (2개 이상 팩터 상위)")
print("=" * 80)
print(f"종목 수: {len(inter_portfolio)}")
print(inter_portfolio[['ticker', 'value_score', 'momentum_score', 'quality_score']].head(5).to_string(index=False))

# 4. 동적 팩터 타이밍
factor_returns = pd.DataFrame({
    'value': np.random.normal(0.8, 3, 24),
    'momentum': np.random.normal(1.2, 4, 24),
    'quality': np.random.normal(0.6, 2, 24),
    'low_volatility': np.random.normal(0.5, 1.5, 24)
})

dynamic_weights = multi_strategy.dynamic_factor_timing(factor_returns, lookback=12)
print("\n\n4. 동적 팩터 가중치 (최근 12개월 샤프 비율 기반)")
print("=" * 80)
for factor, weight in dynamic_weights.items():
    print(f"{factor}: {weight:.2%}")
\`\`\`

### 3.2 팩터 포트폴리오 최적화

\`\`\`python
from scipy.optimize import minimize

class FactorPortfolioOptimization:
    """팩터 포트폴리오 최적화"""

    def mean_variance_optimization(self,
                                   expected_returns: np.ndarray,
                                   cov_matrix: np.ndarray,
                                   risk_aversion: float = 1.0) -> np.ndarray:
        """평균-분산 최적화"""

        n = len(expected_returns)

        # 목적함수: -수익 + 위험회피*리스크
        def objective(w):
            portfolio_return = np.dot(w, expected_returns)
            portfolio_risk = np.sqrt(np.dot(w, np.dot(cov_matrix, w)))
            return -(portfolio_return - risk_aversion * portfolio_risk)

        # 제약조건
        constraints = [
            {'type': 'eq', 'fun': lambda w: np.sum(w) - 1},  # 합 = 1
        ]

        # 범위 (0% ~ 10% per stock)
        bounds = tuple((0, 0.1) for _ in range(n))

        # 초기값
        w0 = np.array([1/n] * n)

        # 최적화
        result = minimize(objective, w0, method='SLSQP',
                         bounds=bounds, constraints=constraints)

        return result.x

    def factor_tilted_optimization(self,
                                   base_weights: np.ndarray,
                                   factor_exposures: pd.DataFrame,
                                   target_exposures: dict,
                                   max_deviation: float = 0.05) -> np.ndarray:
        """팩터 틸팅 최적화"""

        n = len(base_weights)

        # 목적함수: 베이스 가중치와의 차이 최소화
        def objective(w):
            return np.sum((w - base_weights) ** 2)

        # 팩터 노출도 제약
        factor_constraints = []
        for factor, target in target_exposures.items():
            exposure = factor_exposures[factor].values

            # 목표 노출도 달성
            factor_constraints.append({
                'type': 'ineq',
                'fun': lambda w, e=exposure, t=target: np.dot(w, e) - t + 0.1
            })
            factor_constraints.append({
                'type': 'ineq',
                'fun': lambda w, e=exposure, t=target: t + 0.1 - np.dot(w, e)
            })

        constraints = [
            {'type': 'eq', 'fun': lambda w: np.sum(w) - 1},  # 합 = 1
        ] + factor_constraints

        # 개별 종목 제약 (베이스 대비 ±max_deviation)
        bounds = tuple((max(0, b - max_deviation), min(0.1, b + max_deviation))
                      for b in base_weights)

        # 최적화
        result = minimize(objective, base_weights, method='SLSQP',
                         bounds=bounds, constraints=constraints)

        return result.x

    def risk_parity_factors(self, factor_cov_matrix: np.ndarray) -> np.ndarray:
        """팩터 리스크 패리티"""

        n = len(factor_cov_matrix)

        # 목적함수: 각 팩터의 리스크 기여도를 동일하게
        def objective(w):
            portfolio_var = np.dot(w, np.dot(factor_cov_matrix, w))
            marginal_contrib = np.dot(factor_cov_matrix, w)
            risk_contrib = w * marginal_contrib

            # 리스크 기여도의 분산 최소화
            target_contrib = portfolio_var / n
            return np.sum((risk_contrib - target_contrib) ** 2)

        constraints = [
            {'type': 'eq', 'fun': lambda w: np.sum(w) - 1},
        ]

        bounds = tuple((0.05, 0.6) for _ in range(n))
        w0 = np.array([1/n] * n)

        result = minimize(objective, w0, method='SLSQP',
                         bounds=bounds, constraints=constraints)

        return result.x

# 최적화 예시
np.random.seed(42)

# 100개 종목
n_stocks = 100

# 예상 수익률 (팩터 프리미엄 반영)
expected_returns = np.random.uniform(5, 15, n_stocks)

# 공분산 행렬 (간단화)
cov_matrix = np.random.uniform(0.8, 1.2, (n_stocks, n_stocks))
cov_matrix = (cov_matrix + cov_matrix.T) / 2  # 대칭
np.fill_diagonal(cov_matrix, np.random.uniform(10, 30, n_stocks))

# 평균-분산 최적화
optimizer = FactorPortfolioOptimization()
optimal_weights = optimizer.mean_variance_optimization(
    expected_returns, cov_matrix, risk_aversion=2.0
)

# 상위 10개 종목
top_10 = np.argsort(optimal_weights)[::-1][:10]
print("평균-분산 최적화 포트폴리오 (상위 10 종목)")
print("=" * 60)
for i in top_10:
    print(f"Stock{i:03d}: {optimal_weights[i]:.2%} (예상수익 {expected_returns[i]:.1f}%)")

print(f"\n포트폴리오 예상수익률: {np.dot(optimal_weights, expected_returns):.2f}%")
print(f"포트폴리오 리스크: {np.sqrt(np.dot(optimal_weights, np.dot(cov_matrix, optimal_weights))):.2f}%")

# 팩터 리스크 패리티
factor_cov = np.array([
    [4.0, 0.5, 0.3, 0.1],
    [0.5, 6.0, 0.2, 0.4],
    [0.3, 0.2, 3.0, 0.2],
    [0.1, 0.4, 0.2, 2.0]
])

rp_weights = optimizer.risk_parity_factors(factor_cov)
factors = ['Value', 'Momentum', 'Quality', 'Low Vol']

print("\n\n팩터 리스크 패리티 배분")
print("=" * 60)
for factor, weight in zip(factors, rp_weights):
    print(f"{factor}: {weight:.2%}")
\`\`\`

## 4. 팩터 투자 실전 가이드

### 4.1 한국 시장에서의 팩터 투자

\`\`\`python
class KoreaFactorInvesting:
    """한국 시장 팩터 투자"""

    def korea_specific_considerations(self) -> dict:
        """한국 시장 특수성"""

        return {
            '규모 팩터': {
                'strength': '강함 - 소형주 프리미엄 큼',
                'note': 'KOSDAQ 포함 시 더 강력',
                'caveat': '유동성 리스크 주의'
            },
            '가치 팩터': {
                'strength': '중간 - 미국보다 약함',
                'note': 'PBR이 PER보다 효과적',
                'caveat': '부실 기업 많아 퀄리티 필터 필수'
            },
            '모멘텀 팩터': {
                'strength': '강함 - 단기 모멘텀 특히 강력',
                'note': '3~6개월 모멘텀 효과적',
                'caveat': '변동성 크고 턴어라운드 빠름'
            },
            '퀄리티 팩터': {
                'strength': '매우 강함',
                'note': '재벌/대기업 프리미엄',
                'caveat': '밸류에이션 비쌀 수 있음'
            }
        }

    def korea_etf_options(self) -> dict:
        """한국 팩터 ETF"""

        return {
            'Value': [
                'KODEX 가치주 - 저PBR 종목',
                'TIGER 가치주 - 저PER, 저PBR',
                'ARIRANG 고배당주 - 배당+가치'
            ],
            'Momentum': [
                'KODEX 모멘텀 - 주가 모멘텀',
                'TIGER 테마 모멘텀 - 테마주'
            ],
            'Quality': [
                'KODEX 퀄리티 - 우량주',
                'TIGER ROE - 고수익성',
                'ARIRANG ESG우수기업 - 지속가능성'
            ],
            'Low Volatility': [
                'KODEX 미국S&P500변동성최소 - 해외',
                'TIGER 로우볼 - 저변동성'
            ],
            'Multi-Factor': [
                'KODEX 스마트 베타 - 멀티 팩터',
                'TIGER 팩터 포커스 - 복합 팩터'
            ]
        }

# 한국 시장 가이드
korea_factor = KoreaFactorInvesting()

print("한국 시장 팩터별 특성")
print("=" * 80)
for factor, details in korea_factor.korea_specific_considerations().items():
    print(f"\n【{factor}】")
    for key, value in details.items():
        print(f"  {key}: {value}")

print("\n\n한국 팩터 ETF 옵션")
print("=" * 80)
for factor, etfs in korea_factor.korea_etf_options().items():
    print(f"\n{factor}:")
    for etf in etfs:
        print(f"  • {etf}")
\`\`\`

### 4.2 팩터 투자 체크리스트

\`\`\`python
def factor_investing_checklist():
    """팩터 투자 실전 체크리스트"""

    checklist = """
【팩터 투자 실전 체크리스트】

■ 전략 설계
□ 투자할 팩터 선정 (단일 vs 멀티)
□ 팩터별 가중치 결정
□ 유니버스 정의 (시총, 유동성 기준)
□ 리밸런싱 빈도 설정 (분기/반기/연)
□ 백테스트로 역사적 성과 검증

■ 리스크 관리
□ 팩터 집중도 체크 (한 팩터 60% 이하)
□ 개별 종목 상한 설정 (5~10%)
□ 섹터 편중 확인 (한 섹터 40% 이하)
□ 드로다운 시뮬레이션
□ 스톱로스 규칙 (선택사항)

■ 실행
□ 거래 비용 고려 (0.3% 이상 시 조정 최소화)
□ 슬리피지 최소화 (시장가 아닌 지정가)
□ 세금 효율화 (장기 보유 시 비과세 활용)
□ 정기적 모니터링 (월 1회)

■ 지속성
□ 팩터 프리미엄 소멸 여부 모니터링
□ 새로운 팩터 연구 follow-up
□ 시장 환경 변화 대응
□ 장기 원칙 유지 (최소 3년)

■ 심리적 준비
□ 언더퍼폼 기간 감내 (1~2년 가능)
□ 팩터 로테이션 이해
□ 역발상 마인드 (가치주 = 불인기)
□ 규율 있는 리밸런싱
    """

    return checklist

print(factor_investing_checklist())
\`\`\`

## 5. 결론: 팩터 투자의 핵심 원칙

### 핵심 요약

1. **과학적 접근**: 학계 연구로 검증된 팩터 활용
2. **장기 관점**: 단기 성과에 흔들리지 않고 3~5년 이상 유지
3. **리스크 인식**: 팩터도 리스크 프리미엄 - 언더퍼폼 기간 존재
4. **분산 투자**: 단일 팩터보다 멀티 팩터로 리스크 완화
5. **비용 절감**: 빈번한 매매 자제, ETF 활용도 고려

\`\`\`python
def success_principles():
    """성공적인 팩터 투자 원칙"""

    principles = {
        '인내': '가치 팩터는 2000~2006년 7년간 언더퍼폼했지만 이후 크게 반등',
        '일관성': '시장이 좋을 때도 나쁠 때도 규칙을 따르라',
        '다각화': '여러 팩터에 분산하면 로버스트한 포트폴리오',
        '비용의식': '연 1% 비용 절감 = 20년 후 22% 추가 수익',
        '지속학습': '새로운 팩터 연구를 지속적으로 학습하라'
    }

    print("성공적인 팩터 투자 5대 원칙")
    print("=" * 60)
    for principle, description in principles.items():
        print(f"\n{principle}:")
        print(f"  {description}")

success_principles()

# 최종 요약
summary = """

【팩터 투자 최종 요약】

팩터 투자는 "왜 어떤 주식이 다른 주식보다 나은가?"에 대한 과학적 답변이다.

✓ 검증된 팩터: Value, Momentum, Quality, Size, Low Volatility
✓ 접근법: 단일 팩터 or 멀티 팩터 (복합/순차/교집합)
✓ 한국 시장: 모멘텀, 퀄리티 강력 / 가치는 퀄리티 필터 필수
✓ 실행: ETF (간편) or 직접 구성 (최적화 가능)
✓ 성공 열쇠: 인내 + 규율 + 장기 관점

"Smart Beta is not about being smarter than the market,
 but about being more disciplined than other investors."
"""

print(summary)
\`\`\`

---

**면책조항**: 이 글의 내용은 정보 제공 목적이며 투자 권유가 아닙니다. 팩터 투자도 리스크가 있으며, 과거 성과가 미래를 보장하지 않습니다. 모든 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.
  `,
  publishedAt: '2025-01-29',
  readTime: 24,
  tags: [
    '팩터투자',
    '스마트베타',
    'Value',
    'Momentum',
    'Quality',
    '퀀트투자',
    '알파',
    '초과수익',
    '멀티팩터',
    '포트폴리오최적화',
    'ETF',
    '체계적투자'
  ]
};
