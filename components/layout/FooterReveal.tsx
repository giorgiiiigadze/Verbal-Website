"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/**
 * The footer as a curtain behind the page.
 *
 * It is pinned to the bottom of the viewport for the whole scroll and painted
 * underneath `main`, which is opaque and sits a layer above it. So it is not
 * there — until the page runs out and the last screenful of content slides up
 * off it, uncovering the footer from the top down. The scroll room that reveal
 * needs is the footer's own height in the flow; nothing is added to the page.
 *
 * The pinning is applied here rather than in a class on purpose. Two reasons:
 *
 *   1. A footer taller than the viewport, pinned, would have its top edge above
 *      the top of the screen with no way to scroll to it — its content would be
 *      unreachable. So the curtain only engages when the footer fits, and this
 *      is re-checked on resize.
 *   2. Without JavaScript the footer stays an ordinary block at the end of the
 *      page. Nothing is hidden that cannot be un-hidden.
 *
 * GSAP's part is the depth: the footer's contents ride up and fade in across
 * the reveal, scrubbed to scroll position, so the footer reads as sitting
 * behind the page rather than being another panel below it.
 */
export function FooterReveal({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const footerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;
    const inner = innerRef.current;
    if (!footer || !inner) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let tween: gsap.core.Tween | null = null;

    const apply = () => {
      const fits = footer.offsetHeight <= window.innerHeight;

      footer.style.position = fits ? "sticky" : "";
      footer.style.bottom = fits ? "0" : "";
      footer.style.zIndex = fits ? "0" : "";

      if (fits && !reduced && !tween) {
        tween = gsap.fromTo(
          inner,
          { yPercent: 16, opacity: 0.35 },
          {
            yPercent: 0,
            opacity: 1,
            // Linear: the scroll position is the playhead, and `scrub` does the
            // smoothing. An ease on top would fight the finger.
            ease: "none",
            scrollTrigger: {
              // The reveal is exactly the last footer-height of the document.
              // Measured as functions so a resize or a late-loading image
              // re-derives them instead of animating against stale numbers.
              start: () => ScrollTrigger.maxScroll(window) - footer.offsetHeight,
              end: () => ScrollTrigger.maxScroll(window),
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      } else if (!fits && tween) {
        tween.scrollTrigger?.kill();
        tween.kill();
        tween = null;
        gsap.set(inner, { clearProps: "all" });
      }
    };

    apply();
    window.addEventListener("resize", apply);

    return () => {
      window.removeEventListener("resize", apply);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      gsap.set(inner, { clearProps: "all" });
      footer.style.position = "";
      footer.style.bottom = "";
      footer.style.zIndex = "";
    };
  }, []);

  // `overflow-clip`, because the parallax pushes the contents past the bottom
  // of the footer box mid-reveal, and a transformed child otherwise counts
  // towards the document's scrollable height — the very number the
  // ScrollTrigger window is measured from. Clipping keeps the page length fixed.
  return (
    <footer ref={footerRef} className={cn("overflow-clip", className)}>
      <div ref={innerRef}>{children}</div>
    </footer>
  );
}
