import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCaseStudies, getTestimonials } from "@/lib/content/api";

interface EvidenceCard {
  key: string;
  eyebrow: string;
  subheading?: string;
  quote: string;
  footer?: string;
}

const MIN_CARDS = 6;

export async function Evidence() {
  const [caseStudies, testimonials] = await Promise.all([getCaseStudies(), getTestimonials()]);

  const cards: EvidenceCard[] = [
    ...caseStudies.map((cs, i) => ({
      key: `case-${i}`,
      eyebrow: "Case Study",
      subheading: cs.clientLabel,
      quote: cs.quote || cs.result,
    })),
    ...testimonials.map((t, i) => ({
      key: `testimonial-${i}`,
      eyebrow: "Testimonial",
      quote: t.quote,
      footer: `${t.name} — ${t.title}${t.company ? `, ${t.company}` : ""}`,
    })),
  ];

  if (!cards.length) return null;

  // Repeat the source cards until there are enough to fill a wide screen, then
  // duplicate the whole set once more so the marquee track can loop seamlessly
  // (the CSS animation scrolls exactly 50% of the track width).
  const filled: EvidenceCard[] = [];
  while (filled.length < MIN_CARDS) {
    filled.push(...cards.map((c) => ({ ...c, key: `${c.key}-fill${filled.length}` })));
  }
  const track = [...filled, ...filled.map((c) => ({ ...c, key: `${c.key}-loop` }))];

  return (
    <section className="bg-navy py-16 text-ivory sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Kết quả thực tế"
          title=""
          className="[&_h2]:text-ivory [&_p]:text-ivory/70"
        />
      </Container>

      <Container className="overflow-hidden">
        <div className="marquee-track flex w-max gap-6">
          {track.map((card) => (
            <div
              key={card.key}
              className="flex w-80 shrink-0 flex-col rounded-2xl border border-gold/20 bg-white/5 p-6 sm:w-96"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{card.eyebrow}</p>
              {card.subheading ? <p className="mt-2 text-sm text-ivory/60">{card.subheading}</p> : null}
              <p className="mt-4 flex-1 italic text-ivory/90">&ldquo;{card.quote}&rdquo;</p>
              {card.footer ? <p className="mt-4 text-sm text-ivory/60">{card.footer}</p> : null}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
