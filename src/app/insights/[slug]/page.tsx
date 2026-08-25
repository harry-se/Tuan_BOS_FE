import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { PillarBadge } from "@/components/ui/Badge";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { getArticleBySlug, getArticles } from "@/lib/content/api";
import { formatDateVi } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, type: "article" },
  };
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = await getArticles();
  const related = allArticles.filter((a) => a.slug !== article.slug && (a.pillar === article.pillar || a.system === article.system)).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": article.contentType === "video" ? "VideoObject" : "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: { "@type": "Person", name: article.author.name },
  };

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <nav className="mb-6 text-sm text-charcoal/60" aria-label="breadcrumb">
          <Link href="/insights" className="hover:text-navy">
            Insights
          </Link>{" "}
          / <span>{article.title}</span>
        </nav>

        <div className="mb-4 flex items-center gap-3">
          <PillarBadge pillar={article.pillar} />
          <span className="text-xs text-charcoal/50">{formatDateVi(article.publishedAt)}</span>
          <span className="text-xs text-charcoal/50">{article.readingTime} phút đọc</span>
        </div>

        <h1 className="text-3xl font-semibold sm:text-4xl">{article.title}</h1>
        <p className="mt-4 text-lg text-charcoal/75">{article.excerpt}</p>

        {article.contentType === "video" && article.youtubeUrl ? (
          <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-navy/10">
            <iframe
              className="h-full w-full"
              src={toYoutubeEmbed(article.youtubeUrl)}
              title={article.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : null}

        <div className="prose-tuanbos mt-8 text-charcoal/85">
          {article.body.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-navy/15 px-3 py-1 text-xs text-charcoal/70">
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-navy/10 bg-white/70 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">Tác giả</p>
          <p className="mt-1 font-semibold text-navy">{article.author.name}</p>
          <p className="text-sm text-charcoal/70">{article.author.role}</p>
          <p className="mt-2 text-sm text-charcoal/75">{article.author.bioShort}</p>
        </div>

        <div className="mt-10 rounded-2xl bg-navy p-6 text-center text-ivory">
          <p className="font-semibold">Muốn biết doanh nghiệp bạn đang mạnh/yếu ở đâu?</p>
          <Link href="/assessment" className="mt-3 inline-block rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink">
            Đánh giá Hệ điều hành doanh nghiệp
          </Link>
        </div>

        {related.length ? (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-semibold text-navy">Nội dung liên quan</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </article>
  );
}

function toYoutubeEmbed(url: string) {
  try {
    const parsed = new URL(url);
    const id = parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
    return `https://www.youtube-nocookie.com/embed/${id}`;
  } catch {
    return url;
  }
}
