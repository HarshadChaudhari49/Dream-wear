Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **DREAM ATELIER** 

Technical Architecture & Engineering Blueprint _Companion to the Product Requirements Document (v1.0)_ 

## **SYSTEM DESIGN  ·  DATA MODEL  ·  REPO LAYOUT  ·  WORKFLOWS** 

Stack: React Native (Expo) + React (Web) + Django REST Framework Version 1.0  ·  June 2026 

Page 1 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **1. Purpose of This Document** 

The Product Requirements Document (PRD v1.0) defines what Dream Atelier needs to do — six modules, a dream-to-garment workflow, and a calm, story-driven brand voice. This document defines how that gets built: the system architecture, the three-repository structure, the data model, the API contract between frontend and backend, and the conventions that keep the codebase easy to extend as new modules and features are added. 

**Audience:** engineers joining the project, and Claude Code (or any AI coding agent) working inside any of the three repos. Each repo ships its own _CLAUDE.md_ — Section 9 explains how those relate to each other and to this document. 

## **1.1 Confirmed Decisions This Document Builds On** 

- Three fully separate repositories: dream-atelier-api, dream-atelier-mobile, dream-atelierweb. No monorepo tooling, no shared package between them beyond a documented API contract. 

- Mobile (React Native + Expo) and Web (React) are both built from day one, as two real, independent products against the same backend — neither is a stub or a future phase. 

- Backend: Django + Django REST Framework + PostgreSQL, replacing the PRD's original NestJS/Supabase suggestion. Image storage (Cloudinary/GCP), payments (Razorpay), and shipping carriers (Delhivery, BlueDart, India Post) remain as specified in the PRD. 

- Designers/tailors are real people working from a manually-routed brief at launch. No AI image generation in the pipeline for v1 — this shapes the data model's DreamStage tracking in Section 4. 

Page 2 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **2. Repository Strategy** 

Three repos, one contract. The Django API is the single source of truth for data and business logic; both frontends are consumers of the same REST endpoints. Neither frontend repo depends on the other, and the API repo has no knowledge of either frontend's internal structure. 

## **2.1 Why Three Separate Repos (and What It Costs)** 

This is a deliberate tradeoff, not a default. Separate repos buy independence: the mobile team can ship without touching web code, the API can deploy on its own schedule, and each repo's CI pipeline only runs what's relevant to it. The cost is that anything shared — types, validation rules, the visual design language — has to be either duplicated deliberately or formalized as a versioned contract instead of a shared import. Section 6 (API contract) and Section 8 (design tokens) exist specifically to manage that cost. 

## **2.2 Repository Overview** 

|||||
|---|---|---|---|
|**Repo**|**Stack**|**Deploys to**|**Owns**|
|||||
|dream-atelier-api|Django 5 + DRF +<br>PostgreSQL|Render/Railway/EC2<br>(TBD)|All data,<br>business logic,<br>admin UI, auth|
|||||
|dream-atelier-mobile|React Native + Expo<br>(TypeScript)|App Store + Play<br>Store via EAS|iOS/Android app|
|||||
|dream-atelier-web|React + Vite (TypeScript)|Vercel/Netlify (TBD)|Marketing site +<br>web app|



## **2.3 How the Pieces Talk to Each Other** 

Page 3 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

_Both frontends call one Django API, which is the only thing that talks to the database and external services._ 

Both frontends are pure API consumers — they hold no business logic that the backend doesn't also enforce server-side. This matters because a mobile app's client-side validation can always be bypassed by someone calling the API directly; every rule that matters (the dreamer-first delivery gate, consent requirements, status transitions) is enforced in Django, and the frontend checks are there only for responsive UX, not as the actual guarantee. 

Page 4 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **3. Backend: dream-atelier-api** 

Django organized as one app per product module, mirroring the PRD's module numbering rather than a generic MVC split. The goal stated in the brief — simple to extend with new modules, features, and functionality — is solved structurally: a new feature is a new Django app, registered once in settings, never requiring changes to existing apps' internals. 

_Each Django app owns one slice of the product. New functionality is added as a new app, not as changes scattered across existing ones._ 

## **3.1 App Responsibilities** 

|**App**|**PRD module**|**Responsibility**|
|---|---|---|
|core|—|Abstract base models (timestamps, UUID pk), shared<br>utilities, custom permissions|
|accounts|—|User model, phone OTP auth, profile fields, photo visibility<br>setting|
|dreams|Module 3 & 4|Dream submission, status state machine, DreamStage<br>tracking, consent capture|
|catalog|Module 1 & 2|Product, banners, categories, mood tags, trending logic,<br>search/filter|
|orders|Module 6|Cart, checkout, Razorpay integration, Order/OrderItem,<br>carrier sync|



Page 5 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

||||
|---|---|---|
|**App**|**PRD module**|**Responsibility**|
||||
||||
|wardrobe|Module 5|Purchase history view, wishlist, styling notes|
||||
|notifications|Module 6|Notification dispatch with calm-tone templates, push token<br>management|
||||
|ops|Section 12<br>(PRD)|Internal admin extensions: dream queue, designer<br>assignment, publishing workflow|
||||



## **3.2 Why Django Admin Matters Here** 

The PRD (Section 12.3) flags that an internal admin layer is a hard prerequisite, not optional tooling — someone has to triage the dream queue, assign designers, upload stage photos, and approve products for publishing. Django's built-in admin, customized per-app via ModelAdmin classes, covers most of this without a separate internal tool. The ops app exists specifically to hold the customizations (custom admin actions like "assign to designer" or "publish product from dream") that go beyond what a default ModelAdmin provides. 

## **3.3 Project Layout** 

Actual directory structure (also reflected in the scaffolded repo): 

- config/ — settings, root urls.py, wsgi/asgi entrypoints, split into base.py / dev.py / prod.py 

- apps/ — one directory per app from the table above, each with models.py, serializers.py, views.py, urls.py, admin.py, tests.py 

- apps/core/ — shared AbstractBaseModel, custom permission classes, common pagination class 

- requirements/ — base.txt, dev.txt, prod.txt (split so production doesn't install dev/test tooling) 

- manage.py, .env.example, README.md, CLAUDE.md 

Page 6 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **4. Frontend Repos: Mobile & Web** 

Both frontend repos use the same feature-folder convention and the same feature names as the backend's apps, so a contributor moving between repos finds dreams-related code under a folder called dreams in all three places. This is a naming convention only — there is no shared code between the repos, by the founder's explicit choice (Section 2). 

_Mobile and web mirror each other's feature folders. Screens differ; the underlying concepts and naming don't._ 

## **4.1 dream-atelier-mobile (React Native + Expo)** 

- src/features/{home, catalog, dreams, wardrobe, orders}/ — each with screens/, components/, api.ts (typed fetch calls to the Django API), and hooks.ts 

- src/navigation/ — React Navigation stacks/tabs matching the PRD's proposed IA (Section 5.1 of the PRD): Home, Dreams, Explore, My Dreams, Profile 

- src/shared/ — design tokens, primitive components (Button, Card, TextInput) used across features, API client base config 

- app.json / eas.json — Expo and EAS Build configuration 

## **4.2 dream-atelier-web (React + Vite)** 

- src/features/{home, catalog, dreams, wardrobe, orders}/ — same shape as mobile, webappropriate components 

- src/routes/ — React Router routes matching the same IA 

Page 7 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

- src/shared/ — design tokens (kept in sync with mobile's values manually, per Section 8), primitive components 

## **4.3 What's Deliberately Not Shared** 

No shared npm package, no monorepo workspace, no symlinked code between mobile and web. If a validation rule or a piece of copy needs to match across both (e.g. the calm-tone notification copy rules from PRD Section 11.1), it is documented once in this architecture doc or in a shared CLAUDE.md excerpt (Section 9) and implemented twice. This is the direct cost of the three-repo decision, called out explicitly so it isn't accidentally violated later by introducing a shared package that re-couples the repos. 

Page 8 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **5. Data Model** 

This extends the proposed schema from the PRD (Section 14) into the actual Django models that will exist in the dreams, catalog, orders, and wardrobe apps. Field names below map directly to Django model fields, not just a conceptual sketch. 

Page 9 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

_Entity-relationship diagram for the core schema. A Dream optionally becomes a Product once published; everything downstream (orders, saves) reads from Product._ 

## **5.1 Key Relationships, Explained** 

- **Dream → Product is optional and one-directional.** Not every Dream becomes a Product (it may be declined or stay private). A Product's origin_dream_id is nullable specifically to support the PRD's Open Decision #9 (seed catalog) — if the team decides to launch with some non-dream-originated pieces, the schema already supports it without a migration. 

- **DreamStage is its own table, not a JSON field.** Stage tracking (PRD Module 4) needs ordering, timestamps, and per-stage photos. A separate table with a foreign key to Dream keeps this queryable and lets the admin (Section 3.2) add a new stage with a normal form, rather than editing a blob. 

- **SavedItem and OrderItem are both join tables.** SavedItem links User to Product for wishlist (PRD Module 5); OrderItem links Order to Product for what was actually purchased, at the price/quantity at time of purchase — kept separate from Product's live price so historical orders don't silently change if a price updates later. 

- **DesignerTailor is intentionally minimal.** Per the founder's confirmation that designers/tailors are real people handling briefs manually, this table is just enough to assign a Dream to someone and show that assignment in the admin queue (Section 3.2) — it is not a full HR or vendor-management system. 

## **5.2 Dream Status Field** 

Implemented as a Django TextChoices enum on Dream.status, matching the PRD's recommended taxonomy (Section 9.1.1 of the PRD) exactly, so the workflow diagram in Section 6 below and the actual code never drift apart: 

|||
|---|---|
|**Value**|**Constant name**|
|||
|Submitted|DreamStatus.SUBMITTED|
|||
|In Review|DreamStatus.IN_REVIEW|
|||
|In Progress|DreamStatus.IN_PROGRESS|
|||
|Delivered to Dreamer|DreamStatus.DELIVERED_TO_DREAMER|
|||
|Live|DreamStatus.LIVE|
|||
|Declined / Paused|DreamStatus.DECLINED_PAUSED|
|||



Page 10 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **6. The Dream-to-Garment Workflow** 

This is the engineering view of the PRD's core loop (PRD Section 1.1 and Section 4) — the same five conceptual steps, expressed as the actual status transitions enforced in the dreams app. 

_Status transitions for a Dream record. The consent gate is a hard branch — a Dream cannot reach Live without it._ 

## **6.1 Enforcement Rules (Not Just UI Conventions)** 

Per the discussion when this document was scoped, the dreamer-first delivery and consent rule is treated as a hard backend rule, not a UI nicety. Concretely, this means: 

1. A Product can only be created from a Dream whose status is Delivered to Dreamer or later. 

Page 11 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

2. Dream.consent_to_publish defaults to False at the database level and can only be set True through a dedicated endpoint that records who/when consent was granted — never through a generic PATCH on the Dream object. 

3. The catalog app's product-publish action checks both conditions above before allowing a Product to be marked is_publishable. This check lives in a service function, not scattered across views, so every entry point (admin action, future API endpoint) goes through the same gate. 

## **6.2 Where Each Step Lives in Code** 

||||
|---|---|---|
|**Workflow step**|**Django app**|**Trigger**|
||||
|Dream submitted|dreams|POST /api/dreams/ from either frontend|
||||
|Routed to designer|dreams + ops|Admin action in Django admin (manual at launch)|
||||
|Stage photos captured|dreams|Admin uploads via DreamStage inline in Dream<br>admin|
||||
|Delivered to dreamer|orders +<br>dreams|Order status update triggers Dream status check|
||||
|Consent<br>requested/granted|dreams|Dedicated consent endpoint, logged with timestamp|
||||
|Product published|catalog|Admin action, gated by the two enforcement rules<br>above|
||||
|Social proof returned|dreams +<br>catalog|Product's save/love counters surfaced back via<br>Dream serializer|



Page 12 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **7. API Contract** 

The contract both frontends are built against. This is a representative surface, not the full OpenAPI spec — the actual contract of record should be generated from the Django code (Section 7.3) so it can never silently drift from what the backend really returns. 

## **7.1 Authentication** 

- POST /api/auth/otp/request/ — { phone } → triggers OTP send 

- POST /api/auth/otp/verify/ — { phone, code } → { access_token, refresh_token, user } 

- POST /api/auth/refresh/ — { refresh_token } → { access_token } 

- Both frontends store tokens and attach Authorization: Bearer <token> on every authenticated request. 

## **7.2 Representative Endpoints by Module** 

|||||
|---|---|---|---|
|**Endpoint**|**Method**|**Purpose**|**Module**|
|||||
|/api/banners/|GET|Home offer banner content|catalog|
|||||
|/api/products/|GET|List/filter/search catalog|catalog|
|||||
|/api/products/{id}/|GET|Product detail|catalog|
|||||
|/api/products/{id}/save/|POST|Toggle wishlist save|wardrobe|
|||||
|/api/dreams/|GET,<br>POST|List own dreams / submit new dream|dreams|
|||||
|/api/dreams/{id}/|GET|Dream detail incl. stages|dreams|
|||||
|/api/dreams/{id}/consent/|POST|Grant/decline publish consent|dreams|
|||||
|/api/dreams/feed/|GET|Public Showcase feed|dreams|
|||||
|/api/cart/|GET,<br>POST|View/modify cart|orders|
|||||
|/api/orders/|GET,<br>POST|Checkout, order history|orders|
|||||
|/api/orders/{id}/tracking/|GET|Reassurance-framed tracking status|orders|
|||||
|/api/me/wardrobe/|GET|Purchase history with dream-origin<br>callouts|wardrobe|
|||||



Page 13 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

|||||
|---|---|---|---|
|**Endpoint**|**Method**|**Purpose**|**Module**|
|||||
|/api/me/|GET,<br>PATCH|Profile, bio, photo visibility|accounts|



## **7.3 Keeping the Contract Honest** 

**Recommendation:** use drf-spectacular to auto-generate an OpenAPI schema directly from the DRF serializers and views. Both frontend repos can then generate typed API clients from that schema (e.g. via openapi-typescript) instead of hand-writing fetch calls and risking drift from what the backend actually returns. This is a recommendation for the team to adopt, not yet wired into the scaffolded repos — flagged as a near-term setup task in Section 10. 

Page 14 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **8. Shared Design Language** 

Because there's no shared package between repos (Section 4.3), the visual brand has to be kept consistent by convention: the same token values, copied into each repo's own token file, not imported from a common source. 

## **8.1 Brand Tokens (from the PRD's brand principles)** 

||||
|---|---|---|
|**Token**|**Value**|**Use**|
||||
|color.ink|#2B2530|Primary text, headings|
||||
|color.rose|#B5485A|Primary accent — buttons, active<br>states|
||||
|color.roseLight|#F3E1E4|Soft backgrounds, badges|
||||
|color.sage|#5C6E5A|Secondary accent — gentle/calm UI<br>states|
||||
|color.grey|#6B6B6B|Secondary text, captions|
||||
|font.heading|A warm serif or humanist sans<br>(TBD by design)|Showcase card dreamer quotes —<br>needs the "slightly handwritten"<br>warmth from PRD 8.2.1|
||||
|font.body|System sans (SF Pro / Roboto<br>on mobile, Inter on web)|All standard UI text|



## **8.2 Calm-Tone Copy Rules (Enforced Convention, Not Code)** 

Per PRD Section 11.1, every notification, toast, and order-tracking message follows the calmtone rule. This can't be enforced by a linter, so it's documented once here and should be copyreviewed in both frontend repos against this same list: 

- No countdown urgency ("Only 2 left!", "Sale ends in 1 hour"). 

- No command-style CTAs in push copy ("BUY NOW") — prefer gentle questions or observations ("Still thinking about this one?"). 

- Order tracking copy stays at the reassurance/anticipation register (PRD Section 11.3) — never expose raw carrier status strings directly in the UI without rewriting them. 

Page 15 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **9. Local Development & CLAUDE.md Strategy** 

## **9.1 Quick Start (summary — full steps in each repo's README)** 

|||
|---|---|
|**Repo**|**Run locally with**|
|||
|dream-atelier-api|python -m venv venv && pip install -r requirements/dev.txt &&<br>python manage.py migrate && python manage.py runserver|
|||
|dream-atelier-mobile|npm install && npx expo start|
|||
|dream-atelier-web|npm install && npm run dev|



## **9.2 How the CLAUDE.md Files Relate** 

You supplied a general-purpose CLAUDE.md (behavioral guidelines: think before coding, simplicity first, surgical changes, goal-driven execution). That file is good as-is and not specific to this project — it's about how an AI coding agent should behave in any codebase. Rather than editing it, each of the three repos gets its own project-specific CLAUDE.md that assumes those general guidelines are already in effect and adds only what's specific to that repo: its module-toapp mapping, its own commands, and pointers back to this architecture document and the PRD for anything about product behavior. 

**Practical effect:** when Claude Code (or another agent) opens any of the three repos, it reads that repo's CLAUDE.md first. If your organization-wide behavioral CLAUDE.md is also present (e.g. at a higher directory level or merged in per your existing setup), the two combine — general behavior rules from yours, project specifics from the repo's own file. Section 11 ships the exact CLAUDE.md content for each repo. 

Page 16 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **10. Adding New Modules, Features & Functionality** 

This section exists because the brief explicitly asked for a repo structure that's simple to extend. Below is the literal, step-by-step recipe for adding something new, so this isn't a vague promise of "good architecture" but an actual checklist anyone (human or AI agent) can follow. 

## **10.1 Adding a New Backend Feature (e.g. a future "Styling Notes" automation)** 

1. Create a new app: python manage.py startapp styling_notes inside apps/. 

2. Add it to INSTALLED_APPS in config/settings/base.py — this is the only existing file touched. 

3. Define models in apps/styling_notes/models.py, inheriting core.AbstractBaseModel for consistent id/timestamps. 

4. Write serializers, views, and urls.py within the new app folder only. 

5. Wire the new app's urls into config/urls.py with one include() line. 

6. Register any admin needs in apps/styling_notes/admin.py. 

7. Write tests in apps/styling_notes/tests.py before/alongside the feature, per the goal-driven execution principle in your CLAUDE.md. 

**No existing app's files are modified** except the two single-line registrations in step 2 and step 

5. This is the concrete mechanism behind the diagram in Section 3. 

## **10.2 Adding a New Screen/Feature on Mobile or Web** 

1. Create src/features/{feature_name}/ with screens/ (or pages/ on web), components/, api.ts, hooks.ts. 

2. Add the new screen to the relevant navigator (mobile) or router config (web) — one new entry, existing routes untouched. 

3. If the feature needs a new API endpoint, that's a backend change first (Section 10.1) — frontend work should never invent business logic that the API doesn't also enforce (Section 2.3). 

## **10.3 What This Structure Deliberately Does Not Solve** 

Worth being honest about the limits here: this structure makes adding isolated features cheap, but it does not automatically prevent two apps from becoming entangled if a developer imports directly between them (e.g. catalog importing internals from dreams instead of going through dreams' public serializer). The convention to maintain is that apps talk to each other only through models' public fields and serializers, never by reaching into another app's internal 

Page 17 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

helper functions. This is a code-review discipline, not something enforced by the folder structure alone. 

Page 18 of 19 

Technical Architecture & Engineering Blueprint 

**Dream Atelier** 

## **11. What Ships With the Scaffolded Repos** 

Alongside this document, three starter repositories are provided, each containing: 

- The folder structure described in Sections 3 and 4, already created (not just described). 

- Working configuration: Django settings split by environment, Expo app.json, Vite config. 

- The data model from Section 5 implemented as actual Django models with migrations, for the dreams and catalog apps as a reference pattern — orders, wardrobe, and notifications are scaffolded as empty apps ready for the same treatment. 

- A project-specific CLAUDE.md in each repo, per Section 9.2. 

- A README.md per repo with the exact local setup commands from Section 9.1. 

- .env.example files listing every environment variable the app expects (database URL, Cloudinary keys, Razorpay keys, OTP provider keys) without real secrets. 

## **11.1 Suggested Immediate Next Steps** 

1. Resolve the PRD's Section 15 Open Decisions list — several (stage taxonomy, seed catalog, nav shell) directly affect what the dreams and catalog apps' models should look like before more migrations are written. 

2. Set up drf-spectacular (Section 7.3) early, before the API surface grows, so the contractdrift problem never starts. 

3. Pick and configure real hosting targets for all three repos (placeholders used throughout this document) and wire up CI for each independently. 

4. Decide the production OTP provider (e.g. Twilio, MSG91) — the PRD specifies phone OTP auth but not a vendor. 

Page 19 of 19 

