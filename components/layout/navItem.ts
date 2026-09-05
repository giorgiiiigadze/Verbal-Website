/**
 * The shape a header nav item takes under the pointer: a pill, the same radius
 * as the header pill it sits in.
 *
 * The links used to be bare words on the bar, with nothing but the cursor to
 * say they were live. A tinted pill is what the rest of the site answers a
 * pointer with — see the trades chips and the Button variants — and at this
 * size a colour change alone is too small a signal to notice.
 *
 * Black at 5%, not a palette colour: the header is `bg-card/85` over whatever
 * the page happens to be behind it, and a tint that lets that through belongs
 * to the bar rather than to a theme.
 *
 * It lives in its own module because two files draw a nav item — the links in
 * SiteHeader and the Features trigger, which is a `button` in a client
 * component — and the two have to be the same shape or the menu's word sits at
 * a different height from its neighbours. A plain string with no "use client"
 * of its own can be imported from both sides of that boundary.
 */
export const NAV_ITEM =
  "whitespace-nowrap rounded-full px-3 py-1.5 text-text transition-colors hover:bg-black/5";
