import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { QuotePreview } from "@/components/ui/QuotePreview";

export function Hero() {
  return (
    <div className="border-b border-line bg-tint">
      <Container className="grid items-center gap-14 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-accent-text">
            For tradespeople
          </p>

          <h1 className="font-slab text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
            Speak the job.
            <br />
            Send the quote.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            Describe the work out loud, the way you would to the customer
            standing in front of you. Verbal turns it into a written, priced
            quote you can send before you leave the drive.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <AppStoreBadge />
            <Button href="/how-it-works" variant="secondary">
              See how it works
            </Button>
          </div>

          <p className="mt-5 text-sm text-muted">
            Two quotes a day, free. Your voice never leaves your phone.
          </p>
        </div>

        <div className="lg:pl-6">
          <QuotePreview />
          <p className="mt-4 text-center text-sm text-muted">
            One spoken sentence, thirty seconds ago.
          </p>
        </div>
      </Container>
    </div>
  );
}
