import { FEATURES } from "@/content/features";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

export function FeatureGrid() {
  return (
    // Nine cards: the default stagger would leave the last one arriving well
    // after the first has been read, so it is tightened here.
    <Reveal stagger={0.06}>
      <Section tone="bg">
        <div data-reveal>
          <SectionHeading
            eyebrow="What it does"
            title="Built around how a quote actually gets made"
            lead="Not a spreadsheet with a microphone bolted on."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} data-reveal>
              <h3 className="text-lg leading-snug">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {feature.body}
              </p>
            </Card>
          ))}
        </div>
      </Section>
    </Reveal>
  );
}
