import { CTABand } from '../sections/CTABand'
import { Hero } from '../sections/Hero'
import { LinkButton } from '../sections/LinkButton'
import { Section } from '../sections/Section'

/**
 * Who we are, told through what is on the table rather than adjectives.
 *
 * The old site's "from I to We" story went with the old products. Everything
 * claimed here can be checked by following a link, which is the only kind of
 * About page worth having.
 */
export function AboutPage() {
  return (
    <>
      <Hero
        headline="We build products, and we open the foundations."
        sub="UnityEvolv is a small team that builds its own products with AI, and builds other people's the same way."
      />

      <Section title="How we work">
        <div className="text-base-content/80 flex max-w-3xl flex-col gap-4 text-lg">
          <p>
            Every product we build stands on something we have already built and given away.
            ofiskit, the virtual office engine, is open source and running; unityofis is that engine
            with a company around it. unitykit, our design system, is on npm, and this website is
            built with it.
          </p>
          <p>
            That is deliberate. Open foundations mean the work has to be good enough to read, the
            boundaries have to be real rather than assumed, and a customer is never locked to us by
            anything except the fact that the product is good.
          </p>
          <p>
            AI is how we move quickly through the parts that are well understood. The architecture,
            the review and the decisions stay with people, and everything ships through the same
            tests and continuous integration either way.
          </p>
        </div>
      </Section>

      <Section
        title="Look at the work"
        intro="Both of these are public: the code, the pipeline and a running demo."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="https://unityevolv.com/ofis-kit/" variant="quiet">
            Try the ofiskit demo
          </LinkButton>
          <LinkButton href="https://unityevolv.com/unity-kit/" variant="quiet">
            Browse the unitykit components
          </LinkButton>
        </div>
      </Section>

      <CTABand
        title="Working on something?"
        body="We are happy to say whether we are the right people for it."
        actionLabel="Get in touch"
        actionHref="/contact"
      />
    </>
  )
}
