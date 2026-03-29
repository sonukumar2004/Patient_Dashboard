import React, { useState } from 'react'

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const infoFields = [
  {
    key: 'dob',
    label: 'Date Of Birth',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3A9D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    key: 'gender',
    label: 'Gender',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3A9D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <circle cx="12" cy="8" r="4" /><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
  },
  {
    key: 'contact',
    label: 'Contact Info',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3A9D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15v1.92z" />
      </svg>
    ),
  },
  {
    key: 'emergency',
    label: 'Emergency Contacts',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3A9D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 15v1.92z" />
      </svg>
    ),
  },
  {
    key: 'insurance',
    label: 'Insurance Provider',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="#3A9D8F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
  },
]

export default function RightPanel({ patient }) {
  const [activelab, setActiveLab] = useState('CT Scans')

  if (!patient) {
    return (
      <aside style={styles.panel}>
        <p style={{ color: '#667085', padding: '24px', textAlign: 'center' }}>
          Select a patient to view details
        </p>
      </aside>
    )
  }

  return (
    <aside style={styles.panel}>
      {/* Photo */}
      <div style={styles.photoWrap}>
        <img src={patient.photo} alt={patient.name} style={styles.photo} />
      </div>

      {/* Name */}
      <div style={styles.name}>{patient.name}</div>

      {/* Info list */}
      <div style={styles.infoList}>
        {infoFields.map((field) => {
          const value =
            field.key === 'gender'
              ? patient.gender
              : patient[field.key]
          if (!value) return null
          return (
            <div key={field.key} style={styles.infoItem}>
              <div style={styles.infoIcon}>{field.icon}</div>
              <div>
                <div style={styles.infoLabel}>{field.label}</div>
                <div style={styles.infoValue}>{value}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <button style={styles.ctaBtn}>Show All Information</button>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Lab Results */}
      <div>
        <h3 style={styles.labTitle}>Lab Results</h3>
        <div style={styles.labList}>
          {(patient.labResults || []).map((lab) => {
            const isActive = lab === activelab
            return (
              <div
                key={lab}
                style={{
                  ...styles.labItem,
                  ...(isActive ? styles.labItemActive : {}),
                }}
                onClick={() => setActiveLab(lab)}
              >
                <span style={{ ...styles.labLabel, ...(isActive ? styles.labLabelActive : {}) }}>
                  {lab}
                </span>
                <button
                  style={styles.downloadBtn}
                  onClick={(e) => e.stopPropagation()}
                  title={`Download ${lab}`}
                >
                  <DownloadIcon />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </aside>
  )
}

const styles = {
  panel: {
    background: '#fff',
    borderLeft: '1px solid #E4E7EE',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
    padding: '24px 20px 32px',
    gap: '20px',
    height: '100%',
  },
  photoWrap: { display: 'flex', justifyContent: 'center', paddingTop: '4px' },
  photo: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #E4E7EE',
    boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
  },
  name: { textAlign: 'center', fontSize: '20px', fontWeight: 800 },
  infoList: { display: 'flex', flexDirection: 'column', gap: '14px' },
  infoItem: { display: 'flex', alignItems: 'flex-start', gap: '12px' },
  infoIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#F6F7FB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoLabel: { fontSize: '11.5px', color: '#667085', fontWeight: 600 },
  infoValue: { fontSize: '13.5px', fontWeight: 700, marginTop: '2px' },
  ctaBtn: {
    display: 'block',
    width: '100%',
    padding: '12px',
    borderRadius: '50px',
    background: '#3A9D8F',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'Manrope',
    fontSize: '14px',
    fontWeight: 700,
    transition: '.2s',
  },
  divider: { height: '1px', background: '#E4E7EE' },
  labTitle: { fontSize: '16px', fontWeight: 800, marginBottom: '12px' },
  labList: { display: 'flex', flexDirection: 'column', gap: '2px' },
  labItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background .15s',
  },
  labItemActive: { background: '#E8F6F4' },
  labLabel: { fontSize: '13.5px', fontWeight: 600, color: '#1A1A2E' },
  labLabelActive: { color: '#3A9D8F' },
  downloadBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#667085',
    padding: '4px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
  },
}
