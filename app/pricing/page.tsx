import { BILLING_NOTES, PRICING } from "@/content/pricing";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Two quotes a day free, permanently. Verbal Pro is $19 a month and " +
    "removes the daily limit.",
  path: "/pricing",
});

export default function PricingPage() {
  const tiers = [
    { ...PRICING.free, highlight: false },
    { ...PRICING.pro, highlight: true },
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

      <Section tone="bg">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "flex flex-col",
                tier.highlight && "border-primary ring-1 ring-primary",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl">{tier.name}</h2>
                {tier.highlight ? (
                  <span className="rounded-full bg-tint-strong px-3 py-1 text-xs font-semibold text-accent-text">
                    No daily limit
                  </span>
                ) : null}
              </div>

              <p className="mt-4 font-slab text-5xl">
                {tier.price}
                <span className="text-lg text-muted">{tier.cadence}</span>
              </p>
              <p className="mt-3 text-muted">{tier.summary}</p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-line pt-6 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3 leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-accepted"
                    >
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                {tier.note}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <AppStoreBadge />
        </div>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl">How the subscription works</h2>
          <ul className="mt-6 space-y-4 text-muted">
            {BILLING_NOTES.map((note) => (
              <li
                key={note}
                className="border-b border-line pb-4 leading-relaxed last:border-0"
              >
                {note}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            The full detail is in the{" "}
            <a href="/terms" className="text-accent-text underline">
              terms of service
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
