import { describe, expect, it } from 'vitest'
import { legacyHashDestination, legacyPathRoutes } from './legacy'

describe('legacyHashDestination', () => {
  it('sends each old anchor to the page that replaced it', () => {
    expect(legacyHashDestination('/', '#products')).toBe('/products')
    expect(legacyHashDestination('/', '#services')).toBe('/services')
    expect(legacyHashDestination('/', '#about-us')).toBe('/about')
    expect(legacyHashDestination('/', '#contact-us')).toBe('/contact')
    expect(legacyHashDestination('/', '#home')).toBe('/')
  })

  it('ignores case, which links pick up in transit', () => {
    expect(legacyHashDestination('/', '#Products')).toBe('/products')
  })

  it('leaves an anchor inside one of our own pages alone', () => {
    // /products#services is a link into a page of ours, not a link from the
    // old single-page site, and redirecting it would break in-page anchors.
    expect(legacyHashDestination('/products', '#services')).toBeNull()
  })

  it('leaves everything else alone', () => {
    expect(legacyHashDestination('/', '#nothing')).toBeNull()
    expect(legacyHashDestination('/about', '')).toBeNull()
  })
})

describe('legacyPathRoutes', () => {
  it('points the old product names at their pages', () => {
    expect(legacyPathRoutes['/vsamstha']).toBe('/products/unityofis')
    expect(legacyPathRoutes['/products/vsamstha']).toBe('/products/unityofis')
  })

  it('only ever points at paths this site actually serves', () => {
    for (const destination of Object.values(legacyPathRoutes)) {
      expect(destination.startsWith('/')).toBe(true)
      expect(destination.startsWith('/unity-kit')).toBe(false)
      expect(destination.startsWith('/ofis-kit')).toBe(false)
    }
  })
})
