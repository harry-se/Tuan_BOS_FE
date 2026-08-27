"use client";

import Image from "next/image";
import Link from "next/link";

import { footerNav, siteConfig } from "@/lib/content/site";
import { trackEvent } from "@/lib/analytics/events";

import { FaFacebookF, FaYoutube,  } from "react-icons/fa";
import { SiZalo } from "react-icons/si";

function trackOutboundSocial(channel: string) {
  trackEvent("outbound_social", { channel });
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gold/20 bg-ink text-ivory/90">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo/logo-r2.png" alt="TUAN.BOS logo" width={44} height={44} />
            <div>
              <p className="font-semibold text-ivory">{siteConfig.name}</p>
              <p className="text-xs text-gold">{siteConfig.brand} — {siteConfig.tagline}</p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-ivory/70">{siteConfig.description}</p>
        </div>

        <FooterColumn title="Khám phá" links={footerNav.explore} />
        <FooterColumn title="Sách & Cộng đồng" links={footerNav.commerce} />

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">Kết nối</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors"
                onClick={() => trackOutboundSocial("facebook")}
              >
                <FaFacebookF size={16} />
                Facebook
              </a>
            </li>

            <li>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors"
                onClick={() => trackOutboundSocial("youtube")}
              >
                <FaYoutube size={18} />
                YouTube
              </a>
            </li>

            <li>
              <a
                href={siteConfig.social.zalo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors"
                onClick={() => trackOutboundSocial("zalo")}
              >
                <SiZalo size={18} />
                Zalo
              </a>
            </li>
          </ul>

        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-ivory/60 sm:flex-row sm:px-6 lg:px-8">
          <p>© {year} {siteConfig.name} — TUAN.BOS™. Bản quyền đã đăng ký.</p>
          <ul className="flex gap-4">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-gold">{title}</p>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-ivory/80 hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
