/**
 * The trades set up asks about, and the jobs it offers to price for each.
 *
 * The first nine are mirrored from Views/Onboarding/TradePresets.swift in the
 * app repo. If that table changes, change this one — the point of showing it is
 * that it is what you actually get.
 *
 * The six after them are AHEAD OF THE APP: bricklayer through handyman are not
 * in TradePresets yet, so today they fall through to the generic three lines
 * (call-out, hourly, day rate) rather than the jobs listed here. They are here
 * to widen the page, and they are written the way the app would write them, so
 * adding the same six to the Swift table is a copy. Until that happens, note
 * that content/faq.ts still names only the nine, because the FAQ is describing
 * the app rather than this list.
 *
 * The names are how a British trade names them, same as in the app.
 */

export type Trade = {
  name: string;
  /** One line on what the app does for this trade specifically. */
  blurb: string;
  /** Example priced jobs, verbatim from TradePresets. */
  jobs: { name: string; unit: string }[];
};

export const TRADES: Trade[] = [
  {
    name: "Electrician",
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
    name: "Plumber",
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
    name: "Carpenter",
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
    name: "Tiler",
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
    name: "Painter",
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
    name: "Plasterer",
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
    name: "Builder",
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
    name: "Roofer",
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
    name: "Landscaper",
    blurb: "Turf, paving, decking and fencing, priced off the measure-up.",
    jobs: [
      { name: "Lay turf", unit: "m²" },
      { name: "Patio / paving", unit: "m²" },
      { name: "Decking", unit: "m²" },
      { name: "Fencing", unit: "m" },
      { name: "Garden clearance", unit: "job" },
    ],
  },
  {
    name: "Bricklayer",
    blurb: "Walls, chimneys and pointing, measured by the metre or the job.",
    jobs: [
      { name: "Brickwork", unit: "m²" },
      { name: "Build a garden wall", unit: "m" },
      { name: "Rebuild a chimney", unit: "job" },
      { name: "Repointing", unit: "m²" },
      { name: "Fit a lintel", unit: "each" },
    ],
  },
  {
    name: "Glazier",
    blurb: "Panes, units and splashbacks, priced by the opening.",
    jobs: [
      { name: "Replace a glazing unit", unit: "each" },
      { name: "Replace a pane", unit: "each" },
      { name: "Fit a glass splashback", unit: "each" },
      { name: "Board up an opening", unit: "job" },
      { name: "Fit a mirror", unit: "each" },
    ],
  },
  {
    name: "Locksmith",
    blurb: "Call-outs and cylinders, where the job is priced before you set off.",
    jobs: [
      { name: "Change a lock", unit: "each" },
      { name: "Fit a deadbolt", unit: "each" },
      { name: "Rekey a cylinder", unit: "each" },
      { name: "Emergency lockout", unit: "job" },
      { name: "Security check", unit: "job" },
    ],
  },
  {
    name: "Heating engineer",
    blurb: "Boilers, systems and stats: long jobs with a short list of lines.",
    jobs: [
      { name: "Boiler service", unit: "job" },
      { name: "Boiler replacement", unit: "job" },
      { name: "Power flush", unit: "job" },
      { name: "Fit a smart thermostat", unit: "each" },
      { name: "Balance the radiators", unit: "job" },
    ],
  },
  {
    name: "Flooring fitter",
    blurb: "Square-metre work with the lift and the underlay counted separately.",
    jobs: [
      { name: "Lay laminate", unit: "m²" },
      { name: "Fit carpet", unit: "m²" },
      { name: "Vinyl and LVT", unit: "m²" },
      { name: "Fit underlay", unit: "m²" },
      { name: "Lift old flooring", unit: "m²" },
    ],
  },
  {
    name: "Handyman",
    blurb: "A list of small jobs, which is the hardest kind of quote to type up.",
    jobs: [
      { name: "Flat-pack assembly", unit: "hour" },
      { name: "Hang a TV bracket", unit: "each" },
      { name: "Fit blinds", unit: "each" },
      { name: "Filling and touch up", unit: "hour" },
      { name: "Odd jobs", unit: "day" },
    ],
  },
];
