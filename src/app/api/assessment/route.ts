import { NextResponse } from "next/server";

import { scoreAssessment } from "@/lib/content/assessment";
import { emailAdapter } from "@/lib/email/adapter";
import { store } from "@/lib/store/fileStore";
import { assessmentSubmissionSchema } from "@/lib/validation/schemas";

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = assessmentSubmissionSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.flatten() }, { status: 400 });
  }

  if (parsed.data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { honeypot: _honeypot, answers, ...lead } = parsed.data;
  const result = scoreAssessment(answers);

  await store.append("assessment-results", { ...lead, result });

  await emailAdapter.send({
    to: lead.email,
    subject: "[TUAN.BOS] Kết quả Business OS Assessment của bạn",
    text: `Xin chào ${lead.name},\n\nĐiểm BOS tổng quan của bạn: ${result.overallPercent}% (${result.maturityLabel}).\n\n3 điểm mạnh: ${result.strengths.map((s) => s.systemName).join(", ")}\n3 điểm cần ưu tiên cải thiện: ${result.gaps.map((s) => s.systemName).join(", ")}\n\nĐây là chẩn đoán sơ bộ. Đăng ký phiên trao đổi cùng Tony để có lộ trình chi tiết.`,
  });

  return NextResponse.json({ ok: true, result });
}
