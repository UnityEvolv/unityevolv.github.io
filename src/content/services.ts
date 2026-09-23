import type { Service } from './types'

/**
 * One service today: building a product from scratch with AI. The proof points
 * are our own open-source work, so every claim on the page has a live link
 * behind it.
 */
export const productBuildingService: Service = {
  name: 'Building products with AI',
  slug: 'services',
  headline: 'From an idea to a shipped product, built with AI.',
  intro:
    'We build our own products this way, in the open. The same team, and the same way of working, is available for yours — from the first conversation to a product your customers use.',
  steps: [
    {
      title: 'Discover',
      body: 'What the product is for, who it is for, and what the first version has to do. We come out of this with a scope you can say no to.',
    },
    {
      title: 'Prototype',
      body: 'A version you can click through in days rather than months, so the argument about what it should do happens against something real.',
    },
    {
      title: 'Build',
      body: 'The production product, with tests and continuous integration, accessible and working on a phone from the first screen.',
    },
    {
      title: 'Launch and hand over',
      body: 'Deployed, documented, and yours: the code, the accounts and the deployment. No part of it stays locked to us.',
    },
  ],
  audience: [
    'Founders with an idea and no engineering team yet.',
    'Small teams who need a second product built without pausing the first.',
    'People who know exactly what their industry needs and need it built.',
  ],
  faqs: [
    {
      question: 'Who owns the code?',
      answer:
        'You do, from the first commit. It lives in your repository, on your accounts, and the handover includes everything needed to run it without us.',
    },
    {
      question: 'How is AI actually used?',
      answer:
        'To move faster through the parts that are well understood — scaffolding, tests, migrations, documentation — while the architecture, the review and the decisions stay with people. Everything ships through the same review and CI as any other work.',
    },
    {
      question: 'What can I look at before deciding?',
      answer:
        'Two of our products are open source and running: OfisKit, a virtual office you can try in your browser, and UnityKit, the design system this website is built with. Both have public code, public CI and public demos.',
    },
    {
      question: 'What happens after launch?',
      answer:
        'You can take it from there, or keep us for a support arrangement. We would rather hand over a product your own team can run than one that needs us.',
    },
  ],
  metaDescription:
    'UnityEvolv builds products from scratch with AI — discovery, a prototype in days, a production build with tests and CI, then a handover you fully own.',
}
