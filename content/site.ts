/**
 * Everything about the site that is a fact rather than a layout decision.
 * Components import from here; no copy is hard-coded in a component.
 */

/** Domain is not chosen yet. Every canonical URL, OG tag and sitemap entry
 *  reads this, so switching it later is one env var. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://verbal.app"
).replace(/\/$/, "");

export const SITE_NAME = "Verbal";
export const TAGLINE = "Speak the job. Send the quote.";
export const DESCRIPTION =
  "Verbal turns a spoken description of a job into a written, priced quote. " +
  "Built for tradespeople who would rather quote on the driveway than at 9pm.";

export const SUPPORT_EMAIL = "gio.giorgigiorgadze20@gmail.com";

/**
 * Null until the app has an App Store listing — `AppInfo.appStoreID` is still
 * nil in the app, so there is nothing to link to. `<AppStoreBadge />` renders a
 * "coming soon" state while this is null and a real link once it is a string.
 * Flipping it on launch day is this one line.
 */
export const APP_STORE_URL: string | null = null;

/** The header's plain links. "Features" is not among them: it is a menu, not
 *  a page, and SiteHeader renders it ahead of these. "How it works" moved into
 *  that menu's footer link — five items do not fit the pill on a phone. */
export const NAV = [
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
] as const;

export const FOOTER = [
  {
    heading: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Support",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/support", label: "Contact" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;
