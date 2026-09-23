import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Button, Input, Select, Textarea } from '@unityevolv/unitykit'
import { Hero } from '../sections/Hero'
import { Section } from '../sections/Section'
import { contactEndpoint, mailtoFor, topics } from './contactMessage'

type SendState = 'idle' | 'sending' | 'sent' | 'failed' | 'handed-to-mail-client'

/**
 * The endpoint a submission is posted to, supplied at build time.
 *
 * GitHub Pages cannot run server code, so the form needs a form service such
 * as Formspree or Web3Forms. The URL is configuration rather than code: it is
 * a build-time variable, which keeps the account out of the repository and
 * lets the endpoint change without a code change.
 *
 * With nothing configured the form hands the message to the visitor's mail
 * client instead (KAN-23). What it never does is accept a message and drop it:
 * the old Bootstrap site's `action="#"` swallowed every enquiry silently, and
 * a form that looks like it worked is worse than no form.
 */
export function ContactPage() {
  const [params] = useSearchParams()
  const requested = params.get('topic')
  const initialTopic = topics.some((topic) => topic.value === requested) ? requested : 'build'

  const endpoint = contactEndpoint()
  const [state, setState] = useState<SendState>('idle')

  /**
   * The topic from `?topic=`, applied after mount.
   *
   * This page is prerendered, and the prerender has no query string, so the
   * built HTML always carries `build`. An uncontrolled `defaultValue` is only
   * read when the element is created, so hydrating over that markup left every
   * product's "Talk to us" landing on the wrong topic — the markup wins, and
   * nothing errors.
   *
   * Setting the DOM value in an effect keeps the server and client markup
   * identical, which is what hydration needs, and still leaves the field
   * uncontrolled so a visitor's own choice is never overwritten by a render.
   */
  const topicRef = useRef<HTMLSelectElement>(null)
  useEffect(() => {
    if (initialTopic && topicRef.current) topicRef.current.value = initialTopic
  }, [initialTopic])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    // A honeypot: a field no person can see and every bot fills in. Pretending
    // the send succeeded is deliberate — telling a bot it was caught only
    // teaches whoever wrote it to avoid the trap next time.
    if (data.get('company')) {
      setState('sent')
      form.reset()
      return
    }

    if (!endpoint) {
      window.location.href = mailtoFor({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        topic: String(data.get('topic') ?? 'build'),
        message: String(data.get('message') ?? ''),
      })
      setState('handed-to-mail-client')
      return
    }

    setState('sending')
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(`The form service answered ${response.status}`)
      setState('sent')
      form.reset()
    } catch {
      // Nothing about the person goes into the log: a failed send is about the
      // endpoint, not about them.
      setState('failed')
    }
  }

  return (
    <>
      <Hero
        headline="Tell us what you are working on"
        sub="A few lines is enough to start. We answer every message ourselves."
      />

      <Section>
        <div className="max-w-xl">
          {state === 'sent' ? (
            <Alert variant="ok" title="Message sent" className="mb-6">
              Thank you — we will come back to you.
            </Alert>
          ) : null}

          {state === 'handed-to-mail-client' ? (
            <Alert variant="info" title="Your email app should be opening" className="mb-6">
              Everything you wrote is already in the draft. Press send there and it reaches us. If
              nothing opened, your browser may have no mail app set up.
            </Alert>
          ) : null}

          {state === 'failed' ? (
            <Alert variant="danger" title="That did not send" className="mb-6">
              Something went wrong on the way. Please try again in a moment.
            </Alert>
          ) : null}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input name="name" label="Your name" required autoComplete="name" />
            <Input
              name="email"
              type="email"
              label="Email address"
              required
              autoComplete="email"
              help="So we can reply."
            />
            <Select ref={topicRef} name="topic" label="What is it about?" defaultValue="build">
              {topics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </Select>
            <Textarea name="message" label="Your message" rows={6} required />

            {/* The honeypot. Hidden from sight and from assistive technology, and
                skipped in the tab order, so only a bot ever fills it in. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-2">
              <Button type="submit" variant="primary" loading={state === 'sending'}>
                {endpoint ? 'Send message' : 'Write this in your email app'}
              </Button>
              {!endpoint ? (
                <p className="text-base-content/70 text-sm">
                  This opens your own email app with the message ready to send, so you can see
                  exactly what reaches us.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </Section>
    </>
  )
}
