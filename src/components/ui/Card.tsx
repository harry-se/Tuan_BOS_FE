import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-navy/10 bg-white/70 p-6 shadow-sm transition-shadow hover:shadow-md", className)}>
      {children}
    </div>
  );
}
