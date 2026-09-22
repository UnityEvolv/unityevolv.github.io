import { Button } from '@unityevolv/unitykit'
import { useTheme } from '../theme/useTheme'

/**
 * The kit has no sun or moon in its icon set — the names describe office jobs,
 * not drawings — so the control is labelled in words. That also states what
 * pressing it does, which an icon on its own never quite manages.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme}>
      {next === 'light' ? 'Light' : 'Dark'}
      <span className="sr-only"> theme</span>
    </Button>
  )
}
