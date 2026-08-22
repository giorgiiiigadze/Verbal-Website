"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The hero's entrance.
 *
 * A wrapper rather than a rewrite of Hero: everything inside stays server
 * rendered, and this ships only the timeline. It animates two groups it finds
 * by attribute — `data-hero-reveal` for the text column, in DOM order, and
 * `data-hero-phone` for the device frames.
 *
 * The starting state lives in globals.css, not here. The markup arrives from
 * the server already painted, so anything JavaScript hid would show for a frame
 * and then blink out; the stylesheet holds those elements at `opacity: 0` and
 * GSAP's inline styles take over from the first frame after hydration.
 *
 * Restraint is the whole effect: 20px of travel, a little blur burning off, and
 * a fast-out curve so the motion is nearly finished before it is noticed.
 */
export function HeroReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const text = self.selector!("[data-hero-reveal]");
      const phones = self.selector!("[data-hero-phone]");

      // Honour the OS setting by landing on the end state without playing it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([...text, ...phones], { opacity: 1, clearProps: "filter" });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.06,
        // blur() leaves a compositing layer behind; nothing after the entrance
        // needs one. Opacity and transform stay inline — clearing opacity would
        // hand the element back to the stylesheet rule that hides it.
        onComplete: () => gsap.set(text, { clearProps: "filter" }),
      });

      tl.fromTo(
        text,
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.08 },
      ).fromTo(
        phones,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12 },
        // Absolute, not sequential: the frames rise alongside the copy instead
        // of waiting for it, and both groups settle on the same beat.
        0.15,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <noscript>
        <style>{`[data-hero-reveal],[data-hero-phone]{opacity:1!important}`}</style>
      </noscript>
      {children}
    </div>
  );
}
