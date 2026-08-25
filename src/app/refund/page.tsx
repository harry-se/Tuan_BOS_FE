import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chính sách hoàn tiền",
  description: "Chính sách hoàn tiền/huỷ đơn cho sách và khoá học TUAN.BOS™.",
};

import { Container } from "@/components/ui/Container";

export default function RefundPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="prose-tuanbos max-w-2xl text-charcoal/85">
        <h1 className="text-3xl font-semibold text-navy">Chính sách hoàn tiền & huỷ đơn</h1>
        <p className="mt-6 text-sm text-charcoal/60">
          Bản nháp — số ngày và điều kiện cụ thể cần chủ thương hiệu xác nhận trước khi phát hành, theo mô hình kinh
          doanh và pháp nhân xuất hoá đơn thực tế (yêu cầu 8.2 / 18 #10).
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">Sách</h2>
        <p>
          Sách bản in đã giao có thể được đổi/trả trong trường hợp lỗi in ấn hoặc hư hỏng khi vận chuyển. Ebook đã
          gửi qua email không hỗ trợ hoàn tiền, trừ trường hợp lỗi hệ thống.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">Khoá học</h2>
        <p>
          Học viên có thể yêu cầu hoàn tiền trước khi khoá học khai giảng hoặc trong một số buổi học đầu tiên (chi
          tiết công bố tại trang khoá học tương ứng). Sau mốc thời gian này, TUAN.BOS xem xét từng trường hợp cụ thể.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">Cách yêu cầu hoàn tiền</h2>
        <p>
          Vui lòng liên hệ qua trang Contact kèm mã đơn hàng. Yêu cầu sẽ được xử lý trong vòng 5–7 ngày làm việc.
        </p>
      </Container>
    </div>
  );
}
