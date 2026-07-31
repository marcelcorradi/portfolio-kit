import { CaseImage } from "@/components/case-image"
import { cn } from "@/lib/utils"

interface CaseFigureProps {
  src: string
  /** Describes the image for screen readers. Required: the figures carry evidence. */
  alt: string
  /** Visible caption. Optional, but most case figures need the context. */
  caption?: string
  /** Frame exports that would otherwise bleed into the page background. */
  framed?: boolean
  /**
   * Caps how wide the image runs, e.g. "max-w-sm". Narrow exports (a component
   * matrix, a single control) blur when stretched to the full column, and tall
   * documents swallow the page. Both read better held to their own size.
   */
  width?: string
  /**
   * Put the image in a fixed-height frame that scrolls. "x" for wide matrices,
   * "y" for tall documents, "both" when neither axis fits.
   */
  scroll?: "x" | "y" | "both"
  /**
   * How much wider than the frame the image runs, when scrolling sideways.
   * Defaults to 1.6. Raise it for a long, short matrix, whose rows stay tiny at
   * any width that would fit; lower it for something nearly square.
   */
  scale?: number
}

/**
 * An image with a caption, sized to the reading column.
 *
 * Figures stay inside the measure rather than breaking out of it: on a page
 * built for reading, a figure that starts left of the text unsettles the line
 * the eye is following.
 */
export function CaseFigure({
  src,
  alt,
  caption,
  framed,
  width,
  scroll,
  scale,
}: CaseFigureProps) {
  return (
    <figure className="my-10">
      {scroll ? (
        // Two elements on purpose: the outer one owns the rounded border and
        // clips, the inner one scrolls. A scroll container cannot reliably clip
        // its own scrolled content to a radius, which is why the image's square
        // white corners kept showing through the arc.
        <div className="isolate overflow-hidden rounded-xl border border-border">
          <div
            className={cn(
              // One height for every scroll frame, so figures keep a common
              // rhythm down the page whichever axis they scroll on. Capped on
              // phones too, and lower: fitted to a 375px width a documentation
              // export runs over a screen tall, and a figure that has to be
              // scrolled past is worse than one that is cropped.
              "max-h-[20rem] overflow-y-auto rounded-xl sm:max-h-[32rem] sm:overscroll-contain",
              // Sideways scrolling starts at sm: on a phone the image fits the
              // column, and a horizontal drag would fight the back gesture.
              scroll !== "y" && "sm:overflow-x-auto"
            )}
          >
            <CaseImage
              src={src}
              alt={alt}
              title={caption}
              overflowScale={scroll === "y" ? undefined : (scale ?? 1.6)}
              scrolled
            />
          </div>
        </div>
      ) : (
        <div className={width ? `mx-auto ${width}` : undefined}>
          <CaseImage src={src} alt={alt} title={caption} framed={framed} />
        </div>
      )}
      {caption && (
        <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
