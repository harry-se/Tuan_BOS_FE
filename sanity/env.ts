export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-24";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

// Content is considered "connected" only once a real project id is supplied.
// Until then, pages render from the local seed content in lib/content/seed.ts.
export const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    return "" as unknown as T;
  }
  return v;
}
