# Project Decisions — Source of Truth

Living record of this portfolio's locked decisions. Keep it updated whenever a decision changes. Everything else in the project should defer to this file.

Sections marked **[set by /setup]** are filled by the setup interview. You can also edit any of it by hand — this file is the record, not a form.

## Who this is for  [set by /setup]

**Owner:** _(name)_ — _(role / title)_.

**Core differentiator (must come through everywhere):** _(the one true thing that
separates this person from every other candidate — e.g. "a designer who also ships
production code", "a researcher who turns studies into shipped features", "an
illustrator with a motion background"). If this is blank, stop and ask before
building anything.)_

**Positioning / recruiter target:** _(what to lead with, and who the site is
speaking to.)_

**Language:** _(the site's language. English reaches the widest audience; a local
language can be right for a local market.)_

**Technical comfort:** _(developer — comfortable with git/npm / designer — guide me
through commands. Governs how much the skills explain.)_

## Stack

- **Vite + React + Tailwind + shadcn/ui** — static site, no backend.
- **Cases authored in Markdown** — content stays separate from code. Drop a `.md`
  in `src/content/cases/` and it publishes. See [docs/content-model.md](../../../../docs/content-model.md).
- **Deploy: GitHub Pages** via GitHub Actions (static export). See [docs/deploy.md](../../../../docs/deploy.md).

## Page structure  [confirm during setup]

The kit ships with a Home (`/`), a case reading page (`/cases/:slug`), a `/cases`
stub, and a catch-all. The intended shape:

- **Home** — the landing page. This is where personality lives (the "signature"):
  a hook, who the owner is, featured work, contact. Think "movie trailer".
- **Individual case page** — article/reading layout. Single column, clean
  typography, maximum readability. This template is shared by every case.
- **About** — decide during setup whether this is its own route or a section on
  the Home. A short About section on the Home is often enough; a full page is
  reinforcement, not foundation.

Record the owner's choices here as they're made.

## Two types of case study

Most portfolios mix two kinds of case, and they read differently:

1. **Client / employer work** — often metric-rich (adoption, counts, %, before/after).
   Lead with the outcome; the numbers carry the argument.
2. **Authorial / self-built work** (a product, a tool, a side project) — rarer and
   high-signal because it shows initiative. Often less about metrics, more about
   the thinking and the finished thing. Can end on a CTA to the live product.

Not every portfolio has both. Record which kinds this owner has.

## Brand color  [set by /setup]

**Chosen:** _(the brand hue and why — setup picks this from the intent the owner
describes, not from a color name.)_

**Token strategy:** the brand hue lives in **four declarations** in `src/index.css`,
each marked `BRAND` (light `--primary` + `--ring`, dark `--primary` + `--ring`).
Semantic shadcn tokens map onto it. **Never hardcode a color utility** like
`bg-indigo-600` on a component — components stay on `bg-primary` so the whole site
re-themes from one file. Full recipe in the `portfolio-design` skill's
[references/shadcn-tokens.md](../../portfolio-design/references/shadcn-tokens.md).

## Deploy  [set during deploy]

Record here once live: the URL, whether it's a custom domain (needs `public/CNAME`
and Vite `base: '/'`) or a project path (`user.github.io/repo`, needs
`base: '/repo/'`), and that pushes to `main` auto-deploy via
`.github/workflows/deploy.yml`.

## Build gotchas — do not relearn these the hard way

These are baked into the kit's scripts and workflow. They stay true for any owner.

⚠️ **Case visual anchors fail silently.** Visuals attach to sentences in the
Markdown by matching an `anchor` string verbatim (see [docs/case-visuals.md](../../../../docs/case-visuals.md)).
Reword that sentence and the figure drops with no error — and the build still
passes on its own. `npm run build` runs `scripts/check-anchors.mjs` to catch this;
run `node scripts/check-anchors.mjs` any time you edit case prose.

⚠️ **Don't run `to-webp.mjs` on browser screenshots of a dark UI.** Its crop scans
inward for pixels brighter than a threshold (to strip a design tool's dark canvas),
and a dark-mode interface sits below that threshold everywhere — it will crop the
image to a sliver. Convert those with `sharp` directly, no crop.

⚠️ **Export design-tool figures in Light Mode.** If section fills are bound to a
theme token that resolves dark, the export bakes a dark surround into the pixels —
unfixable in CSS, and it can draw a square corner through rounded frames. Full
workflow in `portfolio-design`'s [references/case-images.md](../../portfolio-design/references/case-images.md).

## Repo conventions

- Skills live in `.claude/skills/<name>/SKILL.md`.
- Portfolio skills: `portfolio-orchestrator` (parent), `portfolio-design`,
  `portfolio-content`, and `setup` (first-run interview).
- Images: `src/assets/cases/<slug>/`, converted with
  `node scripts/to-webp.mjs <dir>`.