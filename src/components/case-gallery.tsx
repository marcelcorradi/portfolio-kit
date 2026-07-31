import { useCallback, useEffect, useRef, useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { CaseImage } from "@/components/case-image"
import { cn } from "@/lib/utils"

export interface GalleryItem {
  src: string
  /** Component name, shown as the slide's label. */
  title: string
  /** What this component demonstrates about the system. */
  caption: string
  alt: string
  /**
   * Caps this slide's width. Slides in one gallery can differ in shape: a wide
   * matrix wants the whole column, a narrow set blurs unless it is held back.
   */
  className?: string
  /**
   * Put the image in a fixed-height frame that scrolls. "x" for wide matrices,
   * "y" for tall documents, "both" when neither axis fits.
   */
  scroll?: "x" | "y" | "both"
  /**
   * How much wider than the frame the image runs, when scrolling sideways.
   * Defaults to 1.6. A very wide, short matrix needs more (its rows are small
   * at any width that fits), a nearly square one needs less.
   */
  scale?: number
  /**
   * The same for phones, where the frame crops instead of scrolling. Set it
   * only when fitting makes the figure unreadable: a 2800px matrix fitted to a
   * phone is a 44px strip, where showing part of it larger at least reads as a
   * matrix. Tapping opens the whole thing.
   */
  mobileScale?: number
}

/**
 * Two views of the same sequence, e.g. a flow at desktop and at mobile width.
 * Both lists must describe the same steps in the same order, since switching
 * view keeps the reader on the step they were looking at.
 */
export interface GalleryVariant {
  /** Control label, e.g. "Desktop". */
  label: string
  items: GalleryItem[]
  /**
   * Caps the image width, for variants whose frames are far narrower than the
   * column (a 375px mobile screen stretched to full width looks broken).
   */
  className?: string
}

/**
 * A carousel of component screenshots.
 *
 * One image of 143 components is a wall; one component per slide gives each
 * grid room to be read. The label and caption carry the point, so a reader who
 * cannot make out the detail still learns what the slide proves.
 *
 * Pass `variants` instead of `items` to show the same sequence at two
 * breakpoints behind a toggle. Comparing a step across widths then costs one
 * click, where stacked galleries would cost a scroll and lose the reference.
 */
export function CaseGallery({
  items,
  variants,
  className,
}: {
  items?: GalleryItem[]
  variants?: GalleryVariant[]
  /** Caps the image width for narrow exports, e.g. "mx-auto max-w-md". */
  className?: string
}) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [height, setHeight] = useState<number>()
  const [variant, setVariant] = useState(0)
  const slideRefs = useRef<(HTMLElement | null)[]>([])

  const active = variants?.[variant]
  const slides = active?.items ?? items ?? []

  // The screenshots differ in height, so the frame follows the active slide
  // instead of every slide stretching to the tallest one.
  const measure = useCallback((index: number) => {
    const slide = slideRefs.current[index]
    if (slide) setHeight(slide.getBoundingClientRect().height)
  }, [])

  useEffect(() => {
    if (!api) return
    const update = () => {
      const index = api.selectedScrollSnap()
      setCurrent(index)
      measure(index)
    }
    update()
    api.on("select", update)
    return () => {
      api.off("select", update)
    }
  }, [api, measure])

  // Images arrive after first paint, and the viewport width changes the height.
  useEffect(() => {
    const remeasure = () => measure(current)
    window.addEventListener("resize", remeasure)
    return () => window.removeEventListener("resize", remeasure)
  }, [current, measure])

  // Switching variant swaps every slide, so the measured height is stale until
  // the new image for the current step has painted.
  useEffect(() => {
    measure(current)
  }, [variant, current, measure])

  return (
    <div className="my-10">
      {variants && variants.length > 1 && (
        <div
          role="tablist"
          aria-label="Viewport"
          className="mb-4 inline-flex rounded-full border border-border p-0.5"
        >
          {variants.map((v, index) => (
            <button
              key={v.label}
              type="button"
              role="tab"
              aria-selected={variant === index}
              onClick={() => setVariant(index)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                variant === index
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      <Carousel setApi={setApi} opts={{ align: "start" }}>
        {/* items-start stops every slide from stretching to the tallest one;
            the animated height then keeps the controls from jumping. */}
        <CarouselContent
          className="items-start transition-[height] duration-300 motion-reduce:transition-none"
          style={height ? { height } : undefined}
        >
          {slides.map((item, index) => (
            <CarouselItem key={item.src}>
              <figure
                ref={(node) => {
                  slideRefs.current[index] = node
                }}
              >
                {item.scroll ? (
                  // Two elements on purpose: the outer one owns the rounded
                  // border and clips, the inner one scrolls. A scroll container
                  // cannot reliably clip its own scrolled content to a radius,
                  // which is why the image's square white corners kept showing
                  // through the arc.
                  <div className="isolate overflow-hidden rounded-xl border border-border">
                    <div
                      className={cn(
                        // One height for every scroll frame, whichever axis it
                        // scrolls on, so the figures keep a common rhythm.
                        // Capped on phones too, and lower: a tall export fitted
                        // to 375px runs over a screen, and a figure that has to
                        // be scrolled past is worse than one that is cropped.
                        "max-h-[20rem] overflow-y-auto rounded-xl sm:max-h-[32rem] sm:overscroll-contain",
                        // Sideways scrolling starts at sm; below it an oversized
                        // image is cropped, so a drag never competes with the
                        // back gesture.
                        "overflow-x-hidden",
                        item.scroll !== "y" && "sm:overflow-x-auto"
                      )}
                    >
                      <CaseImage
                        src={item.src}
                        alt={item.alt}
                        title={item.title}
                        eager={index === 0}
                        onLoad={() => index === current && measure(index)}
                        overflowScale={
                          item.scroll === "y" ? undefined : (item.scale ?? 1.6)
                        }
                        mobileScale={item.mobileScale}
                        scrolled
                      />
                    </div>
                  </div>
                ) : (
                  /* Most specific wins: the slide's own cap, then the variant's,
                     then the gallery's. */
                  <div className={item.className ?? active?.className ?? className}>
                    <CaseImage
                      src={item.src}
                      alt={item.alt}
                      title={item.title}
                      // The first slide is measured on mount, so it must not wait.
                      eager={index === 0}
                      onLoad={() => index === current && measure(index)}
                      framed
                    />
                  </div>
                )}
                <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">{item.title}</span>{" "}
                  {item.caption}
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-4 flex items-center gap-3">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />

          <div className="flex gap-1.5" role="tablist" aria-label="Steps">
            {slides.map((item, index) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={current === index}
                aria-label={item.title}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  current === index
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-border hover:bg-muted-foreground"
                )}
              />
            ))}
          </div>

          <span className="ml-auto font-mono text-xs text-muted-foreground">
            {current + 1}/{slides.length}
          </span>
        </div>
      </Carousel>
    </div>
  )
}
