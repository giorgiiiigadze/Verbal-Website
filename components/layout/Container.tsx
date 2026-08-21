import { cn } from "@/lib/cn";

const widths = {
  default: "max-w-6xl",
  /** The hero only. It carries the largest type on the site and needs the room. */
  wide: "max-w-7xl",
} as const;

/**
 * The site's horizontal gutter. The header pill is built to land its contents
 * on exactly this line — see the note in SiteHeader — so changing it here means
 * changing the two values there to match.
 */
export const GUTTER = "px-6 sm:px-10";

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: keyof typeof widths;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full", GUTTER, widths[size], className)}>
      {children}
    </div>
  );
}
