/* ============================================================
   NeonPulse · date picker — reference implementation of `.np-datepicker`
   Framework-free, no dependencies. Progressive enhancement of plain markup:

   single date (typed or picked)
     <div class="np-datepicker" data-np-datepicker data-selects="true" data-max="-18y">
       <div class="np-inputgroup">
         <input id="dob" autocomplete="bday">
         <button type="button" class="np-icon-btn np-icon-btn--sm np-icon-btn--ghost np-datepicker__toggle"><svg …/></button>
       </div>
     </div>

   range (one trigger, two months on wide screens, presets)
     <div class="np-datepicker" data-np-datepicker data-mode="range" data-presets="today,7d,30d,month">
       <button type="button" class="np-select np-datepicker__trigger">
         <span class="np-select__value is-placeholder"></span><svg class="np-select__chev" …/></button>
     </div>

   Options (data-attributes, or the second argument of NPDatepicker.mount):
     mode        single | range                       selects   month and year dropdowns (single month only)
     min / max   ISO date, "today", or "+30d" "-18y" "+1m" relative to today
     locale      default: <html lang>                 value     initial ISO date (range: "ISO/ISO")
     presets     today,7d,30d,month (range)           weekends  "false" disables Saturday + Sunday
     months      1 | 2 (default: 2 for range from 768px)
     isDisabled  function(Date) → boolean (mount() only)

   Events (bubbling): `np-datepicker:change` {value, start, end, text}, `np-datepicker:invalid` {text, reason}.
   Instance: el.npDatepicker = { value, set(v), open(), close() }. The panel is a popover from 768px (--bp-md)
   and a bottom sheet below, driven by colors_and_type.css; this script only fills and positions it.
   ============================================================ */
(function (root) {
  'use strict';

  var STR = {
    de: { open: 'Kalender öffnen', dialog: 'Datum wählen', prev: 'Vorheriger Monat', next: 'Nächster Monat', month: 'Monat', year: 'Jahr', today: 'Heute', clear: 'Löschen',
      range: 'Zeitraum wählen', d7: 'Letzte 7 Tage', d30: 'Letzte 30 Tage', month_: 'Dieser Monat', ph: { day: 'TT', month: 'MM', year: 'JJJJ' }, to: ' – ' },
    en: { open: 'Open calendar', dialog: 'Choose a date', prev: 'Previous month', next: 'Next month', month: 'Month', year: 'Year', today: 'Today', clear: 'Clear',
      range: 'Select a range', d7: 'Last 7 days', d30: 'Last 30 days', month_: 'This month', ph: { day: 'DD', month: 'MM', year: 'YYYY' }, to: ' – ' }
  };
  var SVG = function (d) { return '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + d + '"/></svg>'; };
  var CAL = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>';
  var uid = 0;

  /* ---------- dates ---------- */
  var p2 = function (n) { return (n < 10 ? '0' : '') + n; };
  var iso = function (d) { return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); };
  var day = function (d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); };
  var plusDays = function (d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); };
  var same = function (a, b) { return !!a && !!b && iso(a) === iso(b); };
  var firstOf = function (d) { return new Date(d.getFullYear(), d.getMonth(), 1); };
  function plusMonths(d, n) {                                   // keeps the day, clamped to the target month
    var t = new Date(d.getFullYear(), d.getMonth() + n, 1), last = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
    return new Date(t.getFullYear(), t.getMonth(), Math.min(d.getDate(), last));
  }
  function parseISO(s) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(s || '').trim()); if (!m) return null; var d = new Date(+m[1], +m[2] - 1, +m[3]); return d.getMonth() === +m[2] - 1 ? d : null; }
  function bound(s) {                                           // "2026-10-12" | "today" | "+30d" | "-18y"
    if (!s) return null; s = String(s).trim();
    var t = day(new Date()), m = /^([+-]\d+)([dmy])$/.exec(s);
    if (s === 'today') return t;
    if (m) { var n = +m[1]; return m[2] === 'd' ? plusDays(t, n) : m[2] === 'm' ? plusMonths(t, n) : plusMonths(t, n * 12); }
    return parseISO(s);
  }

  /* ---------- one instance ---------- */
  function mount(el, o) {
    if (el.npDatepicker) return el.npDatepicker;
    var a = function (k) { return el.getAttribute('data-' + k); };
    o = o || {};
    var mode = o.mode || a('mode') || 'single', range = mode === 'range';
    var locale = o.locale || a('locale') || document.documentElement.lang || 'en';
    var T = STR[locale.slice(0, 2)] || STR.en;
    var min = bound(o.min || a('min')), max = bound(o.max || a('max'));
    var selects = (o.selects != null ? o.selects : a('selects') === 'true') && !range;
    var noWeekends = (o.weekends != null ? o.weekends : a('weekends')) === false || a('weekends') === 'false';
    var presets = (o.presets || a('presets') || '').split(',').filter(Boolean);
    var wantMonths = +(o.months || a('months')) || 0;
    var isDisabled = o.isDisabled || function () { return false; };
    var mq = root.matchMedia ? root.matchMedia('(min-width: 768px)') : { matches: true, addEventListener: function () {} };

    var input = el.querySelector('.np-datepicker__input') || (range ? null : el.querySelector('input'));
    var trigger = el.querySelector('.np-datepicker__trigger');
    var toggle = el.querySelector('.np-datepicker__toggle') || trigger;
    var panel = el.querySelector('.np-datepicker__panel'), scrim = el.querySelector('.np-datepicker__scrim');
    var id = 'npdp' + (++uid);
    if (!scrim) { scrim = document.createElement('div'); scrim.className = 'np-datepicker__scrim'; scrim.hidden = true; el.appendChild(scrim); }
    if (!panel) { panel = document.createElement('div'); panel.className = 'np-datepicker__panel'; panel.hidden = true; el.appendChild(panel); }
    panel.id = panel.id || id; panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-label', range ? T.range : T.dialog);

    /* locale-aware formatting and parsing */
    var fmt = new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });
    var parts = fmt.formatToParts(new Date(2001, 10, 22)), order = [], sep = '.';
    parts.forEach(function (p) { if (p.type === 'literal') sep = p.value.trim() || sep; else order.push(p.type); });
    var monthName = new Intl.DateTimeFormat(locale, { month: 'long' }), long = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    var wdFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
    var first = 1;
    try { var L = new Intl.Locale(locale), wi = L.getWeekInfo ? L.getWeekInfo() : L.weekInfo; first = wi ? wi.firstDay % 7 : (/^en-(US|CA)$|^en$/.test(locale) && locale !== 'en-GB' ? 0 : 1); } catch (e) { first = 1; }
    var text = function (d) { return fmt.format(d); };
    function parseText(s) {
      var n = String(s || '').trim().split(/[.\/\-\s]+/).filter(Boolean);
      if (n.length !== 3 || n.some(function (x) { return !/^\d+$/.test(x); })) return null;
      var v = {}; order.forEach(function (t, i) { v[t] = +n[i]; });
      if (String(v.year).length !== 4 && n[order.indexOf('year')].length !== 4) return null;
      var d = new Date(v.year, v.month - 1, v.day);
      return d.getFullYear() === v.year && d.getMonth() === v.month - 1 && d.getDate() === v.day ? d : null;
    }
    if (input && !input.getAttribute('placeholder')) input.setAttribute('placeholder', order.map(function (t) { return T.ph[t]; }).join(sep));
    if (input) { input.setAttribute('inputmode', 'numeric'); input.setAttribute('maxlength', '10'); }

    var value = null, start = null, end = null, cs = null, ce = null, view = firstOf(new Date()), focusDate = day(new Date());
    var months = function () { return range ? (wantMonths || (mq.matches ? 2 : 1)) : 1; };
    var sheet = function () { return !mq.matches; };
    var inRange = function (d) { return (!min || d >= min) && (!max || d <= max); };
    var enabled = function (d) { return inRange(d) && !(noWeekends && (d.getDay() === 0 || d.getDay() === 6)) && !isDisabled(d); };

    /* ---------- the panel ---------- */
    function dayButton(d, month, i) {
      var out = d.getMonth() !== month.getMonth();
      if (out && months() > 1) return '<span></span>';
      var cls = 'np-calendar__day' + (out ? ' is-outside' : '') + (same(d, new Date()) ? ' is-today' : '');
      var pressed = range ? same(d, start) || same(d, end) : same(d, value);
      if (range && start && end && d > start && d < end) cls += ' is-in-range';
      if (range && start && end && same(d, start) && !same(start, end)) cls += ' is-range-start';
      if (range && start && end && same(d, end) && !same(start, end)) cls += ' is-range-end';
      return '<button type="button" class="' + cls + '" data-date="' + iso(d) + '" aria-pressed="' + (pressed ? 'true' : 'false') + '" aria-label="' + long.format(d) + '" tabindex="' + (same(d, focusDate) ? 0 : -1) + '"' + (enabled(d) ? '' : ' disabled') + '>' + d.getDate() + '</button>';
    }
    function monthHtml(m, k, n) {
      var lead = (m.getDay() - first + 7) % 7, cells = '', i, d;
      for (i = 0; i < 7; i++) { d = new Date(2023, 0, 1 + ((first + i) % 7)); cells += '<span class="np-calendar__dow" aria-hidden="true">' + wdFmt.format(d).slice(0, 2) + '</span>'; }
      for (i = 0; i < 42; i++) { d = new Date(m.getFullYear(), m.getMonth(), 1 - lead + i); if (i >= 35 && d.getMonth() !== m.getMonth() && months() > 1) break; cells += dayButton(d, m, i); }
      var prevOk = !min || plusDays(m, -1) >= firstOf(min) || firstOf(min) < m, nextOk = !max || new Date(m.getFullYear(), m.getMonth() + 1, 1) <= max;
      var arrowL = k === 0 ? '<button type="button" class="np-icon-btn np-icon-btn--sm np-icon-btn--ghost" data-nav="-1" aria-label="' + T.prev + '"' + (prevOk ? '' : ' disabled') + '>' + SVG('m15 18-6-6 6-6') + '</button>' : '<span class="np-calendar__gap"></span>';
      var arrowR = k === n - 1 ? '<button type="button" class="np-icon-btn np-icon-btn--sm np-icon-btn--ghost" data-nav="1" aria-label="' + T.next + '"' + (nextOk ? '' : ' disabled') + '>' + SVG('m9 18 6-6-6-6') + '</button>' : '<span class="np-calendar__gap"></span>';
      var title;
      if (selects) {
        var y0 = min ? min.getFullYear() : view.getFullYear() - 100, y1 = max ? max.getFullYear() : view.getFullYear() + 10, mo = '', yr = '', j;
        for (j = 0; j < 12; j++) mo += '<option value="' + j + '"' + (j === m.getMonth() ? ' selected' : '') + '>' + monthName.format(new Date(2023, j, 1)) + '</option>';
        for (j = y1; j >= y0; j--) yr += '<option' + (j === m.getFullYear() ? ' selected' : '') + '>' + j + '</option>';
        title = '<span class="np-calendar__selects"><select class="np-calendar__select" data-sel="month" aria-label="' + T.month + '">' + mo + '</select><select class="np-calendar__select" data-sel="year" aria-label="' + T.year + '">' + yr + '</select></span>';
      } else title = '<span class="np-calendar__title" aria-live="polite">' + monthName.format(m) + ' ' + m.getFullYear() + '</span>';
      return '<div class="np-calendar" role="group" aria-label="' + monthName.format(m) + ' ' + m.getFullYear() + '"><div class="np-calendar__head">' + arrowL + title + arrowR + '</div><div class="np-calendar__grid">' + cells + '</div></div>';
    }
    function foot() {
      var chips = presets.map(function (p) {
        var label = p === 'today' ? T.today : p === '7d' ? T.d7 : p === '30d' ? T.d30 : T.month_;
        return '<button type="button" class="np-chip" data-preset="' + p + '">' + label + '</button>';
      }).join('');
      if (!range) chips = '<button type="button" class="np-btn np-btn--ghost np-btn--sm" data-act="today">' + T.today + '</button>';
      return '<div class="np-datepicker__foot"><div class="np-datepicker__presets">' + chips + '</div><button type="button" class="np-btn np-btn--ghost np-btn--sm" data-act="clear">' + T.clear + '</button></div>';
    }
    function render() {
      var n = months(), html = '';
      for (var k = 0; k < n; k++) html += monthHtml(new Date(view.getFullYear(), view.getMonth() + k, 1), k, n);
      panel.innerHTML = '<div class="np-datepicker__months">' + html + '</div>' + foot();
    }
    function ensureFocusVisible() {
      var n = months(), lo = view, hi = new Date(view.getFullYear(), view.getMonth() + n, 0);
      if (focusDate < lo || focusDate > hi) focusDate = new Date(view.getFullYear(), view.getMonth(), Math.min(focusDate.getDate(), 28));
    }
    function focusDay() { var b = panel.querySelector('[data-date="' + iso(focusDate) + '"]:not([disabled])') || panel.querySelector('.np-calendar__day:not([disabled]):not(.is-outside)'); if (b) b.focus(); }

    /* ---------- state → DOM ---------- */
    function label() { return range ? (start ? text(start) + (end ? T.to + text(end) : '') : '') : (value ? text(value) : ''); }
    function sync() {
      var t = label();
      if (input) { input.value = t; }
      var v = trigger && trigger.querySelector('.np-select__value');
      if (v) { v.textContent = t || T.range; v.classList.toggle('is-placeholder', !t); }
    }
    function emit(name, detail) { el.dispatchEvent(new CustomEvent('np-datepicker:' + name, { bubbles: true, detail: detail })); }
    function changed() {
      cs = start; ce = end;
      sync();
      emit('change', { value: range ? (start && end ? iso(start) + '/' + iso(end) : null) : (value ? iso(value) : null), start: range ? start : value, end: range ? end : value, text: label() });
    }
    function setValue(v, silent) {
      if (range) { start = v && v.start || null; end = v && v.end || null; if (start) view = firstOf(start); }
      else { value = v || null; if (value) { view = firstOf(value); focusDate = value; } }
      if (input) { input.removeAttribute('aria-invalid'); }
      if (silent) sync(); else changed();
    }

    /* ---------- open / close ---------- */
    var isOpen = false;
    function place() {
      panel.classList.remove('np-datepicker__panel--up', 'np-datepicker__panel--end');
      panel.style.left = panel.style.right = '';
      if (sheet()) return;
      var r = panel.getBoundingClientRect(), host = el.getBoundingClientRect();
      if (r.bottom > innerHeight - 8 && host.top > r.height + 16) panel.classList.add('np-datepicker__panel--up');
      if (r.right > innerWidth - 8) panel.classList.add('np-datepicker__panel--end');
      r = panel.getBoundingClientRect();
      if (r.left < 8) { panel.classList.remove('np-datepicker__panel--end'); panel.style.right = 'auto'; panel.style.left = (8 - host.left) + 'px'; }   // never off-screen on the left
    }
    function open() {
      if (isOpen || (input && input.disabled) || (trigger && trigger.disabled)) return;
      isOpen = true; ensureFocusVisible(); render();
      panel.hidden = false; scrim.hidden = !sheet(); el.classList.add('is-open');
      if (toggle) toggle.setAttribute('aria-expanded', 'true');
      place(); focusDay();
      document.addEventListener('mousedown', outside, true); document.addEventListener('keydown', keys, true);
    }
    function close(refocus) {
      if (!isOpen) return;
      isOpen = false; panel.hidden = true; scrim.hidden = true; el.classList.remove('is-open');
      if (range && start && !end) { start = cs; end = ce; sync(); }                    // half-picked range: back to the last committed one
      if (toggle) { toggle.setAttribute('aria-expanded', 'false'); if (refocus) toggle.focus(); }
      document.removeEventListener('mousedown', outside, true); document.removeEventListener('keydown', keys, true);
    }
    function outside(e) { if (!el.contains(e.target) || e.target === scrim) close(false); }
    function keys(e) {
      if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); close(true); return; }
      if (e.key === 'Tab' && sheet()) {                            // keep focus inside the sheet
        var f = [].slice.call(panel.querySelectorAll('button:not([disabled]), select')), i = f.indexOf(document.activeElement);
        if (!f.length) return;
        if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
      }
    }

    /* ---------- interaction ---------- */
    function pick(d) {
      if (!enabled(d)) return;
      focusDate = d;
      if (!range) { setValue(d); close(true); return; }
      if (!start || end) { start = d; end = null; render(); focusDay(); sync(); return; }
      if (d < start) { end = start; start = d; } else end = d;
      changed(); close(true);
    }
    function presetRange(p) {
      var t = day(new Date());
      if (p === 'today') return { start: t, end: t };
      if (p === '7d') return { start: plusDays(t, -6), end: t };
      if (p === '30d') return { start: plusDays(t, -29), end: t };
      return { start: new Date(t.getFullYear(), t.getMonth(), 1), end: t };
    }
    panel.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.hasAttribute('data-date')) return pick(parseISO(b.getAttribute('data-date')));
      if (b.hasAttribute('data-nav')) { view = plusMonths(view, +b.getAttribute('data-nav')); focusDate = plusMonths(focusDate, +b.getAttribute('data-nav')); render(); var s = panel.querySelector('[data-nav="' + b.getAttribute('data-nav') + '"]'); if (s) s.focus(); return; }
      if (b.hasAttribute('data-preset')) { setValue(presetRange(b.getAttribute('data-preset'))); close(true); return; }
      if (b.getAttribute('data-act') === 'today') { pick(day(new Date())); return; }
      if (b.getAttribute('data-act') === 'clear') { setValue(range ? { start: null, end: null } : null); close(true); }
    });
    panel.addEventListener('change', function (e) {
      var s = e.target.closest('select'); if (!s) return;
      var mo = panel.querySelector('[data-sel="month"]'), yr = panel.querySelector('[data-sel="year"]');
      view = new Date(+yr.value, +mo.value, 1);
      if (max && view > max) view = firstOf(max); if (min && view < firstOf(min)) view = firstOf(min);
      focusDate = new Date(view.getFullYear(), view.getMonth(), Math.min(focusDate.getDate(), 28)); render();
      var t = panel.querySelector('[data-sel="' + s.getAttribute('data-sel') + '"]'); if (t) t.focus();
    });
    panel.addEventListener('keydown', function (e) {                // roving focus on the day grid
      var b = e.target.closest('.np-calendar__day'); if (!b) return;
      var d = parseISO(b.getAttribute('data-date')), n = null;
      var map = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
      if (e.key in map) n = plusDays(d, map[e.key]);
      else if (e.key === 'Home') n = plusDays(d, -((d.getDay() - first + 7) % 7));
      else if (e.key === 'End') n = plusDays(d, 6 - ((d.getDay() - first + 7) % 7));
      else if (e.key === 'PageUp') n = plusMonths(d, e.shiftKey ? -12 : -1);
      else if (e.key === 'PageDown') n = plusMonths(d, e.shiftKey ? 12 : 1);
      if (!n) return;
      e.preventDefault();
      if (min && n < min) n = min; if (max && n > max) n = max;
      focusDate = n;
      if (n < view || n > new Date(view.getFullYear(), view.getMonth() + months(), 0)) view = firstOf(n);
      render(); focusDay();
    });
    panel.addEventListener('mouseover', function (e) {              // live preview of a range
      var b = e.target.closest('.np-calendar__day'); if (!range || !b || !start || end) return;
      var h = parseISO(b.getAttribute('data-date')), lo = h < start ? h : start, hi = h < start ? start : h;
      [].forEach.call(panel.querySelectorAll('.np-calendar__day'), function (x) { var d = parseISO(x.getAttribute('data-date')); x.classList.toggle('is-in-range', d > lo && d < hi); });
    });
    mq.addEventListener && mq.addEventListener('change', function () { if (isOpen) { render(); scrim.hidden = !sheet(); place(); focusDay(); } });

    if (toggle) {
      toggle.setAttribute('aria-haspopup', 'dialog'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-controls', panel.id);
      if (!toggle.getAttribute('aria-label') && !toggle.textContent.trim()) toggle.setAttribute('aria-label', T.open);
      if (toggle !== trigger && !toggle.innerHTML.trim()) toggle.innerHTML = CAL;
      toggle.addEventListener('click', function () { isOpen ? close(true) : open(); });
      toggle.addEventListener('keydown', function (e) { if (e.key === 'ArrowDown' && !isOpen) { e.preventDefault(); open(); } });
    }
    if (range && trigger && !trigger.querySelector('.np-select__value')) trigger.insertAdjacentHTML('afterbegin', '<span class="np-select__value is-placeholder"></span>');

    /* typed input (single): digits get their separators, the text is validated on commit */
    function commitText() {
      var t = input.value.trim(), wasInvalid = input.hasAttribute('aria-invalid');
      if (!t) {
        input.removeAttribute('aria-invalid');
        if (value) setValue(null); else if (wasInvalid) emit('change', { value: null, start: null, end: null, text: '' });
        return;
      }
      var d = parseText(t);
      if (!d) { input.setAttribute('aria-invalid', 'true'); emit('invalid', { text: t, reason: 'format' }); return; }
      if (!inRange(d) || !enabled(d)) { input.setAttribute('aria-invalid', 'true'); emit('invalid', { text: t, reason: 'range' }); return; }
      if (!same(d, value)) setValue(d); else { input.removeAttribute('aria-invalid'); sync(); }
    }
    if (input) {
      input.addEventListener('input', function (e) {
        if (e.inputType && e.inputType.indexOf('delete') === 0) return;
        if (!/^[\d.\/\- ]*$/.test(input.value)) return;
        var digits = input.value.replace(/\D/g, '').slice(0, 8), out = '', g = order.map(function (t) { return t === 'year' ? 4 : 2; }), p = 0, i;
        for (i = 0; i < g.length && p < digits.length; i++) { out += (i ? sep : '') + digits.slice(p, p + g[i]); p += g[i]; }
        if (digits.length === g[0] || digits.length === g[0] + g[1]) out += sep;
        input.value = out;
      });
      input.addEventListener('change', commitText);
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !isOpen) commitText(); if (e.key === 'ArrowDown' && e.altKey) { e.preventDefault(); open(); } });
    }

    /* initial value */
    var init = o.value || a('value');
    if (init) { if (range) { var s = String(init).split('/'); setValue({ start: parseISO(s[0]), end: parseISO(s[1]) }, true); } else setValue(parseISO(init), true); }
    else if (input && input.value) { var t0 = parseText(input.value); if (t0) setValue(t0, true); }
    sync();
    if (!range) { var seed = value || day(new Date()); if (max && seed > max) seed = max; if (min && seed < min) seed = min; view = firstOf(seed); focusDate = seed; }

    var api = { el: el, open: open, close: function () { close(false); },
      set: function (v) { var before = label(); setValue(v, true); if (label() !== before) changed(); },
      get value() { return range ? { start: start, end: end } : value; } };
    el.npDatepicker = api;
    return api;
  }

  root.NPDatepicker = {
    mount: mount,
    init: function (scope) { [].forEach.call((scope || document).querySelectorAll('[data-np-datepicker]'), function (el) { mount(el); }); }
  };
  if (document.readyState !== 'loading') root.NPDatepicker.init(); else document.addEventListener('DOMContentLoaded', function () { root.NPDatepicker.init(); });
})(window);
