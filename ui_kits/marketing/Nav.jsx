/* Marketing — Nav bar with mobile toggle */
function NPLogo({ size = 30 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', position: 'relative', flex: 'none',
        background: 'var(--grad-pulse)', boxShadow: 'var(--glow-cyan)'
      }}>
        <span style={{ position: 'absolute', inset: size * 0.3, borderRadius: '50%', background: 'var(--bg-0)' }} />
        <span style={{ position: 'absolute', inset: size * 0.42, borderRadius: '50%', background: 'var(--neon-cyan)' }} />
      </div>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, letterSpacing: '0.04em', color: 'var(--fg-1)' }}>
        NEON<span style={{ color: 'var(--neon-cyan)' }}>PULSE</span>
      </span>
    </div>
  );
}

function Nav() {
  const [open, setOpen] = React.useState(false);
  const links = ['Product', 'Platform', 'Pricing', 'Docs', 'Changelog'];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(7,7,13,0.72)', backdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--line-1)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 66, display: 'flex', alignItems: 'center', gap: 28 }}>
        <NPLogo />
        <nav className="np-desktop" style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
          {links.map(l => (
            <a key={l} href="#" style={{
              fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-2)', textDecoration: 'none',
              padding: '8px 12px', borderRadius: 'var(--r-md)'
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--fg-1)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-2)'}>{l}</a>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#" className="np-desktop" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-2)', textDecoration: 'none' }}>Sign in</a>
          <button className="np-btn-primary">Start free</button>
          <button className="np-mobile np-icon-btn" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <Icon name={open ? 'x' : 'menu'} />
          </button>
        </div>
      </div>
      {open && (
        <div className="np-mobile" style={{ borderTop: '1px solid var(--line-1)', padding: '12px 24px 18px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(l => <a key={l} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-2)', textDecoration: 'none', padding: '10px 0' }}>{l}</a>)}
        </div>
      )}
    </header>
  );
}

Object.assign(window, { Nav, NPLogo });
