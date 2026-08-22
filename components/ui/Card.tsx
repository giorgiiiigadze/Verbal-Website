import { cn } from "@/lib/cn";

/** Rest props are spread so a caller can hang a `data-*` hook on a card —
 *  the reveal wrappers find their targets by attribute. */
export function Card({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[var(--radius-card)] border border-line bg-card p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}
