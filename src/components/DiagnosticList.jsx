import React from 'react'

const statusMap = {
  'Under Observation': { bg: '#FFF7E0', color: '#B7791F' },
  Cured: { bg: '#E6F7F0', color: '#276749' },
  Inactive: { bg: '#F3F4F6', color: '#6B7280' },
}

export default function DiagnosticList({ diagnostics }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Diagnostic List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Problem / Diagnosis</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {diagnostics.map((d, i) => {
            const badge = statusMap[d.status] || statusMap.Inactive
            const isLast = i === diagnostics.length - 1
            return (
              <tr key={d.id}>
                <td style={{ ...styles.td, ...(isLast ? styles.tdLast : {}), fontWeight: 700 }}>
                  {d.problem}
                </td>
                <td style={{ ...styles.td, ...(isLast ? styles.tdLast : {}), color: '#667085' }}>
                  {d.description}
                </td>
                <td style={{ ...styles.td, ...(isLast ? styles.tdLast : {}) }}>
                  <span style={{ ...styles.badge, background: badge.bg, color: badge.color }}>
                    {d.status}
                  </span>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
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
  title: { fontSize: '16px', fontWeight: 800, marginBottom: '16px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left',
    fontSize: '12.5px',
    fontWeight: 700,
    color: '#667085',
    padding: '8px 12px',
    borderBottom: '1.5px solid #E4E7EE',
  },
  td: {
    padding: '14px 12px',
    fontSize: '13px',
    borderBottom: '1px solid #E4E7EE',
    verticalAlign: 'top',
  },
  tdLast: { borderBottom: 'none' },
  badge: {
    display: 'inline-block',
    fontSize: '11.5px',
    fontWeight: 700,
    padding: '4px 12px',
    borderRadius: '50px',
  },
}
