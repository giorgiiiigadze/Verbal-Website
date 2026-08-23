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
  const classes = cn(
    "inline-flex items-center justify-center gap-2",
    // Every button on the site is a pill. It was a prop for a while, so the
    // hero and header CTAs could be softened rectangles instead, but nothing
    // else ever used the other shape and the two readings sat badly together.
    // Hardcoded rather than passed in because `cn` is a plain join with no
    // tailwind-merge, so a second border-radius utility would only race this
    // one and let stylesheet order decide.
    "rounded-full font-semibold transition-colors",
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
