"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/src/app/about/components/_shared/Reveal";
import { SectionEyebrow } from "@/src/app/about/components/_shared/SectionEyebrow";

const timelineItems = [
  {
    title: "다이아몬드 승급",
    description:
      "꾸준한 고객 관리와 팀 성장을 통해 신뢰 기반 비즈니스의 첫 큰 기준을 세웠습니다.",
  },
  {
    title: "프레지덴셜 승급",
    description:
      "개인의 성과를 넘어 파트너가 함께 성장하는 리더십 구조를 만들었습니다.",
  },
  {
    title: "브론즈 → 브론즈 엘리트 → 실버",
    description:
      "단계별 목표를 현실적인 실행으로 연결하며 조직의 지속 가능한 성장을 증명했습니다.",
  },
  {
    title: "Great Escape 성과",
    description:
      "시간과 장소의 제약을 줄이고, 가족과 팀이 함께 누리는 삶의 확장을 경험했습니다.",
  },
] as const;

export function TimelineSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-background px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="timeline-title">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Growth Timeline</SectionEyebrow>
          <h2
            id="timeline-title"
            className="mt-4 text-3xl leading-tight font-semibold tracking-tight text-deep-blue sm:text-4xl"
          >
            성장은 직함이 아니라, 함께 오른 사람들의 이야기입니다.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-linear-to-b from-primary/0 via-primary/35 to-primary/0 lg:left-1/2" />

          <div className="space-y-8">
            {timelineItems.map((item, index) => (
              <motion.article
                key={item.title}
                className={`relative grid gap-5 pl-12 lg:grid-cols-[1fr_48px_1fr] lg:pl-0 ${
                  index % 2 === 0 ? "" : "lg:[&>div:last-child]:col-start-3"
                }`}
                initial={reduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 34, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.36 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.62, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <div className="absolute left-4 top-8 size-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary shadow-lg shadow-primary/30 lg:left-1/2" />
                <div
                  className={`rounded-[2rem] border border-primary/12 bg-card p-6 shadow-xl shadow-primary/8 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/18 sm:p-7 ${
                    index % 2 === 0 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-3 lg:row-start-1"
                  }`}
                >
                  <p className="text-sm font-semibold text-primary">STEP 0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-deep-blue">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-8 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
