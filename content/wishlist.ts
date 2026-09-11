/**
 * Copy and vocabulary for the release wishlist. As everywhere else on the
 * site, the words live here and the components only arrange them.
 *
 * The items themselves are not here: they are rows in `wishlist_items`, so the
 * board can be changed without a deploy. This is only the frame around them.
 */

export const WISHLIST_TITLE = "The release wishlist";

/** The first screen. The headline is set in two blocks so each can carry its
 *  own beat in the entrance, the way the home hero is built. */
export const HERO = {
  pill: "The wishlist",
  pillNote: "What Verbal does next",
  // Split so that neither line is a complete phrase on its own. The line it
  // replaced was "Everything Verbal / cannot do yet.", where line one parses
  // as a finished noun phrase ("everything Verbal", meaning all of it) and
  // line two then reverses the sense. A reader has to go back and re-read,
  // which is the one thing a headline cannot ask for.
  headline: ["What Verbal", "does next."],
  // Cut from 28 words to 13. "The honest list." was the page congratulating
  // itself, and the sentence about leaving an address repeated what the button
  // and the line under it already say twice over. What is left is the one
  // thing the lead alone can do: name the three states the board is sorted
  // into, in the order they appear in it.
  lead:
    "What is in the app, what is being built, and what is only wanted. Most " +
    "pages show you the finished half. This one shows all of it, including " +
    "what does not exist yet.",
  emailLabel: "Your email",
  emailPlaceholder: "you@example.com",
  submit: "Keep me posted",
  submitting: "Adding you",
  sent: "You are on the list.",
  /** Said plainly under the field, because the objection to typing an address
   *  into a box is always the same objection. */
  reassurances: ["No newsletter", "One email per release", "Leave any time"],
  scrollCue: "See the list",
} as const;

/** The board's own lead, further down. Deliberately says something the hero
 *  does not: the hero names the three states, this one says what they are
 *  worth. It used to repeat the hero almost word for word and then invite the
 *  reader to "say so", which pointed at a request form that no longer exists. */
export const WISHLIST_LEAD =
  "Sorted by how close each one is. Only the first group is a promise.";

/** The page's meta description. Separate from the copy on the page because a
 *  search result has to stand on its own, where the board's lead would be a
 *  sentence about a list the reader cannot see. */
export const WISHLIST_DESCRIPTION =
  "What is in Verbal, what is being built, and what is only wanted. Leave an " +
  "address and hear when something ships.";

/** The four states a wishlist item can be in, in board order.
 *
 *  `status` values match the CHECK constraint on `wishlist_items.status`, so
 *  adding one here means adding it there too, and a row with a status this
 *  file does not know about is dropped rather than rendered bare. */
export const STATUSES = [
  {
    status: "shipped",
    label: "In the app",
    blurb: "Done, and in the version on the phone today.",
    // The pale fills from the quote-status tokens in globals.css, kept solid
    // so each chip reads as a badge against the royal ground rather than as a
    // wash of it. Their dark text is what carries the contrast; a translucent
    // white chip would make all four look alike, which defeats the point of
    // colouring a status at all.
    chip: "bg-[var(--accepted-fill)] text-[var(--accepted)]",
  },
  {
    status: "building",
    label: "Being built",
    blurb: "Started, and meant for the next release.",
    chip: "bg-[var(--sent-fill)] text-[var(--sent)]",
  },
  {
    status: "planned",
    label: "Next up",
    blurb: "Decided on, not started.",
    chip: "bg-tint-strong text-accent-text",
  },
  {
    status: "considering",
    label: "On the wishlist",
    blurb: "Wanted, by us or by somebody who wrote in. Nothing is promised.",
    // The one status with nothing promised behind it, so the one chip that is
    // a tint of the page rather than a colour laid on top of it.
    chip: "bg-white/15 text-white",
  },
] as const;

export type WishlistStatus = (typeof STATUSES)[number]["status"];

/** Length cap, mirroring the CHECK constraint on `wishlist_subscribers.email`.
 *  Repeated rather than derived because the database is the authority and the
 *  browser cannot ask it. */
export const LIMITS = { email: 320 } as const;
