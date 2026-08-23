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
              <h2 className="font-slab text-sm uppercase tracking-[0.12em] text-muted">
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
    </FooterReveal>
  );
}
