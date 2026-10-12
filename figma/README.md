# NeonPulse in Figma

The design system as a native, editable Figma library: variables, styles and components,
generated from `colors_and_type.css` (the single source of truth) and kept in sync with it.
Claude reaches the file through the official **Figma connector** (Figma MCP server), which is
enabled for this repo.

**Figma file:** NeonPulse Design System *(link added once the file exists)*

## What's in here

| Path | What |
|---|---|
| `export-tokens.mjs` | Reads `colors_and_type.css`, resolves both themes (incl. `color-mix`, glows, gradients, type) and writes the two files below. No dependencies. |
| `tokens.json` | The resolved token model the library is built from. Generated, review it in diffs. |
| `plugin/code.js` | The library builder. Runs as a Figma plugin *and* through the Figma MCP `use_figma` tool. Its `NP_DATA` block is generated. |
| `plugin/manifest.json` | Development plugin manifest ("NeonPulse Library"). |
| `icons/` | Lucide 1.17.0 SVGs used for the icon components (ISC, see `icons/LICENSE`). |

## What the Figma file contains

**Pages:** Cover (with "How this file works") · Foundations · Components (with a Dark/Light theme check).

**Variables**

| Collection | Modes | Contents | Code syntax |
|---|---|---|---|
| Primitives | Value | `neon/*`, `base/white`, `fg/on-neon`, and `dark/…` + `light/…` copies of every theme-dependent ramp (`bg`, `fg`, `line`, `status`). Hidden from pickers and publishing. | `var(--bg-2)` … |
| Theme | Dark · Light | Every `--color-*` alias (`surface/default`, `text/muted`, `border/focus`, `feedback/danger-fill` …) as an alias of a primitive, plus effect and gradient-stop variables. This is what components bind to. | `var(--color-surface)` … |
| Scale | Value | `radius/*`, `space/*`, `icon/*`, `layout/container-max`, `font/display·body·mono` | `var(--r-md)` … |

Switch any frame between **Dark** and **Light** (Theme collection in the layer panel): fills, strokes,
text, glows and the haze gradient follow.

**Styles:** 29 text styles (type scale + the element rules that set their own font, e.g. `UI/Button`,
`Mono/Badge`), 3 gradient paint styles (`Pulse`, `Pulse hot`, `Haze`), 11 effect styles (glows, focus ring,
elevation). Effect colours and theme-dependent offsets/blurs are bound to Theme variables.

**Components:** 34 icons (one `Glyph` vector each, so colour overrides survive swaps) · Button (60
variants: intent × size × state) · Icon Button · Badge · Live dot · Eyebrow · Input · Field · Switch · Kbd ·
Tab · Tabs · Segment · Segmented control · Tooltip · Meter · Avatar · Card · Metric card · Banner · Toast ·
Nav item · Modal · Empty state. Every fill, stroke, radius and gap is bound to a variable or style; text,
booleans and icon swaps are exposed as component properties; each component links to its docs section.

## Connect Claude to Figma (once per machine)

The Figma plugin from Anthropic's plugin directory is enabled for this project in
`.claude/settings.json` (it brings the remote MCP server `https://mcp.figma.com/mcp` and Figma's skills).

1. Install the plugin on your machine:
   `claude plugin install figma@anthropic-plugin-directory --scope project`
   (in a running session, `/reload-plugins` loads it without restarting).
2. Run `/mcp`, pick **figma**, choose **Authenticate** and allow access in the browser.
3. Check with `/mcp` that figma shows as connected. The tools are available in the same conversation.

Seat matters: with a **Dev or Full seat** on a paid plan the connector is rate-limited per minute. On a
**Starter plan or a View/Collab seat** it is limited to a handful of tool calls per month — enough to read,
not to build a library. Use the plugin route below in that case.

## Build or sync the file

**With Claude (connector).** Ask: *"Build the NeonPulse library in Figma"* or *"Sync the NeonPulse
tokens to Figma"*. Claude creates the file with `create_new_file` (first time only) and runs the builder.

**With the plugin (any plan, Figma desktop app).**
1. Figma desktop → *Plugins → Development → Import plugin from manifest…* → `figma/plugin/manifest.json`.
2. Open the design-system file (an empty design file the first time).
3. *Plugins → Development → NeonPulse Library →*
   - **Build or sync everything** — first build, or full refresh
   - **Sync tokens (variables + styles)** — after a token change
   - **Build missing components** · **Rebuild documentation pages**
   - **Rebuild all components** — recreates components; resets edits made to them in Figma

Re-running is safe. Variables and styles are matched by name and updated in place, so bound components
follow automatically. Existing components are kept (they may hold design edits); only missing ones are
built. Variables that no longer exist in the CSS are reported, not deleted.

## After a token change

```bash
node figma/export-tokens.mjs           # refresh tokens.json + the plugin data block
node figma/export-tokens.mjs --check   # CI: exit 1 if either file is stale
```

Then sync the file (plugin **Sync tokens**, or ask Claude). Token changes that start in Figma go back
into `colors_and_type.css` through a pull request, so code and file stay one system.

## For Claude: running the builder through `use_figma`

- Load the `figma-use` skill first (mandatory for `use_figma`), pass `skillNames: "figma-use"`.
- Script = the full contents of `figma/plugin/code.js`, followed by one line, e.g.
  `return await NP.run(['variables', 'styles'])`. One phase list per call, in this order:
  1. `['variables', 'styles']`
  2. `['components']` — if it runs too long, split with `NP.run(['components'], { only: ['Button', 'Icon Button'] })`;
     dependants instance earlier components (Field → Input, Tabs → Tab, Modal → Button …)
  3. `['foundations']`
  4. `['cover']`
- Every call returns created IDs, skipped items and `warnings`. Obey `safeToRetryWithoutCanvasRead` on errors —
  the builder skips what already exists, so a retry after a fix is safe.
- Verify with one `get_screenshot` of the Components page and of the theme check.

## Known gaps (code has them, Figma can't express them)

- Fluid type (`clamp()`) — text styles use the desktop size; the minimum is noted in the description.
- Motion (blink, pulse, shimmer, spinner rotation), the pressed scale (`0.97`) and the animated CTA
  spotlight — not modelled.
- The live card's gradient border is a gradient stroke style, close to the CSS `border-box` trick.
- `z-index` tokens have no Figma equivalent.
