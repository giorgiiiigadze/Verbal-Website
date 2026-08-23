/**
 * The trades set up asks about, and the jobs it offers to price for each.
 *
 * Mirrored from Views/Onboarding/TradePresets.swift in the app repo. If that
 * table changes, change this one — the whole point of showing it is that it is
 * what you actually get.
 *
 * The names are how a British trade names them, same as in the app.
 */

export type Trade = {
  /** Stable id for the /trades tablist. Never rendered. */
  slug: string;
  name: string;
  /** One line on what the app does for this trade specifically. */
  blurb: string;
  /**
   * A job as this trade would actually say it out loud, on site: quantities,
   * rooms, no punctuation fussiness. /trades sets this beside the priced lines
   * it turns into, which is the only demonstration the page can make without a
   * video. Every job named in a sentence appears in `jobs` below it.
   */
  spoken: string;
  /** Example priced jobs, verbatim from TradePresets. */
  jobs: { name: string; unit: string }[];
};

export const TRADES: Trade[] = [
  {
    slug: "electrician",
    name: "Electrician",
    spoken:
      "Two double sockets in the kitchen, six downlights in the lounge, and swap the consumer unit.",
    blurb: "Boards, sockets, downlights and EV chargers, priced per point.",
    jobs: [
      { name: "Add a double socket", unit: "each" },
      { name: "Fit downlights", unit: "each" },
      { name: "Replace consumer unit", unit: "job" },
      { name: "EV charger install", unit: "each" },
      { name: "Fault finding", unit: "hour" },
    ],
  },
  {
    slug: "plumber",
    name: "Plumber",
    spoken:
      "New toilet and basin in the downstairs loo, swap the rad in the hall, and the shower wants doing.",
    blurb: "Bathrooms, rads and leaks: the jobs that get quoted on the spot.",
    jobs: [
      { name: "Replace a toilet", unit: "each" },
      { name: "Fit a basin", unit: "each" },
      { name: "Install a shower", unit: "each" },
      { name: "Swap a radiator", unit: "each" },
      { name: "Unblock a drain", unit: "job" },
    ],
  },
  {
    slug: "carpenter",
    name: "Carpenter",
    spoken:
      "Hang four doors upstairs, skirting right through the landing, and wood floor in the front room.",
    blurb: "Priced by the door, the metre of skirting, or the whole fit-out.",
    jobs: [
      { name: "Hang a door", unit: "each" },
      { name: "Fit skirting", unit: "m" },
      { name: "Lay wood flooring", unit: "m²" },
      { name: "Fit kitchen units", unit: "each" },
      { name: "Build fitted wardrobe", unit: "job" },
    ],
  },
  {
    slug: "tiler",
    name: "Tiler",
    spoken:
      "Tile the bathroom walls and the floor, rip the old ones off first, and trim round the edges.",
    blurb: "Square-metre work, with the prep and the trim counted properly.",
    jobs: [
      { name: "Wall tiling", unit: "m²" },
      { name: "Floor tiling", unit: "m²" },
      { name: "Remove old tiles", unit: "m²" },
      { name: "Tanking / waterproofing", unit: "m²" },
      { name: "Fit trim and edging", unit: "m" },
    ],
  },
  {
    slug: "painter",
    name: "Painter",
    spoken:
      "Emulsion the two bedrooms, gloss the doors, paper on the chimney breast, bit of filling first.",
    blurb: "By the room, by the metre, or by the day, whichever you quote.",
    jobs: [
      { name: "Emulsion a room", unit: "job" },
      { name: "Paint walls", unit: "m²" },
      { name: "Gloss a door", unit: "each" },
      { name: "Hang wallpaper", unit: "m²" },
      { name: "Filling and prep", unit: "hour" },
    ],
  },
  {
    slug: "plasterer",
    name: "Plasterer",
    spoken:
      "Skim the ceiling and both walls in the back room, board the alcove, coving all the way round.",
    blurb: "Skimming, boarding and rendering, measured the way you measure it.",
    jobs: [
      { name: "Skim a wall", unit: "m²" },
      { name: "Skim a ceiling", unit: "m²" },
      { name: "Plasterboard / dry lining", unit: "m²" },
      { name: "Rendering", unit: "m²" },
      { name: "Fit coving", unit: "m" },
    ],
  },
  {
    slug: "builder",
    name: "Builder",
    spoken:
      "Knock the kitchen wall through with a lintel, blockwork out the back, and strip the old lot out.",
    blurb: "Big jobs with a lot of lines, spoken faster than they are typed.",
    jobs: [
      { name: "Blockwork", unit: "m²" },
      { name: "Knock through with lintel", unit: "job" },
      { name: "Concrete slab", unit: "m²" },
      { name: "Foundations", unit: "m" },
      { name: "Strip out / demolition", unit: "job" },
    ],
  },
  {
    slug: "roofer",
    name: "Roofer",
    spoken:
      "Re-roof the back, twenty odd tiles gone at the front, new guttering, and the chimney wants repointing.",
    blurb: "Quote it from the ground, before you have got the ladders down.",
    jobs: [
      { name: "Re-roof", unit: "m²" },
      { name: "Replace broken tiles", unit: "each" },
      { name: "Flat roof covering", unit: "m²" },
      { name: "Guttering", unit: "m" },
      { name: "Chimney repointing", unit: "job" },
    ],
  },
  {
    slug: "landscaper",
    name: "Landscaper",
    spoken:
      "Turf the back garden, patio outside the door, decking down the side, and fence the whole lot.",
    blurb: "Turf, paving, decking and fencing, priced off the measure-up.",
    jobs: [
      { name: "Lay turf", unit: "m²" },
      { name: "Patio / paving", unit: "m²" },
      { name: "Decking", unit: "m²" },
      { name: "Fencing", unit: "m" },
      { name: "Garden clearance", unit: "job" },
    ],
  },
];

/**
 * A trade that is not on the list is not turned away — it just gets asked
 * generically. Worth saying out loud on /trades, because the list above reads
 * like an exhaustive one.
 */
export const OTHER_TRADE = {
  name: "Something else",
  blurb:
    "Locksmith, glazier, welder, joiner, groundworker. Tell it your trade " +
    "and it prices your call-out, your hourly and your day rate, then learns " +
    "the rest as you quote.",
  jobs: [
    { name: "Call-out fee", unit: "job" },
    { name: "Hourly rate", unit: "hour" },
    { name: "Day rate", unit: "day" },
  ],
};
