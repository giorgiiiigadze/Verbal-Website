import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { Steps } from "@/components/home/Steps";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { TradeStrip } from "@/components/home/TradeStrip";
import { PrivacyBand } from "@/components/home/PrivacyBand";
import { PricingTeaser } from "@/components/home/PricingTeaser";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

/**
 * Not rendered: a social-proof band of ratings and testimonials. The app has no
 * users yet, so every number in one would have to be made up. The slot is here
 * so real figures can go in after launch.
 */

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS",
    description: DESCRIPTION,
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        description: "Two quotes per day",
      },
      {
        "@type": "Offer",
        price: "19",
        priceCurrency: "USD",
        description: "Verbal Pro — unlimited quotes, billed monthly",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Problem />
      <Steps />
      <FeatureGrid />
      <PrivacyBand />
      <TradeStrip />
      <PricingTeaser />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
