"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The trades marquee's entrance.
 *
 * Same arrangement as the other reveals — a wrapper, so everything inside stays
 * server rendered and only the timeline ships — and the same from-state rule:
 * written here at hydration rather than in globals.css, because the section is
 * below the fold and nothing should be left invisible if the script never runs.
 *
 * What the house `Reveal` cannot do is start the rows while the heading is
 * still settling, which is what keeps the section arriving as one thing rather
 * than as two.
 *
 * The rows are taken by their own wrapper and not by the track inside it. The
 * track is already being moved by the marquee's CSS animation, and a second
 * transform on the same element would be overwritten by it the moment the
 * next frame ran — the entrance would simply not play.
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
          self.selector!("[data-trade-row]"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          // Absolute, not sequential: the first row is already rising while the
          // heading settles, so the section arrives as one thing.
          0.12,
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
