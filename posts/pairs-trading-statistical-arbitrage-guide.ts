import { BlogPost } from '../src/types';

export const post: BlogPost = {
  id: '88',
  title: '페어 트레이딩 전략: 통계적 차익거래 실전 가이드',
  slug: 'pairs-trading-statistical-arbitrage-guide',
  category: 'quant',
  excerpt: '통계적 차익거래의 핵심인 페어 트레이딩 전략을 배우고, 상관관계 분석부터 실제 매매까지 단계별로 실행하는 방법을 소개합니다.',
  content: `# 페어 트레이딩 전략: 통계적 차익거래 실전 가이드

## 페어 트레이딩이란?

페어 트레이딩(Pairs Trading)은 상관관계가 높은 두 종목의 가격 괴리를 이용하여 수익을 내는 시장중립적 전략입니다.

### 기본 원리

- 상관관계가 높은 종목쌍 선정
- 가격 괴리 발생 시 롱-숏 포지션 구축
- 가격 수렴 시 포지션 청산

## 페어 트레이딩의 장점

### 1. 시장 중립성

전체 시장 방향과 무관하게 수익 추구 가능

### 2. 낮은 변동성

롱-숏 포지션으로 리스크 헤징

### 3. 지속 가능성

통계적 평균회귀 속성 활용

### 4. 다양한 기회

여러 종목쌍에서 기회 포착 가능

## 종목쌍 선정 방법

### 1. 동일 섹터 종목

**예시:**
- 삼성전자 vs SK하이닉스
- 현대차 vs 기아
- KB금융 vs 신한지주
- 카카오 vs 네이버

**장점:**
높은 상관관계 유지

### 2. 공적분 관계 확인

두 종목의 가격이 장기적으로 함께 움직이는지 검증

**검정 방법:**
- Engle-Granger 검정
- Johansen 검정

### 3. 상관계수 분석

**상관계수 기준:**
- 0.7 이상: 적합
- 0.8 이상: 매우 적합
- 0.9 이상: 이상적

### 4. 베타 계산

종목 B의 종목 A에 대한 민감도를 계산하여 포지션 크기 결정

## 스프레드 계산

### 1. 가격 스프레드

Spread = Price_A - (Beta × Price_B)

### 2. 비율 스프레드

Spread = Price_A / Price_B

### 3. Z-Score 계산

Z-Score = (Current Spread - Mean) / Std Dev

**매매 신호:**
- Z > +2: 매도 신호 (A 매도, B 매수)
- Z < -2: 매수 신호 (A 매수, B 매도)
- Z → 0: 청산 신호

## 실전 매매 전략

### 전략 1: 기본 페어 트레이딩

**진입 조건:**
- Z-Score > 2 또는 < -2
- 상관계수 > 0.7 유지
- 충분한 유동성

**청산 조건:**
- Z-Score가 0으로 회귀
- 일정 수익률 달성 (예: 3-5%)
- 손절 라인 도달 (예: -2%)

**포지션 크기:**
베타 조정하여 동일한 금액 투자

### 전략 2: 멀티플 페어 전략

**방법:**
여러 종목쌍에 동시 투자하여 분산

**예시 포트폴리오:**
- 삼성전자-SK하이닉스 (30%)
- 현대차-기아 (25%)
- KB금융-신한지주 (25%)
- 카카오-네이버 (20%)

### 전략 3: 동적 헤지 비율

**방법:**
베타값을 주기적으로 재계산하여 헤지 비율 조정

**재조정 주기:**
- 주간: 고빈도
- 월간: 중기 전략
- 분기: 장기 전략

## 리스크 관리

### 1. 손절매 설정

**방법:**
- Z-Score > 3: 강제 청산
- 손실 -5% 도달 시 청산
- 상관관계 < 0.5로 하락 시 청산

### 2. 포지션 크기 관리

**원칙:**
- 단일 페어 최대 20%
- 총 페어 개수 5-10개
- 베타 조정된 동일 금액

### 3. 상관관계 모니터링

**체크 항목:**
- 일간 상관계수 추적
- 30일 이동 상관계수
- 상관관계 급락 시 청산

### 4. 극단적 상황 대응

**시장 급락 시:**
- 롱 포지션 손실 > 숏 포지션 이익
- 전체 포지션 청산 고려
- 상관관계 붕괴 주의

## Python 구현 예시

### 데이터 수집 및 분석

\`\`\`python
import pandas as pd
import numpy as np
from scipy import stats

# 데이터 로드
stock_a = pd.read_csv('stock_a.csv', index_col='Date', parse_dates=True)
stock_b = pd.read_csv('stock_b.csv', index_col='Date', parse_dates=True)

# 상관계수 계산
correlation = stock_a['Close'].corr(stock_b['Close'])
print(f"상관계수: {correlation:.3f}")

# 베타 계산
beta = np.cov(stock_a['Close'], stock_b['Close'])[0,1] / np.var(stock_b['Close'])
print(f"베타: {beta:.3f}")

# 스프레드 계산
spread = stock_a['Close'] - beta * stock_b['Close']

# Z-Score 계산
z_score = (spread - spread.mean()) / spread.std()
\`\`\`

### 매매 신호 생성

\`\`\`python
def generate_signals(z_score, entry_threshold=2.0, exit_threshold=0.5):
    signals = pd.DataFrame(index=z_score.index)
    signals['z_score'] = z_score
    signals['signal'] = 0

    # 매수 신호 (Z < -2)
    signals.loc[z_score < -entry_threshold, 'signal'] = 1

    # 매도 신호 (Z > 2)
    signals.loc[z_score > entry_threshold, 'signal'] = -1

    # 청산 신호 (|Z| < 0.5)
    signals.loc[abs(z_score) < exit_threshold, 'signal'] = 0

    return signals

signals = generate_signals(z_score)
\`\`\`

### 백테스팅

\`\`\`python
def backtest_pairs_trading(stock_a, stock_b, signals, beta):
    portfolio = pd.DataFrame(index=signals.index)

    # 포지션 계산
    portfolio['position_a'] = signals['signal']
    portfolio['position_b'] = -signals['signal'] * beta

    # 수익률 계산
    portfolio['return_a'] = stock_a['Close'].pct_change() * portfolio['position_a'].shift(1)
    portfolio['return_b'] = stock_b['Close'].pct_change() * portfolio['position_b'].shift(1)

    # 전체 수익률
    portfolio['total_return'] = portfolio['return_a'] + portfolio['return_b']
    portfolio['cumulative_return'] = (1 + portfolio['total_return']).cumprod()

    # 성과 지표
    total_return = portfolio['cumulative_return'][-1] - 1
    sharpe_ratio = portfolio['total_return'].mean() / portfolio['total_return'].std() * np.sqrt(252)
    max_drawdown = (portfolio['cumulative_return'] / portfolio['cumulative_return'].cummax() - 1).min()

    return portfolio, total_return, sharpe_ratio, max_drawdown

portfolio, total_return, sharpe, mdd = backtest_pairs_trading(stock_a, stock_b, signals, beta)
print(f"총 수익률: {total_return:.2%}")
print(f"샤프 비율: {sharpe:.2f}")
print(f"최대 낙폭: {mdd:.2%}")
\`\`\`

## 실전 트레이딩 체크리스트

### 진입 전 확인사항

- [ ] 상관계수 0.7 이상
- [ ] 공적분 관계 유효
- [ ] Z-Score > 2 또는 < -2
- [ ] 충분한 유동성 확인
- [ ] 뉴스/이벤트 체크

### 보유 중 모니터링

- [ ] 일간 상관계수 확인
- [ ] Z-Score 추적
- [ ] 손익 체크
- [ ] 손절 라인 확인

### 청산 기준

- [ ] Z-Score 0 근접
- [ ] 목표 수익률 달성
- [ ] 손절 라인 도달
- [ ] 상관관계 급락

## 고급 전략

### 1. 섹터 중립 페어 트레이딩

**방법:**
같은 섹터 내 여러 페어 구성하여 섹터 리스크 헤징

### 2. 통계적 차익거래 + 모멘텀

**방법:**
페어 트레이딩에 모멘텀 지표 추가하여 진입 타이밍 개선

### 3. 머신러닝 기반 페어 선정

**방법:**
- 군집 분석으로 유사 종목 그룹화
- 회귀 모델로 베타 예측
- 시계열 모델로 스프레드 예측

## 실전 사례

### 사례 1: 반도체 종목 페어

**종목쌍:** 삼성전자 - SK하이닉스

**진입:**
- Z-Score: 2.3
- 삼성전자 매도, SK하이닉스 매수
- 베타 조정 1:1.2 비율

**결과:**
- 10일 후 Z-Score 0.3으로 수렴
- 수익률: +4.2%

### 사례 2: 금융 종목 페어

**종목쌍:** KB금융 - 신한지주

**진입:**
- Z-Score: -2.1
- KB금융 매수, 신한지주 매도
- 베타 조정 1:0.9 비율

**결과:**
- 15일 후 Z-Score 0.1로 수렴
- 수익률: +3.8%

## 주의사항

### 1. 구조적 변화

산업 구조 변화로 상관관계가 영구적으로 깨질 수 있습니다.

### 2. 유동성 리스크

급락장에서 청산이 어려울 수 있습니다.

### 3. 실행 비용

잦은 매매로 수수료와 세금이 수익을 잠식할 수 있습니다.

### 4. 베타 변동

베타값이 시간에 따라 변하므로 주기적 재계산 필요합니다.

## 결론

페어 트레이딩은 시장 방향과 무관하게 안정적인 수익을 추구할 수 있는 전략입니다. 체계적인 종목 선정과 리스크 관리를 통해 장기적으로 우수한 성과를 기대할 수 있습니다.

**핵심 포인트:**
- 높은 상관관계의 종목쌍 선정
- Z-Score 기반 체계적 매매
- 베타 조정된 포지션 관리
- 철저한 리스크 관리와 모니터링`,
  publishedAt: '2025-10-15T22:00:00Z',
  readTime: 17,
  tags: ['페어트레이딩', '통계적차익거래', '퀀트투자', '시장중립전략', '알고리즘트레이딩']
};
