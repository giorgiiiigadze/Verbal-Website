import { AppleMark } from "@/components/ui/AppleMark";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/layout/Section";
import { APP_STORE_URL } from "@/content/site";

/**
 * The features opener, under the share band: a label, one line, and the way in.
 *
 * It names nothing and asks for nothing new. There is no /features page to
 * send anyone to and no list here to read — the four things the menu holds are each explained somewhere
 * that already exists, and the sections above have just spent the page showing
 * them. What this is for is the turn: white after the charcoal band, one claim
 * at the size of a headline, and a door.
 *
 * The claim is the two halves of the app that are not about quoting at all.
 * "Where you work" is the driveway and the loft — the quotes work offline, so
 * the place is not a condition. "The words you use" is that it takes the job
 * as spoken, in any language the phone already dictates in. Both are features
 * in `content/features`, and neither is said anywhere else on the page.
 *
 * The line is broken by hand rather than left to wrap: it is two clauses and
 * the break belongs at the comma, not wherever the measure runs out. At 6.5rem
 * each of them runs about 1065px, which is why the section is on the wide
 * container: the default one leaves 1072px and the lines would have had
 * nothing to spare.
 *
 * Black rather than MainText. #37352f is a warm near-black drawn for paragraphs
 * and it goes grey when there is this much of it at once — the same reason the
 * claims in "Effortless quotes" are set flat black.
 */
export function FeaturesBand() {
  return (
    <Reveal>
      {/* The hero's container, not the default one, so the block starts on the
          page's outermost line — the same edge the hero and "Effortless quotes"
          are set to, and 128px further left than a default section. It is also
          what gives the headline the width to be set this large. */}
      <Section tone="bg" size="wide">
        {/* Left, on the container's own edge. Held to max-w-6xl so the two
            lines break where they are written to and not where the measure
            runs out. */}
        <div className="max-w-6xl">
          {/* The house eyebrow's size — 16px, capitalised — but at medium
              rather than the semibold SectionHeading sets, and in MainText and
              the body's own sans rather than the muted grey it tints them. It reads as a line of the
              page's own copy sitting above the headline rather than as a label
              printed on it. Set by hand because the heading below is far larger
              than the one SectionHeading draws. */}
          <p
            data-reveal
            className="mb-4 text-[16px] font-medium capitalize text-text"
          >
            Features
          </p>

          <h2
            data-reveal
            className="font-slab text-5xl leading-[1.02] tracking-tight text-black sm:text-[6.5rem]"
          >
            Works where you work,
            <br />
            in the words you use.
          </h2>

          <div data-reveal className="mt-10">
            {/* Charcoal, the dark band's own colour: on white it carries the
                weight the line above it is set at, where the site's royal blue
                would read as a form control under a headline this size.

                Points at the store the moment there is one; until then it goes
                where the app is actually explained, so the CTA is never a dead
                end. Same rule as the hero's and AppStoreBadge's. */}
            <Button
              href={APP_STORE_URL ?? "/how-it-works"}
              variant="charcoal"
              size="lg"
            >
              <AppleMark className="h-5 w-5" />
              Download on iPhone
            </Button>
          </div>
        </div>
      </Section>
    </Reveal>
  );
}
