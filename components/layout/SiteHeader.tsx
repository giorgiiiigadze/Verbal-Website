import Link from "next/link";
import { APP_STORE_URL, NAV, SITE_NAME } from "@/content/site";
import { FeaturesMenu } from "@/components/layout/FeaturesMenu";
import { HeaderChrome } from "@/components/layout/HeaderChrome";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

/**
 * A pill that floats over the page from `lg` up, and an ordinary bar below it.
 *
 * The pill wants room around it to read as floating, and a phone has none: at
 * 375px the inset eats a tenth of the screen and the thing still spans nearly
 * edge to edge, which looks like a bar that missed. So below `lg` it becomes
 * one — full width, square, white, with a hairline along the bottom.
 *
 * The header is `fixed` either way, so it takes no space in the flow and the
 * section beneath it runs to the top of the viewport. Every page's first block
 * therefore carries extra top padding to clear it — see Hero, PageHeader and
 * Prose.
 *
 * Its outer edges line up with the hero content column. Two things have to
 * hold at once:
 *
 *   1. header inset === Container's GUTTER, so below the max width the pill
 *      outer edge tracks the hero column edge; and
 *   2. the pill's max width === Container's max width minus twice the GUTTER
 *      (i.e. Container's content width), so above it the pill and hero centre
 *      to the same left/right edge.
 *
 * Hence 24 below sm, 40 at sm and up, and 1280−80=1200 (75rem). Change GUTTER
 * and both numbers move together.
 *
 * Two layouts, one pill. From `lg` it is three columns: wordmark, centred
 * nav, CTA. Below that the links do not fit beside a CTA on a 375px phone, so
 * they come out of the pill entirely and into MobileMenu's sheet, leaving the
 * mark on the left and the CTA and burger on the right. The Features dropdown
 * goes with them — it opens on hover, which a phone does not have — which is
 * also why "How it works" is no longer a link of its own up here: at `lg` the
 * Features menu takes the fourth slot and carries it.
 *
 * The pill's hairline and shadow are not on the pill — HeaderChrome carries
 * them on an overlay so they can fade in on scroll. That overlay is the only
 * client component here; everything below renders on the server.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 lg:px-10 lg:pt-5">
      {/* Three columns rather than `justify-between`, so the nav is centred on
          the pill itself and not merely in the space left over between the
          wordmark and the CTA. The outer columns are `1fr` each; the nav is
          `auto` and lands dead centre whatever they hold. Below `lg` the nav is
          `display: none`, so it occupies no cell and the two-column template
          puts the CTA cluster straight after the mark. */}
      <div className="relative mx-auto grid max-w-[75rem] grid-cols-[1fr_auto] items-center gap-3 border-b border-line bg-bg px-6 py-3 sm:gap-6 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:rounded-full lg:border-0 lg:bg-card/85 lg:px-5 lg:backdrop-blur-md">
        <HeaderChrome />

        <Link
          href="/"
          className="flex shrink-0 items-center gap-1 justify-self-start text-accent-text"
        >
          <Logo className="h-4 w-auto sm:h-5" />
          {/* The name stays at every width. It used to drop below `sm` to make
              room for four nav links; those live in the burger sheet now, so
              the mark and the name travel together the way they do in the
              footer and the final CTA. */}
          <span className="font-slab text-lg leading-none tracking-tight sm:text-xl">
            {SITE_NAME}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-x-4 text-[13px] sm:gap-x-7 sm:text-sm">
            <FeaturesMenu />
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* The CTA stays at every width now that the links have somewhere
            else to go. Its label shortens rather than the button vanishing:
            "Download on iPhone" beside a burger overruns a 375px phone, and a
            pill holding only an Apple mark reads as an icon button rather than
            a call to action. */}
        <div className="flex items-center gap-1.5 justify-self-end sm:gap-2">
          <Button href={APP_STORE_URL ?? "/how-it-works"} size="xs">
            <AppleMark className="h-4 w-4" />
            <span className="hidden sm:inline">Download on iPhone</span>
            <span className="sm:hidden">Get it</span>
          </Button>

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
