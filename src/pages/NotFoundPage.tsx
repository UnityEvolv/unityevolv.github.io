import { EmptyState } from '@unityevolv/unitykit'
import { LinkButton } from '../sections/LinkButton'

/**
 * Where an unknown path lands, and where a product slug that is not a visible
 * product goes. KAN-19 adds the redirects from the old single-page anchors and
 * makes the response status a real 404 rather than only this page.
 */
export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24">
      <EmptyState
        icon="search"
        title="That page is not here"
        description="The link may be from the old site, or the product may not have launched yet."
        action={<LinkButton href="/products">See the products</LinkButton>}
      />
    </div>
  )
}
