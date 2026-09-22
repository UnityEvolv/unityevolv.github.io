import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { AppRoutes } from './routes'

function renderAt(entry: string) {
  return render(
    <MemoryRouter initialEntries={[entry]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

describe('links from the old site', () => {
  it('takes /#products to the products page', async () => {
    renderAt('/#products')
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Products'),
    )
  })

  it('takes /#contact-us to the contact page', async () => {
    renderAt('/#contact-us')
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Tell us what you are working on',
      ),
    )
  })

  it('takes the old VSamstha name to unityofis', async () => {
    renderAt('/products/vsamstha')
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'A virtual office that runs on your own provider account.',
      ),
    )
  })

  it('leaves a path of our own alone', async () => {
    renderAt('/about')
    await waitFor(() =>
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'We build products, and we open the foundations.',
      ),
    )
  })
})

describe('the not-found page', () => {
  it('offers the three places a lost visitor is likely to want', () => {
    renderAt('/nothing-here')

    expect(screen.getByText('That page is not here')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'See the products' })).toHaveAttribute(
      'href',
      '/products',
    )
    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'tell us what you were looking for' })).toHaveAttribute(
      'href',
      '/contact',
    )
  })
})
