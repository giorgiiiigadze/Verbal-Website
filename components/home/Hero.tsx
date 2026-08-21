import Link from "next/link";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { QuotePreview } from "@/components/ui/QuotePreview";

/**
 * Laid out after Granola's hero: announcement pill, an oversized headline, a
 * two-line subhead that adds rather than restates, one prominent CTA, and a
 * small availability line underneath.
 */
export function Hero() {
  return (
    <div className="border-b border-line bg-hero">
      <Container
          size="wide"
          className="grid items-center gap-16 pb-20 pt-28 sm:pb-28 sm:pt-36 lg:grid-cols-[1.2fr_1fr] lg:gap-12"
        >
        <div>
          <Link
            href="/how-it-works"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#F7F7F2] py-1.5 pl-1.5 pr-4 text-sm transition-colors hover:bg-[#ECECE4]"
          >
            <span className="rounded-full bg-[#c3d0ef] px-2.5 py-1 text-xs font-semibold text-text">
              Coming soon
            </span>
            <span>Verbal for iPhone</span>
            <span
              aria-hidden="true"
              className="text-muted transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>

          <h1 className="mt-6 font-slab text-[clamp(1.875rem,11vw,2.625rem)] leading-[1.02] tracking-tight sm:text-[3.5rem] lg:text-[3.875rem] xl:text-[4.875rem]">
            Speak the job on site.
            <br />
            Send the quote today.
          </h1>

          <p className="mt-5 text-lg font-normal leading-snug text-text sm:text-xl">
            Scope, line items and totals.
            <br />
            Without typing it up.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button href="/how-it-works" size="lg">
              See how it works
            </Button>
            <Button href="/pricing" variant="secondary" size="lg">
              Pricing
            </Button>
          </div>

          <p className="mt-5 flex items-center gap-2.5 text-sm text-muted">
            <AppleMark className="h-4 w-4" />
            Coming to iPhone. Two quotes a day, free.
          </p>
        </div>

        {/*
          Interim. The phone preview goes here; this quote card is standing in
          so the hero is not half empty until it lands. Swapping it is one line
          — nothing else in the hero depends on what sits in this column.
        */}
        <div className="w-full max-w-md lg:max-w-none lg:pl-4">
          <QuotePreview />
          <p className="mt-4 text-center text-sm text-muted">
            One spoken sentence, thirty seconds ago.
          </p>
        </div>
      </Container>
    </div>
  );
}
