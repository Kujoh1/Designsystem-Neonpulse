# NeonPulse in Figma

The design system as a native, editable Figma library: variables, styles and components,
generated from `colors_and_type.css` (the single source of truth) and kept in sync with it.
Claude reaches the file through the official **Figma connector** (Figma MCP server), which is
enabled for this repo.

**Figma file:** [NeonPulse Design System](https://www.figma.com/design/TGmHhEyZyAJmnJ4nUEjorL) (drafts of the “Jo's team” workspace; Starter plan)

## What's in here

| Path | What |
|---|---|
| `export-tokens.mjs` | Reads `colors_and_type.css`, resolves both themes (incl. `color-mix`, glows, gradients, type) and writes the two files below. No dependencies. |
| `tokens.json` | The resolved token model the library is built from. Generated, review it in diffs. |
| `plugin/code.js` | The library builder. Runs as a Figma plugin. Its `NP_DATA` block is generated. |
| `mcp-script.mjs` | Prints a trimmed, self-contained script (< 50,000 characters) for the Figma MCP `use_figma` tool that builds single components or the layout frames. |
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

**Components (47):** 39 icons (one `Glyph` vector each, so colour overrides survive swaps) · Button (60
variants: intent × size × state) · Icon Button · Badge · Live dot · Eyebrow · Input · Field · Switch · Kbd ·
Tab · Tabs · Segment · Segmented control · Tooltip · Meter · Avatar · Card · Metric card · Banner · Toast ·
Nav item · Modal · Empty state, and since v1.4: Checkbox · Radio · Choice card · Textarea · Select · Slider ·
Chip · Spinner · Dropzone · Menu item · Menu · Page item · Pagination · Breadcrumb · Step · Stepper ·
Accordion item · Accordion · Tab bar item · Tab bar · Calendar day · Calendar · Drawer · Sheet. Every fill,
stroke, radius and gap is bound to a variable or style; text, booleans and icon swaps are exposed as
component properties; each component links to its docs section.

**Layouts (on the Foundations page):** the five breakpoints as six device frames — Phone 390, Tablet 768,
Laptop 1280, Desktop 1440, Full HD 1920, Ultrawide 3440 — each with the app shell as it behaves in code
(drawer or persistent sidebar, tab bar on phones, docked inspector, content capped at 1600) and a hidden
column layout grid on the content area (toggle with Ctrl + G). The breakpoints and container sizes are the
`layout/*` variables in the Scale collection.

**Order flow (on the Foundations page, below the layouts):** the bank order flow of `ui_kits/bank-order/` as 12 frames — six
screens (model, personal data, personal data with errors, identification, review, confirmation) in the web layout
(1280) and in the app layout (390). Built only from instances of the library: Button, Input, Select, Choice card,
Checkbox, Banner, Dropzone, Chip, Step, Meter, Accordion item and Badge. Run `node figma/mcp-script.mjs flows` for the
connector or the plugin's *Build or sync everything* / *Rebuild documentation pages* (phase `flows`).

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

## For Claude: building through `use_figma`

`use_figma` takes at most **50,000 characters** per call. `plugin/code.js` (the whole builder plus the token data) is
about 150,000, so the full build and the token sync (`variables`, `styles`) run through the **plugin**, not the
connector. The connector is for incremental work:

- Load the `figma-use` skill first (mandatory for `use_figma`) and pass `skillNames: "figma-use"`.
- Generate the script: `node figma/mcp-script.mjs components Drawer,Sheet` (add `--rebuild` to replace existing ones) or
  `node figma/mcp-script.mjs layouts` or `flows`. It prints a trimmed script ending in `return await NP.run([...])`; paste it as `code`.
  Keep a call under about 12 components. Dependants instance earlier components (Pagination → Page item, Drawer →
  Checkbox, Select, Button …), so build in LIB order or let the missing ones fail and rerun.
- The file must already hold the variables and styles: run **Sync tokens** in the plugin first.
- Every call returns created IDs, skipped items and `warnings`. Obey `safeToRetryWithoutCanvasRead` on errors — the
  builder skips what already exists, so a retry after a fix is safe.
- Verify with `node.screenshot()` inside the same script or one `get_screenshot`.

## Starter plan limits

- **One mode per variable collection**, so the Theme collection has only *Dark*; the *Light* mode and the light
  theme check need the Professional plan (run **Sync tokens** again afterwards).
- **Three pages**: Cover, Foundations, Components. That is why the layouts sit under the other foundations.
- The MCP connector allows about 20 tool calls a month on Starter; the plugin has no such limit.

## Known gaps (code has them, Figma can't express them)

- Fluid type (`clamp()`) — text styles use the desktop size; the minimum is noted in the description.
- Motion (blink, pulse, shimmer, spinner rotation), the pressed scale (`0.97`) and the animated CTA
  spotlight — not modelled.
- The live card's gradient border is a gradient stroke style, close to the CSS `border-box` trick.
- `z-index` tokens have no Figma equivalent.
