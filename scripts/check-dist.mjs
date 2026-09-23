import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

/**
 * Refuses to publish a build that would break the site in ways a green test
 * run cannot see. Each check is here because getting it wrong is silent:
 * nothing errors, and the damage only shows up in production.
 */
const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, 'dist')
const failures = []

function check(description, condition) {
  if (!condition) failures.push(description)
}

const { sitemapPaths } = await import(pathToFileURL(join(root, 'dist-ssr', 'entry-server.js')).href)

// The custom domain. Without this file GitHub Pages serves the site at
// unityevolv.github.io and unityevolv.com stops resolving to it.
check('dist/CNAME is missing', existsSync(join(dist, 'CNAME')))
if (existsSync(join(dist, 'CNAME'))) {
  check(
    'dist/CNAME does not name unityevolv.com',
    readFileSync(join(dist, 'CNAME'), 'utf8').trim() === 'unityevolv.com',
  )
}

// Every route is its own file. A missing one is served as 404.html instead:
// the page still appears, with a 404 status, and no crawler keeps it.
for (const path of sitemapPaths) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  check(`${path} was not prerendered`, existsSync(file))
}

check('404.html is missing', existsSync(join(dist, '404.html')))
check('sitemap.xml is missing', existsSync(join(dist, 'sitemap.xml')))
check('robots.txt is missing', existsSync(join(dist, 'robots.txt')))

// Each page must carry its own title, not the template's. A broken rewrite in
// the prerender script leaves every page sharing one title, which no test
// catches because the components are fine.
const titles = new Map()
for (const path of sitemapPaths) {
  const file = path === '/' ? join(dist, 'index.html') : join(dist, path, 'index.html')
  if (!existsSync(file)) continue
  const html = readFileSync(file, 'utf8')
  const title = /<title>(.*?)<\/title>/.exec(html)?.[1] ?? ''
  const description = /<meta name="description" content="(.*?)"/.exec(html)?.[1] ?? ''

  check(`${path} has no title`, title.length > 0)
  check(`${path} has no meta description`, description.length > 20)
  check(`${path} rendered no content`, html.includes('<div id="root"><'))
  check(`${path} shares a title with ${titles.get(title)}`, !titles.has(title))
  titles.set(title, path)
}

// The server bundle must never be published: it is not part of the site, and
// building it into dist also copies public/ a second time.
check('the SSR bundle was published into dist', !existsSync(join(dist, 'server')))
check(
  'an entry-server bundle is in dist',
  !readdirSync(dist).some((name) => name.startsWith('entry-server')),
)

// These two paths on unityevolv.com are the unity-kit and ofis-kit
// repositories' own Pages sites. A directory of ours at either path would be
// published over a live product demo.
check('dist/unity-kit would shadow the unitykit Storybook', !existsSync(join(dist, 'unity-kit')))
check('dist/ofis-kit would shadow the ofiskit demo', !existsSync(join(dist, 'ofis-kit')))

if (failures.length > 0) {
  console.error('This build is not publishable:')
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exit(1)
}

console.log(`dist is publishable: ${sitemapPaths.length} pages, 404, sitemap, robots, CNAME.`)
