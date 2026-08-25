// Single content-access layer used by pages. Wraps sanityFetch so templates
// never need to know whether data came from Sanity or local seed content.
import { sanityFetch } from "../sanity/fetch";
import type { Article, Book, CaseStudy, Course, EventItem, ResourceItem, Testimonial } from "./types";
import {
  seedArticles,
  seedBooks,
  seedCaseStudies,
  seedCourses,
  seedEvents,
  seedResources,
  seedTestimonials,
} from "./seed";

const articleProjection = `{
  "slug": slug.current,
  title,
  excerpt,
  "body": pt::text(body),
  "author": author->{name, role, bioShort, "photo": photo.asset->url},
  "pillar": pillar->code,
  "system": system->code,
  "topic": topic->name,
  tags,
  "cover": cover.asset->url,
  seoTitle,
  seoDescription,
  publishedAt,
  updatedAt,
  readingTime,
  contentType,
  youtubeUrl
}`;

export async function getArticles(): Promise<Article[]> {
  return sanityFetch<Article[]>(`*[_type == "article"] | order(publishedAt desc) ${articleProjection}`, {}, seedArticles);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const results = await sanityFetch<Article[]>(
    `*[_type == "article" && slug.current == $slug] ${articleProjection}`,
    { slug },
    seedArticles.filter((a) => a.slug === slug)
  );
  return results[0] ?? null;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return sanityFetch<CaseStudy[]>(
    `*[_type == "caseStudy"]{
      "slug": slug.current, clientLabel, industry, problem, baseline, intervention,
      "systems": systems[]->code, result, evidence, quote, "confidential": confidentialityFlag
    }`,
    {},
    seedCaseStudies
  );
}

export async function getBooks(): Promise<Book[]> {
  return sanityFetch<Book[]>(
    `*[_type == "book"]{
      "slug": slug.current, title, "cover": cover.asset->url, description, toc, sampleExcerpt,
      formats, priceVnd, reviews
    }`,
    {},
    seedBooks
  );
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const books = await getBooks();
  return books.find((b) => b.slug === slug) ?? null;
}

export async function getCourses(): Promise<Course[]> {
  return sanityFetch<Course[]>(
    `*[_type == "course"]{
      "slug": slug.current, title, outcome, audience, curriculum,
      "instructor": instructor->{name, role, bioShort}, deliveryMode, schedule,
      priceVnd, registrationOpen, faq
    }`,
    {},
    seedCourses
  );
}

export async function getCourseBySlug(slug: string): Promise<Course | null> {
  const courses = await getCourses();
  return courses.find((c) => c.slug === slug) ?? null;
}

export async function getResources(): Promise<ResourceItem[]> {
  return sanityFetch<ResourceItem[]>(
    `*[_type == "resource"]{
      "slug": slug.current, title, type, description, downloadUrl, gated,
      "pillar": pillar->code, "system": system->code
    }`,
    {},
    seedResources
  );
}

export async function getEvents(): Promise<EventItem[]> {
  return sanityFetch<EventItem[]>(
    `*[_type == "event"] | order(dateTime asc){
      "slug": slug.current, title, dateTime, location, online, capacity, fee, registrationOpen
    }`,
    {},
    seedEvents
  );
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return sanityFetch<Testimonial[]>(
    `*[_type == "testimonial" && consentGiven == true]{ name, title, company, quote, "consentGiven": consentGiven }`,
    {},
    seedTestimonials
  );
}
