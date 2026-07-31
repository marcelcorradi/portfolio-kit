import type { CaseVisuals } from "./types"

/**
 * Visuals for each case, keyed by slug (the Markdown filename without `.md`).
 *
 * A case with no entry here renders as pure prose. That is a valid, finished
 * state — not every case needs figures.
 *
 * To add visuals to a case:
 *   1. create `src/content/case-visuals/<slug>.tsx` exporting a CaseVisuals
 *   2. import it below and add it to this map
 *
 * ⚠️ Visuals attach to the prose by matching an `anchor` string VERBATIM
 * against a sentence in the Markdown. Reword that sentence and the figure
 * disappears silently — no error, and the build still passes. `npm run build`
 * runs scripts/check-anchors.mjs to catch exactly that. See docs/case-visuals.md.
 */
export const caseVisuals: Record<string, CaseVisuals> = {}

export function getCaseVisuals(slug: string): CaseVisuals {
  return caseVisuals[slug] ?? {}
}