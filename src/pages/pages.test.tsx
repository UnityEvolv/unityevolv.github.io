import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from '../routes'

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

describe('Contact page', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('asks for what a reply needs', () => {
    renderAt('/contact')

    expect(screen.getByLabelText(/your name/i)).toBeRequired()
    expect(screen.getByLabelText(/email address/i)).toBeRequired()
    expect(screen.getByLabelText(/your message/i)).toBeRequired()
  })

  it('preselects the topic a product page sent it', () => {
    renderAt('/contact?topic=unityprotect')
    expect(screen.getByLabelText(/what is it about/i)).toHaveValue('unityprotect')
  })

  it('falls back to the default topic when the query is nonsense', () => {
    renderAt('/contact?topic=not-a-topic')
    expect(screen.getByLabelText(/what is it about/i)).toHaveValue('build')
  })

  it('says plainly that the form is not connected rather than swallowing a message', () => {
    // No VITE_CONTACT_ENDPOINT is set in the test environment, which is the
    // state the site ships in until the form service is chosen.
    renderAt('/contact')
    expect(screen.getByText(/this form is not connected yet/i)).toBeInTheDocument()
  })

  it('never posts anywhere while no endpoint is configured', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    renderAt('/contact')
    await userEvent.type(screen.getByLabelText(/your name/i), 'Sasha Kim')
    await userEvent.type(screen.getByLabelText(/email address/i), 'sasha@example.com')
    await userEvent.type(screen.getByLabelText(/your message/i), 'Hello')
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => expect(fetchSpy).not.toHaveBeenCalled())
  })
})
