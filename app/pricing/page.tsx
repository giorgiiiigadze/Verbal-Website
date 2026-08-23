import { BILLING_NOTES, PRICING } from "@/content/pricing";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section, SectionHeading } from "@/components/layout/Section";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { CheckMark } from "@/components/ui/CheckMark";
import { Reveal } from "@/components/ui/Reveal";
import { APP_STORE_URL } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Two quotes a day free, permanently. Verbal Pro is $19 a month and " +
    "removes the daily limit.",
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
    card: "bg-[#FAFAFA]",
    price: "text-text",
    cadence: "text-muted",
    summary: "text-muted",
    rule: "border-line",
    note: "text-muted",
  },
  dark: {
    card: "bg-text text-white",
    price: "text-white",
    cadence: "text-white/60",
    summary: "text-white/75",
    rule: "border-white/15",
    note: "text-white/60",
  },
} as const;

export default function PricingPage() {
  const tiers = [
    { ...PRICING.free, tone: TONES.light, badge: null },
    { ...PRICING.pro, tone: TONES.dark, badge: "No daily limit" },
  ];

  return (
    <>
      <PageHeader
        tone="plain"
        align="center"
        size="lg"
        title="Two quotes a day, free. Forever."
        lead="Not a trial that runs out. The limit is on making new quotes. Everything you have already made stays readable, editable and sendable whether you subscribe or not."
      />

      <Reveal stagger={0.08}>
        <Section tone="bg">
          <div className="grid gap-6 md:grid-cols-2">
            {tiers.map((tier) => (
              // Not <Card>: it hardcodes `bg-card` and a border, and the same
              // plain-join problem applies. The radius is Card's, by hand.
              <div
                key={tier.name}
                data-reveal
                className={`flex flex-col rounded-[var(--radius-card)] p-8 ${tier.tone.card}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-sans text-xl">{tier.name}</h2>
                  {tier.badge ? (
                    <span className="rounded-[var(--radius-chip)] bg-[#0098F2] px-2.5 py-1 text-xs font-medium text-white">
                      {tier.badge}
                    </span>
                  ) : null}
                </div>

                <p className={`mt-6 font-slab text-6xl ${tier.tone.price}`}>
                  {tier.price}
                  <span className={`text-lg ${tier.tone.cadence}`}>
                    {tier.cadence}
                  </span>
                </p>
                <p className={`mt-3 ${tier.tone.summary}`}>{tier.summary}</p>

                <ul
                  className={`mt-8 flex-1 space-y-3.5 border-t pt-7 text-sm ${tier.tone.rule}`}
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

                <p
                  className={`mt-7 border-t pt-6 text-sm ${tier.tone.rule} ${tier.tone.note}`}
                >
                  {tier.note}
                </p>
              </div>
            ))}
          </div>

          {/* The hero's CTA, repeated. Points at the store the moment there is
              one; until then it goes where the recording is explained, so it is
              never a dead end. */}
          <div data-reveal className="mt-12">
            <Button href={APP_STORE_URL ?? "/how-it-works"} size="md">
              <AppleMark className="h-4 w-4" />
              Coming soon to iPhone
            </Button>
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
            <a
              href="/terms"
              className="font-medium text-[#0098F2] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current"
            >
              terms of service
            </a>
            .
          </p>
        </Section>
      </Reveal>
    </>
  );
}
