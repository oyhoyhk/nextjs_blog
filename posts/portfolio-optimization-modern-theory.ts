import { BlogPost } from '../src/types';

export const post: BlogPost = {
  id: '94',
  title: '포트폴리오 최적화 이론: 현대 포트폴리오 이론부터 실전까지',
  slug: 'portfolio-optimization-modern-theory',
  category: 'quant',
  excerpt: '마코위츠의 현대 포트폴리오 이론(MPT)부터 블랙-리터만 모델, 리스크 패리티까지 다양한 포트폴리오 최적화 기법과 Python 구현 방법을 소개합니다.',
  content: `# 포트폴리오 최적화 이론: 현대 포트폴리오 이론부터 실전까지

## 포트폴리오 최적화란?

포트폴리오 최적화는 주어진 리스크 수준에서 기대 수익률을 최대화하거나, 목표 수익률을 달성하면서 리스크를 최소화하는 자산 배분을 찾는 과정입니다.

### 핵심 개념

**리스크-수익 트레이드오프:**
높은 수익을 위해서는 높은 리스크를 감수해야 함

**분산 효과:**
상관관계가 낮은 자산을 결합하면 리스크 감소

## 현대 포트폴리오 이론 (MPT)

### 마코위츠 모델 (1952)

**핵심 원리:**
- 기대 수익률 극대화
- 변동성(표준편차) 최소화
- 효율적 프론티어 도출

**수학적 정의:**

목적 함수:
Minimize: w^T Σ w

제약 조건:
- w^T μ = μ_target (목표 수익률)
- w^T 1 = 1 (비중 합 100%)
- w ≥ 0 (공매도 제한)

**변수:**
- w: 자산 비중 벡터
- Σ: 공분산 행렬
- μ: 기대 수익률 벡터

### 효율적 프론티어

**정의:**
동일한 리스크에서 최대 수익을 제공하는 포트폴리오들의 집합

**특징:**
- 위로 볼록한 곡선
- 프론티어 위의 모든 점이 최적
- 프론티어 아래는 비효율적

## 샤프 비율 최적화

### 샤프 비율 (Sharpe Ratio)

**정의:**
SR = (E[R_p] - R_f) / σ_p

**의미:**
단위 리스크당 초과 수익률

**목표:**
샤프 비율이 최대인 포트폴리오 찾기

**특징:**
- 리스크 대비 수익 효율성 측정
- 다양한 전략 비교 가능
- 1 이상이면 양호, 2 이상이면 우수

## Python 구현

### 기본 최적화

\`\`\`python
import numpy as np
import pandas as pd
from scipy.optimize import minimize

# 데이터 준비
returns = pd.read_csv('stock_returns.csv', index_col=0)

# 기대 수익률과 공분산 계산
expected_returns = returns.mean() * 252  # 연환산
cov_matrix = returns.cov() * 252

# 포트폴리오 성과 계산
def portfolio_performance(weights, expected_returns, cov_matrix):
    portfolio_return = np.sum(weights * expected_returns)
    portfolio_std = np.sqrt(np.dot(weights.T, np.dot(cov_matrix, weights)))
    return portfolio_return, portfolio_std

# 샤프 비율 계산
def negative_sharpe_ratio(weights, expected_returns, cov_matrix, risk_free_rate=0.02):
    p_return, p_std = portfolio_performance(weights, expected_returns, cov_matrix)
    return -(p_return - risk_free_rate) / p_std

# 제약 조건
constraints = (
    {'type': 'eq', 'fun': lambda x: np.sum(x) - 1}  # 비중 합 = 1
)

# 경계 조건 (0 <= weight <= 1)
bounds = tuple((0, 1) for _ in range(len(expected_returns)))

# 초기 추정값
n_assets = len(expected_returns)
init_guess = np.array([1/n_assets] * n_assets)

# 최적화 실행
result = minimize(
    negative_sharpe_ratio,
    init_guess,
    args=(expected_returns, cov_matrix),
    method='SLSQP',
    bounds=bounds,
    constraints=constraints
)

optimal_weights = result.x
print("최적 비중:", optimal_weights)
\`\`\`

### 효율적 프론티어 시각화

\`\`\`python
import matplotlib.pyplot as plt

# 목표 수익률 범위 설정
target_returns = np.linspace(expected_returns.min(), expected_returns.max(), 50)

frontier_volatility = []
frontier_returns = []

for target_return in target_returns:
    # 제약 조건: 목표 수익률 달성
    constraints = (
        {'type': 'eq', 'fun': lambda x: np.sum(x) - 1},
        {'type': 'eq', 'fun': lambda x: portfolio_performance(x, expected_returns, cov_matrix)[0] - target_return}
    )

    # 변동성 최소화
    result = minimize(
        lambda w: portfolio_performance(w, expected_returns, cov_matrix)[1],
        init_guess,
        method='SLSQP',
        bounds=bounds,
        constraints=constraints
    )

    if result.success:
        ret, vol = portfolio_performance(result.x, expected_returns, cov_matrix)
        frontier_returns.append(ret)
        frontier_volatility.append(vol)

# 시각화
plt.figure(figsize=(10, 6))
plt.plot(frontier_volatility, frontier_returns, 'b-', linewidth=2, label='Efficient Frontier')
plt.scatter(optimal_std, optimal_return, marker='*', color='r', s=500, label='Optimal Portfolio')
plt.xlabel('Volatility (Risk)')
plt.ylabel('Expected Return')
plt.title('Efficient Frontier')
plt.legend()
plt.grid(True)
plt.show()
\`\`\`

## 고급 최적화 기법

### 1. 블랙-리터만 모델

**특징:**
- 시장 균형 수익률 + 투자자 견해 결합
- 과거 데이터의 불확실성 보완
- 극단적 배분 방지

**프로세스:**
1. 시장 균형 포트폴리오 계산
2. 투자자 견해 (View) 설정
3. 베이지안 방법으로 결합
4. 최적 포트폴리오 도출

**Python 구현:**

\`\`\`python
# 시장 균형 수익률 계산
market_cap = np.array([100, 200, 150, 250])  # 시가총액
market_weights = market_cap / market_cap.sum()

delta = 2.5  # 리스크 회피 계수
pi = delta * np.dot(cov_matrix, market_weights)  # 균형 수익률

# 투자자 견해 설정
P = np.array([
    [1, 0, 0, 0],  # 자산 1이 2% 상승할 것
    [0, 1, -1, 0]  # 자산 2가 자산 3보다 1% 높을 것
])

Q = np.array([0.02, 0.01])  # 견해의 기대값

# 견해의 불확실성
omega = np.diag([0.001, 0.001])

# 블랙-리터만 수익률 계산
tau = 0.025
bl_returns = pi + tau * np.dot(np.dot(cov_matrix, P.T),
    np.linalg.solve(tau * np.dot(np.dot(P, cov_matrix), P.T) + omega, Q - np.dot(P, pi)))

print("블랙-리터만 수익률:", bl_returns)
\`\`\`

### 2. 리스크 패리티 (Risk Parity)

**개념:**
각 자산이 전체 포트폴리오 리스크에 동등하게 기여하도록 배분

**장점:**
- 극단적 배분 방지
- 안정적 성과
- 시장 상황 변화에 강건

**수식:**
각 자산의 리스크 기여도 = (w_i × (Σw)_i) / (w^T Σ w)

**Python 구현:**

\`\`\`python
def risk_parity_objective(weights, cov_matrix):
    portfolio_variance = np.dot(weights.T, np.dot(cov_matrix, weights))
    marginal_contrib = np.dot(cov_matrix, weights)
    risk_contrib = weights * marginal_contrib / portfolio_variance

    # 각 자산의 리스크 기여도를 균등하게
    target_risk = np.ones(len(weights)) / len(weights)
    return np.sum((risk_contrib - target_risk) ** 2)

# 최적화
result = minimize(
    risk_parity_objective,
    init_guess,
    args=(cov_matrix,),
    method='SLSQP',
    bounds=bounds,
    constraints=constraints
)

rp_weights = result.x
print("리스크 패리티 비중:", rp_weights)
\`\`\`

### 3. 최소 분산 포트폴리오 (MVP)

**목표:**
수익률 고려 없이 변동성만 최소화

**특징:**
- 가장 보수적
- 방어적 포트폴리오
- 하락장에서 우수

**Python 구현:**

\`\`\`python
def portfolio_variance(weights, cov_matrix):
    return np.dot(weights.T, np.dot(cov_matrix, weights))

result = minimize(
    portfolio_variance,
    init_guess,
    args=(cov_matrix,),
    method='SLSQP',
    bounds=bounds,
    constraints=constraints
)

mvp_weights = result.x
print("최소분산 포트폴리오 비중:", mvp_weights)
\`\`\`

## 제약조건 추가

### 1. 비중 제한

**예시:**
단일 자산 최대 30%

\`\`\`python
bounds = tuple((0, 0.3) for _ in range(n_assets))
\`\`\`

### 2. 섹터 제한

**예시:**
IT 섹터 합계 최대 40%

\`\`\`python
# IT 섹터 자산이 0, 2, 4번이라면
it_constraint = {
    'type': 'ineq',
    'fun': lambda x: 0.4 - (x[0] + x[2] + x[4])
}
\`\`\`

### 3. 롱-온리 vs 롱-숏

**롱-온리:**
\`\`\`python
bounds = tuple((0, 1) for _ in range(n_assets))
\`\`\`

**롱-숏:**
\`\`\`python
bounds = tuple((-1, 1) for _ in range(n_assets))
\`\`\`

## 리밸런싱 전략

### 1. 주기적 리밸런싱

**방법:**
월간, 분기, 연간 고정 주기

**장점:**
- 규칙적
- 감정 배제
- 구현 쉬움

**단점:**
- 거래 비용
- 시장 타이밍 놓침

### 2. 임계값 리밸런싱

**방법:**
목표 비중에서 ±5% 이상 벗어나면 조정

**장점:**
- 비용 절감
- 유연성

**단점:**
- 지속적 모니터링 필요

### 3. 조건부 리밸런싱

**방법:**
시장 상황 변화 시 재최적화

**트리거:**
- 변동성 20% 이상 증가
- 상관관계 구조 변화
- 리세션 신호

## 실전 포트폴리오 예시

### 예시 1: 보수적 포트폴리오

**구성:**
- 국내 주식: 20%
- 해외 주식: 15%
- 국내 채권: 40%
- 해외 채권: 15%
- 금: 10%

**특징:**
- 낮은 변동성
- 안정적 수익
- 은퇴자 적합

**기대 수익률:** 4-6%
**변동성:** 5-7%

### 예시 2: 균형 포트폴리오

**구성:**
- 국내 주식: 35%
- 해외 주식: 25%
- 국내 채권: 20%
- 해외 채권: 10%
- 원자재: 10%

**특징:**
- 중간 리스크
- 인플레이션 헤지
- 중장년층 적합

**기대 수익률:** 7-9%
**변동성:** 10-12%

### 예시 3: 공격적 포트폴리오

**구성:**
- 국내 주식: 45%
- 해외 주식: 35%
- 신흥국 주식: 10%
- 금: 5%
- 비트코인: 5%

**특징:**
- 높은 수익 추구
- 높은 변동성
- 젊은 투자자 적합

**기대 수익률:** 10-15%
**변동성:** 18-22%

## 백테스팅

### 성과 평가 지표

**1. 샤프 비율**
\`\`\`python
sharpe_ratio = (portfolio_return - risk_free_rate) / portfolio_std
\`\`\`

**2. 최대 낙폭 (MDD)**
\`\`\`python
cumulative = (1 + returns).cumprod()
running_max = cumulative.cummax()
drawdown = (cumulative - running_max) / running_max
max_drawdown = drawdown.min()
\`\`\`

**3. 칼마 비율**
\`\`\`python
calmar_ratio = annual_return / abs(max_drawdown)
\`\`\`

**4. 소르티노 비율**
\`\`\`python
downside_returns = returns[returns < 0]
downside_std = downside_returns.std() * np.sqrt(252)
sortino_ratio = (portfolio_return - risk_free_rate) / downside_std
\`\`\`

## 주의사항

### 1. 추정 오차

**문제:**
과거 데이터로 미래 예측 불확실

**대응:**
- 충분한 데이터 사용 (최소 3년)
- 아웃라이어 제거
- 로버스트 추정 방법

### 2. 극단적 배분

**문제:**
특정 자산에 과도한 집중

**대응:**
- 비중 상한선 설정 (20-30%)
- 정규화 (L1, L2)
- 블랙-리터만 모델

### 3. 거래 비용

**문제:**
빈번한 리밸런싱 비용

**대응:**
- 임계값 리밸런싱
- 거래 비용 모델 포함
- 세금 고려

### 4. 시장 급변

**문제:**
블랙스완 이벤트

**대응:**
- 스트레스 테스트
- 꼬리 리스크 관리
- 현금 버퍼 유지

## 고급 주제

### 1. 팩터 기반 최적화

**팩터:**
- 가치 (Value)
- 모멘텀 (Momentum)
- 저변동성 (Low Volatility)
- 퀄리티 (Quality)

**방법:**
팩터 노출을 제약조건으로 추가

### 2. 동적 최적화

**방법:**
- GARCH 모델로 변동성 예측
- 조건부 공분산 추정
- 시계열 모델 결합

### 3. 머신러닝 최적화

**방법:**
- 강화학습으로 최적 배분
- 신경망으로 수익률 예측
- 앙상블 방법

## 결론

포트폴리오 최적화는 리스크와 수익의 균형을 찾는 과학적 접근입니다. 현대 포트폴리오 이론을 기반으로 다양한 기법을 활용하고, 정기적인 리밸런싱과 백테스팅을 통해 지속적으로 개선해야 합니다.

**핵심 포인트:**
- 분산 투자로 리스크 감소
- 샤프 비율 최대화
- 정기적 리밸런싱
- 거래 비용 고려
- 백테스팅으로 검증`,
  publishedAt: '2025-10-16T11:00:00Z',
  readTime: 19,
  tags: ['포트폴리오최적화', '현대포트폴리오이론', '리스크관리', '자산배분', '퀀트투자']
};
