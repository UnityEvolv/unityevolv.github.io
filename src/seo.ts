import { productBuildingService as service } from './content/services'
import { visibleProducts } from './content/products'

export interface PageMeta {
  /** The full `<title>`, including the site name. */
  title: string
  description: string
  /** Absolute URL, used as the canonical and in the link preview. */
  url: string
  /** Absolute URL of the link-preview image. */
  image: string
}

export const SITE_URL = 'https://unityevolv.com'
export const SITE_NAME = 'UnityEvolv'
const DEFAULT_IMAGE = `${SITE_URL}/img/og-default.png`

/**
 * The URL a page is actually served at.
 *
 * GitHub Pages serves `/products/index.html` and answers `/products` with a
 * 301 to `/products/`. A canonical, a sitemap entry or an `og:url` pointing at
 * the version that redirects tells a crawler to prefer a URL that is not the
 * one it will be given — small, but pointless, and easy to get right.
 */
export function canonicalUrl(path: string): string {
  if (path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.replace(/\/+$/, '')}/`
}

function page(path: string, title: string, description: string, image = DEFAULT_IMAGE): PageMeta {
  return {
    title: path === '/' ? `${SITE_NAME} — we build products with AI` : `${title} — ${SITE_NAME}`,
    description,
    url: canonicalUrl(path),
    image,
  }
}

/**
 * Every page's metadata, derived from the same content the page renders.
 *
 * Two copies of a description drift, and the one that drifts is always the
 * one nobody looks at — the one search results and link previews use. So the
 * product entries are the source here too.
 *
 * Titles carry what the page is *about* rather than only what it is called:
 * "UnityOfis" tells a searcher nothing they did not already type, while
 * "UnityOfis — a virtual office that runs on your own provider account" earns
 * the roughly sixty characters a search result actually shows.
 */
export const staticPages: Record<string, PageMeta> = {
  '/': page(
    '/',
    'Home',
    'UnityEvolv builds products with AI — its own, and other people’s — and opens the foundations they stand on. Two of them are open source and running today.',
  ),
  '/products': page(
    '/products',
    'Products — UnityOfis, OfisKit and UnityKit',
    'UnityOfis, OfisKit, UnityKit, UnityProtect and FastPortfolio. Two are open source and running today, and one of them you can try in your browser right now.',
  ),
  '/services': page('/services', 'Building products with AI', service.metaDescription),
  '/about': page(
    '/about',
    'About — open foundations, products on top',
    'UnityEvolv is a small team that builds its own products with AI, opens the foundations they stand on, and builds other people’s products the same way.',
  ),
  '/contact': page(
    '/contact',
    'Contact — tell us what you are building',
    'Tell us what you are building and who it is for. We read every message ourselves and reply within a day or two, usually with questions.',
  ),
  '/404': page('/404', 'Page not found', 'That page is not here.'),
}

/**
 * A product's title: its name and what it is, with the site name appended
 * only when that still fits.
 *
 * A search result shows roughly sixty characters. "UnityOfis — UnityEvolv"
 * wastes most of them on words the searcher already typed; "UnityOfis — a
 * virtual office that runs on your own provider account — UnityEvolv" is
 * eighty and gets cut mid-sentence. What it *is* beats who made it, so the
 * brand is the part that gives way. The tagline keeps its own capitalisation:
 * lowercasing the first letter turns "One family. Every device." into "one
 * family. Every device.", which reads as a typo.
 */
function productTitle(name: string, tagline: string): string {
  const what = tagline.replace(/\.$/, '')
  const base = `${name} — ${what}`
  return base.length <= 45 ? `${base} — ${SITE_NAME}` : base
}

const productPages: Record<string, PageMeta> = Object.fromEntries(
  visibleProducts.map((product) => [
    `/products/${product.slug}`,
    {
      title: productTitle(product.name, product.tagline),
      description: product.metaDescription,
      url: canonicalUrl(`/products/${product.slug}`),
      image: DEFAULT_IMAGE,
    },
  ]),
)

/** Every path the site publishes, which is also what the sitemap lists. */
export const allPages: Record<string, PageMeta> = { ...staticPages, ...productPages }

/** The paths a crawler and the prerenderer should visit. `/404` is neither. */
export const sitemapPaths = Object.keys(allPages).filter((path) => path !== '/404')

/**
 * The metadata for a path, falling back to the not-found page so a mistyped
 * URL still gets a sensible title rather than the previous page's.
 */
export function metaFor(pathname: string): PageMeta {
  const normalised = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return allPages[normalised] ?? staticPages['/404']
}
