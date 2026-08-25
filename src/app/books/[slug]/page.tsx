import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { CheckoutForm } from "@/components/forms/CheckoutForm";
import { getBookBySlug, getBooks } from "@/lib/content/api";

export async function generateStaticParams() {
  const books = await getBooks();
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return {};
  return { title: book.title, description: book.description };
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  return (
    <div className="py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h1 className="text-3xl font-semibold">{book.title}</h1>
          <p className="mt-4 text-lg text-charcoal/80">{book.description}</p>

          <h2 className="mt-8 text-xl font-semibold text-navy">Mục lục</h2>
          <ul className="mt-3 space-y-1.5 text-charcoal/80">
            {book.toc.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>

          <h2 className="mt-8 text-xl font-semibold text-navy">Chương đọc thử</h2>
          <p className="mt-3 text-charcoal/80">{book.sampleExcerpt}</p>

          <h2 className="mt-8 text-xl font-semibold text-navy">Định dạng</h2>
          <p className="mt-2 text-charcoal/80">{book.formats.join(" · ")}</p>

          {book.reviews.length ? (
            <>
              <h2 className="mt-8 text-xl font-semibold text-navy">Review</h2>
              <div className="mt-3 space-y-4">
                {book.reviews.map((r) => (
                  <div key={r.name} className="rounded-xl border border-navy/10 bg-white/70 p-4">
                    <p className="text-sm italic text-charcoal/80">&ldquo;{r.quote}&rdquo;</p>
                    <p className="mt-2 text-xs font-medium text-charcoal/60">{r.name}</p>
                  </div>
                ))}
              </div>
            </>
          ) : null}
        </div>

        <div>
          <CheckoutForm itemType="book" slug={book.slug} title={book.title} priceVnd={book.priceVnd} />
        </div>
      </Container>
    </div>
  );
}
