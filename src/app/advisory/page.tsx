import type { Metadata } from "next";
import type { IconType } from "react-icons";
import {
  FiSearch,
  FiPenTool,
  FiUsers,
  FiTarget,
  FiActivity,
  FiCrosshair,
  FiMap,
  FiCheckCircle,
  FiArrowRight,
  FiTrendingUp,
  FiFileText,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Advisory",
  description: "Dịch vụ cố vấn xây dựng Hệ điều hành Doanh nghiệp theo phương pháp TUAN.BOS™.",
};

const engagements: { title: string; text: string; icon: IconType }[] = [
  { title: "Assessment", text: "Đánh giá toàn diện 9 Systems, xác định điểm nghẽn ưu tiên.", icon: FiSearch },
  { title: "Design", text: "Thiết kế hệ thống, quy trình và cơ chế phù hợp với giai đoạn doanh nghiệp.", icon: FiPenTool },
  { title: "Implementation Advisory", text: "Đồng hành triển khai cùng đội ngũ, review định kỳ theo nhịp.", icon: FiUsers },
  { title: "CEO Advisory", text: "Sparring partner cho người chủ trong các quyết định chiến lược quan trọng.", icon: FiTarget },
];

const process: { label: string; icon: IconType }[] = [
  { label: "Discovery", icon: FiSearch },
  { label: "Diagnostic", icon: FiActivity },
  { label: "Scope", icon: FiCrosshair },
  { label: "Roadmap", icon: FiMap },
  { label: "Execution Review", icon: FiCheckCircle },
];

const outputs: { text: string; icon: IconType }[] = [
  { text: "Roadmap ưu tiên theo hệ thống", icon: FiMap },
  { text: "Bộ KPI/OKR theo dõi", icon: FiTrendingUp },
  { text: "SOP/quy trình chuẩn hoá", icon: FiFileText },
  { text: "Dashboard theo dõi", icon: FiBarChart2 },
  { text: "Nhịp review định kỳ", icon: FiRefreshCw },
  { text: "Năng lực nội tại cho đội ngũ", icon: FiUsers },
];

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
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-navy/10 text-navy">
                  <e.icon className="h-5 w-5" aria-hidden="true" />
                </div>
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
          <p className="mt-3 text-charcoal/80">
            Một quy trình tư vấn bài bản giúp doanh nghiệp nhìn đúng vấn đề, xác định đúng ưu tiên và triển khai đúng hướng. Chúng tôi đồng hành từ bước khám phá hiện trạng đến đánh giá kết quả, đảm bảo mỗi quyết định đều dựa trên dữ liệu, mục tiêu và bối cảnh thực tế của doanh nghiệp.
          </p>
          <br/>
          <br/>
          <ol className="flex justify-evenly flex-wrap items-center gap-3">
            {process.map((step, i) => (
              <li key={step.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy/10 text-navy">
                    <step.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="font-semibold text-gold">{i + 1}</span>
                  {step.label}
                </div>
                {i < process.length - 1 ? (
                  <FiArrowRight className="h-4 w-4 shrink-0 text-navy/40" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="mb-8 text-2xl font-semibold text-navy">Kết quả bàn giao</h2>
          <p className="mt-3 text-charcoal/80">
          Kết thúc mỗi dự án không chỉ là một bản báo cáo, mà là một hệ thống có thể tiếp tục được vận hành bởi đội ngũ nội bộ. Các tài liệu, chỉ số và công cụ sau đây được chuẩn hóa để doanh nghiệp dễ dàng theo dõi, đánh giá và cải tiến sau khi dự án hoàn tất.
          </p>
          <br/>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {outputs.map((o) => (
              <li key={o.text} className="flex items-center gap-3 rounded-xl border border-navy/10 bg-white/70 p-4 text-sm text-charcoal/80">
                <o.icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                {o.text}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-sand/30 py-16 text-ivory sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="mb-8 text-2xl font-semibold text-navy">Giới hạn & cam kết</h2>
          <p className="mt-3 text-charcoal/80">
            TUAN.BOS không hứa hẹn kết quả tài chính cụ thể nếu không có cơ sở dữ liệu thực tế. Vai trò của Tony là
            cố vấn (advisor) — hỗ trợ tư duy, thiết kế và đồng hành, không thay thế vai trò quản lý điều hành
            (management) của đội ngũ bạn.
          </p>
          <Button href={siteConfig.primaryCta.href} variant="secondary" className="mt-6 border-ivory text-ivory hover:bg-ivory hover:text-sand">
            {siteConfig.primaryCta.label}
          </Button>
        </Container>
      </section>
    </div>
  );
}
