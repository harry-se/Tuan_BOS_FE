import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getEvents } from "@/lib/content/api";
import { formatDateTimeVi } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Events",
  description: "Workshop, webinar và sự kiện offline của TUAN.BOS.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Events</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Workshop & Sự kiện</h1>

        <div className="mt-10 space-y-4">
          {events.map((event) => (
            <div key={event.slug} className="flex flex-col gap-3 rounded-2xl border border-navy/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-navy">{event.title}</h2>
                <p className="mt-1 text-sm text-charcoal/70">
                  {formatDateTimeVi(event.dateTime)} · {event.online ? "Trực tuyến" : event.location} · {event.fee}
                </p>
              </div>
              <Button href={`/contact?intent=other&event=${event.slug}`} variant="secondary">
                {event.registrationOpen ? "Đăng ký" : "Đã đóng đăng ký"}
              </Button>
            </div>
          ))}
          {events.length === 0 ? <p className="text-charcoal/70">Chưa có sự kiện nào được công bố.</p> : null}
        </div>
      </Container>
    </div>
  );
}
