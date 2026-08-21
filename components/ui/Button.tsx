import Link from "next/link";
import { cn } from "@/lib/cn";

const styles = {
  primary:
    "bg-primary text-white hover:bg-primary-hover focus-visible:outline-primary",
  secondary:
    "bg-card text-text border border-line hover:bg-surface focus-visible:outline-primary",
  ghostOnRoyal:
    "bg-white text-primary hover:bg-tint focus-visible:outline-white",
} as const;

export function Button({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  className?: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(
    "inline-flex items-center justify-center rounded-[var(--radius-chip)] px-6 py-3",
    "text-base font-semibold transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    styles[variant],
    className,
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
