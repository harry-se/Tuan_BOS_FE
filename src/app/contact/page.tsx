import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Liên hệ",
  description: "Đặt lịch trao đổi hoặc gửi brief cho Tony Phạm Duy Tuân.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Liên hệ</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Kết nối với Tony</h1>
        <p className="mt-4 text-lg text-charcoal/80">
          Để lại thông tin, đội ngũ TUAN.BOS sẽ phản hồi trong 1–2 ngày làm việc.
        </p>
        <div className="mt-10">
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
