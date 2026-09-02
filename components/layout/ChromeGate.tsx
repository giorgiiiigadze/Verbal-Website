"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the marketing chrome (header, footer, skip link) on the shared quote
 * pages under `/q`. Those pages are a standalone receipt sent to a
 * tradesperson's client — the site nav and download CTA have no place there.
 *
 * The header and footer stay server components: they are passed in as
 * already-rendered children and this only decides whether to commit them.
 */
export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/q")) return null;
  return <>{children}</>;
}
