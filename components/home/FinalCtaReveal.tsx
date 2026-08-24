"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The closing band's arrival.
 *
 * The wordmark is the biggest thing on the site and the last thing on the page,
 * so it is scrubbed rather than played: it grows into place across exactly the
 * scroll that brings the band into view, and the reader is the one moving it.
 * A one-second entrance at that size lands like a slam; this reads as the page
 * settling on its own name.
 *
 * The range ends at `bottom bottom` — the band fully in the window — which is
 * always reached, because the footer's own height of scroll lies past it (see
 * FooterReveal). An end measured against the top of the window would not be:
 * this is the last section, and the page can run out before the band gets
 * anywhere near the top.
 *
 * The button underneath is not scrubbed. It is a thing to press, and a control
 * that fades under the finger reads as not ready yet.
 */
export function FinalCtaReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      // Honour the OS setting by leaving everything where the server put it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        self.selector!("[data-cta-mark]"),
        { opacity: 0.35, y: 56, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          // Linear: `scrub` does the smoothing, and an ease on top of the
          // scroll position would fight the finger.
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
      );

      gsap.fromTo(
        self.selector!("[data-cta-action]"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
