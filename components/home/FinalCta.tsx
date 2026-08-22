import { APP_STORE_URL, SITE_NAME } from "@/content/site";
import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The last block on the page: the mark at the size of the page, and one button
 * under it. No copy — everything it could say has been said by the eight
 * sections above, and a closing line would only be a ninth.
 *
 * It does not use `Section`, which puts its children inside a Container: the
 * wordmark has to escape that max width, because the point of it is the page's
 * width and not the content column's. So the band is written out here with the
 * same tone and the same vertical rhythm.
 */
export function FinalCta() {
  return (
    <Reveal>
      <section className="overflow-clip bg-text py-14 sm:py-20">
        {/*
          Sized in `vw` rather than at breakpoints so it tracks the window
          continuously and keeps the same relationship to the gutter at every
          width. The logo is in `em` so the mark scales with the type instead of
          needing its own sizes.

          `role="img"` with the real name on the outside: the mark is a
          brushstroke V doing the word's first letter, so the type beside it
          only carries `erbal` and would be read out as that. The role makes the
          pair announce as one word, and everything inside it presentational.
        */}
        <div
          data-reveal
          role="img"
          aria-label={SITE_NAME}
          className="flex select-none items-end justify-center gap-[0.02em] px-6 text-[15vw] text-white sm:px-10"
        >
          <Logo className="h-[0.6em] w-auto" />
          {/* `slice(1)` rather than a literal, so the two halves cannot drift
              apart if the name is ever edited in content/site.ts. */}
          <span className="font-slab leading-[0.78] tracking-tight">
            {SITE_NAME.slice(1)}
          </span>
        </div>

        {/* The hero's CTA, repeated: same variant, size and shape, and the same
            fallback — it points at the store the moment there is one, and until
            then at the page that explains the recording, so it is never a dead
            link. */}
        <div data-reveal className="mt-12 flex justify-center px-6 sm:px-10">
          <Button
            href={APP_STORE_URL ?? "/how-it-works"}
            variant="ghostOnRoyal"
            size="md"
            shape="rect"
          >
            <AppleMark className="h-4 w-4" />
            Coming soon to iPhone
          </Button>
        </div>
      </section>
    </Reveal>
  );
}
