import { APP_STORE_URL } from "@/content/site";
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
    "inline-flex items-center gap-3 rounded-[var(--radius-chip)] px-5 py-3",
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

function AppleMark() {
  return (
    <svg
      viewBox="0 0 384 512"
      aria-hidden="true"
      className="h-7 w-7 shrink-0 fill-current"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}
