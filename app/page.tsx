import { Hero } from "@/components/home/Hero";
import { SpeakSend } from "@/components/home/SpeakSend";
import { PhoneTravel } from "@/components/home/PhoneTravel";
import { Steps } from "@/components/home/Steps";
import { TradeCards } from "@/components/home/TradeCards";
import { BlueBand } from "@/components/home/BlueBand";
import { ShareBand } from "@/components/home/ShareBand";
import { FeaturesBand } from "@/components/home/FeaturesBand";
import { CalendarBand } from "@/components/home/CalendarBand";
import { ClientsBand } from "@/components/home/ClientsBand";
import { PrivacyBand } from "@/components/home/PrivacyBand";
import { FaqPreview } from "@/components/home/FaqPreview";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, softwareApplicationLd } from "@/lib/jsonLd";
import { pageMetadata } from "@/lib/metadata";

/**
 * Hero and the "Effortless quotes" block are wrapped together in PhoneTravel:
 * it lifts the hero's quote phone down into the block on scroll, which is why
 * the two sit inside one wrapper rather than as loose siblings.
 */

/**
 * The one title on the site written for the search result rather than for the
 * tab. The root layout's default — the name and the tagline — is what a visitor
 * who already knows Verbal would search; this is what someone looking for the
 * thing Verbal is would type, and the tagline is still the first line of the
 * page, the social card and the footer.
 *
 * `absoluteTitle` because the layout's `%s · Verbal` template would otherwise
 * put the name on it twice.
 *
 * The canonical is the reason this export exists at all: without it the home
 * page was the only page on the site with no `rel=canonical`, so any URL that
 * served it — a tracking query, a stray `index`, the bare apex against the www
 * host — was a candidate to be indexed in its own right.
 */
export const metadata = pageMetadata({
  title: "Verbal — Voice quoting app for tradespeople",
  absoluteTitle: true,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* The product, joined to the publisher declared in the root layout. The
          prices come from `content/pricing`, which comes from the terms, so
          this cannot quietly disagree with the pricing page. */}
      <JsonLd data={graph(softwareApplicationLd())} />
      <PhoneTravel>
        <Hero />
        <SpeakSend />
      </PhoneTravel>
      <BlueBand />
      <Steps />
      <TradeCards />
      <ShareBand />
      <FeaturesBand />
      <CalendarBand />
      <ClientsBand />
      <PrivacyBand />
      <FaqPreview />
    </>
  );
}
