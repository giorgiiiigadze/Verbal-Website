import { FAQ } from "@/content/faq";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
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
        tone="plain"
        align="center"
        eyebrow="Questions"
        title="Frequently asked questions"
        lead="If the answer you want is not here, the answer is probably in the privacy policy or the terms. If it is not, email and ask."
      />

      <Reveal>
        <Section tone="bg">
          {/* Left and wide, the same list the home page's FAQ block shows: the
              rows are ruled rather than boxed, so the questions start on the
              page's own left edge instead of inside a panel. */}
          <div data-reveal className="max-w-5xl">
            <Accordion items={FAQ} />
          </div>

          <div
            data-reveal
            className="mt-12 max-w-5xl rounded-[var(--radius-card)] bg-[#FAFAFA] p-8 sm:p-10"
          >
            <h2 className="font-sans text-xl">Still stuck?</h2>
            <p className="mt-2 leading-relaxed text-muted">
              If the answer is not up there, it is either in the privacy policy
              or the terms. If it is in neither, ask and a person will answer.
            </p>
            <div className="mt-6">
              <Button href={`mailto:${SUPPORT_EMAIL}`} variant="secondary">
                Email us
              </Button>
            </div>
          </div>
        </Section>
      </Reveal>
    </>
  );
}
