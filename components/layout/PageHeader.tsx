import { cn } from "@/lib/cn";
import { Container } from "./Container";

/** Pale royal is the house banner; `plain` drops it for pages that would
 *  rather open on the page's own white. */
const tones = {
  tint: "bg-tint",
  plain: "bg-bg",
} as const;

/** `lg` only grows from `sm` up, the same rule the hero CTA follows: at 60px a
 *  sentence-length title turns into four ragged lines on a 375px phone. */
const titleSizes = {
  md: "text-4xl sm:text-5xl",
  lg: "text-4xl sm:text-6xl",
} as const;

/** The banner every inner page opens with. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  tone = "tint",
  align = "left",
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  tone?: keyof typeof tones;
  align?: "left" | "center";
  size?: keyof typeof titleSizes;
}) {
  const centred = align === "center";

  return (
    <div className={cn("border-b border-line", tones[tone])}>
      <Container
        className={cn("pb-16 pt-28 sm:pb-20 sm:pt-32", centred && "text-center")}
      >
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-text">
            {eyebrow}
          </p>
        ) : null}
        {/* The measures stay whatever the alignment: centred text still reads
            badly past ~3xl, it just needs the leftover space split in two. */}
        <h1
          className={cn(
            "max-w-3xl font-slab leading-tight",
            titleSizes[size],
            centred && "mx-auto",
          )}
        >
          {title}
        </h1>
        {lead ? (
          <p
            className={cn(
              "mt-5 max-w-2xl text-lg leading-relaxed text-muted",
              centred && "mx-auto",
            )}
          >
            {lead}
          </p>
        ) : null}
      </Container>
    </div>
  );
}
