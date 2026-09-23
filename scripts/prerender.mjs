import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

/**
 * Writes one HTML file per route, plus the sitemap and robots.txt.
 *
 * Run after both Vite builds: the client build produces `dist/index.html` with
 * the hashed asset tags, and the SSR build produces the render function. This
 * puts the two together.
 *
 * `dist/404.html` is the not-found page. GitHub Pages serves it for any path
 * it does not have, with a real 404 status, which is why an unknown URL is a
 * 404 rather than a 200 that merely looks like one.
 */
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'dist')

/**
 * The SSR bundle lives outside `dist` on purpose. Building it into `dist`
 * publishes the server bundle — and a second copy of everything in `public`,
 * including CNAME — to the live site.
 */
const { render, sitemapPaths, SITE_URL, structuredDataFor, canonicalUrl } = await import(
  pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href
)

const template = readFileSync(join(dist, 'index.html'), 'utf8')

/**
 * Everything between the markers is replaced per page.
 *
 * `indexable` is false for the not-found page. A 404 gets no canonical — it is
 * not a page anyone should be sent to, and a self-canonical there only teaches
 * Search Console to report it — and it carries `noindex` so the same page
 * served for every unknown URL cannot accumulate as thin content.
 */
function withMeta(html, meta, appHtml, { indexable = true, jsonLd = null } = {}) {
  const head = [
    ...(indexable
      ? [`<link rel="canonical" href="${meta.url}" />`]
      : [`<meta name="robots" content="noindex" />`]),
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="UnityEvolv" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:image" content="${meta.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    // The JSON-LD goes in as-is. Escaping `<` would corrupt it, so the graph
    // is built from our own content and carries no markup; `</script>` is the
    // only sequence that could break out, and nothing here can produce one.
    ...(jsonLd ? [`<script type="application/ld+json">${jsonLd}</script>`] : []),
  ]

  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(meta.title)}</title>`)
    .replace(
      /<meta name="description" content=".*?"\s*\/?>/,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    )
    .replace('<!--head-->', head.join('\n    '))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function writePage(path, html) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, html, 'utf8')
  return file
}

const paths = sitemapPaths
for (const path of paths) {
  const { html: appHtml, meta } = render(path)
  const jsonLd = structuredDataFor(path)
  writePage(path, withMeta(template, meta, appHtml, { jsonLd }))
  console.log(`prerendered ${path}${jsonLd ? ' (+ structured data)' : ''}`)
}

// The not-found page, served by GitHub Pages for anything it does not have.
// It is the one page that is deliberately not indexable: the same file answers
// every unknown URL, so indexing it would be indexing nothing, many times.
{
  const { html: appHtml, meta } = render('/404')
  writeFileSync(
    join(dist, '404.html'),
    withMeta(template, meta, appHtml, { indexable: false }),
    'utf8',
  )
  console.log('prerendered /404 as 404.html (noindex)')
}

const today = new Date().toISOString().slice(0, 10)
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...paths.map((path) =>
    [
      '  <url>',
      // The same trailing-slash URL as the canonical, because a sitemap full
      // of URLs that 301 is a sitemap full of detours.
      `    <loc>${canonicalUrl(path)}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      '  </url>',
    ].join('\n'),
  ),
  '</urlset>',
  '',
].join('\n')
writeFileSync(join(dist, 'sitemap.xml'), sitemap, 'utf8')

writeFileSync(
  join(dist, 'robots.txt'),
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap.xml`, ''].join('\n'),
  'utf8',
)

console.log(`wrote sitemap.xml with ${paths.length} URLs, and robots.txt`)
