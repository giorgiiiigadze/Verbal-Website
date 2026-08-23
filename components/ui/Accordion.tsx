import type { QA } from "@/content/faq";

/**
 * Built on <details>, deliberately. It is the one interactive thing on the
 * site, and this way it needs no client component, no state and no JavaScript —
 * it also stays open-able and searchable if scripts never run.
 *
 * No card around it: it used to be a white panel with a border, which worked
 * while the section behind it was grey and read as white-on-white once that
 * went. Now the rows are held apart by their dividers alone and run the full
 * width they are given, so the questions line up with the rest of the page.
 */
export function Accordion({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left font-slab text-lg text-black [&::-webkit-details-marker]:hidden">
            {item.q}
            <span
              aria-hidden="true"
              className="shrink-0 text-2xl leading-none text-muted transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-8 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
