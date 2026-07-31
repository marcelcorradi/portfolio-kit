import { useEffect } from "react"
import { useLocation } from "react-router"

/**
 * Put every navigation where it asked to go: the top of the page, or the
 * section named in the hash.
 *
 * React Router keeps the scroll position across route changes, so leaving a
 * case from its footer would open the next page halfway down.
 *
 * Hash links need the opposite help. Arriving at `/#work` from another route
 * renders Home and the target section in the same commit this effect runs
 * after, but the browser only scrolls to a hash on a full page load — which a
 * client-side navigation is not. So the scroll is done here, and the section's
 * own `scroll-mt-*` keeps it clear of the fixed nav.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
      return
    }

    // decodeURIComponent so a non-ASCII id still matches.
    const target = document.getElementById(decodeURIComponent(hash.slice(1)))
    if (!target) return

    target.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [pathname, hash])

  return null
}
