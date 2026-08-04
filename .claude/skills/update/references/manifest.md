# Update manifest — what's the kit, what's yours

The `/update` skill uses this to apply a new kit version without touching your work.
Every path in the kit falls into one of three buckets. When in doubt, a file is
**buyer-owned** (leave it), never the reverse — it's always safer to skip an update to
a file than to overwrite someone's work.

Paths are relative to the project root.

## KIT — overwrite with the new version

Pure framework. The buyer never hand-edits these, so the new version wins.

- `src/components/` — all of it: the `case-*.tsx` reading components, `project-logo.tsx`,
  `scroll-to-top.tsx`, `theme-toggle.tsx`, and everything in `src/components/ui/`.
- `src/lib/` — `cases.ts`, `use-page-meta.ts`, `utils.ts`, `scroll-to-section.ts`.
- `src/pages/CasePage.tsx`, `src/pages/CasesList.tsx`, `src/pages/NotFound.tsx`.
- `src/content/case-visuals/types.ts`.
- `scripts/` — `build-sitemap.mjs`, `check-anchors.mjs`, `to-webp.mjs`.
- Build/tooling config: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`,
  `components.json`, `.oxlintrc.json`, `.gitattributes`, `.gitignore`.
- `.github/workflows/deploy.yml`.
- `public/robots.txt`, `public/404.html` (but preserve `pathSegmentsToKeep` if the buyer
  is on a GitHub-Pages project path — see MIXED).
- The skills: every `SKILL.md` and reference under `.claude/skills/` **except the two
  buyer-owned data files listed below**. Also `.claude/settings.json`,
  `.claude/hooks/`, and this manifest itself.
- Docs and product copy: `README.md`, `CHANGELOG.md`, `docs/`, `LICENSE`, root `SKILL.md`.
- `.claude/kit-version` — the update writes the new version here at the end.

## BUYER — never overwrite

Their content and identity. Most of these don't exist in a fresh kit (the kit ships
blank); they appear only after the buyer works. Leave every one untouched.

- `src/content/cases/` — their case studies (all `.md` files).
- `src/content/case-visuals/<slug>.tsx` — their per-case visual modules (everything here
  except `types.ts` and `index.ts`, which are MIXED/kit).
- `src/assets/` — their images.
- `public/CNAME` — their domain.
- `.claude/settings.local.json` — machine-local, gitignored.
- **The two buyer-data files hiding inside the skills dir — the #1 trap:**
  - `.claude/skills/portfolio-orchestrator/references/project-decisions.md` — owner
    identity, differentiator, brand, page decisions.
  - `.claude/skills/portfolio-content/references/profile.md` — identity + accumulated
    case facts.
  These are inside a KIT directory but are BUYER data. Overwriting them erases who the
  buyer is. Skip them explicitly.

## MIXED — surgical, never overwrite the whole file

Part kit, part buyer. Apply kit changes without clobbering the buyer's parts.

- **`src/index.css`** — the `@theme inline` block, the full token scale, `@layer base`,
  radius scale are KIT. Only the four lines marked `/* BRAND ... */` (`--primary` and
  `--ring`, light and dark) plus `--font-heading`/`--font-sans` (if the buyer picked
  custom fonts) are BUYER. Apply structural changes from the new version, but keep the
  buyer's four BRAND values and their font vars exactly.
- **`src/site.config.ts`** — the `SiteConfig` interface, `isConfigured()`,
  `defaultTitle()`, comments = KIT. The exported `site = {…}` values = BUYER. If the new
  version adds a field to the schema, add it; keep every value the buyer set.
- **`src/pages/Home.tsx`** — the kit ships a placeholder; the design skill rewrites it.
  Once configured, treat as BUYER: don't overwrite. If the new version changes the
  placeholder meaningfully, mention it, but never replace a built Home.
- **`src/main.tsx`** — routes are KIT, but the buyer may have added a route. Don't
  overwrite blindly: show the diff and confirm before applying.
- **`package.json`** — deps, scripts, `version` = KIT. The buyer may have added deps.
  **Merge**: bump the kit's dependency ranges and scripts, keep any deps the buyer added.
  This is where updated dependency versions land.
- **`src/content/case-visuals/index.ts`** — `getCaseVisuals()` and the `caseVisuals`
  declaration = KIT. The registry's entries (buyer's `import`s + registrations) = BUYER.
  Update the surrounding code without dropping the buyer's entries.
- **`index.html`** — the two inline `<script>` blocks (SPA redirect, pre-paint theme),
  favicon/manifest links, viewport = KIT. `<title>`, description, canonical, OG tags =
  BUYER (written by `/setup`). Apply kit changes to the scripts/links; keep the buyer's
  meta.
- **`public/favicon.svg`, `public/site.webmanifest`** — ship as kit placeholders carrying
  the brand hex. `/setup` rewrites the hex; the buyer likely replaces the favicon mark.
  Overwrite only if they still match the shipped placeholder (i.e. untouched).
- **`vite.config.ts`** — KIT, but `/setup` edits `base` for GitHub-Pages project paths.
  Preserve the buyer's `base` value if it isn't `'/'`.

## The rule when a file isn't listed

A new kit version may add files not in this manifest. A **new file that doesn't exist in
the buyer's tree** is safe to add (it's new framework). A file that exists in both and
isn't listed: treat as MIXED — show the diff and ask, don't overwrite blind.