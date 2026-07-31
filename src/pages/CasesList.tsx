import { Link } from "react-router"
import { getAllCases } from "@/lib/cases"
import { usePageMeta } from "@/lib/use-page-meta"

export default function CasesList() {
  const cases = getAllCases()

  // Deliberately noindex: this is an unstyled dev stub nothing links to, kept
  // because /cases/:slug lives under it. It is not part of the navigation, and
  // it should never be what a search result shows. robots.txt disallows it too.
  usePageMeta({ noIndex: true, path: "/cases" })

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm">
        <Link to="/" className="text-primary hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        Cases
      </h1>

      <ul className="mt-8 space-y-6">
        {cases.map((c) => (
          <li key={c.slug}>
            <Link to={`/cases/${c.slug}`} className="group block">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h2 className="text-xl font-medium text-foreground group-hover:text-primary">
                  {c.title}
                </h2>
                <time className="text-sm text-muted-foreground">{c.date}</time>
              </div>
              <p className="mt-1 text-muted-foreground">{c.summary}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
