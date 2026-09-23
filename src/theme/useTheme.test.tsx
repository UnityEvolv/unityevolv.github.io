import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTheme } from './useTheme'

describe('useTheme', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.dataset.theme = 'dark'
  })

  it('reports the dark default', () => {
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
  })

  it('reads the theme from the document, which the inline script has already set', () => {
    // index.html applies the remembered choice before first paint. The hook
    // reads the document rather than storage, so there is one answer rather
    // than two that can disagree.
    document.documentElement.dataset.theme = 'light'
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('light')
  })

  it('toggles the document theme and remembers it', () => {
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggleTheme())

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('ue-theme')).toBe('light')
  })

  it('tells every component about a change, not just the one that made it', () => {
    // The navbar's toggle and anything else reading the theme are separate
    // subscribers; a change made in one has to reach the others.
    const first = renderHook(() => useTheme())
    const second = renderHook(() => useTheme())

    act(() => first.result.current.setTheme('light'))

    expect(second.result.current.theme).toBe('light')
  })

  it('still applies the theme when storage throws', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('site data blocked')
    })

    const { result } = renderHook(() => useTheme())
    act(() => result.current.toggleTheme())

    expect(document.documentElement.dataset.theme).toBe('light')
    vi.restoreAllMocks()
  })
})
