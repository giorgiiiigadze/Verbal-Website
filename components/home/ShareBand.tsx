import { Link2, Mail, MessageSquare } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ShareReveal } from "@/components/home/ShareReveal";

/**
 * The share claim, said once and large.
 *
 * A quote leaves the app as a web link, so it goes wherever a link goes —
 * there is no integration list to publish and nothing here names a third party
 * the app has a deal with. The four below are the routes people actually use,
 * and they are deliberately the generic ones the iOS share sheet offers rather
 * than brands.
 *
 * They are `span`s, not links: each one describes somewhere a quote can go,
 * and none of them is a destination on this website.
 */
const CHANNELS = [
  { label: "Messages", Icon: MessageSquare },
  { label: "Email", Icon: Mail },
  { label: "Copy link", Icon: Link2 },
];

/**
 * The headline, split here rather than in the browser.
 *
 * ShareReveal lands it a word at a time, and the split has to exist in the
 * markup for that: rewriting a heading into spans after hydration means the
 * server's HTML and the client's disagree, and it is the one line on the page
 * most likely to be read by something that never runs the script.
 *
 * The spaces are their own text nodes, between the spans rather than inside
 * them — a trailing space in an inline-block is collapsed away, and the words
 * would set solid.
 */
const HEADLINE = ["Share", "your", "quotes", "anywhere"];

export function ShareBand() {
  return (
    <ShareReveal>
      <Section id="share" className="scroll-mt-24">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-3xl">
            <h2 className="font-slab text-5xl leading-[1.05] tracking-tight sm:text-7xl">
              {HEADLINE.map((word, i) => (
                <span key={word}>
                  {i > 0 ? " " : null}
                  <span data-share-word className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            <ul className="mt-10 flex flex-wrap gap-3">
              {CHANNELS.map(({ label, Icon }) => (
                <li key={label} data-share-chip>
                  <span className="inline-flex items-center gap-2 rounded-2xl bg-text px-5 py-3 text-sm font-semibold text-white">
                    <Icon aria-hidden="true" className="h-4 w-4 text-white/70" />
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <PdfStack />
        </div>
      </Section>
    </ShareReveal>
  );
}

/**
 * Placeholder for the quote-as-PDF artwork, which does not exist yet.
 *
 * Three pages fanned from a common bottom edge, the middle one square on and
 * over the other two. `origin-bottom` is what makes the outer pair pivot like
 * paper spread on a table rather than swing around their own centres.
 *
 * Each page is two elements. The outer one holds where the page sits and the
 * angle it rests at, both as classes, so the fan is the stylesheet's and
 * survives with no script. The inner one is the animated element and starts
 * turned the other way, cancelling its parent — see ShareReveal. Rotating one
 * element from both sides is what that split avoids: Tailwind's angle and
 * GSAP's would be two declarations racing, and which won would come down to
 * whether the utility compiled to `rotate` or to `transform`.
 *
 * The ruled lines inside are deliberately obvious as a skeleton: this is
 * scaffolding to be replaced by real screenshots, and it should not be mistaken
 * for a finished illustration in the meantime.
 */
function PdfStack() {
  // The outer pair sits lower as well as rotated, so the centre page reads as
  // the one on top of the pile rather than one of three in a row.
  const pages = [
    "left-0 top-10 -rotate-6",
    "right-0 top-10 rotate-6",
    "left-1/2 top-0 z-10 -translate-x-1/2",
  ];

  return (
    <div
      data-share-stack
      aria-hidden="true"
      className="relative mx-auto aspect-[4/3] w-full max-w-md select-none"
    >
      {pages.map((placement, i) => (
        <div
          key={i}
          className={`absolute h-full w-[52%] origin-bottom ${placement}`}
        >
          <div
            data-share-page
            className="h-full w-full origin-bottom border border-line bg-card p-4"
          />
        </div>
      ))}
    </div>
  );
}
