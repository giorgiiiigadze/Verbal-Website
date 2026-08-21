/**
 * What the app does. Every entry here traces to real code in the app repo —
 * the file it came from is noted so a future edit can check the claim still
 * holds. Nothing on this list is aspirational.
 */

export type Feature = {
  title: string;
  body: string;
  /** Where this lives in the app, for whoever edits this copy next. */
  source: string;
};

export const FEATURES: Feature[] = [
  {
    title: "Your voice never leaves your phone",
    body:
      "Speech is transcribed on the device, by iOS itself. The recording is " +
      "never uploaded and never saved — it exists while you are talking and " +
      "is gone when you stop.",
    source: "docs/privacy/index.md",
  },
  {
    title: "A rate card that fills itself in",
    body:
      "Set up asks what you charge for the jobs your trade actually does. " +
      "After that, speaking one of them prices it — no typing, no lookup.",
    source: "Views/Onboarding/TradePresets.swift",
  },
  {
    title: "It never invents a price",
    body:
      "Anything you did not price and that is not on your rate card comes " +
      "back flagged, not guessed. A quote is an offer you are bound by; the " +
      "app will not put a number on it for you.",
    source: "Models/UnpricedItem.swift",
  },
  {
    title: "Send a link, get an answer",
    body:
      "Share a quote as a web link. Your customer opens it on any phone and " +
      "accepts or declines — no app, no account, no PDF attachment.",
    source: "Views/Quotes/ShareQuotePanel.swift",
  },
  {
    title: "Every customer, and everything you quoted them",
    body:
      "Clients keep their own thread: what you quoted, what they accepted, " +
      "what is still outstanding, and what you have booked in.",
    source: "Views/Clients/",
  },
  {
    title: "It listens in your language",
    body:
      "Pick the language and the region you actually speak, and it downloads " +
      "once and works with no signal after that. A British accent is not " +
      "handed to the American model by default — that is a mis-heard word " +
      "per sentence, and nothing on screen would tell you.",
    source: "Models/DictationLanguage.swift",
  },
  {
    title: "Nine currencies, converted",
    body:
      "USD, EUR, GBP, CAD, AUD, CHF, JPY, INR and AED. Quote in one and " +
      "convert to another at the day's rate when a job crosses a border.",
    source: "Models/AppCurrency.swift",
  },
  {
    title: "Your quotes work offline",
    body:
      "Reading, and finding what you charged last time, works with no signal " +
      "— which is where a lot of jobs are. Making a new one needs a connection.",
    source: "docs/terms/index.md",
  },
  {
    title: "Your numbers, your document",
    body:
      "Your business details, your logo, your tax rate, your terms, your " +
      "validity window. The quote goes out as yours, not as ours.",
    source: "Views/Account/QuoteDefaultsView.swift",
  },
];

/** The three-step spine of the product, used on the home page and expanded on
 *  /how-it-works. */
export type Step = {
  number: string;
  title: string;
  body: string;
  detail: string;
};

export const STEPS: Step[] = [
  {
    number: "01",
    title: "Speak it",
    body: "Describe the job the way you would to the customer standing there.",
    detail:
      "Hold the button and talk, in whatever order it comes out. No form, " +
      "no dropdowns, no line-item grid to tab through with one hand. iOS " +
      "transcribes it on the device as you speak, so the audio never goes " +
      "anywhere — and you can say it in any of the languages your phone " +
      "already dictates in.",
  },
  {
    number: "02",
    title: "Check it",
    body: "It comes back as a scope, priced line by line from your rate card.",
    detail:
      "What you said becomes a title, a summary, a scope list and priced " +
      "lines. Anything it could not price is marked rather than guessed, so " +
      "the gaps are obvious at a glance. Edit any line, add one you forgot, " +
      "set the tax rate — it is a draft, not a verdict.",
  },
  {
    number: "03",
    title: "Send it",
    body: "As a link your customer opens and answers, before you drive off.",
    detail:
      "Share the quote and the customer gets a clean page on their phone " +
      "with an accept and a decline button. You see the answer in the app, " +
      "against their name, with everything else you have quoted them.",
  },
];
