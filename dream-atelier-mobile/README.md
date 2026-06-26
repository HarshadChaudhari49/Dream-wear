# dream-atelier-mobile

React Native + Expo app for Dream Atelier. Talks only to `dream-atelier-api` over REST — see the architecture doc's API contract (Section 7) for the endpoints this app expects.

## Setup

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i`/`a` for an iOS/Android simulator.

Set the API URL in `app.json` under `expo.extra.apiBaseUrl` (defaults to `http://localhost:8000/api` for local development against `dream-atelier-api`).

## Project layout

```
src/
  features/
    home/         Module 1 — Home Dashboard (fully built reference screen)
    dreams/       Module 3 + 4 — Dream Input, Showcase Feed, My Dreams (fully built)
    catalog/      Module 2 — Explore All Products (api/hooks scaffolded, screens TBD)
    wardrobe/     Module 5 — Profile/Wardrobe (api/hooks scaffolded, screens TBD)
    orders/       Module 6 — Cart/Checkout (api/hooks scaffolded, screens TBD)
  navigation/     React Navigation tab + stack setup
  services/       Shared API client with auth token handling
  shared/         Design tokens, primitive components (Button, Card)
```

Each feature folder follows the same shape: `api.ts` (typed fetch calls), `hooks.ts` (React Query hooks), `screens/`, `components/`. `home` and `dreams` are built out fully as the reference pattern; `catalog`, `wardrobe`, and `orders` have working API/hook layers but need their screens built using the same pattern.

## Adding a new feature or screen

See architecture doc Section 10.2. Short version: new folder under `src/features/`, same four-piece shape, wire into `RootNavigator.tsx` with one new screen entry. Never invent business logic on this side that the API doesn't also enforce — see architecture doc Section 2.3.

## CLAUDE.md

This repo has its own `CLAUDE.md` with conventions specific to this codebase.
