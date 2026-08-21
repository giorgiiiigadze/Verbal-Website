import Link from "next/link";
import { TRADES } from "@/content/trades";
import { Section, SectionHeading } from "@/components/layout/Section";

export function TradeStrip() {
  return (
    <Section tone="surface">
      <SectionHeading
        eyebrow="Your trade"
        title="It already knows what you charge for"
        lead="Set up asks what you charge for the jobs your trade does most, so your first quote is half-written before you have made it."
      />

      <ul className="mt-12 flex flex-wrap gap-3">
        {TRADES.map((trade) => (
          <li key={trade.name}>
            <span className="inline-flex rounded-[var(--radius-chip)] border border-line bg-card px-4 py-2.5 text-sm font-medium">
              {trade.name}
            </span>
          </li>
        ))}
        <li>
          <Link
            href="/trades"
            className="inline-flex rounded-[var(--radius-chip)] border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Something else →
          </Link>
        </li>
      </ul>
    </Section>
  );
}
