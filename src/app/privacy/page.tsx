import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật thông tin của TUAN.BOS™.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="prose-tuanbos max-w-2xl text-charcoal/85">
        <h1 className="text-3xl font-semibold text-navy">Chính sách bảo mật</h1>
        <p className="mt-6 text-sm text-charcoal/60">Cập nhật lần cuối: bản nháp — cần chủ thương hiệu rà soát và xác nhận trước khi phát hành.</p>

        <h2 className="mt-8 text-xl font-semibold text-navy">1. Dữ liệu chúng tôi thu thập</h2>
        <p>
          {siteConfig.name} thu thập thông tin bạn chủ động cung cấp qua các form trên website (họ tên, email, số
          điện thoại, công ty, nội dung tin nhắn) và dữ liệu phân tích hành vi truy cập ẩn danh qua Google Analytics.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">2. Mục đích sử dụng</h2>
        <p>
          Dữ liệu được dùng để phản hồi yêu cầu liên hệ, gửi nội dung/bản tin bạn đã đăng ký, xử lý đơn hàng sách/khoá
          học, và cải thiện trải nghiệm website. Chúng tôi không bán dữ liệu cá nhân cho bên thứ ba.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">3. Thanh toán</h2>
        <p>
          TUAN.BOS không lưu trữ thông tin thẻ thanh toán trên hệ thống của mình. Giao dịch được xử lý qua cổng
          thanh toán đối tác sử dụng hosted checkout/tokenization.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">4. Quyền của bạn</h2>
        <p>
          Bạn có thể yêu cầu truy cập, chỉnh sửa hoặc xoá dữ liệu cá nhân đã cung cấp bằng cách liên hệ qua trang
          Contact.
        </p>

        <h2 className="mt-8 text-xl font-semibold text-navy">5. Cookie</h2>
        <p>
          Website sử dụng cookie phân tích (GA4) và có thể bổ sung Microsoft Clarity. Bạn có thể từ chối cookie
          không thiết yếu qua trình duyệt của mình.
        </p>
      </Container>
    </div>
  );
}
