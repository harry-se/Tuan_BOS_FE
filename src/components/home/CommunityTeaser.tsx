import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function CommunityTeaser() {
  return (
    <section className="py-16 sm:py-20">
      <Container className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <SectionHeading
            eyebrow="Cộng đồng"
            title="Một nơi để học, thực hành và trưởng thành cùng nhau"
            description="Cộng đồng TUAN.BOS tồn tại để chủ doanh nghiệp và quản lý không phải tự mày mò một mình. Bắt đầu từ nội dung mở, đến kết nối, thực hành và mạng lưới tin cậy cấp cao."
            className="mb-0"
          />
        </div>
        <div className="flex justify-start lg:justify-end">
          <Button href="/community" size="lg">
            Tìm hiểu cộng đồng
          </Button>
        </div>
      </Container>
    </section>
  );
}
