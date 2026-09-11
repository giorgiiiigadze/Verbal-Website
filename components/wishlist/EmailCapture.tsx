"use client";

import { useActionState, useState } from "react";
import { subscribeToReleases, type SubscribeState } from "@/app/wishlist/actions";
import { Toast } from "@/components/ui/Toast";
import { HERO, LIMITS } from "@/content/wishlist";
import { cn } from "@/lib/cn";

const INITIAL: SubscribeState = { status: "idle" };

/**
 * The hero's one input. A single field and a button on one line at `sm` and
 * up, stacked below it, which is the only arrangement that survives a 375px
 * phone without the button turning into a sliver.
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
          "flex flex-col gap-3 sm:flex-row sm:items-center",
          // One rounded shell holding both controls at `sm`, rather than two
          // pills with a gap between them. Padding on the shell is what gives
          // the button its inset, so the two never drift apart.
          "sm:gap-1.5 sm:rounded-full sm:bg-white sm:p-1.5",
          "sm:shadow-[0_14px_32px_-16px_rgb(0_0_0/0.5)]",
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
            "w-full min-w-0 rounded-full bg-white px-4 py-3 text-sm text-text",
            "placeholder:text-muted",
            "outline-none focus:outline-2 focus:outline-offset-2 focus:outline-white",
            // Inside the shell the field is already on white, so it drops its
            // own ring and lets the shell hold the shape.
            "sm:bg-transparent sm:py-1.5 sm:pl-4 sm:focus:outline-offset-0",
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
            "shrink-0 rounded-full px-5 py-3 text-sm font-medium transition-colors",
            // Two grounds, so two buttons. Below `sm` there is no white shell:
            // the button sits straight on the royal page, where a royal fill is
            // the page's own colour and the control disappears. It is white
            // there, and only becomes royal once it is inside the white pill.
            "bg-white text-royal-400 hover:bg-tint",
            "sm:bg-royal-400 sm:text-white sm:hover:bg-royal-500",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            "sm:py-2.5",
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
