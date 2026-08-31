import { MinusMark, PlusMark } from "@/components/ui/marks";
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
 *
 * The marker was a typed "+" rotated 45 degrees into a cross on open. It is
 * now the drawn pair, which cannot be got at by rotating one of them — a
 * hand-drawn plus turned on its corner reads as a tilted plus, not a minus.
 * So both are rendered, stacked, and crossfaded by `group-open`: still CSS
 * only, still no script, and the state change keeps the movement the rotation
 * used to give it.
 */
export function Accordion({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left font-slab text-lg text-black [&::-webkit-details-marker]:hidden">
            {item.q}
            {/* The box is what holds the row's right edge steady: the two
                drawings are different shapes, and letting either one size the
                slot would shift the questions as rows open and close. */}
            <span
              aria-hidden="true"
              className="relative block h-6 w-6 shrink-0"
            >
              <PlusMark className="absolute inset-0 h-full w-full transition-opacity duration-200 group-open:opacity-0" />
              <MinusMark className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-200 group-open:opacity-100" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-8 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
