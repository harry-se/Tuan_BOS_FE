import { client } from "../../../sanity/lib/client";
import { isSanityConfigured } from "../../../sanity/env";

/**
 * Fetches from Sanity when a project is configured, otherwise (or on error)
 * falls back to local seed content. This lets every page render immediately
 * during development and keeps the app resilient if Sanity is briefly
 * unreachable in production — swap in real content by populating Sanity
 * Studio at /studio once NEXT_PUBLIC_SANITY_PROJECT_ID/DATASET are set.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    if (result === null || (Array.isArray(result) && result.length === 0)) {
      return fallback;
    }
    return result;
  } catch (error) {
    console.error("[sanityFetch] falling back to seed content:", error);
    return fallback;
  }
}
