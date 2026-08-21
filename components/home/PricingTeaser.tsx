import { PRICING } from "@/content/pricing";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/layout/Section";

export function PricingTeaser() {
  return (
    <Section tone="bg">
      <SectionHeading
        eyebrow="Pricing"
        title="Free until you are quoting enough to notice"
        lead="Two quotes a day costs nothing, permanently. It is not a trial."
        align="center"
      />

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
        {[PRICING.free, PRICING.pro].map((tier) => (
          <Card key={tier.name} className="flex flex-col">
            <h3 className="text-xl">{tier.name}</h3>
            <p className="mt-3 font-slab text-4xl">
              {tier.price}
              <span className="text-base text-muted">{tier.cadence}</span>
            </p>
            <p className="mt-3 text-muted">{tier.summary}</p>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/pricing" variant="secondary">
          See what is in each
        </Button>
      </div>
    </Section>
  );
}
