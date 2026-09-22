import type { ReactNode } from 'react'

interface HeroProps {
  /** Rendered as the page's `h1`. */
  headline: string
  /** One or two sentences under it. */
  sub?: string
  /** An eyebrow above the headline: a product status, a section name. */
  eyebrow?: ReactNode
  /** The actions row. Usually one `LinkButton` and a quieter second one. */
  actions?: ReactNode
}

/**
 * The top of a page. Only ever one per page, because it carries the `h1`.
 */
export function Hero({ headline, sub, eyebrow, actions }: HeroProps) {
  return (
    <section className="border-base-300 border-b">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
        {eyebrow ? <div className="mb-4 flex items-center gap-2">{eyebrow}</div> : null}
        <h1 className="max-w-3xl text-4xl font-semibold text-balance sm:text-5xl">{headline}</h1>
        {sub ? <p className="text-base-content/70 mt-5 max-w-2xl text-lg">{sub}</p> : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  )
}
