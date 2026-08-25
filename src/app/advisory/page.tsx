import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Advisory",
  description: "Dịch vụ cố vấn xây dựng Hệ điều hành Doanh nghiệp theo phương pháp TUAN.BOS™.",
};

const engagements = [
  { title: "Assessment", text: "Đánh giá toàn diện 9 Systems, xác định điểm nghẽn ưu tiên." },
  { title: "Design", text: "Thiết kế hệ thống, quy trình và cơ chế phù hợp với giai đoạn doanh nghiệp." },
  { title: "Implementation Advisory", text: "Đồng hành triển khai cùng đội ngũ, review định kỳ theo nhịp." },
  { title: "CEO Advisory", text: "Sparring partner cho người chủ trong các quyết định chiến lược quan trọng." },
];

const process = ["Discovery", "Diagnostic", "Scope", "Roadmap", "Execution Review"];

const outputs = ["Roadmap ưu tiên theo hệ thống", "Bộ KPI/OKR theo dõi", "SOP/quy trình chuẩn hoá", "Dashboard theo dõi", "Nhịp review định kỳ", "Năng lực nội tại cho đội ngũ"];

export default function AdvisoryPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-sand/30 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Advisory</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Cố vấn xây dựng Hệ điều hành Doanh nghiệp cùng Tony
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-charcoal/80">
            Dành cho chủ doanh nghiệp SME đang cảm thấy mình là nút thắt của chính công ty, và sẵn sàng đầu tư thời
            gian để xây hệ thống thay vì tiếp tục chữa cháy.
          </p>
          <Button href="/contact?intent=advisory" size="lg" className="mt-6">
            Gửi brief cho Tony
          </Button>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold text-navy">Hình thức đồng hành</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {engagements.map((e) => (
              <div key={e.title} className="rounded-2xl border border-navy/10 bg-white p-6">
                <h3 className="font-semibold text-navy">{e.title}</h3>
                <p className="mt-2 text-sm text-charcoal/75">{e.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand/30 py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold text-navy">Quy trình</h2>
          <ol className="flex flex-wrap gap-4">
            {process.map((step, i) => (
              <li key={step} className="flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm">
                <span className="font-semibold text-gold">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold text-navy">Kết quả bàn giao</h2>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {outputs.map((o) => (
              <li key={o} className="rounded-xl border border-navy/10 bg-white/70 p-4 text-sm text-charcoal/80">
                {o}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-ink py-16 text-ivory sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-xl font-semibold">Giới hạn & cam kết</h2>
          <p className="mt-3 text-ivory/75">
            TUAN.BOS không hứa hẹn kết quả tài chính cụ thể nếu không có cơ sở dữ liệu thực tế. Vai trò của Tony là
            cố vấn (advisor) — hỗ trợ tư duy, thiết kế và đồng hành, không thay thế vai trò quản lý điều hành
            (management) của đội ngũ bạn.
          </p>
          <Button href={siteConfig.primaryCta.href} variant="secondary" className="mt-6 border-ivory text-ivory hover:bg-ivory hover:text-navy">
            {siteConfig.primaryCta.label}
          </Button>
        </Container>
      </section>
    </div>
  );
}
