import type { ComponentType, SVGProps } from "react"
import { Separator } from "@/components/ui/separator"

interface CaseHeaderProps {
  title: string
  /** Monochrome brand logo; same component the card on the Home uses. */
  logo?: ComponentType<SVGProps<SVGSVGElement>>
  logoClassName?: string
  company?: string
  /** Scope facts, rendered as a definition list. Order is preserved. */
  facts: { label: string; value: string }[]
}

/**
 * Case page header: brand logo, title, and a scannable scope block.
 *
 * The scope block is the "TL;DR" — a recruiter who reads nothing else should
 * still leave knowing the role, the timeframe, and the result. The prose hook
 * that follows does the convincing; this does the scanning.
 */
export function CaseHeader({
  title,
  logo: Logo,
  logoClassName = "h-6",
  company,
  facts,
}: CaseHeaderProps) {
  return (
    <header>
      {Logo ? (
        <Logo
          className={`${logoClassName} w-auto text-muted-foreground`}
          role="img"
          aria-label={company ? `${company} logo` : undefined}
        />
      ) : (
        company && (
          <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
            {company}
          </p>
        )
      )}

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>

      <Separator className="mt-8" />

      <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-foreground">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  )
}
