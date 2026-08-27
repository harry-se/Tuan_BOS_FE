import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content/site";
import Link from "next/link";

export function FinalCta() {
  return (
    <section className="bg-navy py-16 text-ivory sm:py-20">
      <Container className="text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">Bắt đầu bằng một bức tranh rõ ràng về doanh nghiệp của bạn</h2>
        <p className="mx-auto mt-3 max-w-xl text-ivory/75">
          7–10 phút để biết doanh nghiệp bạn đang mạnh ở đâu và cần ưu tiên cải thiện hệ thống nào.
        </p>
        <Link href="/assessment" className="mt-3 inline-block rounded-full bg-gold px-5 py-2.5 text-sm font-medium text-ink">
            Đánh giá Hệ điều hành doanh nghiệp
        </Link>
      </Container>
    </section>
  );
}
