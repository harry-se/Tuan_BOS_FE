import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const points = [
  { title: "Practitioner, không chỉ diễn giả", text: "Kinh nghiệm thực chiến trực tiếp trong vận hành và tư vấn doanh nghiệp." },
  { title: "Tư duy hệ thống", text: "Mọi khuyến nghị đều gắn với một hệ thống cụ thể trong TUAN.BOS, không nói chung chung." },
  { title: "Đồng hành dài hạn", text: "Ưu tiên xây năng lực nội tại cho đội ngũ thay vì tạo phụ thuộc vào cố vấn." },
  { title: "Công cụ thực dụng", text: "Framework, checklist, template có thể áp dụng ngay, không chỉ lý thuyết." },
];

export function WhyTony() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Vì sao Tony" title="Khác biệt trong cách đồng hành cùng doanh nghiệp" />
        <div className="grid gap-6 sm:grid-cols-2">
          {points.map((point) => (
            <div key={point.title} className="rounded-2xl border border-navy/10 bg-white/70 p-6">
              <h3 className="font-semibold text-navy">{point.title}</h3>
              <p className="mt-2 text-sm text-charcoal/75">{point.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
