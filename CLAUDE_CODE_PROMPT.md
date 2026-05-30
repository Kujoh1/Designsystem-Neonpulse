# Claude-Code-Startprompt — NeonPulse Design System

> Kopiere den Block unten und füge ihn als erste Nachricht in Claude Code ein
> (im geklonten Repo-Ordner). Er gibt Claude Code den vollen Kontext + Workflow.

---

Du übernimmst die Weiterentwicklung von **NeonPulse**, einem dark-first, cyberpunk
*Flat-Design*-Design-System. Es ist eine **statische Seite** (reines HTML/CSS plus
ein paar React-via-CDN-Prototypen) — **kein Build, kein npm, kein Bundler** — und wird
über **GitHub Pages** veröffentlicht.

**Bevor du irgendetwas tust:** Lies `CLAUDE.md` und `README.md` komplett. `CLAUDE.md`
enthält die verbindlichen Brand-Regeln, die Repo-Struktur und den Publish-Workflow.
`colors_and_type.css` ist die **einzige Quelle** für alle Tokens — hardcode niemals
Hex-Werte in neuem Code, nutze die CSS-Variablen.

**Einstieg/Architektur:**
- `index.html` ist die Doku-Startseite (Referenz-Übersicht). 
- `preview/` = kleine Spezimen-Karten. `ui_kits/{marketing,dashboard,mobile}/` = interaktive Kits.
- Lokal testen: `python3 -m http.server 8000`, dann `http://localhost:8000`.

**Veröffentlichen = „live sync":** GitHub Pages deployed automatisch bei jedem Push auf
`main`. Dein einziger manueller Schritt ist:
```
git add -A && git commit -m "..." && git push
```
Danach ist die Live-Doku unter `https://kujoh1.github.io/Designsystem-Neonpulse/`
nach ~1 Minute aktuell. Pages ggf. einmalig aktivieren:
Settings → Pages → Deploy from a branch → `main` / `root`.

**Brand-Regeln, von denen du NICHT abweichst** (Details in `CLAUDE.md`):
1. Dunkel ist die Leinwand, Neon ist das Signal (~90 % Near-Black, Neon nur für aktiv/live).
2. Flat, aber nicht langweilig: Tiefe über Surface-Stufen + 1px-Hairline, keine Schlagschatten-Stapel.
3. Glow ist ein *Zustand* (hover/focus/active/live), keine Deko.
4. Mono (JetBrains Mono, UPPERCASE, 0.14em) für Labels/Metriken/Status.
5. Type: Space Grotesk (Display), Sora (Body), JetBrains Mono (Daten). Radien 12–20px.
6. Icons: Lucide Outline, `currentColor`. **Keine Emojis.**

**Deine ersten Aufgaben (frag nach, falls Priorität unklar):**
1. Prüfe, dass die Seite lokal sauber läuft (Startseite + alle drei Kits, keine Konsolenfehler).
2. Richte GitHub Pages ein und mache den ersten erfolgreichen Deploy.
3. Danach arbeite den Backlog in `CLAUDE.md` ab — beginne mit **Light Mode** als
   `[data-theme="light"]`-Token-Set, das die Dunkel-Rampe spiegelt, plus einem Theme-Toggle
   in `index.html`.

Halte das Repo bei jedem Commit deploybar. Arbeite token-getrieben, on-brand, und
committe in kleinen, nachvollziehbaren Schritten.

---
