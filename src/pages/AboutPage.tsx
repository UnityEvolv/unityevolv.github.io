import { howWeWork, mission } from '../content/company'
import { CTABand } from '../sections/CTABand'
import { Hero } from '../sections/Hero'
import { LinkButton } from '../sections/LinkButton'
import { Section } from '../sections/Section'

/**
 * Who we are, in the company's own words.
 *
 * The story headline and paragraph are carried over from the previous site
 * unchanged — they are Vamsi's, and a rewrite of the site is not a rewrite of
 * what it says. What follows them is how that mission shows up in the work,
 * which is the part a visitor can go and check.
 */
export function AboutPage() {
  return (
    <>
      <Hero headline={mission.storyHeadline} sub={mission.story} />

      <Section>
        <div className="grid items-center gap-8 sm:grid-cols-2">
          <img
            src="/img/about.webp"
            alt="A crowd of people from many backgrounds, laughing together"
            width={1200}
            height={1200}
            className="border-base-300 rounded-lg border"
          />
          <p className="text-base-content/80 text-lg">{mission.statement}</p>
        </div>
      </Section>

      <Section title="How that works in practice">
        <div className="text-base-content/80 flex max-w-3xl flex-col gap-4 text-lg">
          {howWeWork.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </Section>

      <Section
        title="Look at the work"
        intro="Both of these are public: the code, the pipeline and a running demo."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="https://unityevolv.com/ofis-kit/" variant="quiet">
            Try the OfisKit demo
          </LinkButton>
          <LinkButton href="https://unityevolv.com/unity-kit/" variant="quiet">
            Browse the UnityKit components
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
