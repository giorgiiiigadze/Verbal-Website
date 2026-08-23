import { OTHER_TRADE, TRADES } from "@/content/trades";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { APP_STORE_URL } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Trades",
  description:
    "Electricians, plumbers, carpenters, tilers, painters, plasterers, " +
    "builders, roofers, landscapers, and whatever else you do.",
  path: "/trades",
});

/**
 * Chip colours for the closing call-out, the same four the home page's trade
 * cards cycle through and in the same order.
 *
 * Written out as whole class strings because Tailwind reads the source
 * statically — a class built from a variable at runtime never gets generated.
 */
const CHIP_TONES = [
  "bg-[#0098F2]",
  "bg-[#FF6363]",
  "bg-[#5D9C06]",
  "bg-[#6C56FC]",
];

export default function TradesPage() {
  return (
    <>
      <PageHeader
        tone="plain"
        align="center"
        eyebrow="Your trade"
        title="It knows what your trade sells before you tell it"
        lead="Setting up asks what you charge for the jobs your trade does most, and seeds your rate card from the answers. After that, speaking one of them prices it."
      />

      {/* Nine cards, so the stagger is tightened — at the house 0.1 the last
          one lands nearly a second after the first. */}
      <Reveal stagger={0.05}>
        <Section tone="bg">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TRADES.map((trade) => (
              // Not <Card>: it hardcodes `bg-card` and a border, and `cn` is a
              // plain join with no tailwind-merge, so a background passed
              // alongside it would leave two competing utilities and let
              // stylesheet order decide. The radius is Card's, kept by hand.
              <div
                key={trade.name}
                data-reveal
                className="flex flex-col rounded-[var(--radius-card)] bg-[#FAFAFA] p-6"
              >
                <h2 className="font-sans text-xl">{trade.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {trade.blurb}
                </p>

                {/* Ruled rows rather than a bordered panel, the shape the FAQ
                    and the billing notes take. The unit stays in its own
                    column: this is a rate card, and the point of it is that
                    each line is priced by something. */}
                <ul className="mt-5 divide-y divide-line border-t border-line text-sm">
                  {trade.jobs.map((job) => (
                    <li
                      key={job.name}
                      className="flex justify-between gap-4 py-3"
                    >
                      <span>{job.name}</span>
                      <span className="shrink-0 text-muted">
                        per {job.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p data-reveal className="mt-10 max-w-2xl text-sm text-muted">
            These are the jobs the app offers to price during setup, named the
            way a British trade names them. You can add, rename or re-price
            anything on your rate card afterwards, and a job you have never
            priced comes back flagged rather than guessed.
          </p>
        </Section>
      </Reveal>

      <Reveal stagger={0.08}>
        <Section tone="bg">
          {/* The charcoal panel is the pricing page's Pro card and the final
              CTA's ground, used here to close the list: everything above it is
              a trade the app already knows, and this is the one that covers
              everyone else. */}
          <div
            data-reveal
            className="rounded-[var(--radius-card)] bg-text p-8 text-white sm:p-12"
          >
            <h2 className="max-w-2xl font-slab text-3xl leading-tight sm:text-4xl">
              {OTHER_TRADE.name}?
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {OTHER_TRADE.blurb}
            </p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {OTHER_TRADE.jobs.map((job, i) => (
                <li
                  key={job.name}
                  className={`rounded-[var(--radius-chip)] px-3 py-1.5 text-sm font-medium text-white ${CHIP_TONES[i % CHIP_TONES.length]}`}
                >
                  {job.name} · {job.unit}
                </li>
              ))}
            </ul>

            {/* Points at the store the moment there is one; until then it goes
                where the recording is explained, so it is never a dead end. */}
            <div className="mt-10">
              <Button
                href={APP_STORE_URL ?? "/how-it-works"}
                variant="ghostOnRoyal"
                size="md"
              >
                <AppleMark className="h-4 w-4" />
                Coming soon to iPhone
              </Button>
            </div>
          </div>
        </Section>
      </Reveal>
    </>
  );
}
