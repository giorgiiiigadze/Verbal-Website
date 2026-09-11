import Image from "next/image";
import Link from "next/link";
import { AppleMark } from "@/components/ui/AppleMark";
import { CheckMark } from "@/components/ui/CheckMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { HeroReveal } from "@/components/home/HeroReveal";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { APP_CTA } from "@/content/site";

/**
 * Laid out after Granola's hero: announcement pill, an oversized headline, a
 * two-line subhead that adds rather than restates, one prominent CTA, and a
 * small availability line underneath.
 *
 * `data-hero-reveal` and `data-hero-phone` mark what HeroReveal animates on
 * load, in the order they appear here. They are hooks for the timeline and
 * nothing else — the layout holds if the attributes are removed.
 */
const REASSURANCES = [
  "Two quotes a day, free",
  "Your voice never leaves the phone",
];

export function Hero() {
  return (
    <HeroReveal>
      <div className="bg-hero">
        {/* The bottom padding is much shorter than the top on purpose. The
            hero and the block below it are both on white with no edge between
            them, so their two paddings used to stack into about 190px of empty
            page — the hero's own pb-28 plus the section's py-20. Trimmed here
            rather than on the section, which is padded like every other
            section on the site and should stay that way.

            It does not go lower than this: the phone and the sheet beside it
            rest on the same bottom line, and the padding is what keeps that
            line off the headline of the block underneath. */}
        <Container
          size="wide"
          className="grid items-center gap-16 pb-6 pt-28 sm:pb-10 sm:pt-36 lg:grid-cols-[1fr_1.2fr] lg:gap-12"
        >
          <div>
            <Link
              data-hero-reveal
              href="/#how"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#F7F7F2] py-1.5 pl-1.5 pr-4 text-sm transition-colors hover:bg-[#ECECE4]"
            >
              <span className="rounded-full bg-[#0098F2] px-2.5 py-1 text-xs font-semibold text-white">
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

            {/* The two lines are block spans rather than a <br> so each can
                carry its own beat in the entrance. Wrapping is unchanged. */}
            <h1 className="mt-6 font-slab text-[clamp(1.875rem,11vw,2.625rem)] leading-[1.02] tracking-tight sm:text-[3.5rem] lg:text-[3.875rem] xl:text-[4.875rem]">
              <span data-hero-reveal className="block">
                Speak the job <br />on site. <br />
                Send the <br />quote today.
              </span>
            </h1>

            <p
              data-hero-reveal
              className="mt-5 text-sm font-normal leading-snug text-text sm:text-xl"
            >
              Scope, line items and totals.
              <br />
              Without typing it up.
            </p>

            <div
              data-hero-reveal
              className="mt-7 flex flex-wrap items-center gap-4"
            >
              {/* Points at the store the moment there is one; until then at
                  the release wishlist, which is the honest answer while the
                  app is unreleased. Label and target both come from APP_CTA,
                  so the two can never disagree. */}
              <Button href={APP_CTA.href} size="md">
                <AppleMark className="h-4 w-4" />
                {APP_CTA.label}
              </Button>
              <Button
                href="/pricing"
                variant="secondary"
                size="md"
              >
                Pricing
              </Button>
            </div>

            {/* Things that are true rather than selling points: each one
                traces to content/features.ts and to the pricing page, and
                answers an objection a tradesperson actually has at this point
                on the page — what it costs, and where the recording goes. */}
            <ul
              data-hero-reveal
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2.5 text-sm text-[#0098F2]"
            >
              {REASSURANCES.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckMark />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/*
            The app on the left and what it sends on the right: the phone with
            the quote open, and beside it the A4 page the client actually
            receives. They sit on the same bottom line with a small gap, so the
            pair reads as one object without either one covering the other.

            The sheet is a render of the first page of the example quote PDF,
            filling an A4 box that keeps the page's proportions at every width.

            The entrance is on an inner div in each half rather than on the
            halves themselves: GSAP animates transforms there, and the layout's
            own offsets live on the outer element where they cannot be
            overwritten.
          */}
          {/* The pair is sized in percentages of the column, and each set of
              three lands on exactly 100 so the pair fills the column exactly:
              40 + 4 + 56 stacked, 37 + 4 + 59 from `lg` up. Between them the
              phone and the sheet keep their proportions and the gap between
              them from a 360px phone up to the wide container. Resizing one
              means re-balancing its set of three.

              Two sets rather than one because the column only gets wider at
              `lg`: below that the pair still shares a single stacked column, so
              taking the sheet to 59 there would come straight off the phone
              again. Stacked keeps the original split — the sheet is thumbnail
              sized on a phone either way, so the width is better spent on the
              app.

              The phone used to sit 6% over the sheet, which read fine while the
              sheet was an empty placeholder. Now that it carries the quote, an
              overlap covered the page's left edge, so the two are parted
              instead.

              The sheet is the wider of the two on purpose: it is the thing the
              client receives, and it is the half a reader has to be able to
              read. Since the gap is fixed and the three sum to 100, growing the
              sheet inside a 50/50 grid could only come off the phone — which is
              why the row above it is 1fr/1.2fr rather than `grid-cols-2`. The
              extra column width is what buys the sheet its size without the
              phone paying for it: at the full 1280 container the right column
              is 628px rather than 576, so the phone is 232px (a shade wider
              than the 230 it had at 40% of the old column) and the sheet is
              371px, up from 323.

              What that costs is the headline column, down to 524px. It fits:
              the h1's line breaks are hard-coded <br>s rather than wrapping, and
              its longest line sets at 463px in the xl size. Growing the ratio
              past about 1.2 is what would start breaking those lines. */}
          <div className="flex w-full max-w-xl items-end justify-center lg:max-w-none">
            {/* The left frame is the travel anchor, not part of the hero's own
                phone entrance: PhoneTravel lifts a fixed copy of it down into
                the section below on scroll, so this one has to hold a still
                resting position for that copy to start from. It carries no
                `data-hero-phone`, and on desktop PhoneTravel hides it and lets
                the travelling copy stand in; on mobile, reduced-motion, or with
                no script it simply shows as itself.

                Nothing stacks here any more: with the sheet parted from it
                there is no overlap for a z-index to order. */}
            <div className="relative w-[43%] lg:w-[42%]">
              <div data-travel-anchor="hero">
                <PhoneFrame
                  src="/phone/screen-quote.png"
                  alt="A quote open in Verbal, two of its line items still marked as needing a price."
                  sizes="(min-width: 1024px) 270px, 43vw"
                  eager
                />
              </div>
            </div>
            {/* Set off from the phone by the gap above, and bottom-aligned
                with it by the row's `items-end`, so the two objects still rest
                on one line rather than floating apart. */}
            <div className="ml-[3%] w-[55%] lg:w-[55%]">
              <div data-hero-phone>
                {/* A4 is 210x297mm, so the box holds that ratio and takes its
                    height from whatever width the column gives it — the same
                    page shape at every breakpoint.

                    The page image is a render of the first page of the example
                    quote PDF kept beside it in public/images, at 1240x1754 —
                    exactly this ratio, so `object-cover` has nothing to crop.
                    Re-render it with:

                      sips -s format png --resampleWidth 1240 \
                        "public/images/Quote 0072 — James Bond.pdf" \
                        --out public/images/quote-example.png

                    There is no inner padding: the render carries the page's own
                    white margin, so the border and shadow here are the paper
                    edge and the image is the paper. Padding on top of that
                    would mat the sheet and break the A4 ratio. */}
                <div className="relative aspect-[210/297] w-full overflow-hidden rounded-md border border-line bg-card shadow-[0_24px_50px_-28px_rgb(0_0_0/0.4)]">
                  {/* Above the fold, and on desktop the largest thing painted
                      in the hero, so it is fetched like the phone beside it
                      rather than lazily. `fill` + `sizes` keeps Next from
                      shipping the full 1240px into a box a third that wide. */}
                  <Image
                    src="/images/quote-example.png"
                    alt="The quote as the client receives it: an A4 page with the job summary, the scope of work, priced line items and a total of $4,000."
                    fill
                    loading="eager"
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 360px, 55vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </HeroReveal>
  );
}
