import Link from "next/link";
import { FOOTER, SITE_NAME, SUPPORT_EMAIL, TAGLINE } from "@/content/site";
import { Container } from "./Container";
import { FooterReveal } from "./FooterReveal";
import { Logo } from "@/components/ui/Logo";

/**
 * FooterReveal supplies the `<footer>` element and the curtain behaviour; what
 * the footer looks like stays here. It needs an opaque background — the page
 * scrolls up off this, so anything see-through would show the content sliding
 * behind it.
 *
 * The wordmark at the size of the page used to be its own charcoal band above
 * this, with the store button under it (FinalCta). The band was a ninth section
 * carrying nothing the eight above had not said, so the mark moved down here
 * and the button and the band went. It closes the page rather than adding to
 * it, which is what a footer is already for.
 */
export function SiteFooter() {
  return (
    <FooterReveal className="border-t border-line bg-bg py-10 sm:py-14">
      <Container>
        {/* Two columns from the smallest screen up. Stacked one per row, the
            brand block and three short link lists ran longer than a phone
            viewport, which also put the footer over the height FooterReveal
            needs to pin it as a curtain — so it silently became an ordinary
            block at the end of the page on exactly the devices where the
            scroll matters most. */}
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-accent-text">
              <Logo className="h-6 w-auto" />
              <p className="font-slab text-xl leading-none">{SITE_NAME}</p>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted">{TAGLINE}</p>
          </div>

          {FOOTER.map((group) => (
            <div key={group.heading}>
              {/* Read as a heading over its list, not as the first link in it.
                  Grey at link weight, these sat in the same colour and nearly
                  the same size as the two rows under them; MainText and a
                  semibold face separate the label from what it labels.

                  Sentence case, not the caps this was: the headings are
                  ordinary words — Product, Support, Legal — and small caps at
                  this size read as a system label rather than as the voice the
                  rest of the page is written in. The letterspacing went with
                  them; it was there to keep the caps from setting solid. */}
              <h2 className="font-slab text-xl font-bold capitalize text-text">
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-accent-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Made for people who quote
            for a living.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="break-all transition-colors hover:text-accent-text"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </Container>

      {/*
        Outside the Container on purpose: the point of the mark is the width of
        the page, not of the content column, so it takes the header's gutter and
        nothing else. Sized in `vw` so it tracks the window continuously, and
        capped, because past about 1300px the mark stops being the page's width
        and starts being a wall — and because the footer only works as a curtain
        while it fits in the viewport (see FooterReveal), which an uncapped 15vw
        breaks on a short laptop window.

        `aria-hidden`, unlike the version in the old band: the brand block above
        already names the site, and a screen reader has no use for it twice.
      */}
      <div
        aria-hidden="true"
        className="mt-12 flex select-none items-end justify-center gap-[0.02em] px-6 text-[min(18vw,14rem)] text-accent-text sm:mt-16 sm:px-10"
      >
        <Logo className="h-[0.6em] w-auto" />
        {/* `slice(1)` rather than a literal, so the two halves cannot drift
            apart if the name is ever edited in content/site.ts — the mark is a
            brushstroke V doing the word's first letter. */}
        <span className="font-slab leading-[0.78] tracking-tight">
          {SITE_NAME.slice(1)}
        </span>
      </div>
    </FooterReveal>
  );
}
