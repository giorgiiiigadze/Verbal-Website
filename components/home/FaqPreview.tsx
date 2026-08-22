import { FEATURED_FAQ } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

export function FaqPreview() {
  return (
    <Reveal>
      <Section tone="surface">
        <div data-reveal>
          <SectionHeading
            eyebrow="Questions"
            title="The ones people ask first"
            align="center"
          />
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <div data-reveal>
            <Accordion items={FEATURED_FAQ} />
          </div>
          <div data-reveal className="mt-8 text-center">
            <Button href="/faq" variant="secondary">
              All questions
            </Button>
          </div>
        </div>
      </Section>
    </Reveal>
  );
}
