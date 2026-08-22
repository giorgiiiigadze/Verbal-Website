import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * An iPhone frame with a screenshot behind it.
 *
 * The frame PNG has its screen cut out, so the screenshot simply sits under it
 * and shows through — no clipping mask needed. Every number here is measured
 * off that file (489x1000): the glass starts 24px in and 22px down, and runs
 * 441x956. The radius is written as two percentages because a single one would
 * go elliptical on a box this tall — it is 63.5px of corner over each axis in
 * turn. Change the frame art and these five numbers change with it.
 *
 * The component fills the width it is given, so callers size it and pass a
 * matching `sizes` — without one Next assumes the full viewport and ships a
 * 1920px-wide screenshot into a box a quarter that size.
 */
export function PhoneFrame({
  src,
  alt,
  sizes,
  priority = false,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative select-none", className)}>
      <Image
        src={src}
        alt={alt}
        width={1320}
        height={2868}
        priority={priority}
        sizes={sizes}
        style={{ borderRadius: "14.4% / 6.64%" }}
        className="absolute left-[4.91%] top-[2.2%] h-[95.6%] w-[90.18%] object-cover"
      />
      <Image
        src="/phone/iphone-16-pro-max.png"
        alt=""
        width={489}
        height={1000}
        priority={priority}
        sizes={sizes}
        className="relative h-auto w-full"
      />
    </div>
  );
}
