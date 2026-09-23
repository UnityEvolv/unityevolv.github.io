import { Card } from '@unityevolv/unitykit'
import type { ProductFeature } from '../content/types'

interface FeatureGridProps {
  features: ProductFeature[]
}

/**
 * The claims a product makes, one card each.
 *
 * A feature marked `wide` spans both columns from `sm` up, which is how
 * unityofis gives "Bring your own provider" the room the story asks for. The
 * two spans are written out in full rather than chosen into a template
 * literal: Tailwind reads built files as static text, so an assembled class
 * name produces no CSS and nothing errors.
 */
export function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {features.map((feature) => (
        <li key={feature.title} className={feature.wide ? 'sm:col-span-2' : 'sm:col-span-1'}>
          <Card
            variant="bordered"
            className="h-full"
            header={<h3 className="text-lg font-semibold">{feature.title}</h3>}
          >
            <p className="text-base-content/70">{feature.body}</p>
          </Card>
        </li>
      ))}
    </ul>
  )
}
