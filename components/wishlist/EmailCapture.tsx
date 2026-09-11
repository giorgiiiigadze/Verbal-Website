"use client";

import { useActionState, useState } from "react";
import { subscribeToReleases, type SubscribeState } from "@/app/wishlist/actions";
import { Toast } from "@/components/ui/Toast";
import { HERO, LIMITS } from "@/content/wishlist";
import { cn } from "@/lib/cn";

const INITIAL: SubscribeState = { status: "idle" };

/**
 * The hero's one input. The field and button share one line at every width,
 * including phones, so the action reads as part of the input rather than as a
 * second detached control.
 *
 * The field is white and the button royal, inverting the page. On a royal
 * ground that pairing is what makes the control read as the one thing on the
 * screen to act on.
 */
export function EmailCapture() {
  const [state, action, pending] = useActionState(subscribeToReleases, INITIAL);
  const sent = state.status === "sent";

  // No "show the toast" state: a success is permanent here, because the form
  // disables itself once it has one, so the toast is simply rendered while the
  // action's result says sent and the reader has not sat it out yet.
  const [dismissed, setDismissed] = useState(false);

  return (
    // `mx-auto` because the hero's reveal wrapper around this is full width,
    // so the centring from the hero column does not reach the form itself.
    <form action={action} className="mx-auto mt-8 w-full max-w-md text-left">
      <div
        className={cn(
          "flex items-center gap-1.5 rounded-full bg-white p-1.5",
          "shadow-[0_14px_32px_-16px_rgb(0_0_0/0.5)]",
          "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-white",
        )}
      >
        <label htmlFor="hero-email" className="sr-only">
          {HERO.emailLabel}
        </label>
        <input
          id="hero-email"
          name="email"
          type="email"
          required
          maxLength={LIMITS.email}
          placeholder={HERO.emailPlaceholder}
          disabled={sent}
          className={cn(
            "w-full min-w-0 rounded-full bg-transparent py-1.5 pl-3 pr-1 text-sm text-text sm:pl-4",
            "placeholder:text-muted",
            "outline-none",
            "disabled:opacity-60",
          )}
        />

        {/* The honeypot: hidden from sight, from the tab order and from
            screen readers. Only something filling every input finds it. */}
        <div hidden aria-hidden="true">
          <label htmlFor="hero-website">Website</label>
          <input id="hero-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={pending || sent}
          className={cn(
            "shrink-0 rounded-full bg-royal-400 px-4 py-2.5 text-sm font-medium text-white transition-colors sm:px-5",
            "hover:bg-royal-500",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            "disabled:cursor-not-allowed disabled:opacity-60",
          )}
        >
          {sent ? HERO.sent : pending ? HERO.submitting : HERO.submit}
        </button>
      </div>

      {/* Errors stay here, next to the field that has to be corrected, which is
          where someone fixing one is already looking. Success has no such
          follow-up and gets the toast instead. The minimum height is kept so
          the reassurance line below does not jump when a message appears. */}
      <p aria-live="polite" className="mt-2 min-h-5 text-center text-[13px]">
        {state.status === "error" ? (
          <span className="font-medium text-[#ffb3b3]">{state.message}</span>
        ) : null}
      </p>

      {/* Its own live region, and the only announcement of a success now. */}
      {sent && !dismissed ? (
        <Toast message={HERO.sent} onClose={() => setDismissed(true)} />
      ) : null}
    </form>
  );
}
