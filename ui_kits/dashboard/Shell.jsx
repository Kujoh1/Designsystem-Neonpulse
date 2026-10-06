/* Dashboard — Sidebar (drawer ≤760px) + Topbar shell + range control */
const NAV_GROUPS = [
  [['layout-dashboard', 'Overview'], ['activity', 'Telemetry'], ['server', 'Nodes'], ['git-branch', 'Deploys']],
  [['chart-column', 'Analytics'], ['bell', 'Alerts'], ['key-round', 'API keys'], ['sliders-horizontal', 'Settings']],
];
const RANGES = ['Live', '1H', '24H', '7D'];
const MOD_KEY = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent) ? '⌘' : 'Ctrl ';

function Brand() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px' }}>
      <span aria-hidden="true" style={{ width: 26, height: 26, flex: 'none', borderRadius: '50%', position: 'relative', background: 'var(--color-action-primary)', boxShadow: 'var(--glow-accent)' }}>
        <span style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: 'var(--color-bg-void)' }} />
        <span style={{ position: 'absolute', inset: 11, borderRadius: '50%', background: 'var(--color-accent)' }} />
      </span>
      <span style={{ font: '700 15px/1 var(--font-display)', color: 'var(--color-text)', letterSpacing: '0.03em' }}>NEON<span style={{ color: 'var(--color-text-accent)' }}>PULSE</span></span>
    </div>
  );
}

function UsageCard() {
  return (
    <div className="np-card" style={{ marginTop: 'auto', padding: 12, gap: 8 }}>
      <div id="db-usage" className="np-label" style={{ fontSize: 10 }}>Usage</div>
      <div className="np-meter" role="meter" aria-labelledby="db-usage" aria-valuemin={0} aria-valuemax={100} aria-valuenow={68} aria-valuetext="6.8M of 10M requests">
        <div className="np-meter__bar" style={{ '--value': '68%' }} />
      </div>
      <div style={{ font: '400 11px/1.3 var(--font-mono)', color: 'var(--color-text-muted)' }}>6.8M / 10M reqs</div>
    </div>
  );
}

function Sidebar({ active, onNavigate, open, onClose }) {
  const ref = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;
  // drawer mode: focus moves in on open, Esc closes, focus returns to the trigger
  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const el = ref.current.querySelector('[aria-current="page"]') || ref.current.querySelector('button');
    if (el) el.focus();
    const onKey = e => { if (e.key === 'Escape') closeRef.current(); };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus(); };
  }, [open]);

  return (
    <aside ref={ref} id="db-sidebar" className={'db-sidebar' + (open ? ' is-open' : '')} aria-label="Workspace">
      <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 6 }}>
        <Brand />
        <button type="button" className="np-icon-btn np-icon-btn--sm np-icon-btn--ghost db-drawer-close" aria-label="Close navigation" onClick={onClose} style={{ marginLeft: 'auto' }}><Icon name="x" size={16} /></button>
      </div>
      <nav className="db-nav" aria-label="Main">
        {NAV_GROUPS.map((g, gi) => (
          <ul key={gi}>
            {g.map(([ic, label]) => (
              <li key={label}>
                <button type="button" className="np-navitem" aria-current={active === label ? 'page' : undefined} onClick={() => onNavigate(label)}>
                  <Icon name={ic} size={18} />{label}
                </button>
              </li>
            ))}
          </ul>
        ))}
      </nav>
      <UsageCard />
    </aside>
  );
}

function Topbar({ onDeploy, onSearch, onMenu, navOpen }) {
  return (
    <header className="db-topbar">
      <button type="button" className="np-icon-btn db-menu-btn" aria-label="Open navigation" aria-controls="db-sidebar" aria-expanded={navOpen} onClick={onMenu}><Icon name="menu" size={20} /></button>
      <div style={{ minWidth: 0 }}>
        <div style={{ font: '600 16px/1.3 var(--font-display)', color: 'var(--color-text)', whiteSpace: 'nowrap' }}>aurora-core</div>
        <div className="np-eyebrow" style={{ fontSize: 11, gap: 6, letterSpacing: '0.08em' }}><span className="np-livedot" />Live · us-east</div>
      </div>
      <button type="button" className="np-inputgroup db-search" onClick={onSearch} aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K">
        <Icon name="search" size={16} />
        <span style={{ flex: 1, padding: '9px 0', font: '400 13px/1.4 var(--font-body)', color: 'var(--color-text-muted)' }}>Search nodes, logs, keys…</span>
        <kbd className="np-kbd">{MOD_KEY}K</kbd>
      </button>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" className="np-icon-btn db-search-btn" aria-label="Search" aria-haspopup="dialog" aria-keyshortcuts="Control+K Meta+K" data-np-tooltip={'Search · ' + MOD_KEY + 'K'} data-np-tooltip-pos="bottom" onClick={onSearch}><Icon name="search" size={18} /></button>
        <button type="button" className="np-icon-btn" aria-label="Notifications" data-np-tooltip="Notifications" data-np-tooltip-pos="bottom"><Icon name="bell" size={18} /></button>
        <button type="button" className="np-btn np-btn--primary" aria-label="Deploy" onClick={onDeploy}><Icon name="rocket" size={16} /><span className="db-hide-sm">Deploy</span></button>
        <span className="np-avatar db-hide-sm" role="img" aria-label="Kira Vance">KV</span>
      </div>
    </header>
  );
}

function RangeControl({ range, setRange }) {
  return (
    <div className="np-seg" role="group" aria-label="Time range">
      {RANGES.map(r => (
        <button key={r} type="button" className="np-seg__item" aria-pressed={range === r} onClick={() => setRange(r)}>{r}</button>
      ))}
    </div>
  );
}

Object.assign(window, { Sidebar, Topbar, RangeControl, Brand, UsageCard, NAV_GROUPS, RANGES, MOD_KEY });
