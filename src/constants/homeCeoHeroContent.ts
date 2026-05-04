/**
 * CEO(대표) 히어로 섹션에 표시할 문구·이미지·CTA 등 정적 데이터.
 */

export type HomeCeoHeroContent = {
  /** `public` 기준 정적 이미지 URL (절대 경로) */
  image: string;
  /** 대표 이름 */
  name: string;
  /** 직함·역할 한 줄 설명 */
  subtitle: string;
  /** 메인 슬로건 */
  slogan: string;
  /** 강조 bullet 리스트 (순서 유지) */
  highlights: readonly string[];
  // 버튼 등 CTA 문구
  cta: string;
};

export const homeCeoHeroContent: HomeCeoHeroContent = {
  /** 홈·공통 히어로와 동일하게 대표 사진(ceo1) 사용 */
  image: "/images/ceo/ceo1.jpeg",
  name: "박연복 대표",
  subtitle: "건강 상담 전문가",
  slogan: "면역 관리, 혼자 고민하지 마세요",
  highlights: ["1:1 맞춤 상담", "체질별 제품 추천", "꾸준한 관리까지"],
  cta: "상담하기",
};
