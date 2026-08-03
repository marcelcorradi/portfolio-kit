# Listing Assets — Portfolio Kit

Prompts and capture notes for the Agensi listing images. Internal sales material,
versioned with the product but `export-ignore`d from the ZIP (buyers never get this).

Brand direction: **indigo, technical, trustworthy** — geometric, system/engineering
feel. Indigo ≈ `#4F46E5` (Tailwind indigo-600), the kit's original brand hue.

---

## 1. Logo — 512×512, for Figma Make / Nano Banana 2

Square, works small (it's a marketplace card icon), no baked-in text. Generate a few and
pick.

**Prompt A — monogram mark**
> A minimalist app icon, 512x512, square. A geometric monogram combining the letters
> "P" and "K" built from clean modular blocks, suggesting a design system and structured
> foundation. Deep indigo (#4F46E5) mark on a near-black (#0A0A0A) rounded-square
> background, subtle depth. Flat vector, sharp edges, high contrast, no text, no
> gradients heavier than a soft sheen. Modern developer-tool aesthetic, precise and
> trustworthy.

**Prompt B — abstract "kit / building blocks"**
> A minimalist app icon, 512x512, square. An abstract mark of a few precise modular
> shapes assembling into a whole — like design tokens snapping into a system. Indigo
> (#4F46E5) on a clean white rounded-square background, one darker indigo accent for
> depth. Flat vector, geometric, balanced negative space, no text. Feels engineered and
> premium, like a serious design-systems tool.

**Prompt C — "cursor / build with AI"**
> A minimalist app icon, 512x512, square. A geometric mark suggesting a page/portfolio
> frame with a small spark or cursor, implying a site built with AI. Indigo (#4F46E5)
> primary with a near-black background, one bright highlight. Flat vector, confident,
> minimal, no text, no photorealism.

Pick the one that still reads clearly at ~64px (marketplace card size).

## 2. Screenshots — CAPTURE, don't generate

Real screens only. Fake screenshots misrepresent the product. To capture:

```bash
cd c:\claudedev\portfolio-kit
npm install
npm run dev          # then screenshot in the browser
```

Shots worth having (up to 6 allowed):
1. **The blank onboarding screen** — the "Your site is empty. That's on purpose." Home,
   dark mode. Shows the honest starting point and the /setup call to action.
2. **A finished example site** — fill `src/site.config.ts` + one example case as a
   throwaway (e.g. the fictional "Priya Nair" fill we used to test), screenshot the built
   Home and a case page, then revert. Shows the payoff.
3. **The skills in the file tree** — `.claude/skills/` open in the editor, showing setup
   / orchestrator / content / design. Shows what they're actually buying.
4. Optional: a case page in reading view, to show the article-quality case layout.

Keep them dark-mode and consistent. Crop to the content, no OS chrome clutter.

## 3. Demo video — ~30s screen recording (Loom or YouTube)

Marcel records this. Shot list, in order:

1. **(0–5s)** Open the blank site in the browser: "Your site is empty. That's on
   purpose." Say: *"You don't get a template to rename. You get a system that builds
   your portfolio with you."*
2. **(5–15s)** In Claude Code, run `/setup`. Show it asking a couple of questions (name,
   what you do, brand feel). Say: *"It interviews you, then configures everything —
   color, meta, deploy."*
3. **(15–25s)** Ask it to build the home / write a case. Show a section landing. Say:
   *"Then it writes your cases and designs your pages, one section at a time, grounded in
   your real work."*
4. **(25–30s)** Cut to the finished example site. Say: *"An afternoon, and it's yours."*
   End on the product name + price.

Keep it fast and real — screen capture, no slides. The Agensi form notes a demo video
doubles conversion.