"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics/events";

export function NewsletterForm({ source = "website" }: { source?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      consent: form.get("consent") === "on",
      source,
      honeypot: String(form.get("website") || ""),
    };

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("success");
      trackEvent("newsletter_signup", { source });
      event.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="text-sm font-medium text-navy">Đã đăng ký thành công. Cảm ơn bạn!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Email của bạn"
          className="w-full flex-1 rounded-full border border-navy/20 bg-white px-4 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-gold"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-navy px-5 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-ink disabled:opacity-50"
        >
          {status === "submitting" ? "Đang gửi..." : "Đăng ký"}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-charcoal/70">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>Tôi đồng ý nhận nội dung và bản tin từ TUAN.BOS.</span>
      </label>
      {status === "error" ? <p className="text-xs text-terracotta">Có lỗi xảy ra, vui lòng thử lại.</p> : null}
    </form>
  );
}
