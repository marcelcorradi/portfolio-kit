/**
 * Single source of truth for who this site belongs to.
 *
 * `/setup` fills this in from your answers. You can also edit it by hand at any
 * time — everything that needs your name, your URL or your links reads from
 * here, so there is exactly one place to change.
 *
 * Read by:
 *   - src/lib/use-page-meta.ts   (per-route <title>, description, canonical, OG)
 *   - scripts/build-sitemap.mjs  (absolute URLs in sitemap.xml)
 *   - whatever components you build (name in the hero, email in contact, ...)
 *
 * Two things that live OUTSIDE this file, because a browser has to read them
 * before any JavaScript runs:
 *   - index.html      — the fallback title/description social scrapers see
 *   - public/CNAME    — your custom domain, read by GitHub Pages
 * `/setup` writes those too. If you edit `url` here by hand, update them.
 */
export interface SiteConfig {
  /** Your name, as it should appear in the browser tab and OG cards. */
  name: string
  /** What you do. Shown next to your name in the default page title. */
  role: string
  /**
   * Canonical origin, no trailing slash. Open Graph requires absolute URLs.
   *
   * Custom domain:  "https://yourname.com"
   * GitHub Pages:   "https://youruser.github.io/your-repo"
   *                 (with a project path, also set `base` in vite.config.ts)
   */
  url: string
  /** One or two sentences. The default meta description for every page. */
  description: string
  /** Where people reach you. Leave a link empty and it is simply not rendered. */
  email: string
  links: {
    linkedin: string
    github: string
  }
}

export const site: SiteConfig = {
  name: "",
  role: "",
  url: "",
  description: "",
  email: "",
  links: {
    linkedin: "",
    github: "",
  },
}

/**
 * True once `/setup` has run. The blank Home checks this to decide whether to
 * show the getting-started screen or your real site.
 *
 * Gated on `name` only, not `url`: setup lets you defer the URL ("decide later"),
 * and a local-only site must still render its real Home. The URL matters for the
 * sitemap and absolute OG links, not for whether the site is "yours" yet.
 */
export const isConfigured = (): boolean => site.name.trim() !== ""

/** "Jane Doe, Product Designer", or just the name if no role is set. */
export const defaultTitle = (): string =>
  site.role ? `${site.name}, ${site.role}` : site.name