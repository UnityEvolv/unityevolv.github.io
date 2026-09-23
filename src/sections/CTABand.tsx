import { LinkButton } from './LinkButton'

interface CTABandProps {
  title: string
  body?: string
  actionLabel: string
  actionHref: string
}

/**
 * The closing ask on a page. One per page, and always the same shape, so a
 * visitor who has read to the bottom knows where the next step is.
 */
export function CTABand({ title, body, actionLabel, actionHref }: CTABandProps) {
  return (
    <section className="bg-base-200 border-base-300 border-y">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
          {body ? <p className="text-base-content/70 mt-2 max-w-xl">{body}</p> : null}
        </div>
        <LinkButton href={actionHref}>{actionLabel}</LinkButton>
      </div>
    </section>
  )
}
