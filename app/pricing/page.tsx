import Link from "next/link";
import { BILLING_NOTES, PRICING } from "@/content/pricing";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/Section";
import { CheckMark } from "@/components/ui/CheckMark";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/metadata";

/** The price is read from `content/pricing` rather than typed again, so the
 *  title cannot outlive a change to what Pro costs. */
export const metadata = pageMetadata({
  title: `Pricing: free, ${PRICING.pro.price} a month or ${PRICING.proYearly.price} a year`,
  description:
    "Two quotes a day free, permanently. Verbal Pro removes the daily limit " +
    "at $19 a month or $190 a year. Sold through your Apple ID, cancel any time.",
  path: "/pricing",
});

/**
 * The two plans, in the home page's language.
 *
 * Free is the soft card the trades and quote blocks use; Pro is the charcoal
 * the final CTA and the share chips use. That pairing is what marks the
 * upgrade — the old page did it with a border and a ring, which is the one
 * device this site does not otherwise use, and it read as a form field.
 *
 * Each tone is a complete set of class strings rather than a base plus
 * overrides, because `cn` is a plain join with no tailwind-merge: two
 * background or text-colour utilities on one element would race, and
 * stylesheet order would decide the winner.
 */
const TONES = {
  light: {
    // No fill: the two unpaid-for cards sit on the section's own white and are
    // drawn by their outline alone. The grey they carried was barely a shade
    // off the band behind them, so it read as a smudge rather than as a
    // surface, and dropping it leaves the one filled card on the page as the
    // only thing with weight. The hairline is what still makes these cards.
    card: "border border-line",
    price: "text-text",
    cadence: "text-muted",
    summary: "text-muted",
    rule: "border-line",
  },
  dark: {
    card: "bg-text text-white",
    price: "text-white",
    cadence: "text-white/60",
    summary: "text-white/75",
    rule: "border-white/15",
  },
} as const;

export default function PricingPage() {
  /*
    Three cards, cheapest first, and one dark one.

    The dark card moved from the monthly plan to the yearly one. It marks the
    upgrade, and with both Pro plans lifting the daily limit the thing being
    marked is no longer "Pro" but which Pro to take — which is the same call the
    app's own paywall makes: `PaywallSheet` opens with the yearly plan selected
    and badges it "Best value". The badge here is that badge, for the same
    reason. "No daily limit" went with it: it was true of one card when there
    was one paid card, and is true of two now, so it had stopped picking
    anything out.

    `id` rather than `name` as the React key: both paid plans are called Verbal
    Pro, and it is the cadence under the price that tells them apart.
  */
  const tiers = [
    { id: "free", ...PRICING.free, tone: TONES.light, badge: null },
    { id: "pro-monthly", ...PRICING.pro, tone: TONES.light, badge: null },
    {
      id: "pro-yearly",
      ...PRICING.proYearly,
      tone: TONES.dark,
      badge: "Best value",
    },
  ];

  return (
    <>
      <JsonLd data={graph(breadcrumbLd("Pricing", "/pricing"))} />

      {/* No hairline under the banner. The two plan cards open the block below
          it, and the rule landed as a line across the page immediately above
          the top edge of the light card — two horizontal edges a few pixels
          apart, which is what `divider` exists to switch off. */}
      <PageHeader
        divider={false}
        tight
        tone="plain"
        align="center"
        size="lg"
        title="Two quotes a day, free. Forever."
        lead="Not a trial. The limit is on making new quotes: everything you have already made stays yours to read, edit and send."
      />

      <Reveal stagger={0.08}>
        {/* The banner and this block are both on white with no edge between
            them, so their two paddings stacked into about 160px of empty page
            between the lead and the top of the cards — the banner's pb-20 plus
            the section's py-20. `tight` halves the first and this trims the
            second, which lands the cards about 64px under the copy they belong
            to. The bottom padding is untouched: the billing block below is a
            different section and still wants the house spacing.

            Same trade the hero makes above its own following block, and made
            the same way round: the banner gives up the space, because the
            section is padded like every other section on the site. */}
        {/* `wide` — the hero's width — rather than the page's default column.
            Three cards in `max-w-6xl` left each one about 350px, and at `md`
            the same three across a 768px screen left 213px, which is where the
            price, the cadence beside it and the ticked lines all started
            setting two words to a line. The band below stays on the default
            column: it is prose, and prose is worse at the wider measure. */}
        <Section tone="bg" size="wide" className="pt-4 sm:pt-6">
          {/* Two across from `sm`, three from `lg`, one below that.
              In between, the yearly card takes the full width under the other
              two rather than sitting as an orphan beside a gap — which suits
              the card the page is pointing at anyway. 384px each at full
              width, against 350 before. */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              // Not <Card>: it hardcodes `bg-card` and a border, and the same
              // plain-join problem applies. The radius is Card's, by hand.
              <div
                key={tier.id}
                data-reveal
                className={`flex flex-col rounded-[var(--radius-card)] p-6 sm:p-8 ${
                  // The third card, in the two-column range only: it spans both
                  // and closes the row instead of leaving a hole beside itself.
                  tier.id === "pro-yearly" ? "sm:col-span-2 lg:col-span-1" : ""
                } ${tier.tone.card}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-sans text-xl">{tier.name}</h2>
                  {tier.badge ? (
                    <span className="rounded-[var(--radius-chip)] bg-[#0098F2] px-2.5 py-1 text-xs font-medium text-white">
                      {tier.badge}
                    </span>
                  ) : null}
                </div>

                {/* One step down the scale from the 48/60px this was. Three
                    cards in a row is a narrower column than the two it was set
                    for, and at 60px "$190" plus the cadence beside it was the
                    widest thing in the card by some way. */}
                <p className={`mt-6 font-slab text-4xl sm:text-5xl ${tier.tone.price}`}>
                  {tier.price}
                  <span className={`text-lg ${tier.tone.cadence}`}>
                    {tier.cadence}
                  </span>
                </p>
                <p className={`mt-3 ${tier.tone.summary}`}>{tier.summary}</p>

                {/* Full bleed: the rule is pulled out through the card's
                    padding with a negative margin and given that padding back
                    as its own, so the line reaches both edges of the card while
                    the ticks under it stay on the same left edge as the price
                    above. The two numbers must stay in step with the card's
                    p-6 / sm:p-8, which is what they undo. */}
                <ul
                  className={`-mx-6 mt-8 flex-1 space-y-3.5 border-t px-6 pt-7 text-sm sm:-mx-8 sm:px-8 ${tier.tone.rule}`}
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 leading-relaxed">
                      {/* The tick is the hero's, and the colour rides on the
                          wrapper: `fill-current` would otherwise take the
                          label's colour, which is white on the dark card. */}
                      <span className="mt-0.5 text-[#0098F2]">
                        <CheckMark />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      <Reveal>
        <Section tone="bg">
          <div data-reveal>
            <SectionHeading
              eyebrow="Billing"
              eyebrowTone="brand"
              title="How the subscription works"
              titleFont="sans"
            />
          </div>

          {/* Ruled rows rather than a bordered panel, the same shape the FAQ
              list takes, and starting on the heading's line rather than
              centred under it. */}
          <div data-reveal className="mt-12 max-w-5xl divide-y divide-line">
            {BILLING_NOTES.map((note) => (
              <p key={note} className="py-6 leading-relaxed text-muted">
                {note}
              </p>
            ))}
          </div>

          <p data-reveal className="mt-8 text-sm text-muted">
            The full detail is in the{" "}
            <Link
              href="/terms"
              className="font-medium text-[#0098F2] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
            >
              terms of service
            </Link>
            .
          </p>
        </Section>
      </Reveal>
    </>
  );
}
