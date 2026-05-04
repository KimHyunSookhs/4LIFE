"use client";

import { Award, Repeat, Users, type LucideIcon } from "lucide-react";

import { MetricCounter } from "@/src/components/animations/MetricCounter";

/**
 * 홈 신뢰 지표 섹션.
 *
 * 목적:
 * - 방문자가 상품 설명을 보기 전에 “이 상담자는 믿고 물어봐도 되겠다”는 인상을 받도록 돕는다.
 * - 노년층/중장년층 타겟을 고려해 과한 색·움직임을 피하고, 큰 글자와 넉넉한 여백으로 읽기 쉽게 만든다.
 * - 수치는 스크롤로 섹션이 보일 때 한 번만 `MetricCounter`로 올라가며, 시스템 설정이
 *   “모션 줄이기”이면 즉시 최종 숫자만 표시한다.
 *
 *
 * Flutter 비유:
 * - `StatCard`마다 다른 `IconData`를 두고, 마지막 카드만 `Container`에 테두리+둥근 배지 박스를
 *   입혀 `Icon`을 감싸는 것과 비슷합니다.
 */

const ICON_STROKE = 1.25;

type TrustItemConfig = {
  label: string;
  numericValue: number;
  suffix: string;
  groupThousands: boolean;
  description: string;
  Icon: LucideIcon;
};

const TRUST_ITEMS: TrustItemConfig[] = [
  {
    label: "상담 고객 수",
    numericValue: 1000,
    suffix: "+",
    groupThousands: true,
    description: "건강 고민을 함께 나눈 누적 상담 경험",
    Icon: Users,
  },
  {
    label: "재구매율",
    numericValue: 80,
    suffix: "% 이상",
    groupThousands: false,
    description: "한 번의 구매보다 꾸준한 관리에 집중",
    Icon: Repeat,
  },
  {
    label: "상담 경험",
    numericValue: 10,
    suffix: "년 이상",
    groupThousands: false,
    description: "체질과 생활 습관을 함께 살피는 상담",
    Icon: Award,
  },
];

function TrustMetricIconShell({ Icon }: { Icon: LucideIcon }) {
  return (
    <span
      className={
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary ring-1 ring-border sm:size-10"
      }
      aria-hidden
    >
      <Icon
        className={"size-[1.2rem] text-primary sm:size-[1.35rem]"}
        strokeWidth={ICON_STROKE}
        absoluteStrokeWidth={false}
      />
    </span>
  );
}

export function HomeTrustSection() {
  return (
    <section
      className="bg-white px-4 py-12 sm:px-5 sm:py-16"
      aria-labelledby="home-trust-heading"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* 상단 카피: 숫자보다 먼저 “왜 믿을 수 있는지”를 부드럽게 설명 */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-primary sm:text-base">
            신뢰할 수 있는 건강 상담
          </p>
          <h2
            id="home-trust-heading"
            className="mt-2 text-3xl font-semibold tracking-tight text-deep-blue sm:text-3xl"
          >
            오랜 시간 쌓아온 신뢰, <br /> 수많은 고객이 증명합니다
          </h2>
          <h3 className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            숫자는 화려하게 보이기 위한 장식이 아니라, 고객 한 분 한 분과 오래
            쌓아 온 상담 경험을 보여 주는 기준입니다.
          </h3>
        </div>

        {/* 모바일 1열 / 태블릿 이상 3열: 큰 숫자, 짧은 설명, 차분한 카드 톤 */}
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {TRUST_ITEMS.map((item) => (
            <article
              key={item.label}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm shadow-primary/5 sm:p-6"
            >
              <div className="flex items-center gap-3 text-sm font-semibold text-deep-blue sm:text-base">
                <TrustMetricIconShell Icon={item.Icon} />
                <span className="text-primary">{item.label}</span>
              </div>
              <p className="mt-4 text-3xl font-bold tracking-tight text-deep-blue tabular-nums sm:text-4xl">
                <MetricCounter
                  value={item.numericValue}
                  suffix={item.suffix}
                  groupThousands={item.groupThousands}
                  duration={1.35}
                />
              </p>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base">
          상담 결과는 개인의 건강 상태와 생활 습관에 따라 달라질 수 있습니다.
          그래서 단순 판매보다 충분히 듣고 안내하는 과정을 중요하게 생각합니다.
        </p>
      </div>
    </section>
  );
}
