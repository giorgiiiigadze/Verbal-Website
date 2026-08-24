"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The share band's entrance, and the fan of the pages beside it.
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
 *   `data-share-page`  the three pages, scrubbed rather than played. They start
 *                      square on top of each other and open into the fan the
 *                      stylesheet already describes, so the pile spreads under
 *                      the reader's own scroll — the one gesture in the section
 *                      that is theirs and not ours.
 *
 * The fan's from-state is a counter-rotation, not a rotation: the outer element
 * of each page carries the final angle as a Tailwind class, and this turns the
 * inner one the opposite way to cancel it. That keeps the resting fan in CSS,
 * where it belongs and where it stays without JavaScript, and means nothing
 * here has to agree with a number written in the markup.
 */

/** Per page, in DOM order: the turn that cancels its class, and how far in from
 *  its resting place it starts. The centre page only rises. */
const COLLAPSED = [
  { rotation: 6, x: 46, y: 26 },
  { rotation: -6, x: -46, y: 26 },
  { rotation: 0, x: 0, y: 0 },
];

export function ShareReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      // Honour the OS setting by leaving everything where the server put it —
      // which for the pages is the fan, already open.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const words = self.selector!("[data-share-word]");
      const chips = self.selector!("[data-share-chip]");
      const stack = self.selector!("[data-share-stack]");
      const pages = self.selector!("[data-share-page]");

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
      )
        .fromTo(
          chips,
          { opacity: 0, y: 16, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07 },
          // Absolute, not sequential: the chips come up under the headline
          // while it is still landing rather than queueing behind the last word.
          0.3,
        )
        .fromTo(
          stack,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.15,
        );

      // The pile opens on scroll, over the stretch between the section
      // appearing and it sitting properly in the window — finished before it is
      // centred, so a reader who stops there sees the fan and not a half-turn.
      gsap.fromTo(
        pages,
        {
          rotation: (i: number) => COLLAPSED[i]?.rotation ?? 0,
          x: (i: number) => COLLAPSED[i]?.x ?? 0,
          y: (i: number) => COLLAPSED[i]?.y ?? 0,
          scale: 0.94,
        },
        {
          rotation: 0,
          x: 0,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 35%",
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
