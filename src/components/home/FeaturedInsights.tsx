import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { getArticles } from "@/lib/content/api";

export async function FeaturedInsights() {
  const articles = (await getArticles()).slice(0, 3);
  if (!articles.length) return null;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Insights" title="Nội dung mới nhất" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button href="/insights" variant="secondary">
            Xem tất cả Insights
          </Button>
        </div>
      </Container>
    </section>
  );
}
