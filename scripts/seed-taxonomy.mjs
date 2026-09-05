// One-time (idempotent) seed script: pushes the canonical 3 Pillars + 9 Systems
// + a starter founder Profile into a Sanity dataset, so admins don't have to
// hand-create these reference documents in Studio before tagging real content
// (Article/Book/Course/... all reference Pillar/System).
//
// Mirrors src/lib/content/pillars.ts and the founderProfile in
// src/lib/content/seed.ts — if that taxonomy ever changes, update both places.
//
// Usage (run locally, NOT on the server — needs a write-scoped token):
//   node --env-file=.env.local scripts/seed-taxonomy.mjs
// or pass everything inline:
//   SANITY_API_TOKEN=xxx NEXT_PUBLIC_SANITY_PROJECT_ID=xxx NEXT_PUBLIC_SANITY_DATASET=production node scripts/seed-taxonomy.mjs
//
// Get a token at https://www.sanity.io/manage -> your project -> API -> Tokens
// -> "Add API token" with at least "Editor" permission. Never commit this
// token or put it in NEXT_PUBLIC_* — it is only ever read here, from your own
// shell/env, and is not needed by the running Next.js app.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SEED_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing required env vars. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET (or SEED_DATASET to target a different one), and SANITY_API_TOKEN (a write-scoped token)."
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion: "2025-01-01", token, useCdn: false });

const pillars = [
  {
    _id: "pillar-build",
    _type: "pillar",
    code: "BUILD",
    name: "BUILD",
    tagline: "Xây đúng",
    description:
      "Xây nền tảng chiến lược, lãnh đạo và tổ chức đúng ngay từ đầu, để doanh nghiệp có một hệ điều hành thay vì phản ứng từng ngày.",
  },
  {
    _id: "pillar-operate",
    _type: "pillar",
    code: "OPERATE",
    name: "OPERATE",
    tagline: "Chạy đều",
    description:
      "Chuyển chiến lược thành kế hoạch, thực thi và vận hành hằng ngày có nhịp, có đo lường, không phụ thuộc trí nhớ người chủ.",
  },
  {
    _id: "pillar-scale",
    _type: "pillar",
    code: "SCALE",
    name: "SCALE",
    tagline: "Tăng trưởng bền vững",
    description:
      "Mở rộng tăng trưởng, tài chính và năng lực số một cách có kiểm soát, để quy mô lớn hơn không kéo theo rủi ro lớn hơn.",
  },
];

const systems = [
  {
    _id: "system-b1",
    code: "B1",
    pillarId: "pillar-build",
    name: "Chiến lược",
    slug: "chien-luoc",
    commonProblems: [
      "Chiến lược chỉ nằm trong đầu người chủ, đội ngũ không biết ưu tiên gì",
      "Mục tiêu năm thay đổi liên tục theo cảm tính thị trường",
      'Không có tiêu chí rõ ràng để nói "không" với cơ hội sai',
    ],
    goal: "Có một bản chiến lược rõ ràng, được viết ra, được đội ngũ hiểu và dùng để ra quyết định hằng ngày.",
    mainModules: ["Định vị & lợi thế cạnh tranh", "Mục tiêu 1–3 năm", "Ưu tiên hoá chiến lược"],
    tools: ["Strategy Canvas", "Bảng ưu tiên chiến lược"],
    expectedResults: ["Tài liệu chiến lược 1 trang", "Bộ tiêu chí ra quyết định dùng chung"],
  },
  {
    _id: "system-b2",
    code: "B2",
    pillarId: "pillar-build",
    name: "Lãnh đạo",
    slug: "lanh-dao",
    commonProblems: [
      "Người chủ là nút thắt của mọi quyết định",
      "Đội ngũ quản lý thiếu năng lực lãnh đạo, chỉ giỏi chuyên môn",
      "Văn hoá lãnh đạo không nhất quán giữa các cấp",
    ],
    goal: "Xây năng lực lãnh đạo phân tầng, giảm phụ thuộc vào một cá nhân duy nhất.",
    mainModules: ["Mô hình lãnh đạo phân quyền", "Phát triển quản lý kế cận", "Nhịp ra quyết định"],
    tools: ["Ma trận phân quyền (RACI)", "Khung phát triển lãnh đạo"],
    expectedResults: ["Cây phân quyền rõ ràng", "Lộ trình phát triển quản lý kế cận"],
  },
  {
    _id: "system-b3",
    code: "B3",
    pillarId: "pillar-build",
    name: "Tổ chức & Đội ngũ",
    slug: "to-chuc-doi-ngu",
    commonProblems: [
      "Sơ đồ tổ chức không khớp với cách công ty thực sự vận hành",
      "Tuyển dụng theo tình huống khẩn cấp, không theo năng lực cần có",
      "Nhân sự chủ chốt nghỉ là quy trình sụp đổ",
    ],
    goal: "Có cấu trúc tổ chức, vai trò và năng lực phù hợp với giai đoạn tăng trưởng hiện tại.",
    mainModules: ["Thiết kế cơ cấu tổ chức", "Khung năng lực theo vai trò", "Quy trình tuyển dụng & onboarding"],
    tools: ["Org Design Canvas", "Bộ mô tả công việc chuẩn hoá"],
    expectedResults: ["Sơ đồ tổ chức cập nhật theo giai đoạn", "Quy trình onboarding chuẩn"],
  },
  {
    _id: "system-o1",
    code: "O1",
    pillarId: "pillar-operate",
    name: "Kế hoạch",
    slug: "ke-hoach",
    commonProblems: [
      "Kế hoạch năm chỉ là con số doanh thu, thiếu hành động cụ thể",
      "Các phòng ban lập kế hoạch rời rạc, không khớp mục tiêu chung",
      "Không có nhịp review kế hoạch định kỳ",
    ],
    goal: "Chuyển mục tiêu chiến lược thành kế hoạch hành động theo quý/tháng, có chủ sở hữu rõ ràng.",
    mainModules: ["OKR/KPI theo tầng", "Kế hoạch quý", "Nhịp review kế hoạch"],
    tools: ["Bảng OKR liên tầng", "Mẫu kế hoạch quý"],
    expectedResults: ["Kế hoạch quý gắn với chiến lược", "Nhịp review hằng tháng"],
  },
  {
    _id: "system-o2",
    code: "O2",
    pillarId: "pillar-operate",
    name: "Thực thi",
    slug: "thuc-thi",
    commonProblems: [
      "Việc giao rồi nhưng không ai theo dõi tới cùng",
      "Họp nhiều nhưng quyết định ít, hành động càng ít",
      "Thiếu công cụ theo dõi tiến độ chung toàn công ty",
    ],
    goal: "Có cơ chế giao việc, theo dõi và chịu trách nhiệm thực thi rõ ràng, nhất quán.",
    mainModules: ["Cơ chế giao việc & theo dõi", "Nhịp họp hiệu quả", "Văn hoá chịu trách nhiệm"],
    tools: ["Bảng theo dõi hành động", "Khung họp weekly/monthly"],
    expectedResults: ["Tỷ lệ hoàn thành hành động tăng", "Nhịp họp gọn, có quyết định"],
  },
  {
    _id: "system-o3",
    code: "O3",
    pillarId: "pillar-operate",
    name: "Vận hành",
    slug: "van-hanh",
    commonProblems: [
      "Quy trình chỉ tồn tại trong đầu vài người",
      "Chất lượng không ổn định giữa các lần thực hiện",
      "Không có SOP cho các công việc lặp lại quan trọng",
    ],
    goal: "Chuẩn hoá quy trình vận hành cốt lõi để chất lượng ổn định dù ai thực hiện.",
    mainModules: ["Bản đồ quy trình cốt lõi", "SOP hoá công việc lặp lại", "Kiểm soát chất lượng"],
    tools: ["Process Map", "Thư viện SOP"],
    expectedResults: ["SOP cho quy trình trọng yếu", "Giảm sai sót lặp lại"],
  },
  {
    _id: "system-s1",
    code: "S1",
    pillarId: "pillar-scale",
    name: "Tăng trưởng",
    slug: "tang-truong",
    commonProblems: [
      "Tăng trưởng phụ thuộc một kênh/một khách hàng lớn",
      "Không có phễu tăng trưởng rõ ràng, đo lường được",
      "Mở rộng thị trường/sản phẩm theo cảm tính",
    ],
    goal: "Xây động cơ tăng trưởng có thể lặp lại và đo lường, giảm rủi ro phụ thuộc.",
    mainModules: ["Phễu tăng trưởng & kênh", "Chiến lược mở rộng sản phẩm/thị trường", "Đo lường tăng trưởng"],
    tools: ["Growth Funnel Canvas", "Bảng chỉ số tăng trưởng"],
    expectedResults: ["Phễu tăng trưởng có chỉ số theo dõi", "Đa dạng hoá nguồn tăng trưởng"],
  },
  {
    _id: "system-s2",
    code: "S2",
    pillarId: "pillar-scale",
    name: "Tài chính",
    slug: "tai-chinh",
    commonProblems: [
      "Chỉ nhìn doanh thu, không theo dõi dòng tiền và lợi nhuận theo mảng",
      "Không có ngân sách, chi tiêu theo cảm tính",
      "Ra quyết định lớn thiếu dữ liệu tài chính hỗ trợ",
    ],
    goal: "Có hệ thống tài chính đủ minh bạch để ra quyết định tăng trưởng an toàn.",
    mainModules: ["Quản trị dòng tiền", "Ngân sách & kiểm soát chi phí", "Chỉ số tài chính theo mảng kinh doanh"],
    tools: ["Cashflow Dashboard", "Mẫu ngân sách theo phòng ban"],
    expectedResults: ["Dòng tiền được dự báo hằng tháng", "Chỉ số tài chính cốt lõi minh bạch"],
  },
  {
    _id: "system-s3",
    code: "S3",
    pillarId: "pillar-scale",
    name: "Số hoá & AI",
    slug: "so-hoa-ai",
    commonProblems: [
      "Dữ liệu nằm rời rạc ở nhiều nơi, không dùng để ra quyết định",
      "Ứng dụng công nghệ/AI theo phong trào, thiếu mục tiêu vận hành rõ",
      "Không có ai chịu trách nhiệm về hạ tầng số của công ty",
    ],
    goal: "Dùng số hoá và AI như công cụ tăng năng suất và chất lượng quyết định, không phải trào lưu.",
    mainModules: ["Chuẩn hoá dữ liệu vận hành", "Tự động hoá quy trình lặp lại", "Ứng dụng AI có kiểm soát"],
    tools: ["Data & Tooling Map", "Khung đánh giá ưu tiên tự động hoá"],
    expectedResults: ["Một nguồn dữ liệu vận hành đáng tin", "Ít nhất một quy trình được tự động hoá"],
  },
];

const profile = {
  _id: "profile-tony",
  _type: "profile",
  name: "Tony Phạm Duy Tuân",
  role: "Chuyên gia/Cố vấn xây dựng Hệ điều hành Doanh nghiệp",
  bioShort:
    "Cố vấn doanh nghiệp thực chiến, tập trung giúp chủ doanh nghiệp xây dựng Hệ điều hành doanh nghiệp theo phương pháp TUAN.BOS™.",
};

function toSystemDoc(s) {
  return {
    _id: s._id,
    _type: "system",
    code: s.code,
    name: s.name,
    slug: { _type: "slug", current: s.slug },
    pillar: { _type: "reference", _ref: s.pillarId },
    commonProblems: s.commonProblems,
    goal: s.goal,
    mainModules: s.mainModules,
    tools: s.tools,
    expectedResults: s.expectedResults,
  };
}

async function run() {
  const docs = [...pillars, ...systems.map(toSystemDoc), profile];
  const tx = client.transaction();
  for (const doc of docs) tx.createOrReplace(doc);
  await tx.commit();
  console.log(`Seeded ${pillars.length} pillars, ${systems.length} systems, and 1 profile into dataset "${dataset}".`);
}

run().catch((err) => {
  console.error("Seed failed:", err.message || err);
  process.exit(1);
});
