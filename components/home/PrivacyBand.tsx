import { Button } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * On-device transcription is the app's strongest single claim and the one most
 * competitors cannot make, so it gets a band of its own rather than a card in
 * the grid.
 */
export function PrivacyBand() {
  return (
    <Reveal stagger={0.07}>
      <Section tone="royal">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <div>
            {/* The house eyebrow, exactly as SectionHeading sets it: 16px and
                capitalised, in RoyalBlue100 because the band is dark. This was
                the last small-uppercase eyebrow on the site — a second eyebrow
                style the site does not need. */}
            <p
              data-reveal
              className="mb-3 text-[16px] font-semibold capitalize text-royal-100"
            >
              Privacy
            </p>
            <h2 data-reveal className="text-3xl leading-tight sm:text-4xl">
              Your voice never leaves your phone.
            </h2>
            <p
              data-reveal
              className="mt-5 max-w-xl text-lg leading-relaxed text-white/75"
            >
              The recording is transcribed on the device by iOS. It is never
              uploaded, never stored, and gone the moment you stop talking. What
              leaves your phone is the text, because that is what the quote
              gets built from.
            </p>
            <div data-reveal className="mt-8">
              <Button href="/privacy" variant="ghostOnRoyal">
                Read the privacy policy
              </Button>
            </div>
          </div>

          {/* The list drifts a little against the claim on the left, which is
              still. The band is one flat colour with nothing in it to move, and
              the two columns passing at different speeds is the only depth it
              gets. Small numbers: the lines are being read on the way past. */}
          <Parallax from={22} to={-22}>
            <ul className="space-y-4 text-white/80">
              {[
                "No analytics SDK, in the app or on this website.",
                "No advertising identifier, and no cross-app tracking.",
                "Your customers' details are never sent to the AI provider.",
                "Delete your account in the app and it is gone immediately.",
              ].map((line) => (
                <li
                  key={line}
                  data-reveal
                  className="flex gap-3 border-b border-white/15 pb-4 last:border-0"
                >
                  <span aria-hidden="true" className="text-royal-100">
                    —
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </Parallax>
        </div>
      </Section>
    </Reveal>
  );
}
