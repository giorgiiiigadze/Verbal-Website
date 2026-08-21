import Link from "next/link";
import { NAV, SITE_NAME } from "@/content/site";
import { Logo } from "@/components/ui/Logo";

/**
 * A pill that floats over the page rather than a bar that sits above it.
 *
 * The header is `fixed`, so it takes no space in the flow and the section
 * beneath it runs to the top of the viewport and shows through the gap around
 * the pill. Every page's first block therefore carries extra top padding to
 * clear it — see Hero, PageHeader and Prose.
 *
 * Its contents line up with the page gutter, which takes some arranging. The
 * pill floats inside its own inset, so two things have to hold at once:
 *
 *   1. header inset + pill padding === Container's GUTTER, so below the max
 *      width the logo sits on the same line as the hero text; and
 *   2. the pill's max width === Container's max width minus twice the pill
 *      padding, so above it the two boxes centre to the same left edge.
 *
 * Hence 12+12=24 below sm, 20+20=40 at sm and up, and 1280-40=1240 (77.5rem).
 * Change GUTTER and all three numbers move together.
 *
 * No hamburger and no client component: the wordmark drops below `sm` and the
 * four links tighten up, which fits them on a 375px phone in one row. A menu
 * button would mean shipping JavaScript for a site that otherwise needs none.
 */
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="mx-auto flex max-w-[77.5rem] items-center justify-between gap-3 rounded-full bg-card/85 ring-1 ring-line px-3 py-2.5 shadow-[0_6px_24px_-8px_rgb(0_0_0/0.18)] backdrop-blur-md sm:gap-6 sm:px-5 sm:py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-accent-text"
        >
          <Logo className="h-6 w-auto sm:h-7" />
          <span className="hidden font-slab text-xl leading-none tracking-tight sm:inline">
            {SITE_NAME}
          </span>
        </Link>

        <nav aria-label="Main">
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
      </div>
    </header>
  );
}
