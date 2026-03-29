<<<<<<< HEAD
# Patient_Dashboard
=======
# Tech.Care Dashboard — Vite + React

A healthcare patient dashboard that fetches **live data** from the Coalition Technologies API.

## 🔑 Setting Your API Key

Open **`src/api/config.js`** and replace the credentials:

```js
export const API_USERNAME = 'your_username'   // ← your username
export const API_PASSWORD = 'your_api_key'    // ← your API key
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 📁 Project Structure

```
src/
├── api/
│   ├── config.js           ← 🔑 Paste API credentials here
│   └── fetchPatients.js    ← Fetch + transform API data
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── BPChart.jsx
│   ├── VitalsRow.jsx
│   ├── DiagnosticList.jsx
│   └── RightPanel.jsx
├── App.jsx                 ← Root: loading / error / main states
└── index.css
```

## ✅ Features
- Live API data via HTTP Basic Auth
- Loading spinner while fetching
- Error state if credentials are wrong
- Click any patient to see their full diagnosis history
- Blood pressure SVG chart (last 6 months)
- Vitals: Respiratory, Temperature, Heart Rate
- Diagnostic list with status badges
- Lab results panel
>>>>>>> fc8a919 (Initial commit)
