/* Dashboard — empty states for the non-Overview views (.np-empty) */
const EMPTY_VIEWS = {
  Telemetry: { icon: 'activity', title: 'No streams attached.', body: 'Attach a metrics source and it streams here in realtime.', cta: 'View live overview', ctaIcon: 'layout-dashboard', action: 'nav:Overview' },
  Nodes: { icon: 'server', title: 'No nodes pinned.', body: 'Pin a node from the fleet table to watch it up close.', cta: 'Open fleet table', ctaIcon: 'arrow-right', action: 'nav:Overview' },
  Deploys: { icon: 'rocket', title: 'No deploys in this window.', body: 'Ship a build and the history writes itself.', cta: 'Deploy now', ctaIcon: 'rocket', action: 'deploy' },
  Analytics: { icon: 'chart-column', title: 'Not enough signal yet.', body: 'Analytics needs 24 hours of traffic to draw a baseline.', cta: 'Open telemetry', ctaIcon: 'activity', action: 'nav:Telemetry' },
  Alerts: { icon: 'bell-off', title: 'No alerts. All quiet on the wire.', body: 'Rules are armed. Anything that trips lands here first.', cta: 'Back to overview', ctaIcon: 'arrow-left', action: 'nav:Overview' },
  'API keys': { icon: 'key-round', title: 'No keys issued.', body: 'Scoped keys appear here once generated. The endpoint is ready now.', cta: 'Copy API endpoint', ctaIcon: 'copy', action: 'copy' },
  Settings: { icon: 'sliders-horizontal', title: 'Defaults are live.', body: 'Workspace settings ship next release. Current config is locked in.', cta: 'Back to overview', ctaIcon: 'arrow-left', action: 'nav:Overview' },
};

function EmptyView({ view, onAction }) {
  const v = EMPTY_VIEWS[view] || EMPTY_VIEWS.Settings;
  return (
    <div className="db-page">
      <div className="np-empty">
        <span className="np-empty__icon" style={{ display: 'flex' }}><Icon name={v.icon} size={28} /></span>
        <div>
          <h2 className="np-card__title" style={{ margin: 0 }}>{v.title}</h2>
          <p style={{ font: 'var(--body-sm)', color: 'var(--color-text-secondary)', margin: '6px auto 0', maxWidth: 380 }}>{v.body}</p>
        </div>
        <button type="button" className="np-btn np-btn--ghost np-btn--sm" onClick={() => onAction(v.action)}>
          <Icon name={v.ctaIcon} size={14} /><span>{v.cta}</span>
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { EmptyView, EMPTY_VIEWS });
