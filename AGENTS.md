# AGENTS.md

Working conventions for the UnityEvolv website. Read before making changes.

## What this repository is

`unityevolv.github.io` serves **unityevolv.com**, the company site: what UnityEvolv builds,
the products, and the service of building a product from scratch with AI. It is a
Vite + React + TypeScript app styled entirely with
[`@unityevolv/unitykit`](https://github.com/UnityEvolv/unity-kit).

Work is specified in Jira under the **KAN** project (named UnityEvolv); the rewrite is
epic KAN-4. Product work lives in **UO** instead. Read the story before starting: this
repository does not carry that context.

## Routes that are not ours

`unityevolv.com` is the org's GitHub Pages domain, and **each repository's Pages site is
served at `unityevolv.com/<repo>/`**. Two of those paths are live today:

- `/unity-kit/` — the unitykit Storybook.
- `/ofis-kit/` — the ofiskit demo, with its builder at `/ofis-kit/builder`.

This site must never define a route at either path. Product pages use `/products/<slug>`
and link out to those URLs.

## UI rules

- **Everything comes from unitykit**: its components, its tokens and its brand utilities.
  No hard-coded colours, and no second component library.
- **Class names must be written out in full.** Tailwind scans built files as static text,
  so a name assembled from a variable produces no CSS: the component renders with correct
  markup, no styling and no error. ESLint fails a template literal in `className`.
- **`src/styles.css` carries the three lines the kit needs**, including `@source`. Without
  that line nothing in the kit is styled and nothing errors.
- Anything missing from the kit is built here. If it turns out to be reusable beyond this
  site, propose it to unitykit in its own pull request with a changeset — the kit knows
  nothing about any consuming app.

## Definition of done

- Responsive, with no horizontal scroll from 320px up.
- Correct in **both themes**. Dark is the default because the brand is dark-first.
- WCAG 2.1 AA. The raw brand cyan (`#25E0F8`) and lavender (`#C27FFF`) cannot carry text
  on white; use the kit's light-theme tokens.
- Loading, empty and error states handled where they exist (today, the contact form).
- Content lives in `src/content/`, not in page components, so a product's status or copy
  changes in one place.

## Code conventions

- No `any` without a comment explaining why.
- `import type` for types.
- No personal data in logs.
- Tests live beside the code they test.
- Conventional commits, naming the story: `feat(site): … (KAN-12)`.

## Branching and pull requests

- Branch per story: `feat/KAN-<number>-<short-slug>`, or `fix/…`.
- Before pushing: `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and a
  real-browser check for anything visible.
- The rewrite stories stack on one another, since each page needs the setup branch. Merge
  a stack **bottom first**; GitHub retargets the child pull requests as each base lands.

## How the site is built and published

`npm run build` is three steps:

1. `vite build` — the client bundle and `dist/index.html`, the template.
2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr` — the same
   components, built to run in Node. **It must not build into `dist`**: that
   publishes the server bundle and a second copy of `public/`, `CNAME`
   included.
3. `node scripts/prerender.mjs` — renders every path in `sitemapPaths` to its
   own `index.html`, writes `404.html`, `sitemap.xml` and `robots.txt`, and
   rewrites the title, description, canonical and link-preview tags per page.

`scripts/check-dist.mjs` then refuses a build that would break the site in ways
a green test run cannot see: a missing `CNAME`, a route that did not prerender,
pages sharing one title, the SSR bundle published, or a directory at
`/unity-kit` or `/ofis-kit` that would shadow another repository's live site.
CI runs it before the upload.

GitHub Pages serves `404.html` for any path it does not have, which is what
makes an unknown URL a real 404 rather than a 200 that merely looks like one.

Metadata lives in `src/seo.ts` and takes product descriptions from
`src/content/products.ts`, because two copies of a description drift and the
one that drifts is the one nobody looks at.

## Checking the built site

**Never check a prerendered site with `vite preview`.** It is a single-page-app
server: it answers every unknown path with the root `index.html`, so every
route appears to work while actually serving the home page. The title is wrong,
the navbar highlights Home, and the console fills with hydration mismatches
that exist only because of the fallback. Half a debugging session went into
that ghost.

Use `node scripts/serve-dist.mjs 4190`, which serves `dist` the way Pages does:
`<path>/index.html`, `404.html` with a real 404 status, gzip on text, and a
long cache on hashed assets. The last two matter because Lighthouse measures
them — without compression the performance score reads about twenty points
below what the real site gets.

For accessibility, load each page in a frame at phone width, inject
`node_modules/axe-core/axe.min.js` into that frame and run `axe.run` inside it.
Two things to get right: set the theme in `localStorage` **before** the page
loads, since switching `data-theme` afterwards and measuring immediately
catches the CSS transition mid-flight and reports colours nobody ever sees; and
inject axe into the frame rather than running it from the parent, which axe
refuses.

## Package management

**npm only.** Do not add `pnpm-lock.yaml` or `yarn.lock`. Commit `package-lock.json`.

`@unityevolv/unitykit` is pinned to an exact version. The kit is on 0.x, where a breaking
change is a minor bump, so upgrades are deliberate: change the version, run the checks,
and look at both themes.

## Windows note

Development happens on Windows with Git Bash, and files use CRLF endings. Prettier reads
those as changes, so check formatting through:

```sh
tr -d '\r' < path/to/file.tsx | npx prettier --check --stdin-filepath path/to/file.tsx
```
