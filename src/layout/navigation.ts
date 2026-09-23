export interface NavLinkItem {
  label: string
  to: string
}

/**
 * The site's primary navigation, in one place because the navbar, the mobile
 * drawer and the footer all render it.
 *
 * Nothing here may use `/unity-kit` or `/ofis-kit`: those paths on
 * unityevolv.com are served by those repositories' own Pages sites, and a
 * route of ours at either path would be unreachable.
 */
export const navLinks: NavLinkItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
