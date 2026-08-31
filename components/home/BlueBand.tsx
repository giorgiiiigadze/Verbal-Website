import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/layout/Section";

/**
 * The recording claim, cut to five words on a full-width charcoal band.
 *
 * "Say the job out loud" rather than "say it": the pronoun was empty, and the
 * job is the thing a reader has to picture themselves describing. Five words
 * is the ceiling — this is a line to be read at a glance from across the
 * scroll, not a sentence to be worked through.
 *
 * One line, centred, and nothing else. The band used to hold the text in the
 * first of two columns with the second kept empty for whatever went beside it
 * later; centring spends that slot, so anything added here now has to be
 * arranged around the line rather than next to it.
 *
 * Nothing is claimed here about where the audio goes. That is PrivacyBand's
 * sentence further down, and saying it twice would spend the surprise of it.
 *
 * The size is set to fill the band rather than to clear a contrast floor:
 * white on #292929 measures about 14.5:1, where the #0098F2 this was set on
 * measured about 3:1 and cleared AA for large text and nothing smaller. It
 * clamps to 10rem against a `max-w-5xl` measure, which breaks the five words
 * across two lines on a desktop and puts roughly two thirds of the band's
 * height under them. Bigger than this and the line breaks a third time and
 * starts running out of the band on a short window; the `13vw` middle term is
 * what keeps it from doing that on the way down to a phone.
 *
 * The min-height is what holds the band open; five words would not fill it.
 */
export function BlueBand() {
  return (
    // Two motions, because one of them ends. Reveal is the house entrance —
    // a fade and a short rise, once, as the band comes up the window — and
    // Parallax is the drift that keeps going for as long as the band is on
    // screen, scrubbed against scroll position rather than played. Both bow
    // out entirely under prefers-reduced-motion.
    //
    // They do not fight: Reveal writes `y` on the `p`, Parallax writes it on
    // its own inner wrapper, so the two transforms compose instead of racing
    // for one element. Reveal is the outer of the two on purpose — its
    // ScrollTrigger measures its own root, and a root inside the parallax
    // would be a trigger being translated by the tween that is reading it.
    <Reveal>
      <Section tone="charcoal" className="min-h-[60vh]">
        {/* py-16 is headroom for the drift, not spacing. The line is centred
            in this box and the parallax moves it 96px each way; on a short
            window the box collapses to the height of the text itself, and
            without the padding the drift carries the line out of the band and
            over the white sections either side. 64px here plus the section's
            own 80px clears the 96 with room to spare. */}
        <Parallax
          from={96}
          to={-96}
          className="flex min-h-[calc(60vh-7rem)] items-center justify-center py-16"
        >
          {/* Full width: the measure was capped at max-w-5xl, which held the
              line 48px short of the column on either side for no reason once
              it was centred. It still breaks in two — 21 characters at 10rem
              want about 1700px and there are 1072 — but each line now runs the
              whole column.

              leading-[1.08], not the 1.02 it was set at: 1.02 is under Roboto
              Slab's own ascender-to-descender height, so at this size the
              descenders of the first line ran into the second. */}
          <p
            data-reveal
            className="w-full text-center font-slab text-[clamp(3.5rem,13vw,10rem)] leading-[1.08] tracking-tight"
          >
            Say the job out loud.
          </p>
        </Parallax>
      </Section>
    </Reveal>
  );
}
