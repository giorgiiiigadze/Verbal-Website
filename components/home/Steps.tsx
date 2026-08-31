import {
  type Mark,
  StepOneMark,
  StepThreeMark,
  StepTwoMark,
} from "@/components/ui/marks";
import { STEPS } from "@/content/features";
import { Section } from "@/components/layout/Section";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { StepsReveal } from "@/components/home/StepsReveal";

/**
 * The drawn numerals, keyed by the number in `content/features` so a step
 * without one falls back to its own typed figure rather than to a hole. All
 * three are drawn now; the fallback stays for a fourth step arriving before
 * its figure does.
 */
const STEP_MARKS: Record<string, Mark | undefined> = {
  "01": StepOneMark,
  "02": StepTwoMark,
  "03": StepThreeMark,
};

/**
 * The screen each step is talking about, in step order.
 *
 * All three are rendered, stacked on top of each other, and StepsReveal fades
 * between them as the reader moves down the list. The first is the one in
 * normal flow and so the one that sets the stack's height; the other two are
 * laid over it and start at zero.
 *
 * That is also the state a reader gets with no JavaScript, or having asked for
 * reduced motion: the recording screen, beside all three steps at full
 * strength. The two behind it are `aria-hidden` in the markup for the same
 * reason — a screen reader would otherwise read three long descriptions of
 * screens, two of which are invisible.
 */
const SCREENS = [
  {
    src: "/phone/screen-record.png",
    alt: "Verbal's recording sheet on an iPhone, open and empty: an untitled quote, the prompt to tap the mic and describe the job in your own words, a mic button, a timer at 00:00 and a Generate button.",
  },
  {
    src: "/phone/screen-quote-review.png",
    alt: "The quote that came back: a summary, a scope of work, line items priced from the rate card, three of them marked as needing a price, and a total that says it excludes those three.",
  },
  {
    src: "/phone/screen-quote.png",
    alt: "A quote in Verbal, priced line by line, with two items marked as needing a price.",
  },
];

/**
 * How the app works, third on the page: a phone on the left, the three steps
 * beside it, the pair centred as one block.
 *
 * There is no heading. It carried an eyebrow, a title and a lead, and the
 * three steps said the same thing immediately underneath — the band now opens
 * on the numbered list itself, which is the only part a reader was going to
 * read anyway.
 *
 * That leaves the section without a name, so `id="how"` is the only thing the
 * header's "How it works" link and the /how-it-works page have to land on. It
 * has to stay.
 *
 * On a phone the frame comes first and the steps follow, which is DOM order.
 * At `lg` the two are placed explicitly into columns rather than reordered, so
 * the frame sits beside the steps rather than above them.
 *
 * Only `body` is used here. Each step's longer `detail` is the /how-it-works
 * page's job; repeating it on the home page would make this a wall rather than
 * a summary.
 */
export function Steps() {
  return (
    <StepsReveal>
      {/* From `lg` the block is a window-height scene with everything centred
          in it, which is the shape the pin holds: the section is at least as
          tall as the window, so resting it in the middle of the window rests
          the whole thing rather than framing part of it. Below `lg` it is an
          ordinary section and takes the height of its contents. */}
      <Section
        id="how"
        // lg:py-8 undoes most of the section's own padding. At `lg` the block
        // is a window-height scene with its contents centred, so that padding
        // is never seen — all it does is take height the frame could have had,
        // and the frame's size is bounded by what the window can hold.
        className="lg:flex lg:min-h-svh lg:items-center lg:justify-center lg:py-8"
      >
        {/*
          The pair is centred as a block rather than stretched across the whole
          container: at `max-w-6xl` the step lines would run past a comfortable
          measure and leave the phone stranded at the far edge.

          The phone track is a fixed 420px and only the copy track can give — an
          `auto auto` pair would let the phone be squeezed whenever the two
          columns and the gap together came to more than the container, which
          made raising the frame's max-width do nothing on a narrower window.
          The copy's `minmax(0, 36rem)` is what absorbs that instead.
        */}
        {/* One row now the heading has gone, so the two columns simply centre
            against each other. */}
        <div className="grid items-center gap-10 lg:grid-cols-[420px_minmax(0,36rem)] lg:justify-center lg:gap-x-24">
          {/* From `lg` the frame is sized against the window's height, not
              only against its column. The frame's art is 489x1000, so its
              height is a little over twice its width, so a width in pixels is
              a height the window may not have. `42svh` keeps the whole block
              inside the window at any height, which is what lets the section be
              pinned rather than only pinned on tall screens: at the 640px floor
              the frame comes out 269px wide and 550px tall, and the block 614px
              — still inside the window. 42 is close to the ceiling for that
              floor, and it is the section's trimmed `lg` padding that bought
              it; the number to raise for a bigger frame is the 420px cap, which
              takes over above a window of about 1000px.

              The frame does not move. It used to drift on a Parallax, which
              was there because a frame holding perfectly still beside three
              steps being read read as pasted on. That is no longer true — it
              now changes screen as the steps go by, which is life enough — and
              a scrubbed drift is actively wrong once the section is pinned: the
              page has stopped, the reader is being held, and the one thing that
              should be still is the thing they are being held to look at.

              Dropped 40px at `lg`. A transform, so the layout keeps the height
              it had and the fit the frame's size was tuned against still holds.

              The limit is the window, not the section: while pinned the section
              is the height of the window, so anything pushed below its bottom
              edge is cut off by the browser rather than merely overlapping what
              follows. At the 640px floor the frame ends 45px short of that
              edge, so 40 is most of what there is and 44 would be the end of
              it. Going lower than that means taking the `42svh` down a notch
              first.

              The frame is first in the DOM, so on a phone it is met before the
              steps; at `lg` the explicit column puts it back on the left. */}
          <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:col-start-1 lg:w-[min(420px,42svh)] lg:max-w-none lg:translate-y-10">
            {/* The three screens, stacked. The first is in normal flow and sets
                the height; the other two are laid over it and start at zero. */}
            <div data-steps-phone className="relative">
              {SCREENS.map((screen, i) => (
                <div
                  key={screen.src}
                  data-step-screen
                  aria-hidden={i > 0 ? true : undefined}
                  className={i === 0 ? undefined : "absolute inset-0 opacity-0"}
                >
                  <PhoneFrame
                    src={screen.src}
                    alt={screen.alt}
                    sizes="(min-width: 1024px) 420px, (min-width: 640px) 300px, 260px"
                  />
                </div>
              ))}
            </div>
          </div>

          <ol className="space-y-10 lg:col-start-2">
            {STEPS.map((step) => {
              const NumberMark = STEP_MARKS[step.number];
              return (
                // Two elements, and the nesting is the point. StepsReveal
                // dims the `li` to mark which step is being read, and its
                // entrance fades the `div` inside; putting both on one element
                // would have the entrance overwrite the dim the moment the
                // section arrived. Nested, the two opacities simply multiply.
                <li key={step.number} data-step>
                  <div data-steps-reveal className="flex gap-5">
                    {/* No ring, no fill: the numerals are drawings and a circle
                      around one reads as a badge printed over a sketch. The slot
                      is what is left of the old chip — it keeps the three rows on
                      one left edge whatever shape each figure turns out to be. */}
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center font-slab text-sm text-royal-200"
                    >
                      {NumberMark ? (
                        <NumberMark className="h-10 w-10" />
                      ) : (
                        step.number
                      )}
                    </span>
                    <div>
                      <h3 className="text-2xl">{step.title}</h3>
                      <p className="mt-2 leading-relaxed text-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>
    </StepsReveal>
  );
}
