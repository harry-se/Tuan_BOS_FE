import { Hero } from "@/components/home/Hero";
import { ProblemSection } from "@/components/home/ProblemSection";
import { BosOverview } from "@/components/home/BosOverview";
import { WhyTony } from "@/components/home/WhyTony";
import { Evidence } from "@/components/home/Evidence";
import { FeaturedInsights } from "@/components/home/FeaturedInsights";
import { BooksCoursesTeaser } from "@/components/home/BooksCoursesTeaser";
import { CommunityTeaser } from "@/components/home/CommunityTeaser";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <BosOverview />
      <WhyTony />
      <Evidence />
      <FeaturedInsights />
      <BooksCoursesTeaser />
      <CommunityTeaser />
      <FinalCta />
    </>
  );
}
