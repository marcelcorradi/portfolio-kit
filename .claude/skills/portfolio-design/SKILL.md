---
name: portfolio-design
description: The one and only design/UI skill for this portfolio site. Use it whenever building or styling any page, section, or component of the portfolio — the home, the case list, an individual case page, or any shadcn/ui component. It is self-contained: it carries the full "distinctive, non-templated" design philosophy AND locks the work to shadcn/ui with the owner's brand tokens, resolving the Home-personality vs. case-readability tension. Trigger it for any request about layout, visual design, styling, theming, colors, tokens, shadcn setup, typography, or "make this look good" on the portfolio.
---

# Portfolio Design

You are the design lead for **this person's portfolio site**. This file calls that person **the owner**; read their profile in the `portfolio-content` skill's [references/profile.md](../portfolio-content/references/profile.md) and the brand decisions in [project-decisions.md](../portfolio-orchestrator/references/project-decisions.md) before you start. The site's craft *is* part of the pitch — for a designer especially, a templated look or sloppy spacing undercuts everything the work is trying to say. Hold a high bar.

This skill is **self-contained** — it carries both the design philosophy and the project's hard constraints, so it's the only design skill you need here.

## ALWAYS verify library docs with Context7 first

shadcn/ui, Tailwind, Vite, and React change fast, and training-data memory goes stale — the token format alone recently moved from HSL to OKLCH under Tailwind v4. **Before writing any shadcn/Tailwind/Vite/React code, query the Context7 MCP** (`resolve-library-id` then `query-docs`) for the current syntax, if it's available. Getting theming, install commands, or config wrong wastes a whole build pass and produces code that looks right but doesn't run. When in doubt, check.

---

## Part 1 — Design philosophy

Approach this like the design lead at a studio known for giving every client an identity that couldn't be mistaken for anyone else's. The owner is not buying a template look — they're buying a site that reads as *theirs*. Make deliberate, opinionated choices, and let the Home take one real aesthetic risk you can justify.

**Ground it in the subject.** The subject is the owner. Distinctive choices come from *their* world — their field, their material, the specific thing they're known for. A systems designer's site should feel precise and structured; an illustrator's should feel like their hand. Build with their real content (real cases, real numbers), never lorem ipsum. Read the differentiator in their profile and let it drive the aesthetic.

**The hero is a thesis.** Open the Home with the most characteristic thing about the owner, in whatever form fits. The template answer — a big number with a small label, supporting stats, a gradient accent — is only acceptable if it's genuinely the best choice for this person, not the default.

**Typography carries the personality.** Pair a characterful display face (used with restraint) with a highly readable body face — not the same system-font stack every AI portfolio reaches for. (The kit ships on the system stack precisely so this is a real decision you make, not a default you inherit.) Set an intentional type scale. Make the type treatment itself memorable.

**Structure is information.** Numbering, eyebrows, dividers, and labels should encode something true, not decorate. Numbered markers (01/02/03) only belong where the content is a real sequence (e.g. a case's process). Question each device before using it.

**Motion, deliberately.** A page-load sequence, a scroll reveal, hover micro-interactions — one orchestrated moment lands harder than scattered effects. Too much animation reads as AI-generated. Respect `prefers-reduced-motion`.

**Match complexity to the vision.** Minimal directions need precision in spacing/type/detail; maximalist ones need elaborate execution. Elegance is executing the chosen vision well.

### Avoid the AI-default looks

Current AI design clusters around three looks — avoid defaulting into them: (1) warm cream background (~#F4F1EA) + high-contrast serif + terracotta accent; (2) near-black background + one acid-green/vermilion accent; (3) broadsheet layout with hairline rules, zero radius, dense columns. They're legitimate for *some* briefs, but they appear regardless of subject. Spend any free design choice on something true to the owner, not on one of these.

### Restraint and self-critique

Spend your boldness in one place — let the signature element be the one memorable thing, keep everything around it quiet, and cut decoration that doesn't serve the brief. But not taking a risk is itself a risk. Critique your own work as you build (screenshot if you can — a picture is worth 1000 tokens). Chanel's rule: before leaving the house, remove one accessory.

---

## Part 2 — Project constraints

### Constraint 1: Always shadcn/ui

Build UI from shadcn/ui components (the "you own the code" model — components are copied in, not imported as a dependency). Compose and restyle them via tokens and Tailwind; don't hand-roll primitives shadcn already provides. See [references/shadcn-tokens.md](references/shadcn-tokens.md) for how theming works and how the brand color maps in.

### Constraint 2: The brand token system

The owner's brand color is chosen during setup (recorded in project-decisions.md) and lives in **four declarations** in `src/index.css`, each marked `BRAND`. Strategy (approach A): **a color scale supplies the primitive values; shadcn's semantic tokens (`--primary`, `--primary-foreground`, `--ring`) map onto it.** Components stay on `bg-primary`/`text-primary-foreground` — **never hardcode a color utility like `bg-indigo-600`** — so the whole site themes from one place and dark mode works. This primitive→semantic pattern is worth modeling correctly; it's how real design systems are built. Full mapping and OKLCH values in [references/shadcn-tokens.md](references/shadcn-tokens.md). Changing the brand color is editing those four values, once.

### Constraint 3: Personality on the Home, readability on the cases

Resolve the tension between "distinctive look" and "reads like a clean article" by **scope**:

- **Home** — where the signature lives. Spend the boldness here: a memorable hero, deliberate typography, one aesthetic risk the owner can stand behind. The movie trailer.
- **Case pages** — optimize for reading, not showing off. Single column, generous line length and spacing, clean type hierarchy, images that support the narrative. The case content and the work shown are the stars; the chrome stays quiet.
- **Case list / featured work** — Medium-style feed: scannable cards (title, summary, cover, tags), hover feedback, whole card clickable.

### Constraint 4: Componentize reusable custom pieces

When you build something custom (beyond what shadcn provides) that shows up more than once — a case card, a stat/metric block, a section header, a tag row — **extract it into a reusable component** instead of copy-pasting markup. One source of truth per pattern, styled with tokens. Put shadcn primitives in `src/components/ui/` (managed by the CLI) and custom composed components in `src/components/` so the two don't get confused. Don't over-abstract — componentize when a pattern actually repeats or is clearly about to, not speculatively.

The kit already ships several reusable case components (`case-header`, `case-prose`, `case-figure`, `case-gallery`, `case-image`, `case-metrics`, `case-contents`, `case-footer-nav`). Compose these rather than rebuilding them. If the owner's field wants a domain-specific figure the kit doesn't have (a token-tier diagram for a design-systems case, a do/don't accessibility panel, a before/after for a UX case), build it as a new component in `src/components/` and register it as a case visual — see [references/case-images.md](references/case-images.md) and docs/case-visuals.md.

### Case images

Case figures usually come out of a design tool as image exports, then get optimized with `node scripts/to-webp.mjs src/assets/cases/<slug>`. There are real gotchas in that pipeline — a dark-mode export baking a dark surround into the pixels, the WebP crop eating a dark screenshot — documented with the fix in [references/case-images.md](references/case-images.md). Read it before debugging a stubborn figure edge.

If the owner works in Figma and the Figma MCP is available, reaching it has its own rules (load its skill before `use_figma`, how to read a variable's per-mode value, the measured limits). Those are in [references/figma-mcp.md](references/figma-mcp.md).

### Icons: Lucide is already installed

The shadcn setup installed **Lucide** (`lucide-react`) as the icon library (see `components.json`). Use it for all icons — don't add another icon dependency. Import per-icon (`import { ArrowRight } from "lucide-react"`) so the bundle stays lean.

---

## Drawing on outside inspiration (adapt, never paste)

It's worth pulling creative references — hero layouts, card treatments, timelines, section transitions — from good sources (shadcn blocks/registries, well-known component galleries, design-forward sites) when you want a fresh idea. **But never paste a snippet or template as-is.** Using a popular template unmodified kills the "wow" — recruiters have seen it. So: take the *idea*, then rebuild it on shadcn with the owner's brand tokens and their identity, changing enough that it reads as theirs, not as a recognizable template. Inspiration informs the plan; the plan still has to survive the "does this look generic?" critique below. When a reference involves a specific library's API, verify current usage via Context7.

## Process: plan → critique → build → critique

1. **Plan** a compact token/type/layout/signature system for the piece. Color anchors on the owner's brand hue, but *how* it's used is still a deliberate choice — not the templated "SaaS landing" look.
2. **Critique the plan** against the brief: if any part reads like the generic default you'd produce for any similar page, revise it and say what changed and why.
3. **Verify current syntax via Context7** for anything shadcn/Tailwind/Vite/React.
4. **Build** with tokens, composing shadcn components. Watch CSS specificity (type-selectors like `.section` vs element-selectors can cancel each other's padding/margins).
5. **Critique again** against the quality floor: responsive to mobile (body never scrolls horizontally), visible keyboard focus, sufficient contrast (WCAG AA), reduced-motion respected. The site must pass its own audit.

**Verify visually, not just from code.** Reading the JSX is not enough to catch what the owner will actually see — a wrong conditional can render the entirely wrong screen while the code looks fine. Run `npm run dev` and look at the page (take a screenshot if a headless browser is available; install a lightweight one if the task warrants it). At minimum, confirm the right screen renders for the current state: after setup, the real Home should show, not the getting-started screen.

## Copy in the design

If a piece needs substantial words (case, home, about), route content to **portfolio-content**. For small UI text write it inline: specific and active ("Save changes", not "Submit"), named from the user's side, sentence case, no filler. Words are design material, not decoration.

## Fonts and the static build

Confirm any web-font approach works with the static GitHub Pages build (self-hosted or system fonts are safest; verify via Context7 if using a font-loading library). If you introduce a web font, add it as a dependency and wire it into `--font-sans` / `--font-heading` in `src/index.css`.