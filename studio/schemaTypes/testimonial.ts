import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Tên", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Chức danh", type: "string" }),
    defineField({ name: "company", title: "Công ty (nếu được phép nêu)", type: "string" }),
    defineField({ name: "quote", title: "Trích dẫn", type: "text", validation: (r) => r.required() }),
    defineField({ name: "source", title: "Nguồn/kênh", type: "string" }),
    defineField({ name: "consentGiven", title: "Đã có sự đồng ý sử dụng", type: "boolean", initialValue: false, validation: (r) => r.required() }),
  ],
});
