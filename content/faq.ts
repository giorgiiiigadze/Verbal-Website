/**
 * Only questions the app and its legal docs already answer. If an answer here
 * cannot be traced to the app's behaviour, the privacy policy or the terms, it
 * does not belong on this list.
 */

export type QA = {
  q: string;
  a: string;
  /** Shown on the home page's shortened FAQ. */
  featured?: boolean;
};

export const FAQ: QA[] = [
  {
    q: "Is my voice recorded or uploaded?",
    a:
      "No. The audio is transcribed on your phone by iOS, and the recording " +
      "is never uploaded and never saved. What leaves the device is the text " +
      "of what you said, because that is what the quote is built from.",
    featured: true,
  },
  {
    q: "What happens if it gets a price wrong?",
    a:
      "You fix it before you send it. Every line is editable, and Verbal is " +
      "built not to invent prices in the first place: anything you did not " +
      "price out loud and that is not on your rate card comes back flagged " +
      "rather than guessed. The quote is your document and your offer, so " +
      "read it before it goes out.",
    featured: true,
  },
  {
    q: "Does it work without signal?",
    a:
      "Reading, searching and editing your existing quotes works offline. " +
      "Creating a new one needs a connection.",
    featured: true,
  },
  {
    q: "Do I have to type my prices in first?",
    a:
      "No. Set up asks what you charge for the handful of jobs your trade " +
      "does most, and seeds your rate card from that. You can leave it empty " +
      "and fill it in as you go. Unpriced work just comes back flagged.",
    featured: true,
  },
  {
    q: "What does it cost?",
    a:
      "Two quotes a day are free, permanently. Verbal Pro is $19 a month and " +
      "removes the daily limit. Quotes you have already made are always " +
      "yours to read, edit and send, subscription or not.",
    featured: true,
  },
  {
    q: "Which trades is it for?",
    a:
      "Set up offers electricians, plumbers, carpenters, tilers, painters, " +
      "plasterers, builders, roofers and landscapers by name. Any other " +
      "trade can type its own. It still prices your call-out, hourly and " +
      "day rate, and learns the rest as you quote.",
  },
  {
    q: "Does it only understand English?",
    a:
      "No. It listens in whichever language and region you pick, from the " +
      "set your iPhone has a speech model for, and the language downloads " +
      "once and then works offline. Region matters as much as language: " +
      "en-GB and en-US are different models, and the wrong one mis-hears a " +
      "word a sentence rather than failing outright.",
  },
  {
    q: "Which currencies does it support?",
    a:
      "USD, EUR, GBP, CAD, AUD, CHF, JPY, INR and AED, with conversion at " +
      "the day's rate when a job crosses a border.",
  },
  {
    q: "Does it have a dark mode?",
    a:
      "Yes, and it follows your iPhone by default. Appearance in the app's " +
      "settings has three options: System, which matches the phone, or Light " +
      "or Dark held whatever the phone is doing.",
  },
  {
    q: "What happens to my customers' details?",
    a:
      "They are yours. They are stored so the app can show you a client's " +
      "history, they are never sent to the AI provider, and they are deleted " +
      "when you delete the quote or your account. If you work in the UK or " +
      "EU, you are the data controller for them and Verbal is your processor.",
  },
  {
    q: "Does the app track me?",
    a:
      "There is no analytics SDK, no advertising, and no tracking of any " +
      "kind in the app. It does not use the advertising identifier and does " +
      "not follow you across other apps or sites.",
  },
  {
    q: "How do I cancel, or delete my account?",
    a:
      "Cancel the subscription in Settings → Apple ID → Subscriptions on " +
      "your device. Delete the account in Profile → Settings → Delete " +
      "account in the app. It removes your quotes, rate card, transcripts, " +
      "customers and business details immediately, and cannot be undone. " +
      "The two are separate: deleting the app does not cancel the " +
      "subscription.",
  },
];

export const FEATURED_FAQ = FAQ.filter((item) => item.featured);
