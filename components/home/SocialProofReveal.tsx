"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The social-proof band's entrance, and the marquee's on/off switch.
 *
 * Same arrangement as HeroReveal — a wrapper, so everything inside stays server
 * rendered and only the timeline ships — with one difference that matters: the
 * starting state is set here rather than in globals.css. The hero is on screen
 * at load and had to be hidden before the first paint; this band is below the
 * fold, so `fromTo` writing the from-state at hydration is early enough, and
 * nothing is left invisible if the script never runs.
 *
 * The band's own beat is slower and shorter than the hero's: it is read on the
 * way past, not looked at.
 */
export function SocialProofReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const band = root.current;
    if (!band) return;

    const ctx = gsap.context((self) => {
      const parts = self.selector!("[data-proof-reveal]");
      const [marquee] = self.selector!("[data-proof-marquee]") as HTMLElement[];

      // The strip is a CSS animation and stops itself under the OS setting (see
      // globals.css); only the scroll-driven part is skipped here.
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.fromTo(
          parts,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: band,
              // Fires once the band is a fifth of the way up the window, so the
              // motion happens in front of the reader rather than at the very
              // bottom edge where it would be missed.
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      // An off-screen marquee still animates, and an animating transform still
      // costs a compositing layer every frame. Park it whenever the band is not
      // on screen — including on first load, since the band starts below it.
      if (marquee) {
        marquee.style.animationPlayState = "paused";

        ScrollTrigger.create({
          trigger: band,
          start: "top bottom",
          end: "bottom top",
          onToggle: ({ isActive }) => {
            marquee.style.animationPlayState = isActive ? "running" : "paused";
          },
        });
      }
    }, root);

    return () => {
      // The play-state is a plain inline style rather than something GSAP owns,
      // so the context does not know to put it back.
      band
        .querySelectorAll<HTMLElement>("[data-proof-marquee]")
        .forEach((el) => (el.style.animationPlayState = ""));
      ctx.revert();
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
