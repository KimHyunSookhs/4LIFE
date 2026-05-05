"use client";

import { Reveal } from "@/src/app/about/components/_shared/Reveal";
import { SiteCtaRevealContent } from "@/src/components/common/SiteCtaSection";

const QUOTE_CTA_TITLE_ID = "about-quote-cta-title";

export function QuoteSection() {
  return (
    <section
      className="snap-page-section relative isolate flex flex-col justify-center overflow-hidden bg-linear-to-br from-primary via-deep-blue to-primary px-5 py-20 text-card sm:px-8 sm:py-28"
      aria-labelledby={QUOTE_CTA_TITLE_ID}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(153,194,255,0.24),transparent_32%)]" />
      <Reveal className="relative mx-auto max-w-5xl text-center">
        <blockquote className="mx-auto max-w-5xl text-pretty text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          “건강은 선택이 아니라 방향입니다.”
        </blockquote>
        <p className="mt-6 text-base text-white/68 sm:text-lg">
          오늘의 작은 선택이 내일의 컨디션과 삶의 가능성을 바꿉니다.
        </p>
        <div className="mx-auto mt-16 max-w-4xl border-t border-white/15 pt-16">
          <SiteCtaRevealContent titleId={QUOTE_CTA_TITLE_ID} />
        </div>
      </Reveal>
    </section>
  );
}
