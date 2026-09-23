import { Navigate, Route, Routes } from 'react-router-dom'
import { LegacyRedirects } from './LegacyRedirects'
import { PageMeta } from './PageMeta'
import { legacyPathRoutes } from './legacy'
import { Layout } from './layout/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { ProductsPage } from './pages/ProductsPage'
import { ServicesPage } from './pages/ServicesPage'

/**
 * Every route, in one place so a test can mount the whole site.
 *
 * `/products/:slug` covers all four product pages: they differ in what they
 * say, not in how a product page is shaped, and the copy lives in
 * `src/content/products.ts`.
 *
 * The old paths are declared *before* it, because `/products/vsamstha` also
 * matches `/products/:slug`, and a product page with an unknown slug sends
 * the visitor to the not-found page. `LegacyRedirects` handles the old
 * anchors, which no route can see.
 */
export function AppRoutes() {
  return (
    <>
      <LegacyRedirects />
      <PageMeta />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />

          {Object.entries(legacyPathRoutes).map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}

          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:slug" element={<ProductPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  )
}
