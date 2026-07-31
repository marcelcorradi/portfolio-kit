import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface Metric {
  value: string
  label: string
  /** Optional comparison, e.g. "vs 17 before". Kept quiet under the label. */
  note?: string
}

/**
 * A row of key figures, for numbers that would otherwise be buried in prose.
 * Best on cases that have a few hard numbers carrying the argument: adoption,
 * counts, percentages. Skip it on cases where the story is not numeric.
 */
export function CaseMetrics({ metrics }: { metrics: Metric[] }) {
  // Two columns pair up an even count. Exactly three would strand a half-width
  // card on its own row, so those go side by side instead. Everything else
  // stays on two, which keeps enough width for the labels.
  const columns = metrics.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"

  return (
    <div className={cn("my-12 grid gap-3", columns)}>
      {metrics.map((metric) => (
        <Card key={metric.label} size="sm">
          <CardContent>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              {metric.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
            {metric.note && (
              <p className="mt-1 text-xs text-muted-foreground/80">{metric.note}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
