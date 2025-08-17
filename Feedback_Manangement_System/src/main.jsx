import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DashboardLayout from './components/Dashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DashboardLayout />
  </StrictMode>,
)
