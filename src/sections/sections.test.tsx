import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import type { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { productBySlug } from '../content/products'
import { CTABand } from './CTABand'
import { FeatureGrid } from './FeatureGrid'
import { Hero } from './Hero'
import { LinkButton, isExternal } from './LinkButton'
import { ProductCard } from './ProductCard'
import { Section } from './Section'
import { StatusBadge } from './StatusBadge'

function renderRouted(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('Hero', () => {
  it('carries the page heading', () => {
    renderRouted(<Hero headline="One family. Every device." sub="Every platform." />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('One family. Every device.')
  })
})

describe('Section', () => {
  it('titles itself at heading level two', () => {
    renderRouted(
      <Section title="What it does" intro="The short version.">
        <p>Body</p>
      </Section>,
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('What it does')
  })
})

describe('FeatureGrid', () => {
  it('renders one card per feature and spans the wide one', () => {
    const { container } = renderRouted(
      <FeatureGrid
        features={[
          { title: 'Bring your own provider', body: 'No markup.', wide: true },
          { title: 'Rooms, not links', body: 'Walk in.' },
        ]}
      />,
    )

    expect(screen.getAllByRole('listitem')).toHaveLength(2)
    expect(container.querySelectorAll('.sm\\:col-span-2')).toHaveLength(1)
  })
})

describe('StatusBadge', () => {
  it('says the status in words rather than colour alone', () => {
    renderRouted(<StatusBadge status="coming-next" />)
    expect(screen.getByText('Coming next')).toBeInTheDocument()
  })
})

describe('LinkButton', () => {
  it('knows which links leave the site', () => {
    expect(isExternal('https://github.com/UnityEvolv/ofis-kit')).toBe(true)
    expect(isExternal('/contact?topic=unityofis')).toBe(false)
  })

  it('keeps an internal link client-side', () => {
    renderRouted(<LinkButton href="/contact">Talk to us</LinkButton>)
    expect(screen.getByRole('link', { name: 'Talk to us' })).toHaveAttribute('href', '/contact')
  })

  it('renders an external link as a plain anchor to the full URL', () => {
    renderRouted(<LinkButton href="https://unityevolv.com/ofis-kit/">Try the demo</LinkButton>)
    expect(screen.getByRole('link', { name: /try the demo/i })).toHaveAttribute(
      'href',
      'https://unityevolv.com/ofis-kit/',
    )
  })
})

describe('ProductCard', () => {
  it('links the product name to its page and shows its status', () => {
    const product = productBySlug('ofiskit')
    if (!product) throw new Error('ofiskit is missing from the content')

    renderRouted(<ProductCard product={product} />)

    expect(screen.getByRole('link', { name: 'Read about OfisKit' })).toHaveAttribute(
      'href',
      '/products/ofiskit',
    )
    expect(screen.getByText('Open source')).toBeInTheDocument()
  })

  it('keeps one link per card, so a list is one tab stop per product', () => {
    const product = productBySlug('unityofis')
    if (!product) throw new Error('unityofis is missing from the content')

    const { container } = renderRouted(<ProductCard product={product} />)
    expect(within(container).getAllByRole('link')).toHaveLength(1)
  })
})

describe('CTABand', () => {
  it('offers the next step', () => {
    renderRouted(
      <CTABand title="Tell us about your idea" actionLabel="Get in touch" actionHref="/contact" />,
    )
    expect(screen.getByRole('link', { name: 'Get in touch' })).toHaveAttribute('href', '/contact')
  })
})
