import { Section, SectionHeading } from "@/components/layout/Section";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ClientsReveal } from "@/components/home/ClientsReveal";

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
      "say yes, split by status in one bar.",
  },
];

export function ClientsBand() {
  return (
    <ClientsReveal>
      <Section className="border-y border-line">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,36rem)_320px] lg:justify-center lg:gap-24">
          <div>
            <div data-clients-heading>
              <SectionHeading
                eyebrow="Your clients"
                eyebrowTone="brand"
                title="The client list builds itself"
                lead="You never add anyone to it. Everyone you have quoted is already there, with everything you quoted them."
              />
            </div>

            <dl className="mt-12 space-y-8">
              {POINTS.map((point) => (
                <div key={point.title} data-clients-point>
                  <dt className="text-xl">{point.title}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">
                    {point.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Placeholder screen until a capture of the clients tab exists: the
              quote screen is at least the right app. Swap the src, and the
              alt with it. */}
          <div
            data-clients-parallax
            className="mx-auto w-full max-w-[300px] lg:max-w-none"
          >
            <div data-clients-phone>
              <PhoneFrame
                src="/phone/screen-list.png"
                alt="A client in Verbal, with the quotes made for them listed underneath."
                sizes="(min-width: 1024px) 320px, 300px"
              />
            </div>
          </div>
        </div>
      </Section>
    </ClientsReveal>
  );
}
