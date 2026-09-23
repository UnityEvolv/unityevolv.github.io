import type { Product, ProductStatus } from './types'

/**
 * The product line-up, in the order it appears on the Products page.
 *
 * **Names are written the way Vamsi writes them: UnityOfis, OfisKit, UnityKit,
 * UnityProtect.** The repositories and npm packages stay lower case —
 * `ofis-kit`, `@unityevolv/unitykit` — because those are identifiers rather
 * than names, and only the identifiers appear in URLs here. VSamstha was the
 * old name for UnityOfis and is not used anywhere.
 *
 * Note on the two unreleased products: neither has a launch route yet, so the
 * call to action is "Talk to us", pointing at the contact form with the topic
 * preselected. Swapping either for a waitlist is a change to `links` here.
 */
export const products: Product[] = [
  {
    name: 'UnityOfis',
    slug: 'unityofis',
    status: 'in-development',
    tagline: 'A virtual office that runs on your own provider account.',
    intro:
      "Your team works in an office drawn as rooms. See who's in which room, walk in to talk, share your screen, knock on a door that's closed, and step into the break room when you don't want to be disturbed. It runs in the browser, as a desktop app, and on Android.",
    body: [
      'A remote team loses the things an office gave away for free: seeing that someone is at their desk, catching them on the way past, knowing a door is closed for a reason. A calendar and a wall of meeting links do not bring those back. An office you can walk around does.',
      "What makes it different: every other virtual office locks you into their video provider and marks up the cost. UnityOfis lets your company bring its own account — LiveKit, Daily, Agora or Microsoft Teams for calls, Ably for chat — and pay the provider's own price directly. Switch whenever you like; nothing in the office changes.",
      'A built-in peer-to-peer mode is included free for small rooms, so a small team needs nothing else, and a larger one turns on a provider when it outgrows that.',
      'Your office is a picture with rooms drawn over it, so it can be your actual floor plan, a studio, or somewhere nobody could afford to rent. The builder draws the rooms on top and exports the layout; changing the office later does not mean changing the product.',
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
      {
        title: 'Doors that mean something',
        body: 'Lock a room to think. Someone outside can knock, and anyone inside can let them in. Step into the break room when you would rather be interrupted.',
      },
      {
        title: 'Wherever you work',
        body: 'The browser, a desktop app, and Android — the same office, whichever one you open.',
      },
    ],
    facts: [
      { label: 'Status', value: 'In development' },
      { label: 'Runs on', value: 'Browser, desktop, Android' },
      { label: 'Calls', value: 'LiveKit, Daily, Agora, Teams, or built-in P2P' },
      { label: 'Chat', value: 'Ably, on your account' },
      { label: 'Engine', value: 'OfisKit, open source' },
    ],
    audience: [
      'Remote and hybrid teams who have noticed that a meeting link is not the same as a colleague being nearby.',
      'Companies that already pay a video provider and would rather not pay a markup on top of it.',
      'Teams whose IT will ask where the data goes, and expect a real answer.',
    ],
    faqs: [
      {
        question: 'Do we have to bring our own provider?',
        answer:
          'No. The built-in peer-to-peer mode covers small rooms with no account at all. Bringing your own is what keeps the cost yours once rooms get larger, and you can switch later without the office changing.',
      },
      {
        question: 'Is this another thing to leave open all day?',
        answer:
          'It is meant to be, in the way an office is: you are present while you are working, and you close it when you stop. Locking a room and the break room exist so that being present does not mean being interruptible.',
      },
      {
        question: 'What does our IT department need to know?',
        answer:
          'Calls go through your own provider account, so the media path is one you already audit. Sign-in is Microsoft, with provisioning, roles and audit logs. Team insights are aggregate only — no individual activity is shown to a manager.',
      },
      {
        question: 'What if we want to run it ourselves?',
        answer:
          'Then you want OfisKit, which is the same engine, open source, and free to host. UnityOfis is what you buy when you would rather not.',
      },
    ],
    links: [{ label: 'Talk to us', href: '/contact?topic=unityofis', primary: true }],
    aside: {
      title: 'The engine is open source',
      body: 'UnityOfis is a wrapper around OfisKit, which is open source and free to run yourself. The product adds organisations, roles, more providers and the infrastructure behind them — the office itself is the same code.',
      link: { label: 'Look at OfisKit', href: '/products/ofiskit' },
    },
    metaDescription:
      'UnityOfis is a virtual office that runs on your own video and chat provider account — rooms you can walk into, no markup and no lock-in.',
  },
  {
    name: 'OfisKit',
    slug: 'ofiskit',
    status: 'open-source',
    tagline: 'The office itself, free to run anywhere.',
    intro:
      "OfisKit is the engine behind UnityOfis, and it's open source. One office, rooms, presence, lock and knock, custom status, and four-person peer-to-peer calls with screen share, raised hands and reactions. No accounts, no database. Enter an email and a name and you're in. Run it with a single command, or build your own product on top of it.",
    body: [
      'The demo runs the whole office in your browser, because there is no hosted server. The first tab hosts the office and every other tab joins it, so a second tab is a second person and the calls between them are real WebRTC. A few simulated colleagues walk between rooms and knock on locked doors, so the office is never empty.',
      'It is the whole engine, not a sample of one. UnityOfis is a wrapper around this code rather than a different program: the same realtime core, the same map, the same call. What the product adds is configuration — its own identity, its own template source, Redis instead of memory, more call providers.',
      "A fresh clone talks to nothing of ours. No default STUN or TURN pointing at our servers, no CDN, no web fonts, no avatar service, no analytics, and a lint rule that fails a hostname written into the code. A team self-hosting it is running their office, not somebody else's product — which is also why it carries no logo, no favicon and no name a visitor can see.",
    ],
    features: [
      {
        title: 'One command to run it',
        body: 'Clone it and `docker compose up`. Three containers, five minutes, and a team is in a room.',
      },
      {
        title: 'Your office, your picture',
        body: 'The rooms are drawn over an image you supply, light and dark. The builder exports the layout; replace the picture and you have replaced the office.',
      },
      {
        title: 'Adapters, not assumptions',
        body: 'Identity, the template source, presence and the call provider each arrive through an interface, so it fits the systems you already run.',
      },
      {
        title: 'Nothing to keep',
        body: 'No accounts, no passwords, no database. Restart the server and everyone reconnects to an empty office, because there was never anywhere to keep one.',
      },
    ],
    facts: [
      { label: 'Licence', value: 'AGPL-3.0, Apache-2.0 interfaces' },
      { label: 'Run it with', value: 'docker compose up' },
      { label: 'Calls', value: 'Four-person peer-to-peer WebRTC' },
      { label: 'Storage', value: 'None — no accounts, no database' },
      { label: 'Try it', value: 'In your browser, nothing to install' },
    ],
    audience: [
      'Small teams who want an office today and have somewhere to run it.',
      'Anyone whose employer will not let a third party hold their presence data.',
      'Developers building something of their own on a realtime core they can read.',
    ],
    faqs: [
      {
        question: 'What does the demo actually run?',
        answer:
          'All of it, in your browser. The first tab hosts the office and other tabs join it, so a second tab is a second person and the call between them is real WebRTC. There is no server of ours involved, which is also why everyone in the demo is on one device.',
      },
      {
        question: 'Can I use this commercially?',
        answer:
          'The app, the server and the UI packages are AGPL-3.0-only, so a hosted service built on them has to publish its source. The three interface packages are Apache-2.0, so writing an adapter is not a licensing decision. If the AGPL does not suit, UnityOfis is the commercial answer.',
      },
      {
        question: 'How much of it can I replace?',
        answer:
          'Identity, the template source, presence and the call provider each arrive through an interface. Swap any of them and the office does not notice. Replacing the picture and the layout file replaces the office itself.',
      },
      {
        question: 'Does it phone home?',
        answer:
          'No. No default STUN or TURN pointing at us, no CDN, no web fonts, no avatar service, no analytics, and a lint rule that fails a hostname written into the code. A fresh clone runs with no request to anything of ours.',
      },
    ],
    links: [
      { label: 'Try the demo', href: 'https://unityevolv.com/ofis-kit/', primary: true },
      { label: 'View on GitHub', href: 'https://github.com/UnityEvolv/ofis-kit' },
    ],
    heroNote:
      'The demo runs entirely in your browser: open it in a second tab and that tab is a second person, with a real call between them. A few simulated colleagues keep the office busy.',
    aside: {
      title: 'Hosted, with your company around it',
      body: 'UnityOfis is OfisKit with organisations, roles, guests, audit logs and your choice of call provider behind it — for teams who would rather not run the office themselves.',
      link: { label: 'Look at UnityOfis', href: '/products/unityofis' },
    },
    licence:
      'AGPL-3.0-only for the app, the server and the UI packages; Apache-2.0 for the three interface packages, so writing an adapter is not a licensing decision.',
    metaDescription:
      'OfisKit is the open-source virtual office engine behind UnityOfis: rooms, presence, knocking and four-person calls, running anywhere you host it.',
  },
  {
    name: 'UnityKit',
    slug: 'unitykit',
    status: 'open-source',
    tagline: 'The design system behind everything UnityEvolv builds.',
    intro:
      'UnityKit is the shared React component library our products are built from, on Tailwind CSS v4 and daisyUI 5. It ships components, a theme and its tokens, in light and dark, and knows nothing about any app that uses it. This website is built with it.',
    body: [
      'Thirty-odd components, from buttons and badges to tables, steppers, drawers and date pickers, each with its own tests and a page in the Storybook you can open and poke at.',
      'The palette is two hues and the status colours, deliberately. A third accent dark enough to carry white text lands in the band the warning colour already holds, so the kit refuses to pretend it is a different colour — and the daisyUI accent is aliased to primary so nobody can smuggle one in.',
      'It is published to npm with provenance and versioned with changesets, so upgrading is a decision you make rather than something that happens to you.',
    ],
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
    facts: [
      { label: 'Install', value: 'npm i @unityevolv/unitykit' },
      { label: 'Licence', value: 'MIT' },
      { label: 'Built on', value: 'Tailwind CSS v4, daisyUI 5' },
      { label: 'Themes', value: 'Light and dark, contrast checked in CI' },
      { label: 'Tokens', value: 'CSS and JSON, for anything not React' },
    ],
    audience: [
      'React teams who want a design system without building one first.',
      'Anyone who has watched an interface drift out of its own palette over a year.',
      'Designers who would rather read the tokens than guess at them.',
    ],
    faqs: [
      {
        question: 'Can I use it outside UnityEvolv?',
        answer:
          'Yes — it is MIT and on npm, and it knows nothing about our apps. It ships components, a theme and tokens; the data, the routing and the behaviour stay yours.',
      },
      {
        question: 'Why is there no accent colour?',
        answer:
          'Because any accent dark enough to carry white text lands in the band the warning colour already occupies, so it would be a synonym dressed up as a choice. daisyUI always emits an accent, so ours is aliased to primary and a test keeps it that way.',
      },
      {
        question: 'What happens when it changes?',
        answer:
          'It is versioned with changesets and published with provenance, on 0.x until the API settles — so while it is 0.x, a breaking change is a minor bump. Upgrading is a decision you make rather than something that happens to you.',
      },
    ],
    links: [
      { label: 'Browse the components', href: 'https://unityevolv.com/unity-kit/', primary: true },
      { label: 'View on GitHub', href: 'https://github.com/UnityEvolv/unity-kit' },
      { label: 'npm', href: 'https://www.npmjs.com/package/@unityevolv/unitykit' },
    ],
    licence: 'MIT.',
    metaDescription:
      'UnityKit is UnityEvolv’s open-source React design system on Tailwind v4 and daisyUI, with contrast checked in CI and tokens published as plain data.',
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
      'The rules are the ones families actually argue about: how long, on what, and when. Set them once per person and they hold whether the afternoon is spent on a phone, a laptop or the television — which is what stops "my time ran out" becoming "so I moved to the iPad".',
      'It is in development. What it looks like at launch is still being decided, so if you have a household it would have to survive, we would rather hear about it now than after.',
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
    facts: [
      { label: 'Status', value: 'In development' },
      { label: 'Platforms', value: 'Android, iOS, Windows, macOS, web' },
      { label: 'Limits', value: 'Per person, across every device' },
      { label: 'Managed from', value: 'One dashboard' },
    ],
    audience: [
      'Parents with more devices in the house than rules that survive them.',
      'Households split across Apple and Android, where neither built-in tool sees the whole picture.',
      'Anyone who has heard "my time ran out" and then watched the afternoon continue on a different screen.',
    ],
    faqs: [
      {
        question: 'How is this different from Family Link or Screen Time?',
        answer:
          'Each of those governs its own ecosystem well and everything else not at all. UnityProtect sets the rules per person and applies them across every platform the family uses, so the limit is on the child rather than on one device.',
      },
      {
        question: 'Does a child need an account?',
        answer:
          'A family member is a person in your family, not an identity we own. The agent on each device ties that device to that person, and the rules follow the person from there.',
      },
      {
        question: 'When can we use it?',
        answer:
          'It is in development, and what it looks like at launch is still being decided. If you have a household it would have to survive, tell us — that is the kind of thing that changes what gets built first.',
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
    // The intro is the description from the previous site, kept as it was
    // written. Only the last line is new, and it is about status rather than
    // about the product.
    intro:
      'Accelerate your professional journey with FastPortfolio. Seamlessly transform your LinkedIn achievements into a polished portfolio on GitHub Pages or Vercel. Ideal for professionals, creatives and job seekers aiming to showcase their work effortlessly.',
    body: [
      'The work of putting a portfolio together is rarely the work of doing the thing: the material already exists, spread across a profile, a résumé and a folder of screenshots. FastPortfolio is for turning that into a site worth sending, in an afternoon rather than a fortnight of fighting a template.',
      'It is on the roadmap rather than in development. If it is the one you want first, say so — that is how these get reordered.',
    ],
    facts: [
      { label: 'Status', value: 'Planned' },
      { label: 'Starts from', value: 'Your LinkedIn achievements' },
      { label: 'Publishes to', value: 'GitHub Pages or Vercel' },
      { label: 'For', value: 'Professionals, creatives, job seekers' },
    ],
    audience: [
      'People whose work is real and whose portfolio is a promise to themselves.',
      'Job seekers who need something to send this week, not next month.',
      'Creatives who would rather spend the evening on the work than on a template.',
    ],
    links: [{ label: 'Register your interest', href: '/contact?topic=fastportfolio' }],
    metaDescription:
      'FastPortfolio, a planned UnityEvolv product that turns your work history into a portfolio site worth sending.',
  },
  {
    name: 'UnityFin',
    slug: 'unityfin',
    status: 'in-development',
    hidden: true,
    tagline: 'Personal finance, worked out.',
    intro:
      'A mobile app covering the calculations people actually reach for — SIP, EMI, PPF, NPS, income tax and more — alongside net-worth and asset tracking.',
    metaDescription:
      'UnityFin, a UnityEvolv personal finance app covering everyday calculations alongside net-worth and asset tracking.',
  },
]

/** Everything the site is allowed to show. UnityFin is not ready. */
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
