import { API_URL, API_USERNAME, API_PASSWORD } from './config'

/**
 * Fetch all patients from the Coalition Technologies API.
 * Uses HTTP Basic Auth via the provided username and password.
 */
export async function fetchPatients() {
  const credentials = btoa(`${API_USERNAME}:${API_PASSWORD}`)

  const response = await fetch(API_URL, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(
      `API error ${response.status}: ${response.statusText}. Check your credentials in src/api/config.js`
    )
  }

  return response.json()
}

export function transformPatient(raw, index) {
  // ── Blood pressure: last 6 months of history ──────────────────
  const history = (raw.diagnosis_history || []).slice(-6)

  const bpData = history.map((h) => ({
    month: `${h.month.slice(0, 3)}, ${h.year}`,
    systolic: h.blood_pressure?.systolic?.value ?? 0,
    diastolic: h.blood_pressure?.diastolic?.value ?? 0,
  }))

  const latestHistory = history[history.length - 1] ?? {}
  const latestBP = latestHistory.blood_pressure ?? {}
  const systolicVal = latestBP.systolic?.value ?? 0
  const diastolicVal = latestBP.diastolic?.value ?? 0
  const systolicLevel = latestBP.systolic?.levels ?? 'Normal'
  const diastolicLevel = latestBP.diastolic?.levels ?? 'Normal'

  // ── Vitals from latest history entry ──────────────────────────
  const vitals = {
    respiratory: {
      value: latestHistory.respiratory_rate?.value ?? '--',
      unit: 'bpm',
      status: latestHistory.respiratory_rate?.levels ?? 'Normal',
    },
    temperature: {
      value: latestHistory.temperature?.value ?? '--',
      unit: '°F',
      status: latestHistory.temperature?.levels ?? 'Normal',
    },
    heartRate: {
      value: latestHistory.heart_rate?.value ?? '--',
      unit: 'bpm',
      status: latestHistory.heart_rate?.levels ?? 'Normal',
    },
  }

  // ── Diagnostics ────────────────────────────────────────────────
  const diagnostics = (raw.diagnostic_list || []).map((d, i) => ({
    id: i + 1,
    problem: d.name,
    description: d.description,
    status: d.status,
  }))

  return {
    id: index + 1,
    name: raw.name,
    gender: raw.gender,
    age: raw.age,
    photo: raw.profile_picture,
    dob: raw.date_of_birth,
    contact: raw.phone_number,
    emergency: raw.emergency_contact,
    insurance: raw.insurance_type,
    bloodPressure:
      bpData.length > 0
        ? {
            systolic: systolicVal,
            diastolic: diastolicVal,
            systolicTrend: systolicLevel.toLowerCase().includes('higher') ? 'up' : 'down',
            diastolicTrend: diastolicLevel.toLowerCase().includes('lower') ? 'down' : 'up',
            systolicLevel,
            diastolicLevel,
            data: bpData,
          }
        : null,
    vitals,
    diagnostics,
    labResults: raw.lab_results || [],
  }
}
