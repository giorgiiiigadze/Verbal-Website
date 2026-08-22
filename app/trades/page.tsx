import { OTHER_TRADE, TRADES } from "@/content/trades";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Card } from "@/components/ui/Card";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Trades",
  description:
    "Electricians, plumbers, carpenters, tilers, painters, plasterers, " +
    "builders, roofers, landscapers, and whatever else you do.",
  path: "/trades",
});

export default function TradesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Your trade"
        title="It knows what your trade sells before you tell it"
        lead="Setting up asks what you charge for the jobs your trade does most, and seeds your rate card from the answers. After that, speaking one of them prices it."
      />

      <Section tone="bg">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRADES.map((trade) => (
            <Card key={trade.name} className="flex flex-col">
              <h2 className="text-xl">{trade.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {trade.blurb}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm">
                {trade.jobs.map((job) => (
                  <li key={job.name} className="flex justify-between gap-4">
                    <span>{job.name}</span>
                    <span className="shrink-0 text-muted">per {job.unit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-muted">
          These are the jobs the app offers to price during setup, named the way
          a British trade names them. You can add, rename or re-price anything
          on your rate card afterwards, and a job you have never priced comes
          back flagged rather than guessed.
        </p>
      </Section>

      <Section tone="surface">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl">{OTHER_TRADE.name}?</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {OTHER_TRADE.blurb}
          </p>

          <ul className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
            {OTHER_TRADE.jobs.map((job) => (
              <li
                key={job.name}
                className="rounded-[var(--radius-chip)] border border-line bg-card px-4 py-2.5 text-sm"
              >
                {job.name}{" "}
                <span className="text-muted">per {job.unit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex justify-center">
            <AppStoreBadge />
          </div>
        </div>
      </Section>
    </>
  );
}
