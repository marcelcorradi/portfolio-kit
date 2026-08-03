# Agensi Listing — Portfolio Kit

Copy for the Agensi "List a Skill" form. Paste each field. Kept in the repo so it's
versioned with the product and reusable if the listing needs a refresh.

---

## Skill ZIP
`portfolio-kit-dist.zip` (built via `git archive`, 167KB, leak-scanned, `SKILL.md` at
root). Rebuild after any change to shipped files.

## Skill Name
Portfolio Kit

## Summary
A portfolio site you build with AI, not a template you rename.

## Full Description

**Most portfolio templates hand you someone else's design and ask you to swap the text.
This is different.**

Portfolio Kit is a production foundation plus a set of Claude Code skills that interview
you, then design your pages and write your case studies *with* you. The result reads as
yours, because it was built for you, not recolored from a demo.

### What's inside
- **A production foundation** — Vite, React 19, Tailwind v4, shadcn/ui, TypeScript, dark
  mode, per-route SEO, a sitemap generator, and a GitHub Pages deploy workflow. Wired up.
- **A content engine** — write a case as a Markdown file, drop it in a folder, it
  publishes. No CMS.
- **Four skills that do the work:**
  - `setup` runs a short interview and configures the whole site from your answers.
  - `portfolio-orchestrator` holds your decisions and runs a quality checklist built from
    the mistakes that get portfolios rejected.
  - `portfolio-content` writes your cases with a proven structure, grounded only in facts
    you give it — it refuses to invent numbers.
  - `portfolio-design` builds your pages with an opinionated, anti-template design
    philosophy, themed to a brand color you choose.

### How it works
1. `npm install` and `npm run dev`.
2. Run `/setup` — it asks who you are, what you do, how the site should feel.
3. Ask it to build your home page, then write your first case, one section at a time.

### What it is not
Not a finished site you fill in — it starts blank on purpose. Not a click-to-deploy
theme. Not a writing service. You build it in a conversation, and that takes an
afternoon, not five minutes. If you want a template to rename in ten minutes, this isn't
it, and that's the point.

## Compatibility Note
Requires Node.js 18+ and Claude Code. Works with any SKILL.md-compatible agent, best
with Claude Code. No account or backend needed; deploys free to GitHub Pages.

## Pricing
One-time, **$79** list price. Agensi takes 30%, so net is **$55.30/sale**. Confirmed
this over receiving-$79-net (which would need a $113 list price and push a review-less
new listing into ShipFast/Makerkit territory). $79 keeps the card inviting enough to
land the first sales and reviews; raise toward $113+ once there's social proof.

## Tags & Discovery
Category: Frontend & Design.
Tags: portfolio, case study, design portfolio, React, shadcn, Tailwind, personal site,
designer portfolio, developer portfolio, AI-built.

## Permissions
Reads and writes files in the project (creates pages, case Markdown, config), runs the
local dev server and build. No network calls, no credential access, no data leaves the
machine.

## FAQ
- **Is this a template I just rename?** No. It's a foundation plus AI skills that build
  the site with you. Blank on purpose.
- **Do I need to code?** No, but you need Node.js and Claude Code installed. The skills
  walk you through the commands and adapt to your technical comfort — designer or
  developer.
- **What do I actually get?** A complete project (foundation + skills + docs) as a ZIP.
  Unzip, `npm install`, run `/setup`.
- **Can I use it for client work?** Yes — the license covers personal and client-project
  use. You just can't resell the kit itself.
- **Updates?** Dependencies use caret ranges, so `npm install` picks up compatible
  updates. Major version bumps ship as updates you can pull. No lifetime-support promise.

## Assets still needed (open items)
- [ ] Logo 512×512
- [ ] At least one screenshot (the blank `/setup` screen + a finished example site)
- [ ] 30-second demo video (Loom/YouTube) — the form notes this doubles conversion
- [ ] Confirm the GitHub repo privacy before any public documentation link