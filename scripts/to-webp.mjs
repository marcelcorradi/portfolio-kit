/**
 * Convert case images to WebP.
 *
 *   node scripts/to-webp.mjs src/assets/cases/<case>
 *
 * Case figures are exported from Figma as PNG, which is the format Figma gives
 * you, and PNG is the wrong thing to ship: these are large, detail-dense
 * screenshots and WebP cuts them by roughly 80% with no visible loss at q90.
 *
 * Exports also arrive with Figma's dark canvas baked in around the artboard, in
 * whatever width the frame happened to have — 20px on one export, 40px on the
 * next. That margin is cropped here, for two reasons. It is inconsistent, so
 * figures that should share a frame treatment visibly do not. And inside a
 * scrolling frame it is what draws the square white corner through the rounded
 * border: the frame scrolls past the dark margin into the white artboard, whose
 * own edge is square, and no CSS radius can round pixels that are part of the
 * image. Cropping puts the artboard edge on the element edge, where the frame's
 * `rounded-xl` clips it.
 *
 * Originals are left in place. Delete them once the case references the .webp
 * files and the build is green.
 */
import sharp from "sharp"
import { readdirSync, statSync, existsSync } from "fs"
import path from "path"

/** Anything darker than this counts as Figma's canvas rather than artboard. */
const CANVAS_MAX = 70

/**
 * The bounding box of the artboard inside Figma's canvas.
 *
 * Scans in from each edge along the middle row and column until the pixels stop
 * being canvas-dark. sharp's own `.trim()` is the obvious tool and was tried
 * first: it under-crops these exports at every threshold, because WebP noise
 * along the boundary stops it finding a uniform border. Walking the pixels is
 * unambiguous — and the middle row and column are used precisely because they
 * cross the artboard, where a corner might sit in a dashed annotation.
 *
 * Returns null when there is no dark margin, so an already-cropped export or a
 * light-canvas one passes through untouched.
 */
async function artboardBox(src) {
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const dark = (x, y) => data[(y * width + x) * channels] < CANVAS_MAX

  const midY = Math.floor(height / 2)
  const midX = Math.floor(width / 2)

  let left = 0
  while (left < width && dark(left, midY)) left++
  let right = width - 1
  while (right > left && dark(right, midY)) right--
  let top = 0
  while (top < height && dark(midX, top)) top++
  let bottom = height - 1
  while (bottom > top && dark(midX, bottom)) bottom--

  if (left === 0 && top === 0 && right === width - 1 && bottom === height - 1) {
    return null
  }
  return { left, top, width: right - left + 1, height: bottom - top + 1 }
}

const dir = process.argv[2]

if (!dir || !existsSync(dir)) {
  console.error("Usage: node scripts/to-webp.mjs <directory>")
  process.exit(1)
}

// The reading column is 672px, so 1400px covers a 2x display. Wide, detail-dense
// exports (variable panels, component matrices) get 2000px.
const WIDE = 2000
const NORMAL = 1400
const WIDE_THRESHOLD = 3000

const files = readdirSync(dir).filter((f) => /\.png$/i.test(f))

if (files.length === 0) {
  console.log(`No PNGs in ${dir}`)
  process.exit(0)
}

let before = 0
let after = 0

for (const file of files) {
  const src = path.join(dir, file)
  const out = src.replace(/\.png$/i, ".webp")
  const meta = await sharp(src).metadata()

  // Cropped before the resize, so the target width applies to the artboard
  // itself rather than to the artboard plus a margin that is about to go.
  const box = await artboardBox(src)
  const cropped = box ?? { width: meta.width, height: meta.height }

  // Never upscale: a small export stays its own size.
  const target = cropped.width > WIDE_THRESHOLD ? WIDE : NORMAL
  const width = Math.min(cropped.width, target)

  const pipeline = sharp(src)
  if (box) pipeline.extract(box)

  const info = await pipeline
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(out)

  const inSize = statSync(src).size
  before += inSize
  after += info.size

  const saved = Math.round((1 - info.size / inSize) * 100)
  const crop = box ? ` cropped ${meta.width}x${meta.height}->${box.width}x${box.height}` : ""
  console.log(
    `${file.padEnd(42)} ${cropped.width} -> ${width}px  ` +
      `${(inSize / 1024).toFixed(0)}kB -> ${(info.size / 1024).toFixed(0)}kB  (-${saved}%)${crop}`
  )
}

console.log(
  `\nTOTAL ${(before / 1024 / 1024).toFixed(2)}MB -> ${(after / 1024 / 1024).toFixed(2)}MB ` +
    `(-${Math.round((1 - after / before) * 100)}%)`
)
