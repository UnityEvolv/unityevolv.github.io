/**
 * The form service a submission is posted to, or nothing.
 *
 * Read when it is needed rather than once at module load, so a test can set
 * it — and so the answer cannot be captured before the environment is ready.
 * GitHub Pages runs no server code, so this is a form service such as
 * Formspree or Web3Forms; keeping it in a build variable keeps the account out
 * of the repository.
 */
export function contactEndpoint(): string | undefined {
  return import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
}

export interface ContactMessage {
  name: string
  email: string
  topic: string
  message: string
}

export const topics = [
  { value: 'build', label: 'Building a product with AI' },
  { value: 'unityofis', label: 'unityofis' },
  { value: 'unityprotect', label: 'UnityProtect' },
  { value: 'ofiskit', label: 'ofiskit' },
  { value: 'unitykit', label: 'unitykit' },
  { value: 'fastportfolio', label: 'FastPortfolio' },
  { value: 'other', label: 'Something else' },
]

export function topicLabel(value: string): string {
  return topics.find((topic) => topic.value === value)?.label ?? 'Something else'
}

/**
 * The inbox, assembled rather than written out.
 *
 * Every page is prerendered, so a literal address would sit in the published
 * HTML for any scraper that fetches the page without running JavaScript. This
 * puts it together at runtime instead. It is a speed bump, not protection —
 * anyone reading the bundle finds it — but it costs nothing and removes the
 * easiest way to harvest it.
 */
export function inboxAddress(): string {
  return ['n.vamsiram', 'unityevolv.com'].join('@')
}

/**
 * The `mailto:` a submission becomes when no form service is configured.
 *
 * The visitor's own mail client sends it, which means it arrives from their
 * address and they keep a copy in their sent folder — better than a form
 * service in that one respect, and worse in every other, which is why this is
 * the fallback rather than the plan.
 */
export function mailtoFor({ name, email, topic, message }: ContactMessage): string {
  const subject = `${topicLabel(topic)} — enquiry from ${name || 'the website'}`
  const body = [
    message,
    '',
    '—',
    `From: ${name}`,
    `Reply to: ${email}`,
    `About: ${topicLabel(topic)}`,
  ].join('\n')

  return `mailto:${inboxAddress()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
