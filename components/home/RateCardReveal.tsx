"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function RateCardReveal({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context((self) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // GSAP's selector helper deliberately returns an untyped target list;
      // these are DOM elements in this component, so make that boundary
      // explicit for strict TypeScript and for the DOM measurements below.
      const speech = self.selector!("[data-rate-speech]") as HTMLElement[];
      const cards = self.selector!("[data-rate-card]") as HTMLElement[];
      const speechStage = self.selector!(".rate-card-speech__stage")[0] as HTMLElement | undefined;
      if (!speechStage) return;
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        repeat: -1,
        repeatDelay: 1.4,
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
      const speechPositions: number[] = [];

      // Earlier lines clear the lead position first. The newest sentence then
      // settles at the bottom of the stack, leaving a calm spoken history
      // above it rather than a sequence of replacements.
      speech.forEach((line, index) => {
        const earlierLines = speech.slice(0, index);
        const lineHeight = line.getBoundingClientRect().height + 15;
        const leadPosition = speechStage.clientHeight - line.getBoundingClientRect().height;
        const beat = `rate-card-beat-${index}`;
        const letters = Array.from(line.querySelectorAll("[data-rate-letter]"));
        const accent = line.querySelector("[data-rate-accent]");

        // Store real destination positions instead of using relative `-=`
        // transforms. Relative values compound on an infinitely repeated GSAP
        // timeline, which is what previously collapsed the whole history into
        // one line after the section was revisited.
        speechPositions[index] = leadPosition;
        earlierLines.forEach((_, earlierIndex) => {
          speechPositions[earlierIndex] -= lineHeight;
        });

        // A deliberate breath between each pair, rather than one continuous
        // stagger: these are separate things the person said out loud.
        timeline.to({}, { duration: index === 0 ? 0.35 : 0.72 });
        timeline.addLabel(beat);
        timeline
          .fromTo(
            line,
            { opacity: 0, y: leadPosition + 10 },
            { opacity: 1, y: leadPosition, duration: 0.46, ease: "power2.out" },
            index === 0 ? beat : `${beat}+=0.74`,
          )
          .fromTo(
            letters,
            { opacity: 0, y: 5, filter: "blur(3px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.3, stagger: 0.025, ease: "power2.out" },
            index === 0 ? `${beat}+=0.08` : `${beat}+=0.8`,
          )
          .fromTo(
            accent,
            { opacity: 0, scale: 0.5 },
            { opacity: 1, scale: 1, duration: 0.36, ease: "back.out(2)" },
            index === 0 ? `${beat}+=0.08` : `${beat}+=0.8`,
          )
          .fromTo(
            cards[index],
            { opacity: 0, x: 56, y: 24, rotate: 2.5, scale: 0.96 },
            { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, duration: 0.64 },
            index === 0 ? `${beat}+=0.9` : `${beat}+=1.62`,
          );

        // Four visible layers give the stack its depth. Anything older only
        // turns the top edge into visual noise and starts climbing into the
        // transcript, so it dissolves as the fifth card takes its place.
        if (index >= 4) {
          timeline.to(
            cards[index - 4],
            { opacity: 0, y: -10, duration: 0.42, ease: "power2.in" },
            index === 0 ? `${beat}+=1.6` : `${beat}+=2.32`,
          );
        }

        earlierLines.forEach((earlierLine, earlierIndex) => {
          // The line nearest the new one stays readable; each older line
          // recedes another step, just like the reference's transcript stack.
          const distanceFromLead = index - earlierIndex;
          timeline.to(
            earlierLine,
            {
              y: speechPositions[earlierIndex],
              opacity: Math.max(0, 0.82 - distanceFromLead * 0.2),
              duration: 0.72,
              ease: "power2.inOut",
            },
            beat,
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      <noscript>
        <style>{`[data-rate-speech],[data-rate-card]{opacity:1!important}`}</style>
      </noscript>
      {children}
    </div>
  );
}
