import { describe, expect, it } from 'vitest'
import {
  productBySlug,
  products,
  productsByStatus,
  statusLabels,
  visibleProducts,
} from './products'

describe('products', () => {
  it('keeps unityFin off the site until it is ready', () => {
    expect(products.some((product) => product.slug === 'unityfin')).toBe(true)
    expect(visibleProducts.some((product) => product.slug === 'unityfin')).toBe(false)
    expect(productBySlug('unityfin')).toBeUndefined()
  })

  it('groups the what-next products by status', () => {
    expect(productsByStatus('coming-next', 'planned').map((product) => product.slug)).toEqual([
      'unityprotect',
      'fastportfolio',
    ])
  })

  it('has a label for every status in use', () => {
    for (const product of products) {
      expect(statusLabels[product.status]).toBeTruthy()
    }
  })

  it('gives every visible product a unique slug and the copy a page needs', () => {
    const slugs = visibleProducts.map((product) => product.slug)
    expect(new Set(slugs).size).toBe(slugs.length)

    for (const product of visibleProducts) {
      expect(product.tagline.length).toBeGreaterThan(0)
      expect(product.intro.length).toBeGreaterThan(0)
      expect(product.metaDescription.length).toBeGreaterThan(0)
    }
  })

  it('never routes a product page at a path another repository serves', () => {
    // /unity-kit/ and /ofis-kit/ on this domain are the unity-kit and ofis-kit
    // repositories' own Pages sites. A product page at either slug would be
    // unreachable, so the slugs deliberately have no hyphen.
    for (const product of visibleProducts) {
      expect(['unity-kit', 'ofis-kit']).not.toContain(product.slug)
    }
  })

  it('points external links at real UnityEvolv URLs', () => {
    const ofiskit = productBySlug('ofiskit')
    expect(ofiskit?.links?.map((link) => link.href)).toEqual([
      'https://unityevolv.com/ofis-kit/',
      'https://github.com/UnityEvolv/ofis-kit',
    ])
  })

  it('gives every unreleased product a way to get in touch', () => {
    for (const product of productsByStatus('in-development', 'coming-next', 'planned')) {
      const hasContact = product.links?.some((link) => link.href.startsWith('/contact'))
      expect(hasContact, `${product.name} has no contact link`).toBe(true)
    }
  })

  it('allows at most one primary link per product', () => {
    for (const product of visibleProducts) {
      const primaries = product.links?.filter((link) => link.primary) ?? []
      expect(
        primaries.length,
        `${product.name} has ${primaries.length} primary links`,
      ).toBeLessThan(2)
    }
  })
})
