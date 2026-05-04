import type { Metadata } from "next";
import { ReviewsStoriesSection } from "./_components/ReviewsStoriesSection";
import { SectionHero } from "@/src/components/common/SectionHero";

/**
 * /reviews — 고객후기
 */

export const metadata: Metadata = {
  title: "삶의 변화 기록",
  description:
    "건강 상담과 루틴을 통해 일상 속 변화를 경험한 고객들의 이야기를 전합니다.",
};

export default function ReviewsPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-background">
          <SectionHero
          label="REVIEWS"
          title="고객후기"
          splitDescriptionByNewline
          description="건강 상담과 루틴을 통해 일상 속 변화를 경험한 고객들의 이야기를 전합니다."
        />
      <ReviewsStoriesSection />
    </div>
  );
}
