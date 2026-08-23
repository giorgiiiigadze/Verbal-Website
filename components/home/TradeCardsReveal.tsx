"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The trades section's entrance, in place of the house `Reveal`.
 *
 * The house version fades six cards up together, which wastes the one thing
 * this section actually has: the coloured job chips. They are the argument -
 * the app already knows what your trade charges for - and they were arriving as
 * part of the card, too small to notice.
 *
 * So the two are split. A card lands first, empty of attention, and a beat
 * later its own chips pop in one at a time on a `back.out` curve, each starting
 * small and slightly rotated. Six cards each firing their own little burst
 * reads as a list filling itself in, and the eye is pulled across the grid
 * rather than at one block of fading.
 *
 * The per-card offset is computed rather than handed to `stagger` because the
 * chips have to be timed against their own card, not against the set.
 *
 * From-states are written at hydration by `fromTo`, which renders them
 * immediately even though the timeline waits on its ScrollTrigger. Nothing is
 * hidden in CSS, so a visitor with no JavaScript sees the finished section.
 */

/** Seconds between one card starting and the next. */
const CARD_STEP = 0.09;

/** How long after a card starts before its chips begin. */
const CHIP_DELAY = 0.3;

export function TradeCardsReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const heading = self.selector!("[data-trade-heading]");
      const cards = self.selector!("[data-trade-card]") as HTMLElement[];
      const foot = self.selector!("[data-trade-foot]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });

      tl.fromTo(
        heading,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      );

      cards.forEach((card, i) => {
        const at = 0.14 + i * CARD_STEP;

        tl.fromTo(
          card,
          { opacity: 0, y: 44, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
          at,
        );

        const chips = card.querySelectorAll("[data-trade-chip]");
        if (chips.length) {
          tl.fromTo(
            chips,
            { opacity: 0, scale: 0.6, rotate: -8 },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.5,
              // The overshoot is the point. Without it the chips just appear;
              // with it they read as being dropped in one by one.
              ease: "back.out(2.4)",
              stagger: 0.07,
            },
            at + CHIP_DELAY,
          );
        }
      });

      tl.fromTo(
        foot,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        // After the last card has landed, not after its chips: the link is a
        // way out of the section and should not be competing for the eye.
        0.14 + cards.length * CARD_STEP,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
