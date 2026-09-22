import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { Layout } from './Layout'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<p>Home page</p>} />
          <Route path="products" element={<p>Products page</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  )
}

describe('Layout', () => {
  beforeEach(() => {
    document.documentElement.dataset.theme = 'dark'
    localStorage.clear()
  })

  it('renders the page inside the main landmark', () => {
    renderAt('/')
    expect(within(screen.getByRole('main')).getByText('Home page')).toBeInTheDocument()
  })

  it('marks the current page in the navbar', () => {
    renderAt('/products')

    const primary = screen.getAllByRole('navigation', { name: 'Primary' })[0]
    expect(within(primary).getByRole('link', { name: 'Products' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  })

  it('opens the mobile menu and closes it on navigation', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.click(screen.getByRole('button', { name: 'Open the menu' }))

    const dialog = screen.getByRole('dialog')
    await user.click(within(dialog).getByRole('link', { name: 'Products' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.getByText('Products page')).toBeInTheDocument()
  })

  it('closes the mobile menu with Escape', async () => {
    const user = userEvent.setup()
    renderAt('/')

    await user.click(screen.getByRole('button', { name: 'Open the menu' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('offers the footer links to the open-source sites', () => {
    renderAt('/')

    const footer = screen.getByRole('contentinfo')
    expect(within(footer).getByRole('link', { name: /ofiskit demo/ })).toHaveAttribute(
      'href',
      'https://unityevolv.com/ofis-kit/',
    )
    expect(within(footer).getByRole('link', { name: /unitykit components/ })).toHaveAttribute(
      'href',
      'https://unityevolv.com/unity-kit/',
    )
  })
})
