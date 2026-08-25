"use client";

// GA4 event helper matching the event map in requirement 12.2. Pushes to
// window.gtag when GA4 is configured (see components/layout/Analytics.tsx);
// no-ops safely otherwise so this can be called from any client component
// without guarding for analytics availability.
export type AnalyticsEvent =
  | "view_bos_method"
  | "start_assessment"
  | "complete_assessment"
  | "submit_discovery"
  | "download_resource"
  | "newsletter_signup"
  | "book_click_buy"
  | "course_register"
  | "outbound_social";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
