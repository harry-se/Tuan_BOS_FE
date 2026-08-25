import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Xác nhận đơn hàng",
  robots: { index: false },
};

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; status?: string }>;
}) {
  const { orderId, status = "pending" } = await searchParams;

  const statusCopy: Record<string, { title: string; text: string }> = {
    pending: {
      title: "Đơn hàng đang chờ xử lý",
      text: "Chúng tôi đã ghi nhận đơn hàng của bạn và sẽ liên hệ để hoàn tất thanh toán.",
    },
    success: {
      title: "Thanh toán thành công",
      text: "Cảm ơn bạn. Email xác nhận và hướng dẫn tiếp theo đã được gửi tới hộp thư của bạn.",
    },
    failed: {
      title: "Thanh toán chưa thành công",
      text: "Rất tiếc, giao dịch chưa hoàn tất. Vui lòng thử lại hoặc liên hệ để được hỗ trợ.",
    },
  };

  const copy = statusCopy[status] || statusCopy.pending;

  return (
    <div className="py-20">
      <Container className="max-w-xl text-center">
        <h1 className="text-2xl font-semibold text-navy">{copy.title}</h1>
        {orderId ? <p className="mt-2 text-sm text-charcoal/60">Mã đơn hàng: {orderId}</p> : null}
        <p className="mt-4 text-charcoal/80">{copy.text}</p>
        <Button href="/" className="mt-8">
          Về trang chủ
        </Button>
      </Container>
    </div>
  );
}
