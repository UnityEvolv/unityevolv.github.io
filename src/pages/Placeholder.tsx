interface PlaceholderProps {
  title: string
  story: string
}

/**
 * A named route that has no page yet. Each one is replaced by its own story,
 * so the navigation is complete and nothing in the navbar leads nowhere while
 * the rewrite is in progress.
 */
export function Placeholder({ title, story }: PlaceholderProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="text-base-content/70 mt-3">This page arrives with {story}.</p>
    </section>
  )
}
