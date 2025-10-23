import { BlogPost } from '@/types';

export const post: BlogPost = {
  id: '115',
  title: '비트코인 온체인 분석 완벽 가이드: 블록체인 데이터로 매매 타이밍 포착하기',
  slug: 'bitcoin-on-chain-analysis-guide',
  category: 'bitcoin',
  excerpt: '비트코인 블록체인 데이터를 분석하여 시장 심리와 매매 타이밍을 파악하는 온체인 분석 방법을 상세히 안내합니다. NUPL, MVRV, 고래 움직임, 거래소 유출입, 채굴자 행동 등 핵심 지표를 실전 활용법과 함께 제공합니다.',
  content: `

# 비트코인 온체인 분석 완벽 가이드: 블록체인 데이터로 매매 타이밍 포착하기

비트코인은 모든 거래가 블록체인에 투명하게 기록되는 특성 덕분에, 온체인 데이터를 분석하여 시장 심리와 매매 타이밍을 파악할 수 있습니다. 전통적인 차트 분석을 넘어서는 온체인 분석의 모든 것을 알아보겠습니다.

## 1. 온체인 분석이란?

### 1.1 온체인 vs 오프체인 데이터

\`\`\`
온체인 데이터 (On-Chain):
- 블록체인에 직접 기록된 데이터
- 위변조 불가능
- 실시간 추적 가능
- 누구나 접근 가능

예시:
✅ 거래량 (실제 블록체인상 전송)
✅ 주소별 잔액
✅ 채굴자 수익
✅ 거래 수수료
✅ UTXO 분포

오프체인 데이터 (Off-Chain):
- 거래소, 서비스 내부 데이터
- 블록체인에 기록 안 됨
- 투명성 낮음

예시:
❌ 거래소 거래량 (내부 DB)
❌ 선물 미결제약정 (거래소별)
❌ 펀딩비 (거래소 내부)

온체인 분석의 장점:
1. 조작 불가능
2. 실제 자금 흐름 파악
3. 장기 투자자 vs 단기 트레이더 구분
4. 고래 움직임 추적
5. 시장 심리 객관적 측정
\`\`\`

### 1.2 주요 온체인 데이터 소스

\`\`\`python
# 주요 온체인 분석 플랫폼

platforms = {
    'Glassnode': {
        'url': 'https://glassnode.com',
        '특징': '가장 포괄적, 전문가용',
        '가격': '\$29-\$799/월',
        '추천': '⭐⭐⭐⭐⭐'
    },
    'CryptoQuant': {
        'url': 'https://cryptoquant.com',
        '특징': '거래소 데이터 강점',
        '가격': '무료-\$99/월',
        '추천': '⭐⭐⭐⭐⭐'
    },
    'LookIntoBitcoin': {
        'url': 'https://www.lookintobitcoin.com',
        '특징': '무료, 시각화 우수',
        '가격': '무료',
        '추천': '⭐⭐⭐⭐'
    },
    'IntoTheBlock': {
        'url': 'https://www.intotheblock.com',
        '특징': 'AI 분석, 다양한 코인',
        '가격': '무료-\$50/월',
        '추천': '⭐⭐⭐⭐'
    },
    'Blockchain.com': {
        'url': 'https://www.blockchain.com/explorer',
        '특징': '기본 탐색기, 무료',
        '가격': '무료',
        '추천': '⭐⭐⭐'
    }
}

# 추천 조합:
# 초보자: LookIntoBitcoin (무료) + CryptoQuant (무료 플랜)
# 중급자: CryptoQuant (Pro) + Glassnode (Studio)
# 전문가: Glassnode (Advanced) + 자체 데이터 분석
\`\`\`

## 2. 핵심 온체인 지표

### 2.1 NUPL (Net Unrealized Profit/Loss)

**개념**
\`\`\`
NUPL = (시가총액 - 실현 시가총액) / 시가총액

의미:
- 모든 비트코인 보유자의 평균 미실현 손익
- 시장 전체의 수익/손실 상태

계산:
시가총액 = 현재가 × 총 발행량
실현 시가총액 = 각 코인이 마지막으로 이동한 가격의 합

예시:
현재 BTC 가격: \$50,000
실현 가격 평균: \$30,000
NUPL = (\$50,000 - \$30,000) / \$50,000 = 0.4 (40%)
→ 평균적으로 40% 수익 상태
\`\`\`

**해석 및 활용**

\`\`\`python
def interpret_nupl(nupl_value):
    """
    NUPL 값에 따른 시장 국면 판단
    """
    if nupl_value > 0.75:
        phase = "Euphoria (환희)"
        action = "🔴 매도 시그널 - 과열"
        description = "대부분 큰 이익 상태, 욕심 극대화"

    elif nupl_value > 0.5:
        phase = "Belief (믿음)"
        action = "🟡 주의 - 상승 후반"
        description = "대부분 수익 상태, 낙관론 지배"

    elif nupl_value > 0.25:
        phase = "Optimism (낙관)"
        action = "✅ 보유 - 상승 중반"
        description = "시장 건전한 상승세"

    elif nupl_value > 0:
        phase = "Hope (희망)"
        action = "✅ 매수 고려 - 회복 초기"
        description = "바닥 탈출, 수익 전환 시작"

    elif nupl_value > -0.25:
        phase = "Fear (공포)"
        action = "✅ 매수 - 저점 근처"
        description = "대부분 손실 상태, 공포 지배"

    else:
        phase = "Capitulation (항복)"
        action = "✅✅ 적극 매수 - 바닥"
        description = "극심한 손실, 매도 압력 정점"

    return {
        'phase': phase,
        'action': action,
        'description': description
    }

# 2024년 1월 예시
current_nupl = 0.52
result = interpret_nupl(current_nupl)
print(f"NUPL: {current_nupl}")
print(f"국면: {result['phase']}")
print(f"액션: {result['action']}")
print(f"설명: {result['description']}")
\`\`\`

**역사적 패턴**
\`\`\`
NUPL 0.75 이상 → 고점 형성 (3-6개월 내)
- 2013년 11월: 0.76 → 고점
- 2017년 12월: 0.73 → 고점
- 2021년 4월: 0.72 → 고점 (1차)
- 2021년 11월: 0.68 → 고점 (2차)

NUPL -0.25 이하 → 저점 형성
- 2015년 1월: -0.32 → 저점
- 2018년 12월: -0.28 → 저점
- 2020년 3월: -0.20 → 저점 (코로나)
- 2022년 11월: -0.25 → 저점 (FTX)

교훈:
극단적 NUPL 값은 전환점 신호
단, 정확한 타이밍은 아님 (수개월 오차)
\`\`\`

### 2.2 MVRV (Market Value to Realized Value)

**개념**
\`\`\`
MVRV = 시가총액 / 실현 시가총액

의미:
- 현재 가격이 평균 취득 가격 대비 몇 배인지
- NUPL과 유사하지만 비율로 표현

해석:
MVRV = 1.0 → 현재가 = 평균 취득가 (손익분기)
MVRV = 2.0 → 평균 2배 수익
MVRV = 0.8 → 평균 20% 손실

Z-Score 활용:
MVRV Z-Score = (시가총액 - 실현 시가총액) / 표준편차
→ 통계적 과매수/과매도 판단
\`\`\`

**투자 전략**
\`\`\`python
def mvrv_trading_strategy(mvrv, mvrv_z_score):
    """
    MVRV 기반 매매 전략
    """
    signals = []

    # MVRV 기본 판단
    if mvrv >= 3.5:
        signals.append("🔴 MVRV 과열 - 매도 고려")
    elif mvrv >= 2.5:
        signals.append("🟡 MVRV 고평가 - 익절 준비")
    elif mvrv <= 1.0:
        signals.append("✅ MVRV 저평가 - 매수 적기")
    elif mvrv <= 0.8:
        signals.append("✅✅ MVRV 극단적 저평가 - 적극 매수")

    # MVRV Z-Score 판단
    if mvrv_z_score >= 7:
        signals.append("🔴 Z-Score 극단적 과매수 - 강력 매도 신호")
    elif mvrv_z_score >= 5:
        signals.append("🔴 Z-Score 과매수 - 매도 신호")
    elif mvrv_z_score <= -0.5:
        signals.append("✅ Z-Score 과매도 - 매수 신호")

    return signals

# 현재 값 (2024년 1월 가정)
current_mvrv = 1.8
current_z = 2.1

signals = mvrv_trading_strategy(current_mvrv, current_z)
print(f"MVRV: {current_mvrv}")
print(f"Z-Score: {current_z}")
print("\\n신호:")
for signal in signals:
    print(f"  {signal}")
\`\`\`

**역사적 고점/저점**
\`\`\`
역사적 고점 (매도 시그널):
2011년 6월: MVRV 5.6, Z-Score 8.2
2013년 11월: MVRV 5.2, Z-Score 7.5
2017년 12월: MVRV 3.8, Z-Score 7.0
2021년 4월: MVRV 3.6, Z-Score 6.5

역사적 저점 (매수 시그널):
2015년 1월: MVRV 0.78, Z-Score -0.3
2018년 12월: MVRV 0.82, Z-Score -0.2
2020년 3월: MVRV 0.88, Z-Score 0.1
2022년 11월: MVRV 0.91, Z-Score 0.3

패턴:
- MVRV 3.5 이상 → 고점 근처
- MVRV 1.0 이하 → 저점 근처
- Z-Score 7 이상 → 극단적 과열
- Z-Score 0 이하 → 매수 기회
\`\`\`

### 2.3 거래소 유출입 (Exchange Flow)

**개념**
\`\`\`
Exchange Inflow: 거래소로 들어온 BTC
→ 매도 압력 증가 (가격 하락 압력)

Exchange Outflow: 거래소에서 나간 BTC
→ 장기 보유 의도 (가격 상승 압력)

Exchange Net Flow = Inflow - Outflow
- 양수: 순유입 (매도 압력)
- 음수: 순유출 (매수 압력)

Exchange Reserve: 거래소 보유 BTC 총량
- 감소: 장기 보유 증가 (강세)
- 증가: 단기 매도 증가 (약세)
\`\`\`

**실시간 모니터링**
\`\`\`python
import requests

def analyze_exchange_flow():
    """
    CryptoQuant API를 이용한 거래소 유출입 분석
    (실제 사용 시 API 키 필요)
    """
    # 예시 데이터
    exchange_data = {
        'net_flow_7d': -15000,  # 7일간 15,000 BTC 순유출
        'reserve': 2_400_000,    # 총 240만 BTC 거래소 보유
        'reserve_change_30d': -50000  # 30일간 5만 BTC 감소
    }

    signals = []

    # 단기 유출입
    if exchange_data['net_flow_7d'] < -10000:
        signals.append("✅ 대규모 순유출 - 강세 신호")
    elif exchange_data['net_flow_7d'] > 10000:
        signals.append("🔴 대규모 순유입 - 약세 신호")

    # 거래소 잔고 변화
    if exchange_data['reserve_change_30d'] < -30000:
        signals.append("✅ 거래소 잔고 급감 - 장기 보유 증가")
    elif exchange_data['reserve_change_30d'] > 30000:
        signals.append("🔴 거래소 잔고 급증 - 매도 압력 증가")

    # 전체 비율
    total_supply = 19_500_000  # 총 발행량
    exchange_ratio = exchange_data['reserve'] / total_supply * 100

    if exchange_ratio < 10:
        signals.append("✅ 거래소 비율 낮음 - 공급 부족 가능")
    elif exchange_ratio > 15:
        signals.append("🔴 거래소 비율 높음 - 매도 압력 높음")

    return signals, exchange_ratio

signals, ratio = analyze_exchange_flow()
print(f"거래소 보유 비율: {ratio:.1f}%\\n")
for signal in signals:
    print(signal)
\`\`\`

**주요 패턴**
\`\`\`
상승장 시작 전:
- 거래소 잔고 지속 감소
- 대규모 순유출 (월 10만 BTC 이상)
- 거래소 비율 12% 이하로 하락

고점 형성 시:
- 거래소 순유입 전환
- 대량 물량 거래소 유입
- 고래들의 매도 준비

하락장:
- 변동성 큰 유출입
- 공포 매도 → 일시적 순유입
- 장기 투자자 매수 → 순유출

바닥 형성 시:
- 순유출 지속
- 거래소 비율 역사적 저점
- 매도 압력 소진

2020-2021년 사례:
2020년 초: 거래소 300만 BTC (15.5%)
2021년 말: 거래소 235만 BTC (12.3%)
→ 65만 BTC 순유출 → 강세장
\`\`\`

### 2.4 고래 움직임 (Whale Activity)

**고래 정의**
\`\`\`
비트코인 기준:
- 소형 고래: 100-1,000 BTC (\$5M-\$50M)
- 대형 고래: 1,000-10,000 BTC (\$50M-\$500M)
- 초대형 고래 (Humpback): 10,000 BTC 이상

추적 방법:
1. 대규모 거래 모니터링 (500 BTC 이상)
2. 특정 주소 잔액 변화
3. 고래 지갑 집계

Whale Alert 활용:
- Twitter: @whale_alert
- 웹사이트: whale-alert.io
- 실시간 대규모 거래 알림
\`\`\`

**고래 행동 패턴 분석**
\`\`\`python
def analyze_whale_behavior(whale_transactions):
    """
    고래 거래 패턴 분석
    """
    # 예시 데이터: 최근 24시간 고래 거래
    summary = {
        'whale_to_exchange': 3_500,  # 거래소 이동 (매도 신호)
        'exchange_to_whale': 2_000,  # 거래소에서 회수 (매수 신호)
        'whale_to_whale': 5_000,     # 고래간 이동 (중립)
        'unknown_whale_activity': 1_000
    }

    net_selling = summary['whale_to_exchange'] - summary['exchange_to_whale']

    analysis = []

    if net_selling > 2_000:
        analysis.append("🔴 고래 순매도 압력 높음 - 조심")
        recommendation = "보유 또는 일부 매도 고려"
    elif net_selling < -2_000:
        analysis.append("✅ 고래 순매수 압력 높음 - 긍정적")
        recommendation = "매수 고려"
    else:
        analysis.append("🟡 고래 활동 중립")
        recommendation = "관망"

    # 총 고래 활동량
    total_activity = sum(summary.values())
    if total_activity > 10_000:
        analysis.append("⚠️ 고래 활동 급증 - 변동성 주의")

    return {
        'net_selling': net_selling,
        'signals': analysis,
        'recommendation': recommendation
    }

# 분석 실행
result = analyze_whale_behavior({})
print(f"고래 순매도: {result['net_selling']} BTC")
print(f"\\n신호:")
for signal in result['signals']:
    print(f"  {signal}")
print(f"\\n권장사항: {result['recommendation']}")
\`\`\`

**고래 축적/분산 지표**
\`\`\`
고래 축적 (Accumulation):
- 고래 주소 개수 증가
- 고래 보유량 증가
- 거래소 → 개인 지갑 대규모 이동

→ 강세 신호

고래 분산 (Distribution):
- 고래 보유량 감소
- 개인 지갑 → 거래소 대규모 이동
- 대량 매도 주문

→ 약세 신호

2020-2021년 패턴:
2020년 3-12월: 고래 축적 (100 BTC 이상 주소 +8%)
2021년 1-4월: 고래 분산 시작
2021년 11월: 고래 분산 정점 → 고점 형성
2022년: 다시 축적 전환 (저점 형성)
\`\`\`

### 2.5 채굴자 행동 (Miner Behavior)

**핵심 지표**

\`\`\`
Miner Revenue (채굴 수익):
- 블록 보상 + 수수료
- 수익 증가 → 채굴 활발
- 수익 감소 → 일부 채굴자 이탈

Miner Outflow (채굴자 유출):
- 채굴자가 거래소로 보낸 BTC
- 증가 → 매도 압력
- 감소 → 보유 증가

Miner Reserve (채굴자 보유량):
- 채굴자 주소 총 보유 BTC
- 증가 → 축적 (강세)
- 감소 → 매도 (약세)

Hash Ribbon (해시 리본):
- 30일 이평 vs 60일 이평
- 골든크로스 → 매수 신호
- 데드크로스 → 매도 신호 (but 역발상 기회)
\`\`\`

**채굴자 항복 (Miner Capitulation)**
\`\`\`python
def detect_miner_capitulation(hash_rate_ma30, hash_rate_ma60, price):
    """
    채굴자 항복 감지 (저점 매수 기회)
    """
    # Hash Ribbon
    if hash_rate_ma30 < hash_rate_ma60:
        ribbon_signal = "데드크로스 - 채굴자 압박"
    else:
        ribbon_signal = "골든크로스 - 채굴자 회복"

    # 채굴 손익분기점 추정
    estimated_breakeven = 25_000  # 현재 평균 채굴 비용 가정

    if price < estimated_breakeven * 0.9:
        profitability = "적자 - 채굴자 항복 가능성"
        action = "✅✅ 매수 적기 - 역사적으로 바닥 신호"
    elif price < estimated_breakeven * 1.1:
        profitability = "손익분기 근처 - 주의"
        action = "✅ 매수 고려"
    else:
        profitability = "흑자 - 정상"
        action = "보유"

    return {
        'ribbon': ribbon_signal,
        'profitability': profitability,
        'action': action
    }

# 예시
result = detect_miner_capitulation(
    hash_rate_ma30=450,  # EH/s
    hash_rate_ma60=470,  # EH/s
    price=22_000
)

print(f"Hash Ribbon: {result['ribbon']}")
print(f"채굴 수익성: {result['profitability']}")
print(f"투자 액션: {result['action']}")
\`\`\`

**역사적 채굴자 항복 시점 = 최고의 매수 기회**
\`\`\`
2015년 1월:
- 해시레이트 -40%
- BTC 가격 \$200대
→ 채굴자 항복
→ 이후 2017년까지 100배 상승

2018년 11-12월:
- 해시레이트 -50%
- BTC 가격 \$3,000대
→ 채굴자 대량 항복
→ 이후 2021년까지 20배 상승

2020년 3월:
- 코로나 패닉
- 해시레이트 일시 급락
→ 일부 채굴자 정리
→ 이후 1년간 10배 상승

2022년 6-11월:
- 전기료 상승 + 가격 하락
- 해시레이트 감소
- 채굴 기업 파산 속출
→ 채굴자 항복
→ 바닥 형성

교훈:
채굴자 항복 = 두려울 때지만 최고의 매수 기회
\`\`\`

## 3. 종합 매매 신호 시스템

### 3.1 멀티 지표 스코어보드

\`\`\`python
def comprehensive_onchain_score():
    """
    여러 온체인 지표를 종합한 매매 점수
    """
    # 각 지표별 점수 (-5 ~ +5)
    scores = {}

    # 1. NUPL
    nupl = 0.15  # 예시값
    if nupl > 0.75:
        scores['NUPL'] = -5  # 강력 매도
    elif nupl > 0.5:
        scores['NUPL'] = -3
    elif nupl > 0.25:
        scores['NUPL'] = 0
    elif nupl > 0:
        scores['NUPL'] = 3
    else:
        scores['NUPL'] = 5  # 강력 매수

    # 2. MVRV
    mvrv = 1.2
    if mvrv > 3.5:
        scores['MVRV'] = -5
    elif mvrv > 2.5:
        scores['MVRV'] = -3
    elif mvrv > 1.5:
        scores['MVRV'] = 0
    elif mvrv > 1.0:
        scores['MVRV'] = 3
    else:
        scores['MVRV'] = 5

    # 3. 거래소 유출입
    net_flow_7d = -8000  # 순유출
    if net_flow_7d < -10000:
        scores['Exchange_Flow'] = 5
    elif net_flow_7d < -5000:
        scores['Exchange_Flow'] = 3
    elif abs(net_flow_7d) < 5000:
        scores['Exchange_Flow'] = 0
    elif net_flow_7d > 10000:
        scores['Exchange_Flow'] = -5
    else:
        scores['Exchange_Flow'] = -3

    # 4. 고래 활동
    whale_net = -1500  # 순매수
    if whale_net < -2000:
        scores['Whale'] = 4
    elif whale_net < -1000:
        scores['Whale'] = 2
    elif abs(whale_net) < 1000:
        scores['Whale'] = 0
    elif whale_net > 2000:
        scores['Whale'] = -4
    else:
        scores['Whale'] = -2

    # 5. 채굴자
    miner_selling = 'low'  # 예시: low, medium, high
    if miner_selling == 'low':
        scores['Miner'] = 3
    elif miner_selling == 'medium':
        scores['Miner'] = 0
    else:
        scores['Miner'] = -3

    # 총점 계산
    total_score = sum(scores.values())
    max_possible = 5 * len(scores)

    # 정규화 (0-100)
    normalized_score = ((total_score + max_possible) / (2 * max_possible)) * 100

    # 판단
    if normalized_score >= 70:
        signal = "✅✅ 강력 매수"
    elif normalized_score >= 60:
        signal = "✅ 매수"
    elif normalized_score >= 40:
        signal = "🟡 중립"
    elif normalized_score >= 30:
        signal = "🔴 매도"
    else:
        signal = "🔴🔴 강력 매도"

    return {
        'scores': scores,
        'total': total_score,
        'normalized': normalized_score,
        'signal': signal
    }

# 실행
result = comprehensive_onchain_score()
print("=== 온체인 종합 스코어 ===\\n")
print("개별 지표:")
for indicator, score in result['scores'].items():
    print(f"  {indicator}: {score:+d}")
print(f"\\n총점: {result['total']:+d}")
print(f"정규화 점수: {result['normalized']:.1f}/100")
print(f"\\n종합 신호: {result['signal']}")
\`\`\`

### 3.2 사이클 단계 판별

\`\`\`python
def identify_market_cycle_stage(nupl, mvrv, exchange_reserve_trend, miner_revenue):
    """
    온체인 지표로 시장 사이클 단계 식별
    """
    # 점수 집계
    accumulation_score = 0
    markup_score = 0
    distribution_score = 0
    markdown_score = 0

    # NUPL 기반
    if nupl < 0:
        accumulation_score += 3
    elif nupl < 0.25:
        markup_score += 2
    elif nupl < 0.5:
        markup_score += 3
    elif nupl < 0.75:
        distribution_score += 2
    else:
        distribution_score += 3

    # MVRV 기반
    if mvrv < 1.0:
        accumulation_score += 3
    elif mvrv < 2.0:
        markup_score += 2
    elif mvrv < 3.0:
        markup_score += 1
        distribution_score += 1
    else:
        distribution_score += 3

    # 거래소 잔고
    if exchange_reserve_trend == 'decreasing':
        accumulation_score += 2
        markup_score += 2
    elif exchange_reserve_trend == 'increasing':
        distribution_score += 2
        markdown_score += 2

    # 채굴자 수익
    if miner_revenue == 'low':
        accumulation_score += 2
        markdown_score += 1
    elif miner_revenue == 'high':
        markup_score += 2
        distribution_score += 1

    # 최고 점수 단계 결정
    scores = {
        'Accumulation (축적)': accumulation_score,
        'Markup (상승)': markup_score,
        'Distribution (분산)': distribution_score,
        'Markdown (하락)': markdown_score
    }

    stage = max(scores, key=scores.get)

    strategies = {
        'Accumulation (축적)': "✅ 적극 매수 - DCA 전략",
        'Markup (상승)': "✅ 보유 - 추가 매수 제한적",
        'Distribution (분산)': "🔴 단계적 매도 시작",
        'Markdown (하락)': "🔴 보유 또는 매도 - 현금 확보"
    }

    return {
        'stage': stage,
        'scores': scores,
        'strategy': strategies[stage]
    }

# 예시: 2023년 초 상황
result = identify_market_cycle_stage(
    nupl=0.18,
    mvrv=1.25,
    exchange_reserve_trend='decreasing',
    miner_revenue='medium'
)

print(f"현재 사이클 단계: {result['stage']}\\n")
print("단계별 점수:")
for stage, score in result['scores'].items():
    print(f"  {stage}: {score}")
print(f"\\n투자 전략: {result['strategy']}")
\`\`\`

## 4. 실전 투자 전략

### 4.1 온체인 기반 DCA 전략

\`\`\`python
def adaptive_dca_strategy(nupl, mvrv, total_monthly_budget):
    """
    온체인 지표에 따라 매수 금액 조정하는 DCA
    """
    # 기본 매수 금액
    base_amount = total_monthly_budget / 4  # 주 1회

    # NUPL 기반 배수
    if nupl < -0.2:
        nupl_multiplier = 3.0  # 3배 매수
    elif nupl < 0:
        nupl_multiplier = 2.0
    elif nupl < 0.25:
        nupl_multiplier = 1.5
    elif nupl < 0.5:
        nupl_multiplier = 1.0
    elif nupl < 0.75:
        nupl_multiplier = 0.5
    else:
        nupl_multiplier = 0.0  # 매수 중단

    # MVRV 기반 배수
    if mvrv < 0.8:
        mvrv_multiplier = 2.5
    elif mvrv < 1.0:
        mvrv_multiplier = 2.0
    elif mvrv < 1.5:
        mvrv_multiplier = 1.5
    elif mvrv < 2.0:
        mvrv_multiplier = 1.0
    elif mvrv < 3.0:
        mvrv_multiplier = 0.5
    else:
        mvrv_multiplier = 0.0

    # 평균 배수
    avg_multiplier = (nupl_multiplier + mvrv_multiplier) / 2

    # 최종 매수 금액
    buy_amount = base_amount * avg_multiplier

    return {
        'base_amount': base_amount,
        'nupl_multiplier': nupl_multiplier,
        'mvrv_multiplier': mvrv_multiplier,
        'final_multiplier': avg_multiplier,
        'buy_amount': buy_amount,
        'recommendation': f"이번 주 \${buy_amount:.0f} 매수 ({avg_multiplier:.1f}배)"
    }

# 예시: 월 \$1,000 DCA
result = adaptive_dca_strategy(
    nupl=0.12,
    mvrv=1.15,
    total_monthly_budget=1000
)

print(f"기본 주간 금액: \${result['base_amount']:.0f}")
print(f"NUPL 배수: {result['nupl_multiplier']}x")
print(f"MVRV 배수: {result['mvrv_multiplier']}x")
print(f"\\n{result['recommendation']}")
\`\`\`

### 4.2 온체인 기반 익절/손절

\`\`\`
익절 전략:
NUPL > 0.75 → 20% 매도
NUPL > 0.80 → 추가 30% 매도
MVRV > 3.5 → 나머지 50% 매도

고래 대량 유입 + NUPL > 0.7
→ 즉시 50% 매도

손절 전략:
온체인 지표는 장기 관점
→ 단기 손절보다 "매수 기회" 관점

NUPL < -0.25 and 하락 추세
→ 손절 아닌 "추가 매수"

단, 펀더멘털 파괴 시:
(예: 정부 금지, 프로토콜 결함)
→ 즉시 청산
\`\`\`

## 5. 주의사항 및 한계

\`\`\`
온체인 분석의 한계:

1. 시차 (Lag):
   - 온체인 데이터는 후행 지표
   - 실시간 가격 변화에 늦음
   - 단기 매매에는 부적합

2. 거짓 신호 (False Signals):
   - 극단적 지표도 수개월 유지 가능
   - 2021년 NUPL 0.7 이상 6개월 지속

3. 시장 구조 변화:
   - 과거 패턴이 미래를 보장 안 함
   - ETF, 기관 진입으로 사이클 변화 가능

4. 데이터 해석의 어려움:
   - 같은 지표도 상황에 따라 다른 의미
   - 맥락 파악 중요

5. 오프체인 변수:
   - 규제, 해킹, 거시경제
   - 온체인으로 예측 불가

올바른 활용법:
✅ 장기 투자 관점 (몇 개월~수년)
✅ 여러 지표 종합 판단
✅ 전통적 기술분석과 병행
✅ 펀더멘털 분석 우선
❌ 단기 매매에 의존
❌ 단일 지표만 맹신
\`\`\`

## 6. 결론

온체인 분석은 비트코인 투자자에게 강력한 도구입니다. 조작 불가능한 블록체인 데이터를 통해 시장의 진짜 모습을 볼 수 있습니다.

**핵심 정리**
- NUPL/MVRV로 시장 과열/침체 판단
- 거래소 유출입으로 수급 파악
- 고래와 채굴자 행동으로 스마트머니 추적
- 여러 지표를 종합하여 사이클 단계 식별
- 장기 투자 관점에서 활용

온체인 분석으로 시장의 두려움과 욕심을 객관적으로 측정하고, 군중과 반대로 움직일 수 있는 통찰력을 얻으시기 바랍니다.

`,
  publishedAt: '2025-01-29',
  readTime: 21,
  tags: ['비트코인', '온체인분석', 'NUPL', 'MVRV', 'Glassnode', '고래추적', '채굴자', '거래소유출입', '블록체인', '암호화폐투자']
};
