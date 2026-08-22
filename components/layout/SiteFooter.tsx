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
    <FooterReveal className="border-t border-line bg-bg-alt py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
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

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. Made for people who quote
            for a living.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="transition-colors hover:text-accent-text"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </Container>
    </FooterReveal>
  );
}
