"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  ClientMark,
  DocumentMark,
  LinkMark,
  type Mark,
  TagMark,
} from "@/components/ui/marks";
import { NAV_ITEM } from "@/components/layout/navItem";
import { NAV_FEATURES } from "@/content/features";

/**
 * The header's Features item. It is a menu rather than a page: there is no
 * /features to send anyone to, and the four things below are each explained
 * somewhere that already exists.
 *
 * Hover opens it, because that is what the item is for, but hover is not the
 * only way in — the trigger is a real button, so a tap or a keypress toggles
 * it and Escape closes it. Nothing here is reachable by mouse alone.
 *
 * Closing is delayed by a moment, and the panel's own top padding bridges the
 * gap under the pill, so the pointer can travel from the word to the panel
 * without passing through dead space and dismissing it.
 *
 * The panel stays mounted and is faded with `autoAlpha`, which sets
 * `visibility` as well as opacity — that keeps it out of the accessibility
 * tree and off the tab order while closed, with no unmount to animate around.
 */

/** Icons live here rather than in content/features.ts, which is plain data.
 *  Exported because the mobile menu lists the same four rows.
 *
 *  Two of these are the marks the home page already uses for the same claims —
 *  the tag on "it never invents a price" and the link on "send a link, get an
 *  answer" — so the menu and the section agree rather than each having its own
 *  picture of the idea. */
export const ICONS: Record<string, Mark> = {
  quote: DocumentMark,
  rates: TagMark,
  clients: ClientMark,
  share: LinkMark,
};

/** Milliseconds the panel stays open after the pointer leaves it. */
const CLOSE_DELAY = 140;

export function FeaturesMenu() {
  const [open, setOpen] = useState(false);
  const item = useRef<HTMLLIElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<number | null>(null);

  const cancelClose = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const closeSoon = () => {
    cancelClose();
    timer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    gsap.to(el, {
      autoAlpha: open ? 1 : 0,
      y: open ? 0 : -6,
      duration: reduced ? 0 : 0.22,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [open]);

  useEffect(() => cancelClose, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <li
      ref={item}
      className="relative"
      // Mouse only. A tap synthesises a pointerenter, and opening on it would
      // race the click that is about to toggle the same menu shut.
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        closeSoon();
      }}
      // Tabbing out of the last link in the panel should close it, the same as
      // walking the pointer off it.
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="features-menu"
        onClick={() => setOpen((v) => !v)}
        // The same pill as its neighbours, and it stays lit while the panel is
        // open: the pointer is on the panel by then, not on the word, and an
        // item that goes cold under an open menu reads as having lost it.
        //
        // `cursor-pointer` because this is the one nav item that is a `button`
        // and not a link: a button gets the arrow by default, so without this
        // the pointer changes as it crosses from "Pricing" to "Features" and
        // the one item that opens something looks like the one that is dead.
        className={`cursor-pointer ${NAV_ITEM} ${open ? "bg-black/5" : ""}`}
      >
        Features
      </button>

      {/* `pt-4` rather than a margin: the padding is part of the item's hover
          area, so there is no gap between the word and the panel for the
          pointer to fall through. */}
      <div
        id="features-menu"
        ref={panel}
        className="invisible absolute left-1/2 top-full z-10 w-[min(23rem,calc(100vw-3rem))] -translate-x-1/2 pt-4 opacity-0"
      >
        <div className="rounded-[var(--radius-card)] border border-line bg-card p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-16px_rgba(0,0,0,0.28)]">
          <ul>
            {NAV_FEATURES.map((feature) => {
              const Icon = ICONS[feature.icon];
              return (
                <li key={feature.title}>
                  <Link
                    href={feature.href}
                    onClick={() => setOpen(false)}
                    className="flex gap-3 rounded-[14px] p-3 transition-colors hover:bg-[#FAFAFA]"
                  >
                    {/* No tile under the mark. The slot stays at 36px because
                        it is what holds the four rows to one left edge, and the
                        drawing grew into the room the tile was taking. */}
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center"
                    >
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className="block">
                      <span className="block text-sm font-semibold text-text">
                        {feature.title}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-muted">
                        {feature.body}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/#how"
            onClick={() => setOpen(false)}
            className="mt-1 block px-3 pb-1 pt-3 text-[13px] font-medium text-[#0098F2]"
          >
            See how the whole thing works →
          </Link>
        </div>
      </div>
    </li>
  );
}
