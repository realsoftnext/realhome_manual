# RealEstate Template 시스템 매뉴얼

> **버전**: 0.1.0  
> **작성일**: 2025년 11월 12일  
> **기술 스택**: Next.js 16, React 19, Prisma, PostgreSQL, shadcn/ui, Aceternity UI

---

## 📑 목차

1. [시스템 개요](#1-시스템-개요)
2. [기술 스택](#2-기술-스택)
3. [시스템 요구사항](#3-시스템-요구사항)
4. [설치 및 환경 설정](#4-설치-및-환경-설정)
5. [데이터베이스 구조](#5-데이터베이스-구조)
6. [주요 기능](#6-주요-기능)
7. [프론트엔드](#7-프론트엔드)
8. [관리자 시스템](#8-관리자-시스템)
9. [API 엔드포인트](#9-api-엔드포인트)
10. [배포 가이드](#10-배포-가이드)
11. [트러블슈팅](#11-트러블슈팅)

---

## 1. 시스템 개요

### 1.1 프로젝트 소개

**RealEstate Template**은 현대적인 부동산 중개 웹사이트를 위한 풀스택 템플릿입니다. 기존의 구식 Codeigniter2 + MySQL 구조를 Next.js 기반의 최신 아키텍처로 재구축하였으며, AI 기반 개발을 지원하고 유연한 커스터마이징이 가능합니다.

### 1.2 주요 특징

- ✅ **최신 기술 스택**: Next.js 16, React 19, TypeScript
- ✅ **유연한 매물 관리**: 카테고리별 동적 필드 시스템
- ✅ **다중 거래 유형**: 매매, 전세, 월세, 분양 등 확장 가능
- ✅ **고급 지도 통합**: 카카오맵/구글맵 지원
- ✅ **모던 UI**: shadcn/ui + Aceternity UI + Framer Motion
- ✅ **반응형 디자인**: 모바일 최적화
- ✅ **권한 관리 시스템**: 역할 기반 접근 제어
- ✅ **계약 관리**: 전문적인 부동산 계약 추적
- ✅ **블로그/FAQ 시스템**: 콘텐츠 관리 기능

### 1.3 시스템 아키텍처

```
┌─────────────────────────────────────────────────┐
│                  Frontend (Next.js)              │
│  ┌──────────────┐  ┌──────────────┐            │
│  │  Public Site │  │  Admin Panel │            │
│  │  (shadcn/ui) │  │  (Keen UI)   │            │
│  └──────────────┘  └──────────────┘            │
├─────────────────────────────────────────────────┤
│              API Routes (Next.js API)            │
│  /api/products | /api/admin/* | /api/auth/*     │
├─────────────────────────────────────────────────┤
│              ORM Layer (Prisma)                  │
├─────────────────────────────────────────────────┤
│           Database (PostgreSQL)                  │
│  Products | Categories | Contacts | Contracts   │
└─────────────────────────────────────────────────┘
```

---

## 2. 기술 스택

### 2.1 프론트엔드

| 기술 | 버전 | 용도 |
|------|------|------|
| **Next.js** | 16.0.1 | React 프레임워크 |
| **React** | 19.2.0 | UI 라이브러리 |
| **TypeScript** | 5.x | 타입 안전성 |
| **Tailwind CSS** | 4.x | 스타일링 |
| **shadcn/ui** | - | UI 컴포넌트 |
| **Aceternity UI** | 0.2.2 | 고급 UI 컴포넌트 |
| **Framer Motion** | 12.23.24 | 애니메이션 |
| **Lucide React** | 0.552.0 | 아이콘 |

### 2.2 백엔드

| 기술 | 버전 | 용도 |
|------|------|------|
| **Prisma** | 6.18.0 | ORM |
| **PostgreSQL** | - | 데이터베이스 |
| **NextAuth.js** | 4.24.13 | 인증 |
| **bcryptjs** | 3.0.3 | 비밀번호 암호화 |

### 2.3 외부 서비스

| 서비스 | 용도 |
|--------|------|
| **AWS S3** | 파일 저장 |
| **Supabase** | 백업 스토리지 |
| **Kakao Maps** | 지도 서비스 |
| **Google Analytics** | 분석 |
| **OpenAI** | AI 기능 |

---

## 3. 시스템 요구사항

### 3.1 개발 환경

- **Node.js**: 20.x 이상
- **npm**: 10.x 이상
- **PostgreSQL**: 14.x 이상
- **Git**: 최신 버전

### 3.2 권장 사양

- **메모리**: 최소 8GB RAM
- **저장공간**: 최소 10GB
- **OS**: Windows 10/11, macOS, Linux

---

## 4. 설치 및 환경 설정

### 4.1 저장소 클론

```bash
git clone https://github.com/realsoftnext/realestate_template.git
cd realestate_template
```

### 4.2 의존성 설치

```bash
npm install
```

### 4.3 환경 변수 설정

`.env.example` 파일을 복사하여 `.env` 파일을 생성합니다:

```bash
cp .env.example .env
```

필수 환경 변수:

```env
# 데이터베이스
DATABASE_URL="postgresql://user:password@localhost:5432/realestate"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# AWS S3 (파일 업로드)
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="ap-northeast-2"
AWS_BUCKET_NAME="your-bucket-name"

# Kakao Maps
NEXT_PUBLIC_KAKAO_MAP_KEY="5e86435519926226bc0a6f9eb42ff326"

# OpenAI (선택사항)
OPENAI_API_KEY="your-openai-key"
```

### 4.4 데이터베이스 설정

#### PostgreSQL 설치 및 데이터베이스 생성

```bash
# PostgreSQL 접속
psql -U postgres

# 데이터베이스 생성
CREATE DATABASE realestate;

# 사용자 생성 및 권한 부여
CREATE USER realestate_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE realestate TO realestate_user;
```

#### Prisma 마이그레이션

```bash
# Prisma 클라이언트 생성
npx prisma generate

# 마이그레이션 실행
npx prisma migrate dev

# 또는 프로덕션
npx prisma migrate deploy
```

### 4.5 초기 데이터 시딩

#### 관리자 계정 생성

```bash
npm run seed:admin
```

기본 관리자 계정:
- **이메일**: admin@example.com
- **비밀번호**: admin123456

#### 법정동 코드 데이터 (선택사항)

1. [행정안전부](https://www.code.go.kr/stdcode/regCodeL.do)에서 법정동코드 전체자료 다운로드
2. `data/` 폴더에 ZIP 파일 저장
3. 시딩 실행:

```bash
npm run seed:legal-districts
```

#### 샘플 데이터 (선택사항)

```bash
# 수익률 타입 시딩
npm run seed:profit-types

# 매물 샘플 데이터
npm run seed:products
```

### 4.6 개발 서버 실행

```bash
npm run dev
```

서버가 실행되면 다음 주소에서 접근 가능합니다:
- **프론트엔드**: http://localhost:3000
- **관리자**: http://localhost:3000/admin

### 4.7 프로덕션 빌드

```bash
# 빌드
npm run build

# 서버 시작
npm start
```

---

## 5. 데이터베이스 구조

### 5.1 주요 테이블

#### 5.1.1 Member (회원)

```prisma
model Member {
  id          Int      @id @default(autoincrement())
  name        String
  email       String   @unique
  password    String
  phone       String?
  type        MemberType  // GENERAL, AGENT, ADMIN
  bizName     String?     // 사업자명
  bizNum      String?     // 사업자번호
  reNum       String?     // 중개등록번호
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### 5.1.2 Product (매물)

```prisma
model Product {
  id               BigInt   @id @default(autoincrement())
  memberId         Int
  categoryId       Int?        // 매물 종류
  title            String
  description      String?
  address          String
  addressDetail    String?
  legalDistrictId  Int?        // 법정동 코드
  lat              Float?
  lng              Float?
  area             Float?      // 면적 (㎡)
  areaPyeong       Float?      // 면적 (평)
  status           String      // 계약 상태
  viewCount        Int         @default(0)
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
  
  // 관계
  member           Member      @relation(fields: [memberId])
  category         Category?   @relation(fields: [categoryId])
  legalDistrict    LegalDistrict? @relation(fields: [legalDistrictId])
  prices           ProductPrice[]
  images           ProductImage[]
  fieldValues      ProductFieldValue[]
  profits          ProductProfit[]
  themes           ProductTheme[]
  labels           ProductLabel[]
}
```

#### 5.1.3 Category (매물 종류)

```prisma
model Category {
  id          Int       @id @default(autoincrement())
  name        String
  parentId    Int?      // 상위 카테고리
  depth       Int       @default(0)  // 0: 대분류, 1: 중분류, 2: 소분류
  order       Int       @default(0)
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  
  // 관계
  parent      Category?  @relation("CategoryHierarchy", fields: [parentId])
  children    Category[] @relation("CategoryHierarchy")
  products    Product[]
  fields      CategoryField[]
  profitTypes CategoryProfitType[]
}
```

#### 5.1.4 CategoryField (동적 필드)

```prisma
model CategoryField {
  id           Int      @id @default(autoincrement())
  categoryId   Int
  name         String      // 필드명
  label        String      // 표시명
  type         String      // TEXT, NUMBER, SELECT, CHECKBOX 등
  isRequired   Boolean  @default(false)
  isActive     Boolean  @default(true)
  order        Int      @default(0)
  options      Json?       // SELECT, RADIO 옵션
  placeholder  String?
  helpText     String?
  defaultValue String?
  validation   Json?       // 유효성 검사 규칙
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  category     Category @relation(fields: [categoryId])
  values       ProductFieldValue[]
}
```

#### 5.1.5 TransactionType (거래 종류)

```prisma
model TransactionType {
  id              Int      @id @default(autoincrement())
  name            String   @unique  // 매매, 전세, 월세, 분양
  hasSalePrice    Boolean  @default(false)
  hasJeonsePrice  Boolean  @default(false)
  hasMonthlyRent  Boolean  @default(false)
  hasDeposit      Boolean  @default(false)
  hasRightsMoney  Boolean  @default(false)
  order           Int      @default(0)
  isActive        Boolean  @default(true)
  isSystem        Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  prices          ProductPrice[]
}
```

#### 5.1.6 Contact (연락처)

```prisma
model Contact {
  id        Int      @id @default(autoincrement())
  name      String
  phone     String
  email     String?
  type      String   // SELLER, BUYER, MANAGER, OWNER, TENANT
  memo      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  deletedAt DateTime?
  
  productContacts ProductContact[]
  enquires        Enquire[]
  contractsSeller Contract[] @relation("ContractSeller")
  contractsBuyer  Contract[] @relation("ContractBuyer")
}
```

#### 5.1.7 Contract (계약)

```prisma
model Contract {
  id                Int       @id @default(autoincrement())
  contractNumber    String    @unique
  productId         BigInt?
  sellerId          Int?
  buyerId           Int?
  staffId           Int?
  contractDate      DateTime
  amount            Float
  depositAmount     Float?
  status            String    // DRAFT, PENDING, SIGNED, CANCELLED, ARCHIVED
  notes             String?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  
  product           Product?  @relation(fields: [productId])
  seller            Contact?  @relation("ContractSeller", fields: [sellerId])
  buyer             Contact?  @relation("ContractBuyer", fields: [buyerId])
  staff             Staff?    @relation(fields: [staffId])
  payments          ContractPayment[]
  documents         ContractDocument[]
  activities        ContractActivity[]
}
```

### 5.2 ER 다이어그램

```
Member (회원)
  ↓ 1:N
Product (매물) ← N:1 → Category (매물종류)
  ↓ 1:N                    ↓ 1:N
  ├─ ProductPrice         CategoryField (동적필드)
  ├─ ProductImage              ↓ 1:N
  ├─ ProductFieldValue ← N:1 ┘
  ├─ ProductProfit
  └─ ProductContact → Contact (연락처)
  
Contract (계약)
  ├─ seller → Contact
  ├─ buyer → Contact
  ├─ staff → Staff
  ├─ ContractPayment
  ├─ ContractDocument
  └─ ContractActivity
```

---

## 6. 주요 기능

### 6.1 매물 관리 시스템

#### 6.1.1 동적 필드 시스템

각 매물 카테고리(아파트, 빌라, 상가 등)마다 다른 입력 필드를 설정할 수 있습니다.

**지원 필드 타입**:
- `TEXT`: 단일 텍스트 입력
- `TEXTAREA`: 긴 텍스트 입력
- `NUMBER`: 숫자 입력
- `SELECT`: 드롭다운 선택
- `RADIO`: 라디오 버튼
- `CHECKBOX`: 체크박스
- `DATE`: 날짜 선택
- `BOOLEAN`: 예/아니오
- `FILE`: 파일 업로드
- `AREA`: 면적 입력 (㎡ ↔ 평 자동 변환)

**필드 프리셋**:
- 아파트: 세대수, 동/호수, 층수, 방향, 엘리베이터 등
- 빌라: 총 세대수, 주차 대수, 방수, 욕실수 등
- 원룸: 방 형태, 화장실 형태, 관리비, 옵션 등
- 상가: 업종, 권리금, 월 매출, 순이익 등
- 토지: 지목, 용도지역, 도로 접면, 형질 등
- 건물: 건폐율, 용적률, 지상/지하 층수 등

#### 6.1.2 다중 거래 유형

하나의 매물에 여러 거래 유형을 동시에 설정할 수 있습니다.

```
매물 A
  ├─ 매매: 5억원
  ├─ 전세: 3억원
  └─ 월세: 보증금 1억 / 월세 200만원
```

#### 6.1.3 수익률 계산

카테고리별로 필요한 수익률 타입을 설정할 수 있습니다.

**기본 수익률 타입**:
- 임대수익률: (연간 임대료 / 매매가) × 100
- 순수익률: (연간 순수익 / 매매가) × 100
- 표면수익률: (월세 × 12 / 매매가) × 100
- 분양수익률: ((현재 시세 - 분양가) / 분양가) × 100

#### 6.1.4 이미지 관리

- 다중 이미지 업로드
- 드래그 앤 드롭으로 순서 변경
- 대표 이미지 설정
- AWS S3 저장

#### 6.1.5 테마 및 라벨

- **테마**: 매물 그룹핑 (예: 급매물, 추천매물)
- **라벨**: 매물 태그 (예: 역세권, 신축, 리모델링)

### 6.2 연락처 관리

통합 연락처 시스템으로 매물, 문의, 계약에서 재사용 가능합니다.

**연락처 타입**:
- `SELLER`: 매도인
- `BUYER`: 매수인
- `MANAGER`: 관리인
- `OWNER`: 소유주
- `TENANT`: 세입자

**특징**:
- 실시간 검색 (이름/전화번호)
- 자동 타입 판별
- 중복 방지
- 소프트 삭제

### 6.3 계약 관리

전문적인 부동산 계약 추적 시스템입니다.

**계약 상태**:
1. `DRAFT`: 작성 중
2. `PENDING`: 서명 대기
3. `SIGNED`: 서명 완료
4. `CANCELLED`: 해지
5. `ARCHIVED`: 보관

**포함 기능**:
- 결제 일정 관리
- 계약 문서 업로드
- 활동 로그 (자동 기록)
- 담당자 배정

### 6.4 권한 관리

역할 기반 접근 제어(RBAC) 시스템입니다.

**기본 역할**:
- **슈퍼관리자**: 모든 권한 (삭제 불가)
- **관리자**: 전체 관리 권한
- **직원**: 제한된 권한

**기능**:
- 커스텀 역할 생성
- 역할별 권한 설정
- 직원 초대
- 권한별 공지사항

---

## 7. 프론트엔드

### 7.1 페이지 구조

```
/                        # 메인 페이지
/products               # 매물 지도 + 목록
/properties             # 매물 목록 (페이징)
/products/[id]          # 매물 상세
/about                  # 회사 소개
/faq                    # FAQ
/terms                  # 이용약관
/privacy                # 개인정보처리방침
/enquire                # 문의하기
/login                  # 로그인
```

### 7.2 매물 지도 페이지 (/products)

**특징**:
- 카카오맵 통합
- 좌측: 지도 (마커 표시)
- 우측: 매물 목록 (스크롤)
- 실시간 필터링
- 마커 클릭 시 상세 정보 팝업

**필터 옵션**:
- 키워드 검색
- 매물 종류 (카테고리)
- 거래 종류 (매매/전세/월세/분양)
- 가격 범위
- 면적 범위

### 7.3 매물 목록 페이지 (/properties)

**특징**:
- 그리드/리스트 뷰 전환
- 12개씩 페이징
- 페이지 번호 네비게이션
- 정렬 옵션 (최신순, 가격순, 조회순)

**매물 카드**:
- 썸네일 이미지
- 제목
- 주소
- 가격 (거래 유형별)
- 태그/라벨
- 조회수

### 7.4 매물 상세 페이지 (/products/[id])

**섹션**:
1. 이미지 갤러리 (슬라이더)
2. 기본 정보 (제목, 가격, 주소, 면적)
3. 상세 설명
4. 동적 필드 (카테고리별)
5. 수익률 정보
6. 위치 지도
7. 문의하기 버튼

### 7.5 UI/UX

**디자인 시스템**:
- shadcn/ui: 기본 컴포넌트
- Aceternity UI: 고급 효과
- Framer Motion: 부드러운 애니메이션

**반응형 디자인**:
- 모바일: 단일 컬럼, 터치 최적화
- 태블릿: 2컬럼 그리드
- 데스크톱: 3컬럼 그리드

---

## 8. 관리자 시스템

### 8.1 관리자 UI

관리자 패널은 **Keen 템플릿** 기반으로 프론트엔드와 다른 디자인을 사용합니다.

### 8.2 대시보드 (/admin)

**주요 지표**:
- 총 매물 수
- 신규 문의 수
- 진행 중 계약 수
- 월간 조회수

**차트**:
- 매물 등록 추이
- 거래 유형별 분포
- 인기 지역 Top 10

### 8.3 매물 관리 (/admin/products)

#### 8.3.1 매물 목록

**기능**:
- 검색/필터링
- 일괄 작업 (상태 변경, 삭제)
- 정렬 (최신순, 조회순, 가격순)
- 엑셀 다운로드/업로드

#### 8.3.2 매물 등록 (/admin/products/new)

**입력 폼**:
1. **기본 정보**
   - 매물 종류 선택 (카테고리)
   - 제목
   - 주소 (법정동 검색)
   - 상세 주소
   - 면적 (㎡/평 자동 변환)

2. **거래 정보**
   - 거래 유형별 가격 입력
   - 계약 상태

3. **동적 필드**
   - 선택한 카테고리에 따라 자동 표시
   - 필수/선택 필드 구분
   - 실시간 유효성 검사

4. **수익률**
   - 카테고리에 설정된 수익률만 표시
   - 선택적 입력

5. **이미지**
   - 다중 업로드
   - 드래그 앤 드롭 순서 변경
   - 대표 이미지 설정

6. **추가 옵션**
   - 테마 선택
   - 라벨 선택
   - 연락처 (매도인/관리인)

### 8.4 매물 종류 관리 (/admin/categories)

#### 8.4.1 카테고리 목록

**계층 구조**:
```
상업용 (대분류)
  ├─ 상가 (중분류)
  │   ├─ 일반 상가 (소분류)
  │   └─ 대형 상가 (소분류)
  └─ 사무실 (중분류)

주거용 (대분류)
  ├─ 아파트 (중분류)
  ├─ 빌라 (중분류)
  └─ 원룸 (중분류)
```

**기능**:
- 3단계 계층 구조
- 드래그 앤 드롭 순서 변경
- 활성화/비활성화
- 필드 관리 바로가기
- 수익률 설정 바로가기

#### 8.4.2 필드 관리 (/admin/categories/[id])

**필드 프리셋 적용**:
1. 프리셋 선택 (아파트, 빌라, 원룸 등)
2. 기존 필드 유지 여부 선택
3. 자동으로 필드 생성

**필드 편집**:
- 화살표로 순서 조정
- 모달 창으로 상세 설정
- 실시간 미리보기

**필드 설정 옵션**:
- 필드명, 표시명
- 필드 타입
- 필수 여부
- 옵션 (SELECT, RADIO)
- 플레이스홀더
- 도움말
- 기본값
- 유효성 검사

#### 8.4.3 수익률 설정 (/admin/categories/[id]/profit-types)

카테고리별로 필요한 수익률 타입만 선택합니다.

**예시**:
- 아파트: 임대수익률, 순수익률
- 상가: 임대수익률, 순수익률, 총수익률
- 분양권: 분양수익률

### 8.5 거래 종류 관리 (/admin/transaction-types)

**거래 종류 추가**:
1. 이름 입력 (예: 단기임대)
2. 가격 필드 선택
   - 매매가
   - 전세가
   - 보증금
   - 월세
   - 권리금
3. 순서 변경 (드래그 앤 드롭)

**빠른 템플릿**:
- 매매: 매매가만
- 전세: 전세가만
- 월세: 보증금 + 월세
- 분양: 분양가 + 프리미엄

### 8.6 수익률 타입 관리 (/admin/profit-types)

**수익률 타입 추가**:
1. 타입명 입력
2. 계산식 필드 선택 (JSON)
   ```json
   ["monthlyRent", "salePrice", "managementFee"]
   ```
3. 표시 형식 (%, 원, 원/년)
4. 도움말 작성

**프리셋 템플릿**:
- 일반 부동산: 임대, 순수익, 표면, 총수익률
- 분양/매매 전용
- 상업용 부동산
- 토지 투자

### 8.7 연락처 관리 (/admin/contacts)

**목록 화면**:
- 타입별 필터 (전체, 매도인, 매수인 등)
- 이름/전화번호 검색
- 페이지네이션

**연락처 추가**:
1. 이름
2. 전화번호
3. 이메일 (선택)
4. 타입 선택 (라디오 버튼)
5. 메모

### 8.8 문의 관리 (/admin/enquires)

**문의 목록**:
- 상태별 필터 (신규, 처리중, 완료)
- 구분별 필터 (매수, 매도)
- 날짜 범위 검색

**문의 상세**:
- 문의 정보
- 연락처 정보
- 매물 정보 (연결된 경우)
- 처리 이력
- 계약 생성 버튼

### 8.9 계약 관리 (/admin/contracts)

**계약 목록**:
- 상태별 필터
- 계약 번호/매물 검색
- 담당자별 필터

**계약 생성 (/admin/contracts/new)**:
1. **기본 정보**
   - 계약 번호 (자동 생성)
   - 매물 선택
   - 계약일
   - 계약 금액

2. **당사자**
   - 매도인 선택 (ContactSelector)
   - 매수인 선택 (ContactSelector)
   - 담당자 배정

3. **결제 일정**
   - 계약금: 금액 + 날짜
   - 중도금: 금액 + 날짜 (다중)
   - 잔금: 금액 + 날짜

4. **문서 업로드**
   - 계약서
   - 첨부 파일

5. **메모**
   - 특이사항 기재

**계약 상세**:
- 계약 정보 요약
- 결제 진행 상황
- 업로드된 문서
- 활동 로그 (타임라인)
- 상태 변경 이력

### 8.10 직원 관리 (/admin/staff)

**직원 목록**:
- 권한별 필터
- 슈퍼관리자 표시 (⭐ 배지)
- 수정/삭제 (슈퍼관리자는 불가)

**직원 초대**:
1. 이름
2. 이메일
3. 권한 선택
4. 초대 메일 발송

### 8.11 권한 관리 (/admin/roles)

**권한 목록**:
- 시스템 권한 (삭제 불가)
- 사용자 권한 (삭제 가능)
- 직원 수 표시

**권한 추가**:
1. 권한명
2. 설명
3. 권한 항목 선택 (체크박스)

### 8.12 블로그 관리 (/admin/blog)

**블로그 카테고리**:
- 블로그형: 텍스트 위주
- 갤러리형: 이미지 위주

**블로그 작성**:
- 제목, 내용
- 카테고리 선택
- 썸네일 업로드
- 태그
- 공개/비공개

### 8.13 FAQ 관리 (/admin/faq)

**FAQ 목록**:
- 순서 변경 (드래그 앤 드롭)
- 카테고리별 그룹핑

**FAQ 작성**:
- 질문
- 답변
- 카테고리

### 8.14 설정 (/admin/settings)

**사이트 설정**:
- 사이트명
- 로고
- 파비콘
- 연락처 정보
- SNS 링크

**지도 설정**:
- 카카오맵 API 키
- 기본 중심 좌표
- 기본 줌 레벨

**이메일 설정**:
- SMTP 서버
- 발신자 정보

**SEO 설정**:
- 메타 제목
- 메타 설명
- 오픈그래프 이미지

---

## 9. API 엔드포인트

### 9.1 인증 API

```
POST   /api/auth/register          # 회원가입
POST   /api/auth/login             # 로그인
POST   /api/auth/logout            # 로그아웃
GET    /api/auth/session           # 세션 확인
POST   /api/auth/forgot-password   # 비밀번호 찾기
```

### 9.2 매물 API (Public)

```
GET    /api/products               # 매물 목록
GET    /api/products/[id]          # 매물 상세
GET    /api/products/search        # 매물 검색
POST   /api/products/[id]/view     # 조회수 증가
```

### 9.3 매물 API (Admin)

```
GET    /api/admin/products         # 매물 목록 (관리자)
POST   /api/admin/products         # 매물 등록
GET    /api/admin/products/[id]    # 매물 상세 (관리자)
PATCH  /api/admin/products/[id]    # 매물 수정
DELETE /api/admin/products/[id]    # 매물 삭제
POST   /api/admin/products/import  # 엑셀 업로드
GET    /api/admin/products/export  # 엑셀 다운로드
```

### 9.4 카테고리 API

```
GET    /api/admin/categories           # 카테고리 목록
POST   /api/admin/categories           # 카테고리 추가
GET    /api/admin/categories/[id]      # 카테고리 상세
PATCH  /api/admin/categories/[id]      # 카테고리 수정
DELETE /api/admin/categories/[id]      # 카테고리 삭제
GET    /api/admin/categories/[id]/fields  # 필드 목록
POST   /api/admin/categories/[id]/fields  # 필드 추가
```

### 9.5 연락처 API

```
GET    /api/admin/contacts         # 연락처 목록
POST   /api/admin/contacts         # 연락처 추가
GET    /api/admin/contacts/search  # 연락처 검색
PATCH  /api/admin/contacts/[id]    # 연락처 수정
DELETE /api/admin/contacts/[id]    # 연락처 삭제
```

### 9.6 계약 API

```
GET    /api/admin/contracts        # 계약 목록
POST   /api/admin/contracts        # 계약 생성
GET    /api/admin/contracts/[id]   # 계약 상세
PATCH  /api/admin/contracts/[id]   # 계약 수정
DELETE /api/admin/contracts/[id]   # 계약 삭제
POST   /api/admin/contracts/[id]/documents    # 문서 업로드
POST   /api/admin/contracts/[id]/payments     # 결제 기록
```

### 9.7 파일 업로드 API

```
POST   /api/upload/image           # 이미지 업로드
POST   /api/upload/document        # 문서 업로드
DELETE /api/upload/[id]            # 파일 삭제
```

---

## 10. 배포 가이드

### 10.1 Vercel 배포

#### 사전 준비
- Vercel 계정
- GitHub 저장소 연결
- PostgreSQL 데이터베이스 (Supabase, Neon 등)

#### 배포 단계

1. **Vercel 프로젝트 생성**
   - GitHub 저장소 연결
   - 프레임워크: Next.js 선택

2. **환경 변수 설정**
   - Vercel 대시보드에서 모든 환경 변수 입력
   - Production, Preview, Development 환경 구분

3. **빌드 설정**
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

4. **배포**
   - `git push`만으로 자동 배포
   - 브랜치별 Preview 배포 지원

### 10.2 AWS EC2 배포

#### 서버 설정

```bash
# Node.js 설치
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL 설치
sudo apt-get install -y postgresql postgresql-contrib

# PM2 설치 (프로세스 관리자)
sudo npm install -g pm2

# 프로젝트 클론
git clone https://github.com/realsoftnext/realestate_template.git
cd realestate_template

# 의존성 설치
npm install

# 환경 변수 설정
nano .env

# 빌드
npm run build

# PM2로 실행
pm2 start npm --name "realestate" -- start
pm2 save
pm2 startup
```

#### Nginx 설정

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 10.3 Docker 배포

#### Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
    depends_on:
      - db

  db:
    image: postgres:14
    environment:
      - POSTGRES_DB=realestate
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### 실행

```bash
docker-compose up -d
```

---

## 11. 트러블슈팅

### 11.1 일반적인 문제

#### Prisma 클라이언트 에러

```
Error: @prisma/client did not initialize yet
```

**해결 방법**:
```bash
npx prisma generate
npm run build
```

#### 환경 변수 인식 안됨

**원인**: `.env` 파일이 `.gitignore`에 포함되어 있음

**해결 방법**:
- `.env.example`을 복사하여 `.env` 생성
- 모든 필수 환경 변수 입력

#### 포트 충돌

```
Error: Port 3000 is already in use
```

**해결 방법**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### 11.2 데이터베이스 문제

#### 마이그레이션 충돌

**해결 방법**:
```bash
# 마이그레이션 리셋 (개발 환경만)
npx prisma migrate reset

# 새로운 마이그레이션 생성
npx prisma migrate dev --name fix_conflict
```

#### 연결 실패

**확인 사항**:
1. PostgreSQL 서버 실행 여부
2. `DATABASE_URL` 형식 확인
3. 방화벽/보안 그룹 설정

### 11.3 성능 문제

#### 매물 목록 로딩 느림

**최적화 방법**:
1. 데이터베이스 인덱스 추가
2. 페이지네이션 적용
3. 이미지 최적화 (next/image 사용)
4. Redis 캐싱 적용

#### 이미지 업로드 느림

**해결 방법**:
1. 이미지 리사이즈 (Sharp 라이브러리)
2. CDN 사용 (CloudFront)
3. 압축 적용

### 11.4 보안 문제

#### CORS 에러

**해결 방법** (`next.config.ts`):
```typescript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ]
}
```

#### 인증 문제

**확인 사항**:
1. `NEXTAUTH_SECRET` 설정 확인
2. 세션 쿠키 만료 시간
3. HTTPS 사용 (프로덕션)

---

## 12. 유지보수

### 12.1 정기 작업

**주간**:
- 데이터베이스 백업
- 로그 파일 정리
- 에러 모니터링

**월간**:
- 의존성 업데이트 (`npm outdated`)
- 보안 취약점 검사 (`npm audit`)
- 성능 분석

### 12.2 백업

#### 데이터베이스 백업

```bash
# PostgreSQL 백업
pg_dump -U postgres realestate > backup_$(date +%Y%m%d).sql

# 복원
psql -U postgres realestate < backup_20250112.sql
```

#### 파일 백업

S3 버킷의 파일들을 정기적으로 다운로드하거나 버전 관리 활성화

### 12.3 모니터링

**추천 도구**:
- **Sentry**: 에러 추적
- **Google Analytics**: 사용자 분석
- **Vercel Analytics**: 성능 모니터링
- **Uptime Robot**: 서버 상태 확인

---

## 13. 추가 자료

### 13.1 참고 문서

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Prisma 공식 문서](https://www.prisma.io/docs)
- [shadcn/ui 컴포넌트](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### 13.2 커뮤니티

- GitHub Issues: 버그 리포트 및 기능 요청
- Discord: 실시간 지원 (추후 개설)

### 13.3 라이센스

이 프로젝트는 MIT 라이센스로 배포됩니다.

---

## 14. FAQ

**Q: 기존 Codeigniter2 데이터를 마이그레이션할 수 있나요?**  
A: 네, 마이그레이션 스크립트를 제공할 예정입니다. 데이터베이스 스키마를 맞추고 `scripts/migrate-legacy.ts`를 실행하세요.

**Q: 카카오맵 대신 구글맵을 사용할 수 있나요?**  
A: 네, `src/components/Map.tsx`를 수정하여 구글맵 API를 통합할 수 있습니다.

**Q: 다국어 지원이 가능한가요?**  
A: 현재는 한국어만 지원하지만, `next-intl` 라이브러리를 추가하여 다국어를 구현할 수 있습니다.

**Q: 모바일 앱도 개발할 수 있나요?**  
A: React Native를 사용하여 동일한 API를 공유하는 모바일 앱을 개발할 수 있습니다.

**Q: 상용 라이센스가 필요한가요?**  
A: 이 템플릿은 MIT 라이센스로, 상업적 사용이 자유롭습니다. 단, 사용된 라이브러리들의 라이센스를 각각 확인하세요.

---

## 15. 변경 이력

### Version 0.1.0 (2025-11-12)
- 초기 릴리스
- 기본 매물 관리 기능
- 동적 필드 시스템
- 연락처 및 계약 관리
- 관리자 패널

---

**문의**: support@realsoftnext.com  
**웹사이트**: https://realsoftnext.com  
**GitHub**: https://github.com/realsoftnext/realestate_template

