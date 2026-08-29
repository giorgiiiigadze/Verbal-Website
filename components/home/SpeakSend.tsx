import { Section } from "@/components/layout/Section";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SpeakSendReveal } from "@/components/home/SpeakSendReveal";

/**
 * The block the hero's quote phone lands in.
 *
 * Laid out after Granola's "Effortless notes" section: a large headline over
 * three plain claims on the left, one screen on the right. It sits where the
 * placeholder testimonial used to — a made-up quote said nothing true, and
 * these three things are all provable, each one traceable to `content/features`
 * and to a screen the reader can go and see.
 *
 * One short sentence per claim, and a plain square where an icon would go: at
 * this size the block is read at a glance on the way past, and three icons plus
 * three sentences of explanation was more than a glance holds.
 *
 * The right-hand phone is the docking point for PhoneTravel: on desktop the
 * fixed copy that started in the hero settles exactly over it and hands off, so
 * both frames must be the same screen (`screen-quote.png`) for the swap not to
 * flicker. On mobile, reduced-motion, or with no script, nothing travels and
 * this frame is simply the section's own image.
 *
 * `data-speak-reveal` marks what SpeakSendReveal brings in on scroll, in the
 * order they appear; the layout holds if the attribute is removed.
 */
const POINTS = [
  "Your voice never leaves the phone.",
  "It never invents a price.",
  "Send a link, get an answer.",
];

export function SpeakSend() {
  return (
    <SpeakSendReveal>
      {/* The hero's width, not the default one: this block sits directly under
          the hero and takes its phone from it, so the two have to share an edge
          — which is also the line the header pill lands on. */}
      <Section tone="bg" size="wide">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl">
            <h2
              data-speak-reveal
              className="font-slab text-3xl leading-[1.08] tracking-tight sm:text-5xl"
            >
              Effortless quotes,
              <br />
              priced on the spot.
            </h2>

            {/* A hairline between the claims and nothing around them: the rules
                separate the three lines without drawing a box the section does
                not otherwise have. `divide-y` puts the border on every item but
                the first, which is what keeps the list from opening on one.

                A shade past `--color-line` (black at 8%), which is drawn for a
                border at the edge of a card and reads as a smudge across an
                open column — but only a shade: these separate three short lines
                and should not be the first thing the eye lands on. Written here
                rather than moved into the token, which the whole site borders
                with. */}
            <ul className="mt-8 divide-y divide-black/10">
              {POINTS.map((point) => (
                <li
                  key={point}
                  data-speak-reveal
                  className="flex items-center gap-4 py-6"
                >
                  {/* Empty on purpose: the square is a place for the mark that
                      goes here once there is one to draw, and until then it is
                      the thing that gives the three lines a left edge. */}
                  <span
                    aria-hidden="true"
                    className="h-9 w-9 shrink-0 bg-[#000]"
                  />
                  {/* 12px flat, at every width — the one size on the page that
                      does not step up at `sm`, because the claims are a caption
                      under the headline rather than copy to be read at length.
                      Black rather than `text-text` (#37352f, the app's warm
                      MainText): at this size the warmth reads as grey. */}
                  <p className="text-[12px] leading-snug text-black">
                    {point}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* The dock. Right column to echo the hero's frames, so the travelling
              copy drifts down and a touch across rather than leaping the page. */}
          <div className="flex justify-center lg:justify-end">
            <div
              data-speak-reveal
              data-travel-anchor="section"
              className="w-full max-w-[320px]"
            >
              <PhoneFrame
                src="/phone/screen-quote.png"
                alt="A quote open in Verbal, two of its line items still marked as needing a price."
                sizes="(min-width: 1024px) 320px, 280px"
              />
            </div>
          </div>
        </div>
      </Section>
    </SpeakSendReveal>
  );
}
