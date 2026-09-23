import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
// React Router 7 ships StaticRouter from `react-router` itself; the
// `react-router-dom/server` entry point that v6 had no longer exists.
import { StaticRouter } from 'react-router'
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
export { sitemapPaths, SITE_URL } from './seo'

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
