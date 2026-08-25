import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "clientLabel", title: "Khách hàng/nhãn hiển thị", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "clientLabel" }, validation: (r) => r.required() }),
    defineField({ name: "industry", title: "Ngành", type: "string" }),
    defineField({ name: "problem", title: "Vấn đề", type: "text" }),
    defineField({ name: "baseline", title: "Baseline (trước can thiệp)", type: "text" }),
    defineField({ name: "intervention", title: "Can thiệp", type: "text" }),
    defineField({ name: "systems", title: "Systems liên quan", type: "array", of: [{ type: "reference", to: [{ type: "system" }] }] }),
    defineField({ name: "result", title: "Kết quả", type: "text" }),
    defineField({ name: "evidence", title: "Bằng chứng/nguồn số liệu", type: "text" }),
    defineField({ name: "quote", title: "Trích dẫn", type: "text" }),
    defineField({ name: "confidentialityFlag", title: "Ẩn danh khách hàng", type: "boolean", initialValue: true }),
  ],
});
