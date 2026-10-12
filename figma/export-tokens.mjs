#!/usr/bin/env node
/* ============================================================
   NeonPulse → Figma · token export
   Reads colors_and_type.css (the single source of truth), resolves
   both themes and writes the model the Figma library is built from:

     figma/tokens.json      resolved token model (review / diff / audits)
     figma/plugin/code.js   refreshes the generated NP_DATA block

   No dependencies. Run it whenever the token file changes:
     node figma/export-tokens.mjs           write both files
     node figma/export-tokens.mjs --check   exit 1 if either is stale
   ============================================================ */
import { existsSync, readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');
const CHECK = process.argv.includes('--check');

const css = readFileSync(join(root, 'colors_and_type.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
const changelog = readFileSync(join(root, 'CHANGELOG.md'), 'utf8');
const version = (changelog.match(/^## (\d+\.\d+\.\d+)/m) || [, '0.0.0'])[1];

/* ---------- CSS reading ---------- */
// every rule whose selector list contains `selector`, merged in source order
function rule(selector) {
  const out = {};
  let found = false;
  for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    if (!m[1].split(',').map(s => s.trim()).includes(selector)) continue;
    Object.assign(out, declarations(m[2]));
    found = true;
  }
  if (!found) throw new Error(`Rule not found in colors_and_type.css: ${selector}`);
  return out;
}
function declarations(body) {
  const out = {};
  for (const part of splitTop(body, ';')) {
    const i = part.indexOf(':');
    if (i < 0) continue;
    const prop = part.slice(0, i).trim();
    const value = part.slice(i + 1).replace(/\s+/g, ' ').trim();
    if (prop) out[prop] = value;
  }
  return out;
}
function splitTop(s, sep) {
  const parts = []; let depth = 0, cur = '';
  for (const ch of s) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (ch === sep && depth === 0) { parts.push(cur); cur = ''; } else cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  return parts.map(p => p.trim()).filter(Boolean);
}
const splitSpaces = s => splitTop(s.replace(/\s+/g, ' '), ' ');

const block = selectorList => {
  const m = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(r => r[1].trim() === selectorList);
  if (!m) throw new Error(`Token block not found: ${selectorList}`);
  return declarations(m[2]);
};
const primitivesDark = block(':root, [data-theme="dark"]');
const aliasBlock = block(':root, [data-theme]');
const lightBlock = block('[data-theme="light"]');
const ENV = {
  Dark: { ...primitivesDark, ...aliasBlock },
  Light: { ...primitivesDark, ...aliasBlock, ...lightBlock },
};
const MODES = ['Dark', 'Light'];

function resolve(expr, env, depth = 0) {
  if (depth > 20) throw new Error(`var() cycle near ${expr}`);
  const out = expr.replace(/var\((--[\w-]+)\)/g, (_, name) => {
    if (!(name in env)) throw new Error(`Unknown token ${name}`);
    return resolve(env[name], env, depth + 1);
  });
  return out;
}

/* ---------- colours ---------- */
const clamp01 = n => Math.min(1, Math.max(0, n));
function parseColor(input) {
  const s = input.trim();
  if (s === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  let m;
  if ((m = s.match(/^#([0-9a-f]{3,8})$/i))) {
    let h = m[1];
    if (h.length <= 4) h = [...h].map(c => c + c).join('');
    const n = i => parseInt(h.slice(i, i + 2), 16) / 255;
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) : 1 };
  }
  if ((m = s.match(/^rgba?\((.*)\)$/))) {
    const [r, g, b, a = '1'] = m[1].split(/[\s,/]+/).filter(Boolean);
    return { r: +r / 255, g: +g / 255, b: +b / 255, a: +a };
  }
  if ((m = s.match(/^color-mix\(in srgb,(.*)\)$/))) {
    const [p1, p2] = splitTop(m[1], ',').map(part => {
      const pm = part.match(/^(.*?)\s+([\d.]+)%$/);
      return pm ? { c: parseColor(pm[1]), w: +pm[2] / 100 } : { c: parseColor(part), w: null };
    });
    if (!p1.c || !p2.c) return null;
    const w1 = p1.w ?? 1 - p2.w, w2 = p2.w ?? 1 - w1;
    const a = p1.c.a * w1 + p2.c.a * w2;                // premultiplied mix, like the browser
    const ch = k => (a ? (p1.c[k] * p1.c.a * w1 + p2.c[k] * p2.c.a * w2) / a : 0);
    return { r: ch('r'), g: ch('g'), b: ch('b'), a };
  }
  return null;
}
function hex(c) {
  const h = n => Math.round(clamp01(n) * 255).toString(16).padStart(2, '0');
  return `#${h(c.r)}${h(c.g)}${h(c.b)}${c.a < 1 ? h(c.a) : ''}`;
}
const colorOf = (name, mode) => parseColor(resolve(ENV[mode][name], ENV[mode]));

/* ---------- 1 · Primitives (one mode; theme-dependent ramps get dark/ + light/ copies) ---------- */
function primitiveName(css) {
  const n = css.slice(2); let m;
  if ((m = n.match(/^(bg|line|fg)-(.+)$/))) return `${m[1]}/${m[2]}`;
  if ((m = n.match(/^neon-(.+)$/))) return `neon/${m[1]}`;
  if (/^(success|warning|danger|info)(-fill)?$/.test(n)) return `status/${n}`;
  return `base/${n}`;
}
const colorPrimitiveCss = [...Object.keys(primitivesDark), '--neon-ink', '--line-glow']
  .filter(k => colorOf(k, 'Dark'));
const primitiveVars = [];
const primitiveRef = {};                       // css → { Dark: figmaName, Light: figmaName }
for (const css of colorPrimitiveCss) {
  const v = Object.fromEntries(MODES.map(m => [m, hex(colorOf(css, m))]));
  const base = primitiveName(css);
  if (v.Dark === v.Light) {
    primitiveVars.push({ name: base, css, type: 'COLOR', value: v.Dark });
    primitiveRef[css] = { Dark: base, Light: base };
  } else {
    for (const m of MODES) primitiveVars.push({ name: `${m.toLowerCase()}/${base}`, css, type: 'COLOR', value: v[m] });
    primitiveRef[css] = { Dark: `dark/${base}`, Light: `light/${base}` };
  }
}

/* ---------- 2 · Theme (Dark / Light) — the semantic aliases components bind to ---------- */
function themeName(css) {
  const n = css.replace(/^--color-/, ''); let m;
  if ((m = n.match(/^(success|warning|danger|info)(-fill)?$/))) return `feedback/${n}`;
  if (n === 'track') return 'surface/track';
  if (n === 'scrim') return 'bg/scrim';
  if ((m = n.match(/^(bg|surface|text|border|action|accent)(?:-(.+))?$/))) return `${m[1]}/${m[2] || 'default'}`;
  return `misc/${n}`;
}
function themeScopes(name) {
  const g = name.split('/')[0], leaf = name.split('/')[1];
  if (g === 'text') return ['TEXT_FILL', 'STROKE_COLOR'];
  if (g === 'border') return ['STROKE_COLOR'];
  if (g === 'accent') return ['FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR'];
  if (g === 'feedback') return leaf.endsWith('-fill') ? ['FRAME_FILL', 'SHAPE_FILL'] : ['TEXT_FILL', 'SHAPE_FILL', 'STROKE_COLOR'];
  return ['FRAME_FILL', 'SHAPE_FILL'];
}
function themeValue(css, mode) {
  const expr = ENV[mode][css];
  const ref = expr.match(/^var\((--[\w-]+)\)$/);
  if (ref && primitiveRef[ref[1]]) return { alias: primitiveRef[ref[1]][mode] };
  const c = parseColor(resolve(expr, ENV[mode]));
  return c ? { value: hex(c) } : null;
}
const themeVars = [];
for (const css of Object.keys(aliasBlock).filter(k => k.startsWith('--color-'))) {
  const values = Object.fromEntries(MODES.map(m => [m, themeValue(css, m)]));
  if (!values.Dark || !values.Light) continue;   // gradients (action-primary/secondary) → paint styles
  const name = themeName(css);
  themeVars.push({ name, css, type: 'COLOR', scopes: themeScopes(name), values });
}

/* ---------- 3 · Scale (one mode) — radii, spacing, icon sizes, font families ---------- */
const px = s => parseFloat(String(s));
const scaleVars = [];
for (const [css, raw] of Object.entries({ ...primitivesDark, ...aliasBlock })) {
  const n = css.slice(2); let m;
  const add = (name, type, value, scopes) => scaleVars.push({ name, css, type, value, scopes });
  if ((m = n.match(/^r-(.+)$/))) add(`radius/${m[1]}`, 'FLOAT', px(raw), ['CORNER_RADIUS']);
  else if ((m = n.match(/^s-(\d+)$/))) add(`space/${m[1]}`, 'FLOAT', px(raw), ['GAP']);
  else if (n === 'container-max') add('layout/container-max', 'FLOAT', px(raw), ['WIDTH_HEIGHT']);
  else if ((m = n.match(/^container-(prose|wide)$/))) add(`layout/container-${m[1]}`, 'FLOAT', px(raw), ['WIDTH_HEIGHT']);
  else if ((m = n.match(/^bp-(sm|md|lg|xl|2xl)$/))) add(`layout/bp-${m[1]}`, 'FLOAT', px(raw), ['WIDTH_HEIGHT']);
  else if ((m = n.match(/^(sidebar-w|aside-w|topbar-h|touch-target)$/))) add(`layout/${m[1]}`, 'FLOAT', px(raw), ['WIDTH_HEIGHT']);   // --gutter is a clamp(): not a single Figma number
  else if ((m = n.match(/^icon-(sm|md|lg)$/))) add(`icon/${m[1]}`, 'FLOAT', px(raw), ['WIDTH_HEIGHT']);
  else if (n === 'icon-stroke') add('icon/stroke', 'FLOAT', px(raw), ['STROKE_FLOAT']);
  else if ((m = n.match(/^font-(display|body|mono)$/))) add(`font/${m[1]}`, 'STRING', raw.split(',')[0].replace(/['"]/g, '').trim(), ['FONT_FAMILY']);
}

/* ---------- 4 · Text styles — type scale tokens + the element rules that set their own font ---------- */
function fontFrom(decl, env) {
  const r = v => resolve(v, env);
  let weight, size, sizeMin, lh, family;
  if (decl.font) {
    const f = r(decl.font);
    const m = f.match(/^(\d{3})\s+(clamp\(([\d.]+)px,[^,]+,\s*([\d.]+)px\)|[\d.]+px)\/([\d.]+)\s+(.+)$/);
    if (!m) throw new Error(`Cannot parse font shorthand: ${f}`);
    weight = +m[1]; size = m[4] ? +m[4] : px(m[2]); sizeMin = m[3] ? +m[3] : undefined; lh = +m[5]; family = m[6];
  } else {
    weight = +r(decl['font-weight']); size = px(r(decl['font-size'])); lh = +r(decl['line-height']); family = r(decl['font-family']);
  }
  const ls = decl['letter-spacing'] ? parseFloat(r(decl['letter-spacing'])) * 100 : 0;   // em → % of font size
  return {
    family: family.split(',')[0].replace(/['"]/g, '').trim(), weight, size, ...(sizeMin ? { sizeMin } : {}),
    lineHeight: Math.round(lh * 1000) / 10, letterSpacing: Math.round(ls * 10) / 10,
    upper: decl['text-transform'] === 'uppercase',
  };
}
const scaleStyles = [
  ['Display/XL', '--display-xl'], ['Display/L', '--display-l'],
  ['Heading/H1', '--h1'], ['Heading/H2', '--h2'], ['Heading/H3', '--h3'], ['Heading/H4', '--h4'],
  ['Body/LG', '--body-lg'], ['Body/MD', '--body'], ['Body/SM', '--body-sm'], ['Body/Caption', '--caption'],
].map(([name, css]) => ({ name, css, ...fontFrom({ font: `var(${css})` }, ENV.Dark) }));
scaleStyles.push({
  name: 'Mono/Label', css: '--mono-label',
  ...fontFrom({ font: 'var(--mono-label)', 'letter-spacing': 'var(--tracking-label)', 'text-transform': 'uppercase' }, ENV.Dark),
});
const elementStyles = [
  ['UI/Button', ['.np-btn']], ['UI/Button SM', ['.np-btn', '.np-btn--sm']], ['UI/Button LG', ['.np-btn', '.np-btn--lg']],
  ['UI/Tab', ['.np-tab']], ['UI/Input', ['.np-input']], ['UI/Nav item', ['.np-navitem']],
  ['UI/Toast title', ['.np-toast__title']], ['UI/Metric', ['.np-card__metric']],
  ['Mono/Badge', ['.np-badge']], ['Mono/Segment', ['.np-seg__item']], ['Mono/Field label', ['.np-field__label']],
  ['Mono/Switch', ['.np-switch']], ['Mono/Caption', ['.np-toast__body']], ['Mono/Data', ['.np-table']],
  ['Mono/Table head', ['.np-table th']], ['Mono/Kbd', ['.np-kbd']], ['Mono/Code', ['.np-codeblock']],
  ['Mono/Tooltip', ['[data-np-tooltip]::after']],
].map(([name, selectors]) => {
  const decl = Object.assign({}, ...selectors.map(rule));
  const local = Object.fromEntries(Object.entries(decl).filter(([k]) => k.startsWith('--')));
  return { name, css: selectors.join(''), ...fontFrom(decl, { ...ENV.Dark, ...local }) };
});

/* ---------- 5 · Effects — box-shadows → effect styles whose colours/geometry bind to Theme variables ---------- */
function parseShadows(expr) {
  return splitTop(expr, ',').map(layer => {
    const parts = splitSpaces(layer);
    const inset = parts[0] === 'inset' || parts.at(-1) === 'inset';
    const rest = parts.filter(p => p !== 'inset');
    const nums = [];
    while (rest.length && /^-?[\d.]+(px)?$/.test(rest[0])) nums.push(px(rest.shift()));
    const color = parseColor(rest.join(' '));
    if (!color) throw new Error(`Cannot parse shadow colour in: ${layer}`);
    const [x = 0, y = 0, blur = 0, spread = 0] = nums;
    return { type: inset ? 'INNER_SHADOW' : 'DROP_SHADOW', x, y, blur, spread, color };
  });
}
const effectDefs = [
  ['Glow/Cyan', ['--glow-cyan']],
  ['Glow/Blue', ['--glow-blue']],
  ['Glow/Magenta', ['--glow-magenta']],
  ['Glow/Magenta hover', ['--glow-magenta', '.np-btn--secondary:hover']],
  ['Glow/Danger', ['--glow-danger']],
  ['Glow/Soft', ['--glow-soft']],
  ['State/Hover glow', ['--state-hover-glow']],
  ['State/Focus ring', ['--ring-focus']],
  ['Elevation/Flat', ['--shadow-1']],
  ['Elevation/Overlay', ['--shadow-2']],
  ['Elevation/Overlay glow', ['--shadow-2', '--glow-soft']],
];
function shadowSource(src, mode) {
  if (src.startsWith('--')) return resolve(ENV[mode][src], ENV[mode]);
  // a rule's own box-shadow; a :hover rule repeats the base glow first — keep only what it adds
  const shadows = splitTop(rule(src)['box-shadow'], ',');
  return resolve((src.endsWith(':hover') ? shadows.slice(1) : shadows).join(', '), ENV[mode]);
}
const aliasesOf = css => Object.entries(aliasBlock).filter(([, v]) => v === `var(${css})`).map(([k]) => k);
const addThemeVar = v => { if (!themeVars.some(t => t.name === v.name)) themeVars.push(v); };
const effects = effectDefs.map(([name, sources]) => {
  const layers = [];
  for (const src of sources) {
    const key = src.startsWith('--') ? src.slice(2) : name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const perMode = Object.fromEntries(MODES.map(m => [m, parseShadows(shadowSource(src, m))]));
    let n = 0;
    // align layers across themes by type (light shadow-1 has no inset layer → transparent stand-in)
    for (const type of ['INNER_SHADOW', 'DROP_SHADOW']) {
      const lists = MODES.map(m => perMode[m].filter(l => l.type === type));
      const count = Math.max(...lists.map(l => l.length));
      for (let i = 0; i < count; i++) {
        const pick = lists.map(l => l[i] || { ...lists.find(x => x[i])[i], color: { r: 0, g: 0, b: 0, a: 0 } });
        const base = `effect/${key}/${++n}`;
        const layer = { type, vars: {} };
        for (const f of ['x', 'y', 'blur', 'spread']) {
          const [d, l] = pick.map(p => p[f]);
          layer[f] = d;
          if (d !== l) {   // geometry that differs per theme is bound to a FLOAT variable
            layer.vars[f] = `${base}/${f}`;
            addThemeVar({ name: `${base}/${f}`, css: `${src} #${n}`, type: 'FLOAT', scopes: ['EFFECT_FLOAT'],
              values: { Dark: { value: d }, Light: { value: l } } });
          }
        }
        layer.color = hex(pick[0].color);
        layer.vars.color = `${base}/color`;
        addThemeVar({ name: `${base}/color`, css: `${src} #${n}`, type: 'COLOR', scopes: ['EFFECT_COLOR'],
          values: Object.fromEntries(MODES.map((m, j) => [m, { value: hex(pick[j].color) }])) });
        layers.push(layer);
      }
    }
  }
  const css = sources.filter(s => s.startsWith('--'));
  return { name, css: sources.join(' + '), aliases: css.flatMap(aliasesOf), layers };
});

/* ---------- 6 · Gradients — paint styles; stops bind to Primitives or Theme variables ---------- */
function parseGradient(css) {
  const out = {};
  for (const m of MODES) {
    const expr = ENV[m][css];
    const g = expr.match(/^(linear|radial)-gradient\((.*)\)$/s);
    const parts = splitTop(g[2], ',');
    const head = /deg$|^\d+% \d+% at|^to /.test(parts[0]) ? parts.shift() : '';
    out[m] = {
      kind: g[1], head,
      stops: parts.map(p => {
        const sm = p.match(/^(.*?)\s+([\d.]+)%$/);
        const colorExpr = sm ? sm[1] : p;
        const ref = colorExpr.match(/^var\((--[\w-]+)\)$/);
        return {
          position: sm ? +sm[2] / 100 : null,
          alias: ref && primitiveRef[ref[1]] ? primitiveRef[ref[1]][m] : null,
          color: hex(parseColor(resolve(colorExpr, ENV[m]))),
        };
      }),
    };
  }
  return out;
}
const gradients = [
  ['Gradient/Pulse', '--grad-pulse'], ['Gradient/Pulse hot', '--grad-pulse-hot'], ['Gradient/Haze', '--grad-haze'],
].map(([name, css]) => {
  const g = parseGradient(css);
  const stops = g.Dark.stops.map((s, i) => {
    const l = g.Light.stops[i];
    const fixed = s.alias && s.alias === l.alias;
    return fixed
      ? { position: s.position, primitive: s.alias, color: s.color }
      : { position: s.position, theme: `gradient/${css.slice(2).replace(/^grad-/, '')}-${i + 1}`, color: s.color,
          values: { Dark: s.color, Light: l.color } };
  });
  return { name, css, aliases: aliasesOf(css), kind: g.Dark.kind, angle: g.Dark.head, stops };
});
// gradient stops that change with the theme become Theme variables (hidden from pickers)
for (const g of gradients) for (const s of g.stops) {
  if (s.theme) addThemeVar({
    name: s.theme, css: `${g.css} stop`, type: 'COLOR', scopes: [],
    values: { Dark: { value: s.values.Dark }, Light: { value: s.values.Light } },
  });
}

/* ---------- 7 · Icons — Lucide outline, the system stroke baked in ---------- */
const iconDir = join(here, 'icons');
const icons = Object.fromEntries(readdirSync(iconDir).filter(f => f.endsWith('.svg')).sort().map(f => {
  const svg = readFileSync(join(iconDir, f), 'utf8')
    .replace(/<!--[\s\S]*?-->/g, '').replace(/\s*class="[^"]*"/, '').replace(/\s+/g, ' ')
    .replace(/stroke="currentColor"/, 'stroke="#eef1fb"')
    .replace(/stroke-width="2"/, `stroke-width="${px(aliasBlock['--icon-stroke'])}"`).replace(/> </g, '><').trim();
  return [f.replace(/\.svg$/, ''), svg];
}));

/* ---------- write ---------- */
const model = {
  meta: { system: 'NeonPulse', version, source: 'colors_and_type.css', generator: 'figma/export-tokens.mjs' },
  collections: [
    { name: 'Primitives', modes: ['Value'], hidden: true, variables: primitiveVars },
    { name: 'Theme', modes: MODES, variables: themeVars },
    { name: 'Scale', modes: ['Value'], variables: scaleVars },
  ],
  textStyles: [...scaleStyles, ...elementStyles],
  effects,
  gradients,
};

const tokensPath = join(here, 'tokens.json');
const codePath = join(here, 'plugin', 'code.js');
const tokensJson = JSON.stringify(model, null, 2) + '\n';
const code = readFileSync(codePath, 'utf8');
const START = '// @generated:start', END = '// @generated:end';
const a = code.indexOf(START), b = code.indexOf(END);
if (a < 0 || b < a) throw new Error('figma/plugin/code.js is missing the @generated markers');
const generated = `${START} — do not edit by hand: node figma/export-tokens.mjs\nconst NP_DATA = ${JSON.stringify({ ...model, icons })};\n`;
const nextCode = code.slice(0, a) + generated + code.slice(b);

const stale = [];
if (!existsSync(tokensPath) || readFileSync(tokensPath, 'utf8') !== tokensJson) stale.push('figma/tokens.json');
if (code !== nextCode) stale.push('figma/plugin/code.js');
if (CHECK) {
  if (stale.length) { console.error(`Stale: ${stale.join(', ')} — run: node figma/export-tokens.mjs`); process.exit(1); }
  console.log('Figma token export is up to date.');
} else {
  writeFileSync(tokensPath, tokensJson);
  writeFileSync(codePath, nextCode);
  const count = model.collections.map(c => `${c.name} ${c.variables.length}`).join(', ');
  console.log(`NeonPulse ${version} → ${count} variables, ${model.textStyles.length} text styles, ` +
    `${effects.length} effect styles, ${gradients.length} gradients, ${Object.keys(icons).length} icons.`);
}
