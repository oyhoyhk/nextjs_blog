import { BlogPost } from '@/types';

export const post: BlogPost = {
  id: '112',
  title: '알고리즘 트레이딩 시스템 구축 완벽 가이드: 설계부터 실전 운영까지',
  slug: 'algorithmic-trading-system-guide',
  category: 'quant',
  excerpt: '자동 매매 시스템을 처음부터 구축하는 방법을 단계별로 안내합니다. 시스템 아키텍처, 데이터 수집, 신호 생성, 주문 실행, 리스크 관리, 백테스팅까지 실전 Python 코드와 함께 완벽하게 정리합니다.',
  content: `

# 알고리즘 트레이딩 시스템 구축 완벽 가이드: 설계부터 실전 운영까지

알고리즘 트레이딩은 감정을 배제하고 체계적으로 투자할 수 있는 강력한 도구입니다. 기본 개념부터 실전 운영까지, 실제 작동하는 시스템을 구축하는 방법을 상세히 알아보겠습니다.

## 1. 알고리즘 트레이딩 시스템 개요

### 1.1 시스템 구성 요소

\`\`\`
┌─────────────────────────────────────────┐
│        알고리즘 트레이딩 시스템         │
└─────────────────────────────────────────┘

1. 데이터 레이어 (Data Layer)
   ├─ 시장 데이터 수집
   ├─ 데이터 정제 및 저장
   └─ 실시간 데이터 스트림

2. 전략 레이어 (Strategy Layer)
   ├─ 기술적 지표 계산
   ├─ 신호 생성 로직
   └─ 포트폴리오 구성

3. 실행 레이어 (Execution Layer)
   ├─ 주문 생성
   ├─ 주문 전송
   └─ 체결 확인

4. 리스크 관리 레이어 (Risk Management)
   ├─ 포지션 크기 결정
   ├─ 손절/익절 관리
   └─ 포트폴리오 한도 체크

5. 모니터링 레이어 (Monitoring)
   ├─ 성과 추적
   ├─ 로그 기록
   └─ 알림 시스템
\`\`\`

### 1.2 개발 환경 설정

\`\`\`python
# 필수 라이브러리 설치
pip install numpy pandas matplotlib
pip install TA-Lib  # 기술적 지표
pip install yfinance  # 데이터 수집
pip install ccxt  # 암호화폐 거래소 (선택)
pip install python-binance  # 바이낸스 (선택)
pip install backtrader  # 백테스팅
pip install alpaca-trade-api  # 미국 주식 API (선택)

# 디렉토리 구조
trading_system/
├── config/
│   ├── settings.py          # 설정
│   └── credentials.py       # API 키 (gitignore)
├── data/
│   ├── collector.py         # 데이터 수집
│   ├── database.py          # DB 저장
│   └── raw/                 # 원본 데이터
├── strategies/
│   ├── base_strategy.py     # 전략 베이스 클래스
│   ├── momentum.py          # 모멘텀 전략
│   └── mean_reversion.py    # 평균회귀 전략
├── execution/
│   ├── order_manager.py     # 주문 관리
│   └── broker_interface.py  # 브로커 연동
├── risk/
│   ├── position_sizer.py    # 포지션 크기
│   └── risk_manager.py      # 리스크 관리
├── backtest/
│   ├── backtester.py        # 백테스터
│   └── performance.py       # 성과 분석
├── monitoring/
│   ├── logger.py            # 로깅
│   └── dashboard.py         # 대시보드
└── main.py                  # 메인 실행
\`\`\`

## 2. 데이터 레이어 구축

### 2.1 데이터 수집기

\`\`\`python
# data/collector.py
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
import sqlite3

class DataCollector:
    """
    시장 데이터 수집 및 저장
    """
    def __init__(self, db_path='data/market_data.db'):
        self.db_path = db_path
        self._init_database()

    def _init_database(self):
        """데이터베이스 초기화"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS daily_prices (
                symbol TEXT,
                date TEXT,
                open REAL,
                high REAL,
                low REAL,
                close REAL,
                volume INTEGER,
                PRIMARY KEY (symbol, date)
            )
        ''')

        conn.commit()
        conn.close()

    def fetch_historical_data(self, symbol, start_date, end_date):
        """
        야후 파이낸스에서 과거 데이터 수집
        """
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(start=start_date, end=end_date)

            if df.empty:
                print(f"No data for {symbol}")
                return None

            # 데이터 정제
            df = df.reset_index()
            df['Symbol'] = symbol
            df = df[['Symbol', 'Date', 'Open', 'High', 'Low', 'Close', 'Volume']]

            return df

        except Exception as e:
            print(f"Error fetching {symbol}: {e}")
            return None

    def save_to_database(self, df):
        """데이터베이스에 저장"""
        conn = sqlite3.connect(self.db_path)

        for _, row in df.iterrows():
            try:
                conn.execute('''
                    INSERT OR REPLACE INTO daily_prices
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', (
                    row['Symbol'],
                    row['Date'].strftime('%Y-%m-%d'),
                    row['Open'],
                    row['High'],
                    row['Low'],
                    row['Close'],
                    int(row['Volume'])
                ))
            except Exception as e:
                print(f"Error saving row: {e}")

        conn.commit()
        conn.close()

    def update_all_symbols(self, symbols, lookback_days=365):
        """여러 심볼 데이터 업데이트"""
        end_date = datetime.now()
        start_date = end_date - timedelta(days=lookback_days)

        for symbol in symbols:
            print(f"Fetching {symbol}...")
            df = self.fetch_historical_data(symbol, start_date, end_date)

            if df is not None:
                self.save_to_database(df)
                print(f"  Saved {len(df)} rows")

# 사용 예시
if __name__ == "__main__":
    collector = DataCollector()

    # S&P 500 ETF, 나스닥, 애플, 테슬라 데이터 수집
    symbols = ['SPY', 'QQQ', 'AAPL', 'TSLA']
    collector.update_all_symbols(symbols, lookback_days=730)  # 2년치
\`\`\`

### 2.2 데이터 로더

\`\`\`python
# data/database.py
import pandas as pd
import sqlite3

class DataLoader:
    """
    데이터베이스에서 데이터 로드
    """
    def __init__(self, db_path='data/market_data.db'):
        self.db_path = db_path

    def load_data(self, symbol, start_date=None, end_date=None):
        """
        특정 심볼의 데이터 로드
        """
        conn = sqlite3.connect(self.db_path)

        query = f"SELECT * FROM daily_prices WHERE symbol = '{symbol}'"

        if start_date:
            query += f" AND date >= '{start_date}'"
        if end_date:
            query += f" AND date <= '{end_date}'"

        query += " ORDER BY date ASC"

        df = pd.read_sql_query(query, conn)
        conn.close()

        if not df.empty:
            df['date'] = pd.to_datetime(df['date'])
            df.set_index('date', inplace=True)

        return df

    def load_multiple(self, symbols, start_date=None, end_date=None):
        """
        여러 심볼 데이터 로드 (딕셔너리 반환)
        """
        data_dict = {}

        for symbol in symbols:
            df = self.load_data(symbol, start_date, end_date)
            if not df.empty:
                data_dict[symbol] = df

        return data_dict

# 사용 예시
loader = DataLoader()
aapl_data = loader.load_data('AAPL', start_date='2023-01-01')
print(aapl_data.head())
\`\`\`

## 3. 전략 레이어 구축

### 3.1 베이스 전략 클래스

\`\`\`python
# strategies/base_strategy.py
from abc import ABC, abstractmethod
import pandas as pd

class BaseStrategy(ABC):
    """
    모든 전략의 베이스 클래스
    """
    def __init__(self, name):
        self.name = name
        self.positions = {}  # {symbol: quantity}
        self.signals = pd.DataFrame()

    @abstractmethod
    def generate_signals(self, data):
        """
        매수/매도 신호 생성 (서브클래스에서 구현)

        Returns:
            DataFrame with columns: ['signal', 'price']
            signal: 1 (매수), -1 (매도), 0 (보유)
        """
        pass

    def calculate_indicators(self, df):
        """
        공통 기술적 지표 계산
        """
        # 이동평균
        df['SMA_20'] = df['close'].rolling(window=20).mean()
        df['SMA_50'] = df['close'].rolling(window=50).mean()
        df['SMA_200'] = df['close'].rolling(window=200).mean()

        # RSI
        delta = df['close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / loss
        df['RSI'] = 100 - (100 / (1 + rs))

        # 볼린저 밴드
        df['BB_middle'] = df['close'].rolling(window=20).mean()
        std = df['close'].rolling(window=20).std()
        df['BB_upper'] = df['BB_middle'] + (std * 2)
        df['BB_lower'] = df['BB_middle'] - (std * 2)

        # MACD
        ema_12 = df['close'].ewm(span=12, adjust=False).mean()
        ema_26 = df['close'].ewm(span=26, adjust=False).mean()
        df['MACD'] = ema_12 - ema_26
        df['MACD_signal'] = df['MACD'].ewm(span=9, adjust=False).mean()
        df['MACD_hist'] = df['MACD'] - df['MACD_signal']

        return df

    def backtest(self, data, initial_capital=100000):
        """
        백테스트 수행
        """
        signals = self.generate_signals(data)

        # 포트폴리오 시뮬레이션
        portfolio = pd.DataFrame(index=signals.index)
        portfolio['signal'] = signals['signal']
        portfolio['price'] = data['close']

        # 포지션 계산
        portfolio['position'] = portfolio['signal'].fillna(0)
        portfolio['position'] = portfolio['position'].replace(0, method='ffill')

        # 수익률 계산
        portfolio['returns'] = portfolio['price'].pct_change()
        portfolio['strategy_returns'] = portfolio['position'].shift(1) * portfolio['returns']

        # 누적 수익
        portfolio['cumulative_returns'] = (1 + portfolio['strategy_returns']).cumprod()
        portfolio['equity'] = initial_capital * portfolio['cumulative_returns']

        return portfolio
\`\`\`

### 3.2 모멘텀 전략 (실전 예시)

\`\`\`python
# strategies/momentum.py
import pandas as pd
from .base_strategy import BaseStrategy

class MomentumStrategy(BaseStrategy):
    """
    이동평균 크로스오버 + RSI 필터 모멘텀 전략
    """
    def __init__(self, fast_period=20, slow_period=50, rsi_period=14):
        super().__init__("Momentum_MA_Cross")
        self.fast_period = fast_period
        self.slow_period = slow_period
        self.rsi_period = rsi_period

    def generate_signals(self, data):
        """
        신호 생성:
        - 매수: fast MA가 slow MA 위로 돌파 AND RSI < 70
        - 매도: fast MA가 slow MA 아래로 돌파 OR RSI > 80
        """
        df = data.copy()
        df = self.calculate_indicators(df)

        signals = pd.DataFrame(index=df.index)
        signals['price'] = df['close']
        signals['signal'] = 0

        # 골든 크로스: 매수 신호
        golden_cross = (df['SMA_20'] > df['SMA_50']) & (df['SMA_20'].shift(1) <= df['SMA_50'].shift(1))

        # 데드 크로스: 매도 신호
        death_cross = (df['SMA_20'] < df['SMA_50']) & (df['SMA_20'].shift(1) >= df['SMA_50'].shift(1))

        # RSI 필터
        rsi_ok = df['RSI'] < 70
        rsi_overbought = df['RSI'] > 80

        # 신호 할당
        signals.loc[golden_cross & rsi_ok, 'signal'] = 1   # 매수
        signals.loc[death_cross | rsi_overbought, 'signal'] = -1  # 매도

        return signals

# 사용 예시
from data.database import DataLoader

loader = DataLoader()
data = loader.load_data('AAPL', start_date='2020-01-01')

strategy = MomentumStrategy(fast_period=20, slow_period=50)
signals = strategy.generate_signals(data)

# 신호 확인
print(signals[signals['signal'] != 0].tail(10))
\`\`\`

### 3.3 평균회귀 전략

\`\`\`python
# strategies/mean_reversion.py
from .base_strategy import BaseStrategy
import pandas as pd

class MeanReversionStrategy(BaseStrategy):
    """
    볼린저 밴드 기반 평균회귀 전략
    """
    def __init__(self, bb_period=20, bb_std=2):
        super().__init__("Mean_Reversion_BB")
        self.bb_period = bb_period
        self.bb_std = bb_std

    def generate_signals(self, data):
        """
        신호 생성:
        - 매수: 가격이 하단 밴드 아래로 이탈 (과매도)
        - 매도: 가격이 상단 밴드 위로 이탈 (과매수)
        - 청산: 가격이 중간선(이동평균) 복귀
        """
        df = data.copy()
        df = self.calculate_indicators(df)

        signals = pd.DataFrame(index=df.index)
        signals['price'] = df['close']
        signals['signal'] = 0

        # 하단 밴드 이탈 (매수)
        oversold = df['close'] < df['BB_lower']

        # 상단 밴드 이탈 (매도/공매도)
        overbought = df['close'] > df['BB_upper']

        # 중간선 복귀 (청산)
        mean_revert = (
            (df['close'] > df['BB_middle']) &
            (df['close'].shift(1) < df['BB_middle'].shift(1))
        ) | (
            (df['close'] < df['BB_middle']) &
            (df['close'].shift(1) > df['BB_middle'].shift(1))
        )

        signals.loc[oversold, 'signal'] = 1
        signals.loc[overbought, 'signal'] = -1
        signals.loc[mean_revert, 'signal'] = 0  # 청산

        return signals
\`\`\`

## 4. 실행 레이어 구축

### 4.1 주문 관리자

\`\`\`python
# execution/order_manager.py
from enum import Enum
from datetime import datetime
import uuid

class OrderType(Enum):
    MARKET = "market"
    LIMIT = "limit"
    STOP = "stop"

class OrderSide(Enum):
    BUY = "buy"
    SELL = "sell"

class Order:
    """주문 객체"""
    def __init__(self, symbol, side, quantity, order_type, price=None):
        self.id = str(uuid.uuid4())
        self.symbol = symbol
        self.side = side
        self.quantity = quantity
        self.order_type = order_type
        self.price = price
        self.status = "pending"
        self.filled_quantity = 0
        self.created_at = datetime.now()

    def __repr__(self):
        return f"Order({self.symbol} {self.side.value} {self.quantity} @ {self.price})"

class OrderManager:
    """주문 생성 및 관리"""
    def __init__(self):
        self.orders = {}  # {order_id: Order}
        self.filled_orders = []

    def create_order(self, symbol, side, quantity, order_type=OrderType.MARKET, price=None):
        """
        주문 생성
        """
        order = Order(symbol, side, quantity, order_type, price)
        self.orders[order.id] = order
        print(f"Order created: {order}")
        return order

    def cancel_order(self, order_id):
        """주문 취소"""
        if order_id in self.orders:
            order = self.orders[order_id]
            order.status = "cancelled"
            print(f"Order cancelled: {order}")
            return True
        return False

    def fill_order(self, order_id, filled_price, filled_quantity=None):
        """
        주문 체결 시뮬레이션 (백테스트용)
        실제로는 broker API에서 체결 이벤트 수신
        """
        if order_id in self.orders:
            order = self.orders[order_id]

            if filled_quantity is None:
                filled_quantity = order.quantity

            order.filled_quantity = filled_quantity
            order.price = filled_price
            order.status = "filled"

            self.filled_orders.append(order)
            del self.orders[order_id]

            print(f"Order filled: {order.symbol} {order.side.value} {filled_quantity} @ {filled_price}")
            return True

        return False

    def get_pending_orders(self):
        """대기 중인 주문 조회"""
        return [o for o in self.orders.values() if o.status == "pending"]
\`\`\`

### 4.2 브로커 인터페이스 (예시: Alpaca)

\`\`\`python
# execution/broker_interface.py
import alpaca_trade_api as tradeapi

class AlpacaBroker:
    """
    Alpaca API 연동 (미국 주식)
    """
    def __init__(self, api_key, secret_key, base_url='https://paper-api.alpaca.markets'):
        self.api = tradeapi.REST(api_key, secret_key, base_url, api_version='v2')

    def get_account(self):
        """계좌 정보 조회"""
        account = self.api.get_account()
        return {
            'cash': float(account.cash),
            'portfolio_value': float(account.portfolio_value),
            'buying_power': float(account.buying_power)
        }

    def get_position(self, symbol):
        """특정 종목 포지션 조회"""
        try:
            position = self.api.get_position(symbol)
            return {
                'symbol': position.symbol,
                'quantity': int(position.qty),
                'avg_price': float(position.avg_entry_price),
                'market_value': float(position.market_value)
            }
        except:
            return None

    def place_order(self, symbol, qty, side, order_type='market', limit_price=None):
        """
        주문 실행
        """
        try:
            order = self.api.submit_order(
                symbol=symbol,
                qty=qty,
                side=side,
                type=order_type,
                time_in_force='gtc',  # Good till cancelled
                limit_price=limit_price
            )

            print(f"Order placed: {order.id}")
            return order.id

        except Exception as e:
            print(f"Error placing order: {e}")
            return None

    def cancel_order(self, order_id):
        """주문 취소"""
        try:
            self.api.cancel_order(order_id)
            return True
        except:
            return False

    def get_orders(self, status='open'):
        """주문 조회"""
        return self.api.list_orders(status=status)

# 사용 예시 (페이퍼 트레이딩)
# broker = AlpacaBroker(api_key='YOUR_KEY', secret_key='YOUR_SECRET')
# account = broker.get_account()
# print(f"Cash: \${account['cash']}")
#
# # 애플 10주 매수
# broker.place_order('AAPL', 10, 'buy')
\`\`\`

## 5. 리스크 관리 레이어

### 5.1 포지션 크기 결정

\`\`\`python
# risk/position_sizer.py
import numpy as np

class PositionSizer:
    """
    켈리 기준, 고정 비율 등 포지션 크기 결정
    """
    def __init__(self, method='fixed_ratio', max_risk_per_trade=0.02):
        self.method = method
        self.max_risk_per_trade = max_risk_per_trade  # 거래당 최대 리스크 (2%)

    def calculate_position_size(self, capital, entry_price, stop_loss_price, win_rate=None, avg_win=None, avg_loss=None):
        """
        포지션 크기 계산

        Args:
            capital: 총 자본
            entry_price: 진입 가격
            stop_loss_price: 손절 가격
            win_rate: 승률 (켈리 기준용)
            avg_win: 평균 수익 (켈리 기준용)
            avg_loss: 평균 손실 (켈리 기준용)
        """
        if self.method == 'fixed_ratio':
            return self._fixed_ratio(capital, entry_price, stop_loss_price)

        elif self.method == 'kelly':
            return self._kelly_criterion(capital, entry_price, win_rate, avg_win, avg_loss)

        else:
            raise ValueError(f"Unknown method: {self.method}")

    def _fixed_ratio(self, capital, entry_price, stop_loss_price):
        """
        고정 비율 방식: 거래당 리스크를 자본의 일정 %로 제한

        예: 자본 $100,000, 리스크 2%, 진입가 $100, 손절가 $95
        → 손실 = $100 - $95 = $5
        → 최대 손실 허용 = $100,000 * 2% = $2,000
        → 포지션 크기 = $2,000 / $5 = 400주
        """
        risk_per_share = abs(entry_price - stop_loss_price)

        if risk_per_share == 0:
            return 0

        max_loss_allowed = capital * self.max_risk_per_trade
        position_size = int(max_loss_allowed / risk_per_share)

        return position_size

    def _kelly_criterion(self, capital, entry_price, win_rate, avg_win, avg_loss):
        """
        켈리 기준: f = (p*b - q) / b

        f: 자본 대비 베팅 비율
        p: 승률
        q: 패률 (1-p)
        b: 평균 수익 / 평균 손실 비율
        """
        if win_rate is None or avg_win is None or avg_loss is None:
            return 0

        p = win_rate
        q = 1 - win_rate
        b = avg_win / avg_loss

        f = (p * b - q) / b

        # 켈리 기준의 1/2 또는 1/4 사용 (과도한 레버리지 방지)
        f_conservative = f * 0.25

        if f_conservative <= 0:
            return 0

        position_value = capital * f_conservative
        position_size = int(position_value / entry_price)

        return position_size

# 사용 예시
sizer = PositionSizer(method='fixed_ratio', max_risk_per_trade=0.02)

capital = 100000  # $100,000
entry = 150       # $150
stop_loss = 145   # $145 (손절 -3.3%)

position = sizer.calculate_position_size(capital, entry, stop_loss)
print(f"포지션 크기: {position}주")
print(f"투자 금액: \${position * entry:,.0f}")
print(f"최대 손실: \${position * (entry - stop_loss):,.0f}")
\`\`\`

### 5.2 리스크 관리자

\`\`\`python
# risk/risk_manager.py
class RiskManager:
    """
    포트폴리오 레벨 리스크 관리
    """
    def __init__(self, max_portfolio_risk=0.1, max_correlation=0.7, max_position_pct=0.2):
        self.max_portfolio_risk = max_portfolio_risk  # 포트폴리오 최대 리스크 10%
        self.max_correlation = max_correlation        # 종목 간 최대 상관관계 0.7
        self.max_position_pct = max_position_pct      # 단일 종목 최대 비중 20%

    def check_portfolio_risk(self, positions, capital):
        """
        포트폴리오 총 리스크 체크
        """
        total_exposure = sum([pos['quantity'] * pos['price'] for pos in positions.values()])
        portfolio_risk = total_exposure / capital

        if portfolio_risk > self.max_portfolio_risk:
            print(f"⚠️ 포트폴리오 리스크 초과: {portfolio_risk:.1%} > {self.max_portfolio_risk:.1%}")
            return False

        return True

    def check_position_limit(self, symbol, quantity, price, capital):
        """
        단일 포지션 한도 체크
        """
        position_value = quantity * price
        position_pct = position_value / capital

        if position_pct > self.max_position_pct:
            print(f"⚠️ {symbol} 포지션 비중 초과: {position_pct:.1%} > {self.max_position_pct:.1%}")
            return False

        return True

    def check_correlation(self, symbol, existing_symbols, returns_data):
        """
        상관관계 체크 (분산투자 확인)
        """
        for existing in existing_symbols:
            if existing in returns_data.columns and symbol in returns_data.columns:
                corr = returns_data[symbol].corr(returns_data[existing])

                if abs(corr) > self.max_correlation:
                    print(f"⚠️ {symbol}와 {existing} 상관관계 높음: {corr:.2f}")
                    return False

        return True

    def should_allow_trade(self, symbol, quantity, price, current_positions, capital):
        """
        거래 허용 여부 종합 판단
        """
        # 포지션 한도 체크
        if not self.check_position_limit(symbol, quantity, price, capital):
            return False, "Position limit exceeded"

        # 포트폴리오 리스크 체크
        temp_positions = current_positions.copy()
        temp_positions[symbol] = {'quantity': quantity, 'price': price}

        if not self.check_portfolio_risk(temp_positions, capital):
            return False, "Portfolio risk exceeded"

        return True, "Trade allowed"
\`\`\`

## 6. 백테스팅 및 성과 분석

### 6.1 백테스터

\`\`\`python
# backtest/backtester.py
import pandas as pd
import numpy as np

class Backtester:
    """
    전략 백테스트 실행
    """
    def __init__(self, strategy, initial_capital=100000, commission=0.001):
        self.strategy = strategy
        self.initial_capital = initial_capital
        self.commission = commission  # 수수료 0.1%

    def run(self, data):
        """
        백테스트 실행
        """
        signals = self.strategy.generate_signals(data)

        portfolio = pd.DataFrame(index=data.index)
        portfolio['price'] = data['close']
        portfolio['signal'] = signals['signal']

        # 거래 발생 시점
        portfolio['trades'] = portfolio['signal'].diff().fillna(0)

        # 포지션 (1 = 매수, 0 = 현금, -1 = 공매도)
        portfolio['position'] = portfolio['signal'].replace(0, method='ffill').fillna(0)

        # 일일 수익률
        portfolio['returns'] = portfolio['price'].pct_change()

        # 전략 수익률 (포지션 * 수익률)
        portfolio['strategy_returns'] = portfolio['position'].shift(1) * portfolio['returns']

        # 수수료 차감
        portfolio['commission_cost'] = abs(portfolio['trades']) * self.commission
        portfolio['strategy_returns_net'] = portfolio['strategy_returns'] - portfolio['commission_cost']

        # 누적 수익
        portfolio['cumulative_returns'] = (1 + portfolio['strategy_returns_net']).cumprod()
        portfolio['equity'] = self.initial_capital * portfolio['cumulative_returns']

        # Buy & Hold 비교
        portfolio['bh_returns'] = portfolio['returns']
        portfolio['bh_cumulative'] = (1 + portfolio['bh_returns']).cumprod()
        portfolio['bh_equity'] = self.initial_capital * portfolio['bh_cumulative']

        return portfolio

    def calculate_metrics(self, portfolio):
        """
        성과 지표 계산
        """
        # 총 수익률
        total_return = (portfolio['equity'].iloc[-1] / self.initial_capital - 1) * 100

        # 연간 수익률
        days = (portfolio.index[-1] - portfolio.index[0]).days
        annual_return = ((portfolio['equity'].iloc[-1] / self.initial_capital) ** (365 / days) - 1) * 100

        # 최대낙폭 (MDD)
        cumulative = portfolio['cumulative_returns']
        running_max = cumulative.cummax()
        drawdown = (cumulative - running_max) / running_max
        max_drawdown = drawdown.min() * 100

        # 샤프 비율
        returns = portfolio['strategy_returns_net'].dropna()
        sharpe = returns.mean() / returns.std() * np.sqrt(252) if returns.std() > 0 else 0

        # 승률
        winning_trades = returns[returns > 0].count()
        total_trades = returns[returns != 0].count()
        win_rate = (winning_trades / total_trades * 100) if total_trades > 0 else 0

        # Buy & Hold 대비
        bh_return = (portfolio['bh_equity'].iloc[-1] / self.initial_capital - 1) * 100

        metrics = {
            '총 수익률': f"{total_return:.2f}%",
            '연간 수익률': f"{annual_return:.2f}%",
            '최대낙폭 (MDD)': f"{max_drawdown:.2f}%",
            '샤프 비율': f"{sharpe:.2f}",
            '승률': f"{win_rate:.1f}%",
            '총 거래 수': int(total_trades),
            'Buy & Hold 수익률': f"{bh_return:.2f}%",
            '초과 수익': f"{total_return - bh_return:.2f}%"
        }

        return metrics

# 사용 예시
from strategies.momentum import MomentumStrategy
from data.database import DataLoader

loader = DataLoader()
data = loader.load_data('AAPL', start_date='2020-01-01', end_date='2023-12-31')

strategy = MomentumStrategy(fast_period=20, slow_period=50)
backtester = Backtester(strategy, initial_capital=100000)

portfolio = backtester.run(data)
metrics = backtester.calculate_metrics(portfolio)

print("\n=== 백테스트 결과 ===")
for key, value in metrics.items():
    print(f"{key}: {value}")
\`\`\`

## 7. 실시간 트레이딩 시스템

### 7.1 메인 트레이딩 루프

\`\`\`python
# main.py
import time
from datetime import datetime
from strategies.momentum import MomentumStrategy
from execution.order_manager import OrderManager, OrderSide, OrderType
from execution.broker_interface import AlpacaBroker
from risk.position_sizer import PositionSizer
from risk.risk_manager import RiskManager
import pandas as pd

class TradingSystem:
    """
    실시간 트레이딩 시스템
    """
    def __init__(self, broker, strategy, position_sizer, risk_manager, symbols):
        self.broker = broker
        self.strategy = strategy
        self.position_sizer = position_sizer
        self.risk_manager = risk_manager
        self.symbols = symbols
        self.order_manager = OrderManager()

        self.positions = {}  # {symbol: {'quantity': int, 'price': float}}
        self.capital = 0

    def initialize(self):
        """시스템 초기화"""
        account = self.broker.get_account()
        self.capital = account['cash']

        print(f"=== Trading System Initialized ===")
        print(f"Capital: \${self.capital:,.2f}")
        print(f"Symbols: {', '.join(self.symbols)}")
        print(f"Strategy: {self.strategy.name}")

    def update_positions(self):
        """현재 포지션 업데이트"""
        self.positions = {}

        for symbol in self.symbols:
            position = self.broker.get_position(symbol)
            if position:
                self.positions[symbol] = {
                    'quantity': position['quantity'],
                    'price': position['avg_price']
                }

    def process_signals(self):
        """
        신호 처리 및 주문 실행
        """
        for symbol in self.symbols:
            # 최신 데이터 로드 (실제로는 실시간 스트림 사용)
            data = self.get_latest_data(symbol, lookback=200)

            if data is None or len(data) < 50:
                continue

            # 신호 생성
            signals = self.strategy.generate_signals(data)
            latest_signal = signals['signal'].iloc[-1]
            current_price = data['close'].iloc[-1]

            # 현재 포지션 확인
            current_position = self.positions.get(symbol, {'quantity': 0})

            # 매수 신호
            if latest_signal == 1 and current_position['quantity'] == 0:
                self.execute_buy(symbol, current_price)

            # 매도 신호
            elif latest_signal == -1 and current_position['quantity'] > 0:
                self.execute_sell(symbol, current_position['quantity'], current_price)

    def execute_buy(self, symbol, current_price):
        """매수 실행"""
        # 손절가 설정 (진입가의 -5%)
        stop_loss = current_price * 0.95

        # 포지션 크기 계산
        quantity = self.position_sizer.calculate_position_size(
            self.capital,
            current_price,
            stop_loss
        )

        if quantity == 0:
            print(f"{symbol}: 포지션 크기 0 - 거래 안 함")
            return

        # 리스크 관리 체크
        allowed, reason = self.risk_manager.should_allow_trade(
            symbol, quantity, current_price, self.positions, self.capital
        )

        if not allowed:
            print(f"{symbol}: 거래 거부 - {reason}")
            return

        # 주문 실행
        order_id = self.broker.place_order(symbol, quantity, 'buy')

        if order_id:
            print(f"✅ {symbol} 매수: {quantity}주 @ \${current_price:.2f}")

            # 손절 주문 (Stop Loss)
            self.broker.place_order(
                symbol, quantity, 'sell',
                order_type='stop',
                limit_price=stop_loss
            )

    def execute_sell(self, symbol, quantity, current_price):
        """매도 실행"""
        order_id = self.broker.place_order(symbol, quantity, 'sell')

        if order_id:
            print(f"✅ {symbol} 매도: {quantity}주 @ \${current_price:.2f}")

    def get_latest_data(self, symbol, lookback=100):
        """최신 데이터 조회 (실제로는 실시간 피드 사용)"""
        try:
            bars = self.broker.api.get_barset(symbol, 'day', limit=lookback)
            df = bars[symbol].df
            df.columns = [c.lower() for c in df.columns]
            return df
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")
            return None

    def run(self, interval=60):
        """
        메인 트레이딩 루프

        Args:
            interval: 신호 체크 간격 (초)
        """
        self.initialize()

        print(f"\n=== 트레이딩 시작 (간격: {interval}초) ===\n")

        while True:
            try:
                now = datetime.now()
                print(f"\n[{now.strftime('%Y-%m-%d %H:%M:%S')}] 신호 체크 중...")

                # 포지션 업데이트
                self.update_positions()

                # 신호 처리
                self.process_signals()

                # 대기
                time.sleep(interval)

            except KeyboardInterrupt:
                print("\n트레이딩 중지")
                break

            except Exception as e:
                print(f"오류 발생: {e}")
                time.sleep(interval)

# 실행 예시 (페이퍼 트레이딩)
if __name__ == "__main__":
    # 브로커 연동
    broker = AlpacaBroker(
        api_key='YOUR_ALPACA_KEY',
        secret_key='YOUR_ALPACA_SECRET',
        base_url='https://paper-api.alpaca.markets'  # 페이퍼 트레이딩
    )

    # 전략
    strategy = MomentumStrategy(fast_period=20, slow_period=50)

    # 포지션 사이저
    position_sizer = PositionSizer(method='fixed_ratio', max_risk_per_trade=0.02)

    # 리스크 관리자
    risk_manager = RiskManager(max_portfolio_risk=0.1, max_position_pct=0.2)

    # 트레이딩할 종목
    symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA']

    # 시스템 생성 및 실행
    system = TradingSystem(broker, strategy, position_sizer, risk_manager, symbols)
    system.run(interval=300)  # 5분마다 체크
\`\`\`

## 8. 모니터링 및 로깅

### 8.1 로거

\`\`\`python
# monitoring/logger.py
import logging
from datetime import datetime
import os

class TradingLogger:
    """트레이딩 활동 로깅"""
    def __init__(self, log_dir='logs'):
        if not os.path.exists(log_dir):
            os.makedirs(log_dir)

        log_file = os.path.join(log_dir, f'trading_{datetime.now().strftime("%Y%m%d")}.log')

        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler(log_file),
                logging.StreamHandler()
            ]
        )

        self.logger = logging.getLogger(__name__)

    def log_trade(self, symbol, side, quantity, price):
        """거래 로깅"""
        self.logger.info(f"TRADE: {symbol} {side} {quantity} @ \${price}")

    def log_signal(self, symbol, signal, price):
        """신호 로깅"""
        signal_text = "BUY" if signal == 1 else "SELL" if signal == -1 else "HOLD"
        self.logger.info(f"SIGNAL: {symbol} {signal_text} @ \${price}")

    def log_error(self, message):
        """에러 로깅"""
        self.logger.error(f"ERROR: {message}")

    def log_performance(self, metrics):
        """성과 로깅"""
        self.logger.info("=== Performance Metrics ===")
        for key, value in metrics.items():
            self.logger.info(f"{key}: {value}")
\`\`\`

## 9. 결론 및 체크리스트

### 시스템 런칭 전 체크리스트

\`\`\`
[ ] 데이터 수집 안정성 테스트
[ ] 전략 백테스트 (최소 3년 데이터)
[ ] 샤프 비율 1.0 이상 확인
[ ] 최대낙폭 -20% 이하 확인
[ ] 페이퍼 트레이딩 3개월 이상
[ ] 리스크 관리 로직 검증
[ ] 주문 실행 테스트 (소액)
[ ] 장애 발생 시 알림 시스템
[ ] 손절 자동화 확인
[ ] 로깅 시스템 정상 작동
[ ] 백업 시스템 구축
[ ] API 요청 한도 확인
\`\`\`

### 핵심 원칙

\`\`\`
1. 백테스트만 믿지 말 것 (과최적화 주의)
2. 페이퍼 트레이딩 필수
3. 리스크 관리가 수익보다 중요
4. 시스템 다운 대비 수동 개입 준비
5. 작게 시작해서 점진적 확대
6. 지속적인 모니터링과 개선
7. 시장 변화에 전략 적응 필요

알고리즘 트레이딩은 도구일 뿐,
성공의 핵심은 탄탄한 전략과 리스크 관리입니다.
\`\`\`

`,
  publishedAt: '2025-01-28',
  readTime: 23,
  tags: ['알고리즘트레이딩', '자동매매', 'Python', '백테스팅', '시스템트레이딩', '퀀트', '리스크관리', '포지션사이징', '트레이딩봇', 'API']
};
