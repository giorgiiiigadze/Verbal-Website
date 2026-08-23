import { FEATURED_FAQ } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

export function FaqPreview() {
  return (
    <Reveal>
      <Section tone="bg">
        <div data-reveal>
          <SectionHeading
            eyebrow="Questions"
            title="The ones people ask first"
            titleFont="sans"
          />
        </div>

        {/* Left, not centred: the heading above it starts at the container's
            edge, and an `mx-auto` list sat a couple of rem inside that line. */}
        <div className="mt-12 max-w-5xl">
          <div data-reveal>
            <Accordion items={FEATURED_FAQ} />
          </div>
          <div data-reveal className="mt-8">
            <Button href="/faq" variant="secondary">
              All questions
            </Button>
          </div>
        </div>
      </Section>
    </Reveal>
  );
}
