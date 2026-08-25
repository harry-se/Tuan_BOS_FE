import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile (Founder)",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Tên hiển thị", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Vai trò/chức danh", type: "string" }),
    defineField({ name: "bioShort", title: "Bio ngắn (~50 từ)", type: "text" }),
    defineField({ name: "bioMedium", title: "Bio trung (~150 từ)", type: "text" }),
    defineField({ name: "bioLong", title: "Bio dài (~300 từ)", type: "text" }),
    defineField({ name: "credentials", title: "Credentials/chứng chỉ công khai", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Nền tảng" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
    defineField({ name: "photos", title: "Ảnh", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
  ],
});
