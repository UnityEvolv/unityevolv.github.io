import { productsByStatus } from '../content/products'
import { CTABand } from '../sections/CTABand'
import { Hero } from '../sections/Hero'
import { ProductCard } from '../sections/ProductCard'
import { Section } from '../sections/Section'
import type { Product } from '../content/types'

/**
 * Everything we build, and where each one is.
 *
 * The three groups are derived from each product's status rather than listed
 * here, so a launch is a status change in `products.ts` and nothing else. A
 * group with nothing in it does not render, which is what lets the page
 * survive every product moving up.
 */
const groups: { title: string; intro: string; products: Product[] }[] = [
  {
    title: 'What we are building',
    intro: 'Our own products, built the same way we build for clients.',
    products: productsByStatus('live', 'in-development'),
  },
  {
    title: 'Open source',
    intro: 'The foundations our products stand on, free to use and to run yourself.',
    products: productsByStatus('open-source'),
  },
  {
    title: "What's next",
    intro: 'Further out, and worth telling us if you want one of them sooner.',
    products: productsByStatus('coming-next', 'planned'),
  },
]

export function ProductsPage() {
  return (
    <>
      <Hero
        headline="Products"
        sub="Two of them are open source and running today. The rest are on their way."
      />

      {groups
        .filter((group) => group.products.length > 0)
        .map((group) => (
          <Section key={group.title} title={group.title} intro={group.intro}>
            {/*
              A group of one gets the full width. In a two-column grid a lone
              card sits beside an empty half, which reads as something missing
              rather than as the only product in that group — and today "what
              we are building" is exactly one product.
            */}
            <ul
              className={group.products.length === 1 ? 'grid gap-4' : 'grid gap-4 sm:grid-cols-2'}
            >
              {group.products.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} detailed />
                </li>
              ))}
            </ul>
          </Section>
        ))}

      <CTABand
        title="Want one of these for your own company?"
        body="We build products from scratch with AI, and these are what that looks like."
        actionLabel="Tell us about your idea"
        actionHref="/contact"
      />
    </>
  )
}
