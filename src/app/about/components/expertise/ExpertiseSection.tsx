"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Flower2,
  Presentation,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { SectionEyebrow } from "@/src/app/about/components/_shared/SectionEyebrow";
import { ensureScrollTrigger } from "@/src/app/about/components/scroll-pin/ensureScrollTrigger";

/** 배지 `text-blue-700`과 같은 계열의 딥 블루 — 호버 시 카드 전체 신뢰감 강조 */
const HOVER_DEEP_BLUE = "#1d4ed8";
const BRAND_HOVER_BLUE = "#6F86C7";

const CARD_REST = {
  backgroundColor: "#ffffff",
  borderColor: "rgba(221, 229, 245, 0.9)",
  boxShadow:
    "0 10px 15px -3px rgba(91, 116, 184, 0.08), 0 4px 6px -4px rgba(91, 116, 184, 0.06)",
  y: 0,
} as const;

const CARD_HOVER = {
  backgroundColor: BRAND_HOVER_BLUE,
  borderColor: "rgba(255, 255, 255, 0.42)",
  boxShadow:
    "0 24px 48px -14px rgba(74, 99, 172, 0.42), 0 12px 24px -12px rgba(30, 58, 138, 0.24)",
  y: -10,
} as const;

const BADGE_REST = {
  backgroundColor: "#dbeafe",
  color: "#1d4ed8",
  boxShadow: "inset 0 0 0 1px rgba(29, 78, 216, 0.12)",
} as const;

const BADGE_HOVER = {
  backgroundColor: "#ffffff",
  color: HOVER_DEEP_BLUE,
  boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.72)",
} as const;

const ICON_REST = {
  backgroundColor: "#eef3ff",
  color: "#5b74b8",
  boxShadow: "none",
} as const;

const ICON_HOVER = {
  backgroundColor: "rgba(255, 255, 255, 0.18)",
  color: "#ffffff",
  boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.5)",
} as const;

const iconMap = {
  ShieldCheck,
  Scale,
  Presentation,
  Flower2,
} satisfies Record<string, LucideIcon>;

const expertiseData = [
  {
    badge: "자문위원",
    title: "면역 통합 케어",
    desc: "과학적 근거를 바탕으로 개인 맞춤형 면역 건강 상담을 제공합니다.",
    icon: "ShieldCheck",
  },
  {
    badge: "수석코치",
    title: "면역 다이어트",
    desc: "지속 가능한 체중 관리와 몸의 균형 회복을 돕는 프리미엄 코칭입니다.",
    icon: "Scale",
  },
  {
    badge: "전문강사",
    title: "건강 교육 강연",
    desc: "누구나 이해하기 쉬운 건강 교육과 라이프스타일 강연을 진행합니다.",
    icon: "Presentation",
  },
  {
    badge: "전문강사",
    title: "아로마 테라피",
    desc: "아로마 테라피를 통해 심신 안정과 일상 속 휴식을 제공합니다.",
    icon: "Flower2",
  },
] as const;

type ExpertiseItem = (typeof expertiseData)[number];

type ExpertiseCardProps = {
  item: ExpertiseItem;
  Icon: LucideIcon;
  reduceMotion: boolean;
};

function ExpertiseCard({ item, Icon, reduceMotion }: ExpertiseCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const animateCard = (isHovering: boolean) => {
    const card = cardRef.current;
    const badge = badgeRef.current;
    const icon = iconRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const duration = reduceMotion ? 0 : 0.3;
    const ease: gsap.EaseString = "power2.out";
    const targets = [card, badge, icon, title, desc].filter(Boolean) as gsap.TweenTarget[];

    gsap.killTweensOf(targets);

    if (isHovering) {
      if (card) gsap.to(card, { ...CARD_HOVER, duration, ease });
      if (badge) gsap.to(badge, { ...BADGE_HOVER, duration, ease });
      if (icon) gsap.to(icon, { ...ICON_HOVER, duration, ease });
      if (title) gsap.to(title, { color: "#ffffff", duration, ease });
      if (desc) gsap.to(desc, { color: "#ffffff", duration, ease });
      return;
    }

    if (card) gsap.to(card, { ...CARD_REST, duration, ease });
    if (badge) gsap.to(badge, { ...BADGE_REST, duration, ease });
    if (icon) gsap.to(icon, { ...ICON_REST, duration, ease });
    if (title) gsap.to(title, { color: "#2f3e6b", duration, ease });
    if (desc) gsap.to(desc, { color: "#5a6789", duration, ease });
  };

  return (
    <article
      ref={cardRef}
      className="expertise-card relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-border bg-white p-6 shadow-lg shadow-primary/8"
      onMouseEnter={() => animateCard(true)}
      onMouseLeave={() => animateCard(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          ref={badgeRef}
          className="expertise-card-badge rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-200/70"
        >
          {item.badge}
        </span>
        <div
          ref={iconRef}
          className="expertise-card-icon flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary"
        >
          <Icon className="size-6" strokeWidth={1.8} aria-hidden />
        </div>
      </div>

      <h3
        ref={titleRef}
        className="expertise-card-title mt-8 text-xl font-semibold tracking-tight text-deep-blue"
      >
        {item.title}
      </h3>
      <p
        ref={descRef}
        className="expertise-card-desc mt-4 text-sm leading-7 text-muted-foreground sm:text-[15px]"
      >
        {item.desc}
      </p>
    </article>
  );
}

export function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const shouldReduceMotion = reduceMotion ?? false;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    ensureScrollTrigger();

    const cards = gsap.utils.toArray<HTMLElement>(".expertise-card", section);

    const ctx = gsap.context(() => {
      if (!shouldReduceMotion) {
        gsap.from(cards, {
          y: 64,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });
      }
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
    };
  }, [shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-card px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="expertise-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-linear-to-b from-secondary/80 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-16 -z-10 size-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Expertise</SectionEyebrow>
          <h2
            id="expertise-title"
            className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-deep-blue sm:text-4xl lg:text-5xl"
          >
            면역을 중심으로 삶의 균형을 설계하는 전문성
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            건강 상담, 다이어트 코칭, 교육 강연, 아로마 테라피까지 한 사람의
            일상에 맞춘 통합 케어를 제공합니다.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {expertiseData.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <ExpertiseCard
                key={item.title}
                item={item}
                Icon={Icon}
                reduceMotion={shouldReduceMotion}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
