import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { gzipSync } from 'node:zlib'

/**
 * Serves `dist` the way GitHub Pages does, which `vite preview` does not.
 *
 * `vite preview` is a single-page-app server: it answers every unknown path
 * with the root `index.html`. That makes it useless for checking a
 * prerendered site — every route appears to work while actually serving the
 * home page, so the title is wrong, the navigation highlights the wrong link,
 * and hydration mismatches that only exist because of the fallback show up in
 * the console. I chased exactly that ghost once.
 *
 * Pages instead looks for `<path>/index.html`, and serves `404.html` with a
 * real 404 status when there is nothing. Use this for any check that is about
 * what visitors will actually receive.
 */
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'dist')
const port = Number(process.argv[2] ?? 4190)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
}

createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://localhost:${port}`)
  const pathname = decodeURIComponent(url.pathname)

  // Normalise away any `..` before touching the filesystem.
  const relative = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  const candidates = [join(dist, relative), join(dist, relative, 'index.html')]

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) {
      const type = types[extname(candidate)] ?? 'application/octet-stream'
      const body = readFileSync(candidate)

      // Pages gzips text and caches hashed assets for a year. Both are
      // measured by Lighthouse, so a server without them reports a
      // performance score the real site would never get — text compression
      // alone is worth hundreds of kilobytes here.
      const compressible = /text|javascript|json|xml|svg/.test(type)
      const acceptsGzip = (request.headers['accept-encoding'] ?? '').includes('gzip')
      const headers = { 'content-type': type }
      if (relative.startsWith('assets')) headers['cache-control'] = 'public, max-age=31536000'

      if (compressible && acceptsGzip) {
        const gz = gzipSync(body)
        response.writeHead(200, { ...headers, 'content-encoding': 'gzip' })
        response.end(gz)
      } else {
        response.writeHead(200, headers)
        response.end(body)
      }
      return
    }
  }

  const notFound = join(dist, '404.html')
  response.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
  response.end(existsSync(notFound) ? readFileSync(notFound) : 'Not found')
}).listen(port, () => {
  console.log(`serving dist like GitHub Pages on http://localhost:${port}`)
})
