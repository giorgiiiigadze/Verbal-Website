"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The share band's entrance: the claim, the link, the page it opens, and the
 * answer coming back.
 *
 * Same arrangement as the other reveals — a wrapper, so everything inside stays
 * server rendered and only the timeline ships — with two groups the house
 * `Reveal` has no way to express:
 *
 *   `data-share-word`  the headline, one word at a time. It is the largest type
 *                      on the page after the wordmark, and landing it in one
 *                      piece reads as a slab dropping in; a word at a time reads
 *                      as a sentence arriving. The words are split in the markup
 *                      rather than here, so the split survives without script
 *                      and no text is ever re-written after hydration.
 *
 *   `data-share-link`   the link chip, and
 *   `data-share-sheet`  the page it opens. They arrive in that order, which is
 *                      the order the thing happens in: the customer gets a
 *                      link, then a quote.
 *
 *   `data-share-answer` the accepted chip, scrubbed rather than played. It is
 *                      the reply coming back, so it is the one thing here tied
 *                      to the reader's own scroll rather than to a clock: it
 *                      arrives as they settle on the section, and it is
 *                      complete before the band is centred, so stopping there
 *                      shows an answer and not half of one.
 */

export function ShareReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      // Honour the OS setting by leaving everything where the server put it,
      // which is the finished picture: link, sheet and answer all in place.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const words = self.selector!("[data-share-word]");
      const link = self.selector!("[data-share-link]");
      const sheet = self.selector!("[data-share-sheet]");
      const answer = self.selector!("[data-share-answer]");

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
        words,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 },
      ).fromTo(
        [...link, ...sheet],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
        // Absolute, not sequential: the link and the sheet rise under the
        // headline while it is still landing rather than queueing behind the
        // last word.
        0.15,
      );

      // The reply, on the reader's own scroll. It comes in from under the sheet
      // it overlaps, which is the direction a notification arrives from.
      gsap.fromTo(
        answer,
        { opacity: 0, y: 18, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 40%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
