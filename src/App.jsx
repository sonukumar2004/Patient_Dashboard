import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import BPChart from './components/BPChart'
import VitalsRow from './components/VitalsRow'
import DiagnosticList from './components/DiagnosticList'
import RightPanel from './components/RightPanel'
import { fetchPatients, transformPatient } from './api/fetchPatients'

export default function App() {
  const [patients, setPatients]               = useState([])
  const [activePatientId, setActivePatientId] = useState(null)
  const [loading, setLoading]                 = useState(true)
  const [error, setError]                     = useState(null)

  useEffect(() => {
    fetchPatients()
      .then((data) => {
        const transformed = data.map(transformPatient)
        setPatients(transformed)
        const jessica = transformed.find((p) => p.name === 'Jessica Taylor')
        setActivePatientId(jessica ? jessica.id : transformed[0]?.id ?? null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const activePatient = patients.find((p) => p.id === activePatientId)
  const bp = activePatient?.bloodPressure

  if (loading) {
    return (
      <div style={styles.centerScreen}>
        <div style={styles.spinnerWrap}>
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#E4E7EE" strokeWidth="4"/>
            <circle cx="24" cy="24" r="20" fill="none" stroke="#3A9D8F" strokeWidth="4"
              strokeDasharray="60 80" strokeLinecap="round">
              <animateTransform attributeName="transform" type="rotate"
                from="0 24 24" to="360 24 24" dur="0.9s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
        <p style={{ color: '#667085', marginTop: '14px', fontWeight: 600, fontFamily: 'Manrope, sans-serif' }}>
          Loading patient data…
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={styles.centerScreen}>
        <div style={styles.errorBox}>
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚠️</div>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#1A1A2E', marginBottom: '8px' }}>
            Failed to load data
          </h2>
          <p style={{ fontSize: '13px', color: '#667085', marginBottom: '12px', textAlign: 'center' }}>
            {error}
          </p>
          <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
            Update credentials in <code style={{ background: '#F6F7FB', padding: '2px 6px', borderRadius: '4px', color: '#3A9D8F', fontFamily: 'monospace' }}>src/api/config.js</code>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <div style={styles.layout}>
        <Sidebar patients={patients} activeId={activePatientId} onSelect={setActivePatientId} />
        <main style={styles.main}>
          <h1 style={styles.pageTitle}>Diagnosis History</h1>
          {bp ? (
            <>
              <BPChart
                data={bp.data}
                systolic={bp.systolic}
                diastolic={bp.diastolic}
                systolicTrend={bp.systolicTrend}
                diastolicTrend={bp.diastolicTrend}
                systolicLevel={bp.systolicLevel}
                diastolicLevel={bp.diastolicLevel}
              />
              <VitalsRow vitals={activePatient.vitals} />
              <DiagnosticList diagnostics={activePatient.diagnostics} />
            </>
          ) : (
            <div style={styles.empty}>
              <p>No diagnosis history available for this patient.</p>
            </div>
          )}
        </main>
        <RightPanel patient={activePatient} />
      </div>
    </div>
  )
}

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '280px 1fr 300px',
    flex: 1,
    overflow: 'hidden',
  },
  main: {
    overflowY: 'auto',
    padding: '24px 24px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: '#F6F7FB',
  },
  pageTitle: { fontSize: '22px', fontWeight: 800, color: '#1A1A2E' },
  empty: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    height: '300px', color: '#667085', fontSize: '15px',
    background: '#fff', borderRadius: '16px',
  },
  centerScreen: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', height: '100vh', background: '#F6F7FB',
    fontFamily: 'Manrope, sans-serif',
  },
  spinnerWrap: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  errorBox: {
    background: '#fff', borderRadius: '16px', padding: '32px',
    maxWidth: '400px', width: '90%',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  },
}
