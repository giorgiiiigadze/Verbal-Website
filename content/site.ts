/**
 * Everything about the site that is a fact rather than a layout decision.
 * Components import from here; no copy is hard-coded in a component.
 */

/** The site's origin. Every canonical URL, OG tag and sitemap entry reads this.
 *
 *  The fallback is the real domain, not a placeholder: `.env.example` is
 *  documentation and is never loaded, so on a host where the variable was not
 *  set this literal is what ships. It being correct is what stops an unset
 *  variable from advertising the wrong domain to every crawler.
 *
 *  The variable is therefore not required in production. It is there so the
 *  site can be served from some other origin — a staging domain, a preview
 *  meant to be crawled as itself — without editing this file.
 *
 *  Empty counts as absent. A variable created in a host's dashboard and left
 *  without a value arrives as "", and `??` does not catch it: an empty string
 *  is neither null nor undefined, so it went straight through to
 *  `new URL("")` in the root layout, which throws ERR_INVALID_URL and fails
 *  the build for every route at once. `||` is the whole fix.
 *
 *  A bare domain counts as https for the same reason. `new URL("theverbal.app")`
 *  throws just as hard, and a host's environment field is exactly where someone
 *  types a domain without a scheme. */
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (
  configured
    ? /^https?:\/\//.test(configured)
      ? configured
      : `https://${configured}`
    : "https://theverbal.app"
).replace(/\/$/, "");

export const SITE_NAME = "Verbal";
export const TAGLINE = "Speak the job. Send the quote.";
/**
 * The site's one-line description: the meta description search engines print
 * under the title, the fallback `og:description`, and the `description` on
 * every structured-data node.
 *
 * Written for a search result rather than for the page, which is a different
 * job from the headline: it names the thing being searched for ("quoting app",
 * "quote", "tradespeople") in the first half, where a truncated result still
 * shows it, and keeps the line that makes someone click in the second. Under
 * 160 characters, which is roughly where Google stops printing.
 */
export const DESCRIPTION =
  "Speak the job on site and Verbal writes the priced quote. A voice quoting " +
  "app for tradespeople who would rather quote on the driveway than at 9pm.";

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
 *  that menu's footer link — five items do not fit the pill on a phone. It is
 *  the `/#how` anchor on this page, not a page of its own. */
export const NAV = [
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
] as const;

export const FOOTER = [
  {
    heading: "Product",
    links: [
      { href: "/#how", label: "How it works" },
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
