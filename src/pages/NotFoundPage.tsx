import { EmptyState } from '@unityevolv/unitykit'
import { Link } from 'react-router-dom'
import { LinkButton } from '../sections/LinkButton'

/**
 * Where an unknown path lands, and where a product slug that is not a visible
 * product goes — a typo, or unityFin before it is ready.
 *
 * Links to the old site are handled before this page is ever reached: see
 * `src/legacy.ts`. This is for everything else, so it offers the three places
 * a lost visitor is most likely to want rather than only sending them home.
 *
 * On GitHub Pages the deployment serves this page as `404.html`, which is what
 * makes the response a real 404 rather than a 200 that merely looks like one
 * (KAN-6).
 */
export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24">
      {/*
        Every page needs a level-one heading, and this is a page: axe fails it
        otherwise, and a screen-reader user landing here with nothing above an
        h2 cannot tell what they have arrived at. The kit's EmptyState offers
        p, h2, h3 and h4 but not h1 — UKIT-34 — so the h1 is here, worded
        differently from the panel below it so the two do not read as a
        stutter.
      */}
      <h1 className="sr-only">Page not found</h1>

      <EmptyState
        icon="search"
        titleAs="h2"
        title="That page is not here"
        description="The link may be from the old site, or the product may not have launched yet."
        action={<LinkButton href="/products">See the products</LinkButton>}
      />

      <p className="text-base-content/70 mt-8 text-center">
        You can also go{' '}
        <Link to="/" className="text-secondary underline">
          home
        </Link>{' '}
        or{' '}
        <Link to="/contact" className="text-secondary underline">
          tell us what you were looking for
        </Link>
        .
      </p>
    </div>
  )
}
