import { describe, expect, it } from 'vitest'
import { allPages, metaFor, sitemapPaths, SITE_URL } from './seo'
import { visibleProducts, products } from './content/products'

describe('page metadata', () => {
  it('gives every visible product a page of its own', () => {
    for (const product of visibleProducts) {
      expect(allPages[`/products/${product.slug}`]).toBeDefined()
    }
  })

  it('never publishes a hidden product', () => {
    const hidden = products.filter((product) => product.hidden)
    expect(hidden.length).toBeGreaterThan(0)

    for (const product of hidden) {
      expect(allPages[`/products/${product.slug}`]).toBeUndefined()
      expect(sitemapPaths).not.toContain(`/products/${product.slug}`)
    }
  })

  it('keeps the not-found page out of the sitemap', () => {
    expect(sitemapPaths).not.toContain('/404')
  })

  it('gives every page a distinct title and a description', () => {
    const titles = Object.values(allPages).map((meta) => meta.title)
    expect(new Set(titles).size).toBe(titles.length)

    for (const [path, meta] of Object.entries(allPages)) {
      expect(meta.description.length, `${path} has no description`).toBeGreaterThan(20)
      expect(meta.url.startsWith(SITE_URL)).toBe(true)
    }
  })

  it('takes a product description from the product, so the two cannot drift', () => {
    const ofiskit = visibleProducts.find((product) => product.slug === 'ofiskit')
    expect(allPages['/products/ofiskit'].description).toBe(ofiskit?.metaDescription)
  })

  it('falls back to the not-found metadata rather than the previous page', () => {
    expect(metaFor('/nothing-here').title).toBe(allPages['/404'].title)
  })

  it('ignores a trailing slash, which links pick up in transit', () => {
    expect(metaFor('/products/').title).toBe(allPages['/products'].title)
  })
})
