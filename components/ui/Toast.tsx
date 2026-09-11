"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckMark } from "@/components/ui/CheckMark";

type ToastProps = {
  message: string;
  /** Called once it has finished leaving, so the owner can stop rendering it. */
  onClose: () => void;
  /** Long enough to read a short line twice over. */
  duration?: number;
};

/**
 * The site's one toast. A white pill at the foot of the viewport, for the
 * outcome of an action that leaves no other trace on the page.
 *
 * Mounted and unmounted by its owner rather than held open by a prop: one
 * render is one toast, so it carries no "is it showing" state of its own and
 * cannot get stuck out of step with the thing it is announcing.
 *
 * Portalled to `document.body` rather than rendered where it is called. The
 * wishlist hero animates its children with transforms, and a transformed
 * ancestor makes `position: fixed` resolve against that ancestor instead of the
 * viewport, which would pin the toast inside the hero and let it scroll away.
 *
 * The entrance and exit are CSS (`.toast` in globals.css) so the global
 * reduced-motion rule collapses both without this file having to ask.
 */
export function Toast({ message, onClose, duration = 4500 }: ToastProps) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLeaving(true), duration);
    return () => window.clearTimeout(timer);
  }, [duration]);

  // A portal needs a document. Nothing renders this during SSR today, but a
  // caller that did would otherwise take the whole page down.
  if (typeof document === "undefined") return null;

  return createPortal(
    // The tray ignores pointer events so a toast at the foot of the screen
    // never swallows a click meant for whatever is under it.
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className="toast pointer-events-auto flex items-center gap-2.5 rounded-full bg-white px-5 py-3 text-sm font-medium text-text shadow-[0_18px_40px_-12px_rgb(0_0_0/0.45)]"
        data-leaving={leaving || undefined}
        // Fires for the entrance too, hence the guard: only the exit closes.
        onAnimationEnd={() => {
          if (leaving) onClose();
        }}
      >
        <span className="text-royal-400">
          <CheckMark />
        </span>
        {message}
      </div>
    </div>,
    document.body,
  );
}
