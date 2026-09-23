import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor } from './seo'

function setMeta(selector: string, attribute: string, value: string) {
  const element = document.head.querySelector(selector)
  if (element) element.setAttribute(attribute, value)
}

/**
 * Keeps the title, description and canonical in step as the visitor moves
 * around.
 *
 * The prerendered HTML already carries the right tags for the page that was
 * *entered*, which is what search engines and link previews read. This is for
 * everything after that: a visitor who navigates from Home to a product page
 * should not have Home's title in their tab or their history.
 */
export function PageMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = metaFor(pathname)
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[property="og:title"]', 'content', meta.title)
    setMeta('meta[property="og:description"]', 'content', meta.description)
    setMeta('meta[property="og:url"]', 'content', meta.url)
    setMeta('link[rel="canonical"]', 'href', meta.url)
  }, [pathname])

  return null
}
