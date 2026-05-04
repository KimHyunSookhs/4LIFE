# About 페이지 회사 적용 가이드

작성일: 2026-05-01  
목적: 오늘 작업한 `about` 대표님 소개 페이지 결과물을 회사 프로젝트에 최대한 동일하게 재현하기 위한 작업 정리 문서

## 1. 최종 결과물 개요

오늘 만든 `about` 페이지는 "면역력 증진 관련 상품을 판매하는 웹사이트"의 대표님 소개 페이지입니다. 주 타겟은 건강 관련 제품에 관심이 많은 중장년 및 노년층이므로, 전체 톤은 과하게 화려하기보다 신뢰감 있는 블루 계열, 넓은 여백, 큰 글자, 부드러운 애니메이션을 기준으로 구성했습니다.

최종 페이지 섹션 순서는 아래와 같습니다.

1. `HeroSection` - 대표님 풀 뷰포트 소개, 대표 이미지 카드, 통계 카드, 스크롤 유도 화살표
2. `BeginningStorySection` - 건강 비즈니스 시작과 4Life를 만난 계기
3. `TurningPointSection` - 4Life의 공신력, 글로벌 네트워크, 기술, 연구 데이터 카드
4. `TimelineSection` - 대표님의 성장 타임라인
5. `ExpertiseSection` - 면역 상담, 다이어트, 교육, 아로마 전문성 카드
6. `LeadershipSection` - 리더십 철학 카드
7. `LifestyleVisionSection` - 부부 비즈니스, 시간/경제적 자유, 나눔 비전
8. `QuoteSection` - 핵심 메시지 인용구
9. `CtaSection` - 상담/비즈니스 문의 CTA

## 2. 회사 프로젝트에 필요한 의존성

회사 프로젝트가 Next.js + Tailwind 기반이라는 전제에서 아래 패키지가 필요합니다.

```bash
npm install framer-motion gsap lucide-react
```

현재 작업 프로젝트 기준 주요 버전은 아래와 같습니다.

```json
{
  "framer-motion": "^12.38.0",
  "gsap": "^3.15.0",
  "lucide-react": "^1.11.0",
  "next": "16.2.4",
  "react": "19.2.4",
  "react-dom": "19.2.4"
}
```

회사 프로젝트 버전이 조금 달라도 대부분 동작하지만, Next.js 16 환경이면 `node_modules/next/dist/docs/`의 현재 버전 문서를 기준으로 확인 후 적용하세요.

## 3. 필수 전역 스타일 토큰

오늘 결과물은 Tailwind v4의 `@theme inline` 토큰을 사용합니다. 회사 프로젝트의 `src/app/globals.css` 또는 전역 CSS에 아래 색상 토큰이 있어야 현재 디자인이 거의 동일하게 나옵니다.

```css
@import "tailwindcss";

:root {
  --primary: #5b74b8;
  --secondary: #eef3ff;
  --secondary-bright: #99c2ff;
  --deep-blue: #2f3e6b;
  --background: #f5f8ff;
  --foreground: #3d4a6a;
  --muted-foreground: #5a6789;
  --card: #ffffff;
  --border: #dde5f5;
  color-scheme: light;
}

@theme inline {
  --color-primary: var(--primary);
  --color-secondary: var(--secondary);
  --color-secondary-bright: var(--secondary-bright);
  --color-deep-blue: var(--deep-blue);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-border: var(--border);
}

body {
  background: var(--background);
  color: var(--foreground);
  word-break: keep-all;
  overflow-wrap: break-word;
}
```

중장년/노년층 대상이라 한글 줄바꿈이 어색하지 않도록 `word-break: keep-all`을 유지하는 것이 중요합니다.

## 4. 에셋 준비

대표님 이미지 파일은 현재 아래 경로를 사용합니다.

```text
public/images/ceo/ceo1.jpeg
```

회사 프로젝트에서도 동일한 경로에 이미지를 넣으면 코드 수정 없이 바로 동작합니다.

이미지 카드의 `next/image` 설정은 아래 기준입니다.

- `fill` 사용
- 부모 컨테이너는 `relative aspect-4/5 w-full`
- 이미지 클래스는 `object-cover object-[center_22%] sm:object-center`
- `priority` 적용

## 5. 생성해야 하는 파일 구조

회사 프로젝트에서 `about` 페이지가 아직 없다면 아래 구조로 파일을 생성하세요.

```text
src/
├─ app/
│  └─ about/
│     ├─ page.tsx
│     └─ components/
│        ├─  AboutCeoScrollProgress.tsx
│        ├─ HeroSection.tsx
│        ├─ BeginningStorySection.tsx
│        ├─ TurningPointSection.tsx
│        ├─ TimelineSection.tsx
│        ├─ ExpertiseSection.tsx
│        ├─ LeadershipSection.tsx
│        ├─ LifestyleVisionSection.tsx
│        ├─ QuoteSection.tsx 
│        ├─ CtaSection.tsx 
│        ├─ ensureScrollTrigger.ts
│        └─ _shared/
│           ├─ SectionEyebrow.tsx
│           ├─ Reveal.tsx
│           ├─ KeywordHighlight.tsx
│           └─ fade-up.ts
└─ components/
   ├─ animations/
   │  └─ MetricCounter.tsx
   └─ common/
      └─ Button.tsx
```

`Button.tsx`와 `MetricCounter.tsx`가 회사 프로젝트에 이미 있다면 기존 공통 컴포넌트에 맞춰 import만 바꿔도 됩니다.

## 6. 라우트 페이지 구성

`src/app/about/page.tsx`는 서버 컴포넌트로 두고, 각 섹션만 클라이언트 컴포넌트로 분리했습니다.

적용 포인트:

- `metadata.title`: `대표님 소개`
- `metadata.description`: `12년 면역 전문 경험을 바탕으로 건강과 비즈니스를 연결하는 대표님 소개 페이지입니다.`
- 상단에 `AboutCeoScrollProgress`를 배치
- `<main>` 안에 섹션을 순서대로 렌더링

섹션 순서는 반드시 오늘 최종 순서와 동일하게 맞추세요.

```tsx
<AboutCeoScrollProgress />
<main className="relative min-h-screen bg-background">
  <HeroSection />
  <BeginningStorySection />
  <TurningPointSection />
  <TimelineSection />
  <ExpertiseSection />
  <LeadershipSection />
  <LifestyleVisionSection />
  <QuoteSection />
  <CtaSection />
</main>
```

## 7. 공통 컴포넌트/유틸 구현 요약

### SectionEyebrow

모든 섹션 상단의 작은 영문 라벨입니다.

- 클래스: `text-sm font-semibold tracking-[0.28em] text-primary uppercase`
- 예시 라벨: `About CEO`, `Beginning`, `Turning Point`, `Expertise`

### Reveal

스크롤 진입 시 부드럽게 나타나는 공통 Framer Motion 래퍼입니다.

- `direction`: `up | left | right`
- 기본 이동값: 위 방향 `y: 28`, 좌우 방향 `x: -36 / 36`
- `viewport`: `{ once: true, amount: 0.24 }`
- `prefers-reduced-motion` 대응

### fade-up

히어로 텍스트 stagger에 사용하는 Framer Motion variants입니다.

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
} as const;
```

### ensureScrollTrigger

GSAP ScrollTrigger 중복 등록을 막는 헬퍼입니다.

- `typeof window === "undefined"`면 실행하지 않음
- 한 번만 `gsap.registerPlugin(ScrollTrigger)` 실행

### AboutCeoScrollProgress

페이지 최상단에 고정되는 1px 진행 바입니다.

- `useScroll`의 `scrollYProgress`를 `scaleX`로 연결
- 클래스: `fixed left-0 top-0 z-50 h-1 w-full origin-left bg-linear-to-r from-primary via-secondary-bright to-deep-blue`

## 8. HeroSection 최종 적용 사항

오늘 가장 마지막으로 확정된 히어로 상태입니다.

### 레이아웃

- 전체 섹션: `min-h-screen w-full`
- 데스크톱: `lg:h-screen lg:min-h-0 lg:items-center`
- 배경: `bg-linear-to-br from-background via-secondary/70 to-card`
- 내부 컨텐츠: `max-w-6xl` 그리드
- 데스크톱 그리드: `lg:grid-cols-[minmax(0,1.03fr)_minmax(320px,0.97fr)]`
- 모바일: 텍스트와 이미지가 세로 배치

최종 섹션 클래스:

```tsx
className="relative isolate flex min-h-screen w-full overflow-hidden bg-linear-to-br from-background via-secondary/70 to-card px-5 py-[clamp(1rem,2svh,2rem)] pb-[clamp(5.5rem,12svh,7rem)] sm:px-8 lg:h-screen lg:min-h-0 lg:items-center lg:py-[clamp(1rem,3svh,2rem)] lg:pb-[clamp(5.25rem,9svh,6.5rem)]"
```

### 텍스트

히어로 문구는 아래 그대로 사용했습니다.

- Eyebrow: `About CEO`
- H1: `면역을 통해 삶의 방향을 바꾸는 리더`
- Lead: `12년 면역 전문 경험, 건강과 비즈니스를 연결하다`
- Body: `건강 상담은 제품을 설명하는 일이 아니라, 한 사람의 일상과 선택의 방향을 함께 다시 세우는 일입니다. 박연복 대표는 면역을 중심으로 건강, 성장, 비즈니스의 가능성을 연결해 왔습니다.`

H1 클래스:

```tsx
className="mx-auto mt-5 max-w-2xl text-[clamp(2.6rem,8vw,4rem)] leading-[1.08] font-semibold tracking-tight text-deep-blue lg:mx-0"
```

### 대표님 이미지 카드

이미지 카드는 우측에 배치하고, 하단에 어두운 그라디언트를 깔아 텍스트를 올렸습니다.

- 외부 glow: `absolute -inset-5 rounded-[2.75rem] bg-linear-to-br from-primary/18 via-secondary-bright/18 to-card blur-2xl`
- 카드: `rounded-[2.35rem] border border-white/90 bg-card shadow-[0_28px_70px_rgba(17,35,75,0.18)] ring-1 ring-deep-blue/5`
- 이미지 비율: `aspect-4/5`
- 이미지 오브젝트 위치: `object-[center_22%]`

카드 안 텍스트:

- `CEO Story`
- `박연복 대표`
- `면역과 비즈니스의 방향을 함께 설계하는 건강 리더`

### 통계 카드

중요: 최종 상태에서는 `12년`, `27년` 칩을 이미지 카드 우측 하단에 붙이지 않았습니다. 사용자 요청에 따라 기존 방식으로 되돌려서 텍스트 영역 아래 3개 통계 카드로 배치했습니다.

통계 카드 데이터:

1. `12년` / `면역 경험`
2. `27년` / `연구 기반`
3. `4+` / `전문 영역`

컨테이너 클래스:

```tsx
className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3 lg:mx-0 lg:mt-10"
```

각 카드 클래스:

```tsx
className="rounded-3xl border border-primary/12 bg-white/75 p-4 shadow-lg shadow-primary/8 backdrop-blur"
```

### 하단 스크롤 화살표

처음 화면 진입 시 화살표가 보이도록 최종적으로 `fixed` 기준으로 처리했습니다. 히어로가 화면에 보일 때만 표시하고, 다음 섹션으로 넘어가면 사라집니다.

핵심 구현:

- 아이콘: `lucide-react`의 `ChevronDown`
- 위치: `fixed bottom-5 left-1/2`, `sm:bottom-8`
- `z-30`
- GSAP 애니메이션: `y: 10`, `duration: 0.9`, `repeat: -1`, `yoyo: true`, `ease: "sine.inOut"`
- Tailwind의 transform과 GSAP transform 충돌을 피하기 위해 `gsap.set(indicator, { xPercent: -50 })` 사용
- 클릭 시 `sectionRef.current?.nextElementSibling.scrollIntoView({ behavior: "smooth", block: "start" })`
- `IntersectionObserver`로 히어로 표시 여부에 따라 opacity/pointer-events 전환

버튼 클래스:

```tsx
className={`fixed bottom-5 left-1/2 z-30 flex size-12 items-center justify-center rounded-full border border-primary/15 bg-white/92 text-primary shadow-[0_14px_34px_rgba(17,35,75,0.18)] backdrop-blur transition-[background-color,opacity] duration-300 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:bottom-8 sm:size-14 ${
  showIndicator ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
}`}
```

## 9. BeginningStorySection 구현 요약

목적: 대표님이 건강 비즈니스를 시작하고 4Life를 만나게 된 흐름을 설명하는 섹션입니다.

### 데이터

```ts
const STORY_CARDS = [
  {
    number: "01",
    title: "건강 비즈니스의 시작",
    desc: "사람과 건강을 연결하는 첫 걸음을 시작했습니다.",
  },
  {
    number: "02",
    title: "4Life와의 만남",
    desc: "가족의 건강 회복 경험이 새로운 전환점이 되었습니다.",
  },
  {
    number: "03",
    title: "건강을 전하는 현재",
    desc: "부부 파트너로 더 많은 사람들의 삶을 돕고 있습니다.",
  },
] as const;
```

### 애니메이션

데스크톱 `lg` 이상:

- `ScrollTrigger` pin 적용
- `start: "top top"`
- `end: "+=265%"`
- `pin: true`
- `scrub: 0.92`
- 왼쪽 본문이 먼저 나타나고, 오른쪽 카드 3개가 순서대로 올라옴
- 타임라인 세로 라인은 `scaleY: 0 -> 1`

모바일/태블릿:

- pin 없이 단순 reveal
- `start: "top 78%"`
- `once: true`

## 10. TurningPointSection 구현 요약

목적: 4Life를 만난 후 신뢰 포인트를 카드 스택 애니메이션으로 보여주는 핵심 섹션입니다.

### 데이터

```ts
const turningPointData = [
  {
    number: "01",
    badge: "공신력",
    title: "PDR 등재 전문성",
    desc: "미국 의사 처방 참고전(PDR)에 매년 등재되어 의료계에서도 인정받는 과학적 면역 솔루션을 제공합니다.",
    icon: "Stethoscope",
  },
  {
    number: "02",
    badge: "글로벌",
    title: "25개국 지사 네트워크",
    desc: "전 세계 25개국 이상의 지사를 보유한 글로벌 기업의 검증된 시스템으로 차원이 다른 건강 관리를 경험하세요.",
    icon: "Globe",
  },
  {
    number: "03",
    badge: "핵심기술",
    title: "트랜스퍼 팩터",
    desc: "4Life만의 독보적 특허 기술인 면역 전달 인자를 통해 우리 몸의 자생력을 높이는 본질적인 케어를 진행합니다.",
    icon: "Microscope",
  },
  {
    number: "04",
    badge: "역사",
    title: "27년 연구 데이터",
    desc: "1998년부터 축적된 27년의 심도 있는 연구 데이터를 기반으로 가장 안정적이고 효과적인 솔루션을 제안합니다.",
    icon: "History",
  },
] as const;
```

### 디자인

- 섹션 배경: `#071229`
- 카드 배경: `#17264a`
- 카드 radius: `rounded-[2rem]`
- 카드 내부에 radial-gradient와 grid texture overlay 사용
- 큰 배경 숫자: `text-white/[0.06]`
- `PDR`, `25개국`은 `secondary-bright` 색상으로 강조

### 애니메이션

데스크톱:

- `ScrollTrigger` pin
- `end: "+=300%"`
- 카드 초기값: `yPercent: 115`
- 다음 카드가 올라오면 이전 카드는 `scale: 0.95`, `opacity: 0.5`, `y: -20`

모바일:

- 카드들이 일반 grid로 쌓임
- `gsap.from(cards, { y: 42, opacity: 0, stagger: 0.1 })`

## 11. TimelineSection 구현 요약

목적: 대표님의 성장 이력을 세로 타임라인으로 보여줍니다.

데이터:

1. `다이아몬드 승급`
2. `프레지덴셜 승급`
3. `브론즈 → 브론즈 엘리트 → 실버`
4. `Great Escape 성과`

레이아웃:

- 모바일: 왼쪽 세로 라인 기준 카드 나열
- 데스크톱: 중앙 세로 라인을 기준으로 좌우 교차 배치
- 각 카드는 Framer Motion으로 `opacity`, `y`, `scale` 진입 애니메이션 적용

## 12. ExpertiseSection 구현 요약

목적: 대표님의 전문 영역을 4개 카드로 보여줍니다.

### 데이터

```ts
const expertiseData = [
  {
    badge: "자문위원",
    title: "면역 통합 케어",
    desc: "과학적 근거를 바탕으로 개인 맞춤형 면역 건강 상담을 제공합니다.",
    icon: "ShieldCheck",
  },
  {
    badge: "수석코치",
    title: "면역 다이어트",
    desc: "지속 가능한 체중 관리와 몸의 균형 회복을 돕는 프리미엄 코칭입니다.",
    icon: "Scale",
  },
  {
    badge: "전문강사",
    title: "건강 교육 강연",
    desc: "누구나 이해하기 쉬운 건강 교육과 라이프스타일 강연을 진행합니다.",
    icon: "Presentation",
  },
  {
    badge: "전문강사",
    title: "아로마 테라피",
    desc: "아로마 테라피를 통해 심신 안정과 일상 속 휴식을 제공합니다.",
    icon: "Flower2",
  },
] as const;
```

### 인터랙션

카드 hover 시 GSAP으로 카드 전체 스타일이 변경됩니다.

- 카드 배경: `#ffffff -> #6F86C7`
- 카드 y: `0 -> -10`
- 제목/설명: 흰색으로 변경
- badge: 흰색 배경 + 딥블루 텍스트
- icon: 반투명 흰색 배경 + 흰색 아이콘

스크롤 진입 시:

- 카드들이 `y: 64`, `opacity: 0`에서 stagger로 올라옴
- `ScrollTrigger start: "top 72%"`

## 13. LeadershipSection 구현 요약

목적: 대표님의 리더십 철학을 간결한 카드로 정리합니다.

데이터:

1. `Servant Leadership` - 앞에서 끌기보다 곁에서 세우는 리더십
2. `Teamwork` - 함께 오래 가는 구조
3. `Growth Mindset` - 경험을 다음 사람을 성장시키는 자산으로 전환
4. `Consistency` - 매일의 작은 실천

디자인:

- 배경: `bg-secondary/55`
- 카드: `bg-white/75`, `backdrop-blur`, `rounded-[1.75rem]`
- `Reveal`로 각 카드 순차 진입

## 14. LifestyleVisionSection 구현 요약

목적: 대표님이 추구하는 삶의 방향과 비전을 시각적으로 표현합니다.

### 데이터

```ts
const lifestyleItems = [
  "부부가 함께 만들어 가는 비즈니스",
  "시간의 자유를 회복하는 일상",
  "경제적 자유를 향한 현실적인 성장",
  "받은 것을 나누는 삶의 방향",
] as const;
```

### 데스크톱 애니메이션

- `lg` 이상에서 `ScrollTrigger` pin
- `end: "+=235%"`
- 왼쪽 visual slide의 gradient 배경이 순차 전환
- 오른쪽 list item opacity/scale이 현재 단계에 맞춰 강조됨

### 모바일

- pin 없이 정적 이미지형 gradient 박스 + 리스트 카드 표시
- 모바일에서는 복잡한 pin 애니메이션을 줄여 성능과 가독성을 우선

## 15. QuoteSection 구현 요약

목적: 페이지 후반부에 대표 메시지를 강하게 각인합니다.

문구:

```text
“건강은 선택이 아니라 방향입니다.”
오늘의 작은 선택이 내일의 컨디션과 삶의 가능성을 바꿉니다.
```

디자인:

- 배경: `bg-deep-blue`
- 텍스트: 흰색
- 제목 크기: `text-4xl sm:text-5xl lg:text-6xl`

## 16. CtaSection 구현 요약

목적: 상담 문의와 비즈니스 문의로 연결합니다.

버튼:

1. `상담 문의` -> `/contact`
2. `비즈니스 문의` -> `/contact`

배경:

- `bg-linear-to-br from-primary via-deep-blue to-primary`
- radial-gradient overlay 사용

`Button` 공통 컴포넌트가 없으면 최소한 `next/link` 기반 CTA 버튼을 만들고, `href`, `text`, `variant`, `className`을 받을 수 있게 구성하세요.

## 17. 반응형 기준

오늘 결과물의 핵심 반응형 기준은 아래와 같습니다.

- `lg` 이상: 일부 섹션에 GSAP ScrollTrigger pin 적용
- `1023px` 이하: pin 애니메이션 제거 또는 단순 reveal로 전환
- 히어로는 모바일에서 세로 배치
- 히어로 하단 화살표는 `fixed` 기준으로 표시하여 첫 화면에서 잘리지 않게 처리
- 섹션 공통 좌우 padding: `px-5 sm:px-8`
- 섹션 공통 상하 padding: `py-20 sm:py-28`

## 18. 접근성/성능 체크포인트

반드시 유지할 것:

- 모든 애니메이션 컴포넌트에서 `useReducedMotion` 고려
- 모든 섹션에 `aria-labelledby`와 제목 id 연결
- 대표 이미지에는 명확한 `alt`: `박연복 대표 사진`
- 스크롤 화살표 버튼에는 `aria-label="다음 섹션으로 이동"`
- `ScrollTrigger.refresh()`는 pin 섹션 구성 후 `requestAnimationFrame` 안에서 호출
- `gsap.matchMedia()` 사용 후 cleanup에서 `mm.revert()`
- `gsap.context()` 사용 시 cleanup에서 `ctx.revert()`

## 19. 회사 적용 순서

1. 회사 프로젝트에 `framer-motion`, `gsap`, `lucide-react` 설치
2. `globals.css`에 브랜드 색상 토큰 추가
3. `public/images/ceo/ceo1.jpeg` 경로에 대표님 이미지 추가
4. `MetricCounter.tsx`, `Button.tsx` 공통 컴포넌트 준비
5. `src/app/about/components/_shared` 공통 파일 생성
6. `ensureScrollTrigger.ts` 생성
7. `AboutCeoScrollProgress.tsx` 생성
8. 각 섹션 파일 생성
9. `src/app/about/page.tsx`에서 섹션 순서대로 조립
10. `npm run lint`
11. `npm run build`
12. 데스크톱과 모바일에서 히어로 높이, 하단 화살표, pin 섹션 스크롤을 직접 확인

## 20. 오늘 수정 중 확정된 주의사항

- 대표님 이미지 우측 하단에 `12년`, `27년` 칩을 붙이는 방식은 최종안에서 제외했습니다.
- 최종안은 텍스트 아래의 3개 통계 카드 방식입니다.
- 히어로 화살표는 `absolute`로 두면 화면 높이/transform 조건에 따라 첫 화면에서 안 보일 수 있어 `fixed`로 변경했습니다.
- GSAP이 Tailwind의 `-translate-x-1/2` transform을 덮어쓸 수 있으므로, 화살표 중앙 정렬은 `gsap.set(indicator, { xPercent: -50 })`로 처리했습니다.
- 히어로가 화면 밖으로 넘어가면 화살표가 남아 보이지 않도록 `IntersectionObserver`로 표시 상태를 제어합니다.

## 21. 최종 확인 기준

회사에서 적용 후 아래가 모두 맞으면 오늘 결과물과 거의 동일합니다.

- 첫 화면이 대표님 소개 풀 뷰포트로 보인다.
- 배경은 화이트/연한 블루 그라디언트다.
- 왼쪽에는 큰 제목과 설명, 3개 통계 카드가 있다.
- 오른쪽에는 라운딩 큰 대표님 이미지 카드가 있다.
- 첫 화면 하단 중앙에 아래 화살표가 보이고 위아래로 움직인다.
- 화살표 클릭 시 다음 섹션으로 부드럽게 이동한다.
- `Beginning`, `Turning Point`, `Lifestyle` 섹션은 데스크톱에서 pin 스크롤 느낌이 난다.
- 모바일에서는 섹션들이 끊기지 않고 세로로 자연스럽게 나열된다.
- `npm run lint`가 통과한다.
