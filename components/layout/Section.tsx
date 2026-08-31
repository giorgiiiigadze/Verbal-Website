import { cn } from "@/lib/cn";
import { Container, type ContainerSize } from "./Container";

/** A vertical band of the page. `tone` picks the background from the theme
 *  tokens so sections alternate without each one inventing its own colour;
 *  `size` is the Container width, so a section that has to line up with the
 *  hero and the header pill can ask for `wide` rather than rebuilding the
 *  gutter by hand. */
export function Section({
  tone = "bg",
  size = "default",
  className,
  containerClassName,
  children,
  id,
}: {
  tone?: "bg" | "alt" | "surface" | "tint" | "royal" | "charcoal";
  size?: ContainerSize;
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
    // The site's one dark band, used by every full-width dark section. It was
    // MainText (#37352f) turned into a background, which carried that colour's
    // brown cast across a whole band; #292929 is flatter and a shade cooler.
    // Anything inside it that was drawn for white has to be inverted by hand —
    // see ShareBand's chips.
    charcoal: "bg-charcoal text-white",
  } as const;

  return (
    <section
      id={id}
      className={cn("py-14 sm:py-20", tones[tone], className)}
    >
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
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

/** The title's face. Roboto Slab everywhere by default, since a bare h2 picks
 *  it up from the base rule in globals.css. `sans` is for the sections that
 *  want the plainer voice — a class rather than a wrapper because the base
 *  rule targets the h2 itself and would win over anything inherited. */
const titleFonts = {
  slab: "",
  sans: "font-sans",
} as const;

export function SectionHeading({
  eyebrow,
  eyebrowTone = "muted",
  eyebrowVariant = "text",
  title,
  titleFont = "slab",
  lead,
  align = "left",
  invert = false,
}: {
  eyebrow?: string;
  eyebrowTone?: keyof typeof eyebrowTones;
  /** `pill` is the hero's announcement badge, borrowed for a section that
   *  should open with something to look at rather than a line of small type.
   *  `eyebrowTone` does not apply to it — the pill carries its own colour. */
  eyebrowVariant?: "text" | "pill";
  title: string;
  titleFont?: keyof typeof titleFonts;
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
        eyebrowVariant === "pill" ? (
          // The light blue at a tenth, with the full-strength blue on top —
          // the same wash MobileMenu fills its sheet with, rather than a new
          // colour. Tinted rather than solid on purpose: a filled blue pill
          // this size sits where a heading is about to start and reads as a
          // button that does not respond. The `p` keeps the block-level
          // spacing and the centring, so only the span is the badge.
          <p className={cn("mb-5", align === "center" && "text-center")}>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-semibold capitalize",
                invert
                  ? "bg-white/15 text-white"
                  : "bg-[#0098F2]/10 text-[#0098F2]",
              )}
            >
              {eyebrow}
            </span>
          </p>
        ) : (
          <p
            className={cn(
              "mb-3 text-[16px] font-semibold capitalize",
              invert ? "text-royal-100" : eyebrowTones[eyebrowTone],
            )}
          >
            {eyebrow}
          </p>
        )
      ) : null}
      <h2 className={cn("text-3xl leading-tight sm:text-4xl", titleFonts[titleFont])}>
        {title}
      </h2>
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
