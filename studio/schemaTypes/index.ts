import { type SchemaTypeDefinition } from "sanity";

import { pillar, system, topic } from "./taxonomy";
import { profile } from "./profile";
import { article } from "./article";
import { caseStudy } from "./caseStudy";
import { book } from "./book";
import { course } from "./course";
import { resource } from "./resource";
import { event } from "./event";
import { testimonial } from "./testimonial";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pillar, system, topic, profile, article, caseStudy, book, course, resource, event, testimonial],
};
