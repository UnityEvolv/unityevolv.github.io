import { Badge } from '@unityevolv/unitykit'
import type { ProductStatus } from '../content/types'
import { statusLabels } from '../content/products'

interface StatusBadgeProps {
  status: ProductStatus
}

/**
 * What a product's status looks like, decided once.
 *
 * The palette is two hues, so the badge does not try to give five statuses
 * five colours it does not have. Shipped things are solid, unshipped things
 * are outlined, and the word is what actually carries the meaning — which is
 * also why it never depends on colour alone.
 */
const variants: Record<ProductStatus, { variant: 'primary' | 'secondary'; outline: boolean }> = {
  live: { variant: 'primary', outline: false },
  'open-source': { variant: 'secondary', outline: false },
  'in-development': { variant: 'primary', outline: true },
  'coming-next': { variant: 'secondary', outline: true },
  planned: { variant: 'secondary', outline: true },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { variant, outline } = variants[status]
  return (
    <Badge variant={variant} outline={outline} size="sm">
      {statusLabels[status]}
    </Badge>
  )
}
