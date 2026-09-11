import type { CSSProperties } from "react";
import { Section } from "@/components/layout/Section";
import { RateCardReveal } from "@/components/home/RateCardReveal";

// One spoken phrase maps to one saved app rate. Keeping the two together makes
// the animation's cause and effect impossible to drift apart when edited.
//
// Each line used to carry a `tone` as well, which coloured a dot beside it. It
// cycled blue/amber/green down the list and stood for nothing, so the dot is a
// plain dialogue rule now and the field is gone.
const RATE_STEPS = [
  { text: "Consumer unit needs replacing.", name: "Replace consumer unit", unit: "job", price: "$640.00" },
  { text: "Two double sockets in the kitchen.", name: "Double socket", unit: "each", price: "$90.00" },
  { text: "An EV charger by the drive.", name: "EV charger install", unit: "job", price: "$780.00" },
  { text: "Four fire-rated downlights too.", name: "Fit downlights", unit: "each", price: "$55.00" },
  { text: "Fault finding for the upstairs circuit.", name: "Fault finding", unit: "hour", price: "$65.00" },
  { text: "Move the consumer unit outside.", name: "Consumer unit move", unit: "job", price: "$220.00" },
  { text: "Add a fused spur for the oven.", name: "Fused spur", unit: "each", price: "$145.00" },
  { text: "Replace that pendant fitting.", name: "Pendant fitting", unit: "each", price: "$48.00" },
  { text: "Run a new socket to the shed.", name: "External socket", unit: "each", price: "$110.00" },
  { text: "And a final safety check.", name: "Electrical inspection", unit: "job", price: "$180.00" },
  { text: "Replace the bathroom extractor.", name: "Extractor fan", unit: "each", price: "$85.00" },
  { text: "Put LED strips under the cabinets.", name: "LED strip lighting", unit: "metre", price: "$32.00" },
  { text: "A new outdoor security light.", name: "Security light", unit: "each", price: "$95.00" },
  { text: "Swap the old board for an RCBO board.", name: "RCBO consumer unit", unit: "job", price: "$720.00" },
  { text: "Wire a new induction hob in.", name: "Cooker connection", unit: "each", price: "$75.00" },
  { text: "Change the hallway switches over.", name: "Light switch", unit: "each", price: "$42.00" },
  { text: "Add power for the garden office.", name: "Garden office supply", unit: "job", price: "$460.00" },
  { text: "Replace that bathroom light fitting.", name: "Bathroom light", unit: "each", price: "$68.00" },
  { text: "Test the whole circuit before you go.", name: "Circuit testing", unit: "hour", price: "$65.00" },
  { text: "Fit a new smoke alarm upstairs.", name: "Smoke alarm", unit: "each", price: "$48.00" },
];

// Repeats across the long sequence so the four visible layers lean both ways,
// instead of every later card accumulating a rightward slant.
const STACK_ROTATIONS = [-2.4, 1.6, -1.1, 2.1];

export function RateCardBand() {
  return (
    <RateCardReveal>
      <Section id="rates" tone="charcoal" className="scroll-mt-24 !py-12 sm:!py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-20 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rate-card-speech" aria-label="What was said">
            <div className="rate-card-speech__stage">
              {RATE_STEPS.map((step) => (
                <div key={step.text} data-rate-speech className="rate-card-speech__line flex items-center justify-end gap-3 text-right">
                  <span data-rate-accent aria-hidden="true" className="rate-card-accent" />
                  <AnimatedSpeech text={step.text} />
                </div>
              ))}
            </div>
          </div>

          {/* Centred in its own column, and left on the row's own middle line.
              It used to be pushed to the column's right edge and 80px down from
              there, which set the stack against the section's outer edge and
              below the speech beside it; the two now meet in the middle of the
              row, which is where `items-center` on the grid was already putting
              everything else. */}
          <div className="w-full max-w-lg justify-self-center">
            {/* They share one stage instead of forming a vertical list. Each
                arriving card stays present and becomes the layer underneath the
                next one — the same accumulating-card motion as the reference. */}
            <div className="rate-card-stack">
              {RATE_STEPS.map((rate, index) => (
                <div
                  key={rate.name}
                  className={`rate-card-stack__layer rate-card-stack__layer--${index}`}
                  style={{
                    top: `${index * 2}px`,
                    zIndex: index + 1,
                    transform: `rotate(${STACK_ROTATIONS[index % STACK_ROTATIONS.length]}deg)`,
                  } as CSSProperties}
                >
                  <div data-rate-card className="rate-card-item">
                    <span className="rate-card-item__icon"><TagGlyph /></span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[15px] font-medium text-[#e6eaec] sm:text-base">{rate.name}</span>
                      <span className="mt-0.5 block text-[13px] text-[#9ca2a5]">per {rate.unit}</span>
                    </span>
                    <span className="min-w-[5.5rem] shrink-0 text-right text-[15px] font-semibold tabular-nums text-[#e6eaec] sm:text-base">{rate.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </RateCardReveal>
  );
}

// Individual letters exist in the server-rendered markup, so the animation
// never rewrites text after hydration. The parent remains labelled with the
// full sentence for assistive technology.
function AnimatedSpeech({ text }: { text: string }) {
  return (
    <p
      aria-label={text}
      className="min-w-0 text-right font-editorial text-[clamp(1.15rem,1.85vw,1.75rem)] leading-[1.08] tracking-tight text-white"
    >
      {Array.from(text).map((letter, index) => (
        <span key={`${letter}-${index}`} aria-hidden="true" data-rate-letter className="inline-block">
          {letter === " " ? "\u00a0" : letter}
        </span>
      ))}
    </p>
  );
}

function TagGlyph() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 fill-current"><path d="M1.5 2.75A1.25 1.25 0 0 1 2.75 1.5h4.7c.33 0 .65.13.88.37l5.8 5.8a1.25 1.25 0 0 1 0 1.77l-4.7 4.7a1.25 1.25 0 0 1-1.77 0l-5.8-5.8a1.24 1.24 0 0 1-.36-.88V2.75Zm3.75 2.87a1.12 1.12 0 1 0 0-2.24 1.12 1.12 0 0 0 0 2.24Z" /></svg>;
}
