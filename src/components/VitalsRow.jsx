import React from 'react'

const LungIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
    <ellipse cx="9" cy="18" rx="5" ry="7" stroke="#5B8DEF" strokeWidth="2" fill="rgba(91,141,239,0.15)" />
    <ellipse cx="23" cy="18" rx="5" ry="7" stroke="#5B8DEF" strokeWidth="2" fill="rgba(91,141,239,0.15)" />
    <path d="M14 18 Q16 12 18 18" stroke="#5B8DEF" strokeWidth="2" strokeLinecap="round" fill="none" />
  </svg>
)

const ThermoIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
    <rect x="13" y="4" width="6" height="16" rx="3" stroke="#E85B8A" strokeWidth="2" fill="rgba(232,91,138,0.15)" />
    <circle cx="16" cy="22" r="4" fill="rgba(232,91,138,0.3)" stroke="#E85B8A" strokeWidth="2" />
    <line x1="16" y1="20" x2="16" y2="8" stroke="#E85B8A" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const HeartIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" width="28" height="28">
    <path
      d="M16 26 C16 26 4 18 4 11 C4 7.5 6.7 5 10 5 C12.4 5 14.5 6.4 16 8.2 C17.5 6.4 19.6 5 22 5 C25.3 5 28 7.5 28 11 C28 18 16 26 16 26Z"
      fill="rgba(229,57,53,0.15)"
      stroke="#E55739"
      strokeWidth="2"
    />
    <polyline points="7 13 10 10 13 16 17 8 20 13 23 11 26 13" stroke="#E55739" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const statusColors = {
  Normal: { bg: 'rgba(58,157,143,0.12)', color: '#3A9D8F' },
  'Lower than Average': { bg: 'rgba(255,165,0,0.12)', color: '#e67e22' },
  'Higher than Average': { bg: 'rgba(232,91,138,0.12)', color: '#e85b8a' },
}

const vitalsConfig = [
  {
    key: 'respiratory',
    label: 'Respiratory Rate',
    Icon: LungIcon,
    bg: '#EEF3FF',
  },
  {
    key: 'temperature',
    label: 'Temperature',
    Icon: ThermoIcon,
    bg: '#FFF0F3',
  },
  {
    key: 'heartRate',
    label: 'Heart Rate',
    Icon: HeartIcon,
    bg: '#FFF5F5',
  },
]

export default function VitalsRow({ vitals }) {
  return (
    <div style={styles.row}>
      {vitalsConfig.map(({ key, label, Icon, bg }) => {
        const v = vitals[key]
        const badge = statusColors[v.status] || statusColors.Normal
        return (
          <div key={key} style={{ ...styles.card, background: bg }}>
            <div style={styles.iconWrap}>
              <Icon />
            </div>
            <div style={styles.label}>{label}</div>
            <div>
              <span style={styles.value}>{v.value} </span>
              <span style={styles.unit}>{v.unit}</span>
            </div>
            <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
              {v.status}
            </span>
          </div>
        )
      })}
    </div>
  )
}

const styles = {
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  },
  card: {
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  iconWrap: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.7)',
  },
  label: { fontSize: '12.5px', color: '#667085', fontWeight: 600 },
  value: { fontSize: '26px', fontWeight: 800 },
  unit: { fontSize: '12px', color: '#667085', fontWeight: 600 },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '11.5px',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: '50px',
    alignSelf: 'flex-start',
  },
}
