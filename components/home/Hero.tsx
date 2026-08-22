import Image from "next/image";
import Link from "next/link";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { HeroReveal } from "@/components/home/HeroReveal";
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
export function Hero() {
  return (
    <HeroReveal>
      <div className="border-b border-line bg-hero">
        <Container
          size="wide"
          className="grid items-center gap-16 pb-20 pt-28 sm:pb-28 sm:pt-36 lg:grid-cols-[1.1fr_1fr] lg:gap-12"
        >
          <div>
            <Link
              data-hero-reveal
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

            {/* The two lines are block spans rather than a <br> so each can
                carry its own beat in the entrance. Wrapping is unchanged. */}
            <h1 className="mt-6 font-slab text-[clamp(1.875rem,11vw,2.625rem)] leading-[1.02] tracking-tight sm:text-[3.5rem] lg:text-[3.875rem] xl:text-[4.875rem]">
              <span data-hero-reveal className="block">
                Speak the job on site.
              </span>
              <span data-hero-reveal className="block">
                Send the quote today.
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
                shape="rect"
              >
                <AppleMark className="h-4 w-4" />
                Start recording on your own
              </Button>
              <Button
                href="/pricing"
                variant="secondary"
                size="md"
                shape="rect"
              >
                Pricing
              </Button>
            </div>

            <p
              data-hero-reveal
              className="mt-5 flex items-center gap-2.5 text-sm text-muted"
            >
              <AppleMark className="h-4 w-4" />
              Coming to iPhone. Two quotes a day, free.
            </p>
          </div>

          {/*
            Two bare device frames, no screen content and nothing behind them.
            The second sits lower than the first so the pair reads as a
            staggered pair rather than a row. Screens go inside the frames
            later; until then the empty glass is the point.

            The standing offset is on the outer div and the entrance is on the
            inner one: both are transforms, and GSAP animating the same element
            would overwrite the Tailwind translate.
          */}
          {/* 248px is the size, not a safety rail: the column would otherwise
              give each frame 266px, and it is also exactly what `max-w-lg`
              leaves them below `lg`, so the pair is one size everywhere above a
              phone. Narrower viewports fall under it and scale with `w-1/2`. */}
          <div className="flex w-full max-w-lg items-start justify-center gap-4 lg:max-w-none">
            <div className="w-1/2 max-w-[248px]">
              <div data-hero-phone>
                <Image
                  src="/iphone-16-pro-max.png"
                  alt=""
                  width={489}
                  height={1000}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
            <div className="w-1/2 max-w-[248px] translate-y-10 sm:translate-y-14">
              <div data-hero-phone>
                <Image
                  src="/iphone-16-pro-max.png"
                  alt=""
                  width={489}
                  height={1000}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </HeroReveal>
  );
}
