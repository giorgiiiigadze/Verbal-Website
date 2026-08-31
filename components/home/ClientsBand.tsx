import { Section, SectionHeading } from "@/components/layout/Section";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

/**
 * The clients tab, said as the thing it actually is.
 *
 * Every claim below traces to Views/Clients in the app repo, and the one that
 * leads is the one no competitor's client list can make: you do not build it.
 * `Models/Client.swift` derives a client from the quotes carrying their name,
 * grouped case-insensitively, so there is no address book to keep up.
 *
 * Deliberately absent: contact details. `ClientsView` notes that the customers
 * table holds them but that the tab shows a name and a history on purpose, so
 * a line here about keeping numbers and addresses would be a claim the app
 * does not honour.
 */
const POINTS = [
  {
    title: "Nobody gets added",
    body:
      "A quote files itself under the name on it. Two spellings of the same " +
      "name are treated as one person, so the history is there before you " +
      "think to look for it.",
  },
  {
    title: "Their quotes, already open",
    body:
      "Each client sits above their own quotes rather than in front of them. " +
      "Nothing to tap through to see what you last charged this person.",
  },
  {
    title: "Who is worth chasing",
    body:
      "What you won, what is still waiting on an answer, and how often they " +
      "say yes, split by status in a single ring.",
  },
];

export function ClientsBand() {
  return (
    <Reveal stagger={0.08}>
      {/* A bottom rule only. The top one was drawn when this band followed the
          charcoal share band, where it fell on a dark ground and was never
          seen; with the features band above it now, it landed as a line across
          white between two sections that are meant to run together. */}
      <Section id="clients" className="scroll-mt-24 border-b border-line">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,36rem)_320px] lg:justify-center lg:gap-24">
          <div>
            <div data-reveal>
              <SectionHeading
                eyebrow="Your clients"
                eyebrowVariant="pill"
                title="The client list builds itself"
                lead="You never add anyone to it. Everyone you have quoted is already there, with everything you quoted them."
              />
            </div>

            <dl className="mt-12 space-y-8">
              {POINTS.map((point) => (
                <div key={point.title} data-reveal>
                  <dt className="text-xl">{point.title}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">
                    {point.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* The list itself, which is the claim: nobody was added to it. The
              hero shows one client's page, so the two frames are not the same
              picture. Dark, like the hero's second frame — the app follows the
              system appearance and the site shows both. */}
          <Parallax
            from={32}
            to={-32}
            className="mx-auto w-full max-w-[300px] lg:max-w-none"
          >
            {/* The entrance is on the inner element and the drift on the
                Parallax around it. One element cannot carry both: they would be
                two tweens writing `y`, and the scrubbed one would win. */}
            <div data-reveal>
              <PhoneFrame
                src="/phone/screen-client-list.png"
                alt="Verbal's client list in dark mode, each client opened out to the quotes made for them, marked accepted, declined and expired."
                sizes="(min-width: 1024px) 320px, 300px"
              />
            </div>
          </Parallax>
        </div>
      </Section>
    </Reveal>
  );
}
