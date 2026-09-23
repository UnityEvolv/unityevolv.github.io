import { Link } from 'react-router-dom'
import { Icon } from '@unityevolv/unitykit'
import type { ReactNode } from 'react'

export type LinkButtonVariant = 'primary' | 'secondary' | 'quiet'

interface LinkButtonProps {
  href: string
  variant?: LinkButtonVariant
  children: ReactNode
}

/** A link is external when it leaves this site, which is what decides the element. */
export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href)
}

/**
 * A link that looks like a button.
 *
 * The kit's `Button` is a real `<button>` — no `asChild`, no `href` — and a
 * `<button>` inside an `<a>` is invalid, so a call to action that navigates
 * cannot be one. Rather than hand a click handler to a button, which loses
 * middle-click, open-in-new-tab and the link's own semantics, the element is
 * an anchor styled from the kit's **tokens**. It deliberately does not borrow
 * daisyUI's `btn` classes: the kit's rule is that a consumer never writes a
 * daisyUI class name, and a copy of the button's appearance here would drift
 * from the real one.
 *
 * A link-shaped button belongs in unitykit, and UKIT-33 proposes it. When that
 * lands this component becomes a thin wrapper over it.
 *
 * Every class name is written out in full: Tailwind reads built files as
 * static text, so an assembled name produces no CSS and nothing errors.
 */
const variantClasses: Record<LinkButtonVariant, string> = {
  primary:
    'bg-primary text-primary-content hover:bg-primary-hover focus-visible:outline-focus inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2',
  secondary:
    'bg-secondary text-secondary-content hover:bg-secondary-hover focus-visible:outline-focus inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2',
  quiet:
    'border-line text-base-content hover:bg-base-200 focus-visible:outline-focus inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2',
}

export function LinkButton({ href, variant = 'primary', children }: LinkButtonProps) {
  const className = variantClasses[variant]

  if (isExternal(href)) {
    return (
      <a href={href} className={className}>
        {children}
        <Icon name="external-link" size="sm" />
      </a>
    )
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  )
}
