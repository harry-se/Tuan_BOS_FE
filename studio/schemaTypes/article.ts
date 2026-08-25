import { defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article / Video",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Tóm tắt", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "contentType",
      title: "Loại nội dung",
      type: "string",
      options: { list: ["article", "video"] },
      initialValue: "article",
    }),
    defineField({ name: "youtubeUrl", title: "YouTube URL (nếu là video)", type: "url" }),
    defineField({ name: "transcript", title: "Transcript (nếu là video)", type: "text" }),
    defineField({ name: "body", title: "Nội dung", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "author", title: "Tác giả", type: "reference", to: [{ type: "profile" }] }),
    defineField({ name: "pillar", title: "Pillar", type: "reference", to: [{ type: "pillar" }], validation: (r) => r.required() }),
    defineField({ name: "system", title: "System", type: "reference", to: [{ type: "system" }] }),
    defineField({ name: "topic", title: "Topic", type: "reference", to: [{ type: "topic" }] }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "cover", title: "Ảnh cover", type: "image", options: { hotspot: true } }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text" }),
    defineField({ name: "publishedAt", title: "Ngày publish", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "updatedAt", title: "Ngày cập nhật", type: "datetime" }),
    defineField({ name: "readingTime", title: "Thời gian đọc (phút)", type: "number" }),
    defineField({
      name: "relatedContent",
      title: "Nội dung liên quan",
      type: "array",
      of: [{ type: "reference", to: [{ type: "article" }] }],
    }),
  ],
});
