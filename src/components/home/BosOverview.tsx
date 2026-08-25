import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pillars, getSystemsByPillar } from "@/lib/content/pillars";

export function BosOverview() {
  return (
    <section className="bg-sand/30 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Phương pháp"
          title="TUAN.BOS™ — BUILD · OPERATE · SCALE"
          description="3 Pillars, 9 Systems. Xem chi tiết từng hệ thống tại trang TUAN.BOS Method."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <Link
              key={pillar.code}
              href={`/bos#${pillar.code.toLowerCase()}`}
              className="group rounded-2xl border border-navy/10 bg-white p-6 transition-shadow hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{pillar.code}</p>
              <h3 className="mt-1 text-xl font-semibold text-navy">{pillar.tagline}</h3>
              <p className="mt-3 text-sm text-charcoal/75">{pillar.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-charcoal/70">
                {getSystemsByPillar(pillar.code).map((system) => (
                  <li key={system.code}>
                    <span className="font-medium text-navy">{system.code}</span> · {system.name}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-block text-sm font-medium text-navy group-hover:text-gold">
                Tìm hiểu thêm →
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
