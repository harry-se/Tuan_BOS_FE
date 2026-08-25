"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

export function CommunityRegisterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      role: String(form.get("role") || ""),
      motivation: String(form.get("motivation") || ""),
      agreeCodeOfConduct: form.get("agreeCodeOfConduct") === "on",
      honeypot: String(form.get("website") || ""),
    };

    const res = await fetch("/api/community-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("success");
      event.currentTarget.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-navy/15 bg-white p-8 text-center">
        <p className="text-lg font-semibold text-navy">Đã nhận hồ sơ tham gia cộng đồng.</p>
        <p className="mt-2 text-charcoal/75">
          Chúng tôi sẽ xem xét và phản hồi qua email trong vài ngày làm việc.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-charcoal">
            Họ tên <span className="text-terracotta">*</span>
          </label>
          <input id="name" name="name" required className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
            Email <span className="text-terracotta">*</span>
          </label>
          <input id="email" name="email" type="email" required className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium text-charcoal">
            Công ty
          </label>
          <input id="company" name="company" className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm" />
        </div>
        <div>
          <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-charcoal">
            Vai trò
          </label>
          <input id="role" name="role" className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm" />
        </div>
      </div>
      <div>
        <label htmlFor="motivation" className="mb-1.5 block text-sm font-medium text-charcoal">
          Vì sao bạn muốn tham gia cộng đồng TUAN.BOS? <span className="text-terracotta">*</span>
        </label>
        <textarea id="motivation" name="motivation" required rows={4} className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm" />
      </div>
      <label className="flex items-start gap-2.5 text-sm text-charcoal/80">
        <input type="checkbox" name="agreeCodeOfConduct" required className="mt-1" />
        <span>Tôi đồng ý tuân thủ nguyên tắc và quy tắc ứng xử của cộng đồng TUAN.BOS.</span>
      </label>
      {status === "error" ? <p className="text-sm text-terracotta">Có lỗi xảy ra, vui lòng thử lại.</p> : null}
      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Đang gửi..." : "Gửi hồ sơ tham gia"}
      </Button>
    </form>
  );
}
