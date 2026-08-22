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
          {shown.map((trade) => (
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
                {trade.jobs.slice(0, 3).map((job) => (
                  <li
                    key={job.name}
                    className="rounded-[var(--radius-chip)] bg-field px-2.5 py-1 text-xs text-muted"
                  >
                    {job.name} · {job.unit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {rest > 0 ? (
          <p data-reveal className="mt-10">
            <Link
              href="/trades"
              className="font-medium text-accent-text underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
            >
              {rest} more trades, and what happens if yours is not one of them →
            </Link>
          </p>
        ) : null}
      </Section>
    </Reveal>
  );
}
