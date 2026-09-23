import { describe, expect, it } from 'vitest'
import { inboxAddress, mailtoFor, topicLabel } from './contactMessage'

describe('the contact mailto', () => {
  const message = {
    name: 'Sasha Kim',
    email: 'sasha@example.com',
    topic: 'unityprotect',
    message: 'We have four devices and three sets of rules.',
  }

  it('goes to the UnityEvolv inbox', () => {
    expect(mailtoFor(message).startsWith(`mailto:${inboxAddress()}`)).toBe(true)
    expect(inboxAddress()).toBe('n.vamsiram@unityevolv.com')
  })

  it('names the topic in the subject', () => {
    const subject = decodeURIComponent(/subject=([^&]*)/.exec(mailtoFor(message))?.[1] ?? '')
    expect(subject).toContain('UnityProtect')
    expect(subject).toContain('Sasha Kim')
  })

  it('carries the message and how to reply', () => {
    const body = decodeURIComponent(/body=(.*)$/.exec(mailtoFor(message))?.[1] ?? '')
    expect(body).toContain('four devices')
    expect(body).toContain('sasha@example.com')
  })

  it('escapes what a visitor types, so a line break cannot forge a header', () => {
    const forged = mailtoFor({
      ...message,
      message: 'Hello\nBcc: someone@example.com',
    })
    expect(forged).not.toContain('\n')
    expect(forged).toContain('%0A')
  })

  it('still produces a usable subject when the name is blank', () => {
    const subject = decodeURIComponent(
      /subject=([^&]*)/.exec(mailtoFor({ ...message, name: '' }))?.[1] ?? '',
    )
    expect(subject).toContain('the website')
  })

  it('falls back to a real label for an unknown topic', () => {
    expect(topicLabel('not-a-topic')).toBe('Something else')
  })
})
