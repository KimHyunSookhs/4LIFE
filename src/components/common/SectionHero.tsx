"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, useReducedMotion } from "framer-motion";
import { useId, useRef } from "react";

type SectionHeroProps = {
  label: string;
  title: string;
  description: string;
  /** `true`이면 문자열 줄바꿈마다 하나의 문단(`<p>`)으로 렌더합니다. */
  splitDescriptionByNewline?: boolean;
  scrollLabel?: string;
};

const HERO_EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

/** 단색 로띠를 브랜드 primary(#5b74b8)에 가깝게 보이도록 하는 필터 */
const SCROLL_LOTTIE_PRIMARY_FILTER =
  "brightness(0) saturate(100%) invert(44%) sepia(71%) saturate(464%) hue-rotate(194deg) brightness(95%) contrast(88%)";

/** 고정 헤더 스페이서 높이와 합쳐져 스크롤이 생기지 않도록, 히어로만 ‘남은 뷰포트’에 맞춤 */
const HERO_VIEWPORT_MINUS_HEADER =
  "min-h-0 [height:calc(100svh-4.5rem)] max-h-[calc(100svh-4.5rem)] sm:[height:calc(100svh-5rem)] sm:max-h-[calc(100svh-5rem)]";

/** 본문(설명) 한 줄 유지 — 좁은 폭에서는 가로 스크롤(바 숨김) */
const DESCRIPTION_ONE_LINE =
  "inline-block max-w-full overflow-x-auto overflow-y-hidden whitespace-nowrap text-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

export function SectionHero({
  label,
  title,
  description,
  splitDescriptionByNewline = false,
  scrollLabel = "다음 섹션으로 이동",
}: SectionHeroProps) {
  const headingId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const handleScrollToNext = () => {
    const nextSection = sectionRef.current?.nextElementSibling;

    if (nextSection instanceof HTMLElement) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className={`relative isolate flex w-full flex-col overflow-hidden bg-[#f8f9fa] px-5 sm:px-8 ${HERO_VIEWPORT_MINUS_HEADER}`}
    >
      {/* Background: champagne-tinted depth + center glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbfcfd_0%,#f4f6f9_55%,#e2e8f0_100%)]" />

        {/* 상단에서 내려오는 부드러운 조명 */}
        <div className="absolute -top-[18%] left-1/2 h-[72%] w-[150%] -translate-x-1/2 rounded-[100%] bg-white opacity-80 blur-[80px]" />

        {/* 중앙 라디얼 글로우 (시선 집중) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,1)_0%,rgba(244,247,250,0.7)_38%,rgba(226,232,240,0.4)_62%,transparent_100%)]" />

        {/* 미세한 샴페인/쿨톤 워시 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_24%,rgba(214,196,164,0.16),transparent_45%),radial-gradient(ellipse_at_82%_22%,rgba(170,190,220,0.18),transparent_44%)]" />

        {/* 거대한 원형 라인 — 하단에 살짝 걸치게 (레이어감) */}
        <div className="absolute -bottom-[58%] left-1/2 size-[150vmax] -translate-x-1/2 rounded-full border border-black/[0.05]" />
        <div className="absolute -bottom-[64%] left-1/2 size-[170vmax] -translate-x-1/2 rounded-full border border-black/[0.035]" />

        {/* 미세 도트 텍스처 */}
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#11234b_1px,transparent_0)] [background-size:40px_40px]" />

        {/* 하단 비네팅 */}
        <div className="absolute inset-x-0 bottom-0 h-[34%] bg-[linear-gradient(180deg,transparent_0%,rgba(17,35,75,0.05)_100%)]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col items-center justify-center px-2 pt-4 text-center sm:px-3 sm:pt-6 pb-[5.25rem] sm:pb-24"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduceMotion ? 0 : 0.14 },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="max-w-[96vw] shrink-0 text-[0.8rem] font-medium tracking-[0.44em] text-deep-blue/65 uppercase sm:max-w-none sm:text-[0.82rem] sm:tracking-[0.46em]"
          variants={fadeUp}
          transition={{ duration: reduceMotion ? 0 : 1.05, ease: HERO_EASE }}
        >
          {label}
        </motion.p>

        <motion.h1
          id={headingId}
          className="mt-4 max-w-[min(100%,36rem)] shrink-0 text-[clamp(2.05rem,5.6vw,3.35rem)] leading-[1.06] font-semibold tracking-[-0.045em] text-deep-blue sm:mt-5"
          variants={fadeUp}
          transition={{ duration: reduceMotion ? 0 : 1.2, ease: HERO_EASE }}
        >
          {title}
        </motion.h1>

        {splitDescriptionByNewline ? (
          <motion.div
            className="mt-5 flex w-full max-w-4xl shrink-0 flex-col items-center gap-3 text-[rgba(0,0,0,0.62)] sm:mt-6 sm:gap-3.5"
            variants={fadeUp}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: HERO_EASE }}
          >
            {description
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0)
              .map((line, i) => (
                <p
                  key={i}
                  className={`m-0 text-[clamp(0.9rem,2.75vw,1.17rem)] font-medium leading-normal tracking-tight sm:text-[clamp(0.97rem,2.2vw,1.22rem)] ${DESCRIPTION_ONE_LINE}`}
                >
                  {line}
                </p>
              ))}
          </motion.div>
        ) : (
          <motion.p
            className="mt-5 w-full max-w-4xl shrink-0 px-1 text-[clamp(0.9rem,2.75vw,1.17rem)] font-medium leading-normal tracking-tight text-[rgba(0,0,0,0.62)] sm:mt-6 sm:px-2 sm:text-[clamp(0.97rem,2.2vw,1.22rem)]"
            variants={fadeUp}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: HERO_EASE }}
          >
            <span className={DESCRIPTION_ONE_LINE}>{description}</span>
          </motion.p>
        )}
      </motion.div>

      <motion.button
        type="button"
        onClick={handleScrollToNext}
        className="group absolute bottom-6 left-1/2 z-20 flex size-[clamp(4rem,6vw,5.5rem)] -translate-x-1/2 items-center justify-center rounded-full text-deep-blue/80 transition-colors hover:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:bottom-8"
        aria-label={scrollLabel}
        initial={reduceMotion ? undefined : { opacity: 0 }}
        animate={reduceMotion ? undefined : { opacity: 1 }}
        transition={reduceMotion ? undefined : { duration: 1, ease: HERO_EASE, delay: 0.6 }}
      >
        <span className="absolute inset-0 rounded-full border border-black/[0.06] backdrop-blur-[2px]" aria-hidden />
        {reduceMotion ? (
          <span className="relative z-10 text-xs font-medium tracking-[0.4em] text-primary uppercase">
            Scroll
          </span>
        ) : (
          <div
            className="relative z-10 flex size-[78%] items-center justify-center"
            style={{ filter: SCROLL_LOTTIE_PRIMARY_FILTER }}
          >
            <DotLottieReact
              src="/ScrollDown.lottie"
              loop
              autoplay
              className="size-full opacity-95"
              aria-hidden
            />
          </div>
        )}
        <span className="sr-only">Scroll Down</span>
      </motion.button>
    </section>
  );
}
