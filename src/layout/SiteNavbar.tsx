import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Button, Drawer } from '@unityevolv/unitykit'
import { SiteLogo } from './SiteLogo'
import { navLinks } from './navigation'
import { ThemeToggle } from './ThemeToggle'

/**
 * The bar across the top of every page.
 *
 * The kit's `Navbar` only grows its own menu button inside an `AppShell` with a
 * sidebar, which this site has no use for, so the small-screen menu is a
 * `Drawer` opened from here. The drawer brings the focus trap, focus return,
 * Escape and scroll lock with it — none of that is hand-rolled.
 */
export function SiteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // The drawer is dismissed on navigation: React Router changes the URL without
  // unmounting the dialog, so without this the menu would stay open over the
  // page the visitor just asked for.
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="bg-base-100 border-base-300 sticky top-0 z-30 border-b">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <SiteLogo />

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                isActive
                  ? 'text-primary rounded px-3 py-2 text-sm font-medium'
                  : 'text-base-content/80 hover:text-base-content rounded px-3 py-2 text-sm font-medium'
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />

          <div className="lg:hidden">
            <Drawer
              open={menuOpen}
              onOpenChange={setMenuOpen}
              side="end"
              size="sm"
              title="Menu"
              trigger={<Button variant="ghost" icon="menu" aria-label="Open the menu" />}
            >
              <nav aria-label="Primary" className="p-4">
                <ul className="menu w-full gap-1">
                  {navLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        onClick={closeMenu}
                        className={({ isActive }) =>
                          isActive ? 'text-primary font-medium' : 'text-base-content'
                        }
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </Drawer>
          </div>
        </div>
      </div>

      {/*
        A skip link belongs with the landmarks rather than the page, so it is
        here: on a long product page the navigation is the first thing every
        keyboard visitor meets.
      */}
      <a
        href={`${pathname}#main`}
        className="bg-primary text-primary-content sr-only left-4 top-4 rounded px-3 py-2 focus:not-sr-only focus:absolute focus:z-40"
      >
        Skip to content
      </a>
    </header>
  )
}
