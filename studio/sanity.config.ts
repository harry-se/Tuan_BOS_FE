import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schema } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "tuanbos",
  title: "TUAN.BOS Studio",
  projectId,
  dataset,
  schema,
  plugins: [structureTool(), visionTool()],
});
