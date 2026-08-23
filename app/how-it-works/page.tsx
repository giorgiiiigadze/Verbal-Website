import { STEPS } from "@/content/features";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { QuotePreview } from "@/components/ui/QuotePreview";
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
      <PageHeader
        tone="plain"
        align="center"
        eyebrow="How it works"
        title="From a spoken sentence to a sent quote"
        lead="There is no form to fill in. You describe the work the way you would describe it out loud, because that is the only part of quoting that is already fast."
      />

      {STEPS.map((step, index) => {
        // Every band is white now, so the rhythm comes from the columns
        // swapping sides rather than from the background alternating. Order is
        // set at `lg` only: stacked, the words still come before the picture.
        const flip = index % 2 === 1;

        return (
          <Reveal key={step.number} stagger={0.12}>
            <Section tone="bg">
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

                <div data-reveal className={flip ? "lg:order-1" : ""}>
                  {index === 0 ? <SpokenJob /> : null}
                  {index === 1 ? <QuotePreview /> : null}
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

/** What you say, as the app hears it. */
function SpokenJob() {
  return (
    <div className="rounded-[var(--radius-card)] bg-[#FAFAFA] p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0098F2] text-white">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-5 w-5 fill-current"
          >
            <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.93V21h2v-3.07A7 7 0 0 0 19 11h-2Z" />
          </svg>
        </span>
        <div className="flex items-end gap-1" aria-hidden="true">
          {[10, 22, 16, 30, 24, 14, 26, 18, 8].map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}px` }}
              className="w-1 rounded-full bg-[#0098F2]/35"
            />
          ))}
        </div>
      </div>
      <p className="mt-6 font-slab text-xl leading-relaxed">
        &ldquo;Replace the consumer unit, add two double sockets in the kitchen,
        chase in a spur for the oven, and six fire-rated downlights in the
        hallway.&rdquo;
      </p>
      <p className="mt-4 text-sm text-muted">
        Transcribed on the device. The audio is never uploaded and never saved.
      </p>
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
