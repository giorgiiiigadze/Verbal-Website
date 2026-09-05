import Link from "next/link";
import { FAQ } from "@/content/faq";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SUPPORT_EMAIL } from "@/content/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd, graph } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  // The page's own H1. "FAQ" was four characters of a search result spent on
  // an abbreviation, and it is the phrase people type in full as often as not.
  title: "Frequently asked questions",
  description:
    "Whether your voice is recorded, what happens if a price is wrong, what " +
    "it costs, and what happens to your customers' details.",
  path: "/faq",
});

/** The house inline link: the brand blue, with the underline arriving on
 *  hover. Same treatment the pricing page gives its link to the terms. */
const INLINE_LINK =
  "font-medium text-[#0098F2] underline decoration-transparent " +
  "underline-offset-4 transition-colors hover:decoration-current";

export default function FaqPage() {
  // Every question on the page, not the three the home page features: the
  // markup has to describe what this page shows, and a partial list would
  // describe a page that does not exist.
  const faqLd = {
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <JsonLd data={graph(faqLd, breadcrumbLd("FAQ", "/faq"))} />

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
            {/* The two documents were named here in plain text while both sit
                a click away. Linked, the sentence does what it says and the
                anchor text is the name of the thing at the other end. */}
            <p className="mt-2 leading-relaxed text-muted">
              If the answer is not up there, it is either in the{" "}
              <Link href="/privacy" className={INLINE_LINK}>
                privacy policy
              </Link>{" "}
              or the{" "}
              <Link href="/terms" className={INLINE_LINK}>
                terms
              </Link>
              . If it is in neither, ask and a person will answer.
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
