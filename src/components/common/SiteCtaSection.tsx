"use client";

import { Button } from "@/src/components/common/Button";
import { Reveal } from "@/src/app/about/components/_shared/Reveal";
import { SectionEyebrow } from "@/src/app/about/components/_shared/SectionEyebrow";

type SiteCtaRevealContentProps = {
  titleId?: string;
};

export function SiteCtaRevealContent({ titleId = "site-cta-title" }: SiteCtaRevealContentProps) {
  return (
    <>
      <SectionEyebrow>함께 시작하기</SectionEyebrow>
      <blockquote
        id={titleId}
        className="mx-auto max-w-5xl text-pretty text-4xl mt-2 leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl"
      >
        “건강은 선택이 아니라 방향입니다.”
      </blockquote>
        <p className="mt-6 text-base text-white/68 sm:text-lg">
          오늘의 작은 선택이 내일의 컨디션과 삶의 가능성을 바꿉니다.
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
    </>
  );
}

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
        <SiteCtaRevealContent />
      </Reveal>
    </section>
  );
}
