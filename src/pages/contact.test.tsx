import { act, render, screen, waitFor } from '@testing-library/react'
import { hydrateRoot } from 'react-dom/client'
import { renderToString } from 'react-dom/server'
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

async function fillIn() {
  await userEvent.type(screen.getByLabelText(/your name/i), 'Sasha Kim')
  await userEvent.type(screen.getByLabelText(/email address/i), 'sasha@example.com')
  await userEvent.type(screen.getByLabelText(/your message/i), 'Four devices, three sets of rules.')
}

describe('Contact page, with no form service configured', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
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

  it('says the message will go through the visitor’s own email app', () => {
    renderAt('/contact')
    expect(
      screen.getByRole('button', { name: /write this in your email app/i }),
    ).toBeInTheDocument()
  })

  it('hands a completed message to the mail client, and posts nowhere', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)

    // jsdom has no navigation, so the assignment is captured rather than followed.
    const assigned: string[] = []
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...window.location,
        set href(value: string) {
          assigned.push(value)
        },
        get href() {
          return 'http://localhost/contact'
        },
      },
    })

    renderAt('/contact?topic=unityofis')
    await fillIn()
    await userEvent.click(screen.getByRole('button', { name: /write this in your email app/i }))

    await waitFor(() => expect(assigned).toHaveLength(1))
    expect(assigned[0]).toContain('mailto:n.vamsiram@unityevolv.com')
    expect(decodeURIComponent(assigned[0])).toContain('unityofis')
    expect(decodeURIComponent(assigned[0])).toContain('Four devices')
    expect(fetchSpy).not.toHaveBeenCalled()

    expect(await screen.findByText(/your email app should be opening/i)).toBeInTheDocument()
  })

  it('never opens a mail client for a bot that fills the honeypot', async () => {
    const assigned: string[] = []
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...window.location,
        set href(value: string) {
          assigned.push(value)
        },
        get href() {
          return 'http://localhost/contact'
        },
      },
    })

    const { container } = renderAt('/contact')
    await fillIn()

    const honeypot = container.querySelector('#company') as HTMLInputElement
    await userEvent.type(honeypot, 'Acme Ltd')
    await userEvent.click(screen.getByRole('button', { name: /write this in your email app/i }))

    await waitFor(() => expect(screen.getByText(/message sent/i)).toBeInTheDocument())
    expect(assigned).toHaveLength(0)
  })
})

describe('Contact page, with a form service configured', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('posts the message and never opens a mail client', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://formspree.test/f/abc123')
    const fetchSpy = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchSpy)

    renderAt('/contact')
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()

    await fillIn()
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => expect(fetchSpy).toHaveBeenCalledTimes(1))
    const [url, init] = fetchSpy.mock.calls[0]
    expect(url).toBe('https://formspree.test/f/abc123')
    expect((init as RequestInit).method).toBe('POST')
    expect(await screen.findByText(/message sent/i)).toBeInTheDocument()
  })

  it('says so when the form service rejects it, rather than claiming success', async () => {
    vi.stubEnv('VITE_CONTACT_ENDPOINT', 'https://formspree.test/f/abc123')
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }))

    renderAt('/contact')
    await fillIn()
    await userEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(await screen.findByText(/that did not send/i)).toBeInTheDocument()
  })
})

describe('Contact page, hydrated over prerendered markup', () => {
  // The bug this exists for: the page is prerendered without a query string,
  // so the built HTML always carries the default topic. An uncontrolled
  // defaultValue is read only when the element is created, so hydrating over
  // that markup left every product's "Talk to us" on the wrong topic. Nothing
  // errored, and a client-only render — which is what every other test does —
  // could not see it.
  it('still applies ?topic= from the URL', async () => {
    const path = '/contact?topic=unityprotect'

    const html = renderToString(
      <MemoryRouter initialEntries={[path]}>
        <AppRoutes />
      </MemoryRouter>,
    )
    expect(html).toContain('value="build" selected')

    const container = document.createElement('div')
    container.innerHTML = html
    document.body.appendChild(container)

    await act(async () => {
      hydrateRoot(
        container,
        <MemoryRouter initialEntries={[path]}>
          <AppRoutes />
        </MemoryRouter>,
      )
    })

    const select = container.querySelector('select[name="topic"]') as HTMLSelectElement
    expect(select.value).toBe('unityprotect')

    container.remove()
  })
})
