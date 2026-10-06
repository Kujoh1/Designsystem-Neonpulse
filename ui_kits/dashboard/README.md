# Dashboard UI Kit — NeonPulse

A dark, cyberpunk SaaS console for the fictional "NeonPulse" realtime-infra product. Built entirely from the canonical classes in `../../colors_and_type.css` — the kit's own `<style>` only holds shell layout (`db-*`) and breakpoints.

## Run
Open `index.html` via a static server. Loads React 18.3.1 (production UMD) + Babel 7.29.0 + Lucide 1.17.0 from CDN, all pinned with SRI, plus `../../colors_and_type.css`.

## Components
| File | Exports | Notes |
|---|---|---|
| `Charts.jsx` | `AreaChart`, `BarChart`, `Donut`, `Sparkline` | Pure-SVG data-viz, no chart lib. Single series default to `--color-accent`; neon primitives only as a categorical series palette. Track = `--color-track`. |
| `Shell.jsx` | `Sidebar`, `Topbar`, `RangeControl`, `Brand`, `UsageCard`, `NAV_GROUPS`, `RANGES`, `MOD_KEY` | `<aside>` + `<nav aria-label="Main">` with `aria-current="page"`; `.np-meter` usage bar; topbar search trigger (`.np-inputgroup` + `.np-kbd`), bell `.np-icon-btn` with `data-np-tooltip`, `.np-avatar`. Range control = `.np-seg` with `aria-pressed` buttons. |
| `Overview.jsx` | `Overview`, `StatCard`, `NodeTable` | `StatCard` = `.np-card` (`__eyebrow/__metric/__delta`). Throughput card switches to `.np-card--live` + `.np-badge--live` only on the Live range. `NodeTable` = `.np-table` in a focusable `.np-table-wrap`, status via `.np-badge--success/--warning/--danger`. |
| `Views.jsx` | `EmptyView`, `EMPTY_VIEWS` | `.np-empty` state per non-Overview view, each with a working ghost action (navigate, deploy, copy endpoint). |
| `Overlays.jsx` | `Modal`, `Toasts`, `trapFocus` | Deploy dialog = `.np-scrim` + `.np-modal` with `.np-field`/`.np-inputgroup` and a radio-group of `.np-card--row` region tiles. Toasts = `.np-toast-region` (`aria-live="polite"`) + `.np-toast--success/--warning/--danger`. |
| `CommandPalette.jsx` | `CommandPalette` | ⌘K palette on `.np-scrim--top` + `.np-palette`. ARIA combobox: input `role="combobox"` + `aria-activedescendant`, `role="listbox"` with grouped `role="option"` items. |

## Interactions (all live)
- **Sidebar** switches views; non-Overview views render an empty state.
- **Time range** (`Live / 1H / 24H / 7D`) re-renders the throughput chart.
- **Deploy** opens the modal: focus lands in the branch field, Tab is trapped, Esc / scrim click / Cancel close it and focus returns to the trigger. Empty branch shows an inline `aria-invalid` error. **Deploy now** fires an info toast, then a success toast ~1.6s later; toasts auto-dismiss after ~4.2s.
- **Command palette** — Ctrl+K / ⌘K or the topbar search. Groups *Navigate* (every view) and *Actions* (Deploy…, time range, copy API endpoint → toast). Type to filter, ↑/↓ move, Enter runs, Esc closes, hover selects.
- **Responsive** — stat grid 4 → 2 (≤920px) → 1 (≤520px) columns; ≤920px the search field collapses to a search icon button; ≤760px the sidebar becomes an off-canvas drawer (menu button, scrim, Esc, closes on navigation, focus managed). The node table scrolls horizontally.
- Skip link (`.np-skip`) jumps to `<main>`.

## Patterns shown
- Card family incl. `--live` (gradient edge for live data only) and `--flush`
- Status badges, data table, meter, avatar, kbd hints, tooltip
- Modal + toast + command palette on the shared overlay patterns (`np-fade`, `np-pop`, `np-slide-in` from the token file)
- Active nav via `inset 2px 0 0` accent rail (flat, no heavy shadow)
