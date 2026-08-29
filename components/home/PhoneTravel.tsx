"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PhoneFrame } from "@/components/ui/PhoneFrame";

gsap.registerPlugin(ScrollTrigger);

/**
 * The hero's quote phone, carried down into the section below on scroll.
 *
 * The trick is one fixed-position copy of the frame and two anchors that never
 * move on their own: `data-travel-anchor="hero"` (the left frame in the hero)
 * and `data-travel-anchor="section"` (the frame slot in "Effortless quotes").
 * Both real frames are hidden while the copy stands in for them, so their boxes
 * still reserve the same space and still report the same rects. Every frame the
 * copy is placed at a point interpolated between the two anchors' live
 * `getBoundingClientRect`s — read fresh, so scroll and resize both fall out for
 * free — and because a fixed element is positioned in those very coordinates,
 * at progress 0 it sits exactly on the hero frame and at 1 exactly on the
 * section frame. At the end the copy is swapped for the real section frame so
 * it scrolls away in normal flow rather than staying stuck to the glass.
 *
 * It runs on desktop only, and only when motion is welcome — below `lg` the
 * columns stack and a frame gliding across the stack would cross the copy it is
 * landing beside. Off the desktop query the two real frames simply show
 * themselves, unmoved, which is also the no-script and reduced-motion result.
 */
export function PhoneTravel({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const hero = el.querySelector<HTMLElement>('[data-travel-anchor="hero"]');
    const dock = el.querySelector<HTMLElement>('[data-travel-anchor="section"]');
    const traveler = el.querySelector<HTMLElement>("[data-travel-phone]");
    const inner = el.querySelector<HTMLElement>("[data-travel-inner]");
    if (!hero || !dock || !traveler || !inner) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        // Take both real frames out of sight; the fixed copy is the only frame
        // shown from here until the hand-off at the far end. `visibility`, not
        // `display`, so the boxes stay and the rects we measure are the real
        // resting positions.
        hero.style.visibility = "hidden";
        dock.style.visibility = "hidden";
        traveler.style.visibility = "visible";

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        // How high the copy is allowed to ride. The header is fixed, so its box
        // is already in the viewport coordinates the copy is positioned in and
        // is a constant between refreshes — read it rather than hard-coding the
        // pill's height, which is set in SiteHeader and would drift from a
        // number written here. The gap is the same breathing room the pill is
        // given above it.
        const HEADROOM = 20;
        let ceiling = 0;
        const measure = () => {
          const header = document.querySelector("header");
          ceiling = (header?.getBoundingClientRect().bottom ?? 76) + HEADROOM;
        };
        measure();

        const place = (t: number) => {
          const a = hero.getBoundingClientRect();
          const b = dock.getBoundingClientRect();

          // `scrub` lets the copy lag a fast flick, and the lag runs upward:
          // the hero anchor is off the top of the window while the progress
          // that carries the copy down to the dock is still catching up, so on
          // a hard scroll the frame rides up under the header. Hold it below
          // the pill instead — but never above where the dock itself is, so the
          // last frame of the journey is still exactly the dock and the hand-off
          // has nothing to jump over. Once the dock is the higher of the two the
          // clamp is a no-op, which is what keeps a short window honest.
          const floor = Math.min(ceiling, b.top);

          traveler.style.top = `${Math.max(lerp(a.top, b.top, t), floor)}px`;
          traveler.style.left = `${lerp(a.left, b.left, t)}px`;
          traveler.style.width = `${lerp(a.width, b.width, t)}px`;
        };

        // Docked = the journey is over: hand the fixed copy back to the real
        // frame in the section so the reader scrolls past a thing in the page,
        // not a thing pinned to the window.
        const dockTo = (docked: boolean) => {
          traveler.style.visibility = docked ? "hidden" : "visible";
          dock.style.visibility = docked ? "visible" : "hidden";
        };

        place(0);

        // The copy rises with the hero on load. The lift is on the inner element
        // so it never argues with the top/left the scrub writes on the fixed
        // wrapper — one owns position, the other owns the entrance.
        gsap.fromTo(
          inner,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            delay: 0.2,
            ease: "power3.out",
          },
        );

        ScrollTrigger.create({
          trigger: el,
          start: "top top",
          endTrigger: dock,
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => place(self.progress),
          onLeave: () => dockTo(true),
          onEnterBack: () => dockTo(false),
          // A resize recomputes the range; put the copy back where that leaves
          // it rather than wherever the last scroll frame did.
          onRefresh: (self) => {
            measure();
            const done = self.progress >= 1;
            dockTo(done);
            if (!done) place(self.progress);
          },
        });

        // matchMedia reverts the tween and the trigger; the plain inline styles
        // are ours to undo when the query stops matching.
        return () => {
          hero.style.visibility = "";
          dock.style.visibility = "";
          traveler.style.visibility = "hidden";
          traveler.style.top = "";
          traveler.style.left = "";
          traveler.style.width = "";
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      {children}
      {/*
        The travelling frame. Fixed, so it can slide over the page between
        the hero and the block it lands in; decorative, so it never eats a click
        — the real frames it stands in for carry the alt text. Hidden until the
        script places it, and only ever shown on the desktop query, so with no
        script or on a phone the real frames are what show.
      */}
      <div
        data-travel-phone
        aria-hidden="true"
        className="pointer-events-none fixed z-20"
        style={{ visibility: "hidden", top: 0, left: 0 }}
      >
        <div data-travel-inner>
          <PhoneFrame
            src="/phone/screen-quote.png"
            alt=""
            sizes="320px"
          />
        </div>
      </div>
    </div>
  );
}
