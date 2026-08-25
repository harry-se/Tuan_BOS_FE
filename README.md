# TUAN.BOS™ Website — Phase 1

Next.js (App Router) + Sanity headless CMS implementation of the Phase 1 scope in
`TUAN_BOS_Website_Requirements_v1_1_Approved.md` §19.5, built on the Plan B stack
from §14.1 (Next.js + headless CMS).

## Stack

- **Frontend:** Next.js 15 (App Router, TypeScript), Tailwind CSS v4
- **CMS:** [Sanity](https://sanity.io) — schema in `studio/`, queried read-only from the frontend
- **Fonts:** Be Vietnam Pro (body) + Noto Serif (headings), per §9.4
- **Forms/validation:** zod
- **Email / Payment:** adapter pattern, currently stubbed (see **Known limitations** below)

## Project layout

```
src/app/            Pages (App Router) + API routes
src/components/      UI split by domain: layout, ui, home, bos, insights, forms
src/lib/content/     Content types, taxonomy (3 Pillars/9 Systems), seed content, assessment scoring
src/lib/sanity/      sanityFetch() — Sanity-or-seed-content fallback wrapper
src/lib/email/       Email adapter (interface + console-log stub implementation)
src/lib/payment/     Payment adapter (interface + stub implementation)
src/lib/store/       Local JSON file store for leads/orders/applications (dev only, see below)
sanity/              Frontend-side Sanity client + image URL builder (env-driven)
studio/              STANDALONE Sanity Studio project (own package.json/build, see below)
```

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in values, see below
npm run dev
```

Open http://localhost:3000. The site renders fully from **local seed content**
(`src/lib/content/seed.ts`) until Sanity is connected — see next section.

## Connecting Sanity (headless CMS)

The frontend and the Studio are two independent projects that share one Sanity
project ID/dataset:

1. Create a free project at https://www.sanity.io/manage (or use an existing one).
2. Frontend: put the Project ID/dataset in `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID`,
   `NEXT_PUBLIC_SANITY_DATASET`).
3. Studio: `cd studio && cp .env.example .env` and fill in the same Project ID/dataset
   (as `SANITY_STUDIO_PROJECT_ID`/`SANITY_STUDIO_DATASET`), then `npm install && npm run dev`
   to edit content at http://localhost:3333. First run will prompt to add
   `http://localhost:3000` (and your production domain later) as a CORS origin —
   do this from the banner Studio shows, or at sanity.io/manage → API → CORS origins.
4. Every `getX()` helper in `src/lib/content/api.ts` calls `sanityFetch()`, which
   queries Sanity when configured and **falls back to seed content** if the
   dataset is empty, unreachable, or unconfigured — so the site never breaks
   while content is being migrated in. Once real documents exist in Sanity for
   a given type, they automatically replace the seed placeholders.
5. Deploy the Studio as its own app when ready: `cd studio && npm run deploy`
   (publishes to `https://<project>.sanity.studio`, separate from the
   marketing site's deployment).

**Why a separate Studio project instead of embedding it at `/studio` in the
Next.js app:** it was tried first, but the current `sanity`/`@sanity/ui`
release requires a very recent React API (`Activity`) whose CJS/ESM export
shapes trip up Next's webpack/Turbopack bundler (unrelated `swr`
"react-server" condition and RSC-serialization errors were also hit along the
way). Sanity Studio's own Vite-based CLI (`sanity dev`/`sanity build`) builds
it correctly, and decoupling the CMS admin app from the marketing/commerce
frontend's deploy pipeline is also a common, defensible choice on its own
merits (independent release cadence, no shared bundler constraints).

## Content model (§7)

Schema types live in `studio/schemaTypes/`: `article` (doubles as the "video"
content type via a `contentType` field per §6.5), `caseStudy`, `book`,
`course`, `resource`, `event`, `testimonial`, `profile`, plus the taxonomy
(`pillar`, `system`, `topic`) used to tag Business content per §4.1. Editors
work entirely in Studio — no code changes needed to add/edit
Article/Video/Case/Book/Course/Resource/Event (AC-03).

The 3 Pillars / 9 Systems taxonomy itself (names, problems, goals, modules,
tools, expected results) is hardcoded in `src/lib/content/pillars.ts` rather
than pulled from Sanity, since §18 #9 flags it as needing to be locked before
build — update that file (and re-deploy) if the Architecture 1.0 naming
changes.

## Business OS Assessment (§19.4)

`src/components/forms/AssessmentWizard.tsx` implements the flow: 27 questions
(3 per system × 9 systems, 1–5 maturity scale matching the Maturity Model in
§6.3) grouped into 3 steps (one per Pillar) → lead-capture gate → scored
result (BOS Score, 3 strengths, 3 gaps) → CTA to Discovery Session. Scoring
logic is in `src/lib/content/assessment.ts` and runs server-side in
`src/app/api/assessment/route.ts` so results can't be tampered with client-side.

## Analytics (§12.2)

`src/lib/analytics/events.ts` exposes `trackEvent()` for the exact event names
in the requirement's event map (`view_bos_method`, `start_assessment`,
`complete_assessment`, `submit_discovery`, `download_resource`,
`newsletter_signup`, `book_click_buy`, `course_register`, `outbound_social`).
Wired into the relevant forms/links already. GA4 loads only when
`NEXT_PUBLIC_GA4_ID` is set (`src/components/layout/Analytics.tsx`).

## Known limitations / not-yet-wired integrations

These are intentionally stubbed because no accounts/credentials exist yet —
each has a single adapter file to implement against once a provider is chosen:

| Concern | File | Status |
|---|---|---|
| Transactional email | `src/lib/email/adapter.ts` | Logs to console. Swap in SMTP/Brevo/etc per §14.2. |
| Payment (books/courses) | `src/lib/payment/adapter.ts` | Creates a pending order, no real charge. Swap in VNPay/MoMo/PayOS/Stripe per §8.2/§18 #10 once the billing entity is confirmed. Card data is never collected directly — real integrations must use the provider's hosted checkout. |
| Lead/order/application storage | `src/lib/store/fileStore.ts` | Appends to local JSON files under `.data/` — fine for local dev, **not durable on serverless hosts** (e.g. Vercel's filesystem is ephemeral). Replace with a real database before go-live. |
| Newsletter/CRM | `src/app/api/newsletter/route.ts` | Records locally only; no Brevo/Mailchimp/HubSpot sync yet (§14.2). |
| Booking (Discovery Session) | `/contact` page | Plain contact form; no calendar integration yet (§14.2, FR-07). |
| Member accounts / LMS | — | Out of Phase 1 scope per §8.1; the Community page collects Tier-1 applications only (§19.3). |
| Rich article body rendering | `src/app/insights/[slug]/page.tsx` | Renders as plain paragraphs. Sanity's portable-text body is flattened to plain text via GROQ (`pt::text(body)`) for both seed and CMS content — swap in `@portabletext/react` for rich formatting when needed. |

## SEO checklist (§12.1)

- [x] `sitemap.xml` / `robots.txt` generated dynamically (`src/app/sitemap.ts`, `robots.ts`)
- [x] Per-page `<title>`/description via `generateMetadata`
- [x] Open Graph + Twitter card defaults in root layout
- [x] JSON-LD: `Person` (site-wide), `Article`/`VideoObject` (article detail)
- [ ] JSON-LD for `Book`, `Course`, `Event`, `BreadcrumbList` — add once real content exists
- [ ] OG images (1200×630) — add per-page once real photography/design assets exist

## Testing performed

- `npm run build` passes clean (typecheck + lint + all 32 routes prerendered)
- Manually exercised in a browser: Home, BOS Method, Assessment (full 27-question flow →
  scored result), Contact form submission, Book checkout stub, Insights list/detail,
  Community page. All API routes confirmed writing to `.data/*.json` and logging
  the stub email as expected.
- Not yet tested: real Sanity content (dataset is currently empty), real payment
  provider, cross-browser/device pass, accessibility audit (AC-09), Core Web
  Vitals under real traffic (AC-08).

## Design system reference (§9)

Colors and fonts are defined as CSS custom properties in `src/app/globals.css`
(`--color-navy #17365D`, `--color-gold #B8944B`, `--color-sand #E8DFC8`,
`--color-ivory #F7F4ED`, `--color-charcoal #2A2A2A`, `--color-terracotta
#A55A3A`) and exposed as Tailwind utilities (`bg-navy`, `text-gold`, etc.) via
`@theme inline`. The brand logo (`public/logo/logo-r2.png`) is used as
supplied — not redrawn — per §9.3/§19.6.
