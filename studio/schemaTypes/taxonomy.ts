import { defineField, defineType } from "sanity";

export const pillar = defineType({
  name: "pillar",
  title: "Pillar (BUILD/OPERATE/SCALE)",
  type: "document",
  fields: [
    defineField({ name: "code", title: "Code", type: "string", options: { list: ["BUILD", "OPERATE", "SCALE"] }, validation: (r) => r.required() }),
    defineField({ name: "name", title: "Tên hiển thị", type: "string", validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Mô tả", type: "text" }),
  ],
});

export const system = defineType({
  name: "system",
  title: "System (9 Systems)",
  type: "document",
  fields: [
    defineField({ name: "code", title: "Code (B1, O2, S3...)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "name", title: "Tên hệ thống", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "pillar", title: "Pillar", type: "reference", to: [{ type: "pillar" }], validation: (r) => r.required() }),
    defineField({ name: "commonProblems", title: "Vấn đề thường gặp", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "goal", title: "Mục tiêu", type: "text" }),
    defineField({ name: "mainModules", title: "Module chính", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tools", title: "Công cụ", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "expectedResults", title: "Kết quả mong đợi", type: "array", of: [{ type: "string" }] }),
  ],
});

export const topic = defineType({
  name: "topic",
  title: "Topic",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Tên chủ đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
  ],
});
