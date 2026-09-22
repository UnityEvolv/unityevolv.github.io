import { Button } from '@unityevolv/unitykit'
import { useTheme } from './theme/useTheme'

/**
 * Placeholder page for the rewrite. It exists to prove the toolchain: unitykit
 * components render with brand styling, and both themes work. The real layout
 * and pages arrive in KAN-7 onwards, and this file goes with them.
 */
export function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <main className="min-h-dvh bg-base-100 text-base-content px-4 py-16">
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <h1 className="text-3xl font-semibold">Unity Evolv</h1>
        <p className="text-base-content/70">
          The website is being rebuilt on unitykit. This page checks that the kit's styling, tokens
          and both themes are wired up.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div>
          <Button variant="secondary" onClick={toggleTheme}>
            Switch to the {theme === 'dark' ? 'light' : 'dark'} theme
          </Button>
        </div>
      </div>
    </main>
  )
}
