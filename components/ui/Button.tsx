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

/** `lg` is the hero CTA; everything else uses the default. It only grows from
 *  `sm` up — at full size the two hero buttons do not fit one row on a 375px
 *  phone, and they wrap into a ragged stack. */
const sizes = {
  md: "px-6 py-3 text-base",
  lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
} as const;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  // Fully rounded, to match the header pill — the shape language of the site.
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full",
    "font-semibold transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    sizes[size],
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
