# CLAUDE.md — dream-atelier-web

Project-specific. Assumes your general-purpose behavioral guidelines (think
before coding, simplicity first, surgical changes, goal-driven execution)
are already in effect and adds only what's specific to this repo.

## What this repo is

React + Vite web app. Pure API consumer of `dream-atelier-api`, same as the
mobile repo — no business logic here that the backend doesn't also enforce.

## Feature folder shape — follow it exactly

```
src/features/{name}/
  api.ts          typed functions calling apiClient, one per backend endpoint
  hooks.ts        React Query hooks wrapping the api.ts functions
  pages/          one file per route's top-level component
  components/     feature-local components not used elsewhere
```

`home` and `dreams` are fully built. `catalog`, `wardrobe`, `orders` have
working `api.ts`/`hooks.ts`; build their `pages/` using `home`'s
`HomePage.tsx` as the template.

## This repo's api.ts files should match mobile's, field for field

`dream-atelier-mobile` and this repo both consume the same Django API and
should have identical `api.ts` types and function signatures per feature —
they were written together for that reason. If you change a type here
because the backend changed, make the same change in the mobile repo's
equivalent file, and vice versa. They're allowed to diverge in their
`hooks.ts`/`pages`/`screens` (different UI frameworks), never in what shape
of data they expect from the API.

## Styling approach

Inline `style` objects using the shared tokens (`src/shared/tokens.ts`), not
a CSS framework or CSS modules — this was the simplest option for a
small initial surface and matches what's already built. If the team adopts
Tailwind or styled-components later, that's a deliberate larger change to
flag and do consistently across the whole repo, not something to introduce
piecemeal in one new page.

## Brand voice — this is not optional polish

Same calm-tone requirement as the rest of the product (PRD Section 2.2,
architecture doc Section 8.2). No countdown urgency, no "BUY NOW", no
multiple exclamation marks. `MyDreamsPage.tsx`'s empty state copy is quoted
verbatim from the PRD — don't reword PRD-quoted copy without checking the
section it came from. `ShowcaseFeedPage.tsx` renders `dream.free_text`
exactly as written — no truncation, no "cleaning up" her grammar.

## Conventions specific to this repo

- All network calls go through `src/services/apiClient.ts`.
- Tokens live in `localStorage` for now — note in `apiClient.ts` that this
  is a pragmatic v1 choice, not a security best practice; revisit if this
  becomes a concern before launch.
- Use the shared `Button` and `Card` from `src/shared/components/` rather
  than one-off styled elements.
- Design tokens (`src/shared/tokens.ts`) are manually kept in sync with the
  mobile repo's equivalent file.

## Commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## What not to do here

- Don't add a CSS framework, component library, or state management library
  without raising it first — same reasoning as the mobile repo's CLAUDE.md.
- Don't let this repo's `api.ts` types drift from the mobile repo's without
  a reason — see the note above.
- Don't build `catalog`, `wardrobe`, or `orders` pages with a different
  visual pattern than `home`/`dreams` use without raising the idea first.
