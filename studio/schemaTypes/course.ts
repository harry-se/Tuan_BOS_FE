import { defineField, defineType } from "sanity";

export const course = defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "outcome", title: "Kết quả đạt được", type: "text" }),
    defineField({ name: "audience", title: "Đối tượng học viên", type: "text" }),
    defineField({
      name: "curriculum",
      title: "Curriculum",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string", title: "Tên module" },
            { name: "summary", type: "text", title: "Tóm tắt" },
          ],
        },
      ],
    }),
    defineField({ name: "instructor", title: "Giảng viên", type: "reference", to: [{ type: "profile" }] }),
    defineField({ name: "deliveryMode", title: "Hình thức", type: "string" }),
    defineField({ name: "schedule", title: "Lịch khai giảng", type: "string" }),
    defineField({ name: "priceVnd", title: "Giá (VND)", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "registrationOpen", title: "Đang mở đăng ký", type: "boolean", initialValue: true }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", type: "string", title: "Câu hỏi" },
            { name: "answer", type: "text", title: "Trả lời" },
          ],
        },
      ],
    }),
  ],
});
