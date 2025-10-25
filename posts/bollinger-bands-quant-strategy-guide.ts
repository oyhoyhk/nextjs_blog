import { BlogPost } from '@/types';

export const post: BlogPost = {
  id: '142',
  title: '볼린저 밴드 퀀트 전략 완벽 가이드: 변동성 기반 매매의 모든 것',
  slug: 'bollinger-bands-quant-strategy-guide',
  category: 'quant',
  excerpt: '볼린저 밴드를 활용한 퀀트 트레이딩 전략을 상세히 다룹니다. 밴드 계산, 스퀴즈·확장 패턴, 평균 회귀 전략, Python 백테스팅까지 변동성 기반 매매 시스템을 배워보세요.',
  content: `
# 볼린저 밴드 퀀트 전략 완벽 가이드: 변동성 기반 매매의 모든 것

볼린저 밴드는 가장 널리 사용되는 기술적 지표입니다. 하지만 대부분 투자자는 제대로 활용하지 못합니다. 이 가이드에서는 퀀트 관점에서 볼린저 밴드를 체계적으로 활용하는 전략을 제시합니다.

## 1. 볼린저 밴드의 이해

### 1.1 구성 요소

**중심선 (Middle Band)**
- 20일 이동평균선
- 기준선 역할

**상단 밴드 (Upper Band)**
- 중심선 + (표준편차 × 2)
- 저항선

**하단 밴드 (Lower Band)**
- 중심선 - (표준편차 × 2)
- 지지선

### 1.2 통계적 의미

**정규분포 가정**
- 95.4% 데이터가 ±2σ 내 분포
- 밴드 이탈 = 통계적 이상

**평균 회귀**
- 밴드 이탈 후 복귀 경향
- 과매수/과매도 신호

## 2. 계산 방법

### 2.1 Python 구현

\`\`\`python
import pandas as pd
import numpy as np

def bollinger_bands(prices, period=20, std_dev=2):
    """
    볼린저 밴드 계산

    Args:
        prices: 가격 시리즈
        period: 이동평균 기간 (기본 20)
        std_dev: 표준편차 배수 (기본 2)

    Returns:
        DataFrame with upper, middle, lower bands
    """
    # 중심선 (이동평균)
    middle = prices.rolling(window=period).mean()

    # 표준편차
    std = prices.rolling(window=period).std()

    # 상단/하단 밴드
    upper = middle + (std * std_dev)
    lower = middle - (std * std_dev)

    return pd.DataFrame({
        'upper': upper,
        'middle': middle,
        'lower': lower,
        'price': prices
    })

# 사용 예시
import yfinance as yf

# 데이터 다운로드
stock = yf.download('AAPL', start='2023-01-01', end='2024-01-01')
close_prices = stock['Close']

# 볼린저 밴드 계산
bb = bollinger_bands(close_prices)
print(bb.tail())
\`\`\`

### 2.2 파라미터 최적화

**기간 (Period)**
- 단기: 10일
- 표준: 20일
- 장기: 50일

**표준편차 배수**
- 보수적: 1.5σ (좁은 밴드)
- 표준: 2.0σ
- 느슨한: 2.5σ (넓은 밴드)

## 3. 핵심 전략

### 3.1 평균 회귀 전략

**매수 신호**
- 가격이 하단 밴드 터치/이탈
- 과매도 상태
- 반등 기대

**매도 신호**
- 가격이 상단 밴드 터치/이탈
- 과매수 상태
- 조정 기대

**Python 구현**

\`\`\`python
def mean_reversion_strategy(data):
    """평균 회귀 전략"""
    signals = pd.DataFrame(index=data.index)
    signals['price'] = data['price']

    # 매수: 하단 밴드 이탈
    signals['buy'] = (data['price'] < data['lower'])

    # 매도: 상단 밴드 이탈
    signals['sell'] = (data['price'] > data['upper'])

    # 포지션
    signals['position'] = 0
    signals.loc[signals['buy'], 'position'] = 1
    signals.loc[signals['sell'], 'position'] = -1

    return signals
\`\`\`

### 3.2 밴드 브레이크아웃 전략

**개념**
- 밴드 이탈 = 추세 시작
- 평균 회귀 반대
- 변동성 확대 국면

**매수 신호**
- 상단 밴드 돌파
- 강한 상승 추세
- 거래량 증가

**매도 신호**
- 하단 밴드 이탈
- 강한 하락 추세

\`\`\`python
def breakout_strategy(data, volume_threshold=1.5):
    """브레이크아웃 전략"""
    signals = pd.DataFrame(index=data.index)

    # 거래량 평균
    avg_volume = data['volume'].rolling(20).mean()

    # 상단 돌파 + 거래량 증가
    signals['buy'] = (
        (data['price'] > data['upper']) &
        (data['volume'] > avg_volume * volume_threshold)
    )

    # 하단 이탈
    signals['sell'] = (data['price'] < data['lower'])

    return signals
\`\`\`

### 3.3 스퀴즈 전략

**볼린저 스퀴즈**
- 밴드 폭 축소
- 변동성 감소
- 폭발적 움직임 전조

**측정**

\`\`\`python
def bollinger_squeeze(data):
    """볼린저 스퀴즈 감지"""
    # 밴드 폭
    band_width = (data['upper'] - data['lower']) / data['middle']

    # 20일 최저 밴드 폭
    min_width = band_width.rolling(20).min()

    # 스퀴즈: 현재 폭 = 최저 폭
    squeeze = (band_width == min_width)

    return squeeze
\`\`\`

**거래 전략**
1. 스퀴즈 감지
2. 방향 대기 (상단 vs 하단 돌파)
3. 돌파 방향 추종

## 4. 고급 기법

### 4.1 %B 지표

**정의**

%B = (가격 - 하단 밴드) / (상단 밴드 - 하단 밴드)

**해석**
- %B > 1: 상단 밴드 위 (과매수)
- %B = 0.5: 중심선
- %B < 0: 하단 밴드 아래 (과매도)

**활용**
- %B < 0: 강력 매수
- %B > 1: 강력 매도
- 0.2 < %B < 0.8: 중립

\`\`\`python
def percent_b(data):
    """% B 계산"""
    percent_b = (data['price'] - data['lower']) / (data['upper'] - data['lower'])
    return percent_b
\`\`\`

### 4.2 밴드 폭 (Bandwidth)

**정의**

Bandwidth = (상단 - 하단) / 중심선

**활용**
- 높은 BW: 높은 변동성
- 낮은 BW: 낮은 변동성 (스퀴즈)
- 평균 회귀

\`\`\`python
def bandwidth(data):
    """밴드 폭 계산"""
    bw = (data['upper'] - data['lower']) / data['middle']
    return bw
\`\`\`

## 5. 백테스팅

### 5.1 전략 백테스트

\`\`\`python
def backtest_bollinger(data, initial_capital=10000):
    """볼린저 밴드 전략 백테스트"""

    # 시그널 생성
    signals = mean_reversion_strategy(data)

    # 포지션
    positions = pd.DataFrame(index=signals.index).fillna(0.0)
    positions['stock'] = signals['position']

    # 백테스트
    portfolio = pd.DataFrame(index=signals.index)
    portfolio['holdings'] = positions['stock'] * data['price']
    portfolio['cash'] = initial_capital - (positions.diff() * data['price']).cumsum()
    portfolio['total'] = portfolio['holdings'] + portfolio['cash']
    portfolio['returns'] = portfolio['total'].pct_change()

    # 성과 지표
    total_return = (portfolio['total'][-1] / initial_capital - 1) * 100
    sharpe = portfolio['returns'].mean() / portfolio['returns'].std() * np.sqrt(252)

    print(f"총 수익률: {total_return:.2f}%")
    print(f"샤프 비율: {sharpe:.2f}")

    return portfolio
\`\`\`

### 5.2 성과 평가

**주요 지표**
- 총 수익률
- 연평균 수익률
- 샤프 비율
- 최대 낙폭 (MDD)
- 승률

## 6. 다중 타임프레임

### 6.1 이중 밴드 전략

**개념**
- 단기 밴드 (10일)
- 장기 밴드 (20일)
- 두 밴드 조합

**신호**
- 단기 밴드 하단 + 장기 중심선 위: 강력 매수
- 단기 밴드 상단 + 장기 중심선 아래: 강력 매도

### 6.2 다중 시간대

**일봉 + 주봉**
- 주봉 밴드: 큰 추세
- 일봉 밴드: 진입 타이밍
- 추세 + 타이밍 조합

## 7. 리스크 관리

### 7.1 손절매

**고정 손절**
- 진입가 대비 -5%
- 밴드 전략 실패 인정

**동적 손절**
- 중심선 이탈 시
- 반대 밴드 터치 시

### 7.2 포지션 사이징

**켈리 기준**

f = (bp - q) / b

- b: 승리 시 수익/손실 비율
- p: 승률
- q: 1 - p

**보수적**
- 켈리 기준의 1/2
- 과도한 레버리지 회피

## 8. 조합 전략

### 8.1 볼린저 + RSI

**신호**
- 하단 밴드 + RSI < 30: 강력 매수
- 상단 밴드 + RSI > 70: 강력 매도

**장점**
- 과매수/과매도 확인
- 거짓 신호 감소

### 8.2 볼린저 + MACD

**신호**
- 하단 밴드 + MACD 골든크로스: 매수
- 상단 밴드 + MACD 데드크로스: 매도

**장점**
- 추세 + 과매수/과매도
- 높은 승률

## 9. 실전 적용

### 9.1 적합한 시장

**레인지 시장**
- 평균 회귀 전략 효과
- 높은 승률

**트렌드 시장**
- 브레이크아웃 전략
- 큰 수익

### 9.2 부적합한 시장

**극단적 변동성**
- 밴드 무의미
- 거짓 신호 증가

**초저변동성**
- 수익 기회 적음
- 거래 비용 부담

## 10. 실전 사례

### 사례 1: 테슬라 (2023년)

**상황**
- 1월: 하단 밴드 터치 ($100)
- 평균 회귀 매수

**결과**
- 3월: 상단 밴드 ($200)
- 수익률: +100%

**교훈**
- 레인지 시장에서 효과
- 인내심 필요

### 사례 2: 애플 (2024년)**상황**
- 볼린저 스퀴즈 발생
- 밴드 폭 역대 최저

**전략**
- 방향 대기
- 상단 돌파 → 매수

**결과**
- +15% 상승
- 스퀴즈 후 브레이크아웃

## 11. 결론

볼린저 밴드는 변동성 기반 체계적 매매 시스템입니다.

**성공 원칙**
1. 시장 환경 파악 (레인지 vs 트렌드)
2. 적절한 전략 선택
3. 리스크 관리 철저
4. 다른 지표와 조합
5. 백테스팅으로 검증

"Bands adapt to volatility, not price"
밴드는 가격이 아닌 변동성에 적응합니다. 변동성을 이해하세요.

---

**면책조항**: 이 글의 내용은 정보 제공 목적이며 투자 권유가 아닙니다. 볼린저 밴드 전략도 손실 가능성이 있습니다. 모든 투자 결정은 본인의 판단과 책임 하에 이루어져야 합니다.
  `,
  publishedAt: '2025-01-31',
  readTime: 20,
  tags: [
    '볼린저밴드',
    '퀀트전략',
    '평균회귀',
    '변동성',
    '기술적분석',
    'Python',
    '백테스팅',
    '스퀴즈',
    '브레이크아웃',
    'RSI',
    'MACD',
    '알고리즘트레이딩'
  ]
};
