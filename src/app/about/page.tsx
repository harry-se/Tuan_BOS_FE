import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Về Tony",
  description: "Câu chuyện, triết lý cố vấn và giá trị cá nhân đằng sau TUAN.BOS™.",
};

const timeline = [
  { period: "Giai đoạn khởi nghiệp", text: "Trực tiếp điều hành và trải qua những năm tháng doanh nghiệp phụ thuộc hoàn toàn vào người chủ." },
  { period: "Giai đoạn xây hệ thống", text: "Đúc kết phương pháp luận BUILD · OPERATE · SCALE từ thực chiến vận hành nhiều loại hình doanh nghiệp." },
  { period: "Giai đoạn cố vấn & chia sẻ", text: "Đồng hành cùng các chủ doanh nghiệp SME xây dựng Hệ điều hành Doanh nghiệp và chia sẻ tri thức qua nội dung, sách, cộng đồng." },
];

const values = [
  { title: "Trải nghiệm", text: "Mọi khuyến nghị đều xuất phát từ thực chiến, không lý thuyết suông." },
  { title: "Học hỏi", text: "Liên tục cập nhật phương pháp dựa trên thực tế vận hành và phản hồi từ doanh nghiệp." },
  { title: "Chia sẻ", text: "Tin rằng tri thức đúc kết cần được lan toả cho thế hệ chủ doanh nghiệp tiếp theo." },
  { title: "Di sản tri thức", text: "Xây dựng phương pháp có thể kế thừa và nhân rộng, không phụ thuộc vào một cá nhân." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-sand/30 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Về Tony</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">
            Tôi tin rằng doanh nghiệp bền vững bắt đầu từ hệ thống, không phải từ sự hy sinh của một người
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-charcoal/80">
            {siteConfig.name} — {siteConfig.description}
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-navy">Hành trình</h2>
          <div className="mt-8 space-y-8 border-l border-navy/15 pl-6">
            {timeline.map((item) => (
              <div key={item.period}>
                <p className="text-sm font-semibold uppercase tracking-wide text-gold">{item.period}</p>
                <p className="mt-1 text-charcoal/80">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand/30 py-16 sm:py-20">
        <Container className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-navy">Triết lý cố vấn</h2>
          <p className="mt-4 text-charcoal/80">
            Vai trò của một cố vấn không phải là làm thay, mà là giúp chủ doanh nghiệp và đội ngũ nhìn rõ hệ thống
            đang thiếu, sau đó cùng xây dựng để hệ thống ấy tự vận hành mà không cần phụ thuộc vào cố vấn hay người
            chủ. Đây là ranh giới quan trọng giữa vai trò advisor và management — TUAN.BOS đồng hành, không thay thế
            đội ngũ vận hành của bạn.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-2xl font-semibold text-navy">Giá trị cá nhân</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-navy/10 bg-white/70 p-5">
                <h3 className="font-semibold text-navy">{value.title}</h3>
                <p className="mt-2 text-sm text-charcoal/75">{value.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/bos">Khám phá TUAN.BOS Method</Button>
            <Button href="/contact" variant="secondary">
              Kết nối với Tony
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
