"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { fadeUp } from "@/src/app/about/components/_shared/fade-up";
import { SectionEyebrow } from "@/src/app/about/components/_shared/SectionEyebrow";

/** 대표 포트레이트 — `public/images/ceo/ceo1.jpeg` */
const ABOUT_CEO_PORTRAIT_SRC = "/images/ceo/ceo1.jpeg";

const trustCards = [
  {
    marker: "12년",
    title: "면역 건강 분야 활동",
    description: "현장 중심의 건강 상담과 꾸준한 관리 경험을 바탕으로 함께합니다.",
  },
  {
    marker: "27년",
    title: "연구 기반 기업과 함께",
    description: "면역 연구 중심의 제품 철학을 이해하고 필요한 방향을 차분히 전합니다.",
  },
  {
    marker: "전문",
    title: "면역·건강 관련 자격 보유",
    description: "강사 및 전문 교육 이수 경험을 토대로 건강한 라이프 루틴을 제안합니다.",
  },
];

/** 스크롤로 해당 섹션이 들어올 때만 연출 (상단 SectionHero 다음 영역) */
const heroEnterViewport = { once: true, amount: 0.22, margin: "0px 0px -48px 0px" } as const;

function PortraitVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[19.5rem] sm:max-w-sm lg:max-w-[25.5rem] xl:max-w-[27rem]"
      initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={heroEnterViewport}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.9, delay: 0.18, ease: "easeOut" }}
    >
      <div className="absolute -inset-5 rounded-[2.75rem] bg-linear-to-br from-primary/14 via-secondary-bright/16 to-card blur-2xl" />
      <div className="relative overflow-hidden rounded-[2.35rem] border border-white/90 bg-card shadow-[0_28px_70px_rgba(17,35,75,0.14)] ring-1 ring-deep-blue/5">
        <div className="relative aspect-4/5 w-full">
          <Image
            src={ABOUT_CEO_PORTRAIT_SRC}
            alt="박연복 대표 사진"
            fill
            className="object-cover object-[center_22%] sm:object-center"
            sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 432px"
            priority
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-linear-to-t from-deep-blue/88 via-deep-blue/38 to-transparent"
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 p-6 text-card sm:p-8">
            <p className="text-sm font-semibold tracking-[0.24em] text-secondary-bright/90 uppercase">
              CEO
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">대표 박연복</p>
          </div>
        </div>
      </div>
    
    </motion.div>
  );
}

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="about-ceo-heading"
      className="relative isolate w-full overflow-hidden bg-linear-to-br from-background via-secondary/65 to-card px-5 py-[clamp(5.5rem,10svh,7.5rem)] sm:px-8 lg:py-[clamp(6rem,11svh,8rem)]"
    >
      <div className="pointer-events-none absolute -left-24 top-16 size-80 rounded-full bg-primary/9 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-secondary-bright/16 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_16%,rgba(255,255,255,0.75),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.42),transparent_45%)]" />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 sm:gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-16">
        <motion.div
          className="text-center lg:text-left"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
          }}
          initial={reduceMotion ? "visible" : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={heroEnterViewport}
        >
          <motion.div variants={fadeUp} transition={{ duration: reduceMotion ? 0 : 0.65 }}>
            <SectionEyebrow>About CEO</SectionEyebrow>
          </motion.div>

          <motion.h1
            id="about-ceo-heading"
            className="mx-auto mt-5 max-w-2xl text-[clamp(2.5rem,7vw,4rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-deep-blue lg:mx-0"
            variants={fadeUp}
            transition={{ duration: reduceMotion ? 0 : 0.72, ease: "easeOut" }}
          >
            면역 중심의 건강 철학으로
            <br />
            삶의 변화를 함께 만들어갑니다
          </motion.h1>

          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 font-semibold text-primary sm:text-xl lg:mx-0 lg:text-2xl lg:leading-9"
            variants={fadeUp}
            transition={{ duration: reduceMotion ? 0 : 0.72, ease: "easeOut" }}
          >
            면역을 중심으로 건강한 삶의 방향을 제안합니다
          </motion.p>

          <motion.div
            className="mx-auto mt-6 flex max-w-2xl flex-col gap-4 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9 lg:mx-0"
            variants={fadeUp}
            transition={{ duration: reduceMotion ? 0 : 0.72, ease: "easeOut" }}
          >
            <p>
              건강은 단순한 관리가 아니라 삶의 방향과 습관에서 시작된다고 믿습니다.
            </p>
            <p>
              박연복 대표는 12년간 면역 건강 분야에서 다양한 사람들과 함께하며,
              건강 상담과 라이프 루틴, 그리고 건강 비즈니스의 가능성을 연결해왔습니다.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-9 grid max-w-2xl gap-3 sm:grid-cols-3 lg:mx-0 lg:mt-10"
            variants={fadeUp}
            transition={{ duration: reduceMotion ? 0 : 0.72, ease: "easeOut" }}
          >
            {trustCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[1.5rem] border border-white/80 bg-white/78 p-5 text-left shadow-[0_18px_42px_rgba(17,35,75,0.08)] backdrop-blur"
              >
                <span className="inline-flex rounded-full bg-primary/8 px-3 py-1 text-sm font-semibold text-primary">
                  {card.marker}
                </span>
                <h2 className="mt-4 text-base leading-7 font-semibold text-deep-blue">
                  {card.title}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {card.description}
                </p>
              </article>
            ))}
          </motion.div>
        </motion.div>

        <PortraitVisual />
      </div>
    </section>
  );
}
