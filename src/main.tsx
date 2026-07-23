import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/site-nav.css'
import './styles/hd-grid.css'
import './styles/home.css'
import './styles/info.css'
import './styles/case-study.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
