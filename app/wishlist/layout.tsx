import type { Metadata } from "next";
import { WISHLIST_TITLE, WISHLIST_DESCRIPTION } from "@/content/wishlist";

/**
 * The wishlist is a working page rather than a marketing one: it says what is
 * not built yet, it changes without a deploy, and it is reached from a link
 * that was sent to someone. `noindex` keeps a half-finished roadmap out of
 * search results next to the pages that sell the app, the same reasoning as
 * `/q`. Drop the `robots` block and add the route to `app/sitemap.ts` on the
 * day it should be public.
 */
export const metadata: Metadata = {
  title: WISHLIST_TITLE,
  description: WISHLIST_DESCRIPTION,
  robots: { index: false, follow: false },
};

export default function WishlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
