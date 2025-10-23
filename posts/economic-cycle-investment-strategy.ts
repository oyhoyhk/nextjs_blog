import { BlogPost } from '@/types';

export const post: BlogPost = {
  id: '117',
  title: '경제 사이클별 투자 전략: 경기 순환에 따른 자산 배분 완벽 가이드',
  slug: 'economic-cycle-investment-strategy',
  category: 'economy',
  excerpt: '경기 확장, 정점, 침체, 저점의 4단계 경제 사이클을 이해하고 각 국면별 최적의 자산 배분 전략을 수립하는 방법을 상세히 안내합니다. 주요 경제 지표로 사이클을 판단하고 선제적으로 포트폴리오를 조정하는 실전 전략을 배워보세요.',
  content: `
# 경제 사이클별 투자 전략: 경기 순환에 따른 자산 배분 완벽 가이드

경제는 끊임없이 순환합니다. 확장과 침체를 반복하는 경제 사이클을 이해하고 선제적으로 대응하는 것은 장기 투자 성공의 핵심입니다. 이 가이드에서는 경제 사이클의 4단계를 분석하고 각 국면에 맞는 최적의 자산 배분 전략을 제시합니다.

## 1. 경제 사이클의 이해

### 1.1 4단계 경제 사이클

**확장기 (Early Expansion)**
- GDP 성장률 상승
- 실업률 하락
- 소비자 신뢰지수 증가
- 기업 이익 개선
- 금리 저점에서 완만한 상승

**정점기 (Peak/Late Expansion)**
- GDP 성장률 둔화 조짐
- 완전 고용 수준
- 인플레이션 압력 증가
- 중앙은행 긴축 정책
- 금리 고점 근접

**침체기 (Contraction/Recession)**
- GDP 마이너스 성장
- 실업률 급등
- 소비 및 투자 감소
- 기업 실적 악화
- 금리 인하 시작

**저점기 (Trough/Early Recovery)**
- GDP 성장률 바닥 확인
- 선행지표 개선 신호
- 정책 부양 효과 나타남
- 시장 심리 극도로 비관적
- 금리 저점 형성

### 1.2 주요 사이클 판단 지표

\`\`\`python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

class EconomicCycleIndicator:
    """경제 사이클 판단 지표 분석"""

    def __init__(self):
        self.indicators = {}

    def calculate_yield_curve(self, rate_10y: float, rate_2y: float) -> dict:
        """수익률 곡선 분석 (가장 중요한 선행지표)"""
        spread = rate_10y - rate_2y

        if spread < 0:
            signal = "침체 경고"
            probability = abs(spread) * 30  # 역전 정도에 따른 확률
        elif spread < 0.5:
            signal = "주의"
            probability = 40
        elif spread < 1.0:
            signal = "정상"
            probability = 20
        else:
            signal = "확장"
            probability = 10

        return {
            'spread': spread,
            'signal': signal,
            'recession_probability': min(probability, 85)
        }

    def analyze_leading_indicators(self, data: dict) -> str:
        """선행지표 종합 분석"""
        score = 0
        max_score = 10

        # 1. ISM 제조업 지수 (>50 확장, <50 침체)
        if data['ism_manufacturing'] > 55:
            score += 2
        elif data['ism_manufacturing'] > 50:
            score += 1
        elif data['ism_manufacturing'] < 45:
            score -= 2
        else:
            score -= 1

        # 2. 소비자 신뢰지수 (전월 대비)
        if data['consumer_confidence_change'] > 5:
            score += 2
        elif data['consumer_confidence_change'] > 0:
            score += 1
        elif data['consumer_confidence_change'] < -5:
            score -= 2
        else:
            score -= 1

        # 3. 건축 허가 건수 (전년 대비)
        if data['building_permits_yoy'] > 10:
            score += 1
        elif data['building_permits_yoy'] < -10:
            score -= 1

        # 4. 주식시장 모멘텀 (6개월 수익률)
        if data['stock_return_6m'] > 15:
            score += 2
        elif data['stock_return_6m'] > 5:
            score += 1
        elif data['stock_return_6m'] < -15:
            score -= 2
        else:
            score -= 1

        # 5. 신규 실업수당 청구 (4주 평균 변화)
        if data['jobless_claims_change'] < -5:
            score += 2
        elif data['jobless_claims_change'] < 0:
            score += 1
        elif data['jobless_claims_change'] > 10:
            score -= 2
        else:
            score -= 1

        # 사이클 판단
        if score >= 6:
            return "확장기"
        elif score >= 2:
            return "정점기"
        elif score >= -2:
            return "침체 초기"
        else:
            return "침체기/저점"

    def calculate_cycle_score(self, indicators: dict) -> dict:
        """종합 사이클 점수 계산"""

        # 수익률 곡선
        yield_curve = self.calculate_yield_curve(
            indicators['rate_10y'],
            indicators['rate_2y']
        )

        # 선행지표
        cycle_phase = self.analyze_leading_indicators(indicators)

        # GDP 트렌드
        gdp_trend = np.mean(indicators['gdp_growth_3q'])  # 최근 3분기 평균

        # 인플레이션 압력
        inflation_pressure = indicators['cpi_yoy'] - 2.0  # 2% 목표 대비

        return {
            'cycle_phase': cycle_phase,
            'yield_curve': yield_curve,
            'gdp_trend': gdp_trend,
            'inflation_pressure': inflation_pressure,
            'recession_probability': yield_curve['recession_probability']
        }

# 사용 예시
cycle_analyzer = EconomicCycleIndicator()

# 2024년 1월 예시 데이터
current_indicators = {
    'rate_10y': 4.2,
    'rate_2y': 4.5,  # 역전 상태
    'ism_manufacturing': 47.5,
    'consumer_confidence_change': -3.2,
    'building_permits_yoy': -8.5,
    'stock_return_6m': -5.2,
    'jobless_claims_change': 8.5,
    'gdp_growth_3q': [2.1, 1.8, 1.5],
    'cpi_yoy': 3.2
}

result = cycle_analyzer.calculate_cycle_score(current_indicators)
print(f"현재 경기 국면: {result['cycle_phase']}")
print(f"수익률 곡선: {result['yield_curve']['spread']:.2f}% ({result['yield_curve']['signal']})")
print(f"침체 확률: {result['recession_probability']:.1f}%")
print(f"GDP 트렌드: {result['gdp_trend']:.1f}%")
print(f"인플레이션 압력: {result['inflation_pressure']:.1f}%p")
\`\`\`

## 2. 사이클별 자산 배분 전략

### 2.1 확장기 (Early Expansion) 전략

**핵심 특징**
- 경기 회복 초기 단계
- 유동성 풍부, 저금리 환경
- 리스크 자산 강세 시작

**최적 자산 배분**

\`\`\`python
def early_expansion_portfolio() -> dict:
    """확장기 포트폴리오 배분"""

    portfolio = {
        # 주식 60% (공격적)
        'stocks': {
            'cyclical_stocks': 25,      # 경기민감주 (건설, 자동차, 화학)
            'small_cap_growth': 15,     # 소형 성장주
            'financial_stocks': 10,     # 금융주 (금리 상승 초기 수혜)
            'technology': 10,           # 기술주
        },

        # 채권 25% (듀레이션 짧게)
        'bonds': {
            'short_term_bonds': 15,     # 단기채 (금리 상승 대비)
            'corporate_bonds': 10,      # 회사채 (크레딧 스프레드 축소)
        },

        # 대체투자 10%
        'alternatives': {
            'real_estate': 5,           # 부동산 (경기 회복 수혜)
            'commodities': 5,           # 원자재 (수요 증가)
        },

        # 현금 5%
        'cash': 5
    }

    return portfolio

# 섹터별 투자 아이디어
expansion_sectors = {
    '소비재': ['자동차', '가전', '의류', '여행'],
    '산업재': ['건설', '기계', '항공', '물류'],
    '금융': ['은행', '증권', '보험'],
    '원자재': ['철강', '화학', '비철금속'],
    '부동산': ['건설사', '리츠', '개발업체']
}

print("확장기 포트폴리오:")
for asset_class, allocation in early_expansion_portfolio().items():
    if isinstance(allocation, dict):
        print(f"\n{asset_class}:")
        for item, pct in allocation.items():
            print(f"  - {item}: {pct}%")
    else:
        print(f"{asset_class}: {allocation}%")
\`\`\`

**실전 체크리스트**
- [ ] GDP 성장률이 2분기 연속 플러스로 전환
- [ ] 실업률이 정점에서 하락 시작
- [ ] 수익률 곡선이 정상화(역전 해소)
- [ ] ISM 제조업 지수가 50 돌파
- [ ] 주식 밸류에이션이 여전히 매력적
- [ ] 중앙은행의 완화적 스탠스 유지

### 2.2 정점기 (Peak/Late Expansion) 전략

**핵심 특징**
- 경기 과열 조짐
- 인플레이션 상승
- 중앙은행 긴축 시작
- 밸류에이션 부담 증가

**최적 자산 배분**

\`\`\`python
def peak_portfolio() -> dict:
    """정점기 포트폴리오 배분 (방어적 전환)"""

    portfolio = {
        # 주식 45% (방어주로 전환)
        'stocks': {
            'defensive_stocks': 20,     # 필수소비재, 헬스케어, 유틸리티
            'quality_dividend': 15,     # 우량 배당주
            'technology': 10,           # 기술주 (비중 축소)
        },

        # 채권 30% (듀레이션 중립)
        'bonds': {
            'tips': 15,                 # 물가연동채 (인플레이션 헤지)
            'investment_grade': 10,     # 투자등급 회사채
            'short_term_bonds': 5,      # 단기채
        },

        # 대체투자 15%
        'alternatives': {
            'gold': 8,                  # 금 (인플레이션 헤지)
            'commodities': 4,           # 원자재
            'real_estate': 3,           # 부동산 (비중 축소)
        },

        # 현금 10% (기회 대기)
        'cash': 10
    }

    return portfolio

def calculate_valuation_metrics(current_pe: float,
                                historical_avg_pe: float,
                                earnings_growth: float) -> dict:
    """밸류에이션 과열 체크"""

    # PE 비율 분석
    pe_premium = (current_pe / historical_avg_pe - 1) * 100

    # PEG 비율 (PE / 성장률)
    peg_ratio = current_pe / earnings_growth if earnings_growth > 0 else float('inf')

    # 과열 판단
    if pe_premium > 30 and peg_ratio > 2.0:
        signal = "과열 - 비중 축소 권장"
    elif pe_premium > 15 and peg_ratio > 1.5:
        signal = "주의 - 방어주로 전환"
    else:
        signal = "정상 범위"

    return {
        'pe_premium': pe_premium,
        'peg_ratio': peg_ratio,
        'signal': signal
    }

# S&P 500 예시
valuation = calculate_valuation_metrics(
    current_pe=22.5,
    historical_avg_pe=16.8,
    earnings_growth=8.5
)

print(f"밸류에이션 프리미엄: {valuation['pe_premium']:.1f}%")
print(f"PEG 비율: {valuation['peg_ratio']:.2f}")
print(f"신호: {valuation['signal']}")
\`\`\`

**실전 체크리스트**
- [ ] 수익률 곡선 평탄화 또는 역전
- [ ] 인플레이션이 중앙은행 목표치 상회
- [ ] 연준이 긴축 사이클에 진입
- [ ] 주택시장 과열 신호 (가격 급등, 거래량 급증)
- [ ] 주식 밸류에이션 역사적 고점 근접
- [ ] 투자자 심리 지나치게 낙관적

### 2.3 침체기 (Contraction/Recession) 전략

**핵심 특징**
- GDP 마이너스 성장
- 실업률 급등
- 기업 실적 악화
- 주식 약세장
- 금리 인하

**최적 자산 배분**

\`\`\`python
def recession_portfolio() -> dict:
    """침체기 포트폴리오 배분 (안전자산 중심)"""

    portfolio = {
        # 주식 25% (최소 비중, 고품질만)
        'stocks': {
            'defensive_stocks': 15,     # 필수소비재, 헬스케어
            'quality_large_cap': 10,    # 우량 대형주 (재무 건전)
        },

        # 채권 50% (안전자산, 장기채)
        'bonds': {
            'long_term_treasury': 25,   # 장기 국채 (금리 하락 수혜)
            'investment_grade': 15,     # 투자등급 회사채
            'short_term_bonds': 10,     # 단기채 (유동성)
        },

        # 대체투자 10%
        'alternatives': {
            'gold': 10,                 # 금 (안전자산)
        },

        # 현금 15% (바닥 매수 대기)
        'cash': 15
    }

    return portfolio

class RecessionStrategy:
    """침체기 투자 전략"""

    def identify_quality_stocks(self, stock_data: dict) -> bool:
        """침체기에도 생존 가능한 우량주 선별"""

        criteria = {
            # 재무 건전성
            'debt_to_equity': stock_data['debt_to_equity'] < 0.5,
            'current_ratio': stock_data['current_ratio'] > 1.5,
            'interest_coverage': stock_data['interest_coverage'] > 5,

            # 수익성
            'roe': stock_data['roe'] > 15,
            'operating_margin': stock_data['operating_margin'] > 15,

            # 배당
            'dividend_yield': stock_data['dividend_yield'] > 2.5,
            'dividend_growth_years': stock_data['dividend_growth_years'] > 10,

            # 시장 지위
            'market_share': stock_data['market_share'] > 20,  # 업계 1~2위
        }

        # 7개 이상 기준 충족 시 매수 후보
        return sum(criteria.values()) >= 7

    def calculate_dca_schedule(self, total_amount: float,
                               months: int,
                               volatility_adjusted: bool = True) -> pd.DataFrame:
        """침체기 분할 매수 스케줄"""

        if volatility_adjusted:
            # 변동성이 클 때 더 많이 매수
            # 가상의 변동성 데이터
            volatility = np.random.uniform(15, 45, months)  # VIX 수준
            weights = volatility / volatility.sum()
        else:
            # 균등 분할
            weights = np.ones(months) / months

        amounts = total_amount * weights

        schedule = pd.DataFrame({
            'month': range(1, months + 1),
            'amount': amounts,
            'cumulative': amounts.cumsum()
        })

        return schedule

# 우량주 선별 예시
stock_example = {
    'debt_to_equity': 0.35,
    'current_ratio': 2.1,
    'interest_coverage': 12.5,
    'roe': 18.5,
    'operating_margin': 22.3,
    'dividend_yield': 3.2,
    'dividend_growth_years': 15,
    'market_share': 28
}

strategy = RecessionStrategy()
is_quality = strategy.identify_quality_stocks(stock_example)
print(f"우량주 기준 충족: {is_quality}")

# 1억원 12개월 분할 매수
dca_schedule = strategy.calculate_dca_schedule(
    total_amount=100_000_000,
    months=12,
    volatility_adjusted=True
)
print("\n분할 매수 스케줄:")
print(dca_schedule.to_string(index=False))
\`\`\`

**실전 체크리스트**
- [ ] GDP 2분기 연속 마이너스 성장
- [ ] 실업률 급등 (전년 대비 +2%p 이상)
- [ ] 기업 이익 전년 대비 20% 이상 감소
- [ ] 주식 약세장 진입 (고점 대비 -20% 이상)
- [ ] VIX 지수 30 이상 (공포 국면)
- [ ] 중앙은행 긴급 금리 인하

### 2.4 저점기 (Trough/Early Recovery) 전략

**핵심 특징**
- 최악은 지났지만 여전히 부정적
- 선행지표는 개선 조짐
- 정책 부양 효과 시작
- 극도의 비관론 (기회)

**최적 자산 배분**

\`\`\`python
def trough_portfolio() -> dict:
    """저점기 포트폴리오 배분 (공격적 매수)"""

    portfolio = {
        # 주식 55% (적극 매수)
        'stocks': {
            'cyclical_stocks': 20,      # 경기민감주 (회복 최대 수혜)
            'small_mid_cap': 15,        # 중소형주 (고베타)
            'value_stocks': 15,         # 가치주 (저평가)
            'financial_stocks': 5,      # 금융주
        },

        # 채권 20% (비중 축소)
        'bonds': {
            'short_term_bonds': 10,     # 단기채
            'corporate_bonds': 10,      # 회사채 (크레딧 개선 기대)
        },

        # 대체투자 15%
        'alternatives': {
            'real_estate': 8,           # 부동산 (저점 매수)
            'commodities': 7,           # 원자재 (회복 수혜)
        },

        # 현금 10% (추가 매수 여력)
        'cash': 10
    }

    return portfolio

class BottomFishing:
    """바닥 확인 및 매수 전략"""

    def check_bottom_signals(self, market_data: dict) -> dict:
        """바닥 신호 체크"""

        signals = {}
        score = 0

        # 1. 기술적 지표
        if market_data['oversold_ratio'] > 80:  # 과매도 종목 80% 이상
            signals['technical'] = True
            score += 2
        else:
            signals['technical'] = False

        # 2. 센티먼트
        if market_data['put_call_ratio'] > 1.3:  # 극도의 공포
            signals['sentiment'] = True
            score += 2
        else:
            signals['sentiment'] = False

        # 3. 밸류에이션
        if market_data['pe_ratio'] < market_data['historical_avg_pe'] * 0.7:
            signals['valuation'] = True
            score += 2
        else:
            signals['valuation'] = False

        # 4. 선행지표 개선
        if market_data['leading_index_3m_change'] > 0:
            signals['leading_indicators'] = True
            score += 2
        else:
            signals['leading_indicators'] = False

        # 5. 정책 대응
        if market_data['rate_cuts_count'] >= 2:  # 2회 이상 금리 인하
            signals['policy'] = True
            score += 2
        else:
            signals['policy'] = False

        # 종합 판단
        if score >= 6:
            recommendation = "적극 매수"
        elif score >= 4:
            recommendation = "분할 매수"
        else:
            recommendation = "관망"

        return {
            'signals': signals,
            'score': score,
            'max_score': 10,
            'recommendation': recommendation
        }

    def calculate_recovery_potential(self,
                                    current_price: float,
                                    historical_avg_pe: float,
                                    current_eps: float,
                                    recovery_eps_growth: float,
                                    years: int = 2) -> dict:
        """회복 시 상승 잠재력 계산"""

        # 현재 밸류에이션
        current_value = current_price

        # 회복 후 예상 EPS
        future_eps = current_eps * ((1 + recovery_eps_growth) ** years)

        # 정상 밸류에이션 적용
        target_price = future_eps * historical_avg_pe

        # 상승 여력
        upside = (target_price / current_value - 1) * 100

        # 연평균 수익률
        cagr = ((target_price / current_value) ** (1/years) - 1) * 100

        return {
            'current_price': current_value,
            'target_price': target_price,
            'upside_potential': upside,
            'expected_cagr': cagr
        }

# 바닥 신호 체크 예시
bottom_fisher = BottomFishing()

market_data = {
    'oversold_ratio': 85,
    'put_call_ratio': 1.45,
    'pe_ratio': 11.2,
    'historical_avg_pe': 16.8,
    'leading_index_3m_change': 1.2,
    'rate_cuts_count': 3
}

bottom_check = bottom_fisher.check_bottom_signals(market_data)
print("바닥 신호 체크:")
for signal, status in bottom_check['signals'].items():
    print(f"  {signal}: {'✓' if status else '✗'}")
print(f"\n점수: {bottom_check['score']}/{bottom_check['max_score']}")
print(f"권장: {bottom_check['recommendation']}")

# 회복 잠재력 계산
recovery = bottom_fisher.calculate_recovery_potential(
    current_price=100,
    historical_avg_pe=16.8,
    current_eps=7.5,
    recovery_eps_growth=0.15,
    years=2
)

print(f"\n회복 시나리오:")
print(f"현재 가격: {recovery['current_price']:,.0f}")
print(f"목표 가격: {recovery['target_price']:,.0f}")
print(f"상승 여력: {recovery['upside_potential']:.1f}%")
print(f"연평균 수익률: {recovery['expected_cagr']:.1f}%")
\`\`\`

**실전 체크리스트**
- [ ] 선행지표 3개월 연속 개선
- [ ] 실업률 증가 속도 둔화
- [ ] ISM 제조업 지수 45 돌파 (바닥 확인)
- [ ] 주식 밸류에이션 역사적 저점 수준
- [ ] 투자자 심리 극도로 비관적 (VIX > 35)
- [ ] 연준의 강력한 부양책 시행

## 3. 사이클 전환 포착 전략

### 3.1 조기 경보 시스템

\`\`\`python
class CycleTransitionAlert:
    """경제 사이클 전환 조기 경보"""

    def __init__(self):
        self.alert_threshold = 3  # 3개 이상 신호 시 경보

    def expansion_to_peak_signals(self, data: dict) -> dict:
        """확장 → 정점 전환 신호"""

        signals = []

        # 1. 수익률 곡선 평탄화
        if data['yield_curve_spread'] < 0.5:
            signals.append("수익률 곡선 평탄화")

        # 2. 실업률 저점 (완전 고용)
        if data['unemployment_rate'] < 4.0:
            signals.append("완전 고용 도달")

        # 3. 인플레이션 가속
        if data['cpi_yoy'] > data['target_inflation'] + 1.0:
            signals.append("인플레이션 목표치 상회")

        # 4. 연준 매파적 전환
        if data['rate_hikes_12m'] >= 4:
            signals.append("공격적 긴축 정책")

        # 5. 주택시장 과열
        if data['home_price_yoy'] > 15:
            signals.append("주택 가격 급등")

        # 6. 신용 스프레드 확대 시작
        if data['credit_spread_3m_change'] > 20:  # bps
            signals.append("크레딧 스프레드 확대")

        alert = len(signals) >= self.alert_threshold

        return {
            'transition': '확장 → 정점',
            'signals': signals,
            'alert': alert,
            'action': '방어주로 전환 및 현금 비중 확대' if alert else '관찰 지속'
        }

    def peak_to_recession_signals(self, data: dict) -> dict:
        """정점 → 침체 전환 신호"""

        signals = []

        # 1. 수익률 곡선 역전
        if data['yield_curve_spread'] < 0:
            signals.append("수익률 곡선 역전")

        # 2. 선행지표 급락
        if data['lei_6m_change'] < -2:
            signals.append("선행경제지수 급락")

        # 3. 기업 이익 역성장
        if data['earnings_growth_yoy'] < 0:
            signals.append("기업 이익 감소")

        # 4. 소비자 신뢰 급락
        if data['consumer_confidence_6m_change'] < -15:
            signals.append("소비자 신뢰 붕괴")

        # 5. 주택 착공 급감
        if data['housing_starts_yoy'] < -20:
            signals.append("주택 착공 급감")

        # 6. 실업률 상승 시작
        if data['unemployment_3m_change'] > 0.5:
            signals.append("실업률 반등")

        alert = len(signals) >= self.alert_threshold

        return {
            'transition': '정점 → 침체',
            'signals': signals,
            'alert': alert,
            'action': '안전자산 확대 및 현금 비중 20% 이상' if alert else '주의 관찰'
        }

    def recession_to_recovery_signals(self, data: dict) -> dict:
        """침체 → 회복 전환 신호"""

        signals = []

        # 1. 선행지표 반등
        if data['lei_3m_change'] > 0:
            signals.append("선행경제지수 반등")

        # 2. 신규 실업수당 청구 감소
        if data['jobless_claims_4w_change'] < -10:
            signals.append("신규 실업수당 감소")

        # 3. ISM 바닥 확인
        if data['ism_manufacturing'] > 45 and data['ism_3m_change'] > 0:
            signals.append("ISM 지수 바닥 확인")

        # 4. 소비자 심리 개선
        if data['consumer_confidence_3m_change'] > 10:
            signals.append("소비자 심리 개선")

        # 5. 주택시장 안정화
        if data['existing_home_sales_3m_change'] > 5:
            signals.append("주택 거래 증가")

        # 6. 크레딧 스프레드 축소
        if data['credit_spread_3m_change'] < -30:  # bps
            signals.append("크레딧 리스크 완화")

        alert = len(signals) >= self.alert_threshold

        return {
            'transition': '침체 → 회복',
            'signals': signals,
            'alert': alert,
            'action': '경기민감주 적극 매수' if alert else '분할 매수 시작'
        }

# 사용 예시
cycle_alert = CycleTransitionAlert()

# 확장 → 정점 체크
expansion_data = {
    'yield_curve_spread': 0.3,
    'unemployment_rate': 3.7,
    'cpi_yoy': 4.2,
    'target_inflation': 2.0,
    'rate_hikes_12m': 5,
    'home_price_yoy': 18.5,
    'credit_spread_3m_change': 25
}

alert1 = cycle_alert.expansion_to_peak_signals(expansion_data)
print("=" * 60)
print(f"전환 체크: {alert1['transition']}")
print(f"경보: {'⚠️ 예' if alert1['alert'] else '아니오'}")
print(f"\n감지된 신호 ({len(alert1['signals'])}개):")
for signal in alert1['signals']:
    print(f"  • {signal}")
print(f"\n권장 조치: {alert1['action']}")
\`\`\`

### 3.2 리밸런싱 전략

\`\`\`python
import pandas as pd
from datetime import datetime

class CycleBasedRebalancing:
    """사이클 기반 리밸런싱"""

    def __init__(self, initial_portfolio: dict, total_value: float):
        self.portfolio = initial_portfolio
        self.total_value = total_value
        self.history = []

    def calculate_target_allocation(self, cycle_phase: str) -> dict:
        """사이클별 목표 배분"""

        allocations = {
            '확장기': {
                'stocks': 60,
                'bonds': 25,
                'alternatives': 10,
                'cash': 5
            },
            '정점기': {
                'stocks': 45,
                'bonds': 30,
                'alternatives': 15,
                'cash': 10
            },
            '침체기': {
                'stocks': 25,
                'bonds': 50,
                'alternatives': 10,
                'cash': 15
            },
            '저점기': {
                'stocks': 55,
                'bonds': 20,
                'alternatives': 15,
                'cash': 10
            }
        }

        return allocations.get(cycle_phase, allocations['확장기'])

    def rebalance(self, current_cycle: str,
                  current_values: dict,
                  threshold: float = 5.0) -> dict:
        """리밸런싱 실행"""

        # 현재 비중 계산
        total = sum(current_values.values())
        current_allocation = {
            k: (v / total * 100) for k, v in current_values.items()
        }

        # 목표 비중
        target_allocation = self.calculate_target_allocation(current_cycle)

        # 차이 계산
        rebalance_needed = {}
        trades = []

        for asset_class in target_allocation:
            current = current_allocation.get(asset_class, 0)
            target = target_allocation[asset_class]
            diff = target - current

            if abs(diff) >= threshold:
                rebalance_needed[asset_class] = {
                    'current': current,
                    'target': target,
                    'diff_pct': diff,
                    'amount': total * diff / 100
                }

                action = '매수' if diff > 0 else '매도'
                trades.append(f"{asset_class}: {abs(diff):.1f}%p {action}")

        # 기록
        self.history.append({
            'date': datetime.now(),
            'cycle': current_cycle,
            'trades': trades
        })

        return {
            'rebalance_needed': len(rebalance_needed) > 0,
            'changes': rebalance_needed,
            'trades': trades
        }

    def calculate_costs(self, trades: dict,
                       commission_rate: float = 0.001,
                       tax_rate: float = 0.0) -> dict:
        """리밸런싱 비용 계산"""

        total_traded = sum(abs(t['amount']) for t in trades.values())
        commission = total_traded * commission_rate

        # 매도 시 양도세 (이익 실현 시)
        tax = 0
        for asset, trade in trades.items():
            if trade['amount'] < 0:  # 매도
                # 가정: 20% 수익
                profit = abs(trade['amount']) * 0.2
                tax += profit * tax_rate

        total_cost = commission + tax
        cost_percentage = (total_cost / self.total_value) * 100

        return {
            'commission': commission,
            'tax': tax,
            'total_cost': total_cost,
            'cost_percentage': cost_percentage
        }

# 사용 예시
rebalancer = CycleBasedRebalancing(
    initial_portfolio={
        'stocks': 60,
        'bonds': 25,
        'alternatives': 10,
        'cash': 5
    },
    total_value=100_000_000
)

# 현재 포트폴리오 가치 (시장 변동 후)
current_values = {
    'stocks': 50_000_000,  # 주식 하락
    'bonds': 30_000_000,   # 채권 상승
    'alternatives': 12_000_000,
    'cash': 8_000_000
}

# 사이클이 정점기로 전환
rebalance_result = rebalancer.rebalance(
    current_cycle='정점기',
    current_values=current_values,
    threshold=3.0  # 3%p 이상 차이 시 리밸런싱
)

if rebalance_result['rebalance_needed']:
    print("리밸런싱 필요")
    print("\n조정 내역:")
    for asset, change in rebalance_result['changes'].items():
        print(f"\n{asset}:")
        print(f"  현재: {change['current']:.1f}%")
        print(f"  목표: {change['target']:.1f}%")
        print(f"  조정: {change['diff_pct']:+.1f}%p ({change['amount']:+,.0f}원)")

    print("\n\n거래 요약:")
    for trade in rebalance_result['trades']:
        print(f"  • {trade}")
else:
    print("리밸런싱 불필요 (목표 범위 내)")
\`\`\`

## 4. 실전 사례 연구

### 4.1 2008 금융위기 사이클

**타임라인 및 최적 대응**

\`\`\`python
def financial_crisis_2008_case_study():
    """2008 금융위기 사이클 분석"""

    timeline = {
        '2006-2007 정점기': {
            'signals': [
                '주택 가격 역사적 고점',
                '서브프라임 부실 징후',
                '수익률 곡선 역전 (2006년 8월)',
                '연준 긴축 (5.25% 고점)'
            ],
            'optimal_action': '주식 비중 60% → 40% 축소, 현금 확보',
            'actual_sp500': '1,400 → 1,550 (정점)',
            'opportunity': '2007년 고점에서 이익 실현'
        },

        '2008 침체기': {
            'signals': [
                'Bear Stearns 파산 (3월)',
                'Lehman Brothers 파산 (9월)',
                'VIX 80 돌파 (극도의 공포)',
                '연준 긴급 금리 인하 (5.25% → 0%)'
            ],
            'optimal_action': '안전자산 중심, 현금 25%+ 유지',
            'actual_sp500': '1,550 → 683 (-56%)',
            'opportunity': '패닉 매도 회피, 유동성 확보'
        },

        '2009 저점/회복': {
            'signals': [
                'S&P 500 P/E 10배 (역사적 저점)',
                '선행지표 3개월 연속 개선',
                'ISM 지수 45 돌파',
                'VIX 30 아래로 하락',
                'TARP 등 정부 부양책'
            ],
            'optimal_action': '경기민감주 적극 매수 (3-9월)',
            'actual_sp500': '683 → 1,050 (+54% in 6개월)',
            'opportunity': '2009년 3월 바닥에서 분할 매수'
        },

        '2010-2019 확장기': {
            'signals': [
                'GDP 안정적 성장',
                '실업률 10% → 3.5% 하락',
                '기업 이익 사상 최고',
                '저금리 장기 지속'
            ],
            'optimal_action': '주식 비중 60% 유지, 장기 보유',
            'actual_sp500': '1,050 → 3,230 (+208%)',
            'opportunity': '역사상 최장 강세장'
        }
    }

    # 사이클별 수익률 시뮬레이션
    initial_capital = 100_000_000

    scenarios = {
        '최적 대응': {
            '2007 정점 (40% 주식)': initial_capital,
            '2008 침체 (-30%)': initial_capital * 0.7,  # 방어로 손실 최소화
            '2009 저점 매수': initial_capital * 0.7,
            '2019 확장 (+200%)': initial_capital * 0.7 * 3.0
        },
        '바이앤홀드': {
            '2007 정점': initial_capital,
            '2008 침체 (-56%)': initial_capital * 0.44,
            '2019 확장 (+400%)': initial_capital * 0.44 * 5.0
        },
        '패닉 매도': {
            '2007 정점': initial_capital,
            '2008 침체 (바닥 매도)': initial_capital * 0.44,
            '회복 기회 상실': initial_capital * 0.44 * 1.3
        }
    }

    print("2008 금융위기 사이클 사례 연구")
    print("=" * 60)

    for phase, details in timeline.items():
        print(f"\n【{phase}】")
        print("신호:")
        for signal in details['signals']:
            print(f"  • {signal}")
        print(f"\n최적 대응: {details['optimal_action']}")
        print(f"S&P 500: {details['actual_sp500']}")
        print(f"핵심: {details['opportunity']}")

    print("\n\n전략별 최종 결과 (1억 → ?):")
    print("=" * 60)
    for strategy, results in scenarios.items():
        final = list(results.values())[-1]
        total_return = (final / initial_capital - 1) * 100
        print(f"\n{strategy}: {final:,.0f}원 ({total_return:+.1f}%)")
        for phase, value in results.items():
            print(f"  {phase}: {value:,.0f}원")

    return scenarios

# 실행
case_study = financial_crisis_2008_case_study()
\`\`\`

### 4.2 2020 코로나 사이클 (급격한 V자 회복)

**2008과 다른 특징**
- 침체 기간 매우 짧음 (2개월)
- 정부/중앙은행의 신속하고 강력한 대응
- 기술주 주도의 선별적 강세

\`\`\`python
def covid_crisis_2020_case_study():
    """2020 코로나 위기 사이클 분석"""

    timeline = pd.DataFrame({
        'date': ['2020-02', '2020-03', '2020-04', '2020-12', '2021-12'],
        'phase': ['정점', '침체', '회복', '확장', '과열'],
        'sp500': [3386, 2237, 2912, 3756, 4766],
        'signals': [
            '코로나 확산 시작',
            'VIX 82, 서킷브레이커',
            '무제한 QE, 재정 부양',
            '백신 개발, 경기 회복',
            '인플레이션 우려, 테이퍼링'
        ],
        'optimal_action': [
            '현금 확보 시작',
            '3월 하순 적극 매수',
            '기술주 중심 배분',
            '경기민감주 추가',
            '인플레이션 헤지'
        ]
    })

    print("2020 코로나 위기 사이클")
    print("=" * 80)
    print(timeline.to_string(index=False))

    # 핵심 교훈
    lessons = {
        '속도': '침체와 회복이 매우 빠름 (2개월)',
        '정책': '무제한 QE + 대규모 재정 부양 → 유동성 폭발',
        '선별성': '산업별 차별화 (기술주 ↑, 여행/에너지 ↓)',
        '타이밍': '바닥(3월)에서 6개월 내 매수가 핵심',
        '새 패러다임': '재택근무, 디지털 전환 가속'
    }

    print("\n\n핵심 교훈:")
    print("=" * 80)
    for key, lesson in lessons.items():
        print(f"{key}: {lesson}")

    # 2008 vs 2020 비교
    comparison = pd.DataFrame({
        '구분': ['침체 기간', '낙폭', '회복 기간', '정책 대응', '섹터'],
        '2008 금융위기': ['18개월', '-56%', '4년', '점진적', '전반적 하락'],
        '2020 코로나': ['2개월', '-34%', '5개월', '신속/강력', '선별적']
    })

    print("\n\n2008 vs 2020 비교:")
    print("=" * 80)
    print(comparison.to_string(index=False))

covid_crisis_2020_case_study()
\`\`\`

## 5. 실전 투자자를 위한 가이드

### 5.1 월간 사이클 체크 루틴

\`\`\`python
class MonthlyRoutine:
    """월간 사이클 점검 루틴"""

    def __init__(self):
        self.checklist = self.create_checklist()

    def create_checklist(self) -> dict:
        """체크리스트 생성"""
        return {
            '경제 지표': [
                'GDP 성장률 (분기)',
                '실업률',
                'CPI 인플레이션',
                'ISM 제조업/서비스업 지수',
                '소비자 신뢰지수',
                '주택 관련 지표'
            ],
            '금융 시장': [
                '수익률 곡선 (10Y-2Y)',
                '크레딧 스프레드',
                'VIX 변동성',
                '주요 지수 밸류에이션 (P/E, P/B)',
                '기업 이익 전망 변화'
            ],
            '정책': [
                '중앙은행 정책 금리 방향',
                'FOMC 의사록 톤',
                '재정 정책 변화',
                '규제 환경'
            ],
            '포트폴리오': [
                '목표 배분 대비 실제 비중',
                '리밸런싱 필요성 (±5%)',
                '개별 종목 점검',
                '새로운 투자 기회'
            ]
        }

    def generate_report(self, current_data: dict) -> str:
        """월간 리포트 생성"""

        report = []
        report.append("=" * 60)
        report.append(f"월간 경제 사이클 점검 리포트")
        report.append(f"작성일: {datetime.now().strftime('%Y-%m-%d')}")
        report.append("=" * 60)

        # 현재 사이클 판단
        cycle_phase = current_data.get('cycle_phase', '확인 필요')
        report.append(f"\n현재 경제 국면: {cycle_phase}")

        # 주요 지표
        report.append("\n【주요 경제 지표】")
        report.append(f"GDP 성장률: {current_data.get('gdp', 'N/A')}%")
        report.append(f"실업률: {current_data.get('unemployment', 'N/A')}%")
        report.append(f"CPI: {current_data.get('cpi', 'N/A')}%")
        report.append(f"수익률 곡선: {current_data.get('yield_curve', 'N/A')}%")

        # 권장 조치
        report.append("\n【권장 포트폴리오 조치】")
        actions = current_data.get('recommended_actions', [])
        for action in actions:
            report.append(f"• {action}")

        return "\n".join(report)

# 사용 예시
routine = MonthlyRoutine()

monthly_data = {
    'cycle_phase': '확장기',
    'gdp': 2.8,
    'unemployment': 3.9,
    'cpi': 3.1,
    'yield_curve': 0.35,
    'recommended_actions': [
        '주식 비중 60% 유지',
        '경기민감주 (건설, 소재) 비중 확대',
        '장기채 → 단기채로 전환 (금리 상승 대비)',
        '현금 5% 수준 유지'
    ]
}

report = routine.generate_report(monthly_data)
print(report)
\`\`\`

### 5.2 사이클별 추천 ETF

\`\`\`python
def cycle_based_etf_strategy() -> dict:
    """사이클별 ETF 전략"""

    strategy = {
        '확장기': {
            '주식 ETF': [
                'SPY (S&P 500) - 20%',
                'IWM (소형주) - 15%',
                'XLF (금융) - 10%',
                'XLI (산업재) - 10%',
                'VNQ (리츠) - 5%'
            ],
            '채권 ETF': [
                'SHY (단기채) - 15%',
                'LQD (회사채) - 10%'
            ],
            '원자재': [
                'DBC (원자재) - 5%'
            ],
            '현금': '10%'
        },

        '정점기': {
            '주식 ETF': [
                'VIG (배당성장) - 15%',
                'XLP (필수소비재) - 10%',
                'XLV (헬스케어) - 10%',
                'XLU (유틸리티) - 10%'
            ],
            '채권 ETF': [
                'TIP (물가연동채) - 15%',
                'AGG (종합채권) - 15%'
            ],
            '금/원자재': [
                'GLD (금) - 10%',
                'DBC (원자재) - 5%'
            ],
            '현금': '10%'
        },

        '침체기': {
            '주식 ETF': [
                'VIG (배당성장) - 10%',
                'XLP (필수소비재) - 10%',
                'XLV (헬스케어) - 5%'
            ],
            '채권 ETF': [
                'TLT (장기채) - 25%',
                'AGG (종합채권) - 20%',
                'SHY (단기채) - 10%'
            ],
            '금': [
                'GLD (금) - 10%'
            ],
            '현금': '10%'
        },

        '저점기': {
            '주식 ETF': [
                'SPY (S&P 500) - 20%',
                'IWM (소형주) - 15%',
                'XLF (금융) - 10%',
                'XLI (산업재) - 10%'
            ],
            '채권 ETF': [
                'LQD (회사채) - 15%',
                'SHY (단기채) - 10%'
            ],
            '원자재/부동산': [
                'DBC (원자재) - 10%',
                'VNQ (리츠) - 5%'
            ],
            '현금': '5%'
        }
    }

    return strategy

# 한국 투자자용 ETF
def korea_cycle_etf() -> dict:
    """한국 ETF로 구성한 사이클 전략"""

    return {
        '확장기': [
            'TIGER 미국S&P500 - 20%',
            'KODEX 레버리지 - 10%',
            'ARIRANG 신흥국MSCI - 10%',
            'TIGER 단기채권 - 15%',
            '현금 - 5%'
        ],
        '정점기': [
            'TIGER 미국배당다우존스 - 15%',
            'KODEX 필수소비재 - 10%',
            'TIGER 미국채10년선물 - 20%',
            'KODEX 골드선물(H) - 10%',
            '현금 - 10%'
        ],
        '침체기': [
            'KODEX 미국채울트라30년선물 - 30%',
            'TIGER 미국배당다우존스 - 10%',
            'KODEX 골드선물(H) - 10%',
            '현금 - 15%'
        ],
        '저점기': [
            'TIGER 미국S&P500 - 25%',
            'KODEX 레버리지 - 10%',
            'TIGER 차이나전기차SOLACTIVE - 10%',
            'KODEX 단기채권 - 15%',
            '현금 - 10%'
        ]
    }

print("사이클별 ETF 전략 (미국)")
print("=" * 60)
etf_strategy = cycle_based_etf_strategy()
for cycle, allocation in etf_strategy.items():
    print(f"\n【{cycle}】")
    for asset_class, etfs in allocation.items():
        print(f"\n{asset_class}:")
        if isinstance(etfs, list):
            for etf in etfs:
                print(f"  {etf}")
        else:
            print(f"  {etfs}")
\`\`\`

## 6. 결론: 사이클 투자의 핵심 원칙

### 핵심 요약

1. **사이클은 반복된다**: 확장 → 정점 → 침체 → 저점 → 확장
2. **선제적 대응**: 선행지표로 사이클 전환을 3~6개월 먼저 포착
3. **역발상 마인드**: 모두가 낙관적일 때 방어, 비관적일 때 공격
4. **유연한 배분**: 사이클별로 주식 25~60% 비중 조절
5. **장기 관점 유지**: 단기 변동성에 흔들리지 않는 원칙

### 성공 투자자의 사이클 대응

\`\`\`python
def investor_wisdom() -> dict:
    """성공적인 사이클 투자 원칙"""

    return {
        '워렌 버핏': "남들이 탐욕적일 때 두려워하고, 남들이 두려워할 때 탐욕적이 되라",
        '하워드 막스': "사이클을 이해하고 그 위치를 아는 것이 성공 투자의 핵심",
        '레이 달리오': "포트폴리오는 모든 경제 환경에서 견딜 수 있어야 한다",
        '피터 린치': "주식시장 하락은 1월의 눈보라처럼 정기적으로 온다. 준비하라",
    }

# 최종 체크리스트
final_checklist = """
【경제 사이클 투자 최종 체크리스트】

□ 현재 경제 사이클 국면을 정확히 파악했는가?
□ 선행지표를 정기적으로 모니터링하는가?
□ 사이클별 목표 자산 배분을 정했는가?
□ 리밸런싱 기준과 규칙을 설정했는가?
□ 감정적 판단을 배제하고 원칙을 따르는가?
□ 장기 투자 목표와 일치하는가?
□ 예상치 못한 충격에 대비한 현금을 보유하는가?
□ 과거 사이클 사례를 학습했는가?

투자 성공은 타이밍이 전부가 아니다.
하지만 경제 사이클을 이해하고 대응하는 것은
장기 수익률을 크게 개선할 수 있는 강력한 도구다.
"""

print(final_checklist)
\`\`\`

---

**면책조항**: 이 글의 내용은 정보 제공 목적이며 투자 권유가 아닙니다. 모든 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다. 경제 사이클 판단은 불확실성이 크며, 과거 패턴이 미래에 반복된다는 보장은 없습니다.
  `,
  publishedAt: '2025-01-29',
  readTime: 22,
  tags: [
    '경제사이클',
    '경기순환',
    '자산배분',
    '투자전략',
    '수익률곡선',
    '선행지표',
    '리밸런싱',
    '경기침체',
    '경기확장',
    '사이클투자',
    '포트폴리오',
    '시장타이밍'
  ]
};
