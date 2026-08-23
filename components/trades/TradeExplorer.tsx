"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Mic, Tag } from "lucide-react";
import { TRADES } from "@/content/trades";

/**
 * The nine trades as one panel with a filter row, in place of nine cards.
 *
 * The grid it replaces was three screens of the same card, and the thing it
 * repeated forty-five times was a grey unit label. It sold a price list. The
 * product is a transformation, so the panel shows the transformation: the
 * sentence a trade would say on the left of the rule, the lines Verbal writes
 * from it underneath.
 *
 * The lower half is drawn as the app draws a rate card, checked against
 * Views/RateCard/RateCardView.swift and Views/Quotes/LineItemsCard.swift: a
 * header label in full ink over a divider, then rows carrying a small tinted
 * plate with a tag glyph, the job name at callout weight, and "per each" set
 * underneath it in the secondary tone. The unit sits under the name in the app
 * because it qualifies the job rather than competing with the number, and the
 * blue pills that were here before existed nowhere in the product.
 *
 * All nine panels are in the DOM and the inactive ones carry the `hidden`
 * attribute rather than being conditionally rendered, so every job name and
 * unit is still in the served HTML for a crawler. That is also why nothing
 * here sets a `display` utility on a panel root: a class would out-rank the
 * user-agent rule `[hidden] { display: none }` and the hidden panels would all
 * be visible at once.
 *
 * It is a real tablist. Arrow keys move, Home and End jump to the ends, and
 * tabindex roves so the row is one tab stop rather than nine.
 */

/**
 * The brand royal blue is written into the class strings below rather than
 * held in a constant and interpolated. Tailwind reads the source statically,
 * and a class assembled at runtime is never generated — the chip would come
 * out unstyled.
 */

export function TradeExplorer() {
  const [active, setActive] = useState(0);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = panels.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const panel = root.querySelector(`[data-panel="${active}"]`);
      if (!panel) return;

      gsap
        .timeline()
        .fromTo(
          panel.querySelector("[data-spoken]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.2, ease: "none" },
        )
        .fromTo(
          panel.querySelectorAll("[data-line]"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out", stagger: 0.03 },
          0.05,
        );
    }, panels);

    return () => ctx.revert();
  }, [active]);

  /** Automatic activation: for tabs, moving the focus is choosing the tab. */
  const move = (to: number) => {
    const next = (to + TRADES.length) % TRADES.length;
    setActive(next);
    chips.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") move(active + 1);
    else if (e.key === "ArrowLeft") move(active - 1);
    else if (e.key === "Home") move(0);
    else if (e.key === "End") move(TRADES.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div>
      {/* The mask fades the row's tail on a phone, where nine chips overflow
          and the cut edge would otherwise look like the list ends there. Off
          from `sm`, where they fit and a fade would be a lie. */}
      <div className="-mx-6 [mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] sm:mx-0 sm:[mask-image:none]">
        <div
          role="tablist"
          aria-label="Trades"
          onKeyDown={onKeyDown}
          className="flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {TRADES.map((trade, i) => (
            <button
              key={trade.slug}
              ref={(el) => {
                chips.current[i] = el;
              }}
              id={`trade-tab-${trade.slug}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`trade-panel-${trade.slug}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={
                i === active
                  ? "shrink-0 whitespace-nowrap rounded-full border border-[#305CDE] bg-[#305CDE] px-4 py-2 text-sm font-medium text-white"
                  : "shrink-0 whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm font-medium text-text transition-colors hover:border-text/25"
              }
            >
              {trade.name}
            </button>
          ))}
        </div>
      </div>

      <div ref={panels} className="mt-6 sm:mt-8">
        {TRADES.map((trade, i) => (
          <div
            key={trade.slug}
            data-panel={i}
            id={`trade-panel-${trade.slug}`}
            role="tabpanel"
            aria-labelledby={`trade-tab-${trade.slug}`}
            hidden={i !== active}
            className="mx-auto max-w-[720px] rounded-[var(--radius-card)] border border-line"
          >
            <div className="px-6 pb-6 pt-6 sm:px-8 sm:pb-7 sm:pt-8">
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <Mic aria-hidden="true" className="h-3.5 w-3.5" />
                You say
              </p>

              {/* The height is reserved rather than measured, and reserved per
                  breakpoint, because the measure changes with the panel: the
                  sentences run to two lines beside a 720px panel, three at
                  `sm`, and four at 390px where the text column is 294px wide.
                  One floor for all three either jumped on a phone or left a
                  hole on a laptop. */}
              <p
                data-spoken
                className="mt-3 min-h-[7.5rem] font-slab text-[18px] leading-relaxed sm:min-h-[6.5rem] sm:text-[20px] lg:min-h-[4.5rem]"
              >
                &ldquo;{trade.spoken}&rdquo;
              </p>
            </div>

            {/* The app's LineItemsCard header: full ink, semibold, with a
                divider under it doing the separating rather than a tint. */}
            <p className="border-t border-line px-6 py-3 text-sm font-semibold sm:px-8">
              Verbal writes
            </p>

            <ul className="border-t border-line px-6 sm:px-8">
              {trade.jobs.map((job) => (
                <li
                  key={job.name}
                  data-line
                  className="flex items-center gap-3 py-3.5"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-line bg-surface"
                  >
                    <Tag className="h-[15px] w-[15px]" />
                  </span>
                  <span className="block">
                    <span className="block text-[15px] font-medium">
                      {job.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-muted">
                      per {job.unit}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
