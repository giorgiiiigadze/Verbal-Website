import { STEPS } from "@/content/features";
import { Section } from "@/components/layout/Section";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Reveal } from "@/components/ui/Reveal";
import { APP_STORE_URL } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "How it works",
  description:
    "Speak the job, check the numbers, send the link. What happens between " +
    "talking and sending a priced quote.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <>
      {/* The banner is gone and the page opens straight on step 01, but a page
          still needs one h1 and the steps below are all h2s. So the title is
          kept and only hidden: it is what a screen reader announces the page
          as, and what the outline is built from. It matches the page's
          metadata title rather than inventing a second name for the page. */}
      <h1 className="sr-only">How it works</h1>

      {STEPS.map((step, index) => {
        // Every band is white now, so the rhythm comes from the columns
        // swapping sides rather than from the background alternating. Order is
        // set at `lg` only: stacked, the words still come before the picture.
        const flip = index % 2 === 1;

        return (
          <Reveal key={step.number} stagger={0.12}>
            {/* The header is fixed and takes no space in the flow, so with the
                banner gone the first band has to clear it itself — the same
                pt-28/32 PageHeader used to carry. */}
            <Section tone="bg" className={index === 0 ? "pt-28 sm:pt-32" : ""}>
              <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
                <div data-reveal className={flip ? "lg:order-2" : ""}>
                  <span className="font-slab text-sm tracking-[0.2em] text-royal-200">
                    {step.number}
                  </span>
                  <h2 className="mt-3 text-3xl sm:text-4xl">{step.title}</h2>
                  <p className="mt-4 text-lg text-muted">{step.body}</p>
                  <p className="mt-5 leading-relaxed text-muted">
                    {step.detail}
                  </p>
                </div>

                {/* The first two steps happen inside the app, so they are
                    shown as the app: the empty recording sheet, then the quote
                    it comes back as. The third is what the customer opens in a
                    browser, which is not an app screen and is not drawn as one. */}
                <div data-reveal className={flip ? "lg:order-1" : ""}>
                  {index === 0 ? (
                    <StepPhone
                      src="/phone/screen-record.png"
                      alt="Verbal's recording sheet on an iPhone, open and empty: an untitled quote, the prompt to tap the mic and describe the job in your own words, a mic button, a timer at 00:00 and a Generate button."
                    />
                  ) : null}
                  {index === 1 ? (
                    <StepPhone
                      src="/phone/screen-quote-review.png"
                      alt="The quote that came back: a bathroom renovation for Marina Kapanadze, with a summary, a five-line scope of work, line items priced from the rate card, three of them marked as needing a price, and a total of $2,755.00 that says it excludes those three."
                    />
                  ) : null}
                  {index === 2 ? <SharedLink /> : null}
                </div>
              </div>
            </Section>
          </Reveal>
        );
      })}

      <Reveal>
        <Section tone="bg">
          {/* The charcoal panel the pricing page and the trades page close on,
              rather than the pale royal band this page used to end with. */}
          <div
            data-reveal
            className="rounded-[var(--radius-card)] bg-text p-8 text-white sm:p-12"
          >
            <h2 className="max-w-2xl font-slab text-3xl leading-tight sm:text-4xl">
              The whole loop takes about a minute.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              Most of which is you reading it before it goes out, which is the
              part that should take a minute.
            </p>

            {/* Points at the store the moment there is one; until then it goes
                back to the top of this page, so it is never a dead end. */}
            <div className="mt-10">
              <Button
                href={APP_STORE_URL ?? "/pricing"}
                variant="ghostOnRoyal"
                size="md"
              >
                <AppleMark className="h-4 w-4" />
                Coming soon to iPhone
              </Button>
            </div>
          </div>
        </Section>
      </Reveal>
    </>
  );
}

/**
 * A step's screenshot, framed.
 *
 * Sized here rather than by the grid: the picture column is the wider of the
 * two, and a phone given all of it would stand taller than the paragraph it is
 * explaining. `sizes` matches the max-widths — without one Next assumes the
 * full viewport and ships a 1920px-wide screenshot into a 300px box.
 */
function StepPhone({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="mx-auto w-full max-w-[260px] sm:max-w-[300px]">
      <PhoneFrame
        src={src}
        alt={alt}
        sizes="(min-width: 640px) 300px, 260px"
      />
    </div>
  );
}

/** What the customer opens. */
function SharedLink() {
  return (
    <div className="rounded-[var(--radius-card)] bg-[#FAFAFA] p-7">
      <p className="text-sm text-muted">Your customer sees</p>
      <p className="mt-3 font-slab text-2xl">$1,145.00</p>
      <p className="mt-1 text-sm text-muted">
        Consumer unit and kitchen sockets · valid 30 days
      </p>

      {/* Accept carries the app's own primary, not the light blue: this is a
          picture of a button in the product, and it should look like it. */}
      <div className="mt-6 flex gap-3">
        <span className="flex-1 rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-white">
          Accept
        </span>
        <span className="flex-1 rounded-full border border-declined/35 px-4 py-3 text-center text-sm font-semibold text-declined">
          Decline
        </span>
      </div>

      <p className="mt-5 text-sm text-muted">
        No app to install, no account to make. You see the answer against their
        name in the app.
      </p>
    </div>
  );
}
