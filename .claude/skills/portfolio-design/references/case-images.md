# Case images — exporting and optimizing figures

How case figures get from a design tool into `src/assets/cases/<slug>/`. Written after a bug
that took a whole session to find; the trap in §1 is the expensive part. This applies to any
image-export workflow, whether or not you use Figma.

## 1. Export in Light Mode, always

If your design tool binds section or artboard backgrounds to a **theme token** (a color that
resolves differently in light vs. dark mode), exporting while the file is in Dark Mode bakes a
**dark surround into the pixels**. That is image content — no CSS `border-radius`, background,
or `clip-path` can touch it. Inside a scrolling frame it draws a square corner through the
rounded border, because the frame scrolls past the dark margin into the artboard, whose own
edge is square.

**So: switch the file to Light Mode before exporting case figures.** It costs one click and
avoids the entire class of bug.

Symptom to recognise: a figure with a hard dark or white edge that ignores every CSS fix you
try. Check the exported file's corner pixel before touching any component —
`sharp(file).extract({left:0,top:0,width:1,height:1}).raw()`. If it is near-black (~`30,30,30`),
it is this.

### If you pin the mode programmatically, verify the export honoured it

A design tool's REST/asset export may ignore a mode you set through its API and keep serving a
cached render. If the exported bytes don't change when you change the mode (identical file size
across calls is the tell), don't trust the programmatic pin — flip the file's mode in the UI and
re-export, or fix the margin locally (§3).

## 2. Prefer a real file export over returning bytes through a tool

If you're driving a design tool through an MCP, the obvious shortcut — export inside the plugin
and hand the image back — often fails: a plugin's file-write may land in the app's own sandbox
rather than your filesystem, and returning a large image as base64 tends to get truncated in the
tool response, so the file can't be reconstructed. Export to disk, then optimize with the script
below.

## 3. `scripts/to-webp.mjs` crops a dark canvas margin

The script scans in from the middle row and column and crops anything darker than `CANVAS_MAX`
(70) — the design tool's dark canvas showing around the artwork. Exports with no dark margin
pass through untouched, so it is safe to run on anything.

`sharp`'s own `.trim()` was tried first and **under-crops these files at every threshold** —
compression noise along the boundary stops it finding a uniform border. That is why the script
walks pixels instead. Don't swap it back for `.trim()`.

```
node scripts/to-webp.mjs src/assets/cases/<slug>
```

It reads PNGs and writes WebP beside them (~80% smaller). It does **not** re-crop existing
`.webp` files.

⚠️ **Do not run this on a browser screenshot of a dark-mode UI.** The inward crop reads a dark
interface as canvas everywhere and crops the image to a sliver. Convert those with `sharp`
directly, no crop.

## 4. Crop flush or keep a margin?

Not the same answer for every figure.

- **Crop flush** when the margin is the design tool's dark canvas, i.e. dead space. The usual
  case, and what `to-webp.mjs` does.
- **Keep a margin** when the export is an annotated spec (bracket/label overlays around a
  diagram). Cropping those flush pushes the annotations against the frame border and it reads as
  cramped. Give them ~40px of **matching-background** padding instead, rather than cropping to
  the ink.

## 5. After changing an image's dimensions, re-check `scale`

Some case figures set a `scale` (an `overflowScale`) so the image renders wider than its frame
and scrolls. Changing an image's aspect ratio changes how tall it renders at that scale. With a
frame height cap over a fixed reading-column width:

```
rendered height = columnWidth * scale * (imageHeight / imageWidth)
```

Keep it under the frame's max height or the figure gains an unintended vertical scroll.

## 6. Which figures actually scroll

Only figures with an `overflowScale` (a `scale` prop) render wider than their frame; those are
the ones where a baked-in margin becomes visible mid-frame. Figures without it render at
`w-full` and hide any edge margin on the frame boundary. So a change to the scroll path in
`case-image.tsx` / `case-figure.tsx` / `case-gallery.tsx` only affects scrolling figures, but a
change to the shared non-scroll path affects every figure — test accordingly.