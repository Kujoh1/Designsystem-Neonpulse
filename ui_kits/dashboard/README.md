# Dashboard UI Kit — NeonPulse

A dark, cyberpunk SaaS console for the fictional "NeonPulse" realtime-infra product.

## Run
Open `index.html`. Loads React 18 + Babel + Lucide from CDN and `../../colors_and_type.css`.

## Components
| File | Exports | Notes |
|---|---|---|
| `Charts.jsx` | `AreaChart`, `BarChart`, `Donut`, `Sparkline` | Pure-SVG data-viz with neon glow filters + gradient fills. No chart lib. |
| `Shell.jsx` | `Sidebar`, `Topbar` | Fixed dark sidebar w/ active inset-glow, usage meter; translucent sticky topbar w/ search + deploy. |
| `Overview.jsx` | `Overview`, `StatCard`, `NodeTable` | KPI cards w/ sparklines, throughput area chart, CPU donut, status table. |
| `Overlays.jsx` | `Modal`, `Toasts` | Deploy modal (region picker) + stacked auto-dismissing toast system. |

## Interactions (all live)
- Sidebar nav switches the main view (non-Overview shows a labelled placeholder).
- Time-range segmented control (`Live / 1H / 24H / 7D`) re-renders the throughput chart from different series.
- Topbar **Deploy** opens the modal → pick a region → **Deploy now** closes it and fires an **info** toast, then a **success** toast ~1.6s later. Toasts auto-dismiss after ~4.2s.

## Patterns shown
- KPI card, status pill (semantic color + tinted fill), data table with hover rows
- Neon-glow SVG line/area/donut, sparklines
- Modal with backdrop blur + `np-pop` entrance; toast stack with `np-slide-in`
- Active nav via `inset 2px 0 0` neon rail (flat, no heavy shadow)
