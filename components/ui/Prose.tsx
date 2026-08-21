import { Container } from "@/components/layout/Container";

/** The wrapper for the two long-form legal pages. Narrow measure, system sans
 *  for the body — a thousand words of slab serif is hard work on a screen. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <Container className="py-16 sm:py-24">
      <article className="prose prose-verbal mx-auto max-w-2xl">
        {children}
      </article>
    </Container>
  );
}
