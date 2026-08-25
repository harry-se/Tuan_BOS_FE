import { defineField, defineType } from "sanity";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "type",
      title: "Loại resource",
      type: "string",
      options: { list: ["checklist", "template", "guide", "assessment"] },
    }),
    defineField({ name: "description", title: "Mô tả", type: "text" }),
    defineField({ name: "downloadFile", title: "File tải về", type: "file" }),
    defineField({ name: "downloadUrl", title: "Link ngoài (nếu có)", type: "url" }),
    defineField({ name: "gated", title: "Yêu cầu điền form trước khi tải", type: "boolean", initialValue: true }),
    defineField({ name: "pillar", title: "Pillar", type: "reference", to: [{ type: "pillar" }] }),
    defineField({ name: "system", title: "System", type: "reference", to: [{ type: "system" }] }),
  ],
});
