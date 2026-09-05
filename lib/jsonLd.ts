import { DESCRIPTION, SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/content/site";
import { PRICING } from "@/content/pricing";

/**
 * The site's structured data, in one place.
 *
 * Two rules hold everywhere in this file. Nothing is asserted that is not
 * already stated on the site or in `content/` — no ratings, no review counts,
 * no founding dates, no head office — because a schema claim is a claim like
 * any other and these are the ones Google penalises. And every node carries an
 * `@id` so the graph can be joined by reference rather than by repeating the
 * organisation inside each page's blob.
 *
 * The ids are URL fragments on the canonical origin, which is the convention
 * consumers expect: `#organization` is the same node whichever page emits it.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const APP_ID = `${SITE_URL}/#app`;

/** Who publishes the site. The email is the one already printed on /support. */
export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
    logo: `${SITE_URL}/brand/logo.svg`,
    email: SUPPORT_EMAIL,
  };
}

/** The site itself. No `SearchAction`: there is no site search to describe. */
export function websiteLd() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/**
 * The product. Prices are read from `content/pricing`, which is itself taken
 * from the terms, so the schema cannot drift from the page or from the
 * agreement — `$19` is parsed out rather than written again here.
 *
 * `operatingSystem` is iOS and nothing else: there is no Android or web build,
 * and claiming one would be the first thing a reader could disprove.
 */
export function softwareApplicationLd() {
  const price = (value: string) => value.replace(/[^0-9.]/g, "");

  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: DESCRIPTION,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS",
    publisher: { "@id": ORGANIZATION_ID },
    screenshot: `${SITE_URL}/phone/screen-quote.png`,
    offers: [
      {
        "@type": "Offer",
        name: PRICING.free.name,
        price: price(PRICING.free.price),
        priceCurrency: "USD",
        description: PRICING.free.summary,
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: `${PRICING.pro.name} (monthly)`,
        price: price(PRICING.pro.price),
        priceCurrency: "USD",
        description: PRICING.pro.summary,
        url: `${SITE_URL}/pricing`,
      },
      {
        "@type": "Offer",
        name: `${PRICING.proYearly.name} (yearly)`,
        price: price(PRICING.proYearly.price),
        priceCurrency: "USD",
        description: PRICING.proYearly.summary,
        url: `${SITE_URL}/pricing`,
      },
    ],
  };
}

/**
 * Home, then the page. The site is flat — every page is one level under the
 * root and the header links to all of them — so this is the whole trail, and
 * it is the trail a reader actually has rather than an invented hierarchy.
 */
export function breadcrumbLd(name: string, path: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${SITE_URL}${path}`,
      },
    ],
  };
}

/** Wraps a set of nodes as one `@graph`, which is how several types are said
 *  in a single tag without repeating `@context` for each. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
