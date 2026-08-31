import { LinkMark, LockMark, type Mark, TagMark } from "@/components/ui/marks";
import { Parallax } from "@/components/ui/Parallax";
import { Section } from "@/components/layout/Section";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { SpeakSendReveal } from "@/components/home/SpeakSendReveal";

/**
 * The rule above each claim, drawn as a pseudo-element rather than a border.
 *
 * It holds black at a tenth to the middle of the column and is gone by the
 * right-hand end, so the list is ruled where the eye starts a line and open
 * where it leaves it. A border cannot do this — a border is one colour for its
 * whole length — so `divide-y` gave way to a 1px `::before` with a gradient
 * on it.
 *
 * Black at a tenth is what `divide-black/10` was: a shade past `--color-line`
 * (black at 8%), which is drawn for the edge of a card and reads as a smudge
 * across an open column. The fade spends some of that weight, so if the rules
 * go too faint this value is the one to raise.
 *
 * `transparent` at the far end rather than a second rgba: it resolves to black
 * at zero alpha, the same hue the gradient starts on, so the line thins out
 * instead of drifting grey on its way.
 *
 * `first:before:hidden` keeps the list from opening on a rule, which is the
 * one thing `divide-y` was doing for free.
 */
const RULE =
  "before:absolute before:inset-x-0 before:top-0 before:h-px first:before:hidden " +
  "before:bg-[linear-gradient(to_right,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_50%,transparent_100%)]";

/**
 * Rules with nothing on them, run on under the three claims.
 *
 * There are only three things to say here, but three rows left the column
 * short against the phone beside it. These are the rest of the ruling without
 * the rest of the copy — the list carries on as a list and simply stops
 * saying anything, rather than the section ending on a hard edge.
 *
 * They are `aria-hidden`, because an empty list item is a row a screen reader
 * would announce and there is nothing in it. Change this to 0 the moment there
 * is a fourth claim worth making: a real point is always better than a rule
 * standing in for one.
 */
const EMPTY_ROWS = 2;

/**
 * The vertical the rules hang off, down the left of the list only.
 *
 * The horizontal rules are solid where a line starts and gone by the end of
 * it, which already implies a left edge; this is that edge drawn. It is on the
 * list rather than on the section, so the headline above it keeps the hero's
 * left edge instead of being pushed off it to make room — a rule down the
 * whole section would need the whole column inset from it.
 *
 * It fades downward on the same terms the rules fade across, and the two empty
 * rows at the foot of the list are what it fades out over.
 *
 * A pseudo-element, not `border-l`: a border would take a pixel of layout and
 * push the rules off the line it is drawn on, and it could not carry the
 * gradient. Because it takes no space, the rows' `inset-x-0` rules still start
 * exactly on it and the two meet as a corner.
 */
const SPINE =
  "before:absolute before:inset-y-0 before:left-0 before:w-px " +
  "before:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.1)_50%,transparent_100%)]";

const POINTS: { text: string; Icon: Mark }[] = [
  {
    text: "Your voice never leaves the phone. iOS transcribes it there.",
    Icon: LockMark,
  },
  { text: "It never invents a price. It flags the gaps.", Icon: TagMark },
  { text: "Send a link, get an answer. No app, no account.", Icon: LinkMark },
];

/**
 * The block the hero's quote phone lands in.
 *
 * Laid out after Granola's "Effortless notes" section: a large headline over
 * three plain claims on the left, one screen on the right. It sits where the
 * placeholder testimonial used to — a made-up quote said nothing true, and
 * these three things are all provable, each one traceable to `content/features`
 * and to a screen the reader can go and see.
 *
 * Two short sentences per claim, and one mark beside them. The first is the
 * claim and the second is the thing that makes it true — the part the reader
 * would otherwise have to take on trust — and all three of those come straight
 * out of `content/features`: transcription on the device, unpriced lines
 * flagged rather than guessed, a web link with nothing to install.
 *
 * Two sentences rather than one joined by a dash. The dash read as an aside
 * where the second half is doing the actual work, and a full stop gives it the
 * same weight as the claim it is holding up.
 *
 * They set to two lines in the column at desktop, which is why the row centres
 * its mark rather than aligning it to the first line. All three marks are
 * drawings, and
 * two of them — the tag and the link — are the same files the features menu
 * puts on the same two claims, so the menu and this block agree rather than
 * each keeping its own picture of the idea.
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
export function SpeakSend() {
  return (
    <SpeakSendReveal>
      {/* The hero's width, not the default one: this block sits directly under
          the hero and takes its phone from it, so the two share an edge — which
          is also the line the header pill lands on, and the line the list's
          spine is drawn on. */}
      <Section tone="bg" size="wide">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <Parallax from={40} to={-40} className="max-w-xl">
            {/* No weight class: `h1, h2, h3, .font-slab` in globals.css sets
                400, and that rule is outside any cascade layer, so unlayered
                CSS beats every Tailwind utility whatever its specificity. This
                line was carrying `font-light!` — the `!` being what it took to
                win — and 400 is the step up from it.

                Padded by the same 24px the rows are, so the headline starts on
                the list's inner edge instead of 24px to the left of the marks.
                The spine still runs at 0, which puts the heading inside the
                column the rules are drawn across rather than hanging off the
                front of it. */}
            <h2
              data-speak-reveal
              className="pl-6 font-slab text-3xl leading-[1.22] tracking-tight sm:text-5xl"
            >
              Effortless quotes,
              <br />
              priced on the spot.
            </h2>

            {/* A hairline between the claims and nothing around them: the
                rules separate the three lines without drawing a box the section
                does not otherwise have. Each one fades out to the right — see
                RULE above for how and why. */}
            <ul className={`relative mt-8 ${SPINE}`}>
              {POINTS.map(({ text, Icon }) => (
                <li
                  key={text}
                  data-speak-reveal
                  className={`relative flex items-center gap-4 py-6 pl-6 ${RULE}`}
                >
                  {/* No fill behind the mark — the lock is line art on nothing
                      and a tile would box it. The 48px slot stays, empty:
                      it is what holds the three marks to one left edge whatever
                      width each drawing turns out to be.

                      Hidden from assistive tech, and the icons stay unlabelled:
                      each one repeats the sentence it sits beside, so naming it
                      would read the claim twice. No colour set on the slot
                      either: all three marks are drawn in their own ink, and
                      nothing here inherits `currentColor` any more. */}
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 shrink-0 items-center justify-center"
                  >
                    <Icon className="h-10 w-10" />
                  </span>
                  {/* Set to hold its own against the 40px mark beside it: at
                      the 12px this started on, the drawing read as the row and
                      the claim as its caption, which is backwards — the
                      sentence is the thing that is provable.

                      Medium rather than bold, and no larger than this: these
                      sit directly under a 48px slab headline and are still the
                      second voice in the column, not a competing one. A point
                      off the Tailwind step at either width — 15 and 17 rather
                      than 16 and 18 — which is as far down as they go before
                      they read as a caption for the mark again.

                      `text-text` (#37352f, the app's warm MainText) now that
                      there is enough of it to carry the warmth; at 12px the
                      same colour just read as grey, which is why this was flat
                      black before. */}
                  <p className="text-[15px] font-medium leading-snug text-text sm:text-[17px]">
                    {text}
                  </p>
                </li>
              ))}

              {/* The same row, with the mark's slot kept and everything else
                  dropped, so an empty row is exactly as tall as a full one. */}
              {Array.from({ length: EMPTY_ROWS }, (_, i) => (
                <li
                  key={`rule-${i}`}
                  aria-hidden="true"
                  data-speak-reveal
                  className={`relative flex items-center gap-4 py-6 pl-6 ${RULE}`}
                >
                  <span className="block h-12 w-12 shrink-0" />
                </li>
              ))}
            </ul>
          </Parallax>

          {/* The dock. It gets no parallax, and cannot: PhoneTravel reads
              this element's box every frame to land the travelling copy on it,
              so drifting it would move the target under the hand-off. The
              claims beside it drift alone, which is also why they drift so
              little — 40px against a phone that is holding still is a column
              breathing, and much more than that reads as the two halves of the
              block coming apart. */}
          {/* The dock, centred in its column rather than pushed to the far
              right. The claims beside it are capped at the column's own width,
              so a right-aligned 320px frame left about 300px between the last
              hairline and the phone — the two halves of the block read as two
              blocks. Centred, that closes to roughly 175px and the section
              keeps a right margin.

              It shortens the travel too: the hero anchor is the left frame of
              its pair, so a right-aligned dock had the copy drift some 275px
              across on the way down, and this halves that. PhoneTravel reads
              both anchors with `getBoundingClientRect` on every frame, so it
              needs nothing from here when the dock moves. */}
          <div className="flex justify-center">
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
