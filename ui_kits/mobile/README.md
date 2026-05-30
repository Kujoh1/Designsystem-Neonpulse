# Mobile UI Kit — NeonPulse

The fictional "NeonPulse" infra app, rendered inside a dark iOS device frame.

## Run
Open `index.html`. Loads React 18 + Babel + Lucide from CDN, `../../colors_and_type.css`, and the `ios-frame.jsx` starter (device bezel, status bar, dynamic island, home indicator).

## Components
| File | Exports | Notes |
|---|---|---|
| `ios-frame.jsx` | `IOSDevice`, `IOSStatusBar`, … | Starter device frame. Used in `dark` mode here. |
| `MobileApp.jsx` | `NeonPulseApp`, `MiniArea`, `NodeRow`, `StatusPill` | Full app: Home / Nodes / Activity / Settings with a working bottom tab bar. |

## Interactions
- Bottom **tab bar** switches screens (Home, Nodes, Activity, Settings). Active tab glows cyan.
- **Home** — live status hero card (uptime + glowing area chart), quick-stat cards, node list, deploy button.
- **Nodes** — full node list with semantic status pills.
- **Activity** — event feed with neon-glow icon chips.

## Patterns shown
- Dark app surface inside light/dark device chrome
- Neon status hero, quick-stat cards with glowing underline bars
- `StatusPill` (semantic color + tinted fill), glowing tab icons via `drop-shadow`
- Self-rendering `Icon` component (re-converts on every render — required because tab state lives below the app root)
