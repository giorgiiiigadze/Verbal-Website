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
 * landed as a hairline across white with the royal privacy band starting
 * immediately under it, which is a colour change already.
 *
 * The pictures do not exist yet, so the boxes draw as placeholders and the copy
 * below is written to be replaced. Both are marked as such; nothing here should
 * be mistaken for finished work.
 *
 * Kept from the version this replaces, because it is what the section may not
 * claim: contact details. `ClientsView` in the app repo notes that the customers
 * table holds them but that the tab deliberately shows a name and a history, so
 * a line here about keeping numbers and addresses would be a promise the app
 * does not honour.
 */
const PANELS: [PicturePanel, PicturePanel] = [
  {
    /** Placeholder. The wider box: the client list, opened out. */
    title: "The list builds itself",
    body:
      "Placeholder copy. A quote files itself under the name on it, so the " +
      "history is there before you think to look for it.",
    wide: true,
    image: null,
  },
  {
    /** Placeholder. The narrow box: one client, with their quotes under them. */
    title: "Everything you quoted them",
    body:
      "Placeholder copy. What you won, what is still waiting on an answer, " +
      "and how often they say yes.",
    wide: false,
    image: null,
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
