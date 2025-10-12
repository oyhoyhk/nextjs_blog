import { BlogPost } from '../src/types';

export const post: BlogPost = {
  id: 'backtesting-python-2025',
  title: 'Python으로 시작하는 백테스팅 실전 가이드',
  slug: 'python-backtesting-practical-guide',
  category: 'quant',
  excerpt: '파이썬과 Backtrader 라이브러리를 활용한 투자 전략 백테스팅 실전 방법을 단계별로 설명합니다.',
  content: `# Python으로 시작하는 백테스팅 실전 가이드

## 백테스팅이란?

백테스팅(Backtesting)은 과거 데이터를 사용하여 투자 전략이 실제로 수익을 냈을지 검증하는 과정입니다. 실제 돈을 투자하기 전에 전략의 유효성을 확인하는 필수 단계입니다.

**백테스팅의 중요성**
- 실전 투자 전 전략 검증
- 최대 낙폭(MDD) 파악
- 샤프 비율 등 리스크 지표 계산
- 전략 개선 방향 도출

## 필요한 사전 지식

### Python 기초

**필수 문법**
- 변수, 함수, 클래스
- 조건문 (if), 반복문 (for, while)
- 리스트, 딕셔너리

**필요 라이브러리**
- pandas: 데이터 처리
- numpy: 수치 계산
- matplotlib: 시각화

### 금융 기초

- 주식 가격 데이터 (Open, High, Low, Close, Volume)
- 수익률 계산
- 이동평균, RSI 등 기술적 지표

## 백테스팅 라이브러리 비교

| 라이브러리 | 난이도 | 기능 | 추천 대상 |
|-----------|--------|------|----------|
| Backtrader | 중간 | 강력함 | 초중급자 |
| Zipline | 어려움 | 매우 강력 | 고급자 |
| Backtesting.py | 쉬움 | 간단 | 초보자 |
| QuantConnect | 중간 | 클라우드 | 모두 |

**이 가이드에서는 Backtrader 사용**

## 환경 설정

### 1. Python 설치

Python 3.8 이상 설치 (python.org)

### 2. 라이브러리 설치

터미널에서 실행:

pip install backtrader
pip install pandas
pip install yfinance
pip install matplotlib

### 3. 개발 환경

**추천 IDE**
- Jupyter Notebook: 초보자 친화적
- VS Code: 전문가용
- PyCharm: 통합 개발 환경

## 첫 번째 백테스팅: 이동평균 크로스오버 전략

### 전략 설명

**골든 크로스 / 데드 크로스**
- 골든 크로스: 단기 이동평균이 장기 이동평균을 상향 돌파 → 매수
- 데드 크로스: 단기 이동평균이 장기 이동평균을 하향 돌파 → 매도

**파라미터**
- 단기 이동평균: 50일
- 장기 이동평균: 200일

### 코드 작성

import backtrader as bt
import yfinance as yf

# 전략 클래스 정의
class GoldenCross(bt.Strategy):
    params = (
        ('fast', 50),   # 단기 이동평균
        ('slow', 200),  # 장기 이동평균
    )

    def __init__(self):
        # 이동평균 계산
        self.fast_ma = bt.indicators.SMA(self.data.close, period=self.params.fast)
        self.slow_ma = bt.indicators.SMA(self.data.close, period=self.params.slow)
        # 크로스오버 시그널
        self.crossover = bt.indicators.CrossOver(self.fast_ma, self.slow_ma)

    def next(self):
        # 현재 포지션이 없을 때
        if not self.position:
            # 골든 크로스 발생 시 매수
            if self.crossover > 0:
                self.buy()
        else:
            # 데드 크로스 발생 시 매도
            if self.crossover < 0:
                self.sell()

# Cerebro 엔진 생성
cerebro = bt.Cerebro()

# 전략 추가
cerebro.addstrategy(GoldenCross)

# 데이터 다운로드 (S&P 500 ETF)
data = yf.download('SPY', start='2020-01-01', end='2024-01-01')

# Backtrader 데이터 형식으로 변환
data_bt = bt.feeds.PandasData(dataname=data)

# 데이터 추가
cerebro.adddata(data_bt)

# 초기 자본금 설정
cerebro.broker.setcash(100000)

# 수수료 설정 (0.1%)
cerebro.broker.setcommission(commission=0.001)

# 백테스팅 실행 전 자본금 출력
print(f'시작 자본금: {cerebro.broker.getvalue():.2f}')

# 백테스팅 실행
cerebro.run()

# 최종 자본금 출력
print(f'최종 자본금: {cerebro.broker.getvalue():.2f}')

# 차트 표시
cerebro.plot()

### 코드 설명

**1. 전략 클래스 (GoldenCross)**
- __init__: 초기화 시 지표 계산
- next(): 매일 실행되는 로직

**2. Cerebro 엔진**
- Backtrader의 핵심 엔진
- 전략, 데이터, 설정을 관리

**3. 데이터 다운로드**
- yfinance로 Yahoo Finance에서 데이터 다운로드
- SPY: S&P 500 ETF

**4. 브로커 설정**
- 초기 자본금: 10만 달러
- 수수료: 0.1%

## 백테스팅 결과 분석

### 주요 지표

**1. 총 수익률**
- (최종 자본금 - 초기 자본금) / 초기 자본금

**2. 연평균 수익률 (CAGR)**
- 복리 수익률

**3. 최대 낙폭 (MDD, Maximum Drawdown)**
- 고점 대비 최대 하락폭
- 리스크 측정 지표

**4. 샤프 비율 (Sharpe Ratio)**
- 위험 조정 수익률
- (수익률 - 무위험 수익률) / 변동성
- 1 이상: 양호, 2 이상: 우수

**5. 승률 (Win Rate)**
- 수익 난 거래 / 전체 거래

### Analyzer 추가

cerebro.addanalyzer(bt.analyzers.SharpeRatio, _name='sharpe')
cerebro.addanalyzer(bt.analyzers.DrawDown, _name='drawdown')
cerebro.addanalyzer(bt.analyzers.Returns, _name='returns')

results = cerebro.run()
strat = results[0]

# 결과 출력
print(f'샤프 비율: {strat.analyzers.sharpe.get_analysis()["sharperatio"]:.2f}')
print(f'최대 낙폭: {strat.analyzers.drawdown.get_analysis()["max"]["drawdown"]:.2f}%')
print(f'연평균 수익률: {strat.analyzers.returns.get_analysis()["rnorm100"]:.2f}%')

## 백테스팅 주의사항

### 1. 과적합 (Overfitting)

**문제**
- 과거 데이터에만 최적화된 전략
- 미래에는 작동하지 않음

**예시**
- 이동평균 기간을 48일, 197일로 최적화
- 50일, 200일보다 백테스팅 결과 좋음
- 하지만 실전에서 실패

**대응**
- 단순한 전략 선호
- 아웃오브샘플 테스트 (Out-of-Sample Test)
- 여러 시장에서 테스트

### 2. 생존 편향 (Survivorship Bias)

**문제**
- 상장 폐지된 주식 제외
- 수익률 과대평가

**예시**
- 2000년 닷컴 버블 당시 많은 기업 상장 폐지
- 살아남은 기업만으로 백테스팅하면 수익률 높게 나옴

**대응**
- 상장 폐지 기업 포함 데이터 사용
- 실제보다 보수적으로 평가

### 3. 미래 정보 사용 (Look-Ahead Bias)

**문제**
- 당시에는 알 수 없었던 정보 사용

**예시**
- 내일 종가를 보고 오늘 매수 결정
- 재무제표는 발표 3개월 후에 알 수 있는데, 발표 전에 사용

**대응**
- 시점 엄격히 구분
- 데이터 시차 고려

### 4. 거래 비용 미반영

**문제**
- 수수료, 세금, 슬리피지 미고려
- 실제 수익률은 백테스팅보다 낮음

**대응**
- 수수료 0.1~0.3% 반영
- 세금 (국내 주식 0%, 해외 주식 22%) 고려
- 슬리피지 0.05~0.1% 추가

## 다양한 전략 예시

### 1. 모멘텀 전략

class Momentum(bt.Strategy):
    params = (
        ('period', 126),  # 6개월
    )

    def __init__(self):
        self.momentum = self.data.close / self.data.close(-self.params.period)

    def next(self):
        if self.momentum[0] > 1.1:  # 6개월 수익률 10% 이상
            if not self.position:
                self.buy()
        elif self.momentum[0] < 0.95:  # 5% 하락
            if self.position:
                self.sell()

### 2. RSI 전략

class RSI_Strategy(bt.Strategy):
    params = (
        ('period', 14),
    )

    def __init__(self):
        self.rsi = bt.indicators.RSI(self.data.close, period=self.params.period)

    def next(self):
        if self.rsi < 30:  # 과매도
            if not self.position:
                self.buy()
        elif self.rsi > 70:  # 과매수
            if self.position:
                self.sell()

### 3. 평균 회귀 전략

class MeanReversion(bt.Strategy):
    params = (
        ('period', 20),
        ('devfactor', 2),
    )

    def __init__(self):
        self.bbands = bt.indicators.BollingerBands(
            self.data.close,
            period=self.params.period,
            devfactor=self.params.devfactor
        )

    def next(self):
        if self.data.close < self.bbands.lines.bot:  # 볼린저 밴드 하단
            if not self.position:
                self.buy()
        elif self.data.close > self.bbands.lines.top:  # 볼린저 밴드 상단
            if self.position:
                self.sell()

## 포트폴리오 백테스팅

### 여러 종목 동시 테스트

symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN']

for symbol in symbols:
    data = yf.download(symbol, start='2020-01-01', end='2024-01-01')
    data_bt = bt.feeds.PandasData(dataname=data)
    cerebro.adddata(data_bt, name=symbol)

## 최적화 (Optimization)

### 파라미터 최적화

cerebro.optstrategy(
    GoldenCross,
    fast=range(30, 70, 10),  # 30, 40, 50, 60
    slow=range(150, 250, 25)  # 150, 175, 200, 225
)

# 모든 조합 테스트 후 최적 파라미터 출력

**주의**: 과최적화 위험

## 실전 배포 전 체크리스트

- [ ] 샤프 비율 1 이상
- [ ] MDD 20% 이하
- [ ] 승률 40% 이상
- [ ] 아웃오브샘플 테스트 통과
- [ ] 거래 비용 반영
- [ ] 최소 5년 이상 데이터 테스트
- [ ] 여러 시장 조건에서 테스트 (강세장, 약세장, 횡보장)

## 추천 학습 자료

### 책

1. **"Algorithmic Trading" - Ernest Chan**
2. **"Python for Finance" - Yves Hilpisch**

### 온라인 강의

1. Coursera: "Machine Learning for Trading"
2. Udemy: "Algorithmic Trading with Python"

### 커뮤니티

1. QuantConnect 포럼
2. Backtrader 공식 문서
3. Reddit: r/algotrading

## 결론

Python 백테스팅은 퀀트 투자의 첫걸음입니다. Backtrader 라이브러리를 활용하면 복잡한 전략도 간단히 테스트할 수 있습니다. 하지만 백테스팅 결과가 좋다고 해서 실전에서 반드시 성공하는 것은 아닙니다.

**성공적인 백테스팅 원칙**
1. 단순한 전략부터 시작
2. 과적합 경계
3. 거래 비용 반영
4. 아웃오브샘플 테스트
5. 실전 투자는 소액으로 시작

백테스팅은 도구일 뿐, 투자 판단은 투자자의 몫입니다. 데이터와 논리에 기반한 투자를 시작하세요.`,
  publishedAt: '2025-10-12T22:00:00Z',
  readTime: 10,
  tags: ['백테스팅', 'Python', 'Backtrader', '퀀트투자', '알고리즘']
};
