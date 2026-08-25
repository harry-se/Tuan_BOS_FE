import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { getCourses } from "@/lib/content/api";
import { formatVnd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Khoá học",
  description: "Khoá học và workshop theo phương pháp TUAN.BOS™.",
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Khoá học</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Khoá học & Workshop</h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {courses.map((course) => (
            <Link key={course.slug} href={`/courses/${course.slug}`} className="rounded-2xl border border-navy/10 bg-white p-6 hover:shadow-lg">
              <h2 className="text-lg font-semibold text-navy">{course.title}</h2>
              <p className="mt-2 text-sm text-charcoal/75">{course.outcome}</p>
              <p className="mt-4 font-semibold text-navy">{formatVnd(course.priceVnd)}</p>
              {!course.registrationOpen ? (
                <span className="mt-2 inline-block text-xs text-terracotta">Hiện chưa mở đăng ký</span>
              ) : null}
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
