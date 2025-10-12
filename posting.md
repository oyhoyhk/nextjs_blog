# 블로그 포스팅 가이드

## 프로젝트 개요
- **프로젝트명**: 부자 되는 습관 📈
- **목적**: 주식, 비트코인, 부동산 투자 인사이트와 분석을 제공하는 투자 블로그
- **기술스택**: Next.js 15, TypeScript, Tailwind CSS
- **배포**: Vercel

## 카테고리 구조

### 기존 카테고리
1. **주식 (stocks)**
   - 국내외 주식 시장 분석과 투자 인사이트
   - 기존 글: 삼성전자, Apple, SK하이닉스, 금리인하 영향 분석

2. **비트코인 (bitcoin)**
   - 암호화폐 시장 동향과 블록체인 기술 분석
   - 기존 글: 비트코인 ETF, 이더리움 2.0

3. **부동산 (real-estate)**
   - 부동산 시장 분석과 투자 전략
   - 기존 글: 서울 아파트 시장, 신도시 투자

4. **경제 (economy)**
   - 국내외 경제 동향과 거시경제 분석
   - 주제: 금리 정책, 환율, 인플레이션, GDP 등

5. **퀀트 투자 (quant)**
   - 데이터 기반 퀀트 투자 전략과 알고리즘 트레이딩
   - 주제: 팩터 투자, 백테스팅, 알고리즘 매매

6. **경매 (auction)**
   - 부동산 경매 정보와 실전 투자 전략
   - 주제: 경매 낙찰, 권리분석, 명도

## 블로그 포스트 데이터 구조

### BlogPost Interface
```typescript
interface BlogPost {
  id: string;           // 고유 ID (숫자 문자열)
  title: string;        // 글 제목
  slug: string;         // URL용 슬러그 (영문, 하이픈 구분)
  category: string;     // 'stocks' | 'bitcoin' | 'real-estate' | 'economy' | 'quant' | 'auction'
  excerpt: string;      // 글 요약 (한 줄 요약)
  content: string;      // 마크다운 형식의 본문 내용
  publishedAt: string;  // ISO 8601 형식 날짜 (예: '2025-01-25T10:00:00Z')
  readTime: number;     // 예상 읽기 시간 (분 단위)
  tags: string[];       // 태그 배열 (한글/영문 혼용 가능)
}
```

## 새 글 작성 방법

### 1. 파일 위치
- 새 파일 생성: `posts/[slug].ts`
- TypeScript 파일로 각 포스트를 개별 파일로 관리

### 2. 파일 구조
각 포스트는 다음과 같은 TypeScript 파일 구조를 따릅니다:

```typescript
import { BlogPost } from '../src/types';

export const post: BlogPost = {
  id: 'unique-id',
  title: '글 제목',
  slug: 'url-friendly-slug',
  category: 'stocks' | 'bitcoin' | 'real-estate' | 'economy' | 'quant' | 'auction',
  excerpt: '글 요약 (한 줄)',
  content: `# 마크다운 내용

본문...
  `,
  publishedAt: '2025-01-25T10:00:00Z',
  readTime: 5,
  tags: ['태그1', '태그2', '태그3']
};
```

### 3. ID 및 파일명 규칙
- ID: 고유 식별자 (문자열)
- 파일명: `[slug].ts` 형태로 생성
- 슬러그: 영문 소문자, 하이픈(-) 구분
- 제목의 핵심 키워드 포함
- 예: `tesla-stock-analysis-2025.ts`

### 4. 카테고리 값
- 주식: 'stocks'
- 비트코인: 'bitcoin'
- 부동산: 'real-estate'
- 경제: 'economy'
- 퀀트 투자: 'quant'
- 경매: 'auction'

### 5. 콘텐츠 작성 가이드

#### 마크다운 구조 (content 필드 내부)
```markdown
# 메인 제목

## 개요/현재 상황

## 주요 분석 포인트
1. **첫 번째 포인트**: 설명
2. **두 번째 포인트**: 설명
3. **세 번째 포인트**: 설명

## 리스크 요인 또는 주의사항
- 위험 요소 1
- 위험 요소 2

## 투자 전략 또는 전망

## 결론
```

**주의사항:**
- <h4> 태그 사용: `<h4>제목</h4>` 형태로 작성
- 코드 블록은 ``` 사용하지 않음
- 템플릿 리터럴 내에서 백틱은 \` 로 이스케이프

#### 글 길이 가이드
- 읽기 시간 4-6분: 1,500-2,500자
- 읽기 시간 7-10분: 3,000-4,000자
- 읽기 시간 10분 이상: 5,000자+

#### 태그 작성 가이드
- 3-5개 태그 권장
- 종목명, 투자 주제, 분석 키워드 포함
- 예: ['삼성전자', '반도체', '투자분석', 'AI']

### 6. 새 파일 생성 과정
1. `/posts/` 디렉토리에 `[slug].ts` 파일 생성
2. 위 템플릿 구조 복사하여 내용 작성
3. 각 필드에 적절한 값 입력
4. content 필드에 마크다운 형식으로 본문 작성
5. **중요: `src/data/blogPosts.ts` 파일 업데이트**

### 7. blogPosts.ts 업데이트 (필수)

**⚠️ 새 포스트를 작성한 후 반드시 `src/data/blogPosts.ts` 파일을 업데이트해야 웹사이트에 표시됩니다.**

#### 업데이트 방법

1. `src/data/blogPosts.ts` 파일 열기
2. 새 포스트 import 추가:
```typescript
import { post as postN } from '../../posts/[your-slug]';
```
3. `allPosts` 배열에 추가:
```typescript
const allPosts: BlogPost[] = [
  post1, post2, ..., postN  // 새로 추가한 포스트 번호 추가
];
```

#### 예시

새로 `tesla-stock-analysis-2025.ts` 파일을 작성했다면:

```typescript
// 1. import 추가 (기존 import 아래에)
import { post as post67 } from '../../posts/tesla-stock-analysis-2025';

// 2. allPosts 배열에 추가
const allPosts: BlogPost[] = [
  post1, post2, post3, ..., post66, post67  // post67 추가
];
```

#### 주의사항
- 포스트 번호(postN)는 순차적으로 증가
- import 경로는 정확히 파일명과 일치해야 함
- 파일명에서 `.ts` 확장자는 제외
- blogPosts.ts 업데이트 없이는 새 포스트가 웹사이트에 표시되지 않음

### 8. 글 작성 시 고려사항

#### 투자 블로그 톤앤매너
- 객관적이고 분석적인 어조
- 과도한 추천이나 단정적 표현 지양
- 리스크 요인 반드시 포함
- 데이터와 팩트 기반 서술

#### 카테고리별 특화 주제

**주식 (stocks)**
- 기업 분석 (재무제표, 사업 현황, 경쟁력)
- 시장 동향 및 섹터 분석
- 경제 지표와 주식 시장 연관성
- 투자 전략 및 포트폴리오 구성
- 글로벌 경제 이슈와 국내 증시 영향

**비트코인 (bitcoin)**
- 암호화폐 시장 동향 및 기술 분석
- 블록체인 기술과 DeFi 생태계
- 비트코인 및 알트코인 투자 전략
- 규제 동향 및 제도권 진입

**부동산 (real-estate)**
- 부동산 시장 분석 및 가격 동향
- 지역별 투자 전략
- 전세/월세 시장 분석
- 부동산 정책 및 세금

**경제 (economy)**
- 금리 정책 및 통화정책 분석
- 환율 및 외환시장 동향
- 인플레이션과 물가 전망
- GDP 및 경기 사이클 분석
- 국제 경제 이슈 및 무역 동향

**퀀트 투자 (quant)**
- 팩터 투자 전략 (가치, 모멘텀, 퀄리티 등)
- 백테스팅 및 전략 검증
- 알고리즘 트레이딩 시스템 구축
- 포트폴리오 최적화 및 리밸런싱
- 머신러닝 기반 투자 모델

**경매 (auction)**
- 부동산 경매 입찰 전략
- 권리분석 및 법률 검토
- 명도 절차 및 실전 사례
- 경매 물건 발굴 및 분석
- 경매 자금 조달 전략

#### SEO 고려사항
- 제목에 핵심 키워드 포함
- excerpt에 검색 친화적 요약 작성
- 태그에 검색량이 많은 키워드 포함

## 기존 글 스타일 참고

### 제목 패턴
- "[기업명] 주식 투자 전략 분석"
- "[주제] 후 시장 변화"
- "[연도] [시장/지역] 전망"
- "[주제]의 기회와 리스크"

### excerpt 패턴
- "~를 분석해보겠습니다"
- "~의 영향을 살펴보겠습니다"  
- "~에 대해 분석합니다"

### 읽기 시간 분포
- 짧은 글: 4-6분
- 보통 글: 5-8분
- 긴 글: 10-12분

## 발행일 설정
- 현재 날짜 기준으로 ISO 8601 형식 사용
- 시간대: 'Z' (UTC) 사용
- 예: '2025-01-25T10:00:00Z'

## 품질 체크리스트
- [ ] 객관적이고 균형잡힌 시각
- [ ] 리스크 요인 명시
- [ ] 구체적 데이터/사실 포함
- [ ] 마크다운 형식 올바르게 적용
- [ ] 태그 3-5개 적절히 선정
- [ ] 읽기 시간 적절히 설정
- [ ] 슬러그 URL 친화적으로 생성
- [ ] **src/data/blogPosts.ts 파일 업데이트 완료**

## 포스트 요약 관리 (posts-summary.json)

### 목적
- 기존 포스트 내용 중복 방지
- 새 글 작성 시 주제 선정 참고
- 블로그 전체 콘텐츠 현황 파악

### 파일 위치
`/posts-summary.json`

### JSON 구조
```json
{
  "metadata": {
    "lastUpdated": "날짜",
    "totalPosts": 총_포스트_수,
    "categories": {
      "stocks": 주식_글_수,
      "bitcoin": 비트코인_글_수,
      "real-estate": 부동산_글_수
    }
  },
  "posts": [
    {
      "id": "포스트ID",
      "title": "글제목", 
      "category": "카테고리",
      "publishedAt": "발행일",
      "readTime": 읽기시간,
      "mainTopics": ["주요키워드배열"],
      "keyPoints": "핵심내용 한줄요약"
    }
  ],
  "upcomingTopics": {
    "stocks": ["예정된 주제들"],
    "suggestions": {
      "missingTopics": ["부족한 주제들"],
      "trendingKeywords": ["트렌딩 키워드"],
      "seasonalTopics": ["시즌별 주제"]
    }
  }
}
```

### 새 글 작성 시 JSON 업데이트 과정
1. **작성 전**: posts-summary.json 확인하여 중복 주제 방지
2. **작성 후**: 새 포스트 정보를 JSON에 추가
   - metadata.totalPosts 증가
   - metadata.categories 카운트 업데이트  
   - posts 배열에 새 항목 추가
   - metadata.lastUpdated 갱신

### 활용 방법
- **중복 방지**: mainTopics와 keyPoints로 유사 주제 확인
- **주제 발굴**: upcomingTopics.suggestions 참고
- **트렌드 파악**: 기존 글의 태그와 주제 분석
- **카테고리 밸런스**: 각 카테고리별 글 수 균형 고려

### 업데이트 예시
새 글 작성 후 추가할 JSON 항목:
```json
{
  "id": "9",
  "title": "테슬라 주가 분석과 전기차 시장 전망",
  "category": "stocks", 
  "publishedAt": "2025-01-25T14:00:00Z",
  "readTime": 7,
  "mainTopics": ["테슬라", "전기차", "자율주행", "배터리"],
  "keyPoints": "FSD 기술 발전, 중국 시장 확대, 배터리 기술 혁신으로 장기 성장 기대"
}
```