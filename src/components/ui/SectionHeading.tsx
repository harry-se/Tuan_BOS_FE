import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn("mb-10", align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gold">{eyebrow}</p>
      ) : null}
      <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-base text-charcoal/80 md:text-lg">{description}</p> : null}
    </div>
  );
}
