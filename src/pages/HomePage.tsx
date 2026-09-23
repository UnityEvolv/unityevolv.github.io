import { mission } from '../content/company'
import { productsByStatus } from '../content/products'
import { productBuildingService as service } from '../content/services'
import { CTABand } from '../sections/CTABand'
import { Hero } from '../sections/Hero'
import { LinkButton } from '../sections/LinkButton'
import { ProductCard } from '../sections/ProductCard'
import { Section } from '../sections/Section'

/**
 * What UnityEvolv does, in the order a first-time visitor needs it: what we
 * stand for, what that has produced, what is coming, and how to start.
 *
 * The headline and the sentence under it are the company's own mission,
 * carried over from the previous site rather than rewritten. Every product
 * shown comes from `src/content/products.ts`, so a launch appears here without
 * this file changing, and a hidden product such as UnityFin cannot appear by
 * accident.
 */
export function HomePage() {
  const building = productsByStatus('live', 'in-development')
  const openSource = productsByStatus('open-source')
  const next = productsByStatus('coming-next', 'planned')

  return (
    <>
      <Hero
        headline={mission.headline}
        sub={mission.statement}
        image={{ src: '/img/hero.webp', alt: '' }}
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
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/services" variant="quiet">
              How we would build yours
            </LinkButton>
          </div>
          <img
            src="/img/services.webp"
            alt=""
            width={1200}
            height={1200}
            loading="lazy"
            className="border-base-300 rounded-lg border"
          />
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
