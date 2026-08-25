import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-navy text-ivory hover:bg-ink focus-visible:bg-ink",
  secondary: "bg-transparent text-navy border border-navy hover:bg-navy hover:text-ivory",
  ghost: "bg-transparent text-navy hover:bg-sand/60",
};

const sizeClasses: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  onClick,
  ...props
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variantClasses[variant], sizeClasses[size], className);
  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
