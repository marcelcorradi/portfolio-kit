import type { ComponentType, SVGProps } from "react"
import { cn } from "@/lib/utils"

/**
 * Project/brand logo lockup. Real logos vary in aspect ratio (wide wordmarks
 * vs. square marks), so we fix the HEIGHT and let width flow, with the SVG
 * using its own viewBox so nothing distorts or crops.
 *
 * When a monochrome SVG logo component exists, pass it as `logo` — it renders
 * in a fixed-height slot, tinted via `currentColor` so it matches the muted
 * foreground and flips correctly in dark mode. Without one, we fall back to a
 * text wordmark in the same slot, so swapping a real logo in later won't shift
 * the layout.
 */
export function ProjectLogo({
  name,
  logo: Logo,
  logoClassName,
  className,
}: {
  name: string
  logo?: ComponentType<SVGProps<SVGSVGElement>>
  /** Per-logo optical sizing (e.g. "h-6", "h-9") so different aspect ratios
   *  and one- vs. two-line lockups read at a harmonious visual weight. */
  logoClassName?: string
  className?: string
}) {
  // Each logo sits in a fixed-height row so cards align, but the logo itself is
  // sized per-brand (logoClassName) to normalize optical weight rather than raw
  // SVG height — a wide wordmark and a two-line lockup need different heights to
  // look the same size. Width is capped so nothing sprawls across the card.
  if (Logo) {
    return (
      <div className={cn("flex h-10 items-center text-foreground", className)}>
        <Logo
          className={cn("w-auto max-w-[200px]", logoClassName ?? "h-6")}
          aria-label={`${name} logo`}
        />
      </div>
    )
  }

  return (
    <span
      className={cn(
        "block font-semibold leading-tight tracking-tight text-foreground",
        className
      )}
    >
      {name}
    </span>
  )
}
