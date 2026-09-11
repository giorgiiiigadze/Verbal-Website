import { PictureBand, type PicturePanel } from "@/components/home/PictureBand";

/**
 * The calendar band: two pictures, each carrying its own line, no section
 * heading of its own. The layout is `PictureBand`, which ClientsBand below it
 * draws reversed.
 *
 * Titles only: the boxes are screenshots, and the paragraph under each title
 * was saying in prose what the picture beneath it already shows. ClientsBand
 * dropped its copy for the same reason, so `PictureBand` no longer has a slot
 * for any.
 */
const PANELS: [PicturePanel, PicturePanel] = [
  {
    /** The narrow box: one job, with its quote attached. */
    title: "The date carries the quote",
    wide: false,
    image: {
      src: "/images/bands/calendar-narrow.png",
      alt: "Verbal's Calendar view, showing two scheduled visits for Mrs. Chen and James Bond.",
      className: "object-cover object-[center_55%]",
    },
  },
  {
    /** The wide box: the quote list on a phone, the day's visits at the top. */
    title: "What's booked, at a glance",
    wide: true,
    image: {
      src: "/images/bands/calendar-wide.webp",
      alt: "Verbal on a phone, showing tomorrow's two booked visits above a list of sent quotes.",
      // The source is 3:2 and the box is 16:9, so a centred crop takes an even
      // slice off the top and bottom of the backdrop and leaves the phone whole.
      className: "object-cover",
    },
  },
];

export function CalendarBand() {
  return (
    <PictureBand
      id="calendar"
      heading="Booked jobs on the calendar"
      panels={PANELS}
      /* A hairline across the top, full width like the header's and the
         footer's rather than stopped at the container. FeaturesBand above ends
         on the same white this starts on, and with no heading of its own to
         announce it the band otherwise begins wherever its first picture
         happens to. The line is `border-line`, the site's 8% black. */
      className="border-t border-line"
    />
  );
}
