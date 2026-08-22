"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The steps section's entrance.
 *
 * Same arrangement as the other two reveals — a wrapper, so everything inside
 * stays server rendered and only the timeline ships. It animates two groups it
 * finds by attribute: `data-steps-phone` for the frame and `data-steps-reveal`
 * for the copy beside it, in DOM order.
 *
 * The from-states are set here rather than in globals.css, as with the
 * social-proof band: this section is below the fold, so `fromTo` writing them
 * at hydration is early enough, and nothing is left invisible if the script
 * never runs. `fromTo` renders its from-state immediately even though the
 * timeline waits on a ScrollTrigger — that is what stops the section showing
 * and then blinking out when it is scrolled to.
 *
 * The phone rises on the same curve as the hero's frames, and the steps land
 * one after another so the eye is walked down them in the order they are meant
 * to be read.
 */
export function StepsReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      // Honour the OS setting by leaving everything where the server put it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const phone = self.selector!("[data-steps-phone]");
      const copy = self.selector!("[data-steps-reveal]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          // A fifth of the way up the window, so the motion happens in front of
          // the reader rather than at the very bottom edge where it is missed.
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        phone,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1 },
      ).fromTo(
        copy,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        // Absolute, not sequential: the copy comes up alongside the frame
        // instead of waiting for it to finish.
        0.12,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
