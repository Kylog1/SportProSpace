/**
 * Class strings for the square "space" buttons used by the dark hero and the
 * dark header. They are deliberately not a variant of the shared shadcn Button:
 * that one is rounded, has a white focus-ring offset and its own sizing, and
 * overriding all of it would be more code than these few classes. Square
 * corners (radius 0) are part of the hero language, see DESIGN.md.
 *
 * Tailwind needs the full class names in the source, so they are plain strings.
 */
export const spaceButton =
  "inline-flex min-h-[52px] items-center justify-center gap-3 whitespace-nowrap border-[1.5px] px-6 font-hud text-[13px] font-semibold uppercase tracking-[0.14em] transition-[background-color,box-shadow] duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-space-cyan";

/** Compact variant for the header (46px). */
export const spaceButtonSm = "min-h-[46px] px-5 text-[12.5px]";

export const spaceButtonPrimary =
  "border-space-blue-hi bg-space-blue text-white hover:bg-[#1670f2] hover:shadow-[0_0_0_5px_rgb(59_140_255/0.22)]";

export const spaceButtonGhost =
  "border-space-ink/50 bg-space-bg/50 text-space-ink hover:bg-space-ink/10";
