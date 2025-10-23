import { BlogPost } from '@/types';

export const post: BlogPost = {
  id: '119',
  title: '부동산 경매 법률 리스크 완벽 대응 가이드: 권리분석부터 명도까지',
  slug: 'auction-legal-risk-management-guide',
  category: 'auction',
  excerpt: '부동산 경매의 가장 큰 리스크인 법률 문제를 체계적으로 관리하는 방법을 안내합니다. 권리분석 실전 기법, 유치권·임차권 대응, 명도 전략, 소송 대비까지 경매 투자의 모든 법률 리스크를 다룹니다.',
  content: `
# 부동산 경매 법률 리스크 완벽 대응 가이드: 권리분석부터 명도까지

부동산 경매 투자의 최대 리스크는 법률 문제입니다. 낙찰 후 예상치 못한 권리관계나 점유자 문제로 인한 손실은 수익률을 크게 악화시킵니다. 이 가이드에서는 입찰 전 권리분석부터 낙찰 후 명도까지, 경매 투자의 모든 법률 리스크를 체계적으로 관리하는 방법을 상세히 다룹니다.

## 1. 경매 권리분석의 기초

### 1.1 권리분석이란?

**정의**
- 경매 목적물에 설정된 모든 권리관계를 파악하는 과정
- 낙찰 후 인수할 권리와 소멸할 권리 구분
- 법률적 리스크와 추가 비용 예측

**핵심 원칙: 선순위 vs 후순위**

\`\`\`python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from typing import List, Dict, Tuple

class AuctionRightsAnalysis:
    """경매 권리분석 시스템"""

    def __init__(self):
        self.senior_junior_rule = {
            'description': '기준권리보다 빠르면 선순위(인수), 늦으면 후순위(소멸)',
            'benchmark': '경매개시결정등기일 (대부분의 경우)'
        }

    def explain_basic_principle(self) -> pd.DataFrame:
        """기본 원칙 설명"""

        principles = pd.DataFrame({
            '구분': ['선순위 권리', '후순위 권리', '기준 시점'],
            '의미': [
                '낙찰자가 인수 (부담)',
                '소멸됨 (부담 없음)',
                '경매개시결정등기일'
            ],
            '예시': [
                '선순위 근저당, 전세권, 지상권',
                '후순위 근저당, 압류, 가압류',
                '등기부 갑구/을구 참조'
            ],
            '대응': [
                '감정가에서 차감 또는 입찰 포기',
                '낙찰 시 자동 소멸',
                '권리분석 기준점'
            ]
        })

        return principles

    def identify_benchmark_date(self, registry_data: List[Dict]) -> Dict:
        """기준일 확인"""

        # 경매개시결정등기 찾기
        for entry in registry_data:
            if '경매개시결정' in entry['description'] or \
               '임의경매개시결정' in entry['description'] or \
               '강제경매개시결정' in entry['description']:
                return {
                    'benchmark_date': entry['date'],
                    'benchmark_type': entry['description'],
                    'case_number': entry.get('case_number', 'N/A')
                }

        # 없으면 압류등기 (임의경매의 경우)
        for entry in registry_data:
            if '압류' in entry['description']:
                return {
                    'benchmark_date': entry['date'],
                    'benchmark_type': '압류 (임의경매)',
                    'case_number': entry.get('case_number', 'N/A')
                }

        return {'error': '기준일을 찾을 수 없음'}

    def classify_rights(self,
                       rights: List[Dict],
                       benchmark_date: datetime) -> Dict:
        """권리 분류: 선순위 vs 후순위"""

        senior_rights = []
        junior_rights = []

        for right in rights:
            right_date = right['registration_date']

            if right_date < benchmark_date:
                senior_rights.append(right)
            else:
                junior_rights.append(right)

        return {
            'senior': senior_rights,
            'junior': junior_rights,
            'benchmark': benchmark_date
        }

# 기본 원칙 출력
analyzer = AuctionRightsAnalysis()

print("경매 권리분석 기본 원칙")
print("=" * 90)
print(analyzer.explain_basic_principle().to_string(index=False))

print("\n\n【핵심 규칙】")
print(f"설명: {analyzer.senior_junior_rule['description']}")
print(f"기준: {analyzer.senior_junior_rule['benchmark']}")

# 예시: 등기부 데이터
sample_registry = [
    {
        'date': datetime(2020, 3, 15),
        'description': '근저당권설정',
        'amount': 300_000_000,
        'creditor': 'A은행'
    },
    {
        'date': datetime(2022, 6, 10),
        'description': '경매개시결정',
        'case_number': '2022타경12345'
    },
    {
        'date': datetime(2022, 7, 20),
        'description': '압류',
        'amount': 50_000_000,
        'creditor': '국세청'
    },
    {
        'date': datetime(2023, 1, 5),
        'description': '가압류',
        'amount': 20_000_000,
        'creditor': 'B채권자'
    }
]

# 기준일 확인
benchmark = analyzer.identify_benchmark_date(sample_registry)
print(f"\n\n기준일: {benchmark['benchmark_date'].strftime('%Y-%m-%d')}")
print(f"유형: {benchmark['benchmark_type']}")

# 권리 분류
rights_list = [r for r in sample_registry if r['description'] != '경매개시결정']
classified = analyzer.classify_rights(rights_list, benchmark['benchmark_date'])

print(f"\n선순위 권리 (인수): {len(classified['senior'])}건")
for right in classified['senior']:
    print(f"  • {right['date'].strftime('%Y-%m-%d')} - {right['description']} ({right.get('amount', 0):,}원)")

print(f"\n후순위 권리 (소멸): {len(classified['junior'])}건")
for right in classified['junior']:
    print(f"  • {right['date'].strftime('%Y-%m-%d')} - {right['description']} ({right.get('amount', 0):,}원)")
\`\`\`

### 1.2 주요 권리 종류와 대응

**1) 근저당권**

\`\`\`python
class MortgageAnalysis:
    """근저당권 분석"""

    def analyze_mortgage(self, mortgage: Dict, appraisal_value: int) -> Dict:
        """근저당권 분석"""

        result = {
            'creditor': mortgage['creditor'],
            'max_amount': mortgage['max_claim_amount'],  # 채권최고액
            'registration_date': mortgage['date'],
            'is_senior': mortgage.get('is_senior', False)
        }

        if result['is_senior']:
            # 선순위 근저당: 인수해야 함
            result['risk_level'] = '높음'
            result['action'] = '채권최고액을 감정가에서 차감하거나 입찰 포기'
            result['burden'] = mortgage['max_claim_amount']

            # 실제 채무액 조회 필요
            result['note'] = '채권최고액이 상한. 실제 채무는 은행 조회 필요'

        else:
            # 후순위 근저당: 소멸
            result['risk_level'] = '없음'
            result['action'] = '낙찰 시 자동 소멸'
            result['burden'] = 0
            result['note'] = '배당에서 일부 변제될 수 있음'

        return result

    def calculate_ltv_safety(self,
                            senior_mortgage: int,
                            appraisal_value: int,
                            bid_price: int) -> Dict:
        """담보인정비율(LTV) 안전성 분석"""

        # 선순위 근저당 대비 감정가
        ltv_appraisal = (senior_mortgage / appraisal_value) * 100

        # 선순위 근저당 대비 입찰가
        ltv_bid = (senior_mortgage / bid_price) * 100

        # 안전성 평가
        if ltv_appraisal < 60:
            safety = '안전'
        elif ltv_appraisal < 80:
            safety = '보통'
        else:
            safety = '위험'

        return {
            'senior_mortgage': senior_mortgage,
            'appraisal_value': appraisal_value,
            'bid_price': bid_price,
            'ltv_appraisal': ltv_appraisal,
            'ltv_bid': ltv_bid,
            'safety_level': safety,
            'recommendation': '입찰 가능' if safety != '위험' else '재검토 필요'
        }

# 근저당권 분석 예시
mortgage_analyzer = MortgageAnalysis()

# 선순위 근저당권
senior_mortgage = {
    'creditor': 'KB국민은행',
    'max_claim_amount': 400_000_000,  # 채권최고액 4억
    'date': datetime(2019, 5, 10),
    'is_senior': True
}

analysis = mortgage_analyzer.analyze_mortgage(senior_mortgage, appraisal_value=800_000_000)

print("근저당권 분석")
print("=" * 80)
print(f"채권자: {analysis['creditor']}")
print(f"채권최고액: {analysis['max_amount']:,}원")
print(f"선후순위: {'선순위 (인수)' if analysis['is_senior'] else '후순위 (소멸)'}")
print(f"리스크: {analysis['risk_level']}")
print(f"대응: {analysis['action']}")
print(f"부담액: {analysis['burden']:,}원")
print(f"비고: {analysis['note']}")

# LTV 안전성
safety_check = mortgage_analyzer.calculate_ltv_safety(
    senior_mortgage=400_000_000,
    appraisal_value=800_000_000,
    bid_price=640_000_000  # 감정가 80% 입찰
)

print("\n\nLTV 안전성 분석")
print("=" * 80)
print(f"선순위 근저당: {safety_check['senior_mortgage']:,}원")
print(f"감정가: {safety_check['appraisal_value']:,}원")
print(f"입찰가: {safety_check['bid_price']:,}원")
print(f"LTV (감정가 기준): {safety_check['ltv_appraisal']:.1f}%")
print(f"LTV (입찰가 기준): {safety_check['ltv_bid']:.1f}%")
print(f"안전성: {safety_check['safety_level']}")
print(f"권장: {safety_check['recommendation']}")
\`\`\`

**2) 임차권 (전세권, 임차인)**

\`\`\`python
class TenantRightsAnalysis:
    """임차권 분석 (가장 복잡하고 중요)"""

    def __init__(self):
        self.deposit_protection_limit = {
            'seoul': 150_000_000,    # 서울 소액임차인 기준 (2024년)
            'metro': 100_000_000,    # 광역시
            'other': 80_000_000      # 기타
        }

    def analyze_lease(self, lease: Dict, benchmark_date: datetime) -> Dict:
        """임차권 분석"""

        # 대항력: 전입일 + 확정일자
        has_residence = lease.get('move_in_date') is not None
        has_confirmation = lease.get('confirmation_date') is not None

        opposing_power_date = None
        if has_residence and has_confirmation:
            # 대항력 시점 = 전입일과 확정일자 중 늦은 날
            opposing_power_date = max(
                lease['move_in_date'],
                lease['confirmation_date']
            )

        # 선순위 여부 판단
        is_senior = False
        if opposing_power_date and opposing_power_date < benchmark_date:
            is_senior = True

        result = {
            'tenant_name': lease['tenant_name'],
            'deposit': lease['deposit'],
            'contract_date': lease['contract_date'],
            'move_in_date': lease.get('move_in_date'),
            'confirmation_date': lease.get('confirmation_date'),
            'opposing_power_date': opposing_power_date,
            'is_senior': is_senior,
            'has_opposing_power': opposing_power_date is not None
        }

        # 리스크 평가
        if is_senior:
            result['risk'] = '높음 - 인수 대상'
            result['action'] = '보증금 인수 또는 명도 협상'
            result['burden'] = lease['deposit']
        elif opposing_power_date:
            result['risk'] = '중간 - 배당 대상'
            result['action'] = '배당으로 변제, 명도 가능'
            result['burden'] = 0
        else:
            result['risk'] = '낮음'
            result['action'] = '명도 요구 가능'
            result['burden'] = 0

        return result

    def check_small_tenant_protection(self,
                                      lease: Dict,
                                      location: str,
                                      benchmark_date: datetime) -> Dict:
        """소액임차인 보호 확인"""

        limit = self.deposit_protection_limit.get(location, 80_000_000)

        # 최우선변제금액 계산 (보증금의 1/2, 최대 한도)
        priority_amount = min(lease['deposit'] / 2, limit / 2)

        # 소액임차인 요건
        is_small_tenant = (
            lease['deposit'] <= limit and
            lease.get('move_in_date') is not None and
            lease.get('move_in_date') < benchmark_date
        )

        result = {
            'is_small_tenant': is_small_tenant,
            'deposit_limit': limit,
            'priority_amount': priority_amount if is_small_tenant else 0,
            'note': '최우선변제권 - 등기부 권리보다 먼저 배당받음'
        }

        if is_small_tenant:
            result['warning'] = '낙찰자가 부담해야 할 수 있음 (배당 부족 시)'

        return result

    def calculate_total_tenant_burden(self,
                                      leases: List[Dict],
                                      appraisal_value: int) -> Dict:
        """임차인 총 부담액 계산"""

        total_senior = 0
        senior_tenants = []

        for lease in leases:
            analysis = self.analyze_lease(lease, datetime(2022, 6, 10))  # 예시 기준일
            if analysis['is_senior']:
                total_senior += analysis['burden']
                senior_tenants.append(analysis)

        burden_ratio = (total_senior / appraisal_value) * 100

        return {
            'total_burden': total_senior,
            'tenant_count': len(senior_tenants),
            'tenant_list': senior_tenants,
            'burden_ratio': burden_ratio,
            'risk_level': '높음' if burden_ratio > 30 else '보통' if burden_ratio > 10 else '낮음'
        }

# 임차권 분석 예시
tenant_analyzer = TenantRightsAnalysis()

# 임차인 데이터
tenants = [
    {
        'tenant_name': '김철수',
        'deposit': 200_000_000,
        'contract_date': datetime(2020, 1, 15),
        'move_in_date': datetime(2020, 1, 20),
        'confirmation_date': datetime(2020, 1, 25)
    },
    {
        'tenant_name': '이영희',
        'deposit': 100_000_000,
        'contract_date': datetime(2022, 8, 1),
        'move_in_date': datetime(2022, 8, 5),
        'confirmation_date': datetime(2022, 8, 10)
    },
    {
        'tenant_name': '박민수',
        'deposit': 80_000_000,
        'contract_date': datetime(2023, 3, 1),
        'move_in_date': None,  # 전입신고 안 함
        'confirmation_date': None
    }
]

benchmark = datetime(2022, 6, 10)

print("임차권 분석")
print("=" * 100)
for i, tenant in enumerate(tenants, 1):
    analysis = tenant_analyzer.analyze_lease(tenant, benchmark)

    print(f"\n【임차인 {i}: {analysis['tenant_name']}】")
    print(f"보증금: {analysis['deposit']:,}원")
    print(f"전입일: {analysis['move_in_date'].strftime('%Y-%m-%d') if analysis['move_in_date'] else 'X'}")
    print(f"확정일자: {analysis['confirmation_date'].strftime('%Y-%m-%d') if analysis['confirmation_date'] else 'X'}")
    print(f"대항력: {analysis['opposing_power_date'].strftime('%Y-%m-%d') if analysis['opposing_power_date'] else 'X'}")
    print(f"선순위 여부: {'선순위 (인수)' if analysis['is_senior'] else '후순위 (명도 가능)'}")
    print(f"리스크: {analysis['risk']}")
    print(f"대응: {analysis['action']}")
    print(f"부담액: {analysis['burden']:,}원")

    # 소액임차인 체크
    if analysis['deposit'] <= 150_000_000:
        small_check = tenant_analyzer.check_small_tenant_protection(
            tenant, 'seoul', benchmark
        )
        if small_check['is_small_tenant']:
            print(f"소액임차인: 예 (최우선변제 {small_check['priority_amount']:,}원)")

# 총 부담액
total_burden = tenant_analyzer.calculate_total_tenant_burden(
    tenants, appraisal_value=800_000_000
)

print("\n\n임차인 총 부담 분석")
print("=" * 100)
print(f"선순위 임차인 수: {total_burden['tenant_count']}명")
print(f"총 부담액: {total_burden['total_burden']:,}원")
print(f"감정가 대비: {total_burden['burden_ratio']:.1f}%")
print(f"리스크 수준: {total_burden['risk_level']}")
\`\`\`

**3) 유치권 (가장 위험)**

\`\`\`python
class LienAnalysis:
    """유치권 분석 (최고 난이도 리스크)"""

    def analyze_lien_risk(self, property_info: Dict) -> Dict:
        """유치권 리스크 분석"""

        risk_factors = {
            '다가구/다세대': '임차인이 유치권 주장 가능성',
            '상가': '시설투자 명목 유치권 주장',
            '공장/창고': '설비투자, 임대료 미지급 등',
            '재건축/리모델링': '공사대금 미지급 유치권',
            '점유자 있음': '유치권 주장 가능성 높음'
        }

        warnings = []
        for key, description in risk_factors.items():
            if key in property_info.get('characteristics', []):
                warnings.append(description)

        risk_level = '높음' if len(warnings) >= 2 else '중간' if len(warnings) == 1 else '낮음'

        return {
            'risk_level': risk_level,
            'warning_signs': warnings,
            'key_principle': '유치권은 등기부에 안 나옴 - 현장조사 필수',
            'verification': [
                '현장 방문하여 점유자 인터뷰',
                '공사 여부, 미지급 대금 확인',
                '전 소유자와 점유자 관계 파악',
                '계약서, 영수증 등 증빙 요구'
            ],
            'response': [
                '유치권 주장 시 → 법원에 유치권 부존재 확인소송',
                '정당한 유치권 → 채무 변제 또는 입찰 포기',
                '불법 점유 → 명도소송 및 형사고소'
            ]
        }

    def calculate_lien_defense_cost(self, lien_claim: int) -> Dict:
        """유치권 대응 비용 추정"""

        # 소송 비용
        litigation_cost = min(lien_claim * 0.05, 10_000_000)  # 5%, 최대 1천만원

        # 변호사 비용
        attorney_fee = 5_000_000  # 기본 500만원

        # 시간 비용 (6개월~1년)
        time_cost_months = 9  # 평균 9개월

        # 협상 시 할인 (통상 30~50%)
        negotiation_settlement = lien_claim * 0.4

        return {
            'claim_amount': lien_claim,
            'litigation_cost': litigation_cost,
            'attorney_fee': attorney_fee,
            'expected_duration_months': time_cost_months,
            'total_defense_cost': litigation_cost + attorney_fee,
            'settlement_amount': negotiation_settlement,
            'recommendation': '정당성 없으면 소송, 있으면 협상'
        }

# 유치권 분석 예시
lien_analyzer = LienAnalysis()

property_case = {
    'characteristics': ['다가구', '점유자 있음', '리모델링'],
    'occupant': '전 임차인',
    'claim': '리모델링 비용 5천만원 유치권 주장'
}

lien_risk = lien_analyzer.analyze_lien_risk(property_case)

print("유치권 리스크 분석")
print("=" * 90)
print(f"리스크 수준: {lien_risk['risk_level']}")
print(f"\n경고 신호:")
for warning in lien_risk['warning_signs']:
    print(f"  • {warning}")

print(f"\n핵심 원칙: {lien_risk['key_principle']}")

print("\n검증 방법:")
for step in lien_risk['verification']:
    print(f"  {step}")

print("\n대응 전략:")
for action in lien_risk['response']:
    print(f"  {action}")

# 대응 비용 계산
defense_cost = lien_analyzer.calculate_lien_defense_cost(lien_claim=50_000_000)

print("\n\n유치권 대응 비용 추정")
print("=" * 90)
print(f"유치권 주장액: {defense_cost['claim_amount']:,}원")
print(f"소송 비용: {defense_cost['litigation_cost']:,}원")
print(f"변호사 비용: {defense_cost['attorney_fee']:,}원")
print(f"총 대응 비용: {defense_cost['total_defense_cost']:,}원")
print(f"예상 소요 기간: {defense_cost['expected_duration_months']}개월")
print(f"협상 시 합의액 (예상): {defense_cost['settlement_amount']:,}원")
print(f"권장: {defense_cost['recommendation']}")
\`\`\`

## 2. 명도 전략 및 실무

### 2.1 명도 프로세스

\`\`\`python
class EvictionStrategy:
    """명도 전략"""

    def create_eviction_timeline(self, case_type: str) -> pd.DataFrame:
        """명도 일정표"""

        timelines = {
            '협의 명도 (순조)': [
                ('낙찰 후 연락', '1일', '점유자에게 낙찰 사실 통지'),
                ('협상', '1주', '이사 비용 지원 제안'),
                ('합의', '2주', '명도 확약서 작성'),
                ('인도', '1개월', '명도 완료 및 인도'),
                ('총 소요', '1~1.5개월', '-')
            ],

            '소송 명도 (불응)': [
                ('소장 제출', '1주', '건물명도 및 인도청구소송'),
                ('1차 변론', '1개월', '재판 진행'),
                ('판결', '2~3개월', '승소 판결'),
                ('강제집행', '3~4개월', '집행관 통한 강제 명도'),
                ('총 소요', '4~6개월', '비용 500~1000만원')
            ],

            '점유이전금지가처분': [
                ('신청', '즉시', '낙찰 직후 신청'),
                ('결정', '1주', '가처분 인용'),
                ('집행', '2주', '법원 공고문 부착'),
                ('효과', '-', '제3자 양도 방지'),
                ('총 소요', '2~3주', '비용 100~200만원')
            ]
        }

        if case_type not in timelines:
            case_type = '소송 명도 (불응)'

        df = pd.DataFrame(
            timelines[case_type],
            columns=['단계', '기간', '내용']
        )

        return df

    def calculate_eviction_cost(self,
                                occupant_type: str,
                                property_value: int) -> Dict:
        """명도 비용 추정"""

        costs = {
            '자진 명도 (협의)': {
                'negotiation_fee': property_value * 0.01,  # 1% (이사비 등)
                'legal_fee': 0,
                'enforcement_fee': 0,
                'duration_months': 1,
                'success_rate': 0.7
            },

            '소송 명도': {
                'negotiation_fee': 0,
                'legal_fee': 5_000_000,  # 변호사 비용
                'litigation_fee': 500_000,  # 인지대, 송달료
                'enforcement_fee': 3_000_000,  # 강제집행
                'duration_months': 5,
                'success_rate': 0.95
            },

            '유치권 주장자': {
                'negotiation_fee': property_value * 0.03,
                'legal_fee': 7_000_000,  # 유치권 부존재 확인소송
                'enforcement_fee': 5_000_000,
                'duration_months': 9,
                'success_rate': 0.6  # 불확실성 높음
            }
        }

        cost_detail = costs.get(occupant_type, costs['소송 명도'])

        total_cost = (
            cost_detail.get('negotiation_fee', 0) +
            cost_detail.get('legal_fee', 0) +
            cost_detail.get('litigation_fee', 0) +
            cost_detail.get('enforcement_fee', 0)
        )

        return {
            'occupant_type': occupant_type,
            'breakdown': cost_detail,
            'total_cost': total_cost,
            'duration_months': cost_detail['duration_months'],
            'success_rate': cost_detail['success_rate'],
            'cost_ratio': (total_cost / property_value) * 100
        }

    def negotiation_strategy(self, occupant_profile: Dict) -> Dict:
        """협상 전략"""

        strategies = {
            '합리적 임차인': {
                'approach': '이사 비용 지원 (100~300만원)',
                'key_point': '빠른 이사 시 인센티브 제공',
                'success_rate': 0.8
            },

            '전 소유자 (파산)': {
                'approach': '강경 대응 + 형사 고소 압박',
                'key_point': '불법 점유 고지, 형사 책임 경고',
                'success_rate': 0.6
            },

            '유치권 주장자': {
                'approach': '증빙 요구 + 법적 검토',
                'key_point': '정당성 없으면 단호히 거부, 있으면 협상',
                'success_rate': 0.5
            },

            '보증금 있는 임차인': {
                'approach': '배당표 확인 + 인수 or 명도 협상',
                'key_point': '선순위 여부에 따라 전략 차별화',
                'success_rate': 0.7
            }
        }

        profile_type = occupant_profile.get('type', '합리적 임차인')
        strategy = strategies.get(profile_type, strategies['합리적 임차인'])

        return {
            'occupant_type': profile_type,
            'recommended_approach': strategy['approach'],
            'key_negotiation_point': strategy['key_point'],
            'expected_success_rate': strategy['success_rate'],
            'fallback_plan': '협상 결렬 시 즉시 소송 제기'
        }

# 명도 전략 시연
eviction = EvictionStrategy()

# 1. 명도 일정
print("명도 유형별 일정")
print("=" * 90)

for case_type in ['협의 명도 (순조)', '소송 명도 (불응)']:
    print(f"\n【{case_type}】")
    timeline = eviction.create_eviction_timeline(case_type)
    print(timeline.to_string(index=False))

# 2. 명도 비용
property_value = 500_000_000

print("\n\n명도 비용 추정 (물건가 5억 기준)")
print("=" * 90)

for occupant_type in ['자진 명도 (협의)', '소송 명도', '유치권 주장자']:
    cost = eviction.calculate_eviction_cost(occupant_type, property_value)

    print(f"\n【{cost['occupant_type']}】")
    print(f"총 비용: {cost['total_cost']:,}원 ({cost['cost_ratio']:.2f}%)")
    print(f"소요 기간: {cost['duration_months']}개월")
    print(f"성공 확률: {cost['success_rate']:.0%}")

# 3. 협상 전략
occupant = {'type': '유치권 주장자'}
strategy = eviction.negotiation_strategy(occupant)

print("\n\n협상 전략")
print("=" * 90)
print(f"점유자 유형: {strategy['occupant_type']}")
print(f"권장 접근: {strategy['recommended_approach']}")
print(f"핵심 포인트: {strategy['key_negotiation_point']}")
print(f"예상 성공률: {strategy['expected_success_rate']:.0%}")
print(f"대안: {strategy['fallback_plan']}")
\`\`\`

### 2.2 명도 실전 체크리스트

\`\`\`python
def eviction_checklist() -> str:
    """명도 실전 체크리스트"""

    checklist = """
【명도 실전 체크리스트】

■ 낙찰 직후 (1일 이내)
□ 점유자에게 낙찰 사실 서면 통지
□ 점유이전금지가처분 신청 (필요 시)
□ 현장 방문 및 점유 상황 확인
□ 사진/동영상 촬영 (증거 확보)

■ 협상 단계 (1주~1개월)
□ 점유자 면담 (신분, 점유 경위 확인)
□ 권리관계 재확인 (등기부, 배당표)
□ 이사 비용 협상 (100~300만원)
□ 명도 확약서 작성 (날짜, 위약금 명시)
□ 인도 일정 합의

■ 소송 준비 (협상 결렬 시)
□ 변호사 선임
□ 소장 작성 (건물명도 및 인도청구)
□ 증거자료 제출 (등기부, 배당표, 사진)
□ 가처분 신청 (점유이전 방지)

■ 강제집행 단계
□ 승소 판결 확정
□ 집행문 부여 신청
□ 집행관에게 강제집행 신청
□ 현장 입회 (집행일)
□ 명도 완료 확인

■ 주의사항
□ 강제로 문 따거나 점유 배제 금지 (불법)
□ 협상 시 서면 기록 필수
□ 감정적 대응 자제
□ 법적 절차 준수
    """

    return checklist

print(eviction_checklist())
\`\`\`

## 3. 법률 리스크 최소화 전략

### 3.1 입찰 전 체크리스트

\`\`\`python
class PreBidLegalCheck:
    """입찰 전 법률 체크"""

    def comprehensive_check(self, property_id: str) -> Dict:
        """종합 법률 체크"""

        checklist = {
            '등기부 분석': {
                'items': [
                    '선순위 근저당권 확인',
                    '전세권 설정 여부',
                    '지상권, 지역권 확인',
                    '가압류, 압류 확인',
                    '가등기 확인 (특히 순위보전 가등기)',
                    '소유권 이전 이력 (명의신탁 의심)'
                ],
                'risk_level': None
            },

            '임대차 현황': {
                'items': [
                    '전입세대 열람 (주민센터)',
                    '확정일자 확인 (주민센터 or 등기소)',
                    '현장 점유자 면담',
                    '소액임차인 여부',
                    '대항력 시점 vs 기준일 비교'
                ],
                'risk_level': None
            },

            '물건 현황': {
                'items': [
                    '현장 방문 (최소 2회)',
                    '점유자 인터뷰',
                    '유치권 주장 가능성',
                    '불법 건축물 여부',
                    '도로, 일조권 문제'
                ],
                'risk_level': None
            },

            '소송 이력': {
                'items': [
                    '매각물건명세서 검토',
                    '배당표 확인',
                    '유치권 신고 여부',
                    '이해관계인 이의 신청'
                ],
                'risk_level': None
            }
        }

        # 실제로는 각 항목을 체크하여 리스크 레벨 산정
        return checklist

    def calculate_legal_risk_score(self, checks: Dict) -> Dict:
        """법률 리스크 점수화"""

        risk_scores = {
            '선순위 근저당 (LTV>70%)': 30,
            '선순위 임차인': 25,
            '유치권 의심': 40,
            '점유자 불응': 20,
            '소액임차인 다수': 15,
            '불법 건축물': 10,
            '가등기': 35
        }

        # 감지된 리스크들
        detected_risks = checks.get('detected_risks', [])

        total_score = sum(risk_scores.get(risk, 0) for risk in detected_risks)

        if total_score >= 50:
            assessment = '높음 - 입찰 재검토 권장'
        elif total_score >= 30:
            assessment = '중간 - 신중한 입찰'
        else:
            assessment = '낮음 - 입찰 가능'

        return {
            'detected_risks': detected_risks,
            'risk_scores': {risk: risk_scores.get(risk, 0) for risk in detected_risks},
            'total_score': total_score,
            'assessment': assessment,
            'max_score': 100
        }

# 입찰 전 체크 예시
pre_bid_check = PreBidLegalCheck()

# 예시 물건
property_risks = {
    'detected_risks': [
        '선순위 임차인',
        '점유자 불응',
        '유치권 의심'
    ]
}

risk_assessment = pre_bid_check.calculate_legal_risk_score(property_risks)

print("법률 리스크 평가")
print("=" * 90)
print(f"감지된 리스크: {len(risk_assessment['detected_risks'])}개")
for risk, score in risk_assessment['risk_scores'].items():
    print(f"  • {risk}: {score}점")

print(f"\n총 리스크 점수: {risk_assessment['total_score']}/100")
print(f"평가: {risk_assessment['assessment']}")
\`\`\`

### 3.2 낙찰 후 즉시 조치 사항

\`\`\`python
class PostBidActions:
    """낙찰 후 조치"""

    def immediate_actions(self) -> List[Dict]:
        """낙찰 직후 (24시간 이내) 조치"""

        return [
            {
                'action': '점유이전금지가처분 신청',
                'timing': '낙찰 당일',
                'why': '제3자에게 점유 이전 방지',
                'cost': 1_000_000,
                'priority': '최우선'
            },
            {
                'action': '점유자에게 서면 통지',
                'timing': '낙찰 1일 이내',
                'why': '낙찰 사실 고지 및 명도 협상 시작',
                'cost': 0,
                'priority': '최우선'
            },
            {
                'action': '현장 방문 및 사진 촬영',
                'timing': '낙찰 3일 이내',
                'why': '현 상태 증거 확보',
                'cost': 0,
                'priority': '높음'
            },
            {
                'action': '대금 납부 준비',
                'timing': '기한 내 (통상 1개월)',
                'why': '소유권 취득',
                'cost': 0,  # 낙찰가
                'priority': '필수'
            },
            {
                'action': '등기신청 (소유권 이전)',
                'timing': '대금 납부 후 즉시',
                'why': '법적 소유권 확보',
                'cost': 500_000,  # 등록세 등
                'priority': '필수'
            }
        ]

    def create_action_timeline(self) -> pd.DataFrame:
        """조치 일정표"""

        actions = self.immediate_actions()

        df = pd.DataFrame(actions)
        df = df.sort_values('priority', ascending=False)

        return df[['action', 'timing', 'why', 'cost', 'priority']]

# 낙찰 후 조치 안내
post_bid = PostBidActions()

timeline = post_bid.create_action_timeline()

print("낙찰 후 즉시 조치 사항")
print("=" * 100)
print(timeline.to_string(index=False))

print("\n\n【중요】")
print("• 점유이전금지가처분: 가장 중요! 제3자 양도 방지")
print("• 서면 통지: 협상의 시작점, 기록 남기기")
print("• 현장 방문: 증거 확보, 점유 상황 파악")
\`\`\`

## 4. 실전 사례 연구

### 4.1 성공 사례: 권리분석으로 리스크 회피

\`\`\`python
def success_case_study():
    """성공 사례 분석"""

    case = """
【사례 1: 선순위 임차인 발견으로 입찰 포기】

■ 물건 정보
- 서울 강서구 아파트 (감정가 8억)
- 1회 유찰 후 80% (6.4억)
- 외관상 깔끔, 입지 양호

■ 권리분석 결과
- 경매개시결정: 2022.6.10
- 임차인 A: 보증금 4억
  - 전입일: 2021.3.5
  - 확정일자: 2021.3.10
  - → 대항력: 2021.3.10 (선순위!)

■ 판단
- 선순위 임차인 4억 인수 시
  - 실질 투자액: 6.4억 + 4억 = 10.4억
  - 시세 9억 → 손실 1.4억
- 입찰 포기 결정

■ 결과
- 해당 물건 2회 더 유찰 후 5.5억 낙찰
- 낙찰자는 선순위 임차인 인수 부담
- 권리분석으로 손실 회피

■ 교훈
- 겉으로는 좋아 보여도 권리분석 필수
- 선순위 임차인 = 숨겨진 부채
- 꼼꼼한 분석이 손실 방지
    """

    return case

print(success_case_study())
\`\`\`

### 4.2 실패 사례: 유치권 간과로 손실

\`\`\`python
def failure_case_study():
    """실패 사례 분석"""

    case = """
【사례 2: 유치권 간과로 명도 지연 및 손실】

■ 물건 정보
- 경기 수원시 상가 (감정가 5억)
- 2회 유찰 후 70% (3.5억) 낙찰

■ 입찰자의 판단 (오류)
- 등기부: 후순위 권리만 있음 → 깨끗하다고 판단
- 현장조사: 1회만 방문, 점유자 미확인
- 낙찰 후 수익형 상가로 임대 계획

■ 낙찰 후 문제 발생
- 점유자 B가 유치권 주장
  - 주장 내용: 리모델링 공사대금 8천만원 미지급
  - 증빙: 계약서, 영수증 일부 제시
- 명도 거부

■ 대응 과정
- 유치권 부존재 확인 소송 제기
- 1심 (10개월): 유치권 인정 (일부, 5천만원)
- 협상 후 4천만원 지급하고 명도
- 총 비용: 4천만원 + 변호사 비용 7백만원 + 1년 시간

■ 결과
- 예상 수익률: 30%
- 실제 수익률: 5% (유치권 대응 비용)
- 1년 시간 손실

■ 교훈
- 유치권은 등기부에 안 나옴
- 현장조사 필수 (점유자 면담)
- 상가/다가구는 특히 주의
- 의심스러우면 입찰 포기도 전략
    """

    return case

print("\n\n")
print(failure_case_study())
\`\`\`

## 5. 결론: 법률 리스크 관리의 핵심

### 핵심 원칙

1. **권리분석이 전부**: 입찰 전 철저한 권리분석이 성패를 결정
2. **현장조사 필수**: 등기부에 없는 유치권, 점유 상황 파악
3. **선순위 = 인수**: 선순위 권리는 낙찰자가 부담
4. **명도 계획**: 점유자 유형별 명도 전략 수립
5. **전문가 활용**: 복잡한 경우 변호사, 법무사 자문

\`\`\`python
def final_checklist():
    """최종 체크리스트"""

    checklist = """
【경매 법률 리스크 최종 체크리스트】

■ 입찰 전 필수 확인
□ 등기부등본 정밀 분석 (갑구, 을구)
□ 전입세대 열람 및 확정일자 확인
□ 현장 방문 (최소 2회, 점유자 면담)
□ 매각물건명세서 숙지
□ 배당표 확인 (선순위 채권 파악)

■ 위험 신호 (입찰 재검토)
□ 선순위 근저당 LTV 70% 이상
□ 선순위 임차인 다수
□ 유치권 의심 (리모델링, 공사 이력)
□ 점유자 불응 태도
□ 가등기 (특히 순위보전)

■ 낙찰 후 즉시 조치
□ 점유이전금지가처분 (당일)
□ 점유자에게 서면 통지 (1일 이내)
□ 현장 사진/동영상 촬영
□ 명도 협상 시작
□ 대금 납부 및 등기

■ 명도 전략
□ 협의 명도 우선 시도
□ 협상 결렬 시 즉시 소송
□ 강제집행 준비
□ 변호사 선임 (복잡한 경우)

"경매는 법률 게임이다. 규칙을 모르면 손해본다."
    """

    return checklist

print(final_checklist())
\`\`\`

---

**면책조항**: 이 글의 내용은 정보 제공 목적이며 법률 자문이 아닙니다. 실제 경매 투자 시 변호사, 법무사 등 전문가의 자문을 받으시기 바랍니다. 경매는 법률적 리스크가 높은 투자이므로 신중한 판단이 필요합니다.
  `,
  publishedAt: '2025-01-29',
  readTime: 25,
  tags: [
    '부동산경매',
    '권리분석',
    '명도',
    '법률리스크',
    '유치권',
    '임차권',
    '근저당권',
    '경매투자',
    '강제집행',
    '소액임차인',
    '대항력',
    '경매실전'
  ]
};
