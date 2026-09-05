import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

/**
 * The six public pages, and only those. `/q` is left out deliberately: a shared
 * quote is `noindex` and is reached from a link the tradesperson sent, not from
 * search. So are the API routes, which are not pages.
 *
 * The home entry comes out as `https://theverbal.app/` and its canonical tag as
 * `https://theverbal.app`. Next normalises each through `new URL()`, which adds
 * the root slash in one place and drops it in the other; the two are the same
 * URL by RFC 3986 and every crawler treats them as one, so this is left alone
 * rather than fought with.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/pricing", priority: 0.9 },
    { path: "/faq", priority: 0.7 },
    { path: "/support", priority: 0.5 },
    { path: "/privacy", priority: 0.4 },
    { path: "/terms", priority: 0.4 },
  ];

  const lastModified = new Date();

  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
