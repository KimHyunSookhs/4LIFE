export const representativeProducts = [
  {
    id: "p1",
    category: "Immune Support",
    title: "트랜스퍼팩터 제품",
    imageUrl: "/images/products/transpector.png",
    description:
      "신체 면역 체계의 기억과 인식을 돕는 핵심 성분을 담아 건강한 삶의 기초를 제안합니다.",
    tags: ["면역력", "베스트셀러", "건강기능식품"],
    actionLink: "/products/transfer-factor",
  },
  {
    id: "p2",
    category: "Total Care",
    title: "헬스케어 제품",
    imageUrl: "/images/products/healthcare.png",
    description:
      "전문적인 기술력을 바탕으로 일상의 활력을 되찾아주는 체계적인 헬스케어 솔루션입니다.",
    tags: ["활력 에너지", "종합 비타민", "라이프스타일"],
    actionLink: "/products/healthcare",
  },
  {
    id: "p3",
    category: "Hydration & Beauty",
    title: "물 아쿠아 제품",
    imageUrl: "/images/products/aqua.png",
    description:
      "내면부터 채워지는 수분 에너지와 맑고 깨끗한 아름다움을 위한 아쿠아 라인입니다.",
    tags: ["수분 보충", "이너뷰티", "프리미엄 워터"],
    actionLink: "/products/aqua",
  },
] as const;

export type RepresentativeProduct = (typeof representativeProducts)[number];
