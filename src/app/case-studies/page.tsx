import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { getCaseStudies } from "@/lib/content/api";
import { getSystemByCode } from "@/lib/content/pillars";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Bằng chứng năng lực và kết quả thực tế từ các doanh nghiệp đã áp dụng TUAN.BOS.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Bằng chứng</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Case Studies</h1>
        <p className="mt-4 max-w-2xl text-lg text-charcoal/80">
          Kết quả được trình bày ở mức tổng hợp, theo đúng thoả thuận bảo mật với khách hàng.
        </p>

        <div className="mt-10 space-y-8">
          {caseStudies.map((cs) => (
            <div key={cs.slug} className="rounded-2xl border border-navy/10 bg-white p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                {cs.systems.map((code) => {
                  const system = getSystemByCode(code);
                  return system ? (
                    <span key={code} className="rounded-full bg-navy/10 px-3 py-1 text-xs font-medium text-navy">
                      {system.code} · {system.name}
                    </span>
                  ) : null;
                })}
              </div>
              <h2 className="mt-4 text-xl font-semibold text-navy">{cs.clientLabel}</h2>
              <p className="mt-1 text-sm text-charcoal/60">{cs.industry}</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">Vấn đề</p>
                  <p className="mt-1 text-sm text-charcoal/80">{cs.problem}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">Baseline</p>
                  <p className="mt-1 text-sm text-charcoal/80">{cs.baseline}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">Can thiệp</p>
                  <p className="mt-1 text-sm text-charcoal/80">{cs.intervention}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">Kết quả</p>
                  <p className="mt-1 text-sm text-charcoal/80">{cs.result}</p>
                </div>
              </div>

              {cs.quote ? <p className="mt-4 italic text-charcoal/70">&ldquo;{cs.quote}&rdquo;</p> : null}
              <p className="mt-3 text-xs text-charcoal/50">Nguồn: {cs.evidence}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
