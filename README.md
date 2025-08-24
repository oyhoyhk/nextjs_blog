# 부자 되는 습관 📈

주식, 비트코인, 부동산 투자 인사이트와 분석을 제공하는 Next.js 기반 투자 블로그입니다.

## ✨ 주요 기능

### 📊 투자 카테고리
- **주식**: 국내외 주식 시장 분석과 투자 전략
- **비트코인**: 암호화폐 시장 동향과 블록체인 분석  
- **부동산**: 부동산 시장 분석과 투자 전략

### 📈 방문자 통계
- 실시간 방문자 수 추적
- 페이지별 조회수 카운터
- 인기 글 순위 (TOP 5)
- Google Analytics 연동

### 🎨 사용자 경험
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 빠른 페이지 로딩 (Next.js SSG)
- SEO 최적화
- 깔끔한 UI/UX

## 🛠 기술 스택

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Analytics**: Google Analytics + 커스텀 추적

## 🚀 로컬 개발

### 필수 요구사항
- Node.js 18+ 
- npm 또는 yarn

### 설치 및 실행
```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/blog.git
cd blog

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📝 콘텐츠 추가

### 새 글 작성
`src/data/blogPosts.ts` 파일에서 새 글을 추가할 수 있습니다:

```typescript
{
  id: '9',
  title: '새로운 글 제목',
  slug: 'new-article-slug',
  category: 'stocks', // 'stocks' | 'bitcoin' | 'real-estate'
  excerpt: '글 요약...',
  content: `# 마크다운 형식의 글 내용...`,
  publishedAt: '2025-01-25T10:00:00Z',
  readTime: 7,
  tags: ['태그1', '태그2']
}
```

### 카테고리 수정
`src/data/categories.ts`에서 카테고리 정보를 수정할 수 있습니다.

## 🌐 배포

자세한 배포 방법은 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참조하세요.

### 빠른 배포 (Vercel)
1. GitHub에 코드 업로드
2. [Vercel](https://vercel.com)에서 GitHub 연동
3. 자동 배포 완료!

## 📊 방문자 통계 설정

### Google Analytics
1. Google Analytics에서 측정 ID 발급
2. `.env.local` 파일 생성:
```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 기본 통계
- 로컬 스토리지 기반 방문자 카운터
- 페이지별 조회수 추적
- 인기 글 자동 순위 산정

## 🎯 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── [category]/        # 동적 카테고리 페이지
│   │   └── [item]/        # 동적 글 페이지
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지
├── components/            # 재사용 컴포넌트
│   ├── GoogleAnalytics.tsx
│   ├── Header.tsx
│   ├── PageViewCounter.tsx
│   ├── PopularPosts.tsx
│   └── VisitorStats.tsx
├── data/                  # 정적 데이터
│   ├── blogPosts.ts       # 블로그 글 데이터
│   └── categories.ts      # 카테고리 데이터
├── hooks/                 # 커스텀 훅
├── types/                 # TypeScript 타입 정의
└── utils/                 # 유틸리티 함수
```

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행  
npm run start

# 린트 검사
npm run lint
```

## 🎨 커스터마이징

### 디자인 변경
- `tailwind.config.js`: Tailwind CSS 설정
- `src/app/globals.css`: 전역 스타일
- 컴포넌트별 클래스명으로 개별 스타일링

### 기능 추가
- `src/components/`: 새 컴포넌트 추가
- `src/utils/`: 유틸리티 함수 추가
- `src/hooks/`: 커스텀 훅 추가

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 질문이나 제안사항이 있으시면 Issues를 통해 연락해 주세요.

---

**부자가 되는 습관, 지금 시작하세요! 💰**
