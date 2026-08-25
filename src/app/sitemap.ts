import type { MetadataRoute } from "next";

import { getArticles, getBooks, getCourses } from "@/lib/content/api";
import { siteConfig } from "@/lib/content/site";

const staticRoutes = [
  "",
  "/about",
  "/bos",
  "/advisory",
  "/insights",
  "/books",
  "/courses",
  "/community",
  "/resources",
  "/case-studies",
  "/events",
  "/contact",
  "/assessment",
  "/privacy",
  "/terms",
  "/refund",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = `https://${siteConfig.domain}`;
  const [articles, books, courses] = await Promise.all([getArticles(), getBooks(), getCourses()]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.6,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/insights/${a.slug}`,
    lastModified: a.updatedAt || a.publishedAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const bookEntries: MetadataRoute.Sitemap = books.map((b) => ({
    url: `${base}/books/${b.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const courseEntries: MetadataRoute.Sitemap = courses.map((c) => ({
    url: `${base}/courses/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...articleEntries, ...bookEntries, ...courseEntries];
}
