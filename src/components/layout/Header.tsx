"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { primaryNav, siteConfig } from "@/lib/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith("/studio")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-ivory/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/logo/logo-r2.png" alt="TUAN.BOS logo" width={40} height={40} className="h-10 w-10" priority />
          <span className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold tracking-wide text-navy">{siteConfig.name}</span>
            <span className="text-xs text-charcoal/70">{siteConfig.brand}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Điều hướng chính">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-charcoal/80 underline-offset-4 transition-colors hover:text-gold hover:underline hover:decoration-gold",
                pathname === item.href && "text-gold underline decoration-gold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          {/* <Button href={siteConfig.primaryCta.href} size="md">
            {siteConfig.primaryCta.label}
          </Button> */}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-navy/10 bg-ivory px-4 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Điều hướng mobile">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium text-charcoal/85 hover:bg-sand/50",
                  pathname === item.href && "bg-sand/60 text-navy"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {/* <Button href={siteConfig.primaryCta.href} className="mt-4 w-full" onClick={() => setOpen(false)}>
            {siteConfig.primaryCta.label}
          </Button> */}
        </div>
      ) : null}
    </header>
  );
}
