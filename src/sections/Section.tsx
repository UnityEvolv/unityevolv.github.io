import type { ReactNode } from 'react'

interface SectionProps {
  /** Rendered as an `h2` and used as the section's accessible name. */
  title?: string
  intro?: string
  children: ReactNode
}

/**
 * A band of content under the hero: one rhythm of spacing and one width for
 * every page, so pages differ in what they say rather than in how they sit.
 */
export function Section({ title, intro, children }: SectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {title ? <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2> : null}
      {intro ? <p className="text-base-content/70 mt-3 max-w-2xl">{intro}</p> : null}
      <div className={title || intro ? 'mt-8' : undefined}>{children}</div>
    </section>
  )
}
