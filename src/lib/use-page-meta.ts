import { useEffect } from "react"
import { site, defaultTitle } from "@/site.config"

/** Canonical origin. Absolute URLs are required by Open Graph. */
export const SITE_URL = site.url

/**
 * Case cover images, resolved through the same glob Vite fingerprints, so a
 * frontmatter `cover:` maps to the hashed filename that actually ships. A path
 * that does not match returns undefined and the page falls back to the site
 * default, rather than emitting an og:image that 404s.
 */
const coverUrls = import.meta.glob("../assets/cases/**/*.{webp,png,jpg}", {
  eager: true,
  import: "default",
}) as Record<string, string>

export function resolveCoverUrl(cover: string | undefined): string | undefined {
  if (!cover) return undefined
  const key = `../assets/cases/${cover}`
  const url = coverUrls[key]
  if (!url) return undefined
  return url.startsWith("http") ? url : SITE_URL + url
}

export interface PageMeta {
  title?: string
  description?: string
  /** Absolute URL, already resolved via resolveCoverUrl. */
  image?: string
  /** Path only, e.g. "/cases/my-project". Becomes the canonical + og:url. */
  path?: string
  /** Cases are articles; everything else is a website. */
  type?: "website" | "article"
  /** Keep the page out of search results. */
  noIndex?: boolean
}

/** Create the tag if missing, set its content, and report whether we made it. */
function setTag(
  attr: "name" | "property",
  key: string,
  content: string,
): () => void {
  const selector = `meta[${attr}="${key}"]`
  const existing = document.head.querySelector<HTMLMetaElement>(selector)

  if (existing) {
    const previous = existing.content
    existing.content = content
    return () => {
      existing.content = previous
    }
  }

  const created = document.createElement("meta")
  created.setAttribute(attr, key)
  created.content = content
  document.head.appendChild(created)
  return () => {
    created.remove()
  }
}

function setCanonical(href: string): () => void {
  const existing = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  )
  if (existing) {
    const previous = existing.href
    existing.href = href
    return () => {
      existing.href = previous
    }
  }
  const created = document.createElement("link")
  created.rel = "canonical"
  created.href = href
  document.head.appendChild(created)
  return () => {
    created.remove()
  }
}

/**
 * Per-route document head: title, description, canonical and Open Graph.
 *
 * This is a client-side SPA on static hosting, so the HTML that leaves the
 * server always carries index.html's defaults. Google renders JS and picks up
 * what this sets; most social scrapers (LinkedIn, Slack, WhatsApp) do not, and
 * will read the defaults instead. That is the accepted trade for not
 * pre-rendering a small site: search results get the real titles, and a shared
 * link still shows a correct, if generic, card.
 *
 * Every change is reverted on unmount so a client-side navigation cannot leave
 * one page's title or noindex behind on the next.
 */
export function usePageMeta({
  title,
  description,
  image,
  path,
  type = "website",
  noIndex = false,
}: PageMeta) {
  useEffect(() => {
    const fullTitle = title ?? defaultTitle()
    const desc = description ?? site.description
    const url = SITE_URL + (path ?? "/")
    const ogImage = image ?? `${SITE_URL}/favicon.svg`

    const previousTitle = document.title
    document.title = fullTitle

    const cleanups = [
      setTag("name", "description", desc),
      setCanonical(url),
      setTag("property", "og:title", fullTitle),
      setTag("property", "og:description", desc),
      setTag("property", "og:url", url),
      setTag("property", "og:type", type),
      setTag("property", "og:site_name", site.name),
      setTag("property", "og:image", ogImage),
      setTag("name", "twitter:card", image ? "summary_large_image" : "summary"),
      setTag("name", "twitter:title", fullTitle),
      setTag("name", "twitter:description", desc),
      setTag("name", "twitter:image", ogImage),
    ]

    if (noIndex) cleanups.push(setTag("name", "robots", "noindex, follow"))

    return () => {
      document.title = previousTitle
      for (const undo of cleanups) undo()
    }
  }, [title, description, image, path, type, noIndex])
}