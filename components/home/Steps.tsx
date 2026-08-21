import { STEPS } from "@/content/features";
import { Section, SectionHeading } from "@/components/layout/Section";

export function Steps() {
  return (
    <Section tone="surface" id="how">
      <SectionHeading
        eyebrow="How it works"
        title="Three steps, one of them optional"
        lead="You talk, you check the numbers, you send it. The checking is the only part that is really up to you."
      />

      <ol className="mt-14 grid gap-8 md:grid-cols-3">
        {STEPS.map((step) => (
          <li
            key={step.number}
            className="rounded-[var(--radius-card)] border border-line bg-card p-7"
          >
            <span className="font-slab text-sm tracking-[0.2em] text-accent-text">
              {step.number}
            </span>
            <h3 className="mt-3 text-2xl">{step.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
