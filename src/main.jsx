import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './debug-auth.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
