"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { PillarBadge } from "@/components/ui/Badge";
import { assessmentQuestions, type AssessmentAnswers, type AssessmentResult } from "@/lib/content/assessment";
import { pillars, getSystemsByPillar } from "@/lib/content/pillars";
import { trackEvent } from "@/lib/analytics/events";
import { siteConfig } from "@/lib/content/site";

const likertLabels = ["Chưa có", "Mới bắt đầu", "Tạm ổn", "Khá tốt", "Rất tốt"];

type Step = "intro" | 0 | 1 | 2 | "lead" | "result";

export function AssessmentWizard() {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pillarSteps = useMemo(() => pillars.map((p) => p.code), []);

  function setAnswer(questionId: string, value: number) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function currentPillarComplete(pillarIndex: number) {
    const pillarCode = pillarSteps[pillarIndex];
    const systemsInPillar = getSystemsByPillar(pillarCode);
    const qIds = assessmentQuestions.filter((q) => systemsInPillar.some((s) => s.code === q.systemCode)).map((q) => q.id);
    return qIds.every((id) => typeof answers[id] === "number");
  }

  async function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      answers,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      consent: form.get("consent") === "on",
      source: typeof window !== "undefined" ? window.location.search : "",
      honeypot: String(form.get("website") || ""),
    };

    const res = await fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      setResult(data.result as AssessmentResult);
      setStep("result");
      trackEvent("complete_assessment", { overallPercent: data.result.overallPercent });
    } else {
      setError("Vui lòng kiểm tra lại thông tin đã nhập.");
    }
    setSubmitting(false);
  }

  if (step === "intro") {
    return (
      <div className="rounded-2xl border border-navy/15 bg-white p-8">
        <h2 className="text-2xl font-semibold text-navy">Business OS Assessment</h2>
        <p className="mt-3 text-charcoal/80">
          27 câu hỏi ngắn (~7–10 phút), trải đều trên 3 Pillars — BUILD, OPERATE, SCALE — và 9 Systems. Bạn sẽ nhận
          điểm BOS Score tổng quan, 3 điểm mạnh và 3 điểm nghẽn ưu tiên.
        </p>
        <p className="mt-3 text-sm text-charcoal/60">
          Đây là công cụ chẩn đoán sơ bộ, không thay thế đánh giá chuyên sâu 1-1 cùng Tony.
        </p>
        <Button
          className="mt-6"
          size="lg"
          onClick={() => {
            setStep(0);
            trackEvent("start_assessment");
          }}
        >
          Bắt đầu đánh giá
        </Button>
      </div>
    );
  }

  if (step === 0 || step === 1 || step === 2) {
    const pillarCode = pillarSteps[step];
    const pillar = pillars.find((p) => p.code === pillarCode)!;
    const systemsInPillar = getSystemsByPillar(pillarCode);
    const complete = currentPillarComplete(step);

    return (
      <div className="rounded-2xl border border-navy/15 bg-white p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <PillarBadge pillar={pillar.code} />
          <p className="text-sm text-charcoal/60">Bước {step + 1}/3</p>
        </div>
        <h2 className="text-xl font-semibold text-navy">
          {pillar.name} — {pillar.tagline}
        </h2>

        <div className="mt-6 space-y-8">
          {systemsInPillar.map((system) => (
            <fieldset key={system.code}>
              <legend className="mb-3 font-medium text-navy">{system.code} · {system.name}</legend>
              <div className="space-y-5">
                {assessmentQuestions
                  .filter((q) => q.systemCode === system.code)
                  .map((q) => (
                    <div key={q.id}>
                      <p className="mb-2 text-sm text-charcoal/85">{q.text}</p>
                      <div className="flex flex-wrap gap-2">
                        {likertLabels.map((label, i) => {
                          const value = i + 1;
                          const checked = answers[q.id] === value;
                          return (
                            <label
                              key={value}
                              className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs transition-colors ${
                                checked ? "border-navy bg-navy text-ivory" : "border-navy/20 text-charcoal/75 hover:border-navy/50"
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                value={value}
                                checked={checked}
                                onChange={() => setAnswer(q.id, value)}
                                className="sr-only"
                              />
                              {value} · {label}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </fieldset>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={() => setStep(step === 0 ? "intro" : ((step - 1) as Step))}>
            Quay lại
          </Button>
          <Button
            disabled={!complete}
            onClick={() => setStep(step === 2 ? "lead" : ((step + 1) as Step))}
          >
            {step === 2 ? "Xem kết quả" : "Tiếp tục"}
          </Button>
        </div>
      </div>
    );
  }

  if (step === "lead") {
    return (
      <div className="rounded-2xl border border-navy/15 bg-white p-8">
        <h2 className="text-xl font-semibold text-navy">Nhận báo cáo BOS Score chi tiết</h2>
        <p className="mt-2 text-charcoal/75">
          Để lại thông tin để nhận báo cáo qua email cùng gợi ý nội dung/khoá học phù hợp với điểm nghẽn của bạn.
        </p>
        <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4" noValidate>
          <div className="hidden" aria-hidden="true">
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div>
            <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium text-charcoal">
              Họ tên <span className="text-terracotta">*</span>
            </label>
            <input id="lead-name" name="name" required className="w-full rounded-lg border border-navy/20 px-3.5 py-2.5 text-sm" />
          </div>
          <div>
            <label htmlFor="lead-email" className="mb-1.5 block text-sm font-medium text-charcoal">
              Email <span className="text-terracotta">*</span>
            </label>
            <input id="lead-email" name="email" type="email" required className="w-full rounded-lg border border-navy/20 px-3.5 py-2.5 text-sm" />
          </div>
          <div>
            <label htmlFor="lead-company" className="mb-1.5 block text-sm font-medium text-charcoal">
              Công ty
            </label>
            <input id="lead-company" name="company" className="w-full rounded-lg border border-navy/20 px-3.5 py-2.5 text-sm" />
          </div>
          <label className="flex items-start gap-2.5 text-sm text-charcoal/80">
            <input type="checkbox" name="consent" required className="mt-1" />
            <span>Tôi đồng ý nhận báo cáo và nội dung liên quan từ TUAN.BOS qua email.</span>
          </label>
          {error ? <p className="text-sm text-terracotta">{error}</p> : null}
          <div className="flex items-center justify-between">
            <Button type="button" variant="ghost" onClick={() => setStep(2)}>
              Quay lại
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Đang xử lý..." : "Nhận kết quả"}
            </Button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "result" && result) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-navy/15 bg-white p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">BOS Score tổng quan</p>
          <p className="mt-2 text-5xl font-bold text-navy">{result.overallPercent}%</p>
          <p className="mt-1 text-charcoal/70">Mức độ trưởng thành: {result.maturityLabel}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {result.pillarScores.map((p) => (
            <div key={p.pillar} className="rounded-2xl border border-navy/15 bg-white p-5 text-center">
              <PillarBadge pillar={p.pillar} />
              <p className="mt-3 text-2xl font-semibold text-navy">{p.average.toFixed(1)}/5</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-navy/15 bg-white p-6">
            <h3 className="font-semibold text-navy">3 điểm mạnh</h3>
            <ul className="mt-3 space-y-2 text-sm text-charcoal/80">
              {result.strengths.map((s) => (
                <li key={s.systemCode}>
                  {s.systemCode} · {s.systemName} — {s.average.toFixed(1)}/5
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-terracotta/30 bg-white p-6">
            <h3 className="font-semibold text-terracotta">3 điểm nghẽn ưu tiên</h3>
            <ul className="mt-3 space-y-2 text-sm text-charcoal/80">
              {result.gaps.map((s) => (
                <li key={s.systemCode}>
                  {s.systemCode} · {s.systemName} — {s.average.toFixed(1)}/5
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-sm text-charcoal/60">
          Đây là chẩn đoán sơ bộ dựa trên tự đánh giá của bạn, không thay thế cho đánh giá chuyên sâu cùng Tony.
        </p>

        <div className="rounded-2xl bg-navy p-8 text-center text-ivory">
          <p className="text-lg font-semibold">Sẵn sàng giải quyết điểm nghẽn ưu tiên?</p>
          <Button href={siteConfig.postAssessmentCta.href} variant="secondary" className="mt-4 border-ivory text-ivory hover:bg-ivory hover:text-navy">
            {siteConfig.postAssessmentCta.label}
          </Button>
        </div>

        <p className="text-center text-sm">
          <Link href="/insights" className="text-navy underline hover:text-gold">
            Xem bài viết liên quan đến điểm nghẽn của bạn
          </Link>
        </p>
      </div>
    );
  }

  return null;
}
