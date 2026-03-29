import React from 'react'

const navLinks = [
  {
    label: 'Overview',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Patients',
    active: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    label: 'Schedule',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: 'Message',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    label: 'Transactions',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
]

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <a href="#" style={styles.logo}>
        <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
          <path d="M8 6C8 6 10 2 16 2C22 2 24 6 24 6" stroke="#3A9D8F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 2C16 2 12 8 12 16C12 24 16 30 16 30" stroke="#3A9D8F" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M16 2C16 2 20 8 20 16C20 24 16 30 16 30" stroke="#3A9D8F" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
          <circle cx="16" cy="16" r="3" fill="#3A9D8F" />
          <path d="M6 16C6 16 10 14 16 14C22 14 26 16 26 16" stroke="#3A9D8F" strokeWidth="2" strokeLinecap="round" />
        </svg>
        Tech.Care
      </a>

      {/* Nav Links */}
      <ul style={styles.navLinks}>
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href="#"
              style={{
                ...styles.navLink,
                ...(link.active ? styles.navLinkActive : {}),
              }}
            >
              {link.icon}
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Profile */}
      <div style={styles.profile}>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Dr. Jose Simmons"
          style={styles.profileImg}
        />
        <div style={styles.profileInfo}>
          <div style={styles.profileName}>Dr. Jose Simmons</div>
          <div style={styles.profileRole}>General Practitioner</div>
        </div>
        <div style={styles.divider} />
        <button style={styles.iconBtn} title="Settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </button>
        <button style={styles.iconBtn} title="More">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 28px',
    height: '64px',
    borderBottom: '1px solid #E4E7EE',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    gap: 0,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    fontWeight: 800,
    color: '#1A1A2E',
    textDecoration: 'none',
    minWidth: '160px',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flex: 1,
    justifyContent: 'center',
    listStyle: 'none',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '7px',
    padding: '8px 18px',
    borderRadius: '50px',
    fontSize: '13.5px',
    fontWeight: 600,
    color: '#667085',
    textDecoration: 'none',
    transition: 'all .2s',
  },
  navLinkActive: {
    background: '#3A9D8F',
    color: '#fff',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '220px',
    justifyContent: 'flex-end',
  },
  profileImg: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #E4E7EE',
  },
  profileInfo: { lineHeight: 1.3 },
  profileName: { fontSize: '13px', fontWeight: 700, color: '#1A1A2E' },
  profileRole: { fontSize: '11.5px', color: '#667085' },
  divider: { width: '1px', height: '32px', background: '#E4E7EE' },
  iconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#667085',
    padding: '6px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    transition: '.15s',
  },
}
