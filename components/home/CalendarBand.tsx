import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The calendar band, styled the same as ClientsBand right below it: two
 * pictures, each carrying its own line, no section heading of its own.
 *
 * The pictures do not exist yet, so the boxes are drawn as placeholders and
 * the copy below is written to be replaced — same as ClientsBand's panels.
 */
const PANELS = [
  {
    /** Placeholder. The narrow box: one job, with its quote attached. */
    title: "The date carries the quote",
    body:
      "Placeholder copy. Book straight off an accepted quote — the job " +
      "keeps its price and its customer, no re-typing either.",
    wide: false,
  },
  {
    /** Placeholder. The wide box: a week or a day, laid out. */
    title: "What's booked, at a glance",
    body:
      "Placeholder copy. An accepted quote becomes a job on the calendar, " +
      "so what you see booked is exactly what the customer said yes to.",
    wide: true,
  },
];

export function CalendarBand() {
  return (
    <Reveal stagger={0.08}>
      <Section id="calendar" size="wide" className="scroll-mt-24">
        {/* Same as ClientsBand below it: no visible heading, so the two H3s
            over the pictures had no H2 of their own. `sr-only` supplies one
            without drawing anything. */}
        <h2 className="sr-only">Booked jobs on the calendar</h2>

        {/* Three rows, and each panel is a subgrid across all three, so the
            title, the copy and the picture of one panel share a row with the
            same part of the other. Stretching the boxes to a common bottom is
            not enough on its own: the copy above them is a different number of
            lines in each column, so the box that follows the shorter paragraph
            used to start higher and end up taller than its neighbour. Sharing
            the rows lines up both edges, and the height falls out of that.

            Row gap is zeroed at `lg` because the panels inherit it between
            their own three rows; the spacing inside a panel stays `mt-2` and
            `mt-6`, as it is on a phone.

            The column split and the two ratios have to agree, or the columns
            inflate. A box with an aspect ratio in a row sized by its neighbour
            asks for the width that ratio implies, and a track that cannot give
            it grows instead: with 9:16 boxes in a 1fr/1.7fr split this grid
            measured 1224px of columns inside a 1200px row, and the band's right
            edge sat 34px past every other band on the page. The rows are all
            `auto` for the same reason — nothing here needs stretching, because
            each box is already the height its own width makes it. */}
        <div className="grid gap-8 lg:grid-cols-[9fr_16fr] lg:grid-rows-[auto_auto_auto] lg:gap-x-2.5 lg:gap-y-0">
          {PANELS.map((panel) => (
            <div
              key={panel.title}
              data-reveal
              className="flex flex-col lg:row-span-3 lg:grid lg:grid-rows-subgrid"
            >
              <h3 className="font-slab text-xl leading-snug">{panel.title}</h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted">
                {panel.body}
              </p>

              {/* Two named ratios, and a column split that follows from them
                  rather than the other way round.

                  A square beside a 16:9 is 9 parts to 16, which is what the
                  grid template above says, so both boxes come out the same
                  height on their own terms: the square is as tall as it is
                  wide, the wide box is 9/16 of its own width, and at a 9:16
                  split those are the same number. Nothing is stretched into
                  shape any more, which is what the narrow box was doing to
                  reach 441x468, a ratio nobody chose.

                  Stacked, the square gives way to 4:3. Full width it would be
                  as tall as the page is wide — 688px on a tablet, most of the
                  screen for one placeholder — and the square only has a job
                  while there is a 16:9 beside it to be square against. Both
                  ratios are still ones you can name. Change either and the 9 or
                  the 16 in the template above changes with it. */}
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
