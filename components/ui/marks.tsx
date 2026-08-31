import Image from "next/image";

/**
 * The site's drawn marks.
 *
 * Hand-drawn line art in place of a stroked icon set. They are raster, not
 * SVG, and drawn in their own black ink — which is the constraint everything
 * else here follows from: a mark cannot be recoloured by `currentColor`, so it
 * needs a light ground under it wherever it is used. On a saturated tile the
 * lines go muddy, and inverting them to white turns a filled drawing (the
 * client's hair and shirt) into a photographic negative rather than a white
 * version of itself.
 *
 * Each file is a 512px square trimmed to the drawing and cut on its longest
 * side, so a wide mark and a tall one land at the same optical size in a
 * square slot — they arrive from the generator adrift in a lot of empty frame,
 * and at the sizes used here that margin is most of the box.
 *
 * `alt=""` throughout: every one of them sits beside a sentence or a label
 * that already says the thing, so naming the drawing would say it twice.
 */
export type Mark = (props: { className?: string }) => React.ReactElement;

/**
 * 120 is the intrinsic size, not the rendered one — the caller sizes the mark
 * with `className` and this is only what Next fetches. It covers the largest
 * use (40px on the home page) at three times over, which is also enough for
 * Next to stop asking for a `sizes`, and the same file is a cache hit at the
 * 22px the menus draw it at.
 */
function drawnMark(src: string): Mark {
  return function DrawnMark({ className }: { className?: string }) {
    return (
      <Image src={src} alt="" width={120} height={120} className={className} />
    );
  };
}

export const LockMark = drawnMark("/icons/lock.png");
export const TagMark = drawnMark("/icons/tag.png");
export const LinkMark = drawnMark("/icons/link.png");
export const DocumentMark = drawnMark("/icons/document.png");
export const ClientMark = drawnMark("/icons/client.png");

/**
 * The accordion's two states. Cropped at one shared scale rather than each to
 * its own bounding box — a minus normalised on its own ink would come out as
 * wide as the whole plus, and the pair has to read as one control changing
 * rather than two different drawings.
 */
export const PlusMark = drawnMark("/icons/plus.png");
export const MinusMark = drawnMark("/icons/minus.png");

/**
 * The step numerals. Cut to the height of the numeral itself rather than to
 * the drawing's bounding box: the sparkle marks sit differently around each
 * one, and framing on those left the 1 half again as tall as the 3. All three
 * now render their digit at the same 310 of 512, so they match down a list.
 */
export const StepOneMark = drawnMark("/icons/step-1.png");
export const StepTwoMark = drawnMark("/icons/step-2.png");
export const StepThreeMark = drawnMark("/icons/step-3.png");
