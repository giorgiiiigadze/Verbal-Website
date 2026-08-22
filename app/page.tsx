import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { Steps } from "@/components/home/Steps";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { TradeCards } from "@/components/home/TradeCards";
import { ShareBand } from "@/components/home/ShareBand";
import { ClientsBand } from "@/components/home/ClientsBand";
import { PrivacyBand } from "@/components/home/PrivacyBand";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

/**
 * The band under the hero is the social-proof slot. It carries no user count
 * and no customer logos, because the app has no users yet and every figure in
 * one would have to be made up — it shows the priced jobs instead. The one
 * quote in it is a placeholder; see content/testimonials.ts before launch.
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
        description: "Verbal Pro: unlimited quotes, billed monthly",
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
      <SocialProof />
      <Steps />
      <TradeCards />
      <ShareBand />
      <ClientsBand />
      <FeatureGrid />
      <PrivacyBand />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
