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
 * The chips are unfilled: a dark hairline and a low shadow, so a row reads as
 * outlines passing rather than as confetti. Four cycling colour tints read as
 * a category the trades do not have — nothing makes a plumber blue. The border
 * darkens on hover, the one thing here that answers a pointer.
 *
 * The darkening is slow — half a second, eased out. The chips are moving, so a
 * still pointer is passed over by one chip after another, and at the default
 * speed each would snap to its dark border and back: a flicker travelling with
 * the row rather than an answer to the pointer. Over half a second the border
 * is still on its way in as the chip leaves, so what the row shows is a soft
 * swell under the pointer instead of a line of chips blinking in turn.
 */
const CHIP_CLASS =
  "border border-black/15 bg-transparent " +
  "shadow-[0_1px_2px_rgba(0,0,0,0.06),0_6px_14px_-6px_rgba(0,0,0,0.18)] " +
  "transition-colors duration-500 ease-out hover:border-black/45";

export function TradeCards() {
  return (
    <TradeCardsReveal>
      {/* Deeper than the house `py-14 sm:py-20` the other sections take. The
          rows are full bleed and moving, so they need clear air above and below
          to read as their own band — at the standard padding the marquee sits
          close enough to the dark ShareBand under it to look like its lid. */}
      <section className="bg-bg py-24 sm:py-36">
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

        <div className="trade-fade mt-14">
          {TRACKS.map(({ duration, reverse }, row) => (
            /* The row clips the track it holds, and the padding is what keeps
               the chips' shadow from being clipped with it: a row is exactly as
               tall as a chip, so anything the shadow throws below the chip lands
               outside the box and is cut. The padding sits inside the clipping
               box, so it gives the shadow its room and spaces the rows at the
               same time — which is why there is no `space-y` here. */
            <div key={duration} data-trade-row className="overflow-hidden py-2">
              <ul
                className={`trade-track flex w-max ${reverse ? "trade-track-reverse" : ""}`}
                style={{ "--trade-duration": duration } as CSSProperties}
              >
                {/* Twice, because the track is moved by half its width and the
                    second copy is what stands where the first began. The copy
                    is hidden from assistive technology: it is the same fifteen
                    trades a second time and says nothing new. */}
                {[0, 1].map((copy) =>
                  rowTrades(row).map((trade) => (
                    <li
                      key={`${copy}-${trade.name}`}
                      aria-hidden={copy === 1 ? true : undefined}
                      className={`mr-3 whitespace-nowrap rounded-full px-6 py-2.5 text-base font-semibold text-text sm:mr-4 sm:px-7 sm:text-lg ${CHIP_CLASS}`}
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
