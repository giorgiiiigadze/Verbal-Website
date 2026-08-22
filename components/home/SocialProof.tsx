import { Star } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SocialProofReveal } from "@/components/home/SocialProofReveal";
import { FEATURED_TESTIMONIAL } from "@/content/testimonials";
import { TRADES } from "@/content/trades";

/**
 * The band the page lands on when the hero scrolls away: a strip that runs
 * sideways under a single line of framing, then one large quote card.
 *
 * The shape is the familiar one — the endlessly scrolling row of client logos
 * above a testimonial — with the one part we cannot honestly fill swapped out.
 * There are no customer logos to show and no user count to claim, so the strip
 * carries the priced jobs from `content/trades.ts` instead: it is the same
 * "look how much of this is already handled" beat, and every word of it is
 * true. The card underneath is the only place a person is quoted, and it is
 * driven by `FEATURED_TESTIMONIAL`, which is a placeholder until launch.
 */

/**
 * One job from each trade, then the next from each, and so on. Grouped by trade
 * the strip reads as a list of electrical work followed by a list of plumbing;
 * interleaved it reads as the breadth of what the app prices, which is the
 * point. Ends up ~45 items, which is more than a screen wide at any size.
 */
function marqueeItems() {
  const depth = Math.max(...TRADES.map((trade) => trade.jobs.length));
  const items: string[] = [];

  for (let i = 0; i < depth; i++) {
    for (const trade of TRADES) {
      const job = trade.jobs[i];
      if (job) items.push(job.name);
    }
  }

  return items;
}

/** The row that gets printed twice inside the track — see the note below. */
function MarqueeRow({ items }: { items: string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span
          key={item}
          className="whitespace-nowrap pr-10 text-lg text-muted sm:pr-14 sm:text-xl"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function SocialProof() {
  const items = marqueeItems();

  return (
    <SocialProofReveal>
      <section className="overflow-clip bg-bg pb-10 pt-20 sm:pb-14 sm:pt-28">
        <Container>
          <p
            data-proof-reveal
            className="text-center text-[16px] font-semibold capitalize text-[#3E60D8]"
          >
            The work it already knows how to price
          </p>
        </Container>

        {/*
          Full-bleed on purpose: the strip runs off both edges of the window, not
          off the edges of the page gutter, so it reads as continuous rather than
          as a box with things moving inside it. The mask fades the ends out so
          nothing is seen popping into existence.

          The track holds the same row twice and slides exactly half its own
          width, which puts the second copy where the first started — that is
          what makes the loop seamless. Both copies must therefore be identical,
          including the trailing gap, which is why the spacing is `pr-*` on each
          item rather than a `gap` on the row.
        */}
        <div
          data-proof-reveal
          data-proof-strip
          className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)]"
        >
          <div
            data-proof-marquee
            className="flex w-max animate-marquee will-change-transform"
          >
            <MarqueeRow items={items} />
            {/* The duplicate is scenery, not content: it must not be read out
                twice, and it is not in the tab or find-in-page order. */}
            <div aria-hidden="true" className="flex">
              <MarqueeRow items={items} />
            </div>
          </div>
        </div>

        {FEATURED_TESTIMONIAL ? (
          <Container>
            <figure
              data-proof-reveal
              className="mx-auto mt-14 max-w-5xl rounded-[28px] bg-[#FAFAFA] px-6 py-16 text-center sm:mt-20 sm:px-16 sm:py-24"
            >
              <Stars rating={FEATURED_TESTIMONIAL.rating} />

              <blockquote className="mx-auto mt-8 max-w-3xl font-sans text-2xl font-medium leading-tight tracking-tight text-black sm:text-4xl sm:leading-tight">
                &ldquo;{FEATURED_TESTIMONIAL.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-8 text-muted">
                {FEATURED_TESTIMONIAL.name}, {FEATURED_TESTIMONIAL.role}
              </figcaption>
            </figure>
          </Container>
        ) : null}
      </section>
    </SocialProofReveal>
  );
}

/** Filled stars only, one per point. An empty star is a mark against the
 *  product; five out of five simply draws five.
 *
 *  Lucide's star is drawn as a stroked outline, so it is filled with
 *  `currentColor` here and the stroke left on — without it the points thin out
 *  and the shape loses its edge at 20px. */
function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex justify-center gap-1.5 text-warning"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: rating }, (_, i) => (
        <Star key={i} aria-hidden="true" className="h-5 w-5 fill-current" />
      ))}
    </div>
  );
}
