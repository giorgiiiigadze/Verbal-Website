# Verbal — website

The public site for **Verbal**, the iOS app that turns a spoken description of a
job into a written, priced quote for tradespeople.

It is an informational site and nothing more: no sign-up, no forms, no
dashboard, no API calls. Every call to action goes to the App Store (once there
is a listing) or to `mailto:`.

## Running it

```bash
npm install
npm run dev
```

`npm run build` produces the production build; `npm run lint` runs ESLint.

## Layout

```
app/          one directory per route, plus sitemap.ts / robots.ts / opengraph-image.tsx
components/   layout/ (chrome), home/ (page sections), ui/ (primitives)
content/      every string on the site — copy lives here, not in components
lib/          metadata helper, classname helper
```

Reword the site by editing `content/`. Components take props and hold no copy.

## Things worth knowing before you change something

**The design tokens are the app's.** The palette in `app/globals.css` is lifted
from `Verbal/Assets.xcassets/*.colorset` in the app repo, light and dark values
both. If a colour looks wrong, check it against the app rather than picking a
new one.

**The site claims the app has no tracking, and so does this site.** The privacy
policy states Verbal contains "no analytics, no advertising, and no tracking of
any kind". Adding Vercel Analytics, a newsletter, an embedded video or any
CDN-hosted asset makes that sentence false as a reader would scope it. Roboto
Slab is self-hosted by `next/font` for exactly this reason — the page makes no
request to Google. Keep it that way, or amend the policy first.

**There are no invented numbers.** No user counts, no star ratings, no
testimonials — the app has not shipped, so there are none to report. `app/page.tsx`
has a note marking where real ones go after launch.

**The App Store link does not exist yet.** `APP_STORE_URL` in `content/site.ts`
is `null`, and `<AppStoreBadge />` renders "Coming soon to iPhone" while it is.
Set it to the listing URL on launch day; nothing else needs to change.

**The legal pages are canonical here.** `content/privacy.mdx` and
`content/terms.mdx` were ported from `Verbal/docs/{privacy,terms}/index.md`.
Edit them here. The copies in the app repo are kept only until no shipped build
points at the old GitHub Pages URL.

**The shared-quote renderer is not in this repo.** `Verbal/docs/q/index.html`
serves quote links that have already been sent to real customers. It stays on
GitHub Pages; moving it would break those links.

## Before launch

- [ ] Pick a domain and set `NEXT_PUBLIC_SITE_URL` (it feeds canonical URLs, OG
      tags, `sitemap.xml` and `robots.txt`; the placeholder is `verbal.app`)
- [ ] Point the app at it — in `Verbal/Verbal/AppInfo.swift`, set
      `privacyPolicyURL` and `termsURL` to the new domain. Leave
      `shareURL(token:)` alone.
- [ ] Redirect the old `giorgiiiigadze.github.io/Verbal/{privacy,terms}/` paths
- [ ] Set `APP_STORE_URL` once the listing is live
