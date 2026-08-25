"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics/events";

const intentOptions = [
  { value: "discovery", label: "Đăng ký phiên trao đổi (Discovery Session)" },
  { value: "advisory", label: "Tìm hiểu dịch vụ Advisory" },
  { value: "media", label: "Hợp tác media/diễn giả" },
  { value: "other", label: "Khác" },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const defaultIntent = searchParams.get("intent") === "discovery" ? "discovery" : "other";

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      company: String(form.get("company") || ""),
      intent: String(form.get("intent") || "other"),
      message: String(form.get("message") || ""),
      consent: form.get("consent") === "on",
      honeypot: String(form.get("company_website") || ""),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("success");
      trackEvent("submit_discovery", { intent: payload.intent });
      event.currentTarget.reset();
    } else {
      setStatus("error");
      setErrorMsg("Vui lòng kiểm tra lại thông tin đã nhập.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-navy/15 bg-white p-8 text-center">
        <p className="text-lg font-semibold text-navy">Cảm ơn bạn đã gửi thông tin.</p>
        <p className="mt-2 text-charcoal/75">Đội ngũ TUAN.BOS sẽ liên hệ lại trong thời gian sớm nhất.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Để trống trường này</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Họ tên" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Số điện thoại" name="phone" autoComplete="tel" />
        <Field label="Công ty" name="company" autoComplete="organization" />
      </div>

      <div>
        <label htmlFor="intent" className="mb-1.5 block text-sm font-medium text-charcoal">
          Nhu cầu
        </label>
        <select
          id="intent"
          name="intent"
          defaultValue={defaultIntent}
          className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-gold"
        >
          {intentOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-charcoal">
          Mô tả ngắn nhu cầu của bạn <span className="text-terracotta">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-gold"
        />
      </div>

      <label className="flex items-start gap-2.5 text-sm text-charcoal/80">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>Tôi đồng ý để TUAN.BOS liên hệ lại qua email/điện thoại về nhu cầu này.</span>
      </label>

      {status === "error" && errorMsg ? <p className="text-sm text-terracotta">{errorMsg}</p> : null}

      <Button type="submit" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Đang gửi..." : "Gửi thông tin"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-charcoal">
        {label} {required ? <span className="text-terracotta">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-navy/20 bg-white px-3.5 py-2.5 text-sm focus-visible:outline-2 focus-visible:outline-gold"
      />
    </div>
  );
}
