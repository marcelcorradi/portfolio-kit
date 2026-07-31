import { usePageMeta } from "@/lib/use-page-meta"
import { ThemeToggle } from "@/components/theme-toggle"
import { getAllCases } from "@/lib/cases"
import { isConfigured, site } from "@/site.config"
import { Link } from "react-router"

/**
 * The starting point.
 *
 * Until `/setup` runs, this shows how to get going. After that it is yours to
 * replace: the portfolio-design and portfolio-content skills build the real
 * Home here, section by section.
 *
 * Deleting everything below and starting from an empty <main> is a perfectly
 * good first move.
 */
export default function Home() {
  usePageMeta({ noIndex: !isConfigured() })

  const cases = getAllCases()

  if (isConfigured()) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-24">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground">
              {site.name}
            </h1>
            {site.role && (
              <p className="mt-2 text-lg text-muted-foreground">{site.role}</p>
            )}
          </div>
          <ThemeToggle />
        </header>

        {site.description && (
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        )}

        <section className="mt-16">
          <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            Work
          </h2>
          {cases.length === 0 ? (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              No cases yet. Drop a Markdown file into{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
                src/content/cases/
              </code>{" "}
              and it appears here. Ask Claude to write one with you.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {cases.map((study) => (
                <li key={study.slug}>
                  <Link
                    to={`/cases/${study.slug}`}
                    className="group block rounded-lg border border-border p-5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <h3 className="font-medium text-foreground">
                      {study.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {study.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <p className="mt-16 text-sm leading-relaxed text-muted-foreground">
          This is the starter Home. Ask Claude to design the real one:{" "}
          <em>"build my home page"</em>.
        </p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            Portfolio Kit
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
            Your site is empty. That's on purpose.
          </h1>
        </div>
        <ThemeToggle />
      </div>

      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        This kit is a foundation and a set of Claude Code skills, not a template
        to rename. The build, the theming, the case engine and the deploy are
        wired up. What it looks like and what it says gets built with you.
      </p>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Start here
        </h2>
        <ol className="mt-4 space-y-4 text-foreground">
          <li className="leading-relaxed">
            <span className="font-medium">1.</span> Open this folder in Claude
            Code.
          </li>
          <li className="leading-relaxed">
            <span className="font-medium">2.</span> Run{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              /setup
            </code>
            . It asks who you are, what you do and how you want it to feel, then
            configures the site.
          </li>
          <li className="leading-relaxed">
            <span className="font-medium">3.</span> Ask it to build your home
            page, then write your first case.
          </li>
        </ol>
      </section>

      <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
        Prefer to wire it by hand? Fill in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
          src/site.config.ts
        </code>{" "}
        and this screen is replaced by your site. See{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">README.md</code>{" "}
        and{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">docs/</code>.
      </p>

      {/* Proves the theme tokens and dark mode are live before you write a line. */}
      <div className="mt-12 flex items-center gap-3">
        <span className="inline-flex size-8 rounded-full bg-primary" />
        <span className="text-sm text-muted-foreground">
          Your brand color, unset. <code className="text-xs">/setup</code>{" "}
          replaces it.
        </span>
      </div>
    </main>
  )
}