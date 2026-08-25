import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { CommunityRegisterForm } from "@/components/forms/CommunityRegisterForm";

export const metadata: Metadata = {
  title: "Cộng đồng",
  description: "Cộng đồng TUAN.BOS — 5 tầng, từ Open Community đến Contributor/Advisor.",
};

const tiers = [
  { tier: "1. Open Community", audience: "Khách truy cập", value: "Know & Trust", activities: "Bài viết, video, newsletter, tài liệu mở, sự kiện mở." },
  { tier: "2. TUAN.BOS Community", audience: "Thành viên đăng ký", value: "Connect & Learn", activities: "Profile, Resource Library, Event, newsletter, Assessment cơ bản." },
  { tier: "3. BOS Practitioner", audience: "Học viên/người thực hành", value: "Learn & Apply", activities: "Course, template, workshop, Q&A, case discussion, BOS tools." },
  { tier: "4. CEO / Business Owner Circle", audience: "Chủ doanh nghiệp được duyệt/mời", value: "Peer Trust & Advisory", activities: "CEO Roundtable, Case Clinic, Business Review, Mastermind." },
  { tier: "5. Contributor / Advisor", audience: "Doanh nhân/chuyên gia phù hợp", value: "Contribution & Legacy", activities: "Viết bài, chia sẻ case, mentoring, giảng dạy, đóng góp framework." },
];

export default function CommunityPage() {
  return (
    <div>
      <section className="border-b border-navy/10 bg-sand/30 py-16 sm:py-20">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Cộng đồng</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-semibold sm:text-4xl">Cộng đồng TUAN.BOS</h1>
          <p className="mt-4 max-w-2xl text-lg text-charcoal/80">
            Một nơi để chủ doanh nghiệp và quản lý học, thực hành và trưởng thành cùng nhau — thay vì tự mày mò
            một mình. Cộng đồng phát triển theo 5 tầng, mở rộng năng lực và mức độ tin cậy theo thời gian.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-navy/15 text-charcoal/60">
                  <th className="py-3 pr-4 font-medium">Tầng</th>
                  <th className="py-3 pr-4 font-medium">Đối tượng</th>
                  <th className="py-3 pr-4 font-medium">Giá trị chính</th>
                  <th className="py-3 font-medium">Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.tier} className="border-b border-navy/10">
                    <td className="py-3 pr-4 font-medium text-navy">{t.tier}</td>
                    <td className="py-3 pr-4 text-charcoal/75">{t.audience}</td>
                    <td className="py-3 pr-4 text-charcoal/75">{t.value}</td>
                    <td className="py-3 text-charcoal/75">{t.activities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-charcoal/60">
            Ở Phase 1, TUAN.BOS triển khai Tầng 1 (nội dung mở) và ghi nhận hồ sơ tham gia Tầng 2 qua form dưới đây.
            Các hoạt động tương tác sâu hơn (feed, forum, CEO Circle theo lời mời) sẽ mở dần ở Phase 2–3.
          </p>
        </Container>
      </section>

      <section id="join" className="bg-sand/30 py-16 sm:py-20">
        <Container className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-navy">Đăng ký tham gia cộng đồng</h2>
          <p className="mt-3 text-charcoal/75">
            Điền thông tin bên dưới, đội ngũ TUAN.BOS sẽ xem xét và phản hồi qua email.
          </p>
          <div className="mt-8">
            <CommunityRegisterForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
