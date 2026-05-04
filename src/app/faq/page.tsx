import type { Metadata } from "next";
import { SectionHero } from "@/src/components/common/SectionHero";
import { FaqContent } from "./_components/FaqContent";

/**
 * /faq — 자주 묻는 질문
 */

export const metadata: Metadata = {
  title: "FAQ",
  description: "자주 묻는 질문과 답변입니다.",
};

export default function FaqPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-secondary">
      <SectionHero
        label="FAQ"
        title="건강한 선택을 위한 명확한 안내"
        description="제품과 상담 과정에서 자주 묻는 질문을 쉽게 이해할 수 있도록 정리합니다."
      />
      <div className="px-4 py-16 sm:py-20">
        <FaqContent />
      </div>
    </div>
  );
}
