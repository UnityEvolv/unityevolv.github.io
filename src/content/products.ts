import type { Product, ProductStatus } from './types'

/**
 * The product line-up, in the order it appears on the Products page.
 *
 * Two names are spelled deliberately: **unityofis** is lower case, matching the
 * repository and the kit's `Brand` product name, and **UnityProtect** is camel
 * case. VSamstha was the old name for unityofis and is not used anywhere.
 *
 * Note on the two unreleased products: neither has a launch route yet, so the
 * call to action is "Talk to us", pointing at the contact form with the topic
 * preselected. Swapping either for a waitlist is a change to `links` here.
 */
export const products: Product[] = [
  {
    name: 'unityofis',
    slug: 'unityofis',
    status: 'in-development',
    tagline: 'A virtual office that runs on your own provider account.',
    intro:
      "Your team works in an office drawn as rooms. See who's in which room, walk in to talk, share your screen, knock on a door that's closed, and step into the break room when you don't want to be disturbed. It runs in the browser, as a desktop app, and on Android.",
    body: [
      "What makes it different: every other virtual office locks you into their video provider and marks up the cost. unityofis lets your company bring its own account — LiveKit, Daily, Agora or Microsoft Teams for calls, Ably for chat — and pay the provider's own price directly. Switch whenever you like; nothing in the office changes.",
      'A built-in peer-to-peer mode is included free for small rooms, so a small team needs nothing else.',
    ],
    features: [
      {
        title: 'Bring your own provider',
        body: 'Your account, your price, no markup, no lock-in. Switch providers whenever you like and nothing in the office changes.',
        wide: true,
      },
      {
        title: 'Rooms, not links',
        body: 'Presence you can see, and conversations you can walk into.',
      },
      {
        title: 'Built for companies',
        body: 'Microsoft sign-in, user provisioning, roles, guests and audit logs.',
      },
      {
        title: 'Private by design',
        body: "Team insights are aggregate only — no one's individual activity is shown to their manager.",
      },
    ],
    links: [{ label: 'Talk to us', href: '/contact?topic=unityofis', primary: true }],
    aside: {
      title: 'The engine is open source',
      body: 'unityofis is a wrapper around ofiskit, which is open source and free to run yourself. The product adds organisations, roles, more providers and the infrastructure behind them — the office itself is the same code.',
      link: { label: 'Look at ofiskit', href: '/products/ofiskit' },
    },
    metaDescription:
      'unityofis is a virtual office that runs on your own video and chat provider account — rooms you can walk into, no markup and no lock-in.',
  },
  {
    name: 'ofiskit',
    slug: 'ofiskit',
    status: 'open-source',
    tagline: 'The office itself, free to run anywhere.',
    intro:
      "ofiskit is the engine behind unityofis, and it's open source. One office, rooms, presence, lock and knock, custom status, and four-person peer-to-peer calls with screen share, raised hands and reactions. No accounts, no database. Enter an email and a name and you're in. Run it with a single command, or build your own product on top of it.",
    body: [
      'The demo runs the whole office in your browser, because there is no hosted server. The first tab hosts the office and every other tab joins it, so a second tab is a second person and the calls between them are real WebRTC. A few simulated colleagues walk between rooms and knock on locked doors, so the office is never empty.',
    ],
    links: [
      { label: 'Try the demo', href: 'https://unityevolv.com/ofis-kit/', primary: true },
      { label: 'View on GitHub', href: 'https://github.com/UnityEvolv/ofis-kit' },
    ],
    heroNote:
      'The demo runs entirely in your browser: open it in a second tab and that tab is a second person, with a real call between them. A few simulated colleagues keep the office busy.',
    aside: {
      title: 'Hosted, with your company around it',
      body: 'unityofis is ofiskit with organisations, roles, guests, audit logs and your choice of call provider behind it — for teams who would rather not run the office themselves.',
      link: { label: 'Look at unityofis', href: '/products/unityofis' },
    },
    licence:
      'AGPL-3.0-only for the app, the server and the UI packages; Apache-2.0 for the three interface packages, so writing an adapter is not a licensing decision.',
    metaDescription:
      'ofiskit is the open-source virtual office engine behind unityofis: rooms, presence, knocking and four-person calls, running anywhere you host it.',
  },
  {
    name: 'unitykit',
    slug: 'unitykit',
    status: 'open-source',
    tagline: 'The design system behind everything UnityEvolv builds.',
    intro:
      'unitykit is the shared React component library our products are built from, on Tailwind CSS v4 and daisyUI 5. It ships components, a theme and its tokens, in light and dark, and knows nothing about any app that uses it. This website is built with it.',
    features: [
      {
        title: 'Contrast is a build gate',
        body: 'Every colour pair is checked for WCAG AA in both themes, hover states included. A colour that breaks it fails the pull request.',
      },
      {
        title: 'Invalid combinations do not compile',
        body: 'Variants are declared in one config and the prop types come from it, so a size or colour that does not exist is a type error, not a class name that silently produces no CSS.',
      },
      {
        title: 'Tokens as plain data',
        body: 'The palette is published as JSON as well as CSS, so a native app, a design tool or an email template can read it with no build step.',
      },
    ],
    links: [
      { label: 'Browse the components', href: 'https://unityevolv.com/unity-kit/', primary: true },
      { label: 'View on GitHub', href: 'https://github.com/UnityEvolv/unity-kit' },
      { label: 'npm', href: 'https://www.npmjs.com/package/@unityevolv/unitykit' },
    ],
    licence: 'MIT.',
    metaDescription:
      'unitykit is UnityEvolv’s open-source React design system on Tailwind v4 and daisyUI, with contrast checked in CI and tokens published as plain data.',
  },
  {
    name: 'UnityProtect',
    slug: 'unityprotect',
    status: 'coming-next',
    tagline: 'One family. Every device. One set of rules.',
    intro:
      'Families today juggle phones, tablets, laptops, desktops and smart TVs, and every platform comes with its own parental controls. UnityProtect brings them all under one roof.',
    body: [
      'Install a lightweight agent on each device, and manage your whole family from a single dashboard. Policies follow the person, not the device: set "2 hours of social media a day" once, and it applies across your child\'s phone, laptop and browser combined. There are no loopholes from switching devices.',
      'Built-in tools like Family Link and Screen Time each cover only their own ecosystem. UnityProtect gives you one consistent set of rules across every platform your family uses.',
    ],
    features: [
      {
        title: 'Shared time limits',
        body: "Daily caps count usage across all of a member's devices together.",
      },
      {
        title: 'Ready-made policies',
        body: 'Apply presets like School Night, Homework Mode, Dinner Time or Free Weekend in one tap, or customise your own.',
      },
      {
        title: 'Family devices',
        body: 'Shared devices like the family TV or home laptop get their own rules.',
      },
      {
        title: 'Safety essentials',
        body: 'App and website blocking, content filtering, install approvals, location, remote lock, and activity reports.',
      },
      {
        title: 'Works everywhere',
        body: 'Android, iOS, Windows, macOS and the web.',
      },
    ],
    links: [{ label: 'Talk to us', href: '/contact?topic=unityprotect', primary: true }],
    metaDescription:
      'UnityProtect puts one set of parental controls across every device a family uses, with limits that follow the person rather than the device.',
  },
  {
    name: 'FastPortfolio',
    slug: 'fastportfolio',
    status: 'planned',
    tagline: 'Your professional footprint, fast-forwarded.',
    intro:
      'FastPortfolio turns what you have already done into a portfolio site worth sending, without a week of fiddling with templates. It is on the roadmap rather than in development.',
    links: [{ label: 'Register your interest', href: '/contact?topic=fastportfolio' }],
    metaDescription:
      'FastPortfolio, a planned UnityEvolv product that turns your work history into a portfolio site worth sending.',
  },
  {
    name: 'unityFin',
    slug: 'unityfin',
    status: 'in-development',
    hidden: true,
    tagline: 'Personal finance, worked out.',
    intro:
      'A mobile app covering the calculations people actually reach for — SIP, EMI, PPF, NPS, income tax and more — alongside net-worth and asset tracking.',
    metaDescription:
      'unityFin, a UnityEvolv personal finance app covering everyday calculations alongside net-worth and asset tracking.',
  },
]

/** Everything the site is allowed to show. unityFin is not ready. */
export const visibleProducts = products.filter((product) => !product.hidden)

export function productBySlug(slug: string): Product | undefined {
  return visibleProducts.find((product) => product.slug === slug)
}

export function productsByStatus(...statuses: ProductStatus[]): Product[] {
  return visibleProducts.filter((product) => statuses.includes(product.status))
}

/** The wording on the badge each status wears. */
export const statusLabels: Record<ProductStatus, string> = {
  live: 'Live',
  'open-source': 'Open source',
  'in-development': 'In development',
  'coming-next': 'Coming next',
  planned: 'Planned',
}
