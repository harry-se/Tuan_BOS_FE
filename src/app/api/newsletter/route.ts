import { NextResponse } from "next/server";

import { store } from "@/lib/store/fileStore";
import { newsletterFormSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = newsletterFormSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { honeypot: _honeypot, ...subscriber } = parsed.data;
  await store.append("newsletter-subscribers", subscriber);

  // TODO: swap for real Newsletter/CRM integration (Brevo/Mailchimp/HubSpot — requirement 14.2)
  // once a provider is chosen, e.g. crmAdapter.addSubscriber(subscriber).

  return NextResponse.json({ ok: true });
}
