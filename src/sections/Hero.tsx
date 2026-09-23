import type { ReactNode } from 'react'

export interface HeroImage {
  src: string
  alt: string
}

interface HeroProps {
  /** Rendered as the page's `h1`. */
  headline: string
  /** One or two sentences under it. */
  sub?: string
  /** An eyebrow above the headline: a product status, a section name. */
  eyebrow?: ReactNode
  /** The actions row. Usually one `LinkButton` and a quieter second one. */
  actions?: ReactNode
  /**
   * The backdrop. Defaults to the site's own hero image, so every page has
   * one; pass another to override it, or `null` for a plain band.
   *
   * Decorative by default, so `alt` is empty and the picture never carries
   * meaning the words do not.
   */
  image?: HeroImage | null
}

/** Every page wears this unless it says otherwise. */
export const defaultHeroImage: HeroImage = { src: '/img/hero.webp', alt: '' }

/**
 * The top of a page. Only ever one per page, because it carries the `h1`.
 *
 * The picture sits behind the words under a scrim rather than beside them. The
 * scrim is what keeps the text at AA over an image whose colours nobody
 * controls — a photograph cannot be checked for contrast the way a token can,
 * so the contrast comes from the overlay instead.
 */
export function Hero({ headline, sub, eyebrow, actions, image = defaultHeroImage }: HeroProps) {
  return (
    <section className="border-base-300 relative isolate overflow-hidden border-b">
      {image ? (
        <>
          <img
            src={image.src}
            alt={image.alt}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            aria-hidden={image.alt === '' ? true : undefined}
          />
          <div className="bg-base-100/85 absolute inset-0 -z-10" />
        </>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        {eyebrow ? <div className="mb-4 flex items-center gap-2">{eyebrow}</div> : null}
        <h1 className="max-w-3xl text-4xl font-semibold text-balance sm:text-5xl">{headline}</h1>
        {sub ? <p className="text-base-content/80 mt-5 max-w-2xl text-lg">{sub}</p> : null}
        {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </section>
  )
}
