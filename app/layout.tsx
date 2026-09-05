import type { Metadata, Viewport } from "next";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ChromeGate } from "@/components/layout/ChromeGate";
import { JsonLd } from "@/components/seo/JsonLd";
import { graph, organizationLd, websiteLd } from "@/lib/jsonLd";
import { DESCRIPTION, SITE_NAME, SITE_URL, TAGLINE } from "@/content/site";

/** The app's only font. Self-hosted at build time by next/font, so the page
 *  makes no request to Google — see the note on tracking in the privacy page. */
const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
  },
};

/** The site is light-only. Declaring it here puts `color-scheme: light` in the
 *  head, so a visitor whose OS is in dark mode does not get a dark canvas
 *  flashed at them in the moment before the stylesheet lands. */
export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${robotoSlab.variable} h-full antialiased`}>
      {/* Not a flex column any more: the footer is pinned behind `main` rather
          than pushed below it, and `main` guarantees its own full-screen
          minimum. See FooterReveal. */}
      <body className="min-h-full">
        {/* Who publishes the site and what the site is, said once for every
            page rather than per route. Both nodes carry an `@id`, so a page's
            own structured data joins onto them by reference — see lib/jsonLd.
            Page-specific nodes (the app itself, the FAQ, the breadcrumbs) are
            emitted by the pages that can vouch for them. */}
        <JsonLd data={graph(organizationLd(), websiteLd())} />

        {/* Chrome is gated so the shared quote pages under /q render as a bare
            receipt, without the site nav, CTA or footer. See ChromeGate. */}
        <ChromeGate>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <SiteHeader />
        </ChromeGate>
        {/* The sheet the footer hides behind: opaque, one layer up, and never
            shorter than the screen so there is always a page to slide away. */}
        <main id="main" className="relative z-10 min-h-lvh bg-bg">
          {children}
        </main>
        <ChromeGate>
          <SiteFooter />
        </ChromeGate>
      </body>
    </html>
  );
}
