/* Marketing — sticky nav with in-page anchors + accessible mobile menu */
const NAV_LINKS = [['Product', '#product'], ['Platform', '#platform'], ['Pricing', '#pricing'], ['Docs', '#docs']];

function NPLogo({ size = 30 }) {
  return (
    <a href="#product" aria-label="NeonPulse home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', borderRadius: 'var(--r-sm)' }} className="mk-logo">
      <span aria-hidden="true" style={{
        width: size, height: size, borderRadius: '50%', position: 'relative', flex: 'none',
        background: 'var(--color-action-primary)', boxShadow: 'var(--glow-accent)'
      }}>
        <span style={{ position: 'absolute', inset: size * 0.3, borderRadius: '50%', background: 'var(--color-bg-void)' }} />
        <span style={{ position: 'absolute', inset: size * 0.42, borderRadius: '50%', background: 'var(--color-accent)' }} />
      </span>
      <span style={{ font: '700 18px/1 var(--font-display)', letterSpacing: '0.04em', color: 'var(--color-text)' }}>
        NEON<span style={{ color: 'var(--color-text-accent)' }}>PULSE</span>
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = React.useState(false);
  const toggleRef = React.useRef(null);
  // Esc closes the mobile menu and hands focus back to the toggle
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); toggleRef.current && toggleRef.current.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 'var(--z-sticky)',
      background: 'var(--color-bg-translucent)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--color-border-subtle)'
    }}>
      <div className="np-container" style={{ height: 66, display: 'flex', alignItems: 'center', gap: 28 }}>
        <NPLogo />
        <nav className="mk-desktop" aria-label="Primary" style={{ display: 'flex', gap: 4, marginLeft: 12 }}>
          {NAV_LINKS.map(([l, href]) => <a key={l} href={href} className="mk-navlink">{l}</a>)}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#pricing" className="mk-navlink mk-desktop">Sign in</a>
          <a href="#pricing" className="np-btn np-btn--primary">Start free</a>
          <button ref={toggleRef} type="button" className="np-icon-btn mk-mobile" onClick={() => setOpen(o => !o)}
            aria-label="Menu" aria-expanded={open} aria-controls="mk-mobile-menu">
            <Icon name={open ? 'x' : 'menu'} size={20} />
          </button>
        </div>
      </div>
      <nav id="mk-mobile-menu" className="mk-mobile" aria-label="Mobile" hidden={!open}
        style={{ borderTop: '1px solid var(--color-border-subtle)', padding: '8px 12px 14px', flexDirection: 'column', gap: 2 }}>
        {NAV_LINKS.map(([l, href]) => (
          <a key={l} href={href} className="mk-navlink" onClick={() => setOpen(false)} style={{ fontSize: 15, padding: '12px' }}>{l}</a>
        ))}
      </nav>
    </header>
  );
}

Object.assign(window, { Nav, NPLogo, NAV_LINKS });
