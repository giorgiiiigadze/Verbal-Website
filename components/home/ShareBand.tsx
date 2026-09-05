import { Section } from "@/components/layout/Section";
import { ShareReveal } from "@/components/home/ShareReveal";

/**
 * The share claim, and the thing the claim is about.
 *
 * What was here: the headline centred over three blank A4 pages fanned out on
 * the charcoal. Two problems with it, and the second is the serious one.
 *
 * The pages said nothing. They were a placeholder for artwork that does not
 * exist, and three empty white rectangles on a dark band read as a rendering
 * fault rather than as paper.
 *
 * And paper is the wrong picture. `content/features.ts` sells this exact
 * feature as "No app, no account, no PDF attachment" — the whole point of the
 * share link is that it is *not* a document you send someone. The band was
 * illustrating the thing the product deliberately does not do.
 *
 * So the artwork is now what the customer actually receives: a link, and the
 * page it opens, with the two buttons that are the answer coming back. Every
 * line in it traces to something. The quote is the one `QuotePreview` shows on
 * a white section (same job, same numbers, now fully priced), which is the job
 * the transcript in BlueBand describes, which is a real preset in
 * `content/trades`. Nothing here is invented for the picture.
 *
 * Two columns rather than one stack: the claim reads as a caption to the thing
 * beside it, and the band stops being a giant centred slab with an empty space
 * under it. Below `lg` it stacks, claim first.
 */

/**
 * The headline, split here rather than in the browser.
 *
 * ShareReveal lands it a word at a time, and the split has to exist in the
 * markup for that: rewriting a heading into spans after hydration means the
 * server's HTML and the client's disagree, and it is the one line on the page
 * most likely to be read by something that never runs the script.
 *
 * The spaces are their own text nodes, between the spans rather than inside
 * them — a trailing space in an inline-block is collapsed away, and the words
 * would set solid.
 */
const HEADLINE = ["Share", "your", "quotes", "anywhere"];

export function ShareBand() {
  return (
    <ShareReveal>
      <Section id="share" tone="charcoal" className="scroll-mt-24">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div>
            {/* Left-set now that there is something to its right. Centred, it
                was a headline balanced over its own composition; here it opens
                the column the paragraph continues. */}
            <h2 className="font-slab text-5xl leading-[1.05] tracking-tight sm:text-6xl">
              {HEADLINE.map((word, i) => (
                <span key={word}>
                  {i > 0 ? " " : null}
                  <span data-share-word className="inline-block">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Straight out of `content/features.ts`, which takes it from
                `Views/Quotes/ShareQuotePanel.swift`: a web link, opened on any
                phone, answered without an app, an account or an attachment. */}
            <p
              data-share-word
              className="mt-6 max-w-md text-lg leading-relaxed text-white/70"
            >
              A quote leaves the app as a web link, so it goes wherever a link
              goes: a text, an email, WhatsApp. Your customer opens it on any
              phone and accepts or declines. Nothing to install, no account to
              make, no attachment to open.
            </p>
          </div>

          <ShareCard />
        </div>
      </Section>
    </ShareReveal>
  );
}

/** The four lines of the example quote, and what they come to.
 *
 *  The same job `QuotePreview` shows, one step further on: there, the
 *  downlights are the row marked "Needs price", because that component exists
 *  to show the app refusing to guess. Here the tradesperson has priced them and
 *  sent it, which is why there is a total at all. 640 + 180 + 145 + 180 is the
 *  1,145 at the foot, and it is meant to stay that way. */
const LINES = [
  { name: "Replace consumer unit", qty: "1 job", price: "$640.00" },
  { name: "Add a double socket", qty: "2 each", price: "$180.00" },
  { name: "Chase in spur for oven", qty: "1 job", price: "$145.00" },
  { name: "Fire-rated downlights", qty: "6 each", price: "$180.00" },
];

/**
 * What lands on the customer's phone: the link, the page it opens, and the
 * answer going back.
 *
 * `aria-hidden`, and deliberately. It is a drawing of an interface, and the
 * accept and decline buttons are spans that do nothing — offering those to a
 * screen reader as controls would be a worse lie than leaving the picture out.
 * The claim itself is the paragraph beside it, in text, where it is read.
 *
 * White on the charcoal, because that is what it is: a web page, opened in a
 * browser, on a band that is not one. It is the only lit thing in the section.
 */
function ShareCard() {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
      {/* The link as it arrives. Monospaced and elided, so it reads as a URL
          without pretending to be one that resolves: the token is what makes a
          share link work, and printing a plausible one on a marketing page is
          asking for it to be typed in. */}
      <div
        data-share-link
        className="flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/70"
      >
        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#0098F2]" />
        <span className="truncate font-mono">theverbal.app/q/#2f9c…</span>
      </div>

      <div className="relative mt-4">
        <div
          data-share-sheet
          className="rounded-[var(--radius-card)] bg-card p-6 text-text shadow-[0_24px_60px_-30px_rgb(0_0_0/0.9)] sm:p-7"
        >
          <p className="text-sm text-muted">
            Kapanadze Electrical · Quote 0042
          </p>
          <p className="mt-1 font-slab text-lg leading-snug">
            Consumer unit and kitchen sockets
          </p>

          <div className="mt-5 space-y-3 border-t border-line pt-4">
            {LINES.map((line) => (
              <div
                key={line.name}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <span>
                  {line.name}
                  <span className="ml-2 text-muted">{line.qty}</span>
                </span>
                <span className="shrink-0 tabular-nums">{line.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <span className="text-sm text-muted">Total</span>
            <span className="font-slab text-xl tabular-nums">$1,145.00</span>
          </div>

          {/* The two answers. Accept carries the weight because it is the one
              being asked for; decline is a real option and is drawn as one, not
              greyed out into a dead end. */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <span className="rounded-[var(--radius-chip)] bg-primary py-2.5 text-center text-sm font-medium text-white">
              Accept
            </span>
            <span className="rounded-[var(--radius-chip)] border border-line py-2.5 text-center text-sm font-medium text-muted">
              Decline
            </span>
          </div>
        </div>

        {/* The answer coming back, in the app's own accepted colours. It hangs
            off the corner so it reads as landing on top of the sheet rather
            than as part of the page the customer is looking at. Clear of the
            two buttons on purpose: overlapping them would read as one of them
            having been pressed into this, which is a different picture. */}
        <div
          data-share-answer
          className="absolute -bottom-6 -right-3 flex items-center gap-2 rounded-full bg-accepted-fill px-4 py-2 text-sm font-semibold text-accepted shadow-[0_10px_30px_-12px_rgb(0_0_0/0.6)] sm:-right-4"
        >
          <CheckGlyph />
          Accepted, 9:41
        </div>
      </div>

      {/* Says what the picture is, and nothing else: the paragraph on the left
          has already said there is no app and no account, and a caption is a
          bad place to say a thing twice. */}
      <p className="mt-10 text-center text-sm text-white/45 lg:text-left">
        What your customer opens.
      </p>
    </div>
  );
}

/** A tick, drawn rather than imported: the house marks are ink drawings sized
 *  for a 40px slot on white, and this is 14px on a green chip. `currentColor`
 *  keeps it whatever the chip's text is. */
function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}
