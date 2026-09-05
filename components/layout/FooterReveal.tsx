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
              // The reveal is the last footer-height of the document, and it
              // finishes a quarter of the way before the end of it.
              //
              // That quarter is the whole reason this is not a bug: the start
              // and end are absolute scroll positions, so being a few pixels
              // short of the bottom used to mean being a few percent short of
              // revealed — on a footer that is already fully in view, because
              // it is sticky. Landing near the bottom rather than exactly on it
              // is the normal result of a fast flick, and it left the footer
              // sitting there dimmed and shifted. Finishing early costs
              // nothing: the part of the footer that is still covered at that
              // point is behind `main`, which is opaque, so the reader cannot
              // see what it is being spent on.
              //
              // Measured as functions so a refresh re-derives them instead of
              // animating against stale numbers.
              start: () => ScrollTrigger.maxScroll(window) - footer.offsetHeight,
              end: () =>
                ScrollTrigger.maxScroll(window) - footer.offsetHeight * 0.25,
              // Short enough that a flick to the bottom settles in a blink,
              // long enough to still smooth a scroll wheel. At 0.6 a hard
              // scroll landed on a footer that then took most of a second to
              // arrive, which reads as the page still loading.
              scrub: 0.35,
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

    /*
      The other half of the same bug, and the half that made it stick.

      Both ends of the reveal are absolute scroll positions derived from the
      document height, and the document is not done growing when this is set
      up: a font swaps in and every paragraph re-wraps, an image below the fold
      arrives as the reader reaches it. ScrollTrigger refreshes itself on
      `load` and on resize, and neither of those fires for that. So the reader
      flicks to what is the bottom, the page grows underneath them, and the
      reveal's window is now somewhere below where they are standing — leaving
      the footer uncovered, sticky, and frozen at the 0.35 opacity it starts
      from. It never resolves, because nothing else moves.

      Watching the document's own box catches every cause of it at once, and
      the debounce keeps a run of changes to one refresh: ScrollTrigger.refresh
      re-measures every trigger on the page, so it is not a thing to do on each
      of thirty layout ticks.
    */
    let queued = 0;
    let lastHeight = document.documentElement.scrollHeight;
    const growth = new ResizeObserver(() => {
      // Height only. A ResizeObserver fires on width too, and width is already
      // the `resize` listener's business; more to the point, refreshing inside
      // an observer that a refresh could itself trip is how a loop starts.
      // Nothing here pins, so it does not today — this is what keeps that true
      // if something later does.
      const height = document.documentElement.scrollHeight;
      if (height === lastHeight) return;
      lastHeight = height;

      window.clearTimeout(queued);
      queued = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    });
    growth.observe(document.body);

    return () => {
      window.removeEventListener("resize", apply);
      growth.disconnect();
      window.clearTimeout(queued);
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
