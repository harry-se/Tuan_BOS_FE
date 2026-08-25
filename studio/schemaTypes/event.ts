import { defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tiêu đề", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "dateTime", title: "Thời gian", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Địa điểm", type: "string" }),
    defineField({ name: "online", title: "Trực tuyến", type: "boolean", initialValue: false }),
    defineField({ name: "capacity", title: "Sức chứa", type: "number" }),
    defineField({ name: "fee", title: "Chi phí", type: "string" }),
    defineField({ name: "registrationOpen", title: "Đang mở đăng ký", type: "boolean", initialValue: true }),
  ],
});
