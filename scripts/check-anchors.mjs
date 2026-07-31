/**
 * Verify a case's visual anchors still match its Markdown.
 *
 *   node scripts/check-anchors.mjs <slug>
 *   node scripts/check-anchors.mjs            # every registered case
 *
 * Visuals attach to sentences via `splitByAnchors` in CasePage. When an anchor
 * no longer appears in the prose verbatim, the figure is dropped with no error
 * and no build failure, so a typo or a reworded sentence silently ships a case
 * with missing images. This is the check that turns that into a loud one.
 *
 * Exits non-zero when any anchor misses, so it can gate a commit.
 */
import { readFileSync, readdirSync, existsSync } from "fs"
import path from "path"

const root = path.resolve(import.meta.dirname, "..")
const casesDir = path.join(root, "src/content/cases")
const visualsDir = path.join(root, "src/content/case-visuals")

/** Anchors are string literals, and some carry escaped quotes or Markdown. */
function readAnchors(tsx) {
  return [...tsx.matchAll(/anchor:\s*\n?\s*"((?:[^"\\]|\\.)+)"/g)].map((m) =>
    m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\")
  )
}

function checkCase(slug) {
  const mdPath = path.join(casesDir, `${slug}.md`)
  const tsxPath = path.join(visualsDir, `${slug}.tsx`)

  // A case with no visuals file renders as prose, which is a valid state.
  if (!existsSync(tsxPath)) return { slug, skipped: true, missing: [] }
  if (!existsSync(mdPath)) return { slug, skipped: false, missing: ["<no markdown>"] }

  const md = readFileSync(mdPath, "utf8")
  const anchors = readAnchors(readFileSync(tsxPath, "utf8"))
  return {
    slug,
    skipped: false,
    total: anchors.length,
    missing: anchors.filter((a) => !md.includes(a)),
  }
}

/** Every case slug, or [] before the first case is written. */
function allSlugs() {
  if (!existsSync(casesDir)) return []
  return readdirSync(casesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
}

const arg = process.argv[2]
const slugs = arg ? [arg.replace(/\.(md|tsx)$/, "")] : allSlugs()

// Runs as part of `npm run build`, so an empty site must pass, not fail.
if (slugs.length === 0) {
  console.log("  --    no cases yet")
  process.exit(0)
}

let failed = 0
for (const slug of slugs) {
  const r = checkCase(slug)
  if (r.skipped) {
    console.log(`  --    ${slug} (prose only)`)
    continue
  }
  if (r.missing.length === 0) {
    console.log(`  OK    ${slug} (${r.total} anchors)`)
    continue
  }
  failed += r.missing.length
  console.log(`  FAIL  ${slug}`)
  for (const a of r.missing) console.log(`          ${JSON.stringify(a.slice(0, 72))}`)
}

console.log(
  failed === 0 ? "\nAll anchors match." : `\n${failed} anchor(s) no longer match the prose.`
)
process.exit(failed === 0 ? 0 : 1)
