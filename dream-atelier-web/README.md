# dream-atelier-web

React + Vite web app for Dream Atelier. Talks only to `dream-atelier-api` over REST — see the architecture doc's API contract (Section 7) for the endpoints this app expects.

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

App runs at `http://localhost:5173`.

## Project layout

```
src/
  features/
    home/         Module 1 — Home Dashboard (fully built reference page)
    dreams/       Module 3 + 4 — Dream Input, Showcase Feed, My Dreams (fully built)
    catalog/      Module 2 — Explore All Products (api/hooks scaffolded, pages TBD)
    wardrobe/     Module 5 — Profile/Wardrobe (api/hooks scaffolded, pages TBD)
    orders/       Module 6 — Cart/Checkout (api/hooks scaffolded, pages TBD)
  routes/         React Router configuration
  services/       Shared API client with auth token handling
  shared/         Design tokens, primitive components (Button, Card)
```

Same feature-folder shape as `dream-atelier-mobile`: `api.ts`, `hooks.ts`, `pages/` (mobile calls this `screens/`), `components/`. `home` and `dreams` are built out fully; `catalog`, `wardrobe`, `orders` have working API/hook layers with pages still to build using the same pattern.

## Adding a new feature or page

See architecture doc Section 10.2. New folder under `src/features/`, same shape, one new route added to `src/routes/router.tsx`. No business logic that the API doesn't also enforce — see architecture doc Section 2.3.

## CLAUDE.md

This repo has its own `CLAUDE.md` with conventions specific to this codebase.
