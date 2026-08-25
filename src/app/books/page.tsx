import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { getBooks } from "@/lib/content/api";
import { formatVnd } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sách",
  description: "Sách của Tony Phạm Duy Tuân về Hệ điều hành Doanh nghiệp TUAN.BOS™.",
};

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Sách</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Sách của Tony</h1>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Link key={book.slug} href={`/books/${book.slug}`} className="rounded-2xl border border-navy/10 bg-white p-6 hover:shadow-lg">
              <h2 className="text-lg font-semibold text-navy">{book.title}</h2>
              <p className="mt-2 text-sm text-charcoal/75">{book.description}</p>
              <p className="mt-4 font-semibold text-navy">{formatVnd(book.priceVnd)}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
