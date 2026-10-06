# Mobile UI Kit — NeonPulse

The fictional "NeonPulse" infra app, rendered inside a dark iOS device frame. Built from the canonical classes in `../../colors_and_type.css`.

## Run
Open `index.html` via a static server. Loads React 18.3.1 (production UMD) + Babel 7.29.0 + Lucide 1.17.0 from CDN (pinned with SRI), `../../colors_and_type.css`, and the `ios-frame.jsx` starter (device bezel, status bar, dynamic island, home indicator).

On viewports ≥ 440px the device frame is scaled to fit the window height; below that (a real phone) the app renders edge-to-edge without device chrome, honouring safe-area insets.

## Components
| File | Exports | Notes |
|---|---|---|
| `ios-frame.jsx` | `IOSDevice`, `IOSStatusBar`, … | Third-party starter device frame (own colours, left untouched). Used in `dark` mode here. |
| `MobileApp.jsx` | `NeonPulseApp`, `HomeScreen`, `NodesScreen`, `ActivityScreen`, `SettingsScreen`, `TabBar`, `MobileHeader`, `MiniArea`, `NodeList`, `NodeRow`, `StatusPill` | Full app with a working bottom tab bar. |

## Interactions
- **Tab bar** (`<nav>`, buttons with `aria-label` + `aria-current="page"`) switches Home / Nodes / Activity / Settings. Active tab = accent + icon halo (glow as state).
- **Home** — live status card (`.np-card--live`, uptime + area chart), quick stats with `.np-meter`, node `.np-list`, "See all" jumps to Nodes. **Deploy** shows the `aria-busy` loading state, then a `.np-banner--success`.
- **Nodes** — outline badge summary + full node list; `StatusPill` = `.np-badge--success/--warning/--danger`.
- **Activity** — event feed; only the newest (live) event carries a halo + live dot.
- **Settings** — account row (`.np-avatar`, owner badge), `.np-switch` toggles in a `.np-list` (Auto-scale, Push alerts, Verbose logs), default-region `.np-seg`, `np-btn--danger np-btn--block` sign-out.

## Patterns shown
- Dark app surface inside the device chrome; translucent tab bar (`--color-bg-translucent`)
- Card, list, badge, meter, switch, segmented control, banner and avatar from the system — no kit-local control CSS
- Self-rendering `Icon` component (re-converts on every render — required because tab state lives below the app root)
