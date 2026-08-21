import type { Metadata } from "next";
import { DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

/**
 * Per-page metadata. Everything canonical hangs off SITE_URL so the site can be
 * moved to its real domain by setting one env var.
 */
export function pageMetadata({
  title,
  description = DESCRIPTION,
  path = "/",
}: {
  title: string;
  description?: string;
  path?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
    },
  };
}
