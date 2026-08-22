"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The house scroll entrance, for sections that need nothing bespoke.
 *
 * Same arrangement as the hero and social-proof reveals — a wrapper, so
 * everything inside stays server rendered and only the timeline ships. It
 * animates every `data-reveal` descendant it finds, in DOM order.
 *
 * The from-state is written here at hydration rather than in globals.css. That
 * is safe because everything using this is below the fold, and it means a
 * visitor with no JavaScript sees the page exactly as the server sent it
 * rather than a column of invisible sections. `fromTo` renders its from-state
 * immediately even though the tween waits on a ScrollTrigger, which is what
 * stops a section showing and then blinking out as it is scrolled to.
 *
 * `stagger` is a prop because the right value depends on how many things are
 * being revealed: a heading and a button want the default, a six-card grid
 * wants less or the last card arrives long after the first is read.
 */
export function Reveal({
  children,
  stagger = 0.1,
}: {
  children: React.ReactNode;
  stagger?: number;
}) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      // Honour the OS setting by leaving everything where the server put it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        self.selector!("[data-reveal]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            // A fifth of the way up the window, so the motion happens in front
            // of the reader rather than at the bottom edge where it is missed.
            trigger: section,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [stagger]);

  return <div ref={root}>{children}</div>;
}
