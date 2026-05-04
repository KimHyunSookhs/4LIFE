# 학습 노트 (4life-web)

## 홈 히어로 섹션 (`HomeHeroSection`)

### 데이터와 UI 분리

- **constants**(`homeCeoHeroContent.ts`)에는 문구·이미지 URL만 두고, 레이아웃/색/애니메이션은 컴포넌트에서 처리한다.
- **Flutter 비유**: `lib/constants/ceo_hero.dart`에 `static const` 맵만 두고, 실제 화면은 `HomeHeroScreen` 위젯에서 `Column`/`Row`로 배치하는 것과 같다. 데이터 클래스만 바꾸면 UI 코드를 거의 건드리지 않아도 된다.

### `next/image` + `fill`

- 부모에 `position: relative`와 고정 **aspect ratio**(여기서는 `aspect-4/5`)를 주고, `Image`에 `fill` + `object-cover`를 쓰면 비율을 유지한 채 영역을 꽉 채울 수 있다.
- `sizes`는 브라우저가 어떤 해상도 이미지를 받을지 힌트를 준다(반응형·LCP 최적화). 큰 히어로는 `priority`로 우선 로딩할 수 있다.
- **Flutter 비유**: `AspectRatio` 안에 `Image.network`를 `BoxFit.cover`로 넣고, 부모를 `Stack` + `Positioned.fill`에 가깝게 두는 패턴과 비슷하다.

### 접근성: `section` + `aria-labelledby`

- `<section aria-labelledby="...">`와 내부 제목 `id`를 맞추면, 스크린 리더 사용자에게 “이 블록의 주제가 무엇인지”가 전달된다.
- 장식용 SVG·배경 blob은 `aria-hidden`으로 보조 기술에서 숨긴다.
- **Flutter 비유**: `Semantics(label: ..., child: ...)`로 영역 전체에 의미를 붙이고, 순수 장식 위젯에는 `ExcludeSemantics`를 씌우는 것에 대응한다.

### Tailwind v4 클래스 이름 팁

- 그라데이션 배경은 일부 설정에서 `bg-linear-to-b`, `bg-linear-to-br` 형태를 권장한다(`bg-gradient-to-*` 대체).
- 투명도는 `bg-primary/6`처럼 슬래시 표기로 짧게 쓸 수 있다.

## `useResponsive`와 모바일 대응 전략

### 역할 분담

- **레이아웃·타이포·터치 영역**(그리드, `min-h-12`, `aspect-[3/4] sm:aspect-4/5` 등)은 **Tailwind 브레이크포인트**로 두는 것이 좋다. 서버에서 렌더한 HTML과 모바일 첫 화면이 같아져 하이드레이션/깜빡임이 줄어든다.
- **`useResponsive`**는 `react-responsive` 기반으로, 마운트 이후에 `isMobile` / `isTablet` / `isPc` / **`isReady`**를 알려 준다. `isReady === false`일 때는 세 플래그는 신뢰하지 말 것.
- 히어로에서는 주로 **`next/image`의 `sizes`** 문자열을 구간별로 좁혀, 모바일에 과한 해상도를 받지 않도록 하는 데 활용했다.

### Flutter 비유

- 화면 너비에 따라 `Column` vs `Row`를 나누는 것은 **Flutter의 `LayoutBuilder` + 조건**과 비슷하지만, **웹에서는 우선 `Flexible`/`Expanded` 대신 CSS 미디어쿼리(`sm:`/`lg:`)**가 서버 렌더와 잘 맞는다.
- `useResponsive`는 “빌드가 끝난 뒤”에만 정확해지므로, **`MediaQuery`로 폭을 읽되 위젯 트리 구조를 바꿔 깜빡임이 나지 않게** 쓰는 패턴에 가깝게 다루는 것이 안전하다.

### `clamp()`로 부드러운 이미지 크기 만들기

- `isMobile`로 class 전체를 바꾸면 하이드레이션 직후 또는 화면 회전 시 이미지가 갑자기 “뚝” 변할 수 있다.
- 이번 히어로는 실제 레이아웃 폭을 `w-[clamp(6.25rem,38vw,10.5rem)]`처럼 CSS에 맡겼다. `clamp(최소값, 선호값, 최대값)`은 뷰포트에 따라 즉시(애니메이션 없이) 맞춰지며, 창 크기를 줄일 때마다 브라우저가 레이아웃을 다시 그린다.
- **주의**: 카드가 **오른쪽 끝에 붙은** 형태에서 `width`에 `transition`을 걸면, 리사이즈 동안 **왼쪽 가장자리만** 보간되어 “밀리는” 느낌이 날 수 있다. 그래서 히어로 이미지 열에는 width/aspect 전환을 두지 않는 편이 낫다.
- **Flutter 비유**: 오른쪽 정렬된 `SizedBox` 너비를 `AnimatedContainer`로 보간하면 앵커가 오른쪽일 때 이상하게 보일 수 있어, 여기서는 폭만 `clamp`로 두고 애니메이션은 생략하는 것에 가깝다.

## 헤더 햄버거 메뉴 (`Header.tsx`)

- **`lg`(1024px) 미만**에서만 햄버거 버튼을 보이게 하고, **`lg` 이상**에서는 가로 링크 나열을 유지한다. 표시/숨김은 **Tailwind `lg:hidden` / `hidden lg:flex`**로 처리해 첫 페인트부터 레이아웃이 맞다.
- 버튼으로 패널을 열고 닫으려면 `"use client"`와 `useState`가 필요하다(서버 컴포넌트만으로는 클릭 상태를 안전하게 다루기 어렵다).
- `aria-expanded`, `aria-controls`, `aria-label`(열기/닫기)로 토글 버튼과 패널을 연결하고, `Escape`·딤(배경) 클릭으로 패널을 닫는다. 화면을 넓혀 `lg`가 되면 `matchMedia('change')`로 메뉴 상태를 리셋한다.
- 모바일 패널은 **헤더 아래로 펼치지 않고**, `fixed right-0` + `translate-x` 전환으로 **오른쪽에서 왼쪽으로** 나오는 **드로어** 형태다. 열린 동안 `body { overflow: hidden }`으로 뒤 콘텐츠 스크롤을 막는다.
- **Flutter 비유**: `Scaffold`의 `endDrawer`(오른쪽에서 열리는 `Drawer`) + 반투명 `ModalBarrier`에 가깝다.
- **참고**: `pathname` 바뀔 때마다 `useEffect`로 `setState` 하는 패턴은 ESLint(`react-hooks/set-state-in-effect`)가 막는 경우가 있어, 이 프로젝트는 **각 링크·로고 `onClick`에서 `closeMobile`** 하는 방식으로 맞췄다.

## 홈 신뢰 지표 섹션 (`HomeTrustSection`)

- 고객에게 신뢰감을 주는 숫자 지표는 **큰 값(value)**, **짧은 라벨(label)**, **한 줄 설명(description)** 순서로 읽히게 구성하면 좋다. 노년층 타겟에서는 작고 복잡한 그래프보다 큰 숫자와 충분한 여백이 더 이해하기 쉽다.
- 이번 섹션은 모바일에서 `grid` 1열, `sm` 이상에서 3열로 바뀐다. Flutter로 비유하면 `LayoutBuilder`에서 폭이 좁을 때는 `Column`, 넓을 때는 `Row`로 `StatCard` 3개를 배치하는 구조와 비슷하다.
- 수치 표시에는 **`MetricCounter`** 를 쓴다. 화면에 들어올 때만 한 번 카운트업하고, `easeOut`·약 1.35초로 과하게 튀지 않게 했다. **접근성**: `prefers-reduced-motion: reduce` 이면 `animate`의 `duration`을 0에 가깝게 두어 바로 최종값만 보이게 한다(ESLint `set-state-in-effect` 회피용으로도 `setDisplay(목표)`를 effect 본문에 직접 두지 않는다).

### `MetricCounter` + framer-motion

- `useInView(..., { once: true })` 로 “스크롤해서 보였을 때만” 재생한다.
- **천 단위**: `toLocaleString('ko-KR')` 로 `1,000` 형태.
- **Flutter 비유**: `VisibilityDetector`로 첫 노출 시 한 번만 실행하는 짧은 `TweenAnimationBuilder<double>` 와 비슷하다.

## 홈 브랜드 + 제품 섹션 (`HomeProductSection`)

- 섹션 흐름은 **브랜드 신뢰 카피 → 슬로건 이미지 → 제품 신뢰 카피 → 제품 모음 이미지 → CTA** 순서로 잡았다. 사용자가 “왜 이 브랜드를 봐야 하는지”를 먼저 이해하고, 마지막에 대표상품/상담 행동으로 이동하도록 설계한다.
- CTA 줄은 **`flex-col` + `sm:flex-row`** 만으로 모바일/데스크톱을 나눈다. 이 파일은 서버 컴포넌트이므로 **`useResponsive` 같은 클라이언트 훅을 호출하면 런타임 오류**가 난다. 폭은 `Button`의 기본 `w-full sm:w-auto`로 맞춘다.
- `next/image`의 `fill`을 사용할 때는 부모가 반드시 `relative`와 명확한 비율(`aspect-*`)을 가져야 한다. 이번 섹션은 슬로건은 `aspect-[2.4/1]`, 제품 이미지는 모바일 `aspect-4/3`, 큰 화면 `sm:aspect-16/10`으로 잡아 검은 배경 이미지가 과하게 잘리지 않도록 했다.
- **Flutter 비유**: `ClipRRect`로 이미지를 둥글게 자르고, 바깥 `Container`에 `BoxDecoration(border, boxShadow)`를 준 이미지 카드와 비슷하다. `AspectRatio` 안에 `Image.asset(fit: BoxFit.contain)`을 넣은 구조로 이해하면 쉽다.

## 공통 CTA 버튼 (`components/common/Button.tsx`)

- 페이지 전환용 **링크 버튼**을 한 곳에서 관리한다. `text`는 필수, 글자 크기·색은 `textSizeClassName`, `textColorClassName`으로 덮어쓸 수 있고, 미지정 시 variant별 기본색(`primary` → `text-card`, `secondary` → `text-deep-blue`)과 **`text-base sm:text-lg`**(모바일은 `base`, `sm` 이상은 `lg`)를 쓴다.
- **터치·데스크톱 크기**: 모바일은 `min-h-12`·`px-6`·`py-3`·`rounded-xl`을 유지하고, **`sm` 이상**에서는 `min-h-14`·`px-9`·`py-4`·`rounded-2xl`로 한 단계 키워 노년층·큰 화면에서 너무 작아 보이지 않게 한다.
- **`fullWidth`(기본 true)**: `w-full sm:w-auto`(모바일에서 넓은 CTA). **false**면 `w-fit`으로 라벨 길이에 맞춘다(히어로 등).
- 부모가 `flex-col`일 때 **`items-center`를 주면** 자식의 `w-full`이 먹지 않고 콘텐츠 폭으로 줄어들 수 있다. 모바일에서 버튼을 꽉 채우려면 세로 스택에는 `items-stretch`(기본값)을 유지하고, 가로 배치 구간에서만 `sm:items-center`를 쓰는 편이 낫다.
- `variant`로 채워진 Primary / 테두리 Secondary 프리셋을 구분한다. Secondary도 호버 시 Primary와 비슷하게 살짝 떠오름(`-translate-y-0.5`) + 그림자·투명도 전환을 준다.
- Secondary는 **아웃라인(`border-2 border-primary/…`) + 연한 `bg-secondary/`** 로 Primary(채워진 버튼)와 시각적 대비를 낸다.
- **Flutter 비유**: `ElevatedButtonTheme` / `OutlinedButtonTheme`로 `padding`·`minimumSize`·`textStyle`을 브레이크포인트마다 다르게 주는 것과 비슷하고, 웹에서는 그 역할을 Tailwind의 `sm:` 접두사가 한다.

## 홈 고객 후기 섹션 (`HomeReviewSection`)

- 후기 카드는 **이미지 → 뱃지 → 후기 문장 → 작성자 정보** 순서로 읽히게 구성했다. 사용자가 요청한 구조처럼 제품/후기 이미지를 먼저 크게 보여 주고, 바로 아래에서 “맞춤 상담” 같은 핵심 경험을 뱃지로 강조한다.
- 카드 리스트는 `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`로 만든다. 모바일은 세로 1열, 태블릿은 2열, 데스크톱은 3열 row 형태가 된다.
- 1:1 이미지는 부모에 `relative aspect-square`를 주고, `next/image`에는 `fill` + `object-cover`를 적용한다. `fill`은 부모 영역을 기준으로 이미지를 꽉 채우므로 부모의 비율과 크기가 반드시 먼저 정해져 있어야 한다.
- 후기는 인용문 의미가 있으므로 일반 `<p>` 대신 `<blockquote>`를 사용했다. 시각적으로도 본문보다 크게 보여 신뢰 후기 문장에 시선이 먼저 간다.
- **Flutter 비유**: `GridView` 안에 `Card`를 넣고, 카드 상단에는 `AspectRatio(aspectRatio: 1)` + `Image.asset(fit: BoxFit.cover)`, 본문에는 `Chip` + `Text` + 작성자 `Text`를 `Column`으로 쌓은 구조와 비슷하다.

### 후기 카드 진입 애니메이션 (Framer Motion)

- **의도**: “보이게” 큰 효과를 주기보다, 스크롤로 **한 번** 들어올 때만 짧게 “원래 있던 것처럼” 자리를 잡게 한다.
- **구현**: `motion.article` + `initial` → `whileInView` + `viewport={{ once: true }}`. 아래에서 **16px**, **opacity 0→1**, **300ms**, **ease-out**, 카드 인덱스마다 **delay +80ms** (`0`, `0.08s`, `0.16s`…).
- **`useReducedMotion()`**: 시스템이 동작 줄이기를 켜면 `initial`을 이미 최종 상태로 두고 `transition.duration`을 0에 가깝게 해 부담을 줄인다.
- **호버**: 카드에 Tailwind `hover:translate-y`와 motion의 `y`를 동시에 쓰면 `transform`이 충돌할 수 있어, 세로 들림은 `whileHover={{ y: -4 }}`만 쓰고 그림자는 CSS `hover:shadow-*`로 둔다.
- **한 줄 요약**: 짧은 페이드·슬라이드 + 스태거로 리듬만 주고, 반복·과장 없이 “자연스럽게 느껴지게” 만든다.
- **Flutter 비유**: 스크롤로 처음 보일 때만 실행되는 짧은 `FadeTransition` + `SlideTransition(begin: Offset(0, 0.02))`, 리스트에서는 `index * 80ms`로 `AnimationController` 시작 시점만 어긋나게 주는 것과 비슷하다.

## 대표님 소개 페이지 (`AboutCeoContent`)

### Client Component와 `framer-motion`

- `framer-motion`의 `motion.div`, `whileInView`, `useScroll`, `useTransform`은 브라우저 스크롤·뷰포트 상태를 사용하므로 파일 상단에 `"use client"`가 필요하다.
- **Flutter 비유**: 일반 정적 위젯이 아니라 `AnimationController`, `ScrollController`, `AnimatedBuilder`를 사용하는 화면이어서 Stateful한 위젯으로 전환하는 것과 비슷하다.

### `whileInView` 스크롤 등장 애니메이션

- `initial`은 아직 화면에 들어오기 전 상태, `whileInView`는 뷰포트에 들어왔을 때의 최종 상태다.
- `viewport={{ once: true }}`를 주면 같은 애니메이션이 스크롤할 때마다 반복되지 않아 대표 소개 페이지처럼 신뢰감이 중요한 화면에 잘 맞는다.
- **Flutter 비유**: `VisibilityDetector`로 위젯이 처음 보였을 때만 `AnimationController.forward()`를 호출하는 패턴과 비슷하다.

### 스태거(Stagger) 애니메이션

- 여러 텍스트나 카드가 동시에 튀어나오면 가벼워 보일 수 있어, `delay` 또는 `staggerChildren`으로 0.07~0.12초씩 시작점을 늦춘다.
- 아주 짧은 시간 차이만 줘도 사용자는 “정돈된 흐름”으로 느낀다.
- **Flutter 비유**: 리스트 아이템마다 `Future.delayed(index * 80ms)` 또는 각 아이템의 `Interval`을 다르게 잡아 순서대로 등장시키는 것과 같다.

### 스크롤 진행 바

- `useScroll()`의 `scrollYProgress`는 현재 페이지 스크롤 위치를 0~1 사이 값으로 제공한다.
- 이 값을 상단 바의 `scaleX`에 연결하면 긴 페이지에서 사용자가 어느 정도 읽었는지 바로 알 수 있다.
- **Flutter 비유**: `ScrollController.offset / maxScrollExtent`를 `LinearProgressIndicator(value: progress)`에 연결하는 방식과 거의 같다.

### `useReducedMotion()` 접근성

- 사용자가 OS에서 “움직임 줄이기”를 켜둔 경우, `useReducedMotion()`으로 감지해 애니메이션 duration을 0에 가깝게 만든다.
- 건강·중장년층 타깃 페이지에서는 멋진 효과보다 편안한 사용감이 더 중요할 수 있다.
- **Flutter 비유**: 플랫폼 접근성 설정에서 애니메이션 줄이기를 감지해 `Duration.zero`에 가깝게 처리하는 것과 비슷하다.

## 푸터 직전 상담 CTA (`HomeConsultationCtaSection`)

- **위치**: 홈 `HomeReviewSection` 바로 아래. 후기로 신뢰가 쌓인 뒤 **짧은 카피 + 한 번의 행동**만 제안해 스크롤 흐름을 끊지 않는다.
- **톤·배경**: `bg-secondary/45` + 위쪽 `border-primary/10`으로 흰 후기 블록과 부드럽게 구분. 광고 배너·`fixed` 하단 배너 없음.
- **높이**: `min-h-[78dvh]` ~ `sm:min-h-[82dvh]`로 뷰포트 대부분을 확보하고, `flex flex-col justify-center`로 카피·버튼을 **세로 중앙**에 둔다. `dvh`는 모바일 주소창 등으로 바뀌는 “보이는 높이” 기준(`100dvh`)에 맞춘 단위다.
- **등장**: **opacity만** 약 **0.28s** `ease-out`, `whileInView` + `once`. 후기 카드보다 약한 연출(세로 슬라이드·스태거 없음). `useReducedMotion`이면 즉시 표시에 가깝게.
- **버튼**: 공통 `Button` primary, `href`는 `/contact`, 모바일 `w-full`, 캡슐형은 `rounded-full!`(Tailwind v4에서 shell의 `rounded-*`를 덮어씀). 호버 들림은 `Button` 기본값 활용.
- **Flutter 비유**: `CustomScrollView` 맨 아래에 `SizedBox(height: 화면 * 0.8)`처럼 최소 높이를 주고, `Center` + `Column`으로 `FilledButton`까지 묶은 뒤, 등장은 `AnimatedOpacity`를 짧게 한 번만 거는 수준에 가깝다.

## 모바일 스크롤바 숨김 (`globals.css`)

- 모바일 폭(`max-width: 767px`)에서만 `html, body`의 스크롤바 UI를 숨긴다. **스크롤 동작은 유지**되고, 오른쪽 얇은 막대만 보이지 않는다.
- Firefox는 `scrollbar-width: none`, Chrome/Safari/Edge는 `::-webkit-scrollbar { display: none; }`를 사용한다. 브라우저마다 스크롤바 커스터마이징 API가 달라 둘 다 필요하다.
- 데스크톱은 스크롤 위치 확인이 더 중요할 수 있어 숨기지 않는다.
- **Flutter 비유**: `ListView`는 그대로 두고 `Scrollbar` 위젯만 안 감싸는 것과 비슷하다. 리스트는 움직이지만 스크롤바 장식은 보이지 않는다.