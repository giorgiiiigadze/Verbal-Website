/**
 * Pricing, taken from docs/terms/index.md in the app repo. If the terms change,
 * this changes with them — a marketing page that disagrees with the terms it
 * links to is the kind of thing App Review notices.
 */

/**
 * What every plan has, listed on every plan.
 *
 * Paying changes exactly one thing, the daily limit, so the paid cards used to
 * say "Unlimited quotes" and "Everything in Free" and stop. Truthful, and it
 * read as the opposite of the truth: six ticks against two, with the longest
 * list on the card that costs nothing. Spelling the same capabilities out on
 * each card is the honest version of a comparison table, and it costs a reader
 * nothing to see the same line three times when the line above it is the one
 * that differs.
 *
 * "Subscription or not" came off the second line when it moved here, because on
 * a paid card it answers a question nobody reading that card is asking. The
 * promise itself is not lost: it is the page's own lead sentence, and it is the
 * note under the free card.
 */
const EVERY_PLAN = [
  "Every quote you have already made stays readable, editable and sendable",
  "Your full rate card",
  "Clients and their history",
  "Shareable quote links your customer can accept or decline",
  "On-device transcription",
] as const;

export const PRICING = {
  free: {
    name: "Free",
    price: "$0",
    cadence: "",
    summary: "Two quotes a day, for as long as you like.",
    features: ["Two new quotes per day", ...EVERY_PLAN],
  },
  pro: {
    name: "Verbal Pro",
    price: "$19",
    cadence: "/month",
    summary: "The same app, without the daily limit.",
    features: ["Unlimited quotes", ...EVERY_PLAN],
  },
  /**
   * The yearly plan, which the app has had all along and this site did not
   * show: `Verbal.storekit` sells `com.giorgi.verbal.pro.yearly` at $190 and
   * the paywall badges it "Best value", and the terms two clicks away already
   * say "$19 per month or $190 per year". A pricing page that listed only the
   * monthly one disagreed with the agreement it links to.
   *
   * "Two months free" is arithmetic, not a claim: twelve months at $19 is
   * $228, and $190 is $38 less, which is exactly two of them. It is also the
   * wording StoreKit carries on the product itself.
   */
  proYearly: {
    name: "Verbal Pro",
    price: "$190",
    cadence: "/year",
    summary: "The same app, billed once a year.",
    features: [
      "Unlimited quotes",
      "Two months free against paying monthly",
      ...EVERY_PLAN,
    ],
  },
} as const;

/** The Apple-billing facts that have to be stated plainly somewhere.
 *
 *  The regional-pricing line was the footnote under each paid card until the
 *  cards dropped their footnotes. It is not decoration: the prices on this page
 *  are the US ones, and it is what keeps them from reading as a promise
 *  everywhere else. "Somewhere" is now here, which is the block on this page
 *  that exists for exactly this kind of sentence. */
export const BILLING_NOTES = [
  "Verbal Pro is sold through your Apple ID and charged at confirmation of purchase.",
  "It renews automatically, monthly or yearly depending on the plan you chose, unless you turn off auto-renew at least 24 hours before the period ends.",
  "Manage or cancel it in Settings → Apple ID → Subscriptions. Deleting the app does not cancel it.",
  "Refunds are handled by Apple, not by us. Request one through Apple support.",
  "Prices may vary by region and are shown in the app before you buy.",
];
