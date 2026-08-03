# Case visuals — figures inside the prose

A case can render as pure prose, and that's fine. When you want a figure to sit
*between* two paragraphs — a screenshot, a gallery, a before/after — you attach it
with a **visuals file**, and the page weaves it into the writing.

This keeps the Markdown clean (it stays pure writing) and lets the page own the
visuals. It also has one sharp edge. Read the warning.

## ⚠️ The anchor trap — the one thing to understand

A visual attaches to a **verbatim sentence** in the Markdown, called its `anchor`.
The page finds that exact sentence and drops the figure in right after it.

**If you reword or delete that sentence, the figure silently disappears.** No error.
No red text. The build still passes. The case just quietly renders with a missing
image, and you might not notice until it's live.

This is why `npm run build` runs `scripts/check-anchors.mjs`, which fails loudly
when an anchor no longer matches its prose. Run it yourself any time you edit a
case that has visuals:

```
node scripts/check-anchors.mjs            # every case
node scripts/check-anchors.mjs my-slug    # just one
```

If you change a sentence that was an anchor, update the anchor in the visuals file
to match the new wording (copy the exact new sentence). That's the whole fix.

## How to add visuals to a case

1. Put your optimized images in `src/assets/cases/<slug>/` (see
   [content-model.md](./content-model.md)).

2. Create `src/content/case-visuals/<slug>.tsx` exporting a `CaseVisuals` object:

```tsx
import type { CaseVisuals } from "./types"
import { CaseFigure } from "@/components/case-figure"
import myShot from "@/assets/cases/my-slug/shot.webp"

export const visuals: CaseVisuals = {
  // Optional: a row of key numbers at the top of the case.
  metrics: [
    { value: "18%", label: "Higher conversion" },
    { value: "2", label: "Steps, down from 5" },
  ],
  // Figures, each anchored to a verbatim sentence in the .md.
  inserts: [
    {
      anchor: "Cut a five-step checkout to two and lifted conversion 18%.",
      node: <CaseFigure src={myShot} alt="The two-step checkout" />,
    },
  ],
}
```

3. Register it in `src/content/case-visuals/index.ts`:

```ts
import { visuals as mySlug } from "./my-slug"

export const caseVisuals: Record<string, CaseVisuals> = {
  "my-slug": mySlug,
}
```

## What you can put in a figure

The `node` is any JSX. The kit ships reusable pieces to compose:

- `CaseFigure` — an image with a caption and frame.
- `CaseGallery` — a carousel / lightbox of several images.
- `CaseImage` / `CaseImageSwitch` — a single image, or an A/B before/after toggle.
- `CaseMetrics` — the key-numbers row (usually via the `metrics` field above).

Need something your field wants that isn't here (a token-tier diagram, a do/don't
panel)? Build it as a component in `src/components/` and drop it into a `node`. Ask
the design skill to make it match the rest of the site.