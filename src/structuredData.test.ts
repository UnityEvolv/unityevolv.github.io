import { describe, expect, it } from 'vitest'
import { structuredDataFor } from './structuredData'
import { productBySlug, visibleProducts } from './content/products'
import { productBuildingService as service } from './content/services'

function graphFor(path: string): Record<string, unknown>[] {
  const json = structuredDataFor(path)
  if (!json) throw new Error(`no structured data for ${path}`)
  const parsed = JSON.parse(json) as { '@graph': Record<string, unknown>[] }
  return parsed['@graph']
}

function types(path: string): string[] {
  return graphFor(path).map((node) => node['@type'] as string)
}

describe('structured data', () => {
  it('is valid JSON everywhere it exists', () => {
    for (const path of [
      '/',
      '/products',
      '/services',
      ...visibleProducts.map((p) => `/products/${p.slug}`),
    ]) {
      expect(() => JSON.parse(structuredDataFor(path) ?? ''), path).not.toThrow()
    }
  })

  it('describes the organisation and the site on the home page', () => {
    expect(types('/')).toEqual(['Organization', 'WebSite'])
  })

  it('marks up a product as software, with breadcrumbs', () => {
    expect(types('/products/unityofis')).toContain('SoftwareApplication')
    expect(types('/products/unityofis')).toContain('BreadcrumbList')
  })

  it('only claims an FAQ where the page actually shows one', () => {
    // Marking up questions a visitor cannot see is what search engines
    // penalise, so the markup follows the content rather than the other way
    // round. FastPortfolio has no FAQs; UnityOfis does.
    expect(productBySlug('fastportfolio')?.faqs).toBeUndefined()
    expect(types('/products/fastportfolio')).not.toContain('FAQPage')

    expect(productBySlug('unityofis')?.faqs?.length).toBeGreaterThan(0)
    expect(types('/products/unityofis')).toContain('FAQPage')
  })

  it('takes the FAQ answers from the same content the page renders', () => {
    const faq = graphFor('/services').find((node) => node['@type'] === 'FAQPage')
    const questions = (faq?.mainEntity as { name: string }[]).map((q) => q.name)
    expect(questions).toEqual(service.faqs.map((f) => f.question))
  })

  it('invents no price and no rating', () => {
    // Both are rich-result bait and both would be fabricated: nothing here has
    // a published price and nobody has rated any of it.
    for (const product of visibleProducts) {
      const json = structuredDataFor(`/products/${product.slug}`) ?? ''
      expect(json, product.name).not.toContain('aggregateRating')
      expect(json, product.name).not.toContain('"offers"')
    }
  })

  it('never points at a URL that redirects', () => {
    for (const path of ['/', '/products', '/services', '/products/ofiskit']) {
      const json = structuredDataFor(path) ?? ''
      for (const url of json.match(/https:\/\/unityevolv\.com[^"]*/g) ?? []) {
        // Every page URL we publish ends in a slash; asset URLs are files.
        if (/\.(png|webp|svg|ico)$/.test(url) || url.includes('#')) continue
        expect(url.endsWith('/'), `${path} → ${url}`).toBe(true)
      }
    }
  })

  it('says nothing at all on a page with nothing to say', () => {
    expect(structuredDataFor('/contact')).toBeNull()
    expect(structuredDataFor('/products/not-a-product')).toBeNull()
  })
})
