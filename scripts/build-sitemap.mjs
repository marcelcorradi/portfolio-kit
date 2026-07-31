// Generates public/sitemap.xml from the case files, so publishing a case is
// enough to get it listed. Runs before `vite build` (see package.json), which
// copies public/ into dist/.
//
// /cases is deliberately absent: it is an unstyled stub, disallowed in
// robots.txt and noindexed in the page itself.
//
// This is a plain Node script, so it cannot import src/site.config.ts through
// the bundler. It reads the `url` out of that file by regex instead, which
// keeps the site URL defined in exactly one place.

import { readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

/** Pull `url: "..."` out of src/site.config.ts without a TS parser. */
function readSiteUrl() {
  const configPath = join(root, "src/site.config.ts")
  let raw
  try {
    raw = readFileSync(configPath, "utf8")
  } catch {
    return ""
  }
  // Match the `url` key inside the exported `site` object, not the one in the
  // interface above it (the interface has no value after the colon).
  const match = /\burl:\s*"([^"]*)"/.exec(raw)
  return match?.[1]?.trim().replace(/\/$/, "") ?? ""
}

const SITE_URL = readSiteUrl()

if (!SITE_URL) {
  // Expected before `/setup` runs. A sitemap of relative URLs would be invalid,
  // so write nothing and let the build continue.
  console.log(
    "sitemap.xml: skipped — no `url` in src/site.config.ts yet (run /setup)",
  )
  process.exit(0)
}

const casesDir = join(root, "src/content/cases")

let files = []
try {
  files = readdirSync(casesDir).filter((f) => f.endsWith(".md"))
} catch {
  // No cases directory yet. Still worth emitting a sitemap with the home page.
}

/** Pull one quoted frontmatter field without a YAML dependency. */
function field(raw, key) {
  const match = new RegExp(`^${key}:\\s*"?([^"\\n]*)"?\\s*$`, "m").exec(raw)
  return match?.[1]?.trim()
}

const cases = files
  .map((file) => {
    const raw = readFileSync(join(casesDir, file), "utf8")
    return {
      slug: file.replace(/\.md$/, ""),
      date: field(raw, "date") || new Date().toISOString().slice(0, 10),
    }
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1))

const urls = [
  { loc: `${SITE_URL}/`, priority: "1.0", lastmod: cases[0]?.date },
  ...cases.map((c) => ({
    loc: `${SITE_URL}/cases/${c.slug}`,
    priority: "0.8",
    lastmod: c.date,
  })),
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority, lastmod }) =>
      `  <url>\n    <loc>${loc}</loc>\n${
        lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""
      }    <priority>${priority}</priority>\n  </url>`,
  )
  .join("\n")}
</urlset>
`

writeFileSync(join(root, "public/sitemap.xml"), xml)
console.log(`sitemap.xml: ${urls.length} URLs (1 home + ${cases.length} cases)`)