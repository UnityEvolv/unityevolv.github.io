import { Accordion, Stepper } from '@unityevolv/unitykit'
import { productBuildingService as service } from '../content/services'
import { CTABand } from '../sections/CTABand'
import { Hero } from '../sections/Hero'
import { LinkButton } from '../sections/LinkButton'
import { Section } from '../sections/Section'

/**
 * The one service: building a product from scratch with AI.
 *
 * The Stepper is a picture of a process here, not a control: nothing is
 * clickable. `current` is the first step, so the stages read as a journey
 * that starts at Discover. Putting it past the last step instead would tick
 * all four, which reads as work already finished rather than work on offer.
 */
export function ServicesPage() {
  return (
    <>
      <Hero
        headline={service.headline}
        sub={service.intro}
        actions={<LinkButton href="/contact?topic=build">Tell us about your idea</LinkButton>}
      />

      <Section title="How it works" intro="Four stages, and you can stop after any of them.">
        <Stepper
          label="How a project runs"
          orientation="responsive"
          current={0}
          steps={service.steps.map((step) => ({
            key: step.title,
            label: step.title,
            description: step.body,
          }))}
        />
      </Section>

      <Section
        title="What we have built this way"
        intro="Our own products, in the open, with public code and public CI. The same way of working is what you get."
      >
        <div className="flex flex-wrap gap-3">
          <LinkButton href="/products/ofiskit" variant="quiet">
            OfisKit, the open-source virtual office
          </LinkButton>
          <LinkButton href="/products/unitykit" variant="quiet">
            UnityKit, the design system this site uses
          </LinkButton>
        </div>
      </Section>

      <Section title="Who it is for">
        <ul className="text-base-content/80 flex max-w-2xl flex-col gap-3">
          {service.audience.map((line) => (
            <li key={line} className="border-base-300 border-l-2 pl-4">
              {line}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Questions">
        <div className="max-w-3xl">
          <Accordion
            headingLevel={3}
            items={service.faqs.map((faq) => ({
              value: faq.question,
              title: faq.question,
              content: faq.answer,
            }))}
          />
        </div>
      </Section>

      <CTABand
        title="Tell us about your idea"
        body="What you are trying to build, and who it is for. We will tell you what we would do first."
        actionLabel="Start the conversation"
        actionHref="/contact?topic=build"
      />
    </>
  )
}
