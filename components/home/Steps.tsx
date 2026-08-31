import {
  type Mark,
  StepOneMark,
  StepThreeMark,
  StepTwoMark,
} from "@/components/ui/marks";
import { STEPS } from "@/content/features";
import { Section, SectionHeading } from "@/components/layout/Section";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { StepsReveal } from "@/components/home/StepsReveal";
import { Parallax } from "@/components/ui/Parallax";

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
 * How the app works, third on the page: a phone on the left, the three steps
 * beside it, the pair centred as one block.
 *
 * From `lg` the heading sits in the right column rather than above the whole
 * band, so the copy reads as one column top to bottom and the frame keeps the
 * full height of the section beside it.
 *
 * Stacked, that arrangement fell apart: the phone came first and a visitor met
 * a screenshot the height of their screen before a word explaining it, then had
 * to scroll past it to find the heading. So on a phone the three parts run in
 * reading order — heading, frame, steps — and the desktop arrangement is put
 * back with explicit row and column placement at `lg`, not by DOM order.
 *
 * Only `body` is used here. Each step's longer `detail` is the /how-it-works
 * page's job; repeating it on the home page would make this a wall rather than
 * a summary.
 */
export function Steps() {
  return (
    <StepsReveal>
      <Section id="how">
        {/*
          The pair is centred as a block rather than stretched across the whole
          container: at `max-w-6xl` the step lines would run past a comfortable
          measure and leave the phone stranded at the far edge.

          The phone track is a fixed 320px and only the copy track can give — an
          `auto auto` pair would let the phone be squeezed whenever the two
          columns and the gap together came to more than the container, which
          made raising the frame's max-width do nothing on a narrower window.
          The copy's `minmax(0, 36rem)` is what absorbs that instead.
        */}
        {/* `grid-rows-[auto_1fr]` is what keeps the heading and the steps together.
            The frame spans both rows and is taller than the two of them stacked,
            so with two auto rows its surplus height was shared out between them
            and reappeared as a hole under the heading. Pinning row one to its
            content sends all of that slack into row two instead, where the
            steps sit at the top of it. */}
        <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,36rem)] lg:grid-rows-[auto_1fr] lg:justify-center lg:gap-x-24 lg:gap-y-12">
          <div data-steps-reveal className="lg:col-start-2 lg:row-start-1">
            <SectionHeading
              eyebrow="How a sentence becomes a quote"
              eyebrowVariant="pill"
              title="Three steps, one of them optional"
              lead="You talk, you check the numbers, you send it. The checking is the only part that is really up to you."
            />
          </div>

          {/* Spanning both rows is what keeps the frame centred against the
              heading and the steps together, rather than against either one. */}
          {/* The drift is small and slow on purpose: three steps are read one
              after another beside a frame that is not moving in layout, and a
              frame that held perfectly still through all of that would read as
              pasted on. The grid placement moves to the Parallax, which is now
              the element the grid sees. */}
          <Parallax
            from={26}
            to={-26}
            className="mx-auto w-full max-w-[260px] sm:max-w-[300px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center"
          >
            <div data-steps-phone>
              <PhoneFrame
                src="/phone/screen-quote.png"
                alt="A quote in Verbal, priced line by line, with two items marked as needing a price."
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 260px"
              />
            </div>
          </Parallax>

          <ol className="space-y-10 lg:col-start-2 lg:row-start-2 lg:self-start">
            {STEPS.map((step) => {
              const NumberMark = STEP_MARKS[step.number];
              return (
                <li key={step.number} data-steps-reveal className="flex gap-5">
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
                </li>
              );
            })}
          </ol>
        </div>
      </Section>
    </StepsReveal>
  );
}
