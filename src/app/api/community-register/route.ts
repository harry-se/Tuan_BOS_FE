import { NextResponse } from "next/server";

import { emailAdapter } from "@/lib/email/adapter";
import { store } from "@/lib/store/fileStore";
import { communityApplicationSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = communityApplicationSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { honeypot: _honeypot, ...application } = parsed.data;

  // Tier 1 (Open Community) record per requirement 19.2/19.3 — application is
  // reviewed manually; higher tiers (Practitioner, CEO Circle, Contributor)
  // are invite/application-based and out of Phase 1 scope.
  await store.append("community-applications", { ...application, tier: 1, status: "pending-review" });

  await emailAdapter.send({
    to: "community@tuanbos.com",
    subject: "[TUAN.BOS] Đơn tham gia cộng đồng mới",
    text: `Tên: ${application.name}\nEmail: ${application.email}\nCông ty: ${application.company || "-"}\nVai trò: ${application.role || "-"}\n\n${application.motivation}`,
  });

  return NextResponse.json({ ok: true });
}
