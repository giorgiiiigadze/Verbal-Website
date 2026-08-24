"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The trades grid's entrance.
 *
 * Same arrangement as the other reveals — a wrapper, so everything inside stays
 * server rendered and only the timeline ships — and the same from-state rule:
 * written here at hydration rather than in globals.css, because the section is
 * below the fold and nothing should be left invisible if the script never runs.
 *
 * What the house `Reveal` cannot do is the grid, which is the whole reason this
 * exists. Six cards revealed in DOM order land as two rows sweeping left to
 * right, and the break between the rows is visible. `stagger.grid` makes GSAP
 * read the cards' laid-out positions instead and start the delay from the
 * top-left corner, so the wave crosses the block diagonally and re-lays itself
 * out at every breakpoint — three columns, two, or one — with no numbers here
 * to keep in step with the class list.
 *
 * The chips are a second, faster pass at a tenth of the size: they are the
 * argument of the section — real jobs the app already prices — and coming in
 * just behind their card is what makes them read as its contents rather than
 * as more of the same shape.
 */
export function TradeCardsReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      // Honour the OS setting by leaving everything where the server put it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          // A fifth of the way up the window, so the motion happens in front of
          // the reader rather than at the bottom edge where it is missed.
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        self.selector!("[data-trade-head]"),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 },
      )
        .fromTo(
          self.selector!("[data-trade-card]"),
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: { each: 0.07, from: "start", grid: "auto" },
          },
          // Absolute, not sequential: the first cards are already rising while
          // the heading settles, so the section arrives as one thing.
          0.12,
        )
        .fromTo(
          self.selector!("[data-trade-chip]"),
          { opacity: 0, y: 10, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.02 },
          0.4,
        )
        .fromTo(
          self.selector!("[data-trade-foot]"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.25",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
