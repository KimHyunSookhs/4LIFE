import { HeroSection } from "@/src/app/(home)/_components/HeroSection";
import { HomeTrustSection } from "./(home)/_components/HomeTrustSection";
import { HomeProductSection } from "./(home)/_components/HomeProductSection";
import { HomeReviewSection } from "./(home)/_components/HomeReviewSection";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans">
      <HeroSection />
      <HomeProductSection />
      <HomeTrustSection />
      <HomeReviewSection />
    </div>
  );
}
