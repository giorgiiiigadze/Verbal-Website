import Image from "next/image";
import { MinusMark, PlusMark } from "@/components/ui/marks";
import type { QA } from "@/content/faq";

const DIGIT_ICONS: Record<string, string> = {
  "0": "/icons/faq-number-0.svg",
  "1": "/icons/faq-number-1.svg",
  "2": "/icons/faq-number-2.svg",
  "3": "/icons/faq-number-3.svg",
  "4": "/icons/faq-number-4.svg",
  "5": "/icons/faq-number-5.svg",
  "6": "/icons/faq-number-6.svg",
  "7": "/icons/faq-number-7.svg",
  "8": "/icons/faq-number-8.svg",
  "9": "/icons/faq-number-9.svg",
};

function QuestionNumber({ value }: { value: number }) {
  return (
    <span className="faq-number" aria-hidden="true">
      {String(value)
        .split("")
        .map((digit, digitIndex) => (
          <Image
            key={`${value}-${digitIndex}`}
            src={DIGIT_ICONS[digit]}
            alt=""
            width={96}
            height={96}
            className="faq-number-digit"
          />
        ))}
    </span>
  );
}

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
 *
 * `faq-row` is what makes the answer slide rather than appear — see the rule on
 * `::details-content` in globals.css. It lives there and not in a utility here
 * because Tailwind has no variant for that pseudo-element.
 */
export function Accordion({ items }: { items: QA[] }) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.q} className="faq-row group">
          <summary className="faq-summary">
            <QuestionNumber value={index + 1} />
            <span className="faq-question">{item.q}</span>
            <span className="faq-toggle" aria-hidden="true">
              <PlusMark className="absolute inset-2 h-5 w-5 transition-all duration-200 group-open:scale-75 group-open:opacity-0" />
              <MinusMark className="absolute inset-2 h-5 w-5 scale-75 opacity-0 transition-all duration-200 group-open:scale-100 group-open:opacity-100" />
            </span>
          </summary>
          <div className="faq-answer-wrap">
            <p className="faq-answer">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
