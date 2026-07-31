import { useState } from "react"
import { CaseImage } from "@/components/case-image"
import { cn } from "@/lib/utils"

export interface SwitchOption {
  /** Control label, e.g. "Light". */
  label: string
  src: string
  alt: string
  /** Sits under the image and changes with the selection. */
  caption: string
}

/**
 * One image at a time, swapped by a labelled control.
 *
 * For evidence that is the same artefact under two conditions: a theme, a
 * breakpoint, a before and after. A carousel would be wrong here, since its
 * arrows and counter promise a sequence to move through, when what is on offer
 * is a comparison of two states of one thing. Holding the frame still and
 * changing only the image is what makes the difference legible.
 */
export function CaseImageSwitch({
  options,
  scroll,
}: {
  options: SwitchOption[]
  /**
   * Render at natural size inside a scrolling frame. "y" for tall documentation
   * exports, "x" for wide matrices, "both" when neither axis fits.
   */
  scroll?: "x" | "y" | "both"
}) {
  const [index, setIndex] = useState(0)
  const active = options[index]

  return (
    <figure className="my-10">
      <div
        role="tablist"
        aria-label="Variant"
        className="mb-4 inline-flex rounded-full border border-border p-0.5"
      >
        {options.map((option, i) => (
          <button
            key={option.label}
            type="button"
            role="tab"
            aria-selected={index === i}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              index === i
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Two elements on purpose when scrolling: the outer one owns the rounded
          border and clips, the inner one scrolls. A scroll container cannot
          reliably clip its own scrolled content to a radius, which is why the
          image's square white corners kept showing through the arc. */}
      <div className={cn(scroll && "isolate overflow-hidden rounded-xl border border-border")}>
        <div
          className={cn(
            // One height for every scroll frame, whichever axis it scrolls on.
            // Capped on phones too, and lower: fitted to a 375px width these
            // documentation exports run over a screen tall, and a figure that
            // has to be scrolled past is worse than one that is cropped.
            scroll && "max-h-[20rem] overflow-y-auto rounded-xl sm:max-h-[32rem] sm:overscroll-contain",
            // Sideways scrolling starts at sm; on a phone the image fits.
            scroll && scroll !== "y" && "sm:overflow-x-auto"
          )}
        >
          {/* Keyed so the browser swaps the image instead of repainting the old
              one while the new file decodes. */}
          <CaseImage
            key={active.src}
            src={active.src}
            alt={active.alt}
            title={active.caption}
            overflowScale={!scroll || scroll === "y" ? undefined : 1.6}
            scrolled={Boolean(scroll)}
          />
        </div>
      </div>

      <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {active.caption}
      </figcaption>
    </figure>
  )
}
