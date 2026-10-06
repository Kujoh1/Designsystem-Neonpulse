/* Dashboard — ⌘K command palette (.np-scrim--top + .np-palette)
   ARIA combobox pattern: the input owns focus, options are pointed at via
   aria-activedescendant. commands: [{ id, group, icon, label, hint?, run }] */

function CommandPalette({ open, ...rest }) {
  // mount fresh on every open → query + selection reset for free
  return open ? <PaletteDialog {...rest} /> : null;
}

function PaletteDialog({ onClose, commands }) {
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState(0);
  const inputRef = React.useRef(null);

  const needle = q.trim().toLowerCase();
  const items = needle ? commands.filter(c => c.label.toLowerCase().includes(needle)) : commands;
  const active = Math.min(sel, Math.max(items.length - 1, 0));
  const groups = items.reduce((acc, c, i) => {
    const g = acc.find(x => x.name === c.group) || (acc.push({ name: c.group, items: [] }), acc[acc.length - 1]);
    g.items.push([c, i]);
    return acc;
  }, []);
  const optId = c => 'np-cmd-' + c.id;

  // focus the search on open, hand focus back to the trigger on close
  React.useEffect(() => {
    const prev = document.activeElement;
    inputRef.current.focus();
    return () => { if (prev && prev.focus && document.contains(prev)) prev.focus(); };
  }, []);
  React.useEffect(() => {
    const el = items[active] && document.getElementById(optId(items[active]));
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [active, needle]);

  const run = c => { if (!c) return; onClose(); c.run(); };
  const onKeyDown = e => {
    const n = items.length;
    if (e.key === 'ArrowDown') { e.preventDefault(); if (n) setSel((active + 1) % n); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (n) setSel((active - 1 + n) % n); }
    else if (e.key === 'Enter') { e.preventDefault(); run(items[active]); }
    else if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    else if (e.key === 'Tab') e.preventDefault();
  };

  return (
    <div className="np-scrim np-scrim--top" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="np-palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="np-palette__search">
          <Icon name="search" size={18} />
          <input ref={inputRef} value={q} placeholder="Search commands…"
            role="combobox" aria-expanded="true" aria-controls="np-cmd-list" aria-autocomplete="list"
            aria-activedescendant={items[active] ? optId(items[active]) : undefined} aria-label="Search commands"
            spellCheck={false} autoComplete="off"
            onChange={e => { setQ(e.target.value); setSel(0); }} onKeyDown={onKeyDown} />
          <kbd className="np-kbd">Esc</kbd>
        </div>
        <div id="np-cmd-list" className="np-palette__list" role="listbox" aria-label="Commands">
          {groups.map(g => (
            <div key={g.name} role="group" aria-labelledby={'np-cmd-g-' + g.name}>
              <div id={'np-cmd-g-' + g.name} className="np-palette__group">{g.name}</div>
              {g.items.map(([c, i]) => (
                <div key={c.id} id={optId(c)} role="option" aria-selected={i === active} className="np-palette__item"
                  onMouseMove={() => { if (i !== active) setSel(i); }}
                  onMouseDown={e => e.preventDefault()} onClick={() => run(c)}>
                  <Icon name={c.icon} size={16} />
                  <span>{c.label}</span>
                  {c.hint && <span className="np-palette__hint">{c.hint}</span>}
                </div>
              ))}
            </div>
          ))}
          {!items.length && <div className="np-palette__empty" role="status">No command matches “{q.trim()}”.</div>}
        </div>
        <div className="np-palette__footer" aria-hidden="true">
          <span><kbd className="np-kbd">↑</kbd><kbd className="np-kbd">↓</kbd>move</span>
          <span><kbd className="np-kbd">↵</kbd>run</span>
          <span><kbd className="np-kbd">Esc</kbd>close</span>
          <span className="db-hide-sm" style={{ marginLeft: 'auto' }}><kbd className="np-kbd">{window.MOD_KEY || '⌘'}K</kbd>toggle</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CommandPalette });
