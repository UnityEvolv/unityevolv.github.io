import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import './styles.css'

const container = document.getElementById('root')
if (!container) throw new Error('No #root element to mount into.')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
)
