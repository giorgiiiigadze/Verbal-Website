/**
 * A filled tick, the one the hero's reassurance line uses.
 *
 * The disc takes its colour from whatever it sits in via `fill-current`, so the
 * mark and its label can never drift apart. Solid rather than outlined so it
 * still reads at 16px, where a stroked circle closes up. The check itself is
 * hardcoded white, which is what makes the mark work on a dark card as well as
 * on the page's own white.
 *
 * No size prop: `cn` is a plain join with no tailwind-merge, so a caller
 * passing its own `h-`/`w-` would leave two competing utilities and let
 * stylesheet order decide. Everything that uses it wants 16px.
 */
export function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 shrink-0">
      <circle cx="10" cy="10" r="10" className="fill-current" />
      <path
        d="m5.9 10.3 2.6 2.7 5.6-5.9"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
