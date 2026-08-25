import type { MaturityStage, Pillar, System } from "./types";

export const pillars: Pillar[] = [
  {
    code: "BUILD",
    name: "BUILD",
    tagline: "Xây đúng",
    description:
      "Xây nền tảng chiến lược, lãnh đạo và tổ chức đúng ngay từ đầu, để doanh nghiệp có một hệ điều hành thay vì phản ứng từng ngày.",
    color: "navy",
  },
  {
    code: "OPERATE",
    name: "OPERATE",
    tagline: "Chạy đều",
    description:
      "Chuyển chiến lược thành kế hoạch, thực thi và vận hành hằng ngày có nhịp, có đo lường, không phụ thuộc trí nhớ người chủ.",
    color: "gold",
  },
  {
    code: "SCALE",
    name: "SCALE",
    tagline: "Tăng trưởng bền vững",
    description:
      "Mở rộng tăng trưởng, tài chính và năng lực số một cách có kiểm soát, để quy mô lớn hơn không kéo theo rủi ro lớn hơn.",
    color: "terracotta",
  },
];

export const systems: System[] = [
  {
    code: "B1",
    pillar: "BUILD",
    name: "Chiến lược",
    slug: "chien-luoc",
    commonProblems: [
      "Chiến lược chỉ nằm trong đầu người chủ, đội ngũ không biết ưu tiên gì",
      "Mục tiêu năm thay đổi liên tục theo cảm tính thị trường",
      "Không có tiêu chí rõ ràng để nói \"không\" với cơ hội sai",
    ],
    goal: "Có một bản chiến lược rõ ràng, được viết ra, được đội ngũ hiểu và dùng để ra quyết định hằng ngày.",
    mainModules: ["Định vị & lợi thế cạnh tranh", "Mục tiêu 1–3 năm", "Ưu tiên hoá chiến lược"],
    tools: ["Strategy Canvas", "Bảng ưu tiên chiến lược"],
    expectedResults: ["Tài liệu chiến lược 1 trang", "Bộ tiêu chí ra quyết định dùng chung"],
  },
  {
    code: "B2",
    pillar: "BUILD",
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
    code: "B3",
    pillar: "BUILD",
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
    code: "O1",
    pillar: "OPERATE",
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
    code: "O2",
    pillar: "OPERATE",
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
    code: "O3",
    pillar: "OPERATE",
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
    code: "S1",
    pillar: "SCALE",
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
    code: "S2",
    pillar: "SCALE",
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
    code: "S3",
    pillar: "SCALE",
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

export const maturityModel: MaturityStage[] = [
  { level: 1, name: "Reactive", description: "Xử lý theo tình huống, không có hệ thống hay tài liệu hoá." },
  { level: 2, name: "Defined", description: "Đã định nghĩa quy trình/mục tiêu nhưng thực thi chưa nhất quán." },
  { level: 3, name: "Operated", description: "Vận hành đều đặn theo hệ thống đã định nghĩa, có người phụ trách rõ." },
  { level: 4, name: "Measured", description: "Có chỉ số đo lường thường xuyên, ra quyết định dựa trên dữ liệu." },
  { level: 5, name: "Optimized", description: "Liên tục cải tiến dựa trên dữ liệu, hệ thống tự thích ứng theo tăng trưởng." },
];

export function getPillarByCode(code: string) {
  return pillars.find((p) => p.code === code);
}

export function getSystemsByPillar(code: string) {
  return systems.filter((s) => s.pillar === code);
}

export function getSystemByCode(code: string) {
  return systems.find((s) => s.code === code);
}

export function getSystemBySlug(slug: string) {
  return systems.find((s) => s.slug === slug);
}
