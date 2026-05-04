"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  History,
  Microscope,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ensureScrollTrigger } from "@/src/app/about/components/scroll-pin/ensureScrollTrigger";
import { SectionEyebrow } from "@/src/app/about/components/_shared/SectionEyebrow";

const iconMap = {
  Stethoscope,
  Globe,
  Microscope,
  History,
} satisfies Record<string, LucideIcon>;

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

type TurningPointItem = (typeof turningPointData)[number];

type TurningPointCardProps = {
  item: TurningPointItem;
  Icon: LucideIcon;
};

function TurningPointCard({ item, Icon }: TurningPointCardProps) {
  const titleParts = item.title.match(/^(PDR|25개국)(.*)$/);

  return (
    <div
      className="about-turning-card-layer relative w-full lg:absolute lg:inset-0"
    >
      <div className="about-turning-card-anim relative w-full lg:absolute lg:inset-0">
        <article
          className="about-turning-card relative min-h-[min(420px,58dvh)] overflow-hidden rounded-[2rem] border border-white/12 bg-[#17264a] p-7 text-card shadow-2xl shadow-black/25 lg:absolute lg:top-1/2 lg:left-0 lg:h-full lg:min-h-0 lg:w-full lg:-translate-y-1/2 lg:max-h-full lg:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(153,194,255,0.2),transparent_30%),radial-gradient(circle_at_84%_82%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:28px_28px]" />
          <span
            className="pointer-events-none absolute -right-5 top-3 text-[6.5rem] font-black leading-none tracking-tight text-white/[0.06] sm:text-[8.5rem] lg:text-[10rem]"
            aria-hidden
          >
            {item.number}
          </span>

          <div className="relative z-10 flex w-full justify-start">
            <div className="flex flex-col items-start gap-3">
              <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-semibold text-secondary-bright ring-1 ring-white/18 backdrop-blur">
                {item.badge}
              </span>
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-secondary-bright ring-1 ring-white/16 backdrop-blur">
                <Icon className="size-6" strokeWidth={1.8} aria-hidden />
              </div>
            </div>
          </div>

          <h3 className="relative mt-12 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-white sm:mt-14 sm:text-4xl lg:mt-16 lg:text-5xl">
            {titleParts ? (
              <>
                <span className="text-secondary-bright">
                  {titleParts[1]}
                </span>
                {titleParts[2]}
              </>
            ) : (
              item.title
            )}
          </h3>
          <p className="relative mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg sm:leading-9">
            {item.desc}
          </p>
        </article>
      </div>
    </div>
  );
}

export function TurningPointSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion ?? false;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureScrollTrigger();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const heading = section.querySelector<HTMLElement>(".about-turning-heading");
      const layers = gsap.utils.toArray<HTMLElement>(".about-turning-card-layer", section);
      const anims = gsap.utils.toArray<HTMLElement>(".about-turning-card-anim", section);

      const STACK_Y = 24;
      const STACK_SCALE_STEP = 0.026;
      const STACK_ALPHA_DROP = 0.05;

      gsap.set(heading, { y: 28, opacity: 0 });
      gsap.set(layers, { zIndex: 1 });
      gsap.set(anims, {
        xPercent: 100,
        x: 0,
        y: 0,
        autoAlpha: 0,
        scale: 0.9,
        transformOrigin: "50% 0%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(heading, { y: 0, opacity: 1, ease: "none", duration: 0.28 }, 0);
      if (anims[0]) {
        tl.to(
          anims[0],
          {
            xPercent: 0,
            x: 0,
            y: 0,
            autoAlpha: 1,
            scale: 1,
            ease: "none",
            duration: 0.8,
          },
          0.4,
        );
        tl.set(layers[0], { zIndex: 100 }, 0.4);
      }

      for (let i = 1; i < anims.length; i += 1) {
        const start = i + 0.18;

        for (let j = 0; j < i; j += 1) {
          const depth = i - j;
          tl.to(
            anims[j],
            {
              xPercent: 0,
              x: 0,
              y: -depth * STACK_Y,
              scale: Math.max(0.87, 1 - depth * STACK_SCALE_STEP),
              autoAlpha: Math.max(0.56, 0.94 - depth * STACK_ALPHA_DROP),
              ease: "none",
              duration: 0.8,
            },
            start,
          );
        }

        tl.to(
          anims[i],
          {
            xPercent: 0,
            x: 0,
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            duration: 0.8,
          },
          start,
        );

        for (let j = 0; j < layers.length; j += 1) {
          if (j <= i) {
            tl.set(layers[j], { zIndex: j === i ? 100 : 9 + j }, start);
          } else {
            tl.set(layers[j], { zIndex: 1 }, start);
          }
        }
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        tl.kill();
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>(".about-turning-card", section);

      if (!shouldReduceMotion) {
        gsap.from(cards, {
          y: 42,
          opacity: 0,
          duration: 0.72,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: section,
            start: "top 74%",
            once: true,
          },
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => mm.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen bg-[#071229] px-5 py-[clamp(1rem,3.5dvh,3.5rem)] text-card sm:px-8 lg:overflow-hidden"
      aria-labelledby="turning-point-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(91,116,184,0.34),transparent_34%),radial-gradient(circle_at_84%_72%,rgba(153,194,255,0.18),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:42px_42px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-[clamp(0.75rem,2dvh,1.5rem)] lg:h-[100dvh] lg:max-h-[100dvh] lg:min-h-0 lg:flex-row lg:items-stretch lg:gap-x-10 lg:gap-y-0 xl:gap-x-14">
        <div className="about-turning-heading flex min-h-0 w-full max-w-3xl flex-col items-start justify-center text-left sm:max-w-2xl lg:max-w-none lg:flex-[0_0_42%] lg:shrink-0 lg:justify-center lg:self-stretch lg:pt-[clamp(2.5rem,6dvh,4.5rem)] lg:pr-4 xl:flex-[0_0_38%]">
          <SectionEyebrow>Turning Point</SectionEyebrow>
          <h2
            id="turning-point-title"
            className="mt-8 max-w-xl text-3xl leading-tight font-semibold tracking-tight text-white sm:mt-10 sm:text-4xl lg:mt-10 lg:max-w-md lg:text-5xl xl:max-w-lg"
          >
            2016년, 포라이프를 만나며 면역의 기준이 더 깊어졌습니다.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/68 sm:mt-6 sm:text-[1.05rem] sm:leading-8 lg:mt-6">
            건강 상담, 다이어트 코칭, 교육 강연부터 글로벌 수준의 면역 케어까지,
            검증된 데이터로 일상의 변화를 제안합니다.
          </p>
        </div>

        <div className="flex w-full min-w-0 min-h-0 flex-col lg:flex-1 lg:flex lg:justify-center">
          <div className="w-full max-w-[40rem] lg:mx-auto lg:pb-4 lg:pt-10">
            <div className="relative grid w-full gap-5 lg:block lg:h-[clamp(23rem,38dvh,28.5rem)] lg:min-h-0 lg:w-full lg:overflow-visible">
            {turningPointData.map((item) => {
              const Icon = iconMap[item.icon];

              return (
                <TurningPointCard
                  key={item.title}
                  item={item}
                  Icon={Icon}
                />
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
