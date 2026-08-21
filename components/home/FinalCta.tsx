import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { Section } from "@/components/layout/Section";

export function FinalCta() {
  return (
    <Section tone="tint">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-slab text-3xl leading-tight sm:text-4xl">
          Quote it before you have packed the van.
        </h2>
        <p className="mt-5 text-lg text-muted">
          Verbal is coming to iPhone. Two quotes a day, free — and the ones you
          make are yours to keep either way.
        </p>
        <div className="mt-9 flex justify-center">
          <AppStoreBadge />
        </div>
      </div>
    </Section>
  );
}
