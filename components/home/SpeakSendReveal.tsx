"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The entrance for the "Effortless quotes" block — headline, then the three
 * claims, then the phone, brought in one after another as the section arrives.
 *
 * Same wrapper-and-attribute arrangement as the other reveals: the markup stays
 * server rendered and only the timeline ships. The from-state is written here
 * with `fromTo` rather than in globals.css, because the block is below the fold
 * and nothing is left hidden if the script never runs.
 *
 * The phone in the right column carries `data-speak-reveal` too, for the
 * desktop case where motion is off and nothing travels into it. When the travel
 * does run, PhoneTravel has already hidden the frame and the travelling copy
 * lands in its place; the opacity this writes has simply settled to 1 by the
 * time the hand-off shows the real frame, so the two never fight. Below `lg`
 * the frame is not rendered and this selects the headline and the claims only.
 */
export function SpeakSendReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const band = root.current;
    if (!band) return;

    const ctx = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const parts = self.selector!("[data-speak-reveal]");

      gsap.fromTo(
        parts,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: band,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
