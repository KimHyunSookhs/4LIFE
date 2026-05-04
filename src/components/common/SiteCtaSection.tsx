"use client";

import { Button } from "@/src/components/common/Button";
import { Reveal } from "@/src/app/about/components/_shared/Reveal";
import { SectionEyebrow } from "@/src/app/about/components/_shared/SectionEyebrow";

/**
 * 전역 하단 CTA — 모든 화면 하단 공통.
 */
export function SiteCtaSection() {
  return (
    <section
      className="snap-page-section relative isolate flex flex-col justify-center overflow-hidden bg-linear-to-br from-primary via-deep-blue to-primary px-5 py-20 text-card sm:px-8 sm:py-28"
      aria-labelledby="site-cta-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(153,194,255,0.24),transparent_32%)]" />
      <Reveal className="relative mx-auto max-w-4xl text-center">
        <SectionEyebrow>함께 시작하기</SectionEyebrow>
        <h2
          id="site-cta-title"
          className="mt-4 text-3xl leading-tight font-semibold tracking-tight sm:text-5xl"
        >
          면역과 삶의 변화를 함께 시작하세요
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/76 sm:text-lg">
          건강 상담이 필요하신 분도, 비즈니스의 다음 방향을 찾고 계신 분도
          편하게 문의해 주세요. 한 사람에게 맞는 속도와 방식으로 안내하겠습니다.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            href="/contact"
            text="상담 문의"
            className="bg-card! text-deep-blue! hover:scale-105 hover:shadow-2xl hover:shadow-white/18"
          />
          <Button
            href="/contact"
            text="비즈니스 문의"
            variant="secondary"
            className="border-white/45! bg-white/10! text-card! hover:scale-105 hover:bg-white/18!"
          />
        </div>
      </Reveal>
    </section>
  );
}
