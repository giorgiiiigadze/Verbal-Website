"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { NAV_FEATURES } from "@/content/features";
import { NAV } from "@/content/site";
import { ICONS, TILE_TONES } from "@/components/layout/FeaturesMenu";

/**
 * The header's small-screen half: a burger, and the sheet it opens.
 *
 * The pill cannot hold five destinations and a CTA on a 375px phone, so below
 * `lg` the links come out of it entirely and live here instead. The four
 * feature rows come with them — the dropdown they normally sit in opens on
 * hover, which a phone does not have, so on a phone this is the only way to
 * reach them.
 *
 * The sheet sits at `z-40`, under the header's own `z-50`, on purpose: the
 * pill stays floating above it, so the burger is still there to close with and
 * the page does not appear to lose its header.
 *
 * It is mounted only while open. Unlike the desktop dropdown there is nothing
 * to fade out to — closing navigates or dismisses, and both want it gone at
 * once — so React can own the mounting and GSAP only handles the way in.
 *
 * The sheet is portalled to the body, and it has to be. The header pill it
 * would otherwise render inside carries `backdrop-blur`, and an element with a
 * backdrop-filter becomes the containing block for `position: fixed`
 * descendants — so `inset-0` resolved against the pill, and the sheet was
 * being clipped to a strip the height of the header with all of its content
 * pushed out of sight.
 */
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const sheet = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  // Closing on navigation is each link's own `onClick` rather than an effect
  // watching the pathname: a link to the page you are already on does not
  // change the pathname, and that is exactly the case that would strand the
  // sheet open over the content underneath it.

  useLayoutEffect(() => {
    const el = sheet.current;
    if (!el || !open) return;

    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline()
        .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: "none" })
        .fromTo(
          el.querySelectorAll("[data-menu-item]"),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            stagger: 0.045,
          },
          0.05,
        );
    }, sheet);

    return () => ctx.revert();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    // The sheet covers the page, so the page behind it should not scroll under
    // the finger. Restored exactly as found rather than set to a fixed value.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      trigger.current?.focus();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-text lg:hidden"
      >
        {open ? (
          <X aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Menu aria-hidden="true" className="h-5 w-5" />
        )}
      </button>

      {open
        ? createPortal(
            <div
              id="mobile-menu"
              ref={sheet}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="fixed inset-0 z-40 overflow-y-auto bg-[#0098F2]/16 px-6 pb-10 pt-24 backdrop-blur-2xl sm:px-10 lg:hidden"
            >
              <p
                data-menu-item
                className="mb-4 text-[16px] font-semibold capitalize text-royal-200"
              >
                Features
              </p>

              <ul className="space-y-1">
                {NAV_FEATURES.map((feature, i) => {
                  const Icon = ICONS[feature.icon];
                  return (
                    <li key={feature.title} data-menu-item>
                      <Link
                        href={feature.href}
                        onClick={() => setOpen(false)}
                        className="flex gap-3 rounded-[14px] py-2.5 transition-colors active:bg-surface"
                      >
                        <span
                          aria-hidden="true"
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-white ${TILE_TONES[i % TILE_TONES.length]}`}
                        >
                          <Icon className="h-[18px] w-[18px]" />
                        </span>
                        <span className="block">
                          <span className="block font-semibold text-text">
                            {feature.title}
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-muted">
                            {feature.body}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* The pages, set large. On a phone these are the thing being
                  reached for, so they get the size the feature rows do not. */}
              <ul className="mt-10 space-y-1 border-t border-line pt-6">
                {[{ href: "/how-it-works", label: "How it works" }, ...NAV].map(
                  (item) => (
                    <li key={item.href} data-menu-item>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 font-slab text-3xl tracking-tight"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
