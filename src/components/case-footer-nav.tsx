import { Link } from "react-router"
import { ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

/**
 * The end of a case. A reader who finished 2,000 words should not hit a wall,
 * so this points back at the rest of the work.
 */
export function CaseFooterNav() {
  return (
    <div className="mt-20">
      <Separator />
      <Link
        to="/"
        className="group mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
        Back to home
      </Link>
    </div>
  )
}
