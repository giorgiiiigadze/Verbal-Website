import { cn } from "@/lib/cn";

/**
 * A still of what comes back after you speak a job — the same shape as the
 * quote sheet the app renders, in the app's own status colours.
 *
 * The "Needs price" row is the point of this component, not decoration: it is
 * the app's most distinctive behaviour, and showing it is more convincing than
 * a sentence claiming it.
 */
export function QuotePreview({ className }: { className?: string }) {
  const lines = [
    { name: "Replace consumer unit", qty: "1 job", price: "$640.00" },
    { name: "Add a double socket", qty: "2 each", price: "$180.00" },
    { name: "Chase in spur for oven", qty: "1 job", price: "$145.00" },
  ];

  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-line bg-card p-6 shadow-sm",
        className,
      )}
      aria-label="Example quote"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-slab text-lg leading-snug">
            Consumer unit and kitchen sockets
          </p>
          <p className="mt-1 text-sm text-muted">Quote 0042 · Kapanadze Electrical</p>
        </div>
        <span className="shrink-0 rounded-full bg-sent-fill px-3 py-1 text-xs font-semibold text-sent">
          Sent
        </span>
      </div>

      <div className="mt-6 space-y-3 border-t border-line pt-5">
        {lines.map((line) => (
          <div key={line.name} className="flex items-baseline justify-between gap-4 text-sm">
            <span>
              {line.name}
              <span className="ml-2 text-muted">{line.qty}</span>
            </span>
            <span className="shrink-0 tabular-nums">{line.price}</span>
          </div>
        ))}

        <div className="flex items-baseline justify-between gap-4 text-sm">
          <span>
            Fire-rated downlights
            <span className="ml-2 text-muted">6 each</span>
          </span>
          <span className="shrink-0 rounded-full bg-warning-fill px-2.5 py-0.5 text-xs font-semibold text-warning">
            Needs price
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
        <span className="text-sm text-muted">Total so far</span>
        <span className="font-slab text-xl tabular-nums">$1,145.00</span>
      </div>
    </div>
  );
}
