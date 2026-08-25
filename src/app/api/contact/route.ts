import { NextResponse } from "next/server";

import { emailAdapter } from "@/lib/email/adapter";
import { store } from "@/lib/store/fileStore";
import { contactFormSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    // Silently accept to not tip off bots, but never persist/notify.
    return NextResponse.json({ ok: true });
  }

  const { honeypot: _honeypot, ...lead } = parsed.data;

  await store.append("contact-leads", lead);

  await emailAdapter.send({
    to: "hello@tuanbos.com",
    subject: `[TUAN.BOS] Yêu cầu liên hệ mới — ${lead.intent}`,
    text: `Tên: ${lead.name}\nEmail: ${lead.email}\nSĐT: ${lead.phone || "-"}\nCông ty: ${lead.company || "-"}\nNhu cầu: ${lead.intent}\n\n${lead.message}`,
  });

  return NextResponse.json({ ok: true });
}
