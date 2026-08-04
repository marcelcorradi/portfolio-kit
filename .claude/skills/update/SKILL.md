---
name: update
description: Applies a new version of the Portfolio Kit to this project without overwriting the buyer's work. Use it whenever the owner has a newer kit ZIP (a bugfix or a new release) and wants to bring their site up to date. It reads what changed, updates only the kit's framework files, and preserves the owner's cases, brand color, configured pages, and identity. Trigger it for "update the kit", "apply the new version", "I got a new kit ZIP", or "/update".
---

# Update — apply a new kit version, keep the owner's work

You bring this project up to a newer version of the Portfolio Kit **without destroying
what the owner built** on top of it. Their cases, their brand color, their rebuilt Home,
their identity: all preserved. Only the kit's framework files move to the new version.

The whole risk of this operation is overwriting the owner's work. So the rule is: when
unsure whether a file is the kit's or the owner's, **leave it alone and ask**. Read
[references/manifest.md](references/manifest.md) — it lists exactly what's the kit
(overwrite), what's the owner's (never touch), and what's mixed (surgical).

## Teach as you go

The owner may be a designer, not a developer. Explain each step in plain language before
you do it, and say what you're about to change and why. Never run a destructive step
silently. Match your explanations to their comfort level (recorded in
`.claude/skills/portfolio-orchestrator/references/project-decisions.md`): a developer
doesn't need `npm` explained; a designer does.

## Steps

### 1. Back up first (non-negotiable)

You are about to overwrite files. Before anything, make sure the owner can undo this.
- If the project is a git repo with a clean tree, that's a good enough backup (they can
  `git restore`). Confirm the tree is clean; if not, ask them to commit or stash first.
- If they don't use git, tell them to make a copy of the whole project folder (or zip it)
  and confirm they've done it before you continue. Be explicit: "I'm going to change kit
  files. If anything goes wrong, this backup is your undo."

### 2. Read the from/to

- Current version: read `.claude/kit-version`.
- New version: read `package.json` `version` inside the new ZIP (see step 3).
- Show the owner the `CHANGELOG.md` entries between the two, so they know what's changing
  and whether any step needs their attention.
- If the new version is the same as or older than the current one, stop and say so.

### 3. Locate and unpack the new ZIP

Ask the owner where the new kit ZIP is (the one they received). Unzip it into a temporary
directory outside the project (not into the project). This temp copy is the source of the
new kit files; the project is the target.

### 4. Apply, by the manifest

Work through [references/manifest.md](references/manifest.md):

- **KIT files** → copy the new version over the project's copy. (Skip the two buyer-owned
  data files that live inside `.claude/skills/` — the manifest names them.)
- **BUYER files** → do not touch. Most won't even exist in the new ZIP.
- **MIXED files** → apply the surgical rule the manifest gives for each:
  - `src/index.css`: bring structural changes; keep the owner's four `/* BRAND */` values
    and font vars.
  - `package.json`: merge — bump kit deps/scripts, keep deps the owner added.
  - `site.config.ts`: adopt new schema fields; keep the owner's values.
  - `main.tsx`, `Home.tsx`, `case-visuals/index.ts`, `index.html`: show the diff and
    **ask before changing**, because the owner may have edited them.
- **New files** not in the manifest and not in the project: safe to add. Files that exist
  in both and aren't listed: treat as mixed, show the diff, ask.

Tell the owner, as you go, which of their files you are deliberately leaving untouched, so
they can see their work is safe.

### 5. Verify the build

Run `npm install` (deps may have changed) then `npm run build`. It must pass.
- If it fails, show the owner the error and don't leave them half-updated silently. Either
  fix forward with them or help them restore from the backup in step 1.

### 6. Finish

- Write the new version into `.claude/kit-version`.
- Summarize: which kit files updated, which of their files you preserved, and any MIXED
  file that needed a decision.
- Point them at `CHANGELOG.md` for the full list.

## Never

- Never overwrite `src/content/cases/`, `src/assets/`, `public/CNAME`, or the two
  buyer-data files in the skills dir (`project-decisions.md`, `profile.md`).
- Never replace a configured `Home.tsx`, or the owner's four BRAND colors, or their
  `site.config.ts` values.
- Never skip the backup step, and never run a destructive overwrite without saying so.