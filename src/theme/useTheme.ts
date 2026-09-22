import { useCallback, useState } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'ue-theme'

/**
 * The brand is dark-first, so dark is the default. The light theme is not
 * optional — the definition of done requires both — and a viewer's choice is
 * remembered per browser.
 *
 * Every storage access is guarded: reads and writes throw in a private window
 * and where site data is blocked, and the theme must still work there.
 */
function readStored(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => readStored() ?? currentTheme())

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next
    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not being able to remember the choice is not a reason to refuse it:
      // the theme still applies for this page view.
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark')
  }, [setTheme])

  return { theme, setTheme, toggleTheme }
}
