# Figma MCP — how to reach the skills and what the tools do

The Figma MCP server ships its own skills and requires loading one *before* certain tool calls.
Written after a session where finding this path cost several wrong turns. This is only relevant
if the owner works in Figma and the Figma MCP is connected; skip it otherwise.

## 1. Read the skill first — it is mandatory, not advisory

Two tools refuse to behave without their skill loaded first:

| Before calling… | Load |
|---|---|
| `use_figma` | `figma-use` |
| `get_design_context` | `figma-design-to-code` |
| `create_new_file` | `figma-create-new-file` |
| `generate_diagram` | `figma-generate-diagram` |

Skipping causes "common, hard-to-debug failures" — the server's own words, and it is right.

## 2. How to load one

If a `/figma-*` slash command exists in the session, use it. Otherwise read the MCP resource:

```
mcp__claude_ai_Figma__get_figma_skill  uri: "skill://figma/figma-use/SKILL.md"
```

**The roster lives at `skill://index.json`** — read that to see all the skills with descriptions
rather than guessing a name. Reference files inside a skill are
`skill://figma/<skill>/references/<path>`, one call per URI.

When calling `use_figma` afterwards, pass `skillNames: "resource:figma-use"` — the
`resource:` prefix is required when the skill came from the MCP resource rather than a slash
command. It is logging only, but the skill asks for it.

The skills worth knowing: `figma-use` (Plugin API rules), `figma-design-to-code`,
`figma-generate-design` (app page → Figma), `figma-generate-library` (design system → Figma),
`figma-code-connect`, plus FigJam/Slides/motion/SwiftUI variants.

## 3. Reading vs. writing — pick the right tool

- **`get_metadata`** — structure only (ids, names, types, x/y/w/h). Cheap. Start here.
- **`get_design_context`** — the real design data for implementing a node. Needs its skill.
- **`get_screenshot`** — a rendered PNG. Returns a URL + curl by default; that is the
  token-cheap path, so don't set `enableBase64Response` unless you can't fetch URLs.
- **`download_assets`** — exported image bytes for a node, plus source images and SVGs.
- **`use_figma`** — arbitrary JS against the Plugin API. The only way to *read variables*,
  resolve token aliases, or inspect anything metadata doesn't expose.

`get_metadata` will not tell you why a fill is a given colour. If a fill is bound to a
variable you need `use_figma` to resolve it — that is how the dark-margin cause was found
(see [case-images.md](case-images.md)).

## 4. `use_figma` essentials

Plain JS, auto-wrapped in an async context. Top-level `await` and `return` both work.

- **`return` is the only output channel.** `console.log` is discarded.
- Do **not** wrap in an async IIFE, and do **not** call `figma.closePlugin()`.
- `figma.notify()` throws. `getPluginData`/`setPluginData` are unsupported (use the `Shared`
  variants).
- Colours are **0–1**, not 0–255.
- Fills/strokes are read-only arrays — clone, modify, reassign.
- Switch pages with `await figma.setCurrentPageAsync(page)`; the sync setter throws. At most
  one page switch per call — fan multi-page work out into parallel calls.
- Failed scripts are **atomic**: nothing is applied, so a fixed retry is safe. Read the error
  before retrying.
- Any script that creates or mutates nodes must return the affected node ids.
- `await node.screenshot({ scale })` returns an image inline — the fastest way to verify a
  write without a second tool call.

Reading variables, which is the useful pattern here:

```js
const v = await figma.variables.getVariableByIdAsync(id)
const collection = await figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId)
// v.valuesByMode is keyed by modeId; values may be VARIABLE_ALIAS — follow .id to resolve
```

## 5. Known limits (measured)

- **`download_assets` ignores a mode pinned via `setExplicitVariableModeForCollection`.** The
  node's own `screenshot()` reflected the change; the REST export kept serving the old render
  at every scale, apparently cached. Identical `sizeBytes` across calls is the tell.
- **`figma.io.write(name, bytes)` writes into the Figma desktop sandbox**, not the filesystem.
  Nothing lands in Downloads/Desktop/Documents.
- **Returning a big export as base64 gets truncated** in the tool response, so the file cannot
  be reconstructed. For pixels, use `download_assets`; for structure, use `use_figma`.
- Writing to a Figma file is a real edit to the owner's document. Say so, and offer to revert.

## 6. Getting the docs

Context7 has the server guide as `/figma/mcp-server-guide` — useful for Plugin API specifics.
Prefer `skill://index.json` for anything about the skills themselves, since that is the live
contract this server enforces.