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

Paste the HTML below into the Agensi description editor. Tags it accepts (verified
Aug 2026): `<strong>`, `<em>`, `<ul>/<li>`, `<ol>/<li>`, `<h3>`. No nested lists, no
`<code>` (so the four skills are flat `<li>`s and command names use `<strong>`). If the
editor shows the tags literally instead of rendering them, fall back to typing and use
its toolbar buttons.

```html
<strong>Most portfolio templates hand you someone else's design and ask you to swap the text. This is different.</strong>

Portfolio Kit is a production foundation plus a set of Claude Code skills that interview you, then design your pages and write your case studies <em>with</em> you. The result reads as yours, because it was built for you, not recolored from a demo.

<h3>What's inside</h3>

<ul>
  <li><strong>A production foundation</strong> — Vite, React 19, Tailwind v4, shadcn/ui, TypeScript, dark mode, per-route SEO, a sitemap generator, and a GitHub Pages deploy workflow. Wired up.</li>
  <li><strong>A content engine</strong> — write a case as a Markdown file, drop it in a folder, it publishes. No CMS.</li>
  <li><strong>setup</strong> runs a short interview and configures the whole site from your answers.</li>
  <li><strong>portfolio-orchestrator</strong> holds your decisions and runs a quality checklist built from the mistakes that get portfolios rejected.</li>
  <li><strong>portfolio-content</strong> writes your cases with a proven structure, grounded only in facts you give it. It refuses to invent numbers.</li>
  <li><strong>portfolio-design</strong> builds your pages with an opinionated, anti-template design philosophy, themed to a brand color you choose.</li>
</ul>

<h3>How it works</h3>

<ol>
  <li>Run <strong>npm install</strong> and <strong>npm run dev</strong>.</li>
  <li>Run <strong>/setup</strong>. It asks who you are, what you do, how the site should feel.</li>
  <li>Ask it to build your home page, then write your first case, one section at a time.</li>
</ol>

<p>And you keep going by asking. A top nav, a new section, a different hero, a completely different look: describe it and the skills build it, applying the same design philosophy to whatever you invent. It's a foundation to build on, not a fixed set of screens.</p>

<h3>What it is not</h3>

Not a finished site you fill in. It starts blank on purpose. Not a click-to-deploy theme. Not a writing service. You build it in a conversation, and that takes an afternoon, not five minutes. If you want a template to rename in ten minutes, this isn't it, and that's the point.
```

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
- **Can I change the design and add my own sections later?** Yes, completely. The design
  skill applies its philosophy to whatever you ask for, so you can add a nav, new
  sections, a different hero, or change the whole look just by describing it. The starter
  is a foundation, not a fixed set of screens.
- **Do I need to code?** No, but you need Node.js and Claude Code installed. The skills
  walk you through the commands and adapt to your technical comfort, designer or
  developer.
- **What do I actually get?** A complete project (foundation + skills + docs) as a ZIP.
  Unzip, `npm install`, run `/setup`.
- **Can I use it for client work?** Yes. The license covers personal and client-project
  use. You just can't resell the kit itself.
- **Updates?** Dependencies use caret ranges, so `npm install` picks up compatible
  updates. Major version bumps ship as updates you can pull. No lifetime-support promise.

## Assets still needed (open items)
- [ ] Logo 512×512
- [ ] At least one screenshot (the blank `/setup` screen + a finished example site)
- [ ] 30-second demo video (Loom/YouTube) — the form notes this doubles conversion
- [ ] Confirm the GitHub repo privacy before any public documentation link