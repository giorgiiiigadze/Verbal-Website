import { cn } from "@/lib/cn";

const widths = {
  default: "max-w-6xl",
  /** The hero only. It carries the largest type on the site and needs the room. */
  wide: "max-w-7xl",
} as const;

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
    <div className={cn("mx-auto w-full px-5 sm:px-8", widths[size], className)}>
      {children}
    </div>
  );
}
