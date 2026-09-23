import { Link } from 'react-router-dom'

/**
 * UnityEvolv's own mark, from `public/img/logo.png`, beside the name in the
 * two tones the company has always written it in.
 *
 * The kit's `Brand` draws a generated monogram instead. That is right for a
 * product screen inside an app, and wrong here: this is the company's logo,
 * and a design system does not get to replace it.
 *
 * The link carries the whole name as its accessible name and the mark is
 * decorative, so a screen reader announces "Unity Evolv, home" once rather
 * than describing a picture and then spelling the name in two fragments.
 */
export function SiteLogo() {
  return (
    <Link
      to="/"
      aria-label="Unity Evolv, home"
      className="focus-visible:outline-focus inline-flex items-center gap-2 rounded focus-visible:outline-2 focus-visible:outline-offset-4"
    >
      <img src="/img/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
      <span aria-hidden="true" className="text-lg font-semibold tracking-tight">
        <span className="text-secondary">Unity</span>
        <span className="text-primary">Evolv</span>
      </span>
    </Link>
  )
}
