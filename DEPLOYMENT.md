# 블로그 배포 가이드

이 가이드는 "부자 되는 습관" 블로그를 웹에 배포하는 방법을 설명합니다.

## 🚀 배포 옵션

### 1. Vercel 배포 (권장)
- **장점**: Next.js 최적화, 무료, CDN 자동 설정, 도메인 제공
- **단점**: 상업적 사용 시 유료

### 2. Netlify 배포
- **장점**: 무료, 쉬운 설정, 폼 처리 지원
- **단점**: Next.js 고급 기능 일부 제한

### 3. Vercel CLI 배포
- **장점**: 명령어 한 줄로 배포
- **단점**: CLI 설치 필요

---

## 📋 배포 전 체크리스트

### 필수 확인사항
- [ ] 프로젝트가 로컬에서 정상 작동 (`npm run dev`)
- [ ] 빌드가 성공적으로 완료 (`npm run build`)
- [ ] GitHub 계정 준비
- [ ] Vercel 계정 준비 (GitHub로 가입 권장)

### 선택사항
- [ ] Google Analytics ID 준비
- [ ] 커스텀 도메인 준비 (있는 경우)

---

## 🔧 1단계: GitHub에 코드 업로드

### 1-1. GitHub 저장소 생성
1. [GitHub](https://github.com)에서 "New repository" 클릭
2. Repository name: `blog` (또는 원하는 이름)
3. Public으로 설정 (Private도 가능)
4. "Create repository" 클릭

### 1-2. 로컬 코드를 GitHub에 업로드
```bash
# Git 초기화 (이미 되어있을 수 있음)
git init

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "Initial commit: 부자 되는 습관 블로그"

# GitHub 저장소 연결 (YOUR_USERNAME을 실제 GitHub 사용자명으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/blog.git

# 기본 브랜치를 main으로 설정
git branch -M main

# GitHub에 업로드
git push -u origin main
```

---

## 🌐 2단계: Vercel 배포

### 2-1. Vercel 계정 생성
1. [Vercel](https://vercel.com)에 접속
2. "Sign up with GitHub" 클릭하여 GitHub 계정으로 가입
3. GitHub 저장소 접근 권한 승인

### 2-2. 프로젝트 배포
1. Vercel 대시보드에서 "New Project" 클릭
2. GitHub 저장소에서 생성한 블로그 저장소 선택
3. "Import" 클릭
4. 프로젝트 설정:
   - **Project Name**: `blog` (또는 원하는 이름)
   - **Framework**: Next.js (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 설정됨)
5. "Deploy" 클릭

### 2-3. 배포 완료
- 약 1-2분 후 배포 완료
- `https://your-project-name.vercel.app` 형태의 URL 제공
- 자동으로 HTTPS 적용 및 CDN 설정

---

## 🔑 3단계: 환경 변수 설정 (선택사항)

### Google Analytics 설정
1. Vercel 프로젝트 대시보드에서 "Settings" 탭
2. "Environment Variables" 클릭
3. 다음 변수 추가:
   ```
   Name: NEXT_PUBLIC_GA_ID
   Value: G-XXXXXXXXXX (실제 Google Analytics ID)
   Environment: Production, Preview, Development
   ```
4. "Save" 클릭
5. "Deployments" 탭에서 "Redeploy" 실행

---

## 🎨 4단계: 커스텀 도메인 설정 (선택사항)

### 도메인 연결
1. Vercel 프로젝트에서 "Settings" → "Domains"
2. "Add" 버튼 클릭
3. 보유한 도메인 입력 (예: `buzahabits.com`)
4. DNS 설정 안내에 따라 도메인 제공업체에서 설정
5. 자동 HTTPS 적용

---

## 🔄 5단계: 자동 배포 설정

### GitHub 연동으로 자동 배포
- GitHub에 코드 푸시할 때마다 자동 배포
- Pull Request 시 프리뷰 배포 생성
- `main` 브랜치가 프로덕션에 자동 배포

### 수동 배포 (Vercel CLI)
```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 프로젝트 폴더에서 배포
vercel --prod
```

---

## 📊 배포 후 확인사항

### ✅ 기능 테스트
- [ ] 홈페이지 로딩 확인
- [ ] 카테고리 페이지 동작 확인
- [ ] 개별 글 페이지 확인
- [ ] 방문자 카운터 작동 확인
- [ ] 모바일 반응형 확인

### ✅ 성능 확인
- [ ] Google PageSpeed Insights 테스트
- [ ] 로딩 속도 확인 (3초 이내)
- [ ] SEO 기본 설정 확인

---

## 🔧 문제 해결

### 배포 실패 시
1. **빌드 에러**: 로컬에서 `npm run build` 실행하여 에러 확인
2. **환경 변수 에러**: Vercel에서 환경 변수 설정 확인
3. **도메인 에러**: DNS 설정 재확인 (24시간 소요 가능)

### 업데이트 방법
```bash
# 코드 수정 후
git add .
git commit -m "블로그 업데이트"
git push origin main
# → Vercel에서 자동 재배포
```

---

## 💡 운영 팁

### 콘텐츠 업데이트
1. `src/data/blogPosts.ts`에서 새 글 추가
2. GitHub에 푸시하면 자동 배포
3. 약 1-2분 후 라이브 사이트에 반영

### 방문자 통계 확인
- Vercel Analytics (유료)
- Google Analytics (무료)
- 블로그 내장 방문자 카운터

### 백업
- GitHub에 자동 백업됨
- Vercel에서 배포 히스토리 관리
- 언제든 이전 버전으로 롤백 가능

---

## 📞 지원

문제가 발생하면:
1. Vercel 대시보드에서 배포 로그 확인
2. GitHub Actions (설정한 경우) 확인
3. 브라우저 개발자 도구에서 에러 메시지 확인

**축하합니다! 🎉 "부자 되는 습관" 블로그가 전 세계에 공개되었습니다!**