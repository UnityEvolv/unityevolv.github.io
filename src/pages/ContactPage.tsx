import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Alert, Button, Input, Select, Textarea } from '@unityevolv/unitykit'
import { Hero } from '../sections/Hero'
import { Section } from '../sections/Section'

type SendState = 'idle' | 'sending' | 'sent' | 'failed'

/**
 * The endpoint a submission is posted to, supplied at build time.
 *
 * GitHub Pages cannot run server code, so the form needs a form service such
 * as Formspree or Web3Forms. The URL is configuration rather than code: it is
 * a build-time variable, which keeps the account out of the repository and
 * lets the endpoint change without a code change.
 *
 * With nothing configured the form says so plainly instead of pretending to
 * send. A form that silently swallows a message is worse than no form, and
 * that is exactly what the old Bootstrap site did with `action="#"`.
 */
const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined

const topics = [
  { value: 'build', label: 'Building a product with AI' },
  { value: 'unityofis', label: 'unityofis' },
  { value: 'unityprotect', label: 'UnityProtect' },
  { value: 'ofiskit', label: 'ofiskit' },
  { value: 'unitykit', label: 'unitykit' },
  { value: 'fastportfolio', label: 'FastPortfolio' },
  { value: 'other', label: 'Something else' },
]

export function ContactPage() {
  const [params] = useSearchParams()
  const requested = params.get('topic')
  const initialTopic = topics.some((topic) => topic.value === requested) ? requested : 'build'

  const [state, setState] = useState<SendState>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!endpoint) return

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
          {!endpoint ? (
            <Alert variant="warn" title="This form is not connected yet" className="mb-6">
              The form service has not been configured, so a message sent here would go nowhere.
              Until it is, please reach us through GitHub.
            </Alert>
          ) : null}

          {state === 'sent' ? (
            <Alert variant="ok" title="Message sent" className="mb-6">
              Thank you — we will come back to you.
            </Alert>
          ) : null}

          {state === 'failed' ? (
            <Alert variant="danger" title="That did not send" className="mb-6">
              Something went wrong on the way. Please try again in a moment.
            </Alert>
          ) : null}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate={false}>
            <Input name="name" label="Your name" required autoComplete="name" />
            <Input
              name="email"
              type="email"
              label="Email address"
              required
              autoComplete="email"
              help="So we can reply."
            />
            <Select name="topic" label="What is it about?" defaultValue={initialTopic ?? 'build'}>
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

            <div>
              <Button type="submit" variant="primary" loading={state === 'sending'}>
                Send message
              </Button>
            </div>
          </form>
        </div>
      </Section>
    </>
  )
}
