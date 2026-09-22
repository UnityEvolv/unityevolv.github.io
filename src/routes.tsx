import { Route, Routes } from 'react-router-dom'
import { App } from './App'
import { Layout } from './layout/Layout'
import { NotFoundPage } from './pages/NotFoundPage'
import { Placeholder } from './pages/Placeholder'
import { ProductPage } from './pages/ProductPage'
import { ProductsPage } from './pages/ProductsPage'

/**
 * Every route, in one place so a test can mount the whole site.
 *
 * `/products/:slug` covers all four product pages: they differ in what they
 * say, not in how a product page is shaped, and the copy lives in
 * `src/content/products.ts`.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductPage />} />
        <Route path="services" element={<Placeholder title="Services" story="KAN-16" />} />
        <Route path="about" element={<Placeholder title="About" story="KAN-17" />} />
        <Route path="contact" element={<Placeholder title="Contact" story="KAN-18" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
