import { cn } from "@/lib/utils";
import type { PillarCode } from "@/lib/content/types";

const pillarClasses: Record<PillarCode, string> = {
  BUILD: "bg-navy/10 text-navy",
  OPERATE: "bg-gold/15 text-[#8a6a2f]",
  SCALE: "bg-terracotta/10 text-terracotta",
};

export function PillarBadge({ pillar }: { pillar: PillarCode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide", pillarClasses[pillar])}>
      {pillar}
    </span>
  );
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-navy/15 bg-white/60 px-3 py-1 text-xs text-charcoal/80", className)}>
      {children}
    </span>
  );
}
