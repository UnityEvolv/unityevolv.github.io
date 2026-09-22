import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { App } from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
  })

  it('renders unitykit buttons as real buttons', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'Primary' })).toBeInTheDocument()
  })

  it('switches the theme from the toggle', async () => {
    render(<App />)

    await userEvent.click(screen.getByRole('button', { name: /switch to the light theme/i }))

    expect(document.documentElement.dataset.theme).toBe('light')
    expect(screen.getByRole('button', { name: /switch to the dark theme/i })).toBeInTheDocument()
  })
})
