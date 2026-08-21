import { Container } from "./Container";

/** The banner every inner page opens with. */
export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="border-b border-line bg-tint">
      <Container className="pb-16 pt-28 sm:pb-20 sm:pt-32">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-slab text-4xl leading-tight sm:text-5xl">
          {title}
        </h1>
        {lead ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {lead}
          </p>
        ) : null}
      </Container>
    </div>
  );
}
