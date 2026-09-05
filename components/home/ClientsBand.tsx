import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The clients tab, said as the thing it actually is.
 *
 * It was a heading, a column of three claims and a phone. It is now two
 * pictures, one wider than the other, each carrying its own line — the claims
 * are things you can be shown rather than told, and a screenshot of the list
 * makes the argument faster than a paragraph about it does. The section heading
 * went with them: with a title over every box, it was the same sentence twice.
 *
 * The pictures do not exist yet, so the boxes are drawn as placeholders and the
 * copy below is written to be replaced. Both are marked as such; nothing here
 * should be mistaken for finished work.
 *
 * Kept from the version this replaces, because it is what the section may not
 * claim: contact details. `ClientsView` in the app repo notes that the customers
 * table holds them but that the tab deliberately shows a name and a history, so
 * a line here about keeping numbers and addresses would be a promise the app
 * does not honour.
 */
const PANELS = [
  {
    /** Placeholder. The wider box: the client list, opened out. */
    title: "The list builds itself",
    body:
      "Placeholder copy. A quote files itself under the name on it, so the " +
      "history is there before you think to look for it.",
    /** Which of the two is the wide one. Exactly one should be. */
    wide: true,
  },
  {
    /** Placeholder. The narrow box: one client, with their quotes under them. */
    title: "Everything you quoted them",
    body:
      "Placeholder copy. What you won, what is still waiting on an answer, " +
      "and how often they say yes.",
    wide: false,
  },
];

export function ClientsBand() {
  return (
    <Reveal stagger={0.08}>
      {/* A bottom rule only. The top one was drawn when this band followed the
          charcoal share band, where it fell on a dark ground and was never
          seen; with the features band above it now, it landed as a line across
          white between two sections that are meant to run together. */}
      {/* `wide` — the hero's width, max-w-7xl — rather than the page's default
          column. The band is two pictures now, and pictures are the one thing on
          the site that gain by the extra 128px; the sections that stayed narrow
          are the ones that are mostly prose, where a wider measure is worse. */}
      <Section id="clients" size="wide" className="scroll-mt-24 border-b border-line">
        {/* The band dropped its visible heading on purpose: with a title over
            every box it was the same sentence twice. This is that heading kept
            where it still does work — the document outline, the accessibility
            tree and the crawler, none of which can see the two pictures, and
            all of which had two H3s here under no H2 of their own. `sr-only`
            paints nothing and moves nothing. */}
        <h2 className="sr-only">Your clients and their quote history</h2>

        {/* No section heading and no eyebrow: the band opens on the two boxes,
            and each carries its own line. What was here — the pill, "The client
            list builds itself" and the sentence under it — said the same thing
            twice once every box had a title of its own.

            Uneven on purpose: two boxes of the same width read as a comparison
            between them, and these are one thing and a detail of it. The split
            only exists from `lg` — side by side on a phone, the narrow one is
            too small to be a picture of anything, so they stack full width. */}
        {/* Mirrored CalendarBand: the wide box leads here, so the column split
            is 16 to 9 rather than 9 to 16, and the panels share the grid's
            three rows so the titles, the copy and the pictures each line up
            with their opposite number. Without that, two paragraphs of
            different lengths start their pictures at different heights. */}
        <div className="grid gap-8 lg:grid-cols-[16fr_9fr] lg:grid-rows-[auto_auto_auto] lg:gap-x-2.5 lg:gap-y-0">
          {PANELS.map((panel) => (
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

              {/* The picture, until there is one. `rounded-lg` rather than the
                  card radius the rest of the site uses: 18px on a box this size
                  read as a rounded card holding a picture, where the point is
                  the picture, and 8px is barely a corner at all.

                  Both ratios are named, and the 16:9 beside a square is what
                  the 16fr and 9fr above are: each box is then its own height
                  rather than one of them being stretched to match the other.
                  Stacked, the square gives way to 4:3 so it is not as tall as
                  the page is wide. Same arrangement as CalendarBand. */}
              <div
                aria-hidden="true"
                className={`mt-6 flex items-center justify-center rounded-lg border border-dashed border-black/15 bg-surface ${
                  panel.wide ? "aspect-video" : "aspect-[4/3] lg:aspect-square"
                }`}
              >
                <span className="text-sm font-medium text-muted">
                  Photo to come
                </span>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </Reveal>
  );
}
