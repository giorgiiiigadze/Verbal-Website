import type { Metadata } from "next";

/**
 * A shared quote lives behind the token in the address bar and is meant only
 * for the person it was sent to. It must never be indexed or followed, and
 * search engines should not describe it — mirrors the original renderer's
 * `noindex, nofollow` meta.
 */
export const metadata: Metadata = {
  title: "Quote",
  robots: { index: false, follow: false },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
