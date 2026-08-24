"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The house parallax: a drift tied to scroll position rather than to an
 * entrance.
 *
 * The reveals elsewhere play once and stop; this one has no beginning or end of
 * its own — the scroll position is the playhead for the whole time the element
 * is on screen, which is what makes a picture read as sitting behind the page
 * rather than on it. Layout never moves, because all of it is transform.
 *
 * Two elements, not one: the outer div is the trigger and the inner one is
 * what moves. Measuring a trigger that is itself being translated means the
 * start and end points shift under the very tween reading them, which shows up
 * as jitter on a slow scroll.
 *
 * `className` lands on the outer div, so a caller can hand it the grid or flex
 * placement the wrapped element used to hold itself.
 *
 * Anything with an entrance of its own should be a child of this rather than
 * the thing passed to it: two tweens writing `y` on one element fight, and the
 * scrubbed one wins.
 */
export function Parallax({
  from = 30,
  to = -30,
  className,
  children,
}: {
  /** Offset in px when the element enters at the bottom of the window. */
  from?: number;
  /** Offset in px when it leaves at the top. Negative drifts it upward. */
  to?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const trigger = root.current;
    const el = inner.current;
    if (!trigger || !el) return;

    const ctx = gsap.context(() => {
      // Honour the OS setting by leaving everything where the server put it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        el,
        { y: from },
        {
          y: to,
          // Linear: scroll position is the playhead and `scrub` does the
          // smoothing. An ease on top would fight the finger.
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            // Re-measured on resize and after late-loading images, rather than
            // drifting against numbers taken before the page settled.
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, [from, to]);

  return (
    <div ref={root} className={className}>
      <div ref={inner}>{children}</div>
    </div>
  );
}
