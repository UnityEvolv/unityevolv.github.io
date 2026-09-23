/**
 * Where links to the old site should land.
 *
 * Two mechanisms, because a hash and a path are seen by different things.
 *
 * A hash never reaches the server *or* the router's path matching, so
 * `unityevolv.com/#products` — which is what anyone who bookmarked or shared
 * the old single-page site has — can only be handled by looking at
 * `location.hash` and moving the visitor on.
 *
 * A path is a route, so an old path is redirected as a route. That matters:
 * `/products/vsamstha` also matches `/products/:slug`, and a product page
 * with an unknown slug sends the visitor to the not-found page. Two redirects
 * racing in the same commit is a coin toss, and a route wins by rendering
 * first rather than by winning the toss.
 */
export const legacyHashRoutes: Record<string, string> = {
  '#home': '/',
  '#about-us': '/about',
  '#products': '/products',
  '#services': '/services',
  '#contact-us': '/contact',
}

/** Old path to new path, rendered as redirect routes in `AppRoutes`. */
export const legacyPathRoutes: Record<string, string> = {
  '/vsamstha': '/products/unityofis',
  '/products/vsamstha': '/products/unityofis',
  '/fastportfolio': '/products/fastportfolio',
  '/products/fast-portfolio': '/products/fastportfolio',
}

/**
 * The page an old anchor belongs to, or `null`.
 *
 * The anchor only counts on the old single page: `/products#services` is a
 * link into a page of ours, and redirecting it would break in-page anchors.
 * Matching ignores case, because links pick up capitalisation in transit.
 */
export function legacyHashDestination(pathname: string, hash: string): string | null {
  if (pathname !== '/' && pathname !== '') return null
  return legacyHashRoutes[hash.toLowerCase()] ?? null
}
