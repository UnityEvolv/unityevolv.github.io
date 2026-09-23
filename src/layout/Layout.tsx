import { Outlet } from 'react-router-dom'
import { SiteFooter } from './SiteFooter'
import { SiteNavbar } from './SiteNavbar'

/**
 * Wraps every page. `main` carries the id the skip link targets, and
 * `flex-1` keeps the footer at the bottom of a short page rather than
 * floating halfway up it.
 */
export function Layout() {
  return (
    <div className="bg-base-100 text-base-content flex min-h-dvh flex-col">
      <SiteNavbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
