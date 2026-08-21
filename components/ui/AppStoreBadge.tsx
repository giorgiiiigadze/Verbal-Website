import { APP_STORE_URL } from "@/content/site";
import { AppleMark } from "./AppleMark";
import { cn } from "@/lib/cn";

/**
 * The app has no App Store listing yet (`AppInfo.appStoreID` is nil), so there
 * is no URL to point at. Rather than ship a dead link, this renders a plain
 * "coming soon" plate until `APP_STORE_URL` is set — at which point it becomes
 * a real link with no other change.
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

  if (!APP_STORE_URL) {
    return (
      <span className={cn(classes, "cursor-default select-none")}>{inner}</span>
    );
  }

  return (
    <a
      href={APP_STORE_URL}
      className={cn(classes, "transition-opacity hover:opacity-90")}
    >
      {inner}
    </a>
  );
}

