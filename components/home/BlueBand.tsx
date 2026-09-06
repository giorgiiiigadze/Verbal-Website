import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/layout/Section";

/**
 * What you actually say, on a full-width charcoal band.
 *
 * This was the line "Say the job out loud." — an instruction, with no example
 * of the thing it was instructing. Every other section on the page describes
 * the app talking to you; nowhere did a visitor see the one input the whole
 * product is built on, which is a tradesperson talking the way they talk.
 *
 * So the band carries a transcript instead. It is deliberately unpolished and
 * in no particular order — it opens on "Right", doubles back on itself, and
 * ends by refusing to price something. That is the argument: the app takes the
 * sentence as it comes out, and step 01 in `content/features` promises exactly
 * that ("the way you would to the customer standing there", "in whatever order
 * it comes out").
 *
 * The job is an electrician's, and every part of it is a real preset from
 * `content/trades` — consumer unit, double sockets, EV charger — so the
 * example is the app's own vocabulary rather than something invented to read
 * well.
 *
 * The EV charger left unpriced is the point of the last clause. It is the
 * behaviour SpeakSend claims two sections above — "It never invents a price.
 * It flags the gaps." — said here by the tradesperson rather than by us.
 *
 * Nothing is claimed about where the audio goes. That is PrivacyBand's
 * sentence further down, and saying it twice would spend the surprise of it.
 *
 * Set at a third of what the old line was: a transcript is read, not glanced
 * at, and at 10rem three sentences of speech would have been a wall. White on
 * #292929 measures about 14.5:1 and the caption under it about 6:1, so neither
 * is anywhere near a contrast floor.
 */
const TRANSCRIPT =
  "Right — consumer unit needs doing, six double sockets in the kitchen, " +
  "two of them behind the units. And she’s asking about an EV charger, but " +
  "leave that one, I’ll price it after.";

// The words need to be longer than the viewport before their second copy can
// take over. Keeping the copy here, rather than as a CSS string, keeps it in
// the document for readers and makes changing the example later painless.
const FLOWING_TRANSCRIPT = `${TRANSCRIPT}  •  ${TRANSCRIPT}  •  ${TRANSCRIPT}  •  ${TRANSCRIPT}  •  `;

export function BlueBand() {
  return (
    // Two motions, because one of them ends. Reveal is the house entrance — a
    // fade and a short rise, once, as the band comes up the window — and
    // Parallax is the drift that keeps going for as long as the band is on
    // screen, scrubbed against scroll position rather than played. Both bow out
    // entirely under prefers-reduced-motion.
    //
    // They do not fight: Reveal writes `y` on the elements it is given,
    // Parallax writes it on its own inner wrapper, so the two transforms
    // compose instead of racing for one element. Reveal is the outer of the two
    // on purpose — its ScrollTrigger measures its own root, and a root inside
    // the parallax would be a trigger being translated by the tween that is
    // reading it.
    <Reveal>
      <Section tone="charcoal" className="!py-8 sm:!py-12">
        {/* The band is as tall as what is in it. It used to be held open to
            60vh, which was the right call for a five-word line set at 10rem and
            the wrong one for a transcript a third that size — 60vh of charcoal
            around three lines of speech reads as a gap rather than as a band.

            The two heights were also fighting: the section pads itself by 10rem
            at `sm` and the box inside asked for `60vh - 7rem`, so the band came
            out 48px taller than the 60vh it was aiming at.

            py-4 is headroom for the drift, not spacing, and it is most of what
            the band has beyond the padding every other section on the site
            carries. It was py-12, sized to clear the parallax's 96px on its
            own — which was over-cautious: the drift only reaches its extremes
            as the band is leaving the window, by which point the edge it would
            have crossed is off screen. What is left is the small amount the
            quote needs mid-scroll. */}
        <Parallax from={72} to={-72} className="py-4">
          <div className="blue-band-flow">
            {/* Decorative duplicate. The semantic version below is the one a
                screen reader meets, so this moving ribbon never repeats a
                long sentence out loud. */}
            <div aria-hidden="true" className="blue-band-flow__viewport">
              <svg
                className="blue-band-flow__svg"
                viewBox="0 0 1600 400"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <path
                    id="blue-band-flow-path"
                    d="M -260 235 C 170 70, 470 330, 800 205 S 1370 55, 1870 225"
                  />
                </defs>
                <text className="blue-band-flow__text blue-band-flow__text--motion">
                  <textPath href="#blue-band-flow-path" startOffset="0%">
                    {FLOWING_TRANSCRIPT}
                    <animate
                      attributeName="startOffset"
                      from="-50%"
                      to="0%"
                      dur="18s"
                      repeatCount="indefinite"
                    />
                  </textPath>
                </text>
                {/* Still version shown only when the visitor asks for less motion. */}
                <text className="blue-band-flow__text blue-band-flow__text--still">
                  <textPath href="#blue-band-flow-path" startOffset="-18%">
                    {FLOWING_TRANSCRIPT}
                  </textPath>
                </text>
              </svg>
            </div>

            <div className="blue-band-flow__content w-full max-w-4xl text-center">
            <p
              data-reveal
              className="font-editorial text-[clamp(2.15rem,5vw,4rem)] leading-[0.95] tracking-tight"
            >
              Say it as it comes to you.
            </p>
            <p className="sr-only">{TRANSCRIPT}</p>
            </div>
          </div>
        </Parallax>
      </Section>
    </Reveal>
  );
}
