"use client";

import { motion, useReducedMotion } from "framer-motion";

const storyCards = [
  {
    category: "건강 루틴",
    quote: "건강을 단순히 관리하는 게 아니라 일상을 다시 돌아보게 되었습니다.",
    person: "박OO",
    meta: "자영업",
  },
  {
    category: "일상의 리듬",
    quote: "예전보다 아침을 조금 더 가볍게 시작하게 되었고, 생활 루틴도 자연스럽게 바뀌었습니다.",
    person: "김OO",
    meta: "40대 직장인",
  },
  {
    category: "상담 경험",
    quote: "부담 없이 상담할 수 있어서 좋았습니다. 제 생활에 맞는 방향을 차분히 이야기해 주셨어요.",
    person: "이OO",
    meta: "50대 주부",
  },
  {
    category: "가족과 함께",
    quote: "혼자보다 가족과 함께 시작할 수 있어서 더 좋았습니다. 서로 챙기는 시간이 생겼어요.",
    person: "정OO",
    meta: "60대 부부",
  },
  {
    category: "생활 습관",
    quote: "건강을 챙기면서 잠, 식사, 움직임 같은 기본적인 생활 패턴도 함께 보게 되었습니다.",
    person: "최OO",
    meta: "50대 프리랜서",
  },
  {
    category: "마음가짐",
    quote: "무언가를 급하게 바꾸기보다 오래 이어갈 수 있는 방향을 찾게 된 점이 가장 좋았습니다.",
    person: "한OO",
    meta: "40대 직장인",
  },
] as const;

const featuredStory = {
  question: "Q. 가장 달라진 점은 무엇인가요?",
  quote:
    "건강을 챙기는 일이 어렵고 부담스러운 숙제처럼 느껴졌는데, 상담 후에는 제 일상 안에서 할 수 있는 작은 루틴부터 바라보게 되었습니다.",
  detail:
    "제품 하나를 선택하는 경험보다, 내 몸의 리듬과 생활 습관을 다시 살피는 시간이 되었다는 점이 오래 기억에 남았습니다.",
  person: "윤OO",
  meta: "50대 · 가족과 함께 시작",
};

const duplicatedStories = [...storyCards, ...storyCards];

export function ReviewsStoriesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="reviews-stories-title"
      className="relative isolate overflow-hidden bg-linear-to-b from-secondary via-background to-card px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(153,194,255,0.18),transparent_28%),radial-gradient(circle_at_88%_82%,rgba(255,255,255,0.85),transparent_30%)]" />
      <div className="pointer-events-none absolute left-[8%] top-28 size-56 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 right-[10%] size-72 rounded-full bg-secondary-bright/12 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.32em] text-primary/75 uppercase">
            Transformation Stories
          </p>
          <h1
            id="reviews-stories-title"
            className="mt-5 text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-deep-blue sm:text-5xl lg:text-6xl"
          >
            작은 변화가
            <br />
            일상의 방향을 바꾸기 시작했습니다
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
            건강 상담과 루틴을 통해 많은 분들이 자신만의 속도로 변화를 경험하고
            있습니다. 이곳의 이야기는 과장된 결과보다, 일상 안에서 조용히 이어진
            방향의 기록에 가깝습니다.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex w-max gap-5"
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={
              reduceMotion
                ? undefined
                : { duration: 42, repeat: Infinity, ease: "linear" }
            }
          >
            {duplicatedStories.map((story, index) => (
              <motion.article
                key={`${story.person}-${story.category}-${index}`}
                className="w-[19rem] shrink-0 rounded-[1.75rem] border border-white/70 bg-white/70 p-6 shadow-[0_18px_46px_rgba(17,35,75,0.08)] backdrop-blur-xl sm:w-[22rem] sm:p-7"
                whileHover={reduceMotion ? undefined : { y: -5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <p className="text-xs font-semibold tracking-[0.22em] text-primary/70 uppercase">
                  {story.category}
                </p>
                <blockquote className="mt-7 text-xl leading-9 font-medium tracking-[-0.025em] text-deep-blue">
                  “{story.quote}”
                </blockquote>
                <p className="mt-8 border-t border-deep-blue/10 pt-5 text-sm font-semibold text-muted-foreground">
                  {story.person} · {story.meta}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <motion.article
          className="mt-20 grid gap-10 border-y border-deep-blue/10 py-12 sm:py-16 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.72, ease: "easeOut" }}
        >
          <div>
            <p className="text-sm font-semibold tracking-[0.24em] text-primary/75 uppercase">
              Featured Story
            </p>
            <p className="mt-5 max-w-sm text-2xl leading-9 font-semibold tracking-[-0.035em] text-deep-blue">
              제품보다 먼저, 한 사람의 생활을 듣는 상담에서 시작된 이야기
            </p>
          </div>
          <div>
            <p className="text-base font-semibold text-primary">{featuredStory.question}</p>
            <blockquote className="mt-5 text-3xl leading-tight font-semibold tracking-[-0.045em] text-deep-blue sm:text-4xl sm:leading-tight">
              “{featuredStory.quote}”
            </blockquote>
            <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
              {featuredStory.detail}
            </p>
            <p className="mt-8 text-sm font-semibold text-muted-foreground">
              {featuredStory.person} · {featuredStory.meta}
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
