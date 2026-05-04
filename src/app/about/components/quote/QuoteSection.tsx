"use client";

import { Reveal } from "@/src/app/about/components/_shared/Reveal";

export function QuoteSection() {
  return (
    <section className="bg-deep-blue px-5 py-24 text-center text-card sm:px-8 sm:py-32" aria-labelledby="quote-title">
      <Reveal>
        <h2
          id="quote-title"
          className="mx-auto max-w-5xl text-4xl leading-tight font-semibold tracking-tight sm:text-5xl lg:text-6xl"
        >
          “건강은 선택이 아니라 방향입니다.”
        </h2>
        <p className="mt-6 text-base text-white/68 sm:text-lg">
          오늘의 작은 선택이 내일의 컨디션과 삶의 가능성을 바꿉니다.
        </p>
      </Reveal>
    </section>
  );
}
