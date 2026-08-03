import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"
import { usePageMeta } from "@/lib/use-page-meta"
import { site } from "@/site.config"

/**
 * Catch-all for any URL the router doesn't own: a stale link, a typo, or a
 * deep link to something that no longer exists.
 *
 * The route is deliberately not styled as an apology: no oversized "404" hero,
 * just the way out.
 *
 * noindex matters here: a static host cannot return a real 404 status, so
 * GitHub Pages serves this with a 200 and Google would otherwise treat it as a
 * soft 404 and could index it. public/404.html carries the same tag statically,
 * for the crawl that never runs the JS.
 */
export default function NotFound() {
  usePageMeta({
    title: site.name ? `Page not found · ${site.name}` : "Page not found",
    noIndex: true,
  })

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-32">
      <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
        This page doesn't exist
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
        The link may be out of date, or the address slightly off.
      </p>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-2.5"
        >
          <ArrowLeft className="size-4" />
          Back home
        </Link>
      </div>
    </main>
  )
}