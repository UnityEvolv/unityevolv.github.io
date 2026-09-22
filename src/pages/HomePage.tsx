import { productsByStatus } from '../content/products'
import { productBuildingService as service } from '../content/services'
import { CTABand } from '../sections/CTABand'
import { Hero } from '../sections/Hero'
import { LinkButton } from '../sections/LinkButton'
import { ProductCard } from '../sections/ProductCard'
import { Section } from '../sections/Section'

/**
 * What UnityEvolv does, in the order a first-time visitor needs it: what we
 * do, what that has produced, what is coming, and how to start.
 *
 * Every product shown comes from `src/content/products.ts`, so a launch or a
 * new product appears here without this file changing — and anything hidden,
 * such as unityFin, cannot appear by accident.
 */
export function HomePage() {
  const building = productsByStatus('live', 'in-development')
  const openSource = productsByStatus('open-source')
  const next = productsByStatus('coming-next', 'planned')

  return (
    <>
      <Hero
        headline="We build products with AI — ours, and yours."
        sub="UnityEvolv builds its own products and opens the foundations they stand on. The same team builds other people's products the same way."
        actions={
          <>
            <LinkButton href="/contact?topic=build">Tell us about your idea</LinkButton>
            <LinkButton href="/products" variant="quiet">
              See what we have built
            </LinkButton>
          </>
        }
      />

      <Section
        title="What we are building"
        intro="Our own products. Each one stands on something we have already opened up."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {building.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="Open source"
        intro="Free to use, free to run yourself, and the proof of how we work: public code, public CI, a demo you can open right now."
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {openSource.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What's next" intro="Further out. Tell us if you want one of them sooner.">
        <ul className="grid gap-4 sm:grid-cols-2">
          {next.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title={service.headline} intro={service.intro}>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/services" variant="quiet">
            How we would build yours
          </LinkButton>
        </div>
      </Section>

      <CTABand
        title="Tell us about your idea"
        body="What you are building, and who it is for. We will tell you what we would do first."
        actionLabel="Get in touch"
        actionHref="/contact?topic=build"
      />
    </>
  )
}
