import { PictureBand, type PicturePanel } from "@/components/home/PictureBand";

/**
 * The clients tab, said as the thing it actually is: two pictures, each
 * carrying its own line.
 *
 * This is the calendar band reversed, and nothing else. Same `PictureBand`,
 * same padding, same ratios, same absent heading — only the wide box leads
 * here where the narrow one leads there, so the two run as one alternating
 * pair rather than as the same row printed twice. The band used to draw a rule
 * along its bottom edge as well; the calendar band draws none, and that one
 * landed as a hairline across white with the next band starting immediately
 * under it.
 *
 * The wide box leads with one client opened up, and the narrow one follows
 * with the list they came from — the detail before the index, because the
 * detail is the picture that reads at 760px and the list is the one that still
 * reads at 428px.
 *
 * Titles only, as in CalendarBand: the paragraph that used to sit under each
 * title was saying in prose what the picture beneath it is there to show.
 *
 * Kept from the version this replaces, because it is what the section may not
 * claim: contact details. `ClientsView` in the app repo notes that the customers
 * table holds them but that the tab deliberately shows a name and a history, so
 * a line here about keeping numbers and addresses would be a promise the app
 * does not honour.
 */
const PANELS: [PicturePanel, PicturePanel] = [
  {
    /** The wider box: one client, with their quotes under them. */
    title: "Everything you quoted them",
    wide: true,
    image: {
      src: "/images/bands/clients-wide.webp",
      alt: "A client's page in Verbal, showing their total quoted, what they accepted, and the quotes underneath.",
      // 3:2 into a 16:9 box, so the crop takes about 16% of the height off
      // between the two edges. Held at 65% rather than centred, which slides
      // the picture up in the frame: more of the phone and less of the empty
      // sky above it. The whole travel is only a few percent of the height, so
      // 65 is a nudge rather than a different crop.
      className: "object-cover object-[center_65%]",
    },
  },
  {
    /** The narrow box: the client list, opened out. */
    title: "The list builds itself",
    wide: false,
    image: {
      src: "/images/bands/clients-narrow.png",
      // Keep the complete list visible at every breakpoint. The source is
      // almost square while this panel becomes 4:3 below `lg`; `object-cover`
      // cropped the lower rows there. Its dark canvas blends into the panel's
      // matching fill, so the small amount of breathing room reads as part of
      // the screenshot rather than as letterboxing.
      alt: "Verbal's client list, each name carrying the number of quotes written for them.",
      className: "object-contain",
    },
  },
];

export function ClientsBand() {
  return (
    <PictureBand
      id="clients"
      heading="Your clients and their quote history"
      panels={PANELS}
    />
  );
}
