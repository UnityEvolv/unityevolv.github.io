import { productBySlug, visibleProducts } from './content/products'
import { productBuildingService as service } from './content/services'
import { canonicalUrl, metaFor, SITE_NAME, SITE_URL } from './seo'

/**
 * The JSON-LD each page carries.
 *
 * This is the only part of the page written for a machine rather than a
 * person, and the rule that keeps it honest is that **every statement here
 * must also be on the page a visitor sees**. Marking up an FAQ the page does
 * not show, or a rating nobody gave, is the fastest way to lose the rich
 * result entirely — and it would be a lie told to a search engine, which is
 * still a lie.
 *
 * Everything is derived from `src/content`, so the markup cannot drift from
 * the page: there is no second copy of the answers to keep in step.
 */
type JsonLd = Record<string, unknown>

const organisation: JsonLd = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/img/logo.png`,
  description:
    'UnityEvolv builds products with AI — its own, and other people’s — and opens the foundations they stand on.',
  sameAs: ['https://github.com/UnityEvolv'],
}

const website: JsonLd = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { '@id': `${SITE_URL}/#organization` },
}

/** Breadcrumbs for a product page: Home → Products → the product. */
function breadcrumbs(productName: string, slug: string): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl('/') },
      { '@type': 'ListItem', position: 2, name: 'Products', item: canonicalUrl('/products') },
      {
        '@type': 'ListItem',
        position: 3,
        name: productName,
        item: canonicalUrl(`/products/${slug}`),
      },
    ],
  }
}

/**
 * An FAQ, only where the page actually shows one. An `FAQPage` whose
 * questions are not visible is exactly what search engines penalise.
 */
function faqPage(faqs: { question: string; answer: string }[]): JsonLd {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

/**
 * A product, as software rather than as a thing with a price: no `offers`,
 * because nothing here has a published price, and no `aggregateRating`,
 * because nobody has rated it. Claiming either would be inventing data.
 */
function softwareApplication(slug: string): JsonLd | null {
  const product = productBySlug(slug)
  if (!product) return null

  const licences: Record<string, string> = {
    ofiskit: 'https://github.com/UnityEvolv/ofis-kit/blob/main/LICENSE',
    unitykit: 'https://github.com/UnityEvolv/unity-kit',
  }

  return {
    '@type': 'SoftwareApplication',
    name: product.name,
    url: canonicalUrl(`/products/${product.slug}`),
    description: product.metaDescription,
    applicationCategory: 'BusinessApplication',
    publisher: { '@id': `${SITE_URL}/#organization` },
    ...(licences[product.slug] ? { license: licences[product.slug] } : {}),
  }
}

/** The graph for one path, as a `<script type="application/ld+json">` body. */
export function structuredDataFor(pathname: string): string | null {
  const normalised = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  const graph: JsonLd[] = []

  if (normalised === '/') {
    graph.push(organisation, website)
  } else if (normalised === '/services') {
    graph.push({
      '@type': 'Service',
      name: service.name,
      url: canonicalUrl('/services'),
      description: service.metaDescription,
      provider: { '@id': `${SITE_URL}/#organization` },
    })
    graph.push(faqPage(service.faqs))
  } else if (normalised.startsWith('/products/')) {
    const slug = normalised.slice('/products/'.length)
    const product = productBySlug(slug)
    if (!product) return null

    const application = softwareApplication(slug)
    if (application) graph.push(application)
    graph.push(breadcrumbs(product.name, slug))
    if (product.faqs?.length) graph.push(faqPage(product.faqs))
  } else if (normalised === '/products') {
    graph.push({
      '@type': 'CollectionPage',
      name: metaFor('/products').title,
      url: canonicalUrl('/products'),
      description: metaFor('/products').description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      hasPart: visibleProducts.map((product) => ({
        '@type': 'SoftwareApplication',
        name: product.name,
        url: canonicalUrl(`/products/${product.slug}`),
      })),
    })
  }

  if (graph.length === 0) return null
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}
