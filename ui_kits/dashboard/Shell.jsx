/* Dashboard — Sidebar + Topbar shell */
function Sidebar({ active, setActive }) {
  const groups = [
    { items: [['layout-dashboard', 'Overview'], ['activity', 'Telemetry'], ['server', 'Nodes'], ['git-branch', 'Deploys']] },
    { items: [['bar-chart-3', 'Analytics'], ['bell', 'Alerts'], ['key-round', 'API keys'], ['settings', 'Settings']] },
  ];
  return (
    <aside style={{
      width: 232, flex: 'none', background: 'var(--bg-0)', borderRight: '1px solid var(--line-1)',
      height: '100vh', position: 'sticky', top: 0, display: 'flex', flexDirection: 'column', padding: '18px 14px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 20px' }}>
        <div style={{ width: 26, height: 26, borderRadius: '50%', position: 'relative', background: 'var(--grad-pulse)', boxShadow: 'var(--glow-cyan)' }}>
          <span style={{ position: 'absolute', inset: 8, borderRadius: '50%', background: 'var(--bg-0)' }} />
          <span style={{ position: 'absolute', inset: 11, borderRadius: '50%', background: 'var(--neon-cyan)' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--fg-1)', letterSpacing: '0.03em' }}>NEON<span style={{ color: 'var(--neon-cyan)' }}>PULSE</span></span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {gi > 0 && <div style={{ height: 1, background: 'var(--line-1)', margin: '6px 8px 10px' }} />}
            {g.items.map(([ic, label]) => {
              const on = active === label;
              return (
                <button key={label} onClick={() => setActive(label)} style={{
                  display: 'flex', alignItems: 'center', gap: 11, padding: '9px 10px', borderRadius: 'var(--r-md)',
                  border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  color: on ? 'var(--fg-1)' : 'var(--fg-3)',
                  background: on ? 'var(--bg-2)' : 'transparent',
                  boxShadow: on ? 'inset 2px 0 0 var(--neon-cyan)' : 'none',
                  transition: 'all var(--dur)'
                }}
                  onMouseEnter={e => { if (!on) e.currentTarget.style.color = 'var(--fg-1)'; }}
                  onMouseLeave={e => { if (!on) e.currentTarget.style.color = 'var(--fg-3)'; }}>
                  <span style={{ display: 'flex', color: on ? 'var(--neon-cyan)' : 'inherit' }}><Icon name={ic} size={18} /></span>
                  {label}
                </button>
              );
            })}
          </div>
        ))}
        <div style={{ marginTop: 'auto', padding: 12, borderRadius: 'var(--r-lg)', background: 'var(--bg-2)', border: '1px solid var(--line-2)' }}>
          <div className="np-label" style={{ fontSize: 10 }}>Usage</div>
          <div style={{ height: 6, borderRadius: 4, background: 'var(--bg-4)', margin: '10px 0 8px', overflow: 'hidden' }}>
            <div style={{ width: '68%', height: '100%', background: 'var(--grad-pulse)', boxShadow: 'var(--glow-soft)' }} />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>6.8M / 10M reqs</div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ onDeploy }) {
  return (
    <div style={{
      height: 62, borderBottom: '1px solid var(--line-1)', display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 24px', position: 'sticky', top: 0, zIndex: 30,
      background: 'rgba(12,12,22,0.8)', backdropFilter: 'blur(12px)'
    }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: 'var(--fg-1)' }}>aurora-core</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="np-livedot" />LIVE · us-east
        </div>
      </div>
      <div className="np-search" style={{
        marginLeft: 18, display: 'flex', alignItems: 'center', gap: 8, flex: 1, maxWidth: 360,
        background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-md)', padding: '8px 12px'
      }}>
        <span style={{ color: 'var(--fg-3)', display: 'flex' }}><Icon name="search" size={16} /></span>
        <input placeholder="Search nodes, logs, keys…" style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--fg-1)', fontFamily: 'var(--font-body)', fontSize: 13, width: '100%' }} />
        <kbd style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', border: '1px solid var(--line-2)', borderRadius: 4, padding: '1px 5px' }}>⌘K</kbd>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="np-icon-btn"><Icon name="bell" size={18} /></button>
        <button className="np-btn-primary" onClick={onDeploy}><Icon name="rocket" size={16} /> Deploy</button>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--grad-pulse-hot)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#fff' }}>KV</div>
      </div>
    </div>
  );
}

Object.assign(window, { Sidebar, Topbar });
