import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên").max(120),
  email: z.string().trim().email("Email không hợp lệ"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  intent: z.enum(["discovery", "advisory", "media", "other"]).default("other"),
  message: z.string().trim().min(10, "Vui lòng mô tả ngắn gọn nhu cầu (tối thiểu 10 ký tự)").max(2000),
  consent: z.literal(true, { message: "Cần đồng ý để chúng tôi liên hệ lại" }),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});
export type ContactFormInput = z.infer<typeof contactFormSchema>;

export const newsletterFormSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  consent: z.literal(true, { message: "Cần đồng ý nhận nội dung" }),
  source: z.string().trim().max(120).optional(),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});
export type NewsletterFormInput = z.infer<typeof newsletterFormSchema>;

export const communityApplicationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email("Email không hợp lệ"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  role: z.string().trim().max(160).optional().or(z.literal("")),
  motivation: z.string().trim().min(10, "Vui lòng chia sẻ lý do bạn muốn tham gia").max(2000),
  agreeCodeOfConduct: z.literal(true, { message: "Cần đồng ý với nguyên tắc cộng đồng" }),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});
export type CommunityApplicationInput = z.infer<typeof communityApplicationSchema>;

export const assessmentSubmissionSchema = z.object({
  answers: z.record(z.string(), z.number().min(1).max(5)),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email("Email không hợp lệ"),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Cần đồng ý để nhận báo cáo" }),
  source: z.string().trim().max(160).optional(),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});
export type AssessmentSubmissionInput = z.infer<typeof assessmentSubmissionSchema>;

export const checkoutSchema = z.object({
  itemType: z.enum(["book", "course"]),
  slug: z.string().trim().min(1),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email("Email không hợp lệ"),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional().or(z.literal("")),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;
