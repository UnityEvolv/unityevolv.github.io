import { Card } from '@unityevolv/unitykit'
import { Link } from 'react-router-dom'
import type { Product } from '../content/types'
import { StatusBadge } from './StatusBadge'

interface ProductCardProps {
  product: Product
  /**
   * Adds the opening sentence of the product's own introduction. The Products
   * page uses it, where a visitor is comparing; the home page does not, where
   * they are still deciding whether to care.
   */
  detailed?: boolean
}

/** The first sentence, which is what a card has room for. */
function firstSentence(text: string): string {
  const end = text.search(/[.!?](\s|$)/)
  return end === -1 ? text : text.slice(0, end + 1)
}

/**
 * One product, as it appears in a list.
 *
 * The kit's `Card` takes an `href` and becomes an anchor, but only a plain
 * one: it is router-agnostic and will not import a router. This site is a
 * client-side app, so the card uses `variant="interactive"` and supplies its
 * own `Link` — the arrangement the kit's own documentation asks consumers to
 * use.
 *
 * The whole card is not the link. A single link on the title keeps one tab
 * stop per card and one thing for a screen reader to announce, and leaves the
 * tagline as text rather than part of a very long link name.
 */
export function ProductCard({ product, detailed = false }: ProductCardProps) {
  return (
    <Card
      variant="interactive"
      className="h-full"
      header={
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">
            <Link
              to={`/products/${product.slug}`}
              className="hover:text-primary focus-visible:outline-focus rounded focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {product.name}
            </Link>
          </h3>
          <StatusBadge status={product.status} />
        </div>
      }
    >
      <p className="text-base-content/80">{product.tagline}</p>
      {detailed ? (
        <p className="text-base-content/70 mt-3 text-sm">{firstSentence(product.intro)}</p>
      ) : null}
    </Card>
  )
}
