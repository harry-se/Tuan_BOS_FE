import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PillarSystemMap } from "@/components/bos/PillarSystemMap";
import { MaturityModel } from "@/components/bos/MaturityModel";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "TUAN.BOS Method",
  description: "3 Pillars, 9 Systems và quy trình tư vấn của phương pháp TUAN.BOS™ — BUILD · OPERATE · SCALE.",
};

const process = [
  "Assess — Đánh giá hiện trạng hệ thống",
  "Diagnose — Chẩn đoán điểm nghẽn ưu tiên",
  "Prioritize — Sắp xếp thứ tự can thiệp",
  "Design — Thiết kế hệ thống phù hợp",
  "Implement — Triển khai cùng đội ngũ",
  "Measure — Đo lường kết quả",
  "Improve — Cải tiến liên tục",
  "Scale — Nhân rộng và mở rộng quy mô",
];

export default function BosMethodPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-sand/30 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Phương pháp</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">
            TUAN.BOS™ — Hệ điều hành doanh nghiệp gồm 3 Pillars và 9 Systems
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-charcoal/80">
            Ở lớp công khai, bạn chỉ cần hiểu 3 Pillars và 9 Systems. Việc đào sâu vào từng module, công cụ và thực
            hành sẽ diễn ra khi làm việc trực tiếp cùng Tony.
          </p>
          <Button href={siteConfig.primaryCta.href} size="lg" className="mt-6">
            {siteConfig.primaryCta.label}
          </Button>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <PillarSystemMap />
        </Container>
      </section>

      <section className="bg-sand/30 py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold text-navy">Maturity Model</h2>
          <MaturityModel />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold text-navy">Quy trình tư vấn</h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step} className="rounded-2xl border border-navy/10 bg-white p-5">
                <p className="text-2xl font-bold text-gold">{i + 1}</p>
                <p className="mt-1 text-sm font-medium text-charcoal/85">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button href={siteConfig.primaryCta.href} size="lg">
              {siteConfig.primaryCta.label}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
