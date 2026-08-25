import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api", "/order/confirmation"] },
    ],
    sitemap: `https://${siteConfig.domain}/sitemap.xml`,
  };
}
