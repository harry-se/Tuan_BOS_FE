"use client";

import { useMemo, useState } from "react";

import { ArticleCard } from "@/components/insights/ArticleCard";
import { pillars } from "@/lib/content/pillars";
import type { Article, PillarCode } from "@/lib/content/types";

export function InsightsExplorer({ articles }: { articles: Article[] }) {
  const [pillarFilter, setPillarFilter] = useState<PillarCode | "all">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "article" | "video">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (pillarFilter !== "all" && a.pillar !== pillarFilter) return false;
      if (typeFilter !== "all" && a.contentType !== typeFilter) return false;
      if (query.trim() && !`${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [articles, pillarFilter, typeFilter, query]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="sr-only" htmlFor="insights-search">
          Tìm kiếm Insights
        </label>
        <input
          id="insights-search"
          type="search"
          placeholder="Tìm theo tiêu đề, tóm tắt, tag..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full max-w-sm rounded-full border border-navy/20 bg-white px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-gold"
        />

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={typeFilter === "all"} onClick={() => setTypeFilter("all")}>
            Tất cả
          </FilterChip>
          <FilterChip active={typeFilter === "article"} onClick={() => setTypeFilter("article")}>
            Bài viết
          </FilterChip>
          <FilterChip active={typeFilter === "video"} onClick={() => setTypeFilter("video")}>
            Video
          </FilterChip>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip active={pillarFilter === "all"} onClick={() => setPillarFilter("all")}>
          Tất cả Pillars
        </FilterChip>
        {pillars.map((p) => (
          <FilterChip key={p.code} active={pillarFilter === p.code} onClick={() => setPillarFilter(p.code)}>
            {p.code}
          </FilterChip>
        ))}
      </div>

      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-charcoal/70">Không tìm thấy nội dung phù hợp với bộ lọc hiện tại.</p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
        active ? "border-navy bg-navy text-ivory" : "border-navy/20 text-charcoal/75 hover:border-navy/50"
      }`}
    >
      {children}
    </button>
  );
}
