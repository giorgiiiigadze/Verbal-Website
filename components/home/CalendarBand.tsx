import { PictureBand, type PicturePanel } from "@/components/home/PictureBand";

/**
 * The calendar band: two pictures, each carrying its own line, no section
 * heading of its own. The layout is `PictureBand`, which ClientsBand below it
 * draws reversed.
 *
 * The wide picture does not exist yet, so that box draws as a placeholder and
 * the copy is written to be replaced — same as ClientsBand's panels.
 */
const PANELS: [PicturePanel, PicturePanel] = [
  {
    /** The narrow box: one job, with its quote attached. */
    title: "The date carries the quote",
    body:
      "Placeholder copy. Book straight off an accepted quote. The job keeps " +
      "its price and its customer, with no re-typing either.",
    wide: false,
    image: {
      src: "/images/calender_screenshot_sm.png",
      alt: "Verbal's Calendar view, showing two scheduled visits for Mrs. Chen and James Bond.",
      className: "object-cover object-[center_55%]",
    },
  },
  {
    /** Placeholder. The wide box: a week or a day, laid out. */
    title: "What's booked, at a glance",
    body:
      "Placeholder copy. An accepted quote becomes a job on the calendar, " +
      "so what you see booked is exactly what the customer said yes to.",
    wide: true,
    image: null,
  },
];

export function CalendarBand() {
  return (
    <PictureBand
      id="calendar"
      heading="Booked jobs on the calendar"
      panels={PANELS}
    />
  );
}
