import React from 'react'

export default function Sidebar({ patients, activeId, onSelect }) {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.header}>
        <h2 style={styles.title}>Patients</h2>
        <button style={styles.searchBtn} title="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </div>

      <div style={styles.list}>
        {patients.map((patient) => {
          const isActive = patient.id === activeId
          return (
            <div
              key={patient.id}
              style={{
                ...styles.item,
                ...(isActive ? styles.itemActive : {}),
              }}
              onClick={() => onSelect(patient.id)}
            >
              <img src={patient.photo} alt={patient.name} style={styles.avatar} />
              <div style={styles.info}>
                <div style={styles.name}>{patient.name}</div>
                <div style={styles.meta}>
                  {patient.gender}, {patient.age}
                </div>
              </div>
              <button
                style={styles.menuBtn}
                onClick={(e) => e.stopPropagation()}
                title="Options"
              >
                ⋯
              </button>
            </div>
          )
        })}
      </div>
    </aside>
  )
}

const styles = {
  sidebar: {
    background: '#fff',
    borderRight: '1px solid #E4E7EE',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 20px 16px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 800,
    color: '#1A1A2E',
  },
  searchBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#667085',
    padding: '4px',
  },
  list: {
    overflowY: 'auto',
    flex: 1,
    padding: '0 8px 12px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 12px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'background .15s',
    marginBottom: '2px',
  },
  itemActive: {
    background: '#E8F2FF',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0,
  },
  info: { flex: 1 },
  name: {
    fontSize: '13.5px',
    fontWeight: 700,
    color: '#1A1A2E',
  },
  meta: {
    fontSize: '11.5px',
    color: '#667085',
    marginTop: '2px',
  },
  menuBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#667085',
    padding: '4px',
    borderRadius: '6px',
    fontSize: '16px',
  },
}
