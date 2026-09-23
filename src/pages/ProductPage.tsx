import { Navigate, useParams } from 'react-router-dom'
import { productBySlug } from '../content/products'
import { CTABand } from '../sections/CTABand'
import { FeatureGrid } from '../sections/FeatureGrid'
import { Hero } from '../sections/Hero'
import { LinkButton } from '../sections/LinkButton'
import { Section } from '../sections/Section'
import { StatusBadge } from '../sections/StatusBadge'

/**
 * Every product's page, from its entry in `src/content/products.ts`.
 *
 * One component rather than five: the products differ in what they say, not in
 * how a product page is shaped, and a page per product would mean five places
 * to fix the day the shape changes. A product that needs something the shape
 * does not have gets a new field, which every product can then use.
 *
 * A slug that is not a visible product — a typo, or unityFin before it is
 * ready — falls through to the 404 page rather than rendering an empty shell.
 */
export function ProductPage() {
  const { slug } = useParams()
  const product = slug ? productBySlug(slug) : undefined

  if (!product) return <Navigate to="/404" replace />

  const primary = product.links?.find((link) => link.primary)
  const secondary = product.links?.filter((link) => !link.primary) ?? []

  return (
    <>
      <Hero
        eyebrow={<StatusBadge status={product.status} />}
        headline={product.tagline}
        sub={product.intro}
        actions={
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-3">
              {primary ? <LinkButton href={primary.href}>{primary.label}</LinkButton> : null}
              {secondary.map((link) => (
                <LinkButton key={link.href} href={link.href} variant="quiet">
                  {link.label}
                </LinkButton>
              ))}
            </div>
            {product.heroNote ? (
              <p className="text-base-content/70 max-w-2xl text-sm">{product.heroNote}</p>
            ) : null}
          </div>
        }
      />

      {product.body?.length ? (
        <Section>
          <div className="flex max-w-3xl flex-col gap-4">
            {product.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-base-content/80 text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Section>
      ) : null}

      {product.features?.length ? (
        <Section title="What it does">
          <FeatureGrid features={product.features} />
        </Section>
      ) : null}

      {product.aside ? (
        <Section>
          <aside className="border-base-300 bg-base-200 rounded-lg border p-6">
            <h2 className="text-xl font-semibold">{product.aside.title}</h2>
            <p className="text-base-content/70 mt-2 max-w-2xl">{product.aside.body}</p>
            <div className="mt-4">
              <LinkButton href={product.aside.link.href} variant="quiet">
                {product.aside.link.label}
              </LinkButton>
            </div>
          </aside>
        </Section>
      ) : null}

      {product.licence ? (
        <Section title="Licence">
          <p className="text-base-content/70 max-w-3xl">{product.licence}</p>
        </Section>
      ) : null}

      <CTABand
        title="Questions about it?"
        body="Tell us what you are trying to do and we will tell you whether this is the thing for it."
        actionLabel="Get in touch"
        actionHref={`/contact?topic=${product.slug}`}
      />
    </>
  )
}
