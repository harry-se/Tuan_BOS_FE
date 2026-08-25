import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-24">
      <Container className="max-w-lg text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">404</p>
        <h1 className="mt-2 text-3xl font-semibold text-navy">Không tìm thấy trang</h1>
        <p className="mt-4 text-charcoal/75">Trang bạn tìm không tồn tại hoặc đã được di chuyển.</p>
        <Button href="/" className="mt-8">
          Về trang chủ
        </Button>
      </Container>
    </div>
  );
}
