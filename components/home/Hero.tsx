import Link from "next/link";
import { AppleMark } from "@/components/ui/AppleMark";
import { CheckMark } from "@/components/ui/CheckMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { HeroReveal } from "@/components/home/HeroReveal";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { APP_STORE_URL } from "@/content/site";

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
          className="grid items-center gap-16 pb-6 pt-28 sm:pb-10 sm:pt-36 lg:grid-cols-2 lg:gap-12"
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
              {/* Points at the store the moment there is one; until then it
                  goes where the recording is actually explained, so the CTA is
                  never a dead end. Same rule as AppStoreBadge. */}
              <Button
                href={APP_STORE_URL ?? "/#how"}
                size="md"
              >
                <AppleMark className="h-4 w-4" />
                Start recording on your own
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
            receives. They overlap and share a bottom edge so the pair reads as
            one object rather than two things placed side by side.

            The sheet is a placeholder. A rendered page of an example quote PDF
            goes in it later — an <Image> filling the box, with the aspect ratio
            and the paper edge below staying exactly as they are.

            The entrance is on an inner div in each half rather than on the
            halves themselves: GSAP animates transforms there, and the layout's
            own offsets live on the outer element where they cannot be
            overwritten.
          */}
          {/* The pair is sized in percentages of the column and overlapped by
              one, so 46 + 60 - 6 lands on exactly 100 at every width: the phone
              and the sheet keep their proportions and their contact point from
              a 360px phone up to the wide container, with nothing to retune per
              breakpoint. Resizing one means re-balancing all three numbers. */}
          <div className="flex w-full max-w-xl items-end justify-center lg:max-w-none">
            {/* The left frame is the travel anchor, not part of the hero's own
                phone entrance: PhoneTravel lifts a fixed copy of it down into
                the section below on scroll, so this one has to hold a still
                resting position for that copy to start from. It carries no
                `data-hero-phone`, and on desktop PhoneTravel hides it and lets
                the travelling copy stand in; on mobile, reduced-motion, or with
                no script it simply shows as itself.

                It is the front of the pair — `z-10` is what makes the sheet
                tuck behind it rather than the other way round, which would put
                a blank placeholder over the app screen. */}
            <div className="relative z-10 w-[46%]">
              <div data-travel-anchor="hero">
                <PhoneFrame
                  src="/phone/screen-quote.png"
                  alt="A quote open in Verbal, two of its line items still marked as needing a price."
                  sizes="(min-width: 1024px) 280px, 46vw"
                  eager
                />
              </div>
            </div>
            {/* Slid left under the phone's edge, and bottom-aligned with it by
                the row's `items-end`, so the two objects rest on one line and
                touch rather than floating apart. */}
            <div className="-ml-[6%] w-[60%]">
              <div data-hero-phone>
                {/* A4 is 210x297mm, so the box holds that ratio and takes its
                    height from whatever width the column gives it — the same
                    page shape at every breakpoint. */}
                <div className="flex aspect-[210/297] w-full items-center justify-center rounded-md border border-line bg-card p-3 shadow-[0_24px_50px_-28px_rgb(0_0_0/0.4)]">
                  <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-line text-sm text-muted">
                    Quote PDF (A4)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </HeroReveal>
  );
}
