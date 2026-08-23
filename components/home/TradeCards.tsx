import Link from "next/link";
import { TRADES } from "@/content/trades";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Who the app is for, as six trades rather than a claim.
 *
 * Six because it is two clean rows of three and stays one row per breakpoint
 * step; the rest of the list lives on /trades and the link at the foot counts
 * what is missing, so adding a trade to content/trades.ts needs no edit here.
 *
 * The jobs under each name are the real presets from the app's onboarding —
 * that is the whole argument of the section. A card that only carried a trade
 * name would be a logo wall, and would be saying nothing.
 */
const SHOWN = 6;

/**
 * Job chips are tinted, cycling through these four.
 *
 * Written out as whole class strings because Tailwind reads the source
 * statically — a class built from a variable at runtime never gets generated.
 *
 * Full strength, with the label in white. Dark text was tried and measures
 * worse on every one of the four, purple worst at about 2.5:1; white runs
 * 2.9:1 on the red to 4.8:1 on the purple. Three of the four are therefore
 * under AA for 12px type, which is a known trade and not an oversight.
 *
 * Three chips per card against four tones means the sequence walks by one card
 * to the next, so no two cards start on the same colour until the fifth.
 */
const CHIP_TONES = [
  "bg-[#0098F2]",
  "bg-[#FF6363]",
  "bg-[#5D9C06]",
  "bg-[#6C56FC]",
];

const CHIPS_PER_CARD = 3;

export function TradeCards() {
  const shown = TRADES.slice(0, SHOWN);
  const rest = TRADES.length - SHOWN;

  return (
    // Six cards, so the stagger is tightened the way FeatureGrid's is.
    <Reveal stagger={0.06}>
      <Section>
        {/* The heading is centred and set black. The colour rides on the wrapper
            rather than the h2 because SectionHeading takes no class for it — the
            eyebrow and lead set their own colours, so only the title inherits. */}
        <div data-reveal className="text-black">
          <SectionHeading
            align="center"
            eyebrow="Who it is for"
            eyebrowTone="brand"
            title="Who does Verbal work for?"
            lead="Set up asks what you charge for the jobs your trade does most. These are the ones it already knows to ask about."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((trade, cardIndex) => (
            // Not <Card>: it hardcodes `bg-card`, and `cn` is a plain join with
            // no tailwind-merge, so a background passed alongside it would leave
            // two competing utilities and let stylesheet order decide. The rest
            // of the shape is Card's, kept in step by hand.
            <div
              key={trade.name}
              data-reveal
              className="rounded-[var(--radius-card)] bg-[#FAFAFA] p-6"
            >
              <h3 className="font-sans text-xl">{trade.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {trade.blurb}
              </p>

              <ul className="mt-5 flex flex-wrap gap-2">
                {trade.jobs.slice(0, CHIPS_PER_CARD).map((job, jobIndex) => (
                  <li
                    key={job.name}
                    className={`rounded-[var(--radius-chip)] px-2.5 py-1 text-xs font-medium text-white ${
                      CHIP_TONES[
                        (cardIndex * CHIPS_PER_CARD + jobIndex) %
                          CHIP_TONES.length
                      ]
                    }`}
                  >
                    {job.name} · {job.unit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {rest > 0 ? (
          <p data-reveal className="mt-10 text-center">
            <Link
              href="/trades"
              className="font-medium text-[#0098F2] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
            >
              {rest} more trades, and what happens if yours is not one of them →
            </Link>
          </p>
        ) : null}
      </Section>
    </Reveal>
  );
}
