import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { legacyHashDestination } from './legacy'

/**
 * Sends a visitor who arrives on an anchor from the old single-page site to
 * the page that replaced it. Old *paths* are redirected as routes instead —
 * see `src/legacy.ts` for why.
 *
 * It replaces the history entry rather than pushing one, so Back returns to
 * wherever the visitor came from instead of bouncing them through the
 * redirect again.
 */
export function LegacyRedirects() {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const destination = legacyHashDestination(pathname, hash)
    if (destination) navigate(destination, { replace: true })
  }, [pathname, hash, navigate])

  return null
}
