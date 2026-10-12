#!/usr/bin/env node
/* ============================================================
   NeonPulse → Figma · trimmed script for the Figma MCP `use_figma` tool

   `use_figma` accepts at most 50,000 characters per call; plugin/code.js is far bigger (it carries every
   builder plus the generated token data). This prints a self-contained script that holds only the helpers
   and the builders you ask for, so Claude can build or rebuild single components through the connector.

     node figma/mcp-script.mjs components Drawer,Sheet            build what is missing among these
     node figma/mcp-script.mjs components Drawer,Sheet --rebuild  remove and rebuild them
     node figma/mcp-script.mjs layouts                            the six breakpoint layout frames
     node figma/mcp-script.mjs flows [--part web|app]             the order flow (open a current account), web and app
     add  --out script.js  to write a file instead of stdout

   The file must already hold the variables and styles (run “Sync tokens” in the plugin first): the script
   reads them by name and never creates them. Icons that are not in the file yet are not added either.
   ============================================================ */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf(n); if (i < 0) return null; const v = args[i + 1]; args.splice(i, v && !v.startsWith('--') ? 2 : 1); return v && !v.startsWith('--') ? v : true; };
const out = flag('--out');
const rebuild = !!flag('--rebuild');
const part = flag('--part');
const [mode, only] = args;
if (!['components', 'layouts', 'flows'].includes(mode) || (mode === 'components' && !only)) {
  console.error('usage: node figma/mcp-script.mjs components <Key,Key,…> [--rebuild] [--out file]\n       node figma/mcp-script.mjs layouts|flows [--part web|app] [--out file]');
  process.exit(2);
}
const keys = mode === 'components' ? only.split(',').map(s => s.trim()) : [];

let src = readFileSync(join(here, 'plugin', 'code.js'), 'utf8').replace(/\r\n/g, '\n');
const version = JSON.parse(readFileSync(join(here, 'tokens.json'), 'utf8')).meta.version;

/* 1 · the generated data block becomes a stub (the variables, styles and icons already live in the file) */
src = src.split('\n').map(l => l.startsWith('const NP_DATA =')
  ? `const NP_DATA = { meta: { system: 'NeonPulse', version: '${version}' }, collections: [{ name: 'Primitives', variables: [{ name: 'dark/bg/0', value: '#07070d' }] }, { name: 'Theme' }, { name: 'Scale' }], icons: {} };`
  : l).join('\n');

/* 2 · LIB: which builder belongs to which key, and which builders to keep */
const libRe = /^    \[("[^"]+"|'[^']+'), ("[^"]+"|'[^']+'), ([A-Za-z]+), /;
const builderOf = {};
for (const l of src.split('\n')) { const m = l.match(libRe); if (m) builderOf[m[1].slice(1, -1)] = m[3]; }
for (const k of keys) if (!(k in builderOf)) { console.error(`Unknown component "${k}". Known: ${Object.keys(builderOf).join(', ')}`); process.exit(1); }
const keep = new Set(keys.map(k => builderOf[k]));

/* 3 · drop what a trimmed run does not need: every other builder and every phase but the ones used */
const phaseName = mode === 'components' ? 'phaseComponents' : mode === 'layouts' ? 'phaseLayouts' : 'phaseFlows';
const phaseKeep = new Set([phaseName]);
const L0 = src.split('\n');
const names = [];
L0.forEach((l, i) => { const m = l.match(/^  (?:async )?function ((?:build|phase)[A-Za-z]*)\(/); if (m) names.push([m[1], i]); });
for (const [name] of names.reverse()) {
  if (keep.has(name) || phaseKeep.has(name)) continue;
  const L = src.split('\n');
  const start = L.findIndex(l => new RegExp(`^  (async )?function ${name}\\(`).test(l));
  if (start < 0) continue;
  const end = L.findIndex((l, i) => i >= start && (l === '  }' || (i === start && /\}\s*$/.test(l) && !l.trim().endsWith('{'))));
  L.splice(start, end - start + 1);
  src = L.join('\n');
}
for (const n of ['fontFor', 'swatch', 'describeVar', 'toValue', 'linearTransform', 'radialTransform']) {
  const L = src.split('\n');
  const start = L.findIndex(l => new RegExp(`^  (async )?function ${n}\\(`).test(l));
  if (start < 0) continue;
  const end = L.findIndex((l, i) => i >= start && (l === '  }' || (i === start && /\}\s*$/.test(l) && !l.trim().endsWith('{'))));
  L.splice(start, end - start + 1);
  src = L.join('\n');
}
/* helpers that belong to another mode */
const dropBlock = (startRe) => {
  const L = src.split('\n');
  const start = L.findIndex(l => startRe.test(l));
  if (start < 0) return;
  const oneLine = /[;}]\s*$/.test(L[start]) && !/[\[{(]\s*$/.test(L[start]);
  const end = oneLine ? start : L.findIndex((l, i) => i > start && (l === '  ];' || l === '  }' || l === '  };'));
  L.splice(start, end - start + 1);
  src = L.join('\n');
};
const others = [];
if (mode !== 'layouts') others.push(/^  (async )?function deviceFrame\(/, /^  (async )?function sideEdge\(/, /^  const DEVICES = \[/);
if (mode !== 'flows') {
  const fnNames = [...src.matchAll(/^  (?:async )?function (flow[A-Za-z]*)\(/gm)].map(m => m[1]);
  for (const n of fnNames) others.push(new RegExp(`^  (async )?function ${n}\\(`));
  others.push(/^  const FLOW_STEPS = /, /^  const FLOW_SCREENS = \[/, /^  const flowInput = /, /^  const flowSelect = /);
}
for (const re of others) dropBlock(re);
/* the LIB still lists every component (registerSets finds the existing ones by name); builders of the others become null */
src = src.split('\n').map(l => { const m = l.match(libRe); return m && !keep.has(m[3]) ? l.replace(`, ${m[3]}, `, ', null, ') : l; }).join('\n');
src = src.replace('  const LIB = [', "  async function buildIcons() { return []; }\n  async function buildThemeCheck() { return null; }\n  const LIB = [");

/* 4 · runner, no plugin entry point */
src = src.replace(/const PHASES = \{[^}]*\};/, `const PHASES = { ${mode}: ${phaseName} };`);
src = src.replace(/const ALL = \[[^\]]*\];/, `const ALL = ['${mode}'];`);
src = src.slice(0, src.indexOf('// Plugin entry.'));

/* 5 · light minify: comments, indentation, blank lines */
src = src.replace(/^\/\*[\s\S]*?\*\/\n/, '').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('//')).join('\n');
src = src.replace(/\n\/\*[\s\S]*?\*\//g, '\n').replace(/\n{2,}/g, '\n');
const runArgs = mode === 'components' ? `, { only: ${JSON.stringify(keys)}${rebuild ? ', rebuild: true' : ''} }` : mode === 'flows' && part ? `, { part: '${part}' }` : '';
src += `\nreturn await NP.run(['${mode}']${runArgs});\n`;

if (out) writeFileSync(out, src); else process.stdout.write(src);
console.error(`use_figma script: ${src.length} characters${src.length > 50000 ? ' — OVER the 50,000 limit, ask for fewer components' : ' (limit 50,000)'}`);
