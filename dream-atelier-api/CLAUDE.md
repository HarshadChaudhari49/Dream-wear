# CLAUDE.md — dream-atelier-api

This file is project-specific. It assumes your general-purpose behavioral
guidelines (think before coding, simplicity first, surgical changes,
goal-driven execution) are already in effect for this session and adds only
what's specific to this repo. If both files are present, follow both —
this one never overrides the general one, it only adds context.

## What this repo is

Django + DRF backend for Dream Atelier — a custom-design women's clothing
platform. Full product behavior is specified in the PRD
(`Dream-to-Wear_PRD_v1.docx`); full system design is specified in the
architecture document (`Dream-Atelier_Architecture_v1.docx`). When in doubt
about *why* something is structured a certain way, check those before
guessing — most non-obvious decisions in this codebase trace back to a
specific section in one of those two documents, referenced in code comments.

## Module-to-app map

One Django app per product module. Don't scatter a module's logic across
apps, and don't put a new feature in `core` unless it's genuinely shared
infrastructure (base model, pagination) used by every app.

| App | Owns |
|---|---|
| `core` | Shared abstract base model, pagination. No endpoints. |
| `accounts` | Phone OTP auth, User model, profile |
| `dreams` | Dream submission, status state machine, consent gate, stage tracking |
| `catalog` | Products, banners, search/filter |
| `orders` | Cart, checkout, Razorpay, order tracking |
| `wardrobe` | Wishlist, purchase history with dream-origin callbacks |
| `notifications` | Notification model, calm-tone copy enforcement |
| `ops` | Cross-app admin customizations only. No models. No API endpoints. |

## The rule you must never bypass

A `Product` can only be created from a `Dream` once that Dream's status is
`delivered_to_dreamer` or later, **and** `consent_to_publish` is `True`. That
field can only become `True` via `apps.dreams.services.grant_consent()` —
never by setting it directly in a serializer, admin form, or migration.
`apps.catalog.services.publish_product_from_dream()` is the only sanctioned
way to create a Product from a Dream; it calls
`apps.dreams.services.can_become_product()` to check this. If you're writing
code that creates a Product, route it through that function. If you think
you need to bypass it, stop and ask — this rule exists because the product
explicitly promises dreamers control over whether and when their idea goes
public, and it's a hard requirement, not a UI nicety.

## Conventions specific to this repo

- Every model inherits `apps.core.models.AbstractBaseModel` unless it has a
  specific reason not to (e.g. `OrderItem`, which intentionally has no own
  UUID/timestamp pattern because it's a pure join row).
- UUID primary keys everywhere a model could be exposed via the API. Never
  expose Django's default auto-increment integer ids.
- Status fields are Django `TextChoices`, not free-text strings or booleans
  stacked together. If you need a new status, add it to the relevant
  `TextChoices` class and update the corresponding diagram in the
  architecture doc — those two things must never drift apart.
- Cross-app logic (anything that touches two apps' models) lives in a
  `services.py` inside whichever app is most "downstream" in the data flow
  (e.g. catalog's publish logic calls into dreams, not the other way
  around) — or in `apps/ops` if it's purely an admin-side action spanning
  apps, per that app's existing pattern in `apps/ops/admin.py`.
- Write the test before or alongside the feature, not after. A model change
  with no corresponding test in that app's `tests.py` is incomplete, not
  done.

## Commands

```bash
python manage.py runserver
python manage.py makemigrations
python manage.py migrate
pytest                      # full test suite
pytest apps/dreams          # one app's tests only
python manage.py shell
```

## What not to do here

- Don't add a shared package or import between this repo and the two
  frontend repos — that coupling was explicitly ruled out. If something
  needs to be consistent across repos (copy rules, design tokens), it's
  documented once in the architecture doc and implemented separately in
  each repo.
- Don't introduce NestJS/Supabase-flavored patterns carried over from the
  original PRD draft — this repo is Django-native. If a PRD section
  references Supabase Auth or NestJS, treat that as superseded by the
  architecture document, not as the current plan.
- Don't add fields, endpoints, or admin actions that aren't asked for or
  clearly required by an existing PRD module. If you think something's
  missing, say so — don't add it speculatively.
