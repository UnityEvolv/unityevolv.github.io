/**
 * The shape of everything the site says about a product or a service.
 *
 * Pages read this; they do not carry copy of their own. Launching a product,
 * renaming one or taking one off the site is a change here and nowhere else.
 */

/**
 * Where a product is in its life, which decides the badge it wears and the
 * group it appears in on the Products page.
 */
export type ProductStatus = 'live' | 'open-source' | 'in-development' | 'coming-next' | 'planned'

export interface ProductLink {
  label: string
  href: string
  /** `true` renders it as the page's main action. At most one per product. */
  primary?: boolean
}

export interface ProductFeature {
  /** The claim, in a few words. */
  title: string
  /** One or two sentences backing it up. */
  body: string
  /** Gives the feature the full width of the grid, for the strongest one. */
  wide?: boolean
}

export interface Product {
  /** How the name is written everywhere on the site. */
  name: string
  /** The URL segment under `/products/`. */
  slug: string
  status: ProductStatus
  /** One line, used on cards and as the page's subheading. */
  tagline: string
  /** The opening paragraph of the product's page. */
  intro: string
  /** Everything after the intro, as paragraphs. */
  body?: string[]
  features?: ProductFeature[]
  links?: ProductLink[]
  /**
   * A line directly under the hero's actions, for something a visitor needs to
   * know *before* pressing one. ofiskit uses it to say what its demo actually
   * is, so nobody arrives expecting to invite a colleague.
   */
  heroNote?: string
  /** A panel pointing at a related product, such as the engine behind one. */
  aside?: {
    title: string
    body: string
    link: ProductLink
  }
  /**
   * The answers someone skims for before reading anything: what it runs on,
   * what it costs them, what licence it carries. Short enough to sit in a row.
   */
  facts?: { label: string; value: string }[]
  /** Who this is for, in their words rather than a segment name. */
  audience?: string[]
  /** The questions this particular product raises, answered. */
  faqs?: { question: string; answer: string }[]
  licence?: string
  /**
   * Kept out of every list, every page and the sitemap, while its entry stays
   * here ready for launch. UnityFin is the one today.
   */
  hidden?: boolean
  /** For the page's `<title>` and meta description. */
  metaDescription: string
}

export interface ServiceStep {
  title: string
  body: string
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface Service {
  name: string
  slug: string
  headline: string
  intro: string
  steps: ServiceStep[]
  /** What the client is left holding at the end. */
  deliverables: { title: string; body: string }[]
  audience: string[]
  faqs: ServiceFaq[]
  metaDescription: string
}
