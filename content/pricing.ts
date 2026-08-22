/**
 * Pricing, taken from docs/terms/index.md in the app repo. If the terms change,
 * this changes with them — a marketing page that disagrees with the terms it
 * links to is the kind of thing App Review notices.
 */

export const PRICING = {
  free: {
    name: "Free",
    price: "$0",
    cadence: "",
    summary: "Two quotes a day, for as long as you like.",
    features: [
      "Two new quotes per day",
      "Every quote you have already made stays readable, editable and sendable, subscription or not",
      "Your full rate card",
      "Clients and their history",
      "Shareable quote links your customer can accept or decline",
      "On-device transcription",
    ],
    note: "The limit is on making new quotes. It is not a trial that expires.",
  },
  pro: {
    name: "Verbal Pro",
    price: "$19",
    cadence: "/month",
    summary: "The same app, without the daily limit.",
    features: [
      "Unlimited quotes",
      "Everything in Free",
    ],
    note: "Prices may vary by region and are shown in the app before you buy.",
  },
} as const;

/** The Apple-billing facts that have to be stated plainly somewhere. */
export const BILLING_NOTES = [
  "Verbal Pro is sold through your Apple ID and charged at confirmation of purchase.",
  "It renews automatically each month unless you turn off auto-renew at least 24 hours before the period ends.",
  "Manage or cancel it in Settings → Apple ID → Subscriptions. Deleting the app does not cancel it.",
  "Refunds are handled by Apple, not by us. Request one through Apple support.",
];
