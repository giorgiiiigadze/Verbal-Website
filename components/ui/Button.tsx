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
  /** The header pill only — anything taller makes the bar grow around it. */
  xs: "px-4 py-2 text-sm",
  sm: "px-5 py-2.5 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg",
} as const;

/** Pills are the site's default shape, matching the header. `rect` is the
 *  softened rectangle the hero and header CTAs use — a little rounder than the
 *  app's 12px chip radius, which read as sharp at this size. A prop rather
 *  than a className override because `cn` is a plain join and two
 *  border-radius utilities would race. */
const shapes = {
  pill: "rounded-full",
  rect: "rounded-2xl",
} as const;

export function Button({
  href,
  variant = "primary",
  size = "md",
  shape = "pill",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof styles;
  size?: keyof typeof sizes;
  shape?: keyof typeof shapes;
  className?: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    "font-semibold transition-colors",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    shapes[shape],
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
