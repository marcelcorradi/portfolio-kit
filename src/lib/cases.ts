export type CaseType = "design-system" | "product-ai"

export interface CaseFrontmatter {
  title: string
  summary: string
  date: string
  cover?: string
  type: CaseType
  tags: string[]
  role?: string
  /** Human-readable period, e.g. "Sep 2025 to Jul 2026". Shown in the case header. */
  timeframe?: string
  /** Client or employer the work was done for. Drives the header's brand logo. */
  company?: string
  /**
   * One-line result for the header's scope block. Shorter and harder than
   * `summary`, which is the narrative line the cards and the feed use.
   */
  outcome?: string
}

export interface CaseStudy extends CaseFrontmatter {
  slug: string
  /** Raw Markdown body (frontmatter stripped), ready for react-markdown. */
  body: string
}

// Eagerly import every case's raw Markdown at build time.
// `?raw` gives us the file contents as a string so we can parse frontmatter.
const modules = import.meta.glob("../content/cases/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "")
}

/**
 * Minimal YAML-ish frontmatter parser for our controlled case files.
 * Supports `key: "value"`, `key: value`, and inline arrays `key: ["a", "b"]`.
 * Kept dependency-free on purpose — gray-matter pulls in `eval` and ~500kB.
 */
function parseFrontmatter(raw: string): {
  data: Record<string, unknown>
  content: string
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!match) return { data: {}, content: raw }

  const [, fm, content] = match
  const data: Record<string, unknown> = {}

  for (const line of fm.split(/\r?\n/)) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line.trim())
    if (!kv) continue
    const [, key, rawValue] = kv
    let value = rawValue.trim()

    if (value.startsWith("[") && value.endsWith("]")) {
      // inline array of quoted strings
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean)
    } else {
      value = value.replace(/^["']|["']$/g, "")
      data[key] = value
    }
  }

  return { data, content: content.trimStart() }
}

const allCases: CaseStudy[] = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      body: content,
      ...(data as unknown as CaseFrontmatter),
    }
  })
  // Newest first.
  .sort((a, b) => (a.date < b.date ? 1 : -1))

export function getAllCases(): CaseStudy[] {
  return allCases
}

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  return allCases.find((c) => c.slug === slug)
}

export interface CaseSection {
  /** Heading text as written in the markdown. */
  title: string
  /** Anchor id, matching what react-markdown/rehype generates. */
  id: string
  /**
   * Share of the case's body this section takes up, 0 to 1, relative to the
   * longest section. Lets the contents render as a map of the document rather
   * than a flat list.
   */
  weight: number
}

/**
 * Slugify a heading into an anchor id.
 * Shared by the contents list and the rendered headings so the two always agree.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

/**
 * The `## ` headings of a case body, for the on-page table of contents.
 * Read from the Markdown itself so the contents stay in sync with the writing.
 * Fenced code blocks are skipped so a `#` comment inside one is never a heading.
 */
export function getCaseSections(body: string): CaseSection[] {
  const found: { title: string; id: string; words: number }[] = []
  let inFence = false

  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const match = /^##\s+(.+?)\s*$/.exec(line)
    if (match) {
      const title = match[1].replace(/\s*#+\s*$/, "")
      found.push({ title, id: slugifyHeading(title), words: 0 })
      continue
    }

    // Everything before the first heading belongs to the hook, which has no
    // heading of its own, so it is not counted against any section.
    if (found.length > 0 && line.trim()) {
      found[found.length - 1].words += line.trim().split(/\s+/).length
    }
  }

  const longest = Math.max(...found.map((s) => s.words), 1)

  return found.map(({ title, id, words }) => ({
    title,
    id,
    weight: words / longest,
  }))
}
