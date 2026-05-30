/* Dashboard — Overview: stat cards, charts, table */
function StatCard({ label, value, delta, up, spark, color }) {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', padding: 18 }}>
      <div className="np-label" style={{ fontSize: 10 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 12, gap: 10 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 30, color: 'var(--fg-1)', lineHeight: 1 }}>{value}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: up ? 'var(--success)' : 'var(--danger)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name={up ? 'trending-up' : 'trending-down'} size={14} /> {delta}
          </div>
        </div>
        <Sparkline data={spark} up={up} color={color} />
      </div>
    </div>
  );
}

function Overview({ range }) {
  const series = {
    Live: [42, 38, 46, 40, 52, 48, 60, 55, 68, 62, 74, 70, 82, 78, 90],
    '1H': [30, 44, 36, 50, 42, 58, 48, 64, 54, 70, 60, 76, 66, 82, 72],
    '24H': [60, 52, 68, 58, 72, 64, 56, 70, 62, 78, 68, 84, 74, 66, 80],
    '7D': [20, 35, 28, 45, 38, 55, 48, 62, 58, 70, 65, 78, 72, 85, 92],
  };
  const data = series[range] || series.Live;
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }} className="np-stat-grid">
        <StatCard label="Requests" value="6.8M" delta="+24.6%" up spark={[10, 14, 12, 18, 16, 22, 20, 28]} color="var(--neon-cyan)" />
        <StatCard label="p99 latency" value="42ms" delta="−8.1%" up spark={[28, 24, 26, 20, 22, 18, 16, 14]} color="var(--neon-blue)" />
        <StatCard label="Error rate" value="0.02%" delta="−0.4%" up spark={[8, 6, 9, 5, 6, 4, 5, 3]} color="var(--success)" />
        <StatCard label="Active nodes" value="18" delta="+3" up spark={[12, 12, 14, 13, 15, 16, 16, 18]} color="var(--neon-violet)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 16 }} className="np-chart-grid">
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div>
              <h3 style={{ font: 'var(--h4)', color: 'var(--fg-1)', margin: 0 }}>Throughput</h3>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>requests / sec · {range}</span>
            </div>
            <span className="np-chip-live"><span className="np-livedot" />LIVE</span>
          </div>
          <AreaChart data={data} id="thr" height={230} />
        </div>
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', padding: 20, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ font: 'var(--h4)', color: 'var(--fg-1)', margin: '0 0 4px' }}>CPU saturation</h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>fleet average</span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1, padding: '12px 0' }}>
            <Donut value={72} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
            <span>peak 91%</span><span style={{ color: 'var(--success)' }}>headroom 28%</span>
          </div>
        </div>
      </div>

      <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--line-1)' }}>
          <h3 style={{ font: 'var(--h4)', color: 'var(--fg-1)', margin: 0 }}>Nodes</h3>
          <button className="np-btn-ghost" style={{ padding: '7px 12px', fontSize: 13 }}><Icon name="sliders-horizontal" size={14} /> Filter</button>
        </div>
        <NodeTable />
      </div>
    </div>
  );
}

function NodeTable() {
  const rows = [
    ['aurora-core-1a', 'us-east', 'Online', 99.99, '38ms', '1.2M'],
    ['aurora-core-1b', 'us-east', 'Online', 99.98, '41ms', '1.1M'],
    ['aurora-edge-eu', 'eu-west', 'Online', 99.95, '52ms', '880K'],
    ['aurora-edge-ap', 'ap-south', 'Degraded', 98.20, '120ms', '420K'],
    ['aurora-batch-1', 'us-west', 'Online', 99.99, '44ms', '610K'],
    ['aurora-test-x', 'us-east', 'Offline', 0, '—', '0'],
  ];
  const statusColor = { Online: 'var(--success)', Degraded: 'var(--warning)', Offline: 'var(--danger)' };
  const fill = { Online: 'var(--success-fill)', Degraded: 'var(--warning-fill)', Offline: 'var(--danger-fill)' };
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>{['Node', 'Region', 'Status', 'Uptime', 'p99', 'Reqs'].map(h => (
          <th key={h} style={{ textAlign: h === 'Node' || h === 'Region' || h === 'Status' ? 'left' : 'right', fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', fontWeight: 500, padding: '12px 20px' }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} style={{ borderTop: '1px solid var(--line-1)' }} className="np-row">
            <td style={{ padding: '13px 20px', fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-1)' }}>{r[0]}</td>
            <td style={{ padding: '13px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>{r[1]}</td>
            <td style={{ padding: '13px 20px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: statusColor[r[2]], background: fill[r[2]], padding: '3px 9px', borderRadius: 'var(--r-full)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor[r[2]] }} />{r[2]}
              </span>
            </td>
            <td style={{ padding: '13px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>{r[3]}%</td>
            <td style={{ padding: '13px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>{r[4]}</td>
            <td style={{ padding: '13px 20px', textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-2)' }}>{r[5]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Object.assign(window, { Overview, StatCard, NodeTable });
