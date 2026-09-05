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
            align="center"
            eyebrow="Questions"
            title="The ones people ask first"
            titleFont="sans"
          />
        </div>

        {/* The heading is centred; the list is not, and is centred as a block
            instead. Questions are read one under another down a left edge, and
            centring the rows themselves would leave every question starting at
            a different place — the two words above them are a label, which is
            a different job. */}
        <div className="mx-auto mt-12 max-w-5xl">
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
