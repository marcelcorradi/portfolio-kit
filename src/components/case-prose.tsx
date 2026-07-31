import type { ReactNode } from "react"
import type { Components } from "react-markdown"
import { slugifyHeading } from "@/lib/cases"

/** Flatten a heading's children back to text, to derive its anchor id. */
function headingText(children: ReactNode): string {
  if (typeof children === "string") return children
  if (Array.isArray(children)) return children.map(headingText).join("")
  return ""
}

/**
 * How markdown renders inside a case.
 *
 * Deliberately not @tailwindcss/typography: the case body needs the same
 * vocabulary the rest of the site already speaks, so these map onto the
 * utilities the Home uses. One source of truth, reused by every case.
 */
export const caseProse: Components = {
  // The id is what the table of contents links to, derived from the heading
  // text with the same slug rule the contents list uses.
  h2: ({ children, ...props }) => (
    <h2
      id={slugifyHeading(headingText(children))}
      className="mt-16 scroll-mt-28 text-2xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),

  h3: ({ children, ...props }) => (
    <h3 className="mt-10 text-lg font-medium text-foreground" {...props}>
      {children}
    </h3>
  ),

  p: ({ children, ...props }) => (
    <p className="mt-5 leading-relaxed text-muted-foreground" {...props}>
      {children}
    </p>
  ),

  ul: ({ children, ...props }) => (
    <ul className="mt-5 space-y-2 pl-5" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }) => (
    <ol className="mt-5 list-decimal space-y-2 pl-5" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }) => (
    <li className="leading-relaxed text-muted-foreground marker:text-border" {...props}>
      {children}
    </li>
  ),

  // Emphasis lands on the foreground colour: the body sits on muted, so bold
  // text stepping up in contrast is what makes a number catch the eye.
  strong: ({ children, ...props }) => (
    <strong className="font-medium text-foreground" {...props}>
      {children}
    </strong>
  ),

  // Links off the site open in a new tab: a case is a read, and sending someone
  // to a live product should not cost them their place in it. Same-page anchors
  // and internal routes stay in the tab, where a new one would be a nuisance.
  a: ({ children, href, ...props }) => {
    const external = /^https?:\/\//.test(href ?? "")
    return (
      <a
        href={href}
        className="text-primary underline underline-offset-4 hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </a>
    )
  },

  // Token names (spacing.stack.md, onf-ds-button) carry real weight in these
  // cases, so inline code is styled to read as a value, not as decoration.
  code: ({ children, ...props }) => (
    <code
      className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-secondary-foreground"
      {...props}
    >
      {children}
    </code>
  ),

  blockquote: ({ children, ...props }) => (
    <blockquote
      className="mt-6 border-l-2 border-primary pl-5 text-muted-foreground italic"
      {...props}
    >
      {children}
    </blockquote>
  ),

  hr: (props) => <hr className="my-12 border-border" {...props} />,
}
