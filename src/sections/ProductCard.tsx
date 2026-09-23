import { Card, Icon } from '@unityevolv/unitykit'
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
 * The link is at the foot and says where it goes — "Read about UnityOfis" —
 * rather than being the product's name in the header. A name on its own is a
 * link only to someone who tries it, which is how a list of products ends up
 * looking like a list of facts with no way in.
 *
 * Still one link per card: one tab stop per product, and one thing for a
 * screen reader to announce. The kit's `Card` can be an anchor itself, but
 * only a plain one — it will not import a router — so this uses
 * `variant="interactive"` and supplies its own `Link`, which is the
 * arrangement the kit's documentation asks client-side consumers for.
 */
export function ProductCard({ product, detailed = false }: ProductCardProps) {
  return (
    <Card
      variant="interactive"
      className="h-full"
      header={
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <StatusBadge status={product.status} />
        </div>
      }
      footer={
        <Link
          to={`/products/${product.slug}`}
          className="text-secondary hover:text-primary focus-visible:outline-focus inline-flex items-center gap-1 rounded text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Read about {product.name}
          <Icon name="chevron-right" size="sm" />
        </Link>
      }
    >
      <p className="text-base-content/80">{product.tagline}</p>
      {detailed ? (
        <p className="text-base-content/70 mt-3 text-sm">{firstSentence(product.intro)}</p>
      ) : null}
    </Card>
  )
}
