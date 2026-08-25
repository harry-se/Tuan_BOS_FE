import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { Analytics } from "@/components/layout/Analytics";
import { siteConfig } from "@/lib/content/site";

import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.name} — ${siteConfig.brand}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.brand}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.brand}`,
    description: siteConfig.description,
  },
  icons: {
    icon: "/logo/logo-r2.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Chuyên gia/Cố vấn xây dựng Hệ điều hành Doanh nghiệp",
    url: `https://${siteConfig.domain}`,
    sameAs: [siteConfig.social.facebook, siteConfig.social.linkedin, siteConfig.social.youtube],
  };

  return (
    <html lang="vi" className={`${beVietnamPro.variable} ${notoSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-ivory text-charcoal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
