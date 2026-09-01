"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * The steps section's entrance, and the sequence it plays once it is there.
 *
 * Same arrangement as the other reveals — a wrapper, so everything inside
 * stays server rendered and only the timeline ships. The entrance animates two
 * groups it finds by attribute: `data-steps-phone` for the frame and
 * `data-steps-reveal` for the copy beside it, in DOM order.
 *
 * The from-states are set here rather than in globals.css: this section is
 * below the fold, so `fromTo` writing them at hydration is early enough, and
 * nothing is left invisible if the script never runs. `fromTo` renders its
 * from-state immediately even though the timeline waits on a ScrollTrigger —
 * that is what stops the section showing and then blinking out when it is
 * scrolled to.
 *
 * On top of that, the section reads itself: one step at a time is held at full
 * strength while the other two drop back, and the frame beside them shows that
 * step's screen.
 *
 * Where there is room for it the section is pinned. It comes to rest under the
 * header, the page stops while the three steps are gone through, and then it
 * releases and the page carries on. The scroll that would have moved the page
 * moves the sequence instead, which is the only way three steps at their
 * natural spacing get a third of the reader's attention each rather than
 * passing in half a window. `+=180%` is that held distance: a little over half
 * a window of scrolling per step. Longer and the page feels stuck; shorter and
 * the last step is gone before it has been read.
 *
 * The whole sequence is `lg` and up. It exists to point a single shared frame
 * at whichever step is being read, and below `lg` there is no shared frame to
 * point — Steps gives each step its own screen there, so there is nothing to
 * crossfade and nothing the dimming could be tracking. Running it anyway is
 * worse than not: on a phone the section is about 1600px of steps read against
 * a scrub divided into equal thirds, so a reader would meet steps greyed to 30%
 * with no way to tell what had greyed them.
 *
 * Pinning is conditional within that. A pinned element taller than the window
 * is one whose bottom can never be scrolled to — which is why the frame is
 * sized in `svh` rather than pixels, so the block fits whatever window it is
 * given and the height threshold can be a floor rather than a guess at laptop
 * sizes. On a window wide enough but too short to be worth holding, the
 * sequence still runs and the page is never held: the same three phases are
 * read off the section's own travel through the window instead.
 *
 * Reduced motion opts out of both and leaves the state the server sent: three
 * steps at full strength and the first screen. Nothing here ever holds a
 * reader who has asked for less movement.
 *
 * GSAP re-runs the block below whenever any of its conditions changes, so a
 * resize across either threshold tears the old arrangement down and builds the
 * right one.
 *
 * The entrance and the sequence never write to the same element. The entrance
 * owns the inner `[data-steps-reveal]` div and the `[data-steps-phone]` stack;
 * the sequence owns the `[data-step]` list items and the `[data-step-screen]`
 * frames inside that stack. Nested opacities multiply, so a step can be
 * arriving and dimmed at once — on one element the entrance would simply
 * overwrite the dim as the section came in.
 */
export function StepsReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      // Honour the OS setting by leaving everything where the server put it.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const phone = self.selector!("[data-steps-phone]");
      const copy = self.selector!("[data-steps-reveal]");

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          // A fifth of the way up the window, so the motion happens in front of
          // the reader rather than at the very bottom edge where it is missed.
          trigger: section,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        phone,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1 },
      ).fromTo(
        copy,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        // Absolute, not sequential: the copy comes up alongside the frame
        // instead of waiting for it to finish.
        0.12,
      );
    }, root);

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        // The sequence's own floor: below this there is no shared frame for it
        // to drive. `roomy` is the narrower question of whether to pin.
        wide: "(min-width: 1024px)",
        roomy: "(min-width: 1024px) and (min-height: 640px)",
      },
      (context) => {
        const { motion, wide, roomy } = context.conditions as {
          motion: boolean;
          wide: boolean;
          roomy: boolean;
        };
        if (!motion || !wide) return;

        const steps = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-step]"),
        );
        const screens = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll("[data-step-screen]"),
        );
        if (!steps.length || !screens.length) return;

        // -1 so the first call always runs. Guarding on the current index is
        // what keeps `onUpdate`, which fires on every scroll frame, from
        // restarting a crossfade that is already where it is going.
        let current = -1;

        const focus = (i: number) => {
          if (i === current) return;
          current = i;

          gsap.to(steps, {
            opacity: (idx: number) => (idx === i ? 1 : 0.3),
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(screens, {
            opacity: (idx: number) => (idx === i ? 1 : 0),
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
          // The frames are stacked, so the two that are faded out are still in
          // the accessibility tree and still have their descriptions read.
          screens.forEach((screen, idx) =>
            screen.setAttribute("aria-hidden", String(idx !== i)),
          );
        };

        ScrollTrigger.create({
          trigger: section,
          // Pinned, it comes to rest centred in the window rather than hung
          // from the top. The block is about 810px tall and the frame is the
          // full height of it, so resting at the top left the phone running off
          // the bottom of a window it very nearly fills — centred, the whole
          // frame is in view for the whole hold. Unpinned, the span is simply
          // where the block is being read.
          start: roomy ? "center center" : "top 65%",
          end: roomy ? "+=180%" : "bottom 40%",
          pin: roomy,
          // The pin is taken a frame early, which is what stops the section
          // jumping by a scroll tick as it is caught.
          anticipatePin: roomy ? 1 : 0,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            focus(
              Math.min(
                steps.length - 1,
                Math.floor(self.progress * steps.length),
              ),
            );
          },
        });

        focus(0);

        // Reverted on the way out: the dimming and the crossfade are undone, so
        // the steps and the first frame are left as the server wrote them.
        return () => {
          gsap.set(steps, { clearProps: "opacity" });
          gsap.set(screens, { clearProps: "opacity" });
        };
      },
    );

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return <div ref={root}>{children}</div>;
}
