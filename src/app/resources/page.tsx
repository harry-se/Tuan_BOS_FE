import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { ResourceGate } from "@/components/forms/ResourceGate";
import { getResources } from "@/lib/content/api";

export const metadata: Metadata = {
  title: "Resources",
  description: "Checklist, template và tài liệu tự đánh giá theo TUAN.BOS.",
};

const typeLabels: Record<string, string> = {
  checklist: "Checklist",
  template: "Template",
  guide: "Hướng dẫn",
  assessment: "Assessment",
};

export default async function ResourcesPage() {
  const resources = await getResources();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Resources</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Checklist & Template</h1>
        <p className="mt-4 max-w-2xl text-lg text-charcoal/80">
          Công cụ thực dụng để bạn bắt đầu áp dụng TUAN.BOS ngay hôm nay.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <div key={resource.slug} className="rounded-2xl border border-navy/10 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{typeLabels[resource.type]}</p>
              <h2 className="mt-1 text-lg font-semibold text-navy">{resource.title}</h2>
              <p className="mt-2 text-sm text-charcoal/75">{resource.description}</p>
              <div className="mt-4">
                {resource.gated ? (
                  <ResourceGate slug={resource.slug} title={resource.title} downloadUrl={resource.downloadUrl} />
                ) : resource.downloadUrl ? (
                  <a href={resource.downloadUrl} className="text-sm font-medium text-navy underline hover:text-gold">
                    Tải về
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
