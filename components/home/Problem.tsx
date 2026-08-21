import { Section } from "@/components/layout/Section";

export function Problem() {
  return (
    <Section tone="bg">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-slab text-2xl leading-relaxed sm:text-3xl">
          The job takes an hour. The quote takes until nine o&apos;clock that
          night — and the ones you never get round to writing are the ones
          somebody else wins.
        </p>
        <p className="mt-6 text-lg text-muted">
          Verbal exists to close that gap. Not to run your business, not to
          replace your judgement — just to get the quote written while you are
          still standing in the room you are quoting for.
        </p>
      </div>
    </Section>
  );
}
