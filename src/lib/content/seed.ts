// Placeholder seed content so every template renders end-to-end before real
// content (section 17) and live Sanity data are supplied. Replace/override via
// Sanity Studio at /studio once NEXT_PUBLIC_SANITY_PROJECT_ID is configured —
// see lib/sanity/fetch.ts for the fallback mechanism.
import type {
  Article,
  Author,
  Book,
  CaseStudy,
  Course,
  EventItem,
  ResourceItem,
  Testimonial,
} from "./types";

export const founderProfile: Author = {
  name: "Tony Phạm Duy Tuân",
  role: "Chuyên gia/Cố vấn xây dựng Hệ điều hành Doanh nghiệp",
  bioShort:
    "Cố vấn doanh nghiệp thực chiến, tập trung giúp chủ doanh nghiệp xây dựng Hệ điều hành doanh nghiệp theo phương pháp TUAN.BOS™.",
};

export const seedArticles: Article[] = [
  {
    slug: "vi-sao-nguoi-chu-la-nut-that",
    title: "Vì sao người chủ lại là nút thắt lớn nhất của chính doanh nghiệp mình",
    excerpt:
      "Khi mọi quyết định đều phải qua tay người chủ, tăng trưởng sẽ luôn bị giới hạn bởi quỹ thời gian của một người.",
    body: "Nội dung mẫu — sẽ được thay bằng bài viết thật khi kết nối Sanity Studio.",
    author: founderProfile,
    pillar: "BUILD",
    system: "B2",
    topic: "Lãnh đạo phân quyền",
    tags: ["lãnh đạo", "hệ thống", "tăng trưởng"],
    publishedAt: "2026-06-02",
    readingTime: 6,
    contentType: "article",
  },
  {
    slug: "ke-hoach-quy-khong-chi-la-con-so",
    title: "Kế hoạch quý không chỉ là con số doanh thu",
    excerpt: "Một kế hoạch quý tốt cần trả lời: ai làm, làm gì, đo bằng gì — không chỉ đặt mục tiêu doanh thu.",
    body: "Nội dung mẫu — sẽ được thay bằng bài viết thật khi kết nối Sanity Studio.",
    author: founderProfile,
    pillar: "OPERATE",
    system: "O1",
    topic: "Lập kế hoạch",
    tags: ["OKR", "kế hoạch", "thực thi"],
    publishedAt: "2026-05-18",
    readingTime: 5,
    contentType: "article",
  },
  {
    slug: "du-lieu-ban-rai-khong-phai-so-hoa",
    title: "Dữ liệu nằm rải rác không phải là số hoá",
    excerpt: "Số hoá thật sự bắt đầu từ một nguồn dữ liệu vận hành đáng tin, không phải từ việc mua thêm phần mềm.",
    body: "Nội dung mẫu — sẽ được thay bằng bài viết thật khi kết nối Sanity Studio.",
    author: founderProfile,
    pillar: "SCALE",
    system: "S3",
    topic: "Số hoá & AI",
    tags: ["dữ liệu", "AI", "vận hành"],
    publishedAt: "2026-04-30",
    readingTime: 7,
    contentType: "article",
  },
  {
    slug: "video-gioi-thieu-tuan-bos",
    title: "Giới thiệu phương pháp TUAN.BOS trong 10 phút",
    excerpt: "Tổng quan 3 Pillars và 9 Systems của TUAN.BOS, cách áp dụng cho doanh nghiệp SME tại Việt Nam.",
    body: "Tóm tắt video mẫu — thay bằng nội dung thật khi kết nối Sanity Studio.",
    author: founderProfile,
    pillar: "BUILD",
    system: "B1",
    topic: "Tổng quan TUAN.BOS",
    tags: ["TUAN.BOS", "video", "tổng quan"],
    publishedAt: "2026-03-12",
    readingTime: 10,
    contentType: "video",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

export const seedCaseStudies: CaseStudy[] = [
  {
    slug: "case-01-doanh-nghiep-san-xuat",
    clientLabel: "Doanh nghiệp sản xuất, ~120 nhân sự (ẩn danh theo thoả thuận)",
    industry: "Sản xuất & phân phối",
    problem: "Người chủ duyệt mọi đơn hàng, quy trình chỉ nằm trong đầu quản lý cũ.",
    baseline: "Thời gian xử lý đơn hàng trung bình 5 ngày, phụ thuộc 2 nhân sự chủ chốt.",
    intervention: "Chuẩn hoá SOP vận hành (O3), thiết kế lại phân quyền phê duyệt (B2).",
    systems: ["O3", "B2"],
    result: "Thời gian xử lý đơn hàng giảm còn 2 ngày sau 4 tháng triển khai.",
    evidence: "Số liệu do khách hàng cung cấp và cho phép công bố ở mức tổng hợp.",
    quote: "Lần đầu tiên tôi có thể đi công tác một tuần mà công ty vẫn chạy bình thường.",
    confidential: true,
  },
];

export const seedBooks: Book[] = [
  {
    slug: "xay-he-dieu-hanh-doanh-nghiep",
    title: "Xây Hệ Điều Hành Doanh Nghiệp — TUAN.BOS™",
    description:
      "Cuốn sách trình bày phương pháp BUILD · OPERATE · SCALE để chủ doanh nghiệp thoát khỏi vai trò nút thắt.",
    toc: ["Phần 1: BUILD — Xây đúng", "Phần 2: OPERATE — Chạy đều", "Phần 3: SCALE — Tăng trưởng bền vững"],
    sampleExcerpt: "Chương mẫu sẽ được cập nhật cùng nội dung sách chính thức.",
    formats: ["Bìa mềm", "Ebook (PDF)"],
    priceVnd: 249000,
    reviews: [],
  },
];

export const seedCourses: Course[] = [
  {
    slug: "business-os-foundation",
    title: "Business OS Foundation — Khoá nền tảng xây Hệ điều hành doanh nghiệp",
    outcome: "Xây được bản chiến lược, kế hoạch quý và ít nhất 3 SOP vận hành cốt lõi sau khoá học.",
    audience: "Chủ doanh nghiệp SME, quản lý cấp trung phụ trách vận hành.",
    curriculum: [
      { title: "Module 1 — Chiến lược & Lãnh đạo (BUILD)", summary: "Định vị, mục tiêu, phân quyền lãnh đạo." },
      { title: "Module 2 — Kế hoạch & Thực thi (OPERATE)", summary: "OKR theo tầng, cơ chế giao việc và theo dõi." },
      { title: "Module 3 — Tăng trưởng & Tài chính (SCALE)", summary: "Phễu tăng trưởng, dòng tiền, ưu tiên số hoá." },
    ],
    instructor: founderProfile,
    deliveryMode: "Online trực tiếp + tài liệu tự học",
    schedule: "Khai giảng theo lịch quý — công bố tại trang Events",
    priceVnd: 4900000,
    registrationOpen: true,
    faq: [
      { question: "Khoá học có cấp chứng nhận không?", answer: "Có chứng nhận hoàn thành từ TUAN.BOS." },
      { question: "Có hỗ trợ trả góp không?", answer: "Liên hệ trực tiếp để được tư vấn phương thức thanh toán." },
    ],
  },
];

export const seedResources: ResourceItem[] = [
  {
    slug: "checklist-9-systems",
    title: "Checklist tự đánh giá nhanh 9 Systems",
    type: "checklist",
    description: "Bảng checklist 1 trang giúp bạn tự chấm nhanh mức độ trưởng thành của từng hệ thống.",
    gated: true,
    pillar: "BUILD",
  },
  {
    slug: "mau-ke-hoach-quy",
    title: "Mẫu kế hoạch quý theo OKR liên tầng",
    type: "template",
    description: "Template kế hoạch quý dùng để triển khai hệ thống O1 — Kế hoạch.",
    gated: true,
    pillar: "OPERATE",
    system: "O1",
  },
];

export const seedEvents: EventItem[] = [
  {
    slug: "workshop-business-os-assessment",
    title: "Workshop: Đọc hiểu và hành động sau Business OS Assessment",
    dateTime: "2026-09-20T09:00:00+07:00",
    location: "Online (Zoom)",
    online: true,
    capacity: 100,
    fee: "Miễn phí",
    registrationOpen: true,
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    name: "Nguyễn Văn A",
    title: "Giám đốc điều hành",
    company: "Công ty TNHH SME (theo thoả thuận ẩn danh một phần)",
    quote: "Phương pháp TUAN.BOS giúp đội ngũ tôi có cùng một ngôn ngữ vận hành, không còn mỗi người hiểu một kiểu.",
    consentGiven: true,
  },
];
