"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The header pill's hairline and shadow, on a layer of their own so they can be
 * faded rather than switched.
 *
 * At the top of a page the pill carries neither: it reads as part of the hero
 * it floats over. Once the page moves it needs an edge to sit against the
 * content sliding underneath, and that edge arrives over ~0.4s.
 *
 * Why a separate element: `ring` and `shadow` are both box-shadow, and a
 * box-shadow list cannot be tweened cleanly between "none" and two layers.
 * Fading one absolutely positioned overlay is one compositor-only property and
 * leaves the pill's own classes untouched.
 */

/** Pixels of scroll before the edge appears. Enough to ignore rubber-banding. */
const SHOW_AT = 8;

export function HeaderChrome() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // null until the first sync, so a page loaded already scrolled (a refresh
    // partway down, a #hash) starts with the edge on rather than fading it in.
    let shown: boolean | null = null;

    const sync = () => {
      const next = window.scrollY > SHOW_AT;
      if (next === shown) return;

      const first = shown === null;
      shown = next;

      gsap.to(el, {
        opacity: next ? 1 : 0,
        duration: first || reduced ? 0 : next ? 0.45 : 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 rounded-full opacity-0 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_10px_30px_-12px_rgba(0,0,0,0.18)] ring-1 ring-line"
    />
  );
}
