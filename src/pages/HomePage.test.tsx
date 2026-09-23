import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../routes'
import { visibleProducts } from '../content/products'
import { mission } from '../content/company'

function renderHome() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('Home page', () => {
  it('says what the company does in the heading', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(mission.headline)
  })

  it('shows every visible product and never the hidden one', () => {
    const { container } = renderHome()

    for (const product of visibleProducts) {
      expect(screen.getByRole('link', { name: `Read about ${product.name}` })).toBeInTheDocument()
    }
    expect(container.textContent).not.toContain('unityFin')
  })

  it('leads with getting in touch', () => {
    renderHome()
    expect(screen.getAllByRole('link', { name: /tell us about your idea/i })[0]).toHaveAttribute(
      'href',
      '/contact?topic=build',
    )
  })

  it('leaves no link pointing nowhere', () => {
    const { container } = renderHome()

    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'))
    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      expect(href).toBeTruthy()
      expect(href).not.toBe('#')
    }
  })

  it('keeps off the paths other repositories serve on this domain', () => {
    const { container } = renderHome()

    const internal = [...container.querySelectorAll('a')]
      .map((a) => a.getAttribute('href') ?? '')
      .filter((href) => href.startsWith('/'))

    for (const href of internal) {
      expect(href.startsWith('/unity-kit')).toBe(false)
      expect(href.startsWith('/ofis-kit')).toBe(false)
    }
  })
})
