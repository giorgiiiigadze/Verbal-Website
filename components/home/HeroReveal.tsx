"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The hero's entrance.
 *
 * A wrapper rather than a rewrite of Hero: everything inside stays server
 * rendered, and this ships only the timeline. It animates three groups it finds
 * by attribute — `data-hero-reveal` for the text column, in DOM order,
 * `data-hero-phone` for the device frames, and `data-hero-parallax` for the
 * frames' drift as the hero scrolls away.
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

      // The frames drift up a little faster than the page as the hero leaves,
      // which reads as depth without moving anything in layout. The second one
      // travels further than the first, so the gap between them opens on the
      // way out rather than the pair sliding as a block.
      //
      // Upward on purpose: drifting them down would carry them over the band
      // below, which is the same white and would look like a bleed.
      const drift = [-30, -60];

      self.selector!("[data-hero-parallax]").forEach(
        (el: HTMLElement, i: number) => {
          gsap.to(el, {
            y: drift[i] ?? drift[drift.length - 1],
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        },
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
