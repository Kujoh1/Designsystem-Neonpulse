# Changelog

All notable changes to NeonPulse. Versions follow [semver](https://semver.org): a minor
version adds tokens/components without breaking existing class or token names.

## 1.5.0 — 2026-10-12

### Added
- **Figma:** builders for the 24 components of v1.4 (Checkbox, Radio, Choice card, Textarea, Select, Slider, Chip, Spinner, Dropzone, Menu item, Menu, Page item, Pagination, Breadcrumb, Step, Stepper, Accordion item, Accordion, Tab bar item, Tab bar, Calendar day, Calendar, Drawer, Sheet) — 47 components in total, all bound to Theme/Scale variables and styles. Five more Lucide icons (`chevron-left`, `calendar`, `menu`, `panel-right`, `layout-dashboard`, 39 in total).
- **Figma layouts:** six device frames (Phone 390 · Tablet 768 · Laptop 1280 · Desktop 1440 · Full HD 1920 · Ultrawide 3440) on the Foundations page, showing the app shell at each breakpoint with a hidden column grid; new `layouts` phase.
- `figma/mcp-script.mjs` prints a trimmed script (< 50,000 characters) for the Figma MCP `use_figma` tool, to build single components or the layouts through the connector.

### Changed
- `figma/README.md` and `CLAUDE.md`: the connector cannot run the whole builder (the `use_figma` limit is 50,000 characters, `code.js` has about 150,000); token sync goes through the plugin. Starter-plan limits (one mode per collection, three pages) are documented.

## 1.4.1 — 2026-10-12

### Changed
- `governance/check.html` mirrors Guardian rulebook v1.2: a twelfth check, "System breakpoints" (only 480 / 768 / 1024 / 1440 / 1920 are allowed viewport breakpoints; the finding names the nearest `--bp-*` token). PR #12 now carries an invented 600px query and stays red, PR #13 uses `min-width: 768px` and stays green.
- Guardian rulebook v1.2 (repo `neonpulse-pr-guardian`): five breakpoints, layout tokens, new canonical classes and a responsive principle.

## 1.4.0 — 2026-10-12

### Added
- **Form controls:** `.np-check` and `.np-radio` (real inputs; rest · hover · checked · indeterminate · focus · invalid · disabled; `--card` rows that light up when selected; `.np-fieldset` groups), `textarea.np-input`, `select.np-input` (native, themed chevron), `.np-select` (custom select trigger), `.np-slider` (real range input, `--np-fill`), `.np-dropzone`, `.np-field__value`.
- **Chips and spinner:** `.np-chip` (filter toggle, `--removable`), `.np-spinner` (`--sm` / `--lg`, keeps turning under reduced motion).
- **Menus and pickers:** `.np-anchor` + `.np-menu` / `.np-popover` (items, danger, disabled, checked, separator, group label, `--up` / `--end`), listbox select, `.np-calendar` for a date picker. The specimen carries a reference script with arrow keys, Home/End, Enter, Esc and flip-up.
- **Navigation:** `.np-pagination` (folds to "Page 3 of 12" below 420px of its own width), `.np-breadcrumb`, `.np-stepper` (+ `--vertical`), `.np-accordion` (on `<details>`), `.np-tabbar` (bottom navigation) and `.np-appshell--tabbar` (shows below 768).
- **Overlays:** `.np-drawer` (`.np-scrim--end` / `--start`) and `.np-sheet` (`.np-scrim--sheet`): a bottom sheet on phones, a centred dialog from 768.
- **Responsive table:** `.np-table--stack` turns rows into labelled cards below 560px of the wrapper's width (`data-label` on each cell).
- Specimens `comp-forms`, `comp-menus`, `comp-navigation`, `pat-sheet`; docs sections "Form controls", "Menus & pickers", "Navigation controls" and "Drawer & sheet" (live phone and desktop frames).
- Touch rules cover the new controls (44px targets, 16px text, bigger calendar days).

## 1.3.0 — 2026-10-12

### Added
- **Responsive foundation.** Five mobile-first breakpoints as tokens (`--bp-sm` 480 · `--bp-md` 768 · `--bp-lg` 1024 · `--bp-xl` 1440 · `--bp-2xl` 1920) — documented constants, because `@media` cannot read `var()`. Container steps `--container-prose` (680) and `--container-wide` (1600), a fluid `--gutter` (16px phone → 40px ultrawide), shell sizes `--sidebar-w`, `--aside-w`, `--topbar-h`, the touch minimum `--touch-target` (44px) and safe-area tokens `--safe-top/right/bottom/left`.
- **`.np-appshell`** — the app profile: top bar, navigation, scrolling main area and optional inspector (`--aside`). Navigation is an off-canvas drawer below 1024, a persistent sidebar from 1024; the inspector is a panel below 1440 and docks as a third column from 1440, widening to 400px at 1920; content is capped at `--container-wide` (`__content--fluid` opts out). Specimen `preview/pat-appshell.html`, docs section "App shell" with live phone / laptop / ultrawide frames.
- `.np-container--prose`, `--wide`, `--full`.
- Touch rules: on `pointer: coarse` buttons, tabs, segmented items, nav items, list rows and icon buttons reach 44px and text fields use 16px (no iOS focus zoom).
- Figma export: the layout tokens land in the Scale collection as `layout/bp-*`, `layout/container-prose|wide`, `layout/sidebar-w`, `aside-w`, `topbar-h`, `touch-target`.

### Changed
- `.np-container` side padding is now `--gutter` (16–40px, was a fixed 24px): tighter on phones, identical at ~1200px.
- Glow hovers (primary, secondary, ghost and danger buttons, icon button, interactive card) apply only under `@media (hover: hover)`, so they no longer stick after a tap. The `.is-hover` helpers stay unconditional.

## 1.2.0 — 2026-10-07

### Added
- **Figma library** (`figma/`) generated from `colors_and_type.css`: variables in three collections (Primitives, hidden · Theme with Dark/Light modes · Scale) with CSS code syntax, 29 text styles, 3 gradient paint styles, 11 effect styles whose colours and theme-dependent geometry bind to Theme variables, 34 Lucide icon components and 23 components with variants and properties (Button with 60 variants, inputs, tabs, cards, banner, toast, modal …), plus Cover, Foundations and a Dark/Light theme check.
- `figma/export-tokens.mjs` resolves both themes from the CSS (incl. `color-mix`, glows, gradients, element type rules) into `figma/tokens.json` and the builder's data block; `--check` fails on drift.
- `figma/plugin/` — the builder runs as a Figma development plugin (build, sync tokens, build missing components, rebuild docs) and through the Figma MCP `use_figma` tool. Re-runs update variables and styles in place and keep existing components.
- The official Figma connector (Figma plugin from Anthropic's plugin directory: MCP server + skills) is enabled for the project in `.claude/settings.json`.

## 1.1.2 — 2026-10-06

### Added
- `governance/check.html` — live check (DE/EN): two pull requests with the same feature card, one built off-system, one with the system. A click runs eleven deterministic Guardian rules (rulebook v1.1) against the shown code in the browser; a session panel turns every check green or red, then shows whether the change is ready to approve and the Guardian comment with line, problem and token fix. Framed as a small eval (expected vs. actual). Linked from the governance page and the showcase.

## 1.1.1 — 2026-10-06

### Added
- `governance/` — management-level explanation (DE/EN) of the PR Guardian: design drift, before/after, four-step flow, a real review, value, guardrails, roadmap.
- `governance/workflow.html` — direct link to the real n8n workflow as an interactive, read-only canvas (official `n8n-demo` component, pinned + SRI; workflow JSON read from the Guardian repo). `?local` adds an "open in my n8n" button for the owner's machine.
- Showcase section "07 · Governance" and a docs sidebar link.

## 1.1.0 — 2026-10-05

### Added
- **Light theme** — `[data-theme="light"]` mirrors the dark ramp, works on `<html>` or any subtree; dark islands work inside light pages. Accents switch to `--neon-ink`, semantic colours to deeper ink tones (all text pairings ≥ 4.5:1).
- **Derived tokens** — gradients, glows, `--line-glow`, `--ring-focus` and `--state-hover-glow` are computed from the neon hues with `color-mix()`, so a rebrand swaps two primitives.
- New aliases: `--color-bg-translucent`, `--color-track`, `--color-scrim`, `--glow-accent`, `--glow-action`, plus primitives `--white`, `--neon-ink`, `--container-max`.
- **23 new elements & patterns**: `.np-icon-btn`, `.np-livedot`, `.np-eyebrow`, `.np-badge`, `.np-field` / `.np-input` / `.np-inputgroup`, `.np-kbd`, `.np-switch` (real checkbox), `.np-tabs` / `.np-tab`, `.np-seg`, `data-np-tooltip`, `.np-meter`, `.np-avatar`, `.np-code`, `.np-link`, `.np-container`, `.np-navitem`, `.np-table`, `.np-codeblock`, `.np-scrim` + `.np-modal`, `.np-toast-region` + `.np-toast`, `.np-palette` (⌘K), helpers `.np-sr-only`, `.np-skip`, `.np-btn--block`. Ghost buttons get an `aria-pressed="true"` toggle state.
- Specimens `comp-overlays.html` and `comp-data.html`; colour specimens print live values and contrast ratios.
- Docs: theme switch, ⌘K / `/` search over sections and tokens, mobile drawer navigation, scrollspy, swatches and token table generated from the stylesheet (dark + light columns), source view + copy for every specimen, responsive kit previews, Theming section.
- Dashboard kit: ⌘K command palette, empty states for every view, off-canvas sidebar on small screens. Mobile kit: Settings screen with switches.
- `showcase/` — bilingual (DE/EN) case-study page; `404.html`; `assets/og-image.png` social preview; `fonts/README.md`.

### Changed
- **Fonts are self-hosted** variable woff2 (no Google Fonts request).
- `--fg-3` lightened `#6c7290` → `#7c82a2` so muted text passes WCAG AA (was 3.9–4.1:1, now 4.5–5.3:1 on bg-0…bg-3).
- `--display-xl`, `--display-l`, `--h1` are fluid (`clamp()`).
- `.np-btn--secondary` uses dark label text (`--color-text-on-accent`) for contrast.
- Icons inside `.np-btn` render at `--icon-sm` so icon + label buttons keep one height.
- `.np-scope` element defaults use `:where()` — classes always win over them.
- `.np-skeleton` uses a raised base so it is visible inside cards.
- Kits use the canonical classes and semantic aliases (no local button/badge/segment CSS), React production builds, SRI on every CDN script, canonical Lucide names.

### Fixed
- Marketing hero console played once instead of looping; it now loops and respects reduced motion.
- Docs had no navigation below 920px.
- Dashboard modal: Escape, focus trap and focus return; toasts announced via `aria-live`.

## 1.0.0 — 2026-05-30
- Initial publish: tokens (two tiers), `.np-btn` state model, card family, layout and content patterns, CTA spotlight, starfield effect, kudesi wordmark, three UI kits, docs home.
