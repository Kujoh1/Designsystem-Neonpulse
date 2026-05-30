/* Dashboard — Modal + Toast system */
function Modal({ open, onClose, onDeploy }) {
  const [region, setRegion] = React.useState('us-east');
  const [branch, setBranch] = React.useState('main');
  if (!open) return null;
  const regions = ['us-east', 'us-west', 'eu-west', 'ap-south'];
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,5,10,0.66)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      animation: 'np-fade 160ms ease-out'
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 'min(440px, 100%)', background: 'var(--bg-2)', border: '1px solid var(--line-2)',
        borderRadius: 'var(--r-xl)', boxShadow: 'var(--shadow-2), var(--glow-soft)', overflow: 'hidden',
        animation: 'np-pop 200ms var(--ease-out)'
      }}>
        <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--line-1)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 'var(--r-md)', background: 'var(--bg-3)', color: 'var(--neon-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 16px rgba(0,229,255,.3)' }}><Icon name="rocket" size={20} /></div>
          <div>
            <h3 style={{ font: 'var(--h4)', color: 'var(--fg-1)', margin: 0 }}>Deploy aurora-core</h3>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>Ship the latest build to a region</span>
          </div>
          <button className="np-icon-btn" onClick={onClose} style={{ marginLeft: 'auto' }}><Icon name="x" size={16} /></button>
        </div>
        <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div className="np-label" style={{ fontSize: 10, marginBottom: 8 }}>Branch</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-1)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-md)', padding: '10px 12px' }}>
              <span style={{ color: 'var(--fg-3)', display: 'flex' }}><Icon name="git-branch" size={15} /></span>
              <input value={branch} onChange={e => setBranch(e.target.value)} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--fg-1)', fontFamily: 'var(--font-mono)', fontSize: 13, width: '100%' }} />
            </div>
          </div>
          <div>
            <div className="np-label" style={{ fontSize: 10, marginBottom: 8 }}>Region</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {regions.map(r => (
                <button key={r} onClick={() => setRegion(r)} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 13, padding: '10px 12px', borderRadius: 'var(--r-md)', cursor: 'pointer',
                  textAlign: 'left', transition: 'all var(--dur)',
                  border: '1px solid ' + (region === r ? 'transparent' : 'var(--line-2)'),
                  background: region === r ? 'rgba(0,229,255,0.1)' : 'var(--bg-1)',
                  color: region === r ? 'var(--neon-cyan)' : 'var(--fg-2)',
                  boxShadow: region === r ? 'inset 0 0 0 1px var(--neon-cyan)' : 'none'
                }}>{r}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: '16px 22px', borderTop: '1px solid var(--line-1)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button className="np-btn-ghost" onClick={onClose}>Cancel</button>
          <button className="np-btn-primary" onClick={() => { onClose(); onDeploy(region); }}><Icon name="rocket" size={15} /> Deploy now</button>
        </div>
      </div>
    </div>
  );
}

function Toasts({ items, dismiss }) {
  const cfg = {
    success: { icon: 'check-circle-2', color: 'var(--success)' },
    info: { icon: 'info', color: 'var(--neon-cyan)' },
    error: { icon: 'alert-triangle', color: 'var(--danger)' },
  };
  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 200, display: 'flex', flexDirection: 'column', gap: 10, width: 320 }}>
      {items.map(t => {
        const c = cfg[t.type] || cfg.info;
        return (
          <div key={t.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12, padding: '13px 14px',
            background: 'var(--bg-3)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-md)',
            boxShadow: 'var(--shadow-2)', animation: 'np-slide-in 220ms var(--ease-out)'
          }}>
            <span style={{ color: c.color, display: 'flex', marginTop: 1, filter: `drop-shadow(0 0 6px ${c.color})` }}><Icon name={c.icon} size={18} /></span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--fg-1)', fontWeight: 500 }}>{t.title}</div>
              {t.body && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', marginTop: 2 }}>{t.body}</div>}
            </div>
            <button onClick={() => dismiss(t.id)} style={{ background: 'none', border: 'none', color: 'var(--fg-3)', cursor: 'pointer', display: 'flex', padding: 0 }}><Icon name="x" size={15} /></button>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { Modal, Toasts });
