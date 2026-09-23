import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import './styles.css'

const container = document.getElementById('root')
if (!container) throw new Error('No #root element to mount into.')

const app = (
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
)

/**
 * Every page is prerendered, so the usual path is to hydrate what is already
 * there rather than throw it away and render again. `createRoot` is the
 * fallback for a page served without prerendered markup — the dev server, or
 * a file that somehow shipped empty — where hydration would warn and produce
 * nothing useful.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
