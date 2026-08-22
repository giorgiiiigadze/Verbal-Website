import { STEPS } from "@/content/features";
import { Section, SectionHeading } from "@/components/layout/Section";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { StepsReveal } from "@/components/home/StepsReveal";

/**
 * How the app works, third on the page: a phone on the left, the three steps
 * beside it, the pair centred as one block.
 *
 * The heading sits inside the right column rather than above the whole band, so
 * the copy reads as one column top to bottom and the frame keeps the full
 * height of the section next to it. Below `lg` the two stack and the phone goes
 * first — it is the faster read of the two on a small screen.
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
        <div className="grid items-center justify-items-center gap-16 lg:grid-cols-[320px_minmax(0,36rem)] lg:justify-center lg:gap-24">
          <div data-steps-phone className="w-full max-w-[300px] lg:max-w-none">
            <PhoneFrame
              src="/phone/screen-quote.png"
              alt="A quote in Verbal, priced line by line, with two items marked as needing a price."
              sizes="(min-width: 1024px) 320px, 300px"
            />
          </div>

          <div>
            <div data-steps-reveal>
              <SectionHeading
                eyebrow="How sentance becomes a quote"
                eyebrowTone="brand"
                title="Three steps, one of them optional"
                lead="You talk, you check the numbers, you send it. The checking is the only part that is really up to you."
              />
            </div>

            <ol className="mt-12 space-y-10">
              {STEPS.map((step) => (
                <li key={step.number} data-steps-reveal className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-card font-slab text-sm text-royal-200"
                  >
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-2xl">{step.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>
    </StepsReveal>
  );
}
