import { Link2, Mail, MessageSquare } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

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

export function ShareBand() {
  return (
    <Reveal stagger={0.07}>
      <Section id="share" className="scroll-mt-24">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-3xl">
            <h2
              data-reveal
              className="font-slab text-5xl leading-[1.05] tracking-tight sm:text-7xl"
            >
              Share your quotes anywhere
            </h2>

            <ul className="mt-10 flex flex-wrap gap-3">
              {CHANNELS.map(({ label, Icon }) => (
                <li key={label} data-reveal>
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
    </Reveal>
  );
}

/**
 * Placeholder for the quote-as-PDF artwork, which does not exist yet.
 *
 * Three pages fanned from a common bottom edge, the middle one square on and
 * over the other two. `origin-bottom` is what makes the outer pair pivot like
 * paper spread on a table rather than swing around their own centres.
 *
 * The ruled lines inside are deliberately obvious as a skeleton: this is
 * scaffolding to be replaced by real screenshots, and it should not be mistaken
 * for a finished illustration in the meantime.
 */
function PdfStack() {
  // The outer pair sits lower as well as rotated, so the centre page reads as
  // the one on top of the pile rather than one of three in a row.
  const pages = [
    "left-0 top-10 -rotate-6 origin-bottom",
    "right-0 top-10 rotate-6 origin-bottom",
    "left-1/2 top-0 z-10 -translate-x-1/2",
  ];

  return (
    <div
      data-reveal
      aria-hidden="true"
      className="relative mx-auto aspect-[4/3] w-full max-w-md select-none"
    >
      {pages.map((placement, i) => (
        <div
          key={i}
          className={`absolute h-full w-[52%] border border-line bg-card p-4 ${placement}`}
        >
        </div>
      ))}
    </div>
  );
}
