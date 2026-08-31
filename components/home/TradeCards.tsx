import type { CSSProperties } from "react";
import { TRADES } from "@/content/trades";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/Section";
import { TradeCardsReveal } from "@/components/home/TradeCardsReveal";

/**
 * Who the app is for, as the trade names themselves, running past.
 *
 * It was six cards, each carrying a trade and three of its priced jobs. Three
 * scrolling rows say the same thing in a glance and hold every trade the app
 * knows rather than the first six — the argument of the section is the length
 * of the list, and a grid could only show it by getting taller.
 *
 * The rows are full bleed, outside the container the heading sits in, because
 * a marquee that stops at a gutter reads as a widget on the page rather than
 * as something passing behind it. That is why this builds its own `section`
 * instead of using `Section`, which puts everything inside a `Container`.
 */

/**
 * Each row is the whole list, rotated by a third, so no two rows read alike or
 * come round together. Rotating rather than slicing means every trade appears
 * in every row, and a row is long enough that its own repeat is off screen.
 */
const ROWS = 3;

function rowTrades(row: number) {
  const step = Math.round(TRADES.length / ROWS) * row;
  return [...TRADES.slice(step), ...TRADES.slice(0, step)];
}

/**
 * Per row: how long one lap takes, and whether it runs the other way.
 *
 * Middle row against the other two, so the eye has something to catch on;
 * three different durations so the rows drift out of step with each other
 * instead of marching. Slow — a lap is the better part of a minute — because
 * this is a texture behind a heading, not something to be read at speed.
 */
const TRACKS = [
  { duration: "56s", reverse: false },
  { duration: "46s", reverse: true },
  { duration: "64s", reverse: false },
];

/**
 * The four brand colours at 15%, cycling. Full strength with a white label was
 * what the job chips used and it measured under AA on three of the four; a
 * tint carries the same colour with the label in the site's own ink.
 *
 * Whole class strings because Tailwind reads the source statically.
 */
const CHIP_TONES = [
  "bg-[#0098F2]/15",
  "bg-[#FF6363]/15",
  "bg-[#5D9C06]/15",
  "bg-[#6C56FC]/15",
];

export function TradeCards() {
  return (
    <TradeCardsReveal>
      <section className="bg-bg py-14 sm:py-20">
        {/* The heading is centred and set black. The colour rides on the wrapper
            rather than the h2 because SectionHeading takes no class for it — the
            eyebrow and lead set their own colours, so only the title inherits. */}
        <Container>
          <div data-trade-head className="text-black">
            <SectionHeading
              align="center"
              eyebrow="Who it is for"
              eyebrowTone="brand"
              title="Who does Verbal work for?"
              lead="Set up asks what you charge for the jobs your trade does most. These are the ones it already knows to ask about."
            />
          </div>
        </Container>

        <div className="trade-fade mt-14 space-y-3 sm:space-y-4">
          {TRACKS.map(({ duration, reverse }, row) => (
            <div key={duration} data-trade-row className="overflow-hidden">
              <ul
                className={`trade-track flex w-max ${reverse ? "trade-track-reverse" : ""}`}
                style={{ "--trade-duration": duration } as CSSProperties}
              >
                {/* Twice, because the track is moved by half its width and the
                    second copy is what stands where the first began. The copy
                    is hidden from assistive technology: it is the same fifteen
                    trades a second time and says nothing new. */}
                {[0, 1].map((copy) =>
                  rowTrades(row).map((trade, i) => (
                    <li
                      key={`${copy}-${trade.name}`}
                      aria-hidden={copy === 1 ? true : undefined}
                      className={`mr-3 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-text sm:mr-4 ${
                        CHIP_TONES[i % CHIP_TONES.length]
                      }`}
                    >
                      {trade.name}
                    </li>
                  )),
                )}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </TradeCardsReveal>
  );
}
