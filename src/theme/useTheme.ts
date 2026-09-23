import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'ue-theme'

/**
 * The theme lives on the document, not in React state.
 *
 * `index.html` applies the remembered choice before first paint, so by the
 * time React runs the answer is already on `<html data-theme>`. Copying it
 * into state and syncing the two is how a theme toggle ends up flickering;
 * `useSyncExternalStore` reads the real thing instead, and takes the
 * hydration problem with it: `getServerSnapshot` is what the prerender and
 * the browser's first pass both use, so the markup matches, and React then
 * re-reads the document.
 *
 * Every storage access is guarded, because reads and writes throw in a
 * private window and where site data is blocked, and the theme must still
 * work there.
 */
const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function documentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/** Dark is the brand default, and the only honest answer with no document. */
function serverTheme(): Theme {
  return 'dark'
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, documentTheme, serverTheme)

  const setTheme = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not being able to remember the choice is not a reason to refuse it:
      // the theme still applies for this page view.
    }
    for (const listener of listeners) listener()
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(documentTheme() === 'dark' ? 'light' : 'dark')
  }, [setTheme])

  return { theme, setTheme, toggleTheme }
}
