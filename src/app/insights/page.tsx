import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { InsightsExplorer } from "@/components/insights/InsightsExplorer";
import { getArticles } from "@/lib/content/api";

export const metadata: Metadata = {
  title: "Insights",
  description: "Bài viết, video và framework theo BUILD · OPERATE · SCALE.",
};

export default async function InsightsPage() {
  const articles = await getArticles();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Knowledge Hub</p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">Insights</h1>
        <p className="mt-4 max-w-2xl text-lg text-charcoal/80">
          Bài viết và video đúc kết từ thực chiến, gắn với 3 Pillars và 9 Systems của TUAN.BOS.
        </p>

        <div className="mt-10">
          <InsightsExplorer articles={articles} />
        </div>
      </Container>
    </div>
  );
}
