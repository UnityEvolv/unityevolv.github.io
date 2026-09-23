import { Link } from 'react-router-dom'
import { Icon } from '@unityevolv/unitykit'
import { navLinks } from './navigation'

interface ExternalLink {
  label: string
  href: string
}

/**
 * The open-source links point at each repository's own Pages site on this
 * domain. They are other repositories' deployments, not routes of this site.
 */
const openSource: ExternalLink[] = [
  { label: 'OfisKit on GitHub', href: 'https://github.com/UnityEvolv/ofis-kit' },
  { label: 'OfisKit demo', href: 'https://unityevolv.com/ofis-kit/' },
  { label: 'UnityKit on GitHub', href: 'https://github.com/UnityEvolv/unity-kit' },
  { label: 'UnityKit components', href: 'https://unityevolv.com/unity-kit/' },
]

export function SiteFooter() {
  return (
    <footer className="bg-base-200 border-base-300 mt-12 border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2">
        <nav aria-label="Footer">
          <h2 className="text-base-content mb-3 text-sm font-semibold">UnityEvolv</h2>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-base-content/80 hover:text-base-content text-sm">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base-content mb-3 text-sm font-semibold">Open source</h2>
          <ul className="flex flex-col gap-2">
            {openSource.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-base-content/80 hover:text-base-content inline-flex items-center gap-1 text-sm"
                >
                  {link.label}
                  <Icon name="external-link" size="xs" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-base-300 border-t">
        <p className="text-base-content/70 mx-auto max-w-6xl px-4 py-6 text-sm">
          UnityEvolv © {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
