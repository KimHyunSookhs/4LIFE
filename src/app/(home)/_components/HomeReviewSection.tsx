"use client";

/**
 * 홈 고객 후기 섹션 (카드 그리드 + Framer Motion 진입 애니메이션)
 *
 * - 카드가 뷰포트에 들어올 때만 살짝 아래(16px)에서 올라오며 투명도가 1로 맞춰진다.
 *   “갑자기 나타나기”보다 짧고 부드러운 등장으로 시선만 자연스럽게 유도한다.
 * - framer-motion `whileInView` + `viewport.once`: 스크롤 후 한 번만 재생(되감기·반복 없음).
 * - `useReducedMotion()`: OS/브라우저가 ‘움직임 줄이기’를 켜면 duration 0에 가깝게 처리해
 *   어지럼·민감 사용자에게 부담을 주지 않는다. (신뢰 지표 `MetricCounter`와 같은 취지)
 */

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/src/components/common/Button";

export const homeReviews = [
  {
    id: 1,
    image: "/images/review/review1.png",
    name: "김○○",
    age: "50대",
    content:
      "상담을 통해 제 상황에 맞는 제품을 추천받고 꾸준히 관리하게 됐습니다. 설명도 이해하기 쉽게 해주셔서 부담 없이 시작할 수 있었어요.",
    highlight: "맞춤 상담",
  },
  {
    id: 2,
    image: "/images/review/review2.png",
    name: "이○○",
    age: "60대",
    content:
      "어떤 제품을 선택해야 할지 고민이 많았는데 상담을 통해 쉽게 이해할 수 있었습니다. 지금은 꾸준히 챙기며 관리하고 있습니다.",
    highlight: "쉬운 설명",
  },
  {
    id: 3,
    image: "/images/review/review3.png",
    name: "박○○",
    age: "50대",
    content:
      "단순히 제품만 판매하는 것이 아니라 계속 신경 써주셔서 안심이 됩니다. 자연스럽게 재구매로 이어지고 있습니다.",
    highlight: "지속 관리",
  },
];

/** 카드마다 약간씩 늦게 시작하는 간격(ms) — 1번 0ms, 2번 80ms, 3번 160ms … */
const STAGGER_DELAY_MS = 80;
/** 한 장의 등장 길이 — 요청: 300ms */
const ENTRANCE_DURATION_S = 0.3;
/** 아래에서 살짝 떠오르는 거리(px) — 요청: 16px */
const ENTRANCE_Y_PX = 16;

export function HomeReviewSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="home-review-title"
      className="bg-white px-5 py-18 sm:px-8 sm:py-24"
    >
      {/*
        세로 스택 + 가로 가운데: `flex flex-col items-center` 한 번만 쓴다.
        주의: `items-center` 만 있고 자식 너비를 안 주면 그리드가 “내용물만큼만” 줄어들 수 있어,
        카드 행에는 반드시 `w-full`을 준다. (Flutter: Column(center) 아래에서 ListView에
        width: double.infinity / Expanded 를 줘야 가득 차는 것과 같다.)
        `justify-center items-center`만 달고 `display:flex`가 없으면 Tailwind에서 아무 효과 없다.
      */}
      <div className="mx-auto flex max-w-6xl flex-col items-center">
        <div className="w-full max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.28em] text-primary uppercase">
            Real Review
          </p>
          <h2
            id="home-review-title"
            className="mt-3 text-2xl font-semibold tracking-tight text-deep-blue sm:text-4xl"
          >
            상담 후 달라진 고객 경험
          </h2>
          <h3 className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            제품을 고르는 순간부터 꾸준히 관리하는 과정까지, 고객님들이 실제로
            느낀 상담 경험을 담았습니다.
          </h3>
        </div>

        <div className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homeReviews.map((review, index) => (
            <motion.article
              key={review.id}
              className="flex h-full flex-col overflow-hidden rounded-3xl border border-primary/12 bg-card shadow-lg shadow-primary/8 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/14"
              /*
               * initial: 화면에 닿기 전 상태 — 살짝 아래·투명 (reduced motion이면 처음부터 최종 상태)
               * whileInView: 섹션이 스크롤로 보일 때 최종 상태로만 한 번 맞춤
               */
              initial={
                reduceMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: ENTRANCE_Y_PX }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: ENTRANCE_DURATION_S,
                      delay: (index * STAGGER_DELAY_MS) / 1000,
                      ease: "easeOut",
                    }
              }
              /*
               * 호버 시 위로 4px — 기존 Tailwind translate와 motion의 y가 겹치면 transform이 싸울 수 있어
               * 세로 이동은 motion `whileHover`에만 둔다. (4px ≈ Tailwind translate-y-1)
               */
              whileHover={reduceMotion ? undefined : { y: -4 }}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-secondary/30">
                <Image
                  src={review.image}
                  alt={`${review.age} ${review.name} 고객 후기 이미지`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="w-fit rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                  {review.highlight}
                </span>

                <blockquote className="mt-5 flex-1 text-lg leading-8 font-medium text-deep-blue sm:text-xl sm:leading-9">
                  “{review.content}”
                </blockquote>

                <p className="mt-6 border-t border-primary/10 pt-5 text-base font-semibold text-muted-foreground/80">
                  {review.age} · {review.name}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <Button
          text="리뷰 더 보기"
          href="/reviews"
          fullWidth={false}
          className="mt-10"
        />
      </div>
    </section>
  );
}
