import Link from "next/link";

import { PillarBadge } from "@/components/ui/Badge";
import type { Article } from "@/lib/content/types";
import { formatDateVi } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="flex flex-col rounded-2xl border border-navy/10 bg-white p-6 transition-shadow hover:shadow-lg"
    >
      <div className="mb-3 flex items-center gap-2">
        <PillarBadge pillar={article.pillar} />
        {article.contentType === "video" ? (
          <span className="text-xs font-medium uppercase tracking-wide text-charcoal/50">Video</span>
        ) : null}
      </div>
      <h3 className="text-lg font-semibold text-navy">{article.title}</h3>
      <p className="mt-2 flex-1 text-sm text-charcoal/75">{article.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-charcoal/50">
        <span>{formatDateVi(article.publishedAt)}</span>
        <span>{article.readingTime} phút đọc</span>
      </div>
    </Link>
  );
}
