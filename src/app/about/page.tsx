import type { Metadata } from "next";
import { AboutCeoScrollProgress } from "@/src/app/about/components/about-scroll-progress/AboutCeoScrollProgress";
import { BeginningStorySection } from "@/src/app/about/components/beginning-story/BeginningStorySection";
import { ExpertiseSection } from "@/src/app/about/components/expertise/ExpertiseSection";
import { TimelineSection } from "@/src/app/about/components/timeline/TimelineSection";
import { TurningPointSection } from "@/src/app/about/components/turning-point/TurningPointSection";
import { SectionHero } from "@/src/components/common/SectionHero";
import { HeroSection } from "@/src/app/about/components/hero/HeroSection";

/**
 * /about — 대표님 소개
 * - 섹션 전용 UI는 `src/app/about/components/` 에 둔다.
 * - lg 이상에서 Beginning / Turning Point 섹션은 GSAP ScrollTrigger `pin` + `scrub` 을 사용한다.
 */

export const metadata: Metadata = {
  title: "대표님 소개",
  description:
    "12년 면역 전문 경험을 바탕으로 건강과 비즈니스를 연결하는 대표님 소개 페이지입니다.",
};

export default function AboutCeoPage() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col bg-background">
      <AboutCeoScrollProgress />
      <main className="relative min-h-screen bg-background">
        <SectionHero
          label="ABOUT CEO"
          title="대표 소개"
          splitDescriptionByNewline
          description="대표의 진심 어린 이야기와 면역 중심의 건강 철학을 전합니다."
        />
        <HeroSection />
        <BeginningStorySection />
        <TurningPointSection />
        <TimelineSection />
        <ExpertiseSection />
      </main>
    </div>
  );
}
