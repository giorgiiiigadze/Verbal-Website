import { Section } from "@/components/layout/Section";

/**
 * The recording claim, cut to four words on a full-width blue band.
 *
 * The band is half empty on purpose. From `lg` it is two columns and only the
 * first is filled — the second is the slot for whatever goes beside the line
 * later, which is why the text is held to its own column rather than centred
 * or run to the full measure. Stacked below `lg` there is only the one column,
 * so nothing has to move when that slot is filled.
 *
 * Nothing is claimed here about where the audio goes. That is PrivacyBand's
 * sentence further down, and saying it twice would spend the surprise of it.
 *
 * White on this blue measures about 3:1, which clears AA for large text and
 * nothing smaller — so this line cannot shrink to a normal paragraph size
 * without failing contrast.
 *
 * The min-height is what holds the band open; four words would not fill it.
 */
export function BlueBand() {
  return (
    <Section tone="blue" className="min-h-[60vh]">
      <div className="grid min-h-[calc(60vh-7rem)] items-center gap-12 lg:grid-cols-2">
        <p className="font-slab text-[clamp(2.5rem,9vw,5.5rem)] leading-[1.02] tracking-tight">
          Say it out loud.
        </p>
      </div>
    </Section>
  );
}
