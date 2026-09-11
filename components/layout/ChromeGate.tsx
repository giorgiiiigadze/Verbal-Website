"use client";

import { usePathname } from "next/navigation";

/**
 * The routes that render without the marketing chrome, each for its own
 * reason:
 *
 *  - `/q` is a standalone receipt sent to a tradesperson's client. The site
 *    nav and download CTA have no place on it.
 *  - `/wishlist` is a working page about what the app does not do yet. It is
 *    reached from a link rather than from the nav, and wrapping it in the
 *    chrome that sells the app reads as a feature list rather than as a list
 *    of things that are missing.
 *
 * Matched on segment boundaries, so a future `/quotes` or `/wishlists` page
 * keeps its header instead of silently losing it to a prefix match.
 */
const BARE_ROUTES = ["/q", "/wishlist"];

function isBare(pathname: string | null) {
  if (!pathname) return false;
  return BARE_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

/**
 * Hides the marketing chrome (header, footer, skip link) on those routes.
 *
 * The header and footer stay server components: they are passed in as
 * already-rendered children and this only decides whether to commit them.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isBare(pathname)) return null;
  return <>{children}</>;
}
