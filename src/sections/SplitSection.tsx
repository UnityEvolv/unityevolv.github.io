import type { ReactNode } from 'react'

interface SplitSectionProps {
  /** Rendered as an `h2`, in the column beside the picture. */
  title: string
  intro?: string
  /** Usually a `LinkButton`. */
  actions?: ReactNode
  image: { src: string; alt: string }
  /** `end` puts the picture on the right, which is the default. */
  imageSide?: 'start' | 'end'
}

/**
 * Words on one side, a picture on the other.
 *
 * The heading belongs *inside* the columns rather than above them. With the
 * heading above, the text column holds only a button, which then floats in the
 * middle of a tall empty space beside a large picture — which is exactly how
 * the home page's services band looked before this existed.
 *
 * Below `sm` the two stack, words first: the picture is decoration, and
 * decoration does not go before the point on a phone.
 */
export function SplitSection({
  title,
  intro,
  actions,
  image,
  imageSide = 'end',
}: SplitSectionProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <div className="grid items-center gap-8 sm:grid-cols-2">
        <div className={imageSide === 'start' ? 'sm:order-2' : undefined}>
          <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
          {intro ? <p className="text-base-content/70 mt-3">{intro}</p> : null}
          {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        <img
          src={image.src}
          alt={image.alt}
          width={1200}
          height={1200}
          loading="lazy"
          className={
            imageSide === 'start'
              ? 'border-base-300 w-full rounded-lg border sm:order-1'
              : 'border-base-300 w-full rounded-lg border'
          }
        />
      </div>
    </section>
  )
}
