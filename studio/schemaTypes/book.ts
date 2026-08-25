import { defineField, defineType } from "sanity";

export const book = defineType({
  name: "book",
  title: "Book",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "cover", title: "Ảnh bìa", type: "image", options: { hotspot: true } }),
    defineField({ name: "description", title: "Mô tả", type: "text" }),
    defineField({ name: "toc", title: "Mục lục", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "sampleExcerpt", title: "Chương đọc thử", type: "text" }),
    defineField({ name: "formats", title: "Định dạng", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "priceVnd", title: "Giá (VND)", type: "number", validation: (r) => r.required().min(0) }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Tên người review" },
            { name: "quote", type: "text", title: "Nội dung review" },
          ],
        },
      ],
    }),
  ],
});
