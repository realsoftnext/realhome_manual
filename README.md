# 부동산 홈페이지 및 통합관리시스템 사용자 매뉴얼

## 환경 설정

### Admin 페이지 사용을 위한 GitHub Token 설정

1. GitHub Personal Access Token 생성:
   - https://github.com/settings/tokens
   - "Generate new token (classic)" 클릭
   - `repo` 권한 전체 선택
   - Token 생성 후 복사

2. Vercel 환경 변수 설정:
   - Vercel Dashboard > 프로젝트 > Settings > Environment Variables
   - `GITHUB_TOKEN` 추가 및 생성한 토큰 입력
   - Redeploy

3. 로컬 개발 환경:
   ```bash
   cp .env.example .env.local
   # .env.local 파일에 GITHUB_TOKEN 입력
   ```

## Admin 페이지 사용법

- **URL**: https://manual.realhome.kr/admin/login
- **이메일**: master@runai.kr
- **비밀번호**: real1130

### 기능
- WYSIWYG 에디터
- 이미지 드래그 앤 드롭 업로드
- GitHub 자동 커밋 & 푸시
- Vercel 자동 재배포

---

<style>
@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-1Thin.woff2') format('woff2');
    font-weight: 100;
    font-display: swap;
}

@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-2ExtraLight.woff2') format('woff2');
    font-weight: 200;
    font-display: swap;
}

@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-3Light.woff2') format('woff2');
    font-weight: 300;
    font-display: swap;
}

@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2') format('woff2');
    font-weight: 400;
    font-display: swap;
}

@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2') format('woff2');
    font-weight: 500;
    font-display: swap;
}

@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2') format('woff2');
    font-weight: 600;
    font-display: swap;
}

@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
}

@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-8ExtraBold.woff2') format('woff2');
    font-weight: 800;
    font-display: swap;
}

@font-face {
    font-family: 'Paperozi';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-9Black.woff2') format('woff2');
    font-weight: 900;
    font-display: swap;
}

body {
  font-family: 'Paperozi', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
}
</style>

# 부동산 홈페이지 및 통합관리시스템 사용자 매뉴얼

> **대상**: 부동산 중개업소 직원 및 관리자  
> **작성일**: 2025년 11월 12일  
> **버전**: 1.0

---

## 📚 목차

| # | 제목 | 주요 내용 |
|:---:|:---|:---|
| 1 | [**시작하기**](manual/01-getting-started.md) | 시스템 접속 방법 · 권장 환경 · 모바일 사용 |
| 2 | [**로그인 및 계정 관리**](manual/02-login-account.md) | 로그인하기 · 비밀번호 찾기/변경 · 내 정보 수정 |
| 3 | [**대시보드 살펴보기**](manual/03-dashboard.md) | 대시보드 구성 · 주요 지표 확인 · 메뉴 설명 |
| 4 | [**매물 등록하기**](manual/04-product-registration.md) | 기본 정보 입력 · 거래 정보 입력 · 상세 정보 입력 · 사진 업로드 |
| 5 | [**매물 관리하기**](manual/05-product-management.md) | 매물 목록 · 검색 및 필터링 · 수정/삭제 · 엑셀 내보내기 |
| 6 | [**고객 연락처 관리**](manual/06-contact-management.md) | 연락처 목록 · 추가/수정 · 검색 · 매물 등록 시 활용 |
| 7 | [**문의 관리**](manual/07-enquiry-management.md) | 문의 목록 · 상태 관리 · 처리하기 · 계약으로 전환 |
| 8 | [**계약 관리**](manual/08-contract-management.md) | 계약 목록 · 새 계약 만들기 · 결제 일정 · 문서 관리 |
| 9 | [**매물 종류 설정**](manual/09-category-settings.md) | 매물 종류 관리 · 입력 필드 설정 · 프리셋 활용 |
| 10 | [**직원 및 권한 관리**](manual/10-staff-permissions.md) | 직원 초대 · 권한 관리 · 커스텀 권한 만들기 |
| 11 | [**홈페이지 콘텐츠 관리**](manual/11-content-management.md) | 블로그 · FAQ · 이용약관 · 사이트 설정 |
| 12 | [**자주 묻는 질문 (FAQ)**](manual/12-faq.md) | 시스템 사용 중 자주 묻는 질문과 답변 |
| 13 | [**빠른 참조 가이드**](manual/13-quick-reference.md) | 주요 기능 빠른 참조 및 체크리스트 |
| 14 | [**용어 설명**](manual/14-glossary.md) | 부동산 및 시스템 관련 용어 정리 |

---

## 🚀 빠른 시작

처음 사용하신다면 다음 순서로 매뉴얼을 읽어보세요:

1. [시작하기](manual/01-getting-started.md) - 시스템 접속 방법
2. [로그인 및 계정 관리](manual/02-login-account.md) - 로그인하기
3. [대시보드 살펴보기](manual/03-dashboard.md) - 화면 구성 이해
4. [매물 등록하기](manual/04-product-registration.md) - 첫 매물 등록

---

## 💡 주요 기능 바로가기

| 작업 | 매뉴얼 |
|------|--------|
| 매물 등록 방법 | [4. 매물 등록하기](manual/04-product-registration.md) |
| 고객 연락처 추가 | [6. 고객 연락처 관리](manual/06-contact-management.md) |
| 계약서 작성 | [8. 계약 관리](manual/08-contract-management.md) |
| 직원 초대 | [10. 직원 및 권한 관리](manual/10-staff-permissions.md) |

---

## 📞 지원 및 문의

### 기술 지원
- **이메일**: support@realsoftnext.com
- **전화**: 1234-5678
- **운영 시간**: 평일 09:00 - 18:00

### 긴급 문의
- **긴급 핫라인**: 010-1234-5678
- **24시간 대응**

---

## 📝 매뉴얼 사용 안내

- 각 챕터는 독립적으로 읽을 수 있습니다
- 검색 기능(Ctrl+F)을 활용하여 원하는 내용을 빠르게 찾으세요
- 스크린샷과 예시로 쉽게 이해할 수 있습니다
- 💡 팁과 ⚠️ 주의사항을 참고하세요

---

*마지막 업데이트: 2025년 11월 12일*
