# Updating the kit

You bought a ZIP and built your site on top of it. When a new version ships (a bugfix or
new features), you don't lose your work. Here's how updates work and what to do.

## The short version

1. You receive a new kit ZIP.
2. In Claude Code, from your project, run **`/update`**.
3. It asks where the new ZIP is, shows you what changed, backs you up, and applies only
   the kit's framework files. Your cases, colors, pages, and identity stay exactly as
   they are.

That's it. You don't need to know git or merge anything by hand.

## What gets updated vs. kept

**Updated** (the kit's framework): the case-reading components, the build config, the
scripts, the skills, the shared library code. These are the parts you never edit by hand,
so the new version replaces them and you get the fixes.

**Kept, always** (your work):
- Your case studies (`src/content/cases/`)
- Your images (`src/assets/`)
- Your brand color (the `BRAND` lines in `src/index.css`)
- Your identity (`src/site.config.ts`, your `index.html` title/description)
- Your Home page and any pages you built
- Your domain (`public/CNAME`)
- Who you are, saved inside the skills (`profile.md`, `project-decisions.md`)

**Handled carefully** (files that are part kit, part yours): things like `package.json`
and `src/index.css` are merged, not overwritten. `/update` shows you the change and asks
before touching anything you might have edited.

## Before you update

`/update` backs you up first, but do your part:
- If your project is in git, commit your work so you have a clean restore point.
- If it isn't, make a copy of the whole project folder before running `/update`. If
  anything looks wrong after, that copy is your undo.

## Which version am I on?

Your current version is in `.claude/kit-version`. The full history of what changed in
each version is in [CHANGELOG.md](../CHANGELOG.md). `/update` reads both, so it knows
exactly what to apply.

## If something breaks

`/update` runs the build at the end and tells you if it fails. If it does, ask Claude to
help you fix it, or restore from your backup and reach out. You're never left with a
half-updated site without being told.