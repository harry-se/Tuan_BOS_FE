import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const signals = [
  "Mọi quyết định lớn nhỏ đều phải qua tay người chủ.",
  "Đội ngũ quản lý giỏi chuyên môn nhưng thiếu năng lực lãnh đạo hệ thống.",
  "Kế hoạch năm chỉ là con số doanh thu, không có hành động cụ thể.",
  "Quy trình chỉ tồn tại trong đầu vài nhân sự chủ chốt.",
  "Tăng trưởng phụ thuộc một kênh hoặc một khách hàng lớn duy nhất.",
  "Không có dữ liệu đáng tin để ra quyết định tài chính/tăng trưởng.",
];

export function ProblemSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Dấu hiệu quen thuộc"
          title="Doanh nghiệp của bạn có đang phụ thuộc vào một người?"
          description="Đây là những dấu hiệu phổ biến cho thấy doanh nghiệp đang thiếu một hệ điều hành đúng nghĩa."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signals.map((signal) => (
            <div key={signal} className="rounded-2xl border border-navy/10 bg-white/60 p-5 text-sm text-charcoal/85">
              {signal}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
