/**
 * Customer quotes shown in the social-proof band under the hero.
 *
 * READ THIS BEFORE LAUNCH. The app has no users yet, so the entry below is a
 * placeholder standing in for the real thing — it is not a real person and it
 * is not a real quote. Replace it with something a customer actually said, with
 * their permission, or set `FEATURED_TESTIMONIAL` to `null`: the band handles
 * the empty case and simply drops the card, keeping the strip above it.
 *
 * Same rule as the rest of the site — nothing on the page claims a number or a
 * name that is not true. See the note at the top of app/page.tsx.
 */

export type Testimonial = {
  /** The quote itself, without surrounding quotation marks — the card adds them. */
  quote: string;
  /** Who said it. */
  name: string;
  /** Their trade and, if they are happy to give it, their town. */
  role: string;
  /** Out of five. Omitted stars are not drawn at all rather than drawn empty. */
  rating: 1 | 2 | 3 | 4 | 5;
};

export const FEATURED_TESTIMONIAL: Testimonial | null = {
  quote:
    "Quoted three jobs on the drive between calls. Used to be sat at the kitchen table until ten doing that.",
  name: "Placeholder — replace before launch",
  role: "Electrician, Leeds",
  rating: 5,
};
