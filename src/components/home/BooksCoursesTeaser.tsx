import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getBooks, getCourses } from "@/lib/content/api";
import { formatVnd } from "@/lib/utils";

export async function BooksCoursesTeaser() {
  const [books, courses] = await Promise.all([getBooks(), getCourses()]);

  return (
    <section className="bg-sand/30 py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Sách & Khoá học" title="Học theo lộ trình, tự áp dụng vào doanh nghiệp" />
        <div className="grid gap-6 sm:grid-cols-2">
          {books.slice(0, 1).map((book) => (
            <div key={book.slug} className="rounded-2xl border border-navy/10 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Sách</p>
              <h3 className="mt-1 text-lg font-semibold text-navy">{book.title}</h3>
              <p className="mt-2 text-sm text-charcoal/75">{book.description}</p>
              <p className="mt-4 font-semibold text-navy">{formatVnd(book.priceVnd)}</p>
              <Button href={`/books/${book.slug}`} variant="secondary" className="mt-4">
                Xem chi tiết
              </Button>
            </div>
          ))}
          {courses.slice(0, 1).map((course) => (
            <div key={course.slug} className="rounded-2xl border border-navy/10 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">Khoá học</p>
              <h3 className="mt-1 text-lg font-semibold text-navy">{course.title}</h3>
              <p className="mt-2 text-sm text-charcoal/75">{course.outcome}</p>
              <p className="mt-4 font-semibold text-navy">{formatVnd(course.priceVnd)}</p>
              <Button href={`/courses/${course.slug}`} variant="secondary" className="mt-4">
                Xem chi tiết
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
