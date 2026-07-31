import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, Outlet } from "react-router"
import { RouterProvider } from "react-router/dom"
import "./index.css"
import Home from "./pages/Home"
import CasesList from "./pages/CasesList"
import CasePage from "./pages/CasePage"
import NotFound from "./pages/NotFound"
import { ScrollToTop } from "./components/scroll-to-top"

/** Wraps every route so navigation always lands at the top of the page. */
function Root() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter(
  [
    {
      element: <Root />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/cases", element: <CasesList /> },
        { path: "/cases/:slug", element: <CasePage /> },
        // Anything else: a typo, a stale link, or a deep link to a case that
        // no longer exists. Must stay last.
        { path: "*", element: <NotFound /> },
      ],
    },
  ],
  // Keep in sync with Vite's `base` so links work on GitHub Pages.
  { basename: import.meta.env.BASE_URL },
)

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)