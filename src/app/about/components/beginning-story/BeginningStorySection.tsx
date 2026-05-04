"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ensureScrollTrigger } from "@/src/app/about/components/scroll-pin/ensureScrollTrigger";
import { SectionEyebrow } from "@/src/app/about/components/_shared/SectionEyebrow";

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

export function BeginningStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion ?? false;

  useLayoutEffect(() => {
    if (shouldReduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    ensureScrollTrigger();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".about-beginning-card", section);
      const copy = section.querySelector<HTMLElement>(".about-beginning-copy");
      const timelineLine = section.querySelector<HTMLElement>(".about-beginning-line");

      gsap.set(copy, { y: 40, opacity: 0 });
      gsap.set(cards, { y: 54, opacity: 0, scale: 0.96 });
      gsap.set(timelineLine, { scaleY: 0, transformOrigin: "top" });

      const CARD_IN = 0.22;
      const CARD_GAP = 0.14;
      /** 3번 카드까지 모두 보인 뒤, 핀 해제 전 스크롤만 진행되는 구간(타임라인 비율) */
      const AFTER_LAST_HOLD = 0.48;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=265%",
          pin: true,
          scrub: 0.92,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(copy, {
        y: 0,
        opacity: 1,
        ease: "none",
        duration: 0.32,
      });
      tl.to(
        timelineLine,
        {
          scaleY: 1,
          ease: "none",
          duration: 0.36,
        },
        0.04,
      );

      let cardStart = 0.38;
      cards.forEach((card) => {
        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: CARD_IN,
            ease: "none",
          },
          cardStart,
        );
        cardStart += CARD_IN + CARD_GAP;
      });

      const lastCardEnd =
        0.38 + (cards.length - 1) * (CARD_IN + CARD_GAP) + CARD_IN;
      if (copy) {
        tl.to(
          copy,
          { opacity: 1, duration: AFTER_LAST_HOLD, ease: "none" },
          lastCardEnd,
        );
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const copy = section.querySelector<HTMLElement>(".about-beginning-copy");
      const cards = gsap.utils.toArray<HTMLElement>(".about-beginning-card", section);

      gsap.from([copy, ...cards].filter(Boolean), {
        y: 34,
        opacity: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-card px-5 py-20 sm:px-8 sm:py-28 lg:min-h-screen"
      aria-labelledby="beginning-title"
    >
      <div className="pointer-events-none absolute -left-24 top-20 size-80 rounded-full bg-secondary-bright/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 size-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:items-start lg:pt-6">
        <div className="about-beginning-copy">
          <SectionEyebrow>Beginning</SectionEyebrow>
          <h2
            id="beginning-title"
            className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-deep-blue sm:text-4xl"
          >
            건강을 향한 진심이 4Life와의 시작으로 이어졌습니다.
          </h2>
          <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
          <p>
            2011년, 건강과 사람을 연결하는 일을 시작으로 H사 비즈니스를 운영해왔습니다.
            더 나은 삶을 돕고자 하는 마음으로 현장을 경험하며 건강에 대한 전문성과 신뢰를 쌓아왔습니다.
          </p>
          <p>
            그러던 중 남편의 건강 회복 경험을 통해 4Life를 처음 접하게 되었습니다.
            오랜 시간 알레르기와 통증으로 힘들어하던 남편에게 4Life를 만난후 나타난 긍정적인 변화는
            건강의 본질과 면역의 중요성을 다시 바라보는 계기가 되었습니다.
          </p>
          <p>
            이를 계기로 2016년부터 4Life 비즈니스를 본격적으로 시작하게 되었으며,
            현재는 부부가 함께 건강의의 가치를 전하는 파트너로 활동하고 있습니다.
          </p>
          </div>
        </div>
        <div>
          <div className="relative overflow-hidden rounded-[2rem] border border-primary/10 bg-secondary/60 p-5 shadow-2xl shadow-primary/10 backdrop-blur sm:p-6">
            <div className="absolute -right-12 -top-12 size-44 rounded-full bg-primary/12 blur-2xl" />
            <div className="absolute bottom-4 left-8 top-8 w-px bg-linear-to-b from-primary/0 via-primary/25 to-primary/0 max-sm:left-7" />
            <div className="about-beginning-line absolute bottom-4 left-8 top-8 w-px bg-linear-to-b from-primary/0 via-primary/55 to-primary/0 max-sm:left-7" />

            <div className="relative grid gap-4">
              {STORY_CARDS.map((item) => (
                <div
                  key={item.number}
                  className="about-beginning-card group relative ml-8 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-xl shadow-primary/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/12 lg:will-change-transform"
                >
                  <span className="absolute -left-11 top-7 flex size-8 items-center justify-center rounded-full border border-primary/15 bg-card text-xs font-semibold text-primary shadow-lg shadow-primary/10">
                    {item.number}
                  </span>
                  <p className="text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                    Story {item.number}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-deep-blue">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
