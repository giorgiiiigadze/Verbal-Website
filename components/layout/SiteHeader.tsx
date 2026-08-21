import Link from "next/link";
import { NAV, SITE_NAME } from "@/content/site";
import { Container } from "./Container";

/**
 * No hamburger and no client component: four links fit on a phone if they are
 * allowed to sit under the wordmark instead of beside it. A menu button would
 * mean shipping JavaScript for a site that otherwise needs none.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <Container className="flex flex-col items-center gap-3 py-3 sm:flex-row sm:justify-between sm:gap-6 sm:py-4">
        <Link
          href="/"
          className="font-slab text-xl tracking-tight text-accent-text"
        >
          {SITE_NAME}
        </Link>

        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
