import { Hero } from "@/components/home/Hero";
import { SpeakSend } from "@/components/home/SpeakSend";
import { PhoneTravel } from "@/components/home/PhoneTravel";
import { Steps } from "@/components/home/Steps";
import { TradeCards } from "@/components/home/TradeCards";
import { BlueBand } from "@/components/home/BlueBand";
import { ShareBand } from "@/components/home/ShareBand";
import { ClientsBand } from "@/components/home/ClientsBand";
import { PrivacyBand } from "@/components/home/PrivacyBand";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

/**
 * Hero and the "Effortless quotes" block are wrapped together in PhoneTravel:
 * it lifts the hero's quote phone down into the block on scroll, which is why
 * the two sit inside one wrapper rather than as loose siblings.
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
      <PhoneTravel>
        <Hero />
        <SpeakSend />
      </PhoneTravel>
      <BlueBand />
      <Steps />
      <TradeCards />
      <ShareBand />
      <ClientsBand />
      <PrivacyBand />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
