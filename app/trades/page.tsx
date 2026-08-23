import { OTHER_TRADE, TRADES } from "@/content/trades";
import { TradeExplorer } from "@/components/trades/TradeExplorer";
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
        divider={false}
        tight
        eyebrow="Your trade"
        title="It knows what your trade sells before you tell it"
        lead="Setting up asks what you charge for the jobs your trade does most, and seeds your rate card from the answers. After that, speaking one of them prices it."
      />

      {/* The chips sit close under the banner rather than a section's width
          below it: without the divider the two are one block, and the old gap
          left the row floating between them. `pt-*` beats the `py-*` it is
          overriding here because Tailwind emits padding-top after
          padding-block, so the later rule wins — `cn` is a plain join and
          settles nothing itself. */}
      <Reveal>
        <Section tone="bg" className="pt-0 sm:pt-0">
          {/* One panel and a filter row, in place of nine cards. The grid ran
              three screens and repeated a grey unit label forty-five times; it
              sold a price list, when the thing being sold is what happens
              between a sentence and a set of priced lines. */}
          <div data-reveal>
            <TradeExplorer />
          </div>

          <p data-reveal className="mt-8 text-center text-sm text-muted">
            {TRADES.length} trades ·{" "}
            {TRADES.reduce((n, trade) => n + trade.jobs.length, 0)} job types ·
            your own rates
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
