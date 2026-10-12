# Bank order flow — NeonPulse

A typical B2C order flow for an online bank: **open a current account** at the fictional "Pulse Bank". One page, two presentations: the web layout from 768px and the app layout below it. Built only from the canonical classes in `../../colors_and_type.css`; the few `bo-*` classes in the page are layout glue, no control CSS.

## Run
Open `index.html` via a static server (plain HTML + JS, no React). Loads Lucide 1.17.0 from the CDN, pinned with SRI. Copy is German (informal "du").

## The five steps
| # | Screen | Built from |
|---|---|---|
| 1 | Choose an account model | `.np-radio--card` ×3 (price in mono, `.np-badge--accent` "Empfohlen"), `.np-check` |
| 2 | Personal data | `.np-field` / `.np-input` / `select.np-input`, validation with `aria-invalid` and `.np-field__hint` |
| 3 | Identification | `.np-radio--card` (video-ident or upload), `.np-dropzone`, removable `.np-chip`, `.np-banner--info` |
| 4 | Review and consent | `.np-list` summary with "Ändern", `.np-accordion` (web) or `.np-sheet` (app), `.np-check` consents, `aria-busy` button |
| 5 | Confirmation | success mark, reference number, `.np-stepper--vertical` for what happens next |

## Web vs. app
- **Web (≥ 768)**: brand + secure-connection hint, horizontal `.np-stepper`, form card; from 1024 a sticky summary column with the chosen model and price.
- **App (< 768)**: back button + "Schritt n von 4" + `.np-meter` progress, one column, a sticky action bar that honours the safe area (`--safe-bottom`), the contract documents open in a bottom sheet, touch targets from `--touch-target`.
- Breakpoints are the system's `--bp-md` (768) and `--bp-lg` (1024).

## Behaviour worth knowing
- Each step validates before moving on; errors show a `.np-banner--danger` summary (`role="alert"`) and focus the first invalid field. Changing a field clears its error.
- Focus moves to the step heading on every step change; `document.title` follows the step.
- User input is escaped before it is rendered into the summary.
- Nothing is sent anywhere: the demo keeps its state in memory and the submit is simulated.
