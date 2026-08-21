import { STEPS } from "@/content/features";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { QuotePreview } from "@/components/ui/QuotePreview";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
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
        eyebrow="How it works"
        title="From a spoken sentence to a sent quote"
        lead="There is no form to fill in. You describe the work the way you would describe it out loud, because that is the only part of quoting that is already fast."
      />

      {STEPS.map((step, index) => (
        <Section key={step.number} tone={index % 2 === 0 ? "bg" : "surface"}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
            <div>
              <span className="font-slab text-sm tracking-[0.2em] text-accent-text">
                {step.number}
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl">{step.title}</h2>
              <p className="mt-4 text-lg text-muted">{step.body}</p>
              <p className="mt-5 leading-relaxed text-muted">{step.detail}</p>
            </div>

            <div>
              {index === 0 ? <SpokenJob /> : null}
              {index === 1 ? <QuotePreview /> : null}
              {index === 2 ? <SharedLink /> : null}
            </div>
          </div>
        </Section>
      ))}

      <Section tone="tint">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl">
            The whole loop takes about a minute.
          </h2>
          <p className="mt-5 text-lg text-muted">
            Most of which is you reading it before it goes out — which is the
            part that should take a minute.
          </p>
          <div className="mt-8 flex justify-center">
            <AppStoreBadge />
          </div>
        </div>
      </Section>
    </>
  );
}

/** What you say, as the app hears it. */
function SpokenJob() {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-7">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
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
              className="w-1 rounded-full bg-royal-300/60"
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
    <div className="rounded-[var(--radius-card)] border border-line bg-card p-7">
      <p className="text-sm text-muted">Your customer sees</p>
      <p className="mt-3 font-slab text-2xl">$1,145.00</p>
      <p className="mt-1 text-sm text-muted">
        Consumer unit and kitchen sockets · valid 30 days
      </p>

      <div className="mt-6 flex gap-3">
        <span className="flex-1 rounded-[var(--radius-chip)] bg-primary px-4 py-3 text-center text-sm font-semibold text-white">
          Accept
        </span>
        <span className="flex-1 rounded-[var(--radius-chip)] border border-declined/35 px-4 py-3 text-center text-sm font-semibold text-declined">
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
