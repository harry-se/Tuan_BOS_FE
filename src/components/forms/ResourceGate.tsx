"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics/events";

export function ResourceGate({ slug, title, downloadUrl }: { slug: string; title: string; downloadUrl?: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      consent: form.get("consent") === "on",
      source: `resource:${slug}`,
      honeypot: String(form.get("website") || ""),
    };

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("success");
      trackEvent("download_resource", { slug, title });
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return downloadUrl ? (
      <a href={downloadUrl} className="text-sm font-medium text-navy underline hover:text-gold">
        Tải &ldquo;{title}&rdquo; ngay
      </a>
    ) : (
      <p className="text-sm text-navy">Cảm ơn bạn — tài liệu sẽ được gửi qua email trong ít phút.</p>
    );
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="text-sm font-medium text-navy underline hover:text-gold">
        Nhận tài liệu
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 space-y-2" noValidate>
      <div className="hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input
        type="email"
        name="email"
        required
        placeholder="Email của bạn"
        className="w-full rounded-lg border border-navy/20 px-3 py-2 text-sm"
      />
      <label className="flex items-start gap-2 text-xs text-charcoal/70">
        <input type="checkbox" name="consent" required className="mt-0.5" />
        <span>Tôi đồng ý nhận tài liệu và nội dung liên quan qua email.</span>
      </label>
      {status === "error" ? <p className="text-xs text-terracotta">Có lỗi xảy ra, vui lòng thử lại.</p> : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-navy px-4 py-1.5 text-xs font-medium text-ivory disabled:opacity-50"
      >
        {status === "submitting" ? "Đang gửi..." : "Gửi"}
      </button>
    </form>
  );
}
