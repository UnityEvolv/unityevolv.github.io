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
const SITE_NAME = 'Unity Evolv'
const DEFAULT_IMAGE = `${SITE_URL}/img/og-default.png`

function page(path: string, title: string, description: string, image = DEFAULT_IMAGE): PageMeta {
  return {
    title: path === '/' ? `${SITE_NAME} — we build products with AI` : `${title} — ${SITE_NAME}`,
    description,
    url: path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`,
    image,
  }
}

/**
 * Every page's metadata, derived from the same content the page renders.
 *
 * Two copies of a description drift, and the one that drifts is always the
 * one nobody looks at — the one search results and link previews use. So the
 * product entries are the source here too.
 */
export const staticPages: Record<string, PageMeta> = {
  '/': page(
    '/',
    'Home',
    'UnityEvolv builds products with AI — its own, and other people’s — and opens the foundations they stand on.',
  ),
  '/products': page(
    '/products',
    'Products',
    'unityofis, ofiskit, unitykit and what is coming next. Two of them are open source and running today.',
  ),
  '/services': page('/services', 'Building products with AI', service.metaDescription),
  '/about': page(
    '/about',
    'About',
    'A small team that builds its own products with AI and opens the foundations they stand on.',
  ),
  '/contact': page(
    '/contact',
    'Contact',
    'Tell us what you are building. We answer every message ourselves.',
  ),
  '/404': page('/404', 'Page not found', 'That page is not here.'),
}

const productPages: Record<string, PageMeta> = Object.fromEntries(
  visibleProducts.map((product) => [
    `/products/${product.slug}`,
    page(`/products/${product.slug}`, product.name, product.metaDescription),
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
