import Link from "next/link";
import { APP_STORE_URL, NAV, SITE_NAME } from "@/content/site";
import { HeaderChrome } from "@/components/layout/HeaderChrome";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

/**
 * A pill that floats over the page rather than a bar that sits above it.
 *
 * The header is `fixed`, so it takes no space in the flow and the section
 * beneath it runs to the top of the viewport and shows through the gap around
 * the pill. Every page's first block therefore carries extra top padding to
 * clear it — see Hero, PageHeader and Prose.
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
 * No hamburger: the wordmark drops below `sm` and the four links tighten up,
 * which fits them on a 375px phone in one row. A menu button would mean more
 * JavaScript than this header earns.
 *
 * The pill's hairline and shadow are not on the pill — HeaderChrome carries
 * them on an overlay so they can fade in on scroll. That overlay is the only
 * client component here; everything below renders on the server.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-6 pt-3 sm:px-10 sm:pt-5">
      {/* Three columns rather than `justify-between`, so the nav is centred on
          the pill itself and not merely in the space left over between the
          wordmark and the CTA. The outer columns are `1fr` each; the nav is
          `auto` and lands dead centre whatever they hold. */}
      <div className="relative mx-auto grid max-w-[75rem] grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full bg-card/85 px-3 py-2.5 backdrop-blur-md sm:gap-6 sm:px-5 sm:py-3">
        <HeaderChrome />

        <Link
          href="/"
          className="flex shrink-0 items-center gap-1 justify-self-start text-accent-text"
        >
          <Logo className="h-4 w-auto sm:h-5" />
          <span className="hidden font-slab text-xl leading-none tracking-tight sm:inline">
            {SITE_NAME}
          </span>
        </Link>

        <nav aria-label="Main" className="justify-self-center">
          <ul className="flex items-center gap-x-4 text-[13px] sm:gap-x-7 sm:text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Below `lg` the wordmark, four links and a CTA do not fit one row,
            and this header has no hamburger to fall back on — so the CTA is
            dropped rather than crowded. The hero carries the same one a screen
            further down. Hidden on the wrapper, not the button: `hidden` and
            the button's own `inline-flex` are both display utilities, and `cn`
            is a plain join with no rule about which wins. */}
        <div className="hidden justify-self-end lg:block">
          <Button
            href={APP_STORE_URL ?? "/how-it-works"}
            size="xs"
            shape="rect"
          >
            <AppleMark className="h-4 w-4" />
            Download on iPhone
          </Button>
        </div>
      </div>
    </header>
  );
}
