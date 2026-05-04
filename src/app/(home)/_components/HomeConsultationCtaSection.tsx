"use client";

/**
 * 푸터 직전 상담 유도 CTA 섹션
 *
 * - 배치: `HomeReviewSection` 바로 아래. 후기로 신뢰가 쌓인 뒤 “부담 없이 다음 행동”만
 *   스무스하게 제안하는 역할(플로팅 배너·fixed 금지).
 * - 세로 공간: 뷰포트 **대부분**을 차지하도록 `min-height`를 `dvh` 기준으로 잡고,
 *   `flex` + `justify-center`로 본문 블록을 **화면 안에서 세로 중앙**에 둔다.
 *   (`100dvh`는 주소창 등으로 줄어든 “보이는 높이”에 맞춤 — Flutter의 `MediaQuery.size` 높이에 가깝다.)
 * - 등장: framer-motion으로 **opacity만** 짧게(약 0.28s, ease-out), 스크롤로 한 번 보일 때만.
 *   `useReducedMotion()` 이면 duration 0에 가깝게. (y 이동·강한 스태거 없음 → 후기 섹션과 톤 차이)
 */

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/src/components/common/Button";

const FADE_IN_DURATION_S = 0.28;

export function HomeConsultationCtaSection() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="home-consultation-cta-heading"
      className="flex min-h-[78dvh] flex-col justify-center border-t border-primary/10 bg-secondary/45 px-5 py-12 sm:min-h-[82dvh] sm:px-8 sm:py-16"
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: reduceMotion ? 0 : FADE_IN_DURATION_S,
        ease: "easeOut",
      }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/*
          메인 카피는 2줄 이내 — 각 줄을 `block`으로 나눠 스크린 리더·시각 모두에서
          “두 문장”으로 읽히게 한다. (하나의 `h2` 안에 두 줄이므로 섹션 제목은 단일 레벨 유지)
        */}
        <h2
          id="home-consultation-cta-heading"
          className="text-2xl font-semibold tracking-tight text-deep-blue sm:text-3xl sm:leading-snug"
        >
          <span className="block">어떤 제품이 맞을지 고민되신다면</span>
          <span className="mt-1 block sm:mt-2">편하게 상담 받아보세요</span>
        </h2>

        <h3 className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8">
          고객님의 상황에 맞춰 제품을 추천드립니다
        </h3>
        <Button
          text="나에게 맞는 제품 상담받기"
          href="/contact"
          variant="primary"
          fullWidth
          className="mt-9 rounded-full! px-8 shadow-lg shadow-primary/15 sm:mt-10 sm:px-10"
        />
      </div>
    </motion.section>
  );
}
