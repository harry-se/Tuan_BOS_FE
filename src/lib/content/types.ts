// Shared content types mirroring the Sanity content model (requirements section 7).
// Used both for Sanity-fetched data and local seed/fallback data so pages can render
// identically regardless of source.

export type PillarCode = "BUILD" | "OPERATE" | "SCALE";

export interface Pillar {
  code: PillarCode;
  name: string;
  tagline: string;
  description: string;
  color: string; // token key, see lib/content/theme.ts
}

export interface System {
  code: string; // B1, B2, B3, O1, O2, O3, S1, S2, S3
  pillar: PillarCode;
  name: string;
  slug: string;
  commonProblems: string[];
  goal: string;
  mainModules: string[];
  tools: string[];
  expectedResults: string[];
  relatedInsightSlugs?: string[];
}

export type MaturityLevel = 1 | 2 | 3 | 4 | 5;

export interface MaturityStage {
  level: MaturityLevel;
  name: string;
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  systemCode: string;
  order: number;
  text: string;
}

export interface Author {
  name: string;
  role: string;
  photo?: string;
  bioShort: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  body: string; // markdown for seed content; portable text when sourced from Sanity
  author: Author;
  pillar: PillarCode;
  system: string;
  topic: string;
  tags: string[];
  cover?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  contentType: "article" | "video";
  youtubeUrl?: string;
}

export interface CaseStudy {
  slug: string;
  clientLabel: string;
  industry: string;
  problem: string;
  baseline: string;
  intervention: string;
  systems: string[];
  result: string;
  evidence: string;
  quote?: string;
  confidential: boolean;
}

export interface Book {
  slug: string;
  title: string;
  cover?: string;
  description: string;
  toc: string[];
  sampleExcerpt: string;
  formats: string[];
  priceVnd: number;
  reviews: { name: string; quote: string }[];
}

export interface CourseModule {
  title: string;
  summary: string;
}

export interface Course {
  slug: string;
  title: string;
  outcome: string;
  audience: string;
  curriculum: CourseModule[];
  instructor: Author;
  deliveryMode: string;
  schedule: string;
  priceVnd: number;
  registrationOpen: boolean;
  faq: { question: string; answer: string }[];
}

export interface ResourceItem {
  slug: string;
  title: string;
  type: "checklist" | "template" | "guide" | "assessment";
  description: string;
  downloadUrl?: string;
  gated: boolean;
  pillar?: PillarCode;
  system?: string;
}

export interface EventItem {
  slug: string;
  title: string;
  dateTime: string;
  location: string;
  online: boolean;
  capacity?: number;
  fee?: string;
  registrationOpen: boolean;
}

export interface Testimonial {
  name: string;
  title: string;
  company?: string;
  quote: string;
  consentGiven: boolean;
}
