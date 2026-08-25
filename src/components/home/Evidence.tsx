import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCaseStudies, getTestimonials } from "@/lib/content/api";

export async function Evidence() {
  const [caseStudies, testimonials] = await Promise.all([getCaseStudies(), getTestimonials()]);
  const caseStudy = caseStudies[0];
  const testimonial = testimonials[0];

  if (!caseStudy && !testimonial) return null;

  return (
    <section className="bg-ink py-16 text-ivory sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Bằng chứng"
          title="Kết quả thực tế, không phóng đại"
          className="[&_h2]:text-ivory [&_p]:text-ivory/70"
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {caseStudy ? (
            <div className="rounded-2xl border border-gold/20 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Case Study</p>
              <p className="mt-2 text-sm text-ivory/70">{caseStudy.clientLabel}</p>
              <p className="mt-4 text-ivory/90">{caseStudy.result}</p>
              {caseStudy.quote ? <p className="mt-4 italic text-ivory/70">&ldquo;{caseStudy.quote}&rdquo;</p> : null}
            </div>
          ) : null}
          {testimonial ? (
            <div className="rounded-2xl border border-gold/20 bg-white/5 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Testimonial</p>
              <p className="mt-4 italic text-ivory/90">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-4 text-sm text-ivory/70">
                {testimonial.name} — {testimonial.title}
                {testimonial.company ? `, ${testimonial.company}` : ""}
              </p>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
