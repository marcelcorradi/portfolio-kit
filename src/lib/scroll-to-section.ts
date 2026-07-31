import type { MouseEvent } from "react"

/**
 * Scroll to a Home section, for a link that is already on the Home.
 *
 * In-page navigation on a router needs the click handled rather than left to
 * the browser: a plain `<a href="/#work">` triggers a full page load, and
 * clicking the section you are already on doesn't change the location, so
 * nothing re-renders and nothing scrolls.
 *
 * Pair it with a `<Link to="/#work">`. The link covers arriving from another
 * route (ScrollToTop scrolls once Home has rendered); this covers the case
 * where the section is on screen already. The section's own `scroll-mt-*`
 * keeps it clear of the fixed nav.
 */
export function scrollToSection(hash: string) {
  return (event: MouseEvent) => {
    const target = document.getElementById(hash.slice(1))
    if (!target) return

    event.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}
