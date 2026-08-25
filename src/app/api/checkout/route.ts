import { NextResponse } from "next/server";

import { getBookBySlug, getCourseBySlug } from "@/lib/content/api";
import { emailAdapter } from "@/lib/email/adapter";
import { paymentAdapter } from "@/lib/payment/adapter";
import { store } from "@/lib/store/fileStore";
import { checkoutSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { itemType, slug, name, email, phone } = parsed.data;

  const item = itemType === "book" ? await getBookBySlug(slug) : await getCourseBySlug(slug);
  if (!item) {
    return NextResponse.json({ ok: false, error: "Không tìm thấy sản phẩm" }, { status: 404 });
  }

  const checkout = await paymentAdapter.createCheckout({
    item: { type: itemType, slug, title: item.title, priceVnd: item.priceVnd },
    customer: { name, email, phone },
  });

  await store.append("orders", {
    orderId: checkout.orderId,
    itemType,
    slug,
    title: item.title,
    priceVnd: item.priceVnd,
    customerName: name,
    customerEmail: email,
    customerPhone: phone || "",
    status: checkout.status,
    provider: checkout.provider,
  });

  await emailAdapter.send({
    to: email,
    subject: `[TUAN.BOS] Xác nhận đơn hàng ${checkout.orderId}`,
    text: `Cảm ơn ${name} đã đặt "${item.title}". Mã đơn hàng: ${checkout.orderId}. Chúng tôi sẽ liên hệ để hoàn tất thanh toán và giao hàng/kích hoạt truy cập.`,
  });

  return NextResponse.json({ ok: true, ...checkout });
}
