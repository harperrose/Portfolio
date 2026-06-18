import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/hd-grid.css'
import './styles/home.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
