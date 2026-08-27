import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/content/site";

export function Hero() {
  return (
    <section className="border-b border-navy/10 bg-gradient-to-b from-sand/40 to-ivory py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 inline-flex items-center rounded-full bg-navy/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-navy">
            {siteConfig.brand} — {siteConfig.tagline}
          </p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Giúp doanh nghiệp xây đúng hệ thống, chạy đều hệ thống và tăng trưởng bền vững
          </h1>
          <p className="mt-5 max-w-xl text-lg text-charcoal/80">
            Để người chủ không còn là nút thắt của chính doanh nghiệp mình — cùng {siteConfig.name}, cố vấn xây dựng
            Hệ điều hành Doanh nghiệp theo phương pháp TUAN.BOS™.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={siteConfig.primaryCta.href} size="lg">
              {siteConfig.primaryCta.label}
            </Button>
            <Button href={siteConfig.secondaryCta.href} variant="secondary" size="lg">
              {siteConfig.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-ink sm:h-90 sm:w-80">
            <Image src="/img/tony.png" alt={`${siteConfig.name} img`} width={500} height={500} className="w-6/5 rounded-2xl" priority />
          </div>
        </div>
      </Container>
    </section>
  );
}
