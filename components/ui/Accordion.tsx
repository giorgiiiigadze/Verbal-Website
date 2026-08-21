import type { QA } from "@/content/faq";

/**
 * Built on <details>, deliberately. It is the one interactive thing on the
 * site, and this way it needs no client component, no state and no JavaScript —
 * it also stays open-able and searchable if scripts never run.
 */
export function Accordion({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-card">
      {items.map((item) => (
        <details key={item.q} className="group px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-slab text-lg [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="shrink-0 text-2xl leading-none text-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="pb-6 pr-8 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
