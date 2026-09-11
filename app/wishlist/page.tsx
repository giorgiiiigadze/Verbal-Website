import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { HeroReveal } from "@/components/home/HeroReveal";
import { EmailCapture } from "@/components/wishlist/EmailCapture";
import { selectFrom, isSupabaseConfigured } from "@/lib/supabase";
import { SITE_NAME } from "@/content/site";
import {
  HERO,
  STATUSES,
  WISHLIST_LEAD,
  WISHLIST_TITLE,
} from "@/content/wishlist";
import { cn } from "@/lib/cn";

type WishlistItem = {
  id: string;
  title: string;
  summary: string;
  status: string;
  release: string | null;
};

/**
 * The board is a database read, so the page cannot be static. An hour is the
 * compromise: the list changes a few times a month, and nobody watching it
 * needs a row they just added to appear within the minute.
 */
export const revalidate = 3600;

/** RLS already hides unpublished rows, so there is no `published` filter here.
 *  A failure returns an empty board rather than a 500: the hero and the form
 *  are the point of the page, and neither needs the board to work. */
async function loadItems(): Promise<WishlistItem[]> {
  if (!isSupabaseConfigured) return [];

  try {
    return await selectFrom<WishlistItem>(
      "wishlist_items?select=id,title,summary,status,release&order=position.asc,created_at.asc",
      { revalidate },
    );
  } catch (error) {
    console.error("wishlist: could not load the board", error);
    return [];
  }
}

export default async function WishlistPage() {
  const items = await loadItems();

  // Grouped here rather than in four queries. STATUSES drives the order, so a
  // row carrying a status this build does not know about simply does not
  // appear, which is the safe direction for a status added to the database
  // before it is added to the site.
  const groups = STATUSES.map((status) => ({
    ...status,
    items: items.filter((item) => item.status === status.status),
  })).filter((group) => group.items.length > 0);

  return (
    // One royal ground for the whole page. ChromeGate drops the site header
    // and footer on this route, so the page carries its own way back.
    <div className="bg-royal-400 text-white">
      <HeroScreen />

      {/* Everything below the first screen. `scroll-mt` keeps the heading off
          the very top edge when the hero's cue jumps here. */}
      <div id="list" className="scroll-mt-8">
        <Container className="max-w-3xl pb-28">
          <Reveal>
            <section aria-labelledby="board" className="text-center">
              <h2
                data-reveal
                id="board"
                className="font-slab text-3xl leading-tight sm:text-4xl"
              >
                {WISHLIST_TITLE}
              </h2>
              <p
                data-reveal
                className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70"
              >
                {WISHLIST_LEAD}
              </p>
            </section>

            {groups.length > 0 ? (
              <div className="mt-14 space-y-14">
                {groups.map((group) => (
                  <section
                    key={group.status}
                    data-reveal
                    aria-labelledby={`group-${group.status}`}
                  >
                    {/* Centred, matching the hero and the intro above. The
                        items below stay left-aligned on purpose: they are a
                        list to scan, and centred body copy ragged-edges the
                        left margin the eye returns to on every line. */}
                    <div className="flex flex-col items-center gap-1 text-center">
                      <h3 id={`group-${group.status}`} className="text-2xl">
                        {group.label}
                      </h3>
                      <p className="text-sm text-white/55">{group.blurb}</p>
                    </div>

                    <ul className="mt-6 divide-y divide-white/15">
                      {group.items.map((item) => (
                        <li key={item.id} className="py-5">
                          <div className="flex flex-wrap items-center gap-3">
                            <h4 className="text-lg font-medium">{item.title}</h4>
                            <Chip
                              className={group.chip}
                              label={group.label}
                              release={item.release}
                            />
                          </div>
                          <p className="mt-2 leading-relaxed text-white/70">
                            {item.summary}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              <p
                data-reveal
                className="mt-14 rounded-[var(--radius-card)] border border-white/15 bg-white/5 p-6 text-white/70"
              >
                The board is empty just now. Leave your address above and you
                will hear when that changes.
              </p>
            )}
          </Reveal>

          {/* Not SiteFooter, which ChromeGate deliberately strips from this
              route: that one is four columns of site navigation and would turn
              a single held page into a landing page with a sitemap stapled on.
              This is the minimum a page that takes an email address owes its
              reader — who published it, and where the terms are. */}
          <footer className="mt-20 border-t border-white/15 pt-8">
            <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-center text-[13px] text-white/45">
              <span>
                © {new Date().getFullYear()} {SITE_NAME}
              </span>
              <Dot />
              <Link href="/privacy" className="transition-colors hover:text-white">
                Privacy
              </Link>
              <Dot />
              <Link href="/terms" className="transition-colors hover:text-white">
                Terms
              </Link>
              <Dot />
              <Link href="/support" className="transition-colors hover:text-white">
                Contact
              </Link>
            </p>
          </footer>
        </Container>
      </div>
    </div>
  );
}

/** The separator between the closing links, matching the dots under the hero
 *  field so the page has one punctuation mark rather than two. */
function Dot() {
  return (
    <span
      aria-hidden="true"
      className="h-[3px] w-[3px] rounded-full bg-white/25"
    />
  );
}

/**
 * The first screen: one statement, one field, and a way down.
 *
 * Held to the viewport height rather than to its contents, so the page opens
 * as a single held thought and the board is something you go and find. The
 * three rows are a flex column — the way back, the statement, the cue — which
 * keeps the cue pinned to the bottom edge however tall the middle grows.
 */
function HeroScreen() {
  return (
    // The home hero's entrance, reused rather than reimplemented: it animates
    // every `data-hero-reveal` descendant in DOM order, lands on the end state
    // under prefers-reduced-motion, and ships a <noscript> rule so the screen
    // is never left invisible. The from-state (`opacity: 0`) is the one in
    // globals.css, which is what stops a flash before hydration. Its phone and
    // parallax selectors simply find nothing here.
    <HeroReveal>
    <section className="flex min-h-lvh flex-col">
      <Container className="max-w-5xl pt-6 sm:pt-10">
        {/* Not a header, just a way back: the page is reached from a link and
            would otherwise be a dead end. Delete this to make it standalone. */}
        <Link
          data-hero-reveal
          href="/"
          className="group inline-flex items-center gap-2 text-white/65 transition-colors hover:text-white"
        >
          <Logo className="h-5 text-white" />
          <span className="text-sm font-medium">Back to Verbal</span>
        </Link>
      </Container>

      <Container className="flex max-w-5xl flex-1 flex-col items-center justify-center py-10 text-center sm:py-16">
        {/* The home hero's announcement pill, inverted for a royal ground. */}
        <p data-hero-reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 text-sm">
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-royal-400">
              {HERO.pill}
            </span>
            <span className="text-white/80">{HERO.pillNote}</span>
          </span>
        </p>

        {/* Two blocks rather than a <br>, matching the home hero, so the line
            break is structural instead of a character in the middle of copy. */}
        <h1 className="mt-6 max-w-3xl text-balance font-slab text-[clamp(2.25rem,9vw,3rem)] leading-[1.04] tracking-tight sm:text-[3.5rem] lg:text-[4.25rem]">
          {HERO.headline.map((line) => (
            <span key={line} data-hero-reveal className="block">
              {line}
            </span>
          ))}
        </h1>

        <p data-hero-reveal className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/75">
          {HERO.lead}
        </p>

        <div data-hero-reveal className="w-full">
          <EmailCapture />
        </div>

        {/* One quiet line rather than three ticked claims. These are not
            selling points, they are the answer to "what happens if I put my
            address in", and a row of filled green discs gave them the weight
            of features. Set small and dim, separated by a dot, they read as a
            footnote to the field above, which is what they are. */}
        <ul
          data-hero-reveal
          className="mt-2 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[13px] text-white/50"
        >
          {HERO.reassurances.map((point, i) => (
            <li key={point} className="flex items-center gap-2.5">
              {i > 0 ? (
                <span
                  aria-hidden="true"
                  className="h-[3px] w-[3px] rounded-full bg-white/30"
                />
              ) : null}
              {point}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="flex max-w-5xl justify-center pb-4 sm:pb-10">
        <a
          data-hero-reveal
          href="#list"
          className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
        >
          {HERO.scrollCue}
          {/* A slow drift rather than a bounce, and on its own span so the
              animation's transform never races a hover transform. Killed by
              the global reduced-motion rule in globals.css. */}
          <span aria-hidden="true" className="wishlist-cue">
            ↓
          </span>
        </a>
      </Container>
    </section>
    </HeroReveal>
  );
}

/** The status pill. Shows the release number where the item has one, because
 *  "Being built · 1.2" says more in the same space than either half alone. */
function Chip({
  className,
  label,
  release,
}: {
  className: string;
  label: string;
  release: string | null;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        className,
      )}
    >
      {release ? `${label} · ${release}` : label}
    </span>
  );
}
