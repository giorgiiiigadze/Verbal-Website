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
        <Container
          size="wide"
          className="grid items-center gap-16 pb-20 pt-28 sm:pb-28 sm:pt-36 lg:grid-cols-2 lg:gap-12"
        >
          <div>
            <Link
              data-hero-reveal
              href="/how-it-works"
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
                href={APP_STORE_URL ?? "/how-it-works"}
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
            Two filled device frames, nothing behind them. The second sits
            lower than the first so the pair reads as a staggered pair rather
            than a row. The screens are a quote and the client it was made
            for, in that order: the quote first, because it is the thing the
            headline just promised, and the client second, because it is where
            the answer to it ends up.

            One light and one dark on purpose. The app follows the system
            appearance, and showing both says so without a line of copy
            claiming it.

            The standing offset is on the outer div and the entrance is on the
            inner one: both are transforms, and GSAP animating the same element
            would overwrite the Tailwind translate.
          */}
          {/* 280px is the size, not a safety rail: an even split of the wide
              container leaves each frame exactly that at `lg`, and `max-w-xl`
              leaves them the same below it, so the pair is one size everywhere
              above a phone. Narrower viewports fall under it and scale with
              `w-1/2`. Growing the frames means growing all three numbers. */}
          <div className="flex w-full max-w-xl items-start justify-center gap-4 lg:max-w-none">
            <div className="w-1/2 max-w-[280px]">
              <div data-hero-phone>
                <PhoneFrame
                  src="/phone/screen-quote.png"
                  alt="A quote open in Verbal, two of its line items still marked as needing a price."
                  sizes="280px"
                  eager
                />
              </div>
            </div>
            <div className="w-1/2 max-w-[280px] translate-y-6 sm:translate-y-8">
              <div data-hero-phone>
                <PhoneFrame
                  src="/phone/screen-client-detail.png"
                  alt="A client's page in Verbal in dark mode: what they were quoted, what they accepted and what was declined, above the quotes themselves."
                  sizes="280px"
                  eager
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </HeroReveal>
  );
}
