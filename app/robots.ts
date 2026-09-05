import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * Everything public is crawlable. `/api/` is disallowed although nothing is
 * served under it today: the rule costs a line, and the failure it prevents is
 * a JSON endpoint added later being crawled before anyone thinks to say it
 * should not be.
 *
 * `/q` is deliberately *not* disallowed. A shared quote must stay out of the
 * index, and it does that with `noindex` in `app/q/layout.tsx` — which only
 * works if a crawler is allowed to fetch the page and read it. Blocking the
 * path here would hide that instruction and leave Google free to list a bare
 * URL it had found linked somewhere, which is the opposite of the intent.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
