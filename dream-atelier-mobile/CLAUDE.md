# CLAUDE.md — dream-atelier-mobile

Project-specific. Assumes your general-purpose behavioral guidelines (think
before coding, simplicity first, surgical changes, goal-driven execution)
are already in effect and adds only what's specific to this repo.

## What this repo is

React Native + Expo app. Pure API consumer of `dream-atelier-api` — no
business logic lives here that the backend doesn't also enforce. If you're
about to write a validation rule, a status check, or anything that decides
whether an action is *allowed*, that belongs in the Django repo; this repo
only decides how things *look*.

## Feature folder shape — follow it exactly

```
src/features/{name}/
  api.ts          typed functions calling apiClient, one per backend endpoint
  hooks.ts        React Query hooks wrapping the api.ts functions
  screens/        one file per screen
  components/     feature-local components not used elsewhere
```

`home` and `dreams` are fully built — copy their shape for any new feature
rather than inventing a new pattern. `catalog`, `wardrobe`, and `orders`
have working `api.ts`/`hooks.ts` already; their `screens/` are the next
thing to build, using `home`'s `HomeScreen.tsx` as the template for how a
screen should consume its feature's hooks.

## Brand voice — this is not optional polish

This product's entire premise is "calm, never pushy" (PRD Section 2.2,
architecture doc Section 8.2). Concretely, when you write UI copy in this
repo:

- No countdown urgency, no "BUY NOW", no multiple exclamation marks.
- Empty states are warm invitations, not blank screens. PRD Module 4's
  empty state copy — "Your dreams will live here. Share your first one?"
  — is quoted verbatim in `MyDreamsScreen.tsx`. Don't reword PRD-quoted
  copy without checking the PRD section it came from.
- The Dream Input screen (`DreamInputScreen.tsx`) must keep feeling like
  journaling, not a form. If you're adding a field, ask whether it can be
  optional and visually light before making it required.

## Showcase Card text

`ShowcaseFeedScreen.tsx` renders `dream.free_text` exactly as the dreamer
wrote it — no truncation, no rephrasing, no "cleaning up" her grammar. This
is a product trust requirement (PRD Section 8.2.1), not a styling choice.

## Conventions specific to this repo

- All network calls go through `src/services/apiClient.ts` — don't call
  `fetch` or instantiate a separate axios client elsewhere.
- Tokens live in `expo-secure-store`, never in plain AsyncStorage or React
  state alone.
- Use the shared `Button` and `Card` from `src/shared/components/` instead
  of one-off styled `Pressable`/`View` for anything that looks like a
  button or a card — consistency here is what keeps the app feeling like
  one product instead of five screens bolted together.
- Design tokens (`src/shared/tokens.ts`) are manually kept in sync with the
  web repo's equivalent file. If you change a color or spacing value here,
  flag it for the web repo too.

## Commands

```bash
npx expo start          # dev server
npx expo start --ios    # iOS simulator
npx expo start --android
npm run lint
npm test
```

## What not to do here

- Don't add Redux, MobX, or any global state library — React Query plus
  local component state has been sufficient for everything specified so
  far. If you hit a real case it can't handle, raise it before adding a
  new dependency.
- Don't duplicate types by hand if they drift from the API — if you find
  yourself unsure whether a field is `string` or `string | null`, check the
  actual Django serializer in `dream-atelier-api`, don't guess.
- Don't build `catalog`, `wardrobe`, or `orders` screens with a different
  visual pattern than `home`/`dreams` use, even if you think it's nicer —
  raise the idea first rather than introducing inconsistency silently.
