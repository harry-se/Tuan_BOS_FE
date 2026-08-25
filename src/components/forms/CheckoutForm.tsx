"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics/events";
import { formatVnd } from "@/lib/utils";

export function CheckoutForm({
  itemType,
  slug,
  title,
  priceVnd,
}: {
  itemType: "book" | "course";
  slug: string;
  title: string;
  priceVnd: number;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [orderId, setOrderId] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = new FormData(event.currentTarget);
    const payload = {
      itemType,
      slug,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      honeypot: String(form.get("website") || ""),
    };

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      setOrderId(data.orderId);
      setStatus("success");
      trackEvent(itemType === "book" ? "book_click_buy" : "course_register", { slug });
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-navy/15 bg-white p-8 text-center">
        <p className="text-lg font-semibold text-navy">Đã ghi nhận đơn hàng #{orderId}.</p>
        <p className="mt-2 text-charcoal/75">
          Chúng tôi sẽ liên hệ qua email để hoàn tất thanh toán và {itemType === "book" ? "giao sách" : "kích hoạt khoá học"}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-navy/15 bg-white p-6" noValidate>
      <div className="hidden" aria-hidden="true">
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <p className="text-sm text-charcoal/70">Đặt mua</p>
      <p className="text-lg font-semibold text-navy">{title}</p>
      <p className="text-2xl font-bold text-gold">{formatVnd(priceVnd)}</p>

      <div>
        <label htmlFor="checkout-name" className="mb-1.5 block text-sm font-medium text-charcoal">
          Họ tên <span className="text-terracotta">*</span>
        </label>
        <input id="checkout-name" name="name" required className="w-full rounded-lg border border-navy/20 px-3.5 py-2.5 text-sm" />
      </div>
      <div>
        <label htmlFor="checkout-email" className="mb-1.5 block text-sm font-medium text-charcoal">
          Email <span className="text-terracotta">*</span>
        </label>
        <input id="checkout-email" name="email" type="email" required className="w-full rounded-lg border border-navy/20 px-3.5 py-2.5 text-sm" />
      </div>
      <div>
        <label htmlFor="checkout-phone" className="mb-1.5 block text-sm font-medium text-charcoal">
          Số điện thoại
        </label>
        <input id="checkout-phone" name="phone" className="w-full rounded-lg border border-navy/20 px-3.5 py-2.5 text-sm" />
      </div>

      {status === "error" ? <p className="text-sm text-terracotta">Có lỗi xảy ra, vui lòng thử lại.</p> : null}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Đang xử lý..." : "Tiến hành đặt mua"}
      </Button>
      <p className="text-xs text-charcoal/60">
        Thanh toán được xử lý qua cổng thanh toán đối tác; TUAN.BOS không lưu trữ thông tin thẻ trên hệ thống.
      </p>
    </form>
  );
}
