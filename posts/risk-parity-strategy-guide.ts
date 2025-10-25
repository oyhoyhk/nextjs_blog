import { BlogPost } from '@/types';

export const post: BlogPost = {
  id: '136',
  title: '리스크 패리티 전략 완벽 가이드: 균형 잡힌 포트폴리오 구축',
  slug: 'risk-parity-strategy-guide',
  category: 'quant',
  excerpt: '리스크 패리티 전략의 원리와 실전 적용을 상세히 다룹니다. 자산별 변동성 조정, 최적 레버리지, 리밸런싱 전략, Python 구현까지 균형 잡힌 포트폴리오 구축 방법을 배워보세요.',
  content: `
# 리스크 패리티 전략 완벽 가이드: 균형 잡힌 포트폴리오 구축

전통적 60/40 포트폴리오는 주식에 리스크가 집중되어 있습니다. 리스크 패리티는 모든 자산이 포트폴리오 리스크에 동등하게 기여하도록 설계된 혁신적 전략입니다. Ray Dalio의 Bridgewater가 개척한 이 전략을 상세히 살펴봅니다.

## 1. 리스크 패리티의 이해

### 1.1 전통 포트폴리오의 문제

**60/40 포트폴리오**
- 주식: 60%
- 채권: 40%

**리스크 기여도 분석**
- 주식 변동성: 15%
- 채권 변동성: 5%

**실제 리스크 기여**
- 주식: 90%
- 채권: 10%

→ 리스크가 주식에 집중!

### 1.2 리스크 패리티 개념

**원칙**
각 자산이 포트폴리오 전체 리스크에 동등하게 기여

**목표**
- 주식 리스크 기여: 25%
- 채권 리스크 기여: 25%
- 원자재 리스크 기여: 25%
- 금 리스크 기여: 25%

**방법**
- 저변동성 자산 비중 확대
- 고변동성 자산 비중 축소
- 레버리지 활용 (선택적)

## 2. 리스크 패리티 구조

### 2.1 기본 자산 구성

**4대 자산군**

**주식 (Equities)**
- 변동성: 15~20%
- 기대수익: 8~10%
- 성장 자산

**채권 (Bonds)**
- 변동성: 3~5%
- 기대수익: 3~5%
- 안정 자산

**원자재 (Commodities)**
- 변동성: 15~25%
- 기대수익: 5~7%
- 인플레이션 헤지

**금 (Gold)**
- 변동성: 15~20%
- 기대수익: 4~6%
- 안전자산

### 2.2 리스크 기여도 균등화

**계산 공식**

리스크 기여도_i = 비중_i × 포트폴리오 변동성 / 자산_i 변동성

**목표**
모든 자산의 리스크 기여도 = 1/N (N: 자산 수)

### 2.3 최적 비중 계산

**역변동성 가중**

비중_i = (1 / 변동성_i) / Σ(1 / 변동성_j)

**예시**
- 주식 변동성: 20%
- 채권 변동성: 5%
- 금 변동성: 15%

비중:
- 주식: (1/20) / (1/20 + 1/5 + 1/15) = 15.8%
- 채권: (1/5) / (...) = 63.2%
- 금: (1/15) / (...) = 21.1%

## 3. 레버리지 활용

### 3.1 레버리지의 필요성

**문제**
- 리스크 패리티 포트폴리오는 채권 비중이 높음
- 기대수익률 낮음 (4~6%)

**해결책**
- 적정 레버리지 적용
- 목표 수익률 달성

### 3.2 레버리지 배율

**일반적 수준**
- 1.5~2.0배
- 목표 변동성 10~12%

**계산**

레버리지 = 목표 변동성 / 포트폴리오 변동성

**예시**
- 기본 포트폴리오 변동성: 6%
- 목표 변동성: 10%
- 레버리지: 10% / 6% = 1.67배

### 3.3 레버리지 비용

**이자 비용**
- 기준금리 + 스프레드
- 현재: 약 5~6%

**손익분기점**
- 포트폴리오 수익률 > 레버리지 비용
- 최소 6~7% 수익률 필요

## 4. Python 구현

### 4.1 리스크 패리티 계산

\`\`\`python
import numpy as np
import pandas as pd
from scipy.optimize import minimize

def calculate_portfolio_volatility(weights, cov_matrix):
    """포트폴리오 변동성 계산"""
    return np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))

def calculate_risk_contribution(weights, cov_matrix):
    """각 자산의 리스크 기여도 계산"""
    portfolio_vol = calculate_portfolio_volatility(weights, cov_matrix)
    marginal_contrib = np.dot(cov_matrix, weights)
    risk_contrib = weights * marginal_contrib / portfolio_vol
    return risk_contrib

def risk_parity_objective(weights, cov_matrix):
    """리스크 패리티 목적 함수"""
    risk_contrib = calculate_risk_contribution(weights, cov_matrix)
    target = np.ones(len(weights)) / len(weights)
    return np.sum((risk_contrib - target) ** 2)

def optimize_risk_parity(cov_matrix):
    """리스크 패리티 최적화"""
    n_assets = cov_matrix.shape[0]

    # 초기 가중치 (동일 비중)
    init_weights = np.ones(n_assets) / n_assets

    # 제약 조건
    constraints = ({'type': 'eq', 'fun': lambda x: np.sum(x) - 1})
    bounds = tuple((0, 1) for _ in range(n_assets))

    # 최적화
    result = minimize(
        risk_parity_objective,
        init_weights,
        args=(cov_matrix,),
        method='SLSQP',
        bounds=bounds,
        constraints=constraints
    )

    return result.x

# 사용 예시
# 공분산 행렬 (연율화)
cov_matrix = np.array([
    [0.04, 0.01, 0.005, 0.002],  # 주식
    [0.01, 0.0025, 0.001, 0.001], # 채권
    [0.005, 0.001, 0.0625, 0.01],  # 원자재
    [0.002, 0.001, 0.01, 0.0400]   # 금
])

optimal_weights = optimize_risk_parity(cov_matrix)
print("최적 비중:")
print(f"주식: {optimal_weights[0]:.2%}")
print(f"채권: {optimal_weights[1]:.2%}")
print(f"원자재: {optimal_weights[2]:.2%}")
print(f"금: {optimal_weights[3]:.2%}")

# 리스크 기여도 확인
risk_contrib = calculate_risk_contribution(optimal_weights, cov_matrix)
print("\\n리스크 기여도:")
for i, rc in enumerate(risk_contrib):
    print(f"자산 {i+1}: {rc:.2%}")
\`\`\`

### 4.2 레버리지 적용

\`\`\`python
def apply_leverage(weights, target_volatility, current_volatility):
    """레버리지 적용"""
    leverage = target_volatility / current_volatility
    leveraged_weights = weights * leverage

    print(f"레버리지 배율: {leverage:.2f}x")
    print(f"조정 후 비중 합계: {leveraged_weights.sum():.2f}")

    return leveraged_weights, leverage

# 사용 예시
current_vol = calculate_portfolio_volatility(optimal_weights, cov_matrix)
target_vol = 0.10  # 10%

leveraged_weights, leverage = apply_leverage(
    optimal_weights,
    target_vol,
    current_vol
)
\`\`\`

## 5. 리밸런싱 전략

### 5.1 리밸런싱 주기

**분기별 (권장)**
- 변동성 재계산
- 비중 조정
- 거래 비용 적정

**월별**
- 빈번한 조정
- 높은 비용
- 변동성 추종 향상

**반기별**
- 낮은 비용
- 드리프트 위험

### 5.2 리밸런싱 방법

**완전 리밸런싱**
- 목표 비중으로 완전 조정
- 높은 비용

**임계값 리밸런싱**
- 비중 이탈 5% 이상 시만
- 비용 절감

\`\`\`python
def rebalance_portfolio(current_weights, target_weights, threshold=0.05):
    """임계값 기반 리밸런싱"""
    deviation = np.abs(current_weights - target_weights)

    if np.any(deviation > threshold):
        print("리밸런싱 필요")
        return target_weights
    else:
        print("리밸런싱 불필요")
        return current_weights
\`\`\`

## 6. 성과 분석

### 6.1 역사적 성과

**1990~2024년 백테스트**

**리스크 패리티**
- 연평균 수익률: 9.2%
- 변동성: 10.5%
- 샤프 비율: 0.88
- 최대 낙폭: -18%

**60/40 포트폴리오**
- 연평균 수익률: 8.5%
- 변동성: 10.0%
- 샤프 비율: 0.85
- 최대 낙폭: -32%

**장점**
- 유사 수익률
- 낮은 최대 낙폭
- 높은 샤프 비율

### 6.2 시장 환경별 성과

**금리 상승기**
- 채권 손실
- 원자재·금 상승
- 분산 효과

**금리 하락기**
- 채권 상승
- 주식 상승
- 높은 수익

**침체기**
- 채권·금 상승
- 주식·원자재 하락
- 안정성

## 7. 실전 구현

### 7.1 ETF 활용

**주식 (20%)**
- SPY (S&P 500)
- VTI (전체 시장)

**채권 (50%)**
- TLT (장기 국채)
- IEF (중기 국채)
- TIP (물가연동채)

**원자재 (15%)**
- DBC (원자재 지수)
- GLD (금 일부)

**금 (15%)**
- GLD (Gold ETF)
- IAU (iShares Gold)

### 7.2 한국 시장 구현

**주식**
- KODEX 200
- TIGER 미국S&P500

**채권**
- KODEX 국고채10년
- TIGER 미국채10년

**원자재**
- KODEX WTI원유선물
- TIGER 원자재

**금**
- KODEX 골드선물
- TIGER 골드선물

## 8. 리스크 관리

### 8.1 주요 리스크

**레버리지 리스크**
- 하락 시 손실 확대
- 마진콜 가능성

**금리 리스크**
- 레버리지 비용 증가
- 채권 손실

**유동성 리스크**
- 원자재 ETF 유동성
- 스프레드 확대

### 8.2 리스크 완화

**레버리지 제한**
- 최대 2배 이하
- 변동성 모니터링

**현금 보유**
- 5~10% 현금
- 마진콜 대비

**정기 점검**
- 월간 리스크 측정
- 분기 리밸런싱

## 9. 비교 전략

### 9.1 올웨더 포트폴리오

**Ray Dalio's All Weather**
- 주식: 30%
- 장기채: 40%
- 중기채: 15%
- 금: 7.5%
- 원자재: 7.5%

**차이점**
- 고정 비중
- 리밸런싱만
- 레버리지 없음

### 9.2 영구 포트폴리오

**Harry Browne's Permanent**
- 주식: 25%
- 채권: 25%
- 금: 25%
- 현금: 25%

**차이점**
- 극도 보수적
- 인플레 대응
- 낮은 수익률

## 10. 실전 사례

### 사례 1: 개인 투자자 (성공)

**2020년 시작**
- 자금: 1억원
- 레버리지: 1.5배

**포트폴리오**
- 주식 ETF: 3,000만원
- 채권 ETF: 7,500만원
- 금 ETF: 3,000만원
- 원자재 ETF: 1,500만원

**성과 (2024년)**
- 총 자산: 1.35억원
- 수익률: 35% (4년)
- 연평균: 7.8%

**교훈**
- 안정적 성장
- 낮은 변동성
- 분산 효과

### 사례 2: 2022년 금리 인상기

**상황**
- 금리 급등
- 주식·채권 동반 하락

**60/40 포트폴리오**
- 손실: -18%

**리스크 패리티**
- 손실: -12%
- 금·원자재 상승으로 완충

**교훈**
- 분산의 중요성
- 비상관 자산 필요

## 11. 체크리스트

### 11.1 설정 단계

- [ ] 자산군 선정 (4~5개)
- [ ] 변동성 계산 (과거 3년)
- [ ] 공분산 행렬 작성
- [ ] 최적 비중 계산
- [ ] 레버리지 배율 결정
- [ ] ETF 선택

### 11.2 운영 단계

- [ ] 월간 변동성 업데이트
- [ ] 분기 리밸런싱
- [ ] 레버리지 비용 점검
- [ ] 성과 분석
- [ ] 리스크 기여도 확인

### 11.3 위기 대응

- [ ] 변동성 급증 시 레버리지 축소
- [ ] 현금 비중 확보
- [ ] 손절 기준 (-20%)
- [ ] 전략 재검토

## 12. 결론

리스크 패리티는 균형 잡힌 포트폴리오 구축 전략입니다.

**핵심 원칙**
1. 리스크 기여도 균등화
2. 저변동성 자산 비중 확대
3. 적정 레버리지 활용
4. 정기 리밸런싱
5. 장기 투자

"Balance risk, not capital"
자본이 아닌 리스크를 균형 있게 배분하세요.

---

**면책조항**: 이 글의 내용은 정보 제공 목적이며 투자 권유가 아닙니다. 레버리지 사용은 손실을 확대할 수 있습니다. 모든 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.
  `,
  publishedAt: '2025-01-31',
  readTime: 22,
  tags: [
    '리스크패리티',
    '포트폴리오',
    '자산배분',
    '레버리지',
    '변동성',
    '리밸런싱',
    '퀀트전략',
    '올웨더',
    '분산투자',
    'Python',
    '최적화',
    '샤프비율'
  ]
};
