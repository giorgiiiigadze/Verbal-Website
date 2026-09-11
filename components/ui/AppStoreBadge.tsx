import { APP_CTA, APP_STORE_URL } from "@/content/site";
import { AppleMark } from "./AppleMark";
import { cn } from "@/lib/cn";

/**
 * The app has no App Store listing yet (`AppInfo.appStoreID` is nil), so there
 * is no store URL to point at. It stays a link either way: before launch it
 * goes to the release wishlist, which is where someone who wants the app can
 * actually do something about it. `APP_CTA` decides the target, so this badge
 * and every button on the site move together when the listing appears.
 *
 * Nothing renders this today. It is kept because the plate is drawn and the
 * listing is coming, not because something is waiting on it.
 */
export function AppStoreBadge({
  className,
  invert = false,
}: {
  className?: string;
  invert?: boolean;
}) {
  const inner = (
    <>
      <AppleMark />
      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-[0.12em] opacity-70">
          {APP_STORE_URL ? "Download on the" : "Coming soon to"}
        </span>
        <span className="block text-lg font-semibold">
          {APP_STORE_URL ? "App Store" : "iPhone"}
        </span>
      </span>
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-3 rounded-full px-5 py-3",
    invert
      ? "bg-white text-royal-700"
      : "bg-primary text-white",
    className,
  );

  return (
    <a
      href={APP_CTA.href}
      className={cn(classes, "transition-opacity hover:opacity-90")}
    >
      {inner}
    </a>
  );
}

