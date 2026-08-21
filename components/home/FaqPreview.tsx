import { FEATURED_FAQ } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/layout/Section";

export function FaqPreview() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="Questions"
        title="The ones people ask first"
        align="center"
      />

      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion items={FEATURED_FAQ} />
        <div className="mt-8 text-center">
          <Button href="/faq" variant="secondary">
            All questions
          </Button>
        </div>
      </div>
    </Section>
  );
}
