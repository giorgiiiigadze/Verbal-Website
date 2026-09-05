import type { Metadata } from "next";
import { DESCRIPTION, SITE_NAME, SITE_URL, TAGLINE } from "@/content/site";

/**
 * The social card every page shares.
 *
 * The URL is the route `app/opengraph-image.tsx` generates, written relative so
 * `metadataBase` in the root layout resolves it against whatever origin the
 * site is being served from. Next appends a cache-busting query to the tag it
 * writes for the file convention itself; the bare path serves the same PNG, so
 * a page naming it here and a page inheriting the file convention end up
 * pointing at one image.
 *
 * It has to be named at all because a page that declares `openGraph` replaces
 * the parent's object rather than merging into it — which is how every page
 * using `pageMetadata` came to ship no `og:image` at all while the home page,
 * which declares nothing, got one for free.
 */
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — ${TAGLINE}`,
};

/**
 * Per-page metadata. Everything canonical hangs off SITE_URL so the site can be
 * moved to its real domain by setting one env var.
 *
 * `absoluteTitle` is for the home page, and only the home page. Every other
 * title is a page name that the root layout's `%s · Verbal` template finishes;
 * the home page's is a whole title already, and running it through the template
 * would set "Verbal … · Verbal" in the tab and in the search result.
 */
export function pageMetadata({
  title,
  description = DESCRIPTION,
  path = "/",
  absoluteTitle = false,
}: {
  title: string;
  description?: string;
  path?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  // Social cards carry no template, so the site name is appended by hand — an
  // absolute title already ends in it and must not be given a second one.
  const socialTitle = absoluteTitle ? title : `${title} · ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
