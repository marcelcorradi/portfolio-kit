import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import type { CaseSection } from "@/lib/cases"
import { cn } from "@/lib/utils"

/** Track which section is currently in the reading band of the viewport. */
function useActiveSection(sections: CaseSection[]) {
  const [activeId, setActiveId] = useState<string>()

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      // A heading counts as active once it reaches the top third of the screen.
      { rootMargin: "-112px 0px -70% 0px" }
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [sections])

  return activeId
}

/** Tick width follows the section's length, so the marks map the document. */
function tickWidth(weight: number) {
  return `${Math.round(16 + weight * 32)}px`
}

/**
 * Desktop: a stack of ticks, one per section, sized by how long each section
 * is. Quiet by default; hovering the stack reveals the titles.
 *
 * The marks double as a progress indicator and as navigation, so the reader
 * can see the shape of the argument without the chrome of a docs sidebar.
 */
function DesktopContents({
  sections,
  activeId,
}: {
  sections: CaseSection[]
  activeId?: string
}) {
  return (
    <nav
      aria-label="On this page"
      className="group pointer-events-none fixed inset-y-0 left-0 z-40 hidden items-center pl-8 xl:flex 2xl:pl-12"
    >
      <div className="pointer-events-auto py-4">
        {/* Named, always: without this the ticks are a puzzle, not a control. */}
        <p className="mb-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">
          On this page
        </p>

        <ul className="flex flex-col">
          {sections.map((section) => {
            const isActive = activeId === section.id
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={isActive ? "location" : undefined}
                  // Full-height hit area, not the 2px tick itself.
                  className="flex cursor-pointer items-center gap-3 rounded-sm py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    aria-hidden
                    style={{ width: tickWidth(section.weight) }}
                    className={cn(
                      "h-0.5 shrink-0 rounded-full transition-colors duration-200",
                      isActive
                        ? "bg-primary"
                        : "bg-border group-hover:bg-muted-foreground/40"
                    )}
                  />
                  <span
                    className={cn(
                      "max-w-44 text-xs leading-snug transition-opacity duration-200",
                      // Titles stay hidden until the reader reaches for them.
                      "opacity-0 group-hover:opacity-100 motion-reduce:transition-none",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {section.title}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

/**
 * Mobile: a progress strip along the bottom edge, plus a labelled pill that
 * opens the full list in the Sheet the site already uses.
 *
 * The two are separate on purpose. The strip reports position and nothing
 * else; the pill is the control, carrying the current section, a counter, and
 * a chevron so it reads as a button rather than as decoration.
 */
function MobileContents({
  sections,
  activeId,
}: {
  sections: CaseSection[]
  activeId?: string
}) {
  const [open, setOpen] = useState(false)
  const activeIndex = sections.findIndex((s) => s.id === activeId)
  const current = activeIndex >= 0 ? sections[activeIndex] : undefined

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex flex-col items-center gap-2 bg-gradient-to-t from-background via-background/95 to-transparent px-4 pb-4 pt-8 xl:hidden">
        {/* Progress: output only. A progress bar that is also a button is a
            false affordance — nobody taps one, because they never do anything. */}
        <div className="flex w-full max-w-sm gap-1" aria-hidden>
          {sections.map((section, index) => (
            <span
              key={section.id}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-200",
                index <= activeIndex && activeIndex >= 0
                  ? "bg-primary"
                  : "bg-border"
              )}
            />
          ))}
        </div>

        {/* The control: labelled, 44px tall, and visibly a button. */}
        <SheetTrigger className="pointer-events-auto flex h-11 max-w-full items-center gap-2 rounded-full border border-border bg-card/90 px-4 text-sm shadow-sm backdrop-blur-md transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="truncate text-foreground">
            {current?.title ?? "On this page"}
          </span>
          {activeIndex >= 0 && (
            <span className="shrink-0 font-mono text-xs text-muted-foreground">
              {activeIndex + 1}/{sections.length}
            </span>
          )}
          <ChevronUp className="size-4 shrink-0 text-muted-foreground" />
        </SheetTrigger>
      </div>

      <SheetContent side="bottom" className="max-h-[70vh] gap-0 p-6">
        <SheetTitle className="font-mono text-xs font-normal uppercase tracking-wide text-muted-foreground">
          On this page
        </SheetTitle>

        <ul className="mt-4 space-y-1 overflow-y-auto">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={() => setOpen(false)}
                aria-current={activeId === section.id ? "location" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors",
                  activeId === section.id
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-foreground hover:bg-accent"
                )}
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

export function CaseContents({ sections }: { sections: CaseSection[] }) {
  const activeId = useActiveSection(sections)

  // Not worth the chrome on a short case.
  if (sections.length < 3) return null

  return (
    <>
      <DesktopContents sections={sections} activeId={activeId} />
      <MobileContents sections={sections} activeId={activeId} />
    </>
  )
}
