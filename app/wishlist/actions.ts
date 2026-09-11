"use server";

import { headers } from "next/headers";
import { DuplicateRow, insertInto } from "@/lib/supabase";
import { LIMITS } from "@/content/wishlist";

export type SubscribeState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "error"; message: string };

/** Whoever the edge saw. Vercel sets `x-forwarded-for` and puts the client
 *  first; behind nothing at all there is no header and the column goes null,
 *  which the rate-limit trigger treats as "cannot say" and lets through. */
async function callerIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || h.get("x-real-ip")?.trim();
  return ip || null;
}

/** Enough to catch a typo. Anything stricter rejects real addresses, and a
 *  wrong one costs a missed email and nothing else. */
function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Takes one release-notification signup from the hero.
 *
 * There is no authentication here on purpose: the page is open to anyone, and
 * the table it writes to is insert-only under RLS with no select policy, so
 * the worst a direct POST can do is add an address nobody can read back. What
 * guards it is the shape of the row (a CHECK on length and lowercasing) and
 * the per-IP trigger in the database.
 */
export async function subscribeToReleases(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  // The honeypot. A real person never sees that field, so anything in it came
  // from something filling every input on the page. Answered with success: a
  // bot told it failed tries again, and a bot told it worked goes away.
  if (field(formData, "website")) return { status: "sent" };

  // Lowercased here because the column's CHECK insists on it, which is what
  // lets a plain UNIQUE constraint do the de-duplicating.
  const email = field(formData, "email").toLowerCase();

  if (!email) {
    return { status: "error", message: "Put an email in first." };
  }
  if (email.length > LIMITS.email || !looksLikeEmail(email)) {
    return { status: "error", message: "That email address does not look right." };
  }

  try {
    await insertInto("wishlist_subscribers", {
      email,
      source_ip: await callerIp(),
    });
  } catch (error) {
    // Already on the list is the outcome they wanted. Saying so would also
    // tell a stranger whether an address is stored, which is a disclosure
    // with no upside.
    if (error instanceof DuplicateRow) {
      // Silent to the visitor, but not to the terminal: a duplicate is the
      // one outcome that looks identical to a success and writes no row, so
      // without this line a re-test reads as a lost signup.
      console.info("wishlist: already subscribed, nothing written");
      return { status: "sent" };
    }

    const text = error instanceof Error ? error.message : String(error);

    if (text.includes("too many signups from this address")) {
      return {
        status: "error",
        message: "That is a few in a row. Give it an hour.",
      };
    }

    console.error("wishlist: signup failed", error);
    return {
      status: "error",
      message: "That did not send. Try again in a moment.",
    };
  }

  return { status: "sent" };
}
