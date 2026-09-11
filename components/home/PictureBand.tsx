import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The two-picture band, used by CalendarBand and ClientsBand.
 *
 * Both were the same fifty lines of JSX with different strings in them, and
 * they run one after the other on the home page, so any drift between the two
 * shows up as a broken grid rather than as a variation. They are one component
 * now and the differences that are real — which side the wide picture is on,
 * the heading, the panels — are props.
 *
 * The shape: no visible section heading, two boxes of different widths, each
 * carrying its own line above its own picture. The claims are things you can
 * be shown rather than told, and a screenshot makes the argument faster than a
 * paragraph about it does; with a title over every box, a section title above
 * them was the same sentence twice.
 */
export type PicturePanel = {
  title: string;
  body: string;
  /** Which of the two is the wide one. Exactly one should be. */
  wide: boolean;
  /** Null until the screenshot exists — the box draws as a placeholder. */
  image?: { src: string; alt: string; className?: string } | null;
};

export function PictureBand({
  id,
  heading,
  panels,
  className,
}: {
  id: string;
  /** Drawn nowhere, read by everything: the document outline, the
   *  accessibility tree and the crawler cannot see the two pictures, and
   *  without this they meet two H3s under no H2 of their own. */
  heading: string;
  /** Two panels, in the order they appear. */
  panels: [PicturePanel, PicturePanel];
  className?: string;
}) {
  // The column split follows the two ratios rather than the other way round.
  // A square beside a 16:9 is 9 parts to 16, so both boxes come out the same
  // height on their own terms and neither is stretched into a ratio nobody
  // chose. Whichever panel leads gets the 16. Get this wrong and the columns
  // inflate: a box with an aspect ratio asks for the width that ratio implies,
  // and a track that cannot give it grows instead, which is how this grid once
  // measured 1224px of columns inside a 1200px row.
  const columns = panels[0].wide
    ? "lg:grid-cols-[16fr_9fr]"
    : "lg:grid-cols-[9fr_16fr]";

  return (
    <Reveal stagger={0.08}>
      {/* `wide` — the hero's width, max-w-7xl — rather than the page's default
          column. The band is two pictures, and pictures are the one thing on
          the site that gain by the extra 128px; the sections that stayed narrow
          are the ones that are mostly prose, where a wider measure is worse. */}
      <Section id={id} size="wide" className={`scroll-mt-24 ${className ?? ""}`}>
        <h2 className="sr-only">{heading}</h2>

        {/* Three rows, and each panel is a subgrid across all three, so the
            title, the copy and the picture of one panel share a row with the
            same part of the other. Stretching the boxes to a common bottom is
            not enough on its own: the copy above them is a different number of
            lines in each column, so the box that follows the shorter paragraph
            used to start higher and end up taller than its neighbour.

            The row gap is zeroed at `lg` because the panels inherit it between
            their own three rows; the spacing inside a panel stays `mt-2` and
            `mt-6`, as it is on a phone. The column gap is 10px, far under the
            page's own `8`: the two boxes are one picture and a detail of it, so
            they sit closer to each other than to anything else on the page. Any
            value works — the fr tracks split whatever is left after the gap, so
            the two heights still agree.

            The split only exists from `lg`. Side by side on a phone the narrow
            box is too small to be a picture of anything, so they stack full
            width. */}
        <div
          className={`grid gap-8 ${columns} lg:grid-rows-[auto_auto_auto] lg:gap-x-2.5 lg:gap-y-0`}
        >
          {panels.map((panel) => (
            <div
              key={panel.title}
              data-reveal
              className="flex flex-col lg:row-span-3 lg:grid lg:grid-rows-subgrid"
            >
              {/* The text sits above its picture rather than on it: whatever
                  the screenshots turn out to be, a caption over an unknown
                  image is a contrast risk that cannot be checked in advance. */}
              <h3 className="font-slab text-xl leading-snug">{panel.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted">
                {panel.body}
              </p>

              {/* `rounded-lg` rather than the card radius the rest of the site
                  uses: 18px on a box this size reads as a rounded card holding
                  a picture, where the point is the picture, and 8px is barely a
                  corner at all.

                  Stacked, the square gives way to 4:3. Full width it would be
                  as tall as the page is wide — 688px on a tablet, most of the
                  screen for one box — and the square only has a job while there
                  is a 16:9 beside it to be square against. Both ratios are ones
                  you can name; change either and the 9 or the 16 in the column
                  split changes with it. */}
              <div
                aria-hidden={panel.image ? undefined : "true"}
                className={`relative mt-6 flex items-center justify-center overflow-hidden rounded-lg border ${
                  panel.image
                    ? "border-black/15 bg-[#1c1c1e]"
                    : "border-dashed border-black/15 bg-surface"
                } ${panel.wide ? "aspect-video" : "aspect-[4/3] lg:aspect-square"}`}
              >
                {panel.image ? (
                  <Image
                    src={panel.image.src}
                    alt={panel.image.alt}
                    fill
                    // The two column widths at max-w-7xl: the wide box lands
                    // near 760px, the narrow one near 430px.
                    sizes={
                      panel.wide
                        ? "(min-width: 1024px) 760px, 100vw"
                        : "(min-width: 1024px) 430px, 100vw"
                    }
                    className={panel.image.className ?? "object-cover"}
                  />
                ) : (
                  <span className="text-sm font-medium text-muted">
                    Photo to come
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Reveal>
  );
}
