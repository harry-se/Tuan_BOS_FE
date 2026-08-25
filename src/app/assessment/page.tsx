import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { AssessmentWizard } from "@/components/forms/AssessmentWizard";

export const metadata: Metadata = {
  title: "Business OS Assessment",
  description: "Đánh giá nhanh mức độ trưởng thành của 9 Systems trong doanh nghiệp bạn.",
};

export default function AssessmentPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Business OS Assessment</p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Đánh giá Hệ điều hành doanh nghiệp</h1>
        <div className="mt-10">
          <AssessmentWizard />
        </div>
      </Container>
    </div>
  );
}
