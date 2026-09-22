import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { App } from './App'
import { Layout } from './layout/Layout'
import { Placeholder } from './pages/Placeholder'
import './styles.css'

const container = document.getElementById('root')
if (!container) throw new Error('No #root element to mount into.')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="products" element={<Placeholder title="Products" story="KAN-11" />} />
          <Route path="services" element={<Placeholder title="Services" story="KAN-16" />} />
          <Route path="about" element={<Placeholder title="About" story="KAN-17" />} />
          <Route path="contact" element={<Placeholder title="Contact" story="KAN-18" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
