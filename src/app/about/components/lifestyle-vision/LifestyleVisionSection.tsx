"use client";

import { Reveal } from "@/src/app/about/components/_shared/Reveal";
import { SectionEyebrow } from "@/src/app/about/components/_shared/SectionEyebrow";

const lifestyleItems = [
  {
    title: "가족과 함께 오래 지속할 수 있는 삶",
    description: "건강과 일상의 균형을 함께 만들어갑니다.",
  },
  {
    title: "내 삶의 리듬을 스스로 선택하는 시간",
    description: "조급함보다 지속 가능한 방향을 중요하게 생각합니다.",
  },
  {
    title: "건강과 성장이 함께 이어지는 방향",
    description: "삶과 일이 자연스럽게 연결되는 구조를 지향합니다.",
  },
  {
    title: "좋은 경험을 다시 사람들에게 전하는 가치",
    description: "받은 변화를 다시 나누는 삶을 추구합니다.",
  },
] as const;

type LifestyleItem = (typeof lifestyleItems)[number];

type EditorialValueItemProps = {
  item: LifestyleItem;
  index: number;
};

function EditorialValueItem({ item, index }: EditorialValueItemProps) {
  const itemNumber = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={index * 0.08}>
      <article className="group grid gap-5 border-t border-deep-blue/10 py-8 transition-opacity duration-300 hover:opacity-95 sm:grid-cols-[4.5rem_1fr] sm:gap-8 sm:py-10">
        <p className="font-serif text-2xl leading-none text-primary/45 transition-colors duration-300 group-hover:text-primary/70 sm:text-3xl">
          {itemNumber}
        </p>
        <div>
          <h3 className="max-w-xl text-2xl leading-tight font-semibold tracking-[-0.035em] text-deep-blue sm:text-3xl">
            {item.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
            {item.description}
          </p>
        </div>
      </article>
    </Reveal>
  );
}

export function LifestyleVisionSection() {
  return (
    <section
      className="relative isolate overflow-hidden bg-card px-5 py-24 sm:px-8 sm:py-32 lg:py-36"
      aria-labelledby="vision-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(153,194,255,0.14),transparent_30%),radial-gradient(circle_at_88%_80%,rgba(255,255,255,0.9),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(238,243,255,0.24)_48%,rgba(255,255,255,0.4))]" />
      <div className="pointer-events-none absolute right-[8%] top-24 h-52 w-52 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute bottom-16 left-[6%] h-64 w-64 rounded-full bg-secondary-bright/14 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="max-w-4xl">
          <SectionEyebrow>Philosophy & Vision</SectionEyebrow>
          <h2
            id="vision-title"
            className="mt-5 max-w-3xl text-4xl leading-[1.08] font-semibold tracking-[-0.05em] text-deep-blue sm:text-5xl lg:text-6xl"
          >
            건강은
            <br />
            삶의 방향에서 시작됩니다
          </h2>
          <div className="mt-8 grid max-w-5xl gap-5 text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9 lg:grid-cols-[1fr_1fr] lg:gap-10">
            <p>
              박연복 대표는 건강을 단순한 제품이나 관리의 개념이 아닌, 삶의 방향과
              관계, 그리고 지속 가능한 루틴으로 바라봅니다.
            </p>
            <div className="flex flex-col gap-5">
              <p>
                누군가는 건강을 회복하고, 누군가는 새로운 기회를 발견하며, 또 다른
                누군가는 가족과 더 나은 삶을 만들어갑니다.
              </p>
              <p>
                대표님의 비전은 더 많은 사람들이 건강과 성장의 가능성을 자신의 삶
                속에서 직접 경험하도록 돕는 것입니다.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal direction="left" className="relative">
            <div className="sticky top-28 hidden lg:block">
              <p className="text-sm font-semibold tracking-[0.22em] text-primary/75 uppercase">
                Brand Manifesto
              </p>
              <p className="mt-5 max-w-xs text-2xl leading-9 font-semibold tracking-[-0.035em] text-deep-blue">
                오래 지속되는 건강은
                <br />
                조용한 일상의 가치에서 시작됩니다.
              </p>
              <div className="mt-10 h-px w-24 bg-primary/30" />
              <p className="mt-8 max-w-xs text-sm leading-7 text-muted-foreground">
                빠른 설득보다 오래 남는 신뢰를, 과장된 약속보다 함께 이어갈 수
                있는 방향을 중요하게 생각합니다.
              </p>
            </div>
          </Reveal>

          <div>
            <div className="mb-8 lg:hidden">
              <p className="text-sm font-semibold tracking-[0.22em] text-primary/75 uppercase">
                Brand Manifesto
              </p>
              <p className="mt-3 text-xl leading-8 font-semibold tracking-[-0.03em] text-deep-blue">
                오래 지속되는 건강은 조용한 일상의 가치에서 시작됩니다.
              </p>
            </div>
            <div className="border-b border-deep-blue/10">
              {lifestyleItems.map((item, index) => (
                <EditorialValueItem
                  key={item.title}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
