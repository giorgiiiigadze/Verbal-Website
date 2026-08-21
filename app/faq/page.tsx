import { FAQ } from "@/content/faq";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { SUPPORT_EMAIL } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Whether your voice is recorded, what happens if a price is wrong, what " +
    "it costs, and what happens to your customers' details.",
  path: "/faq",
});

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        eyebrow="Questions"
        title="Frequently asked questions"
        lead="If the answer you want is not here, the answer is probably in the privacy policy or the terms — and if it is not, email and ask."
      />

      <Section tone="bg">
        <div className="mx-auto max-w-3xl">
          <Accordion items={FAQ} />

          <div className="mt-10 text-center">
            <p className="text-muted">Still stuck?</p>
            <div className="mt-4">
              <Button href={`mailto:${SUPPORT_EMAIL}`} variant="secondary">
                Email us
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
