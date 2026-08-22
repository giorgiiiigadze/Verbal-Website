import { cn } from "@/lib/cn";
import { Container } from "./Container";

/** A vertical band of the page. `tone` picks the background from the theme
 *  tokens so sections alternate without each one inventing its own colour. */
export function Section({
  tone = "bg",
  className,
  containerClassName,
  children,
  id,
}: {
  tone?: "bg" | "alt" | "surface" | "tint" | "royal";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const tones = {
    bg: "bg-bg",
    alt: "bg-bg-alt",
    surface: "bg-surface",
    tint: "bg-tint",
    royal: "bg-royal-600 text-white",
  } as const;

  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", tones[tone], className)}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** The heading block that opens most sections. */
/** The eyebrow's colour. A prop rather than a className override because `cn`
 *  is a plain join and two text-colour utilities would race. `brand` is
 *  RoyalBlue200, the lightest of the ramp that still holds on white. */
const eyebrowTones = {
  muted: "text-[#8D8D8D]",
  brand: "text-royal-200",
} as const;

export function SectionHeading({
  eyebrow,
  eyebrowTone = "muted",
  title,
  lead,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  eyebrowTone?: keyof typeof eyebrowTones;
  title: string;
  lead?: string;
  align?: "left" | "center";
  invert?: boolean;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-[16px] font-semibold capitalize",
            invert ? "text-royal-100" : eyebrowTones[eyebrowTone],
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl leading-tight sm:text-4xl">{title}</h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            invert ? "text-white/75" : "text-muted",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
