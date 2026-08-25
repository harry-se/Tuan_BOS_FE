import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { getCourseBySlug, getCourses } from "@/lib/content/api";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};
  return { title: course.title, description: course.outcome };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="text-3xl font-semibold">{course.title}</h1>
          <p className="mt-4 text-lg text-charcoal/80">{course.outcome}</p>

          <h2 className="mt-8 text-xl font-semibold text-navy">Đối tượng</h2>
          <p className="mt-2 text-charcoal/80">{course.audience}</p>

          <h2 className="mt-8 text-xl font-semibold text-navy">Curriculum</h2>
          <div className="mt-3 space-y-3">
            {course.curriculum.map((m) => (
              <div key={m.title} className="rounded-xl border border-navy/10 bg-white/70 p-4">
                <p className="font-medium text-navy">{m.title}</p>
                <p className="mt-1 text-sm text-charcoal/75">{m.summary}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-semibold text-navy">Giảng viên</h2>
          <p className="mt-2 text-charcoal/80">
            {course.instructor.name} — {course.instructor.role}
          </p>

          <h2 className="mt-8 text-xl font-semibold text-navy">Hình thức & Lịch học</h2>
          <p className="mt-2 text-charcoal/80">{course.deliveryMode}</p>
          <p className="text-charcoal/80">{course.schedule}</p>

          {course.faq.length ? (
            <>
              <h2 className="mt-8 text-xl font-semibold text-navy">FAQ</h2>
              <div className="mt-3 space-y-3">
                {course.faq.map((f) => (
                  <div key={f.question}>
                    <p className="font-medium text-charcoal">{f.question}</p>
                    <p className="text-sm text-charcoal/75">{f.answer}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div>
          {course.registrationOpen ? (
            <CheckoutForm itemType="course" slug={course.slug} title={course.title} priceVnd={course.priceVnd} />
          ) : (
            <div className="rounded-2xl border border-navy/15 bg-white p-6 text-center text-charcoal/75">
              Khoá học hiện chưa mở đăng ký. Vui lòng theo dõi trang Events hoặc đăng ký nhận tin.
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
