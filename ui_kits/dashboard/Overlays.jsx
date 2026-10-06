/* Dashboard — Deploy modal + toast system (.np-scrim/.np-modal, .np-toast-region/.np-toast) */

// Keep Tab / Shift+Tab inside an open dialog.
function trapFocus(e, root) {
  if (e.key !== 'Tab' || !root) return;
  const f = Array.from(root.querySelectorAll('button, input, a[href], [tabindex]:not([tabindex="-1"])')).filter(el => !el.disabled);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

function Modal({ open, onClose, onDeploy }) {
  const [region, setRegion] = React.useState('us-east');
  const [branch, setBranch] = React.useState('main');
  const [invalid, setInvalid] = React.useState(false);
  const dialogRef = React.useRef(null);
  const firstRef = React.useRef(null);
  const closeRef = React.useRef(onClose);
  closeRef.current = onClose;

  // focus in on open, Esc closes, focus returns to the trigger on close
  React.useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    if (firstRef.current) firstRef.current.focus();
    const onKey = e => { if (e.key === 'Escape') { e.preventDefault(); closeRef.current(); } };
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus(); };
  }, [open]);

  if (!open) return null;
  const regions = ['us-east', 'us-west', 'eu-west', 'ap-south'];
  const submit = e => {
    e.preventDefault();
    if (!branch.trim()) { setInvalid(true); firstRef.current.focus(); return; }
    onClose();
    onDeploy(region, branch.trim());
  };
  return (
    <div className="np-scrim" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={dialogRef} className="np-modal" role="dialog" aria-modal="true" aria-labelledby="deploy-title" aria-describedby="deploy-sub"
        onKeyDown={e => trapFocus(e, dialogRef.current)}>
        <div className="np-modal__header">
          <div className="np-modal__icon"><Icon name="rocket" size={20} /></div>
          <div>
            <h2 id="deploy-title" className="np-modal__title">Deploy aurora-core</h2>
            <span id="deploy-sub" className="np-modal__subtitle">Ship the latest build to a region</span>
          </div>
          <button type="button" className="np-icon-btn np-icon-btn--sm np-icon-btn--ghost" aria-label="Close dialog" onClick={onClose} style={{ marginLeft: 'auto' }}><Icon name="x" size={16} /></button>
        </div>
        <form onSubmit={submit} noValidate>
          <div className="np-modal__body">
            <label className={'np-field' + (invalid ? ' is-invalid' : '')}>
              <span className="np-field__label">Branch</span>
              <span className="np-inputgroup" style={invalid ? { borderColor: 'var(--color-danger)' } : undefined}>
                <Icon name="git-branch" size={16} />
                <input ref={firstRef} value={branch} spellCheck={false} autoComplete="off"
                  aria-invalid={invalid} aria-describedby={invalid ? 'branch-hint' : undefined}
                  onChange={e => { setBranch(e.target.value); if (invalid) setInvalid(false); }}
                  style={{ fontFamily: 'var(--font-mono)' }} />
              </span>
              {invalid && <span id="branch-hint" className="np-field__hint">Branch is required.</span>}
            </label>
            <fieldset style={{ border: 0, margin: 0, padding: 0, minWidth: 0 }}>
              <legend className="np-field__label" style={{ padding: 0, marginBottom: 7 }}>Region</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {regions.map(r => {
                  const on = region === r;
                  return (
                    <label key={r} className={'np-card np-card--row db-region' + (on ? ' np-card--selected' : '')} style={{ padding: '10px 12px', gap: 8 }}>
                      <input type="radio" name="region" value={r} checked={on} onChange={() => setRegion(r)} className="np-sr-only" />
                      <span style={{ display: 'flex', color: on ? 'var(--color-accent)' : 'var(--color-text-muted)' }}><Icon name={on ? 'circle-check' : 'globe'} size={16} /></span>
                      <span style={{ font: '400 13px/1.2 var(--font-mono)', color: on ? 'var(--color-text-accent)' : 'var(--color-text-secondary)' }}>{r}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </div>
          <div className="np-modal__footer">
            <button type="button" className="np-btn np-btn--ghost" onClick={onClose}><span>Cancel</span></button>
            <button type="submit" className="np-btn np-btn--primary"><Icon name="rocket" size={16} /><span>Deploy now</span></button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Toasts({ items, dismiss }) {
  const cfg = {
    success: ['circle-check', ' np-toast--success'],
    info: ['info', ''],
    warning: ['triangle-alert', ' np-toast--warning'],
    error: ['circle-alert', ' np-toast--danger'],
  };
  return (
    <div className="np-toast-region" aria-live="polite">
      {items.map(t => {
        const [icon, mod] = cfg[t.type] || cfg.info;
        return (
          <div key={t.id} className={'np-toast' + mod} role="status">
            <span className="np-toast__icon"><Icon name={icon} size={18} /></span>
            <div className="np-toast__content">
              <div className="np-toast__title">{t.title}</div>
              {t.body && <div className="np-toast__body">{t.body}</div>}
            </div>
            <button type="button" className="np-icon-btn np-icon-btn--sm np-icon-btn--ghost" aria-label="Dismiss notification" onClick={() => dismiss(t.id)} style={{ margin: '-5px -6px -5px 0' }}><Icon name="x" size={15} /></button>
          </div>
        );
      })}
    </div>
  );
}

Object.assign(window, { Modal, Toasts, trapFocus });
