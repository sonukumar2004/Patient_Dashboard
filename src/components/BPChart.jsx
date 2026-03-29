import React from 'react'

// Map a blood pressure value (60–180) to SVG Y coordinate (0–145)
function bpToY(val) {
  return 145 - ((val - 60) / 120) * 125
}

export default function BPChart({ data, systolic, diastolic, systolicTrend, diastolicTrend, systolicLevel, diastolicLevel }) {
  const totalWidth = 480
  const count = data.length
  const xStep = (totalWidth - 60) / (count - 1)
  const startX = 36

  const sysPoints = data.map((d, i) => ({ x: startX + i * xStep, y: bpToY(d.systolic) }))
  const diaPoints = data.map((d, i) => ({ x: startX + i * xStep, y: bpToY(d.diastolic) }))

  const curvePath = (pts) =>
    pts.reduce((acc, pt, i) => {
      if (i === 0) return `M ${pt.x},${pt.y}`
      const prev = pts[i - 1]
      const cx = (prev.x + pt.x) / 2
      return acc + ` C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`
    }, '')

  const sysPath = curvePath(sysPoints)
  const diaPath = curvePath(diaPoints)

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Blood Pressure</h3>
        <button style={styles.filterBtn}>
          Last 6 months
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      <div style={styles.chartArea}>
        {/* SVG Chart */}
        <div style={{ flex: 1, height: '170px' }}>
          <svg viewBox="0 0 480 160" preserveAspectRatio="none" width="100%" height="160" overflow="visible">
            <defs>
              <linearGradient id="gradPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E85B8A" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#E85B8A" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Y-axis grid + labels */}
            {[180, 160, 140, 120, 100, 80, 60].map((v) => {
              const y = bpToY(v)
              return (
                <g key={v}>
                  <line x1="30" y1={y} x2="480" y2={y} stroke="#E4E7EE" strokeWidth="1" />
                  <text x="0" y={y + 3} fontSize="9" fill="#9ca3af" fontFamily="Manrope">{v}</text>
                </g>
              )
            })}

            {/* Systolic line */}
            <path d={sysPath} fill="none" stroke="#E85B8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {sysPoints.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x} cy={pt.y} r="5"
                fill={i === sysPoints.length - 1 ? '#E85B8A' : '#fff'}
                stroke="#E85B8A"
                strokeWidth="2.5"
              />
            ))}

            {/* Diastolic line */}
            <path d={diaPath} fill="none" stroke="#7B61FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {diaPoints.map((pt, i) => (
              <circle
                key={i}
                cx={pt.x} cy={pt.y} r="5"
                fill={i === diaPoints.length - 1 ? '#7B61FF' : '#fff'}
                stroke="#7B61FF"
                strokeWidth="2.5"
              />
            ))}

            {/* X-axis labels */}
            {data.map((d, i) => (
              <text
                key={i}
                x={sysPoints[i].x}
                y={155}
                fontSize="9"
                fill="#9ca3af"
                fontFamily="Manrope"
                textAnchor="middle"
              >
                {d.month}
              </text>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div style={styles.legend}>
          {/* Systolic */}
          <div style={styles.legendItem}>
            <div style={styles.legendLabel}>
              <span style={{ ...styles.dot, background: '#E85B8A' }} /> Systolic
            </div>
            <div style={styles.legendValue}>{systolic}</div>
            <div style={{ ...styles.trend, color: '#e85b8a' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              {systolicLevel || 'Higher than Average'}
            </div>
          </div>

          <div style={styles.legendDivider} />

          {/* Diastolic */}
          <div style={styles.legendItem}>
            <div style={styles.legendLabel}>
              <span style={{ ...styles.dot, background: '#7B61FF' }} /> Diastolic
            </div>
            <div style={styles.legendValue}>{diastolic}</div>
            <div style={{ ...styles.trend, color: '#3A9D8F' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {diastolicLevel || 'Lower than Average'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '22px 24px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  title: { fontSize: '16px', fontWeight: 700 },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12.5px',
    color: '#667085',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Manrope',
    fontWeight: 600,
  },
  chartArea: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  legend: {
    minWidth: '140px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  legendItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  legendLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 600,
    color: '#667085',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  legendValue: { fontSize: '30px', fontWeight: 800, marginLeft: '16px' },
  trend: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11.5px',
    fontWeight: 600,
    marginLeft: '16px',
  },
  legendDivider: { height: '1px', background: '#E4E7EE' },
}
