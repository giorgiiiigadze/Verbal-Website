"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The clients section's entrance, which is doing more work than the house
 * `Reveal` because the section is making a claim about behaviour rather than
 * stating a fact: the list builds itself.
 *
 * So the three points do not fade in together. They arrive one at a time from
 * the left on a `back.out` curve, each overshooting a few pixels and settling,
 * the way a row drops into a list that is filling up. The stagger is slow
 * enough to be read as three separate arrivals rather than one movement.
 *
 * The frame comes in tilted and straightens as it lands, then keeps drifting
 * on scroll. Two elements are involved because both are transforms and one
 * would overwrite the other: `data-clients-parallax` takes the scrub,
 * `data-clients-phone` the entrance.
 *
 * From-states are written at hydration by `fromTo`, which renders them
 * immediately even though the timeline waits on a ScrollTrigger. Nothing is
 * hidden in CSS, so a visitor with no JavaScript sees the finished section.
 */
export function ClientsReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const heading = self.selector!("[data-clients-heading]");
      const points = self.selector!("[data-clients-point]");
      const phone = self.selector!("[data-clients-phone]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 75%", once: true },
      });

      tl.fromTo(
        heading,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      )
        .fromTo(
          phone,
          { opacity: 0, y: 56, rotate: -4, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          // Alongside the heading, not after it: the frame is the slowest thing
          // here and would otherwise still be arriving once the points finish.
          0.05,
        )
        .fromTo(
          points,
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            // The overshoot is the whole idea. `power3.out` would have them
            // slide up and stop, which reads as three paragraphs appearing;
            // the small bounce reads as three rows landing in a list.
            ease: "back.out(1.7)",
            stagger: 0.14,
          },
          0.35,
        );

      // And once it has landed, the frame keeps moving with the page rather
      // than sitting still while the copy scrolls past it.
      gsap.to(self.selector!("[data-clients-parallax]"), {
        y: -48,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
