import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../routes'
import { visibleProducts } from '../content/products'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('Products page', () => {
  it('groups products by where they are', () => {
    renderAt('/products')

    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toContain('What we are building')
    expect(headings).toContain('Open source')
    expect(headings).toContain("What's next")
  })

  it('lists every visible product and no hidden one', () => {
    renderAt('/products')

    for (const product of visibleProducts) {
      expect(screen.getByRole('link', { name: product.name })).toBeInTheDocument()
    }
    expect(screen.queryByText('unityFin')).not.toBeInTheDocument()
  })
})

describe('Product page', () => {
  it('renders unityofis with its provider feature given the most room', () => {
    const { container } = renderAt('/products/unityofis')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'A virtual office that runs on your own provider account.',
    )
    expect(screen.getByText('Bring your own provider')).toBeInTheDocument()
    expect(container.querySelectorAll('.sm\\:col-span-2')).toHaveLength(1)
  })

  it('points unityofis at the open-source engine', () => {
    renderAt('/products/unityofis')

    const aside = screen.getByRole('complementary')
    expect(within(aside).getByRole('link', { name: 'Look at OfisKit' })).toHaveAttribute(
      'href',
      '/products/ofiskit',
    )
  })

  it('says what the ofiskit demo is, beside the demo button', () => {
    renderAt('/products/ofiskit')

    expect(screen.getByRole('link', { name: /try the demo/i })).toHaveAttribute(
      'href',
      'https://unityevolv.com/ofis-kit/',
    )
    expect(screen.getByText(/second tab is a second person/i)).toBeInTheDocument()
  })

  it('carries the ofiskit licence split', () => {
    renderAt('/products/ofiskit')
    expect(screen.getByText(/AGPL-3.0-only/)).toBeInTheDocument()
  })

  it('replaces every Product Name placeholder on the UnityProtect page', () => {
    const { container } = renderAt('/products/unityprotect')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'One family. Every device. One set of rules.',
    )
    expect(container.textContent).not.toContain('[Product Name]')
    expect(container.textContent).toContain('UnityProtect')
  })

  it('sends an unknown product to the not-found page', () => {
    // Not vsamstha: that is a real old link and is redirected to unityofis
    // instead, which LegacyRedirects.test.tsx covers.
    renderAt('/products/not-a-product')
    expect(screen.getByText('That page is not here')).toBeInTheDocument()
  })

  it('keeps unityFin off the site until it is ready', () => {
    renderAt('/products/unityfin')
    expect(screen.getByText('That page is not here')).toBeInTheDocument()
  })
})
