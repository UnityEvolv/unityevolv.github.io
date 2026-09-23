import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
/**
 * From `react-router-dom`, the same package the components use, and not from
 * `react-router` — which also exports `StaticRouter`, and is what the v6
 * `react-router-dom/server` entry point became.
 *
 * Taking it from the other package gives the SSR bundle two copies of the
 * router and therefore two contexts: the components read an empty one, decide
 * the location is `/`, and every prerendered page marks **Home** as the
 * current page. Nothing errors, and the only visible symptom is a hydration
 * mismatch in the browser console.
 */
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { metaFor, type PageMeta } from './seo'

/**
 * Renders one route to HTML at build time.
 *
 * GitHub Pages serves files, so the alternative — one `index.html` that boots
 * an empty page and fills itself in — gives every URL the same title and
 * description, and gives a crawler or a link preview nothing to read. This
 * runs the same components against the same content and writes the result out
 * per path.
 */
/**
 * Re-exported so the prerender script has one module to import: the SSR build
 * bundles everything into this entry point, and reaching for a second file
 * inside the bundle would depend on how it happens to be chunked.
 */
export { sitemapPaths, SITE_URL, canonicalUrl } from './seo'
export { structuredDataFor } from './structuredData'

export function render(url: string): { html: string; meta: PageMeta } {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )

  return { html, meta: metaFor(url) }
}
