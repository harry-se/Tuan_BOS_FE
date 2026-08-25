import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Điều khoản sử dụng",
  description: "Điều khoản sử dụng website và dịch vụ của TUAN.BOS™.",
};

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="prose-tuanbos max-w-2xl text-charcoal/85">
        <h1 className="text-3xl font-semibold text-navy">Điều khoản sử dụng</h1>
        <p className="mt-6 text-sm text-charcoal/60">Bản nháp — cần chủ thương hiệu và tư vấn pháp lý rà soát trước khi phát hành chính thức.</p>

        <h2 className="mt-8 text-xl font-semibold text-navy">1. Phạm vi dịch vụ</h2>
        <p>
          Website {siteConfig.domain} cung cấp nội dung tri thức, dịch vụ cố vấn (Advisory), sách, khoá học và cộng
          đồng dưới thương hiệu TUAN.BOS™ do {siteConfig.name} sở hữu.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">2. Vai trò cố vấn</h2>
        <p>
          Dịch vụ Advisory mang tính chất tư vấn (advisor), không thay thế vai trò quản lý điều hành (management)
          của doanh nghiệp khách hàng. TUAN.BOS không cam kết kết quả tài chính cụ thể nếu không có cơ sở dữ liệu
          thực tế.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">3. Sở hữu trí tuệ</h2>
        <p>
          Toàn bộ nội dung, framework, tài liệu và logo TUAN.BOS™ thuộc quyền sở hữu của {siteConfig.name}. Không
          sao chép, phân phối lại nếu chưa có sự đồng ý bằng văn bản.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">4. Mua hàng</h2>
        <p>
          Khi đặt mua sách/khoá học, bạn đồng ý cung cấp thông tin chính xác. Chi tiết giá, hình thức thanh toán và
          chính sách hoàn tiền được nêu tại trang sản phẩm và trang Chính sách hoàn tiền.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">5. Giới hạn trách nhiệm</h2>
        <p>
          Nội dung trên website mang tính chất tham khảo, không thay thế tư vấn pháp lý, tài chính hoặc thuế chuyên
          biệt cho từng doanh nghiệp.
        </p>
      </Container>
    </div>
  );
}
