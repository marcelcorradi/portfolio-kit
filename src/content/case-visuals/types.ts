import type { ComponentType, ReactNode, SVGProps } from "react"
import type { Metric } from "@/components/case-metrics"

/**
 * A visual anchored to a sentence in the case's Markdown.
 *
 * The anchor is the exact text the visual should follow. Keeping it here rather
 * than in the Markdown means the writing stays prose and the page owns the
 * visuals, at the cost of the anchor having to match the body verbatim.
 */
export interface CaseInsert {
  anchor: string
  node: ReactNode
}

/** Everything a case page needs beyond the Markdown itself. */
export interface CaseVisuals {
  /** Brand logo for the header, so it matches the card the reader clicked. */
  logo?: ComponentType<SVGProps<SVGSVGElement>>
  /** Per-logo optical height, e.g. "h-6". */
  logoClassName?: string
  /** The scannable figures above the prose. */
  metrics?: Metric[]
  /** Visuals placed between paragraphs, in the order they appear. */
  inserts?: CaseInsert[]
}
