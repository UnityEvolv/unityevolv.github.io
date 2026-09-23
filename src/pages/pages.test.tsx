import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from '../routes'

// The contact page has its own file, contact.test.tsx: it has two sending
// paths and enough of them to crowd this one out.
function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('Services page', () => {
  it('lays out the four stages and the questions', () => {
    renderAt('/services')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'From an idea to a shipped product, built with AI.',
    )
    expect(screen.getByText('Discover')).toBeInTheDocument()
    expect(screen.getByText('Launch and hand over')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /who owns the code/i })).toBeInTheDocument()
  })

  it('backs its claims with the open-source work', () => {
    renderAt('/services')

    expect(
      screen.getByRole('link', { name: /ofiskit, the open-source virtual office/i }),
    ).toHaveAttribute('href', '/products/ofiskit')
  })
})

describe('About page', () => {
  it('says what the company does now, not the old story', () => {
    const { container } = renderAt('/about')

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'We build products, and we open the foundations.',
    )
    expect(container.textContent).not.toContain('VSamstha')
    expect(container.textContent).not.toContain('FastPortfolio - Your Professional')
  })
})
