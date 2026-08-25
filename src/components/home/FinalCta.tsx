import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/content/site";

export function FinalCta() {
  return (
    <section className="bg-navy py-16 text-ivory sm:py-20">
      <Container className="text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">Bắt đầu bằng một bức tranh rõ ràng về doanh nghiệp của bạn</h2>
        <p className="mx-auto mt-3 max-w-xl text-ivory/75">
          7–10 phút để biết doanh nghiệp bạn đang mạnh ở đâu và cần ưu tiên cải thiện hệ thống nào.
        </p>
        <Button href={siteConfig.primaryCta.href} size="lg" className="mt-6 bg-gold text-ink hover:bg-gold/90">
          {siteConfig.primaryCta.label}
        </Button>
      </Container>
    </section>
  );
}
