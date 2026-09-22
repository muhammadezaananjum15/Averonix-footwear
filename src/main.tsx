import { createRoot } from 'react-dom/client'
import './styles.css'
import './enhancements.css'
import App from './App'

// ─────────────────────────────────────────────────────────────────────────────
// Entry point — mounts the React application
// ─────────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')!).render(<App />)
