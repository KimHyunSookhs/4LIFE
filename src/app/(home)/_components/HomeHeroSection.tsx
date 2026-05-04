"use client";

import Image from "next/image";

import { homeCeoHeroContent } from "@/src/constants/homeCeoHeroContent";
import { Button } from "@/src/components/common/Button";
import useResponsive from "@/src/hooks/useResponsive";

/**
 * 홈 최상단 히어로: `homeCeoHeroContent` 카피 + 신뢰감 있는 톤.
 *
 * - 레이아웃: **항상** 텍스트는 왼쪽(`1fr`), 포트레이트는 **오른쪽**(`auto` 폭).
 * - 이미지 너비는 CSS `clamp()`만 사용한다. `width`/`aspect-ratio`에 transition을 주면
 *   오른쪽 끝에 붙은 카드가 가로로 “미끄러지는” 것처럼 보일 수 있어 **레이아웃 전환은 두지 않는다**
 *   (리사이즈는 브라우저가 즉시 다시 그리는 편이 더 자연스럽다).
 * - `useResponsive`의 **`isMobile`만** 사용: `next/image`의 `sizes` 힌트만 조정.
 *
 * - Flutter 비유: `Row`의 오른쪽은 `SizedBox(width: clamp)`로 두고, 폭 변화는 애니메이션 없이
 *   레이아웃 패스만 돌리는 것과 비슷하다.
 */

function HighlightCheckIcon() {
  return (
    <svg
      className="size-5 shrink-0 text-primary"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function HomeHeroSection() {
  const { image, name, subtitle, slogan, highlights, cta } = homeCeoHeroContent;
  const { isMobile } = useResponsive();

  const headingId = "home-hero-heading";

  /**
   * `sizes`는 실제 레이아웃을 바꾸지 않고 브라우저에게 “이 정도 크기의 이미지만 필요해요”라고
   * 알려주는 힌트다. 레이아웃은 아래 Tailwind/CSS가 담당하므로 이미지가 갑자기 커지거나 줄지 않는다.
   */
  const imageSizes = isMobile
    ? "(max-width: 639px) 40vw, 180px"
    : "(max-width: 1023px) 42vw, (max-width: 1280px) 40vw, 420px";

  /**
   * 오른쪽 이미지 열 폭:
   * - 모바일: `clamp(6.25rem, 38vw, 10.5rem)`
   * - sm~: `clamp(8rem, 28vw, 12rem)` → lg에서 `max-w-md`
   * 전환 애니메이션 없음(오른쪽 정렬 시 width 보간이 어색해지는 것을 방지).
   */
  const imageColumnClass =
    "w-[clamp(6.25rem,38vw,10.5rem)] shrink-0 sm:w-[clamp(8rem,28vw,12rem)] lg:w-full lg:max-w-md";

  return (
    <section
      className="relative isolate overflow-hidden border-b border-border/80 bg-linear-to-b from-background via-secondary/35 to-secondary/80"
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-32 size-112 rounded-full bg-primary/6 blur-3xl max-sm:opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-20 size-88 rounded-full bg-deep-blue/4 blur-3xl max-sm:opacity-60"
        aria-hidden
      />

      {/*
        항상 2열: 왼쪽 카피(1fr) · 오른쪽 사진(auto).
        모바일도 데스크톱과 같은 좌·우 배치; lg에서만 열비·간격·수직 정렬을 데스크톱 비율에 맞춤.
      */}
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-0 px-4 py-9 sm:gap-x-4 sm:px-5 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center lg:gap-x-12 lg:px-4 lg:py-16">
        {/* 왼쪽: 카피 블록 */}
        <div className="min-w-0">
          <p className="text-xs font-medium tracking-tight text-primary sm:text-sm">
            {subtitle}
          </p>
          <p
            id={headingId}
            className="mt-1.5 text-2xl font-semibold tracking-tight text-deep-blue sm:mt-2 sm:text-3xl lg:text-4xl"
          >
            {name}
          </p>
          <h1 className="mt-3 max-w-xl text-base leading-relaxed text-foreground sm:mt-4 sm:text-lg lg:text-xl">
            {slogan}
          </h1>

          <ul className="mt-6 max-w-lg space-y-2.5 text-[15px] leading-snug text-deep-blue/90 sm:mt-8 sm:space-y-3 sm:text-base sm:leading-relaxed">
            {highlights.map((item) => (
              <li key={item} className="flex gap-2.5 sm:gap-3">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-card shadow-sm ring-1 ring-border/90 sm:size-8">
                  <HighlightCheckIcon />
                </span>
                <span className="pt-0.5 sm:pt-1">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 flex gap-3 sm:mt-10 sm:gap-4">
            <Button href="/contact" text={cta} fullWidth={false} />
          </div>

          <p className="mt-5 max-w-md text-xs leading-relaxed text-muted-foreground sm:mt-6 sm:text-sm">
            개인의 상태에 맞는 안내를 지향합니다. 궁금한 점은 언제든지 편하게
            문의해 주세요.
          </p>
        </div>
        <div
          className={`self-start justify-self-end pt-1 lg:pt-0 ${imageColumnClass}`}
        >
          <div className="relative w-full">
            <div
              className="absolute -inset-1.5 rounded-[1.05rem] bg-linear-to-br from-border/80 via-card to-secondary-bright/25 ring-1 ring-border/60 sm:-inset-3 sm:rounded-[1.35rem]"
              aria-hidden
            />
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-card shadow-xl shadow-deep-blue/12 ring-1 ring-border sm:aspect-4/5 sm:rounded-2xl">
              <Image
                src={image}
                alt={`${name} 사진`}
                fill
                className="object-cover object-[center_18%] sm:object-center"
                sizes={imageSizes}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
