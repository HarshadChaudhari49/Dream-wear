Complete Product & Engineering Record 

**Dream Atelier** 

## **DREAM ATELIER** 

Complete Product & Engineering Record _From founding concept to working code, start to end_ 

**VISION  ·  PRODUCT SPEC  ·  ARCHITECTURE  ·  WHAT WAS BUILT** 

Part I — Product Requirements (Sections 1–16) Part II — Technical Architecture (Sections 17–27) Part III — What Was Built (Sections 28–31) 

Stack: React Native (Expo) + React (Web) + Django REST Framework Version 1.0  ·  June 2026 

Page 1 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **Table of Contents** 

Table of Contents ....................................................................................................................... 2 1. Executive Summary ............................................................................................................... 7 1.1 The Core Loop.................................................................................................................. 7 1.2 Document Scope .............................................................................................................. 7 2. Product Vision & Brand Principles .......................................................................................... 9 2.1 Vision Statement .............................................................................................................. 9 2.2 Brand Principles (apply to every screen, not just marketing) ............................................. 9 2.3 What Makes This Defensible ............................................................................................ 9 3. Primary Personas..................................................................................................................10 3.1 The Dreamer ...................................................................................................................10 3.2 The Browser/Buyer ..........................................................................................................10 3.3 The Designer/Tailor (internal/partner role) .......................................................................10 4. End-to-End User Journey ......................................................................................................11 5. Information Architecture & Navigation ...................................................................................13 5.1 Primary Navigation (Bottom Tab Bar — proposed) ..........................................................13 5.2 Sitemap ...........................................................................................................................13 6. Module 1 — Home Dashboard ..............................................................................................15 6.1 Screen Composition (top to bottom) ................................................................................15 6.1.1 Offer Banner .............................................................................................................15 6.1.2 Category Cards .........................................................................................................15 6.1.3 New Arrivals ..............................................................................................................15 6.1.4 Trending Now ............................................................................................................16 6.1.5 Product List ...............................................................................................................16 6.2 States to Design For ........................................................................................................16 6.3 Module 1 — Functional Requirements Summary .............................................................16 7. Module 2 — Explore All Products ..........................................................................................18 7.1 Product Card — Component Spec...................................................................................18 7.2 Filtering & Sorting ............................................................................................................18 7.3 Module 2 — Functional Requirements Summary .............................................................18 8. Module 3 — Dream Input & Showcase Feed.........................................................................20 8.1 Part 1 — Dream Input Screen ("Tell Us Your Vision") ......................................................20 8.1.1 Interaction & Tone Requirements ..............................................................................20 8.2 Part 2 — Showcase Cards ("Where Vision Becomes Real") ............................................20 8.2.1 Showcase Card — Component Spec ........................................................................21 

Page 2 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

8.2.2 Feed Behavior ...........................................................................................................21 8.3 Why This Module Carries Outsized Weight ......................................................................21 8.4 Module 3 — Functional Requirements Summary .............................................................21 9. Module 4 — My Dreams........................................................................................................23 9.1 My Dreams List View .......................................................................................................23 9.1.1 Status Taxonomy ......................................................................................................23 9.2 Empty State .....................................................................................................................23 9.3 Inspiration Layer: Other People's Stories .........................................................................24 9.4 Dream Detail / Stage Tracker ..........................................................................................24 9.5 Module 4 — Functional Requirements Summary .............................................................24 10. Module 5 — Profile, Wardrobe & Settings ...........................................................................26 10.1 My Wardrobe (Previously Bought) .................................................................................26 10.2 Edit Profile .....................................................................................................................26 10.3 Saved & Wishlist ............................................................................................................26 10.4 Settings .........................................................................................................................26 10.5 Module 5 — Functional Requirements Summary ...........................................................27 11. Module 6 — Notifications, Cart, Checkout & Order Tracking ...............................................28 11.1 Notifications ...................................................................................................................28 11.2 Cart & Checkout ............................................................................................................28 11.3 Order Tracking ...............................................................................................................28 11.4 Module 6 — Functional Requirements Summary ...........................................................29 12. Operations: The Dream-to-Garment Pipeline ......................................................................30 12.1 Manual Workflow (Launch) ............................................................................................30 12.2 Sourcing & Supply-Side Needs (from founder notes) .....................................................30 12.3 Admin/Internal Tooling Implied by This Workflow ...........................................................31 13. Confirmed Tech Stack .........................................................................................................32 13.1 Implications for Build Sequencing ..................................................................................32 14. Data Model (Proposed) .......................................................................................................34 14.1 Core Entities ..................................................................................................................34 14.1.1 User ........................................................................................................................34 14.1.2 Dream .....................................................................................................................34 14.1.3 DreamStage ............................................................................................................34 14.1.4 Product ...................................................................................................................34 14.1.5 Order .......................................................................................................................34 14.1.6 SavedItem / Wishlist ................................................................................................34 14.1.7 DesignerTailor (internal/admin-facing) .....................................................................34 

Page 3 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

14.2 Relationship Summary ...................................................................................................34 14.3 Status State Machine (Dream) .......................................................................................35 14.4 Privacy Flags Required by This Model ...........................................................................35 15. Open Decisions — Compiled ..............................................................................................36 15.1 Suggested Next Step .....................................................................................................37 16. Appendix .............................................................................................................................38 16.1 Glossary ........................................................................................................................38 16.2 Source Material .............................................................................................................38 16.3 Document Control ..........................................................................................................38 17. Purpose of This Document ..................................................................................................40 17.1 Confirmed Decisions This Document Builds On .............................................................40 18. Repository Strategy .............................................................................................................41 18.1 Why Three Separate Repos (and What It Costs) ...........................................................41 18.2 Repository Overview ......................................................................................................41 18.3 How the Pieces Talk to Each Other ...............................................................................41 19. Backend: dream-atelier-api .................................................................................................43 19.1 App Responsibilities ......................................................................................................43 19.2 Why Django Admin Matters Here...................................................................................44 19.3 Project Layout................................................................................................................44 20. Frontend Repos: Mobile & Web ..........................................................................................45 20.1 dream-atelier-mobile (React Native + Expo) ..................................................................45 20.2 dream-atelier-web (React + Vite) ...................................................................................45 20.3 What's Deliberately Not Shared .....................................................................................46 21. Data Model..........................................................................................................................47 21.1 Key Relationships, Explained ........................................................................................48 21.2 Dream Status Field ........................................................................................................48 22. The Dream-to-Garment Workflow .......................................................................................49 22.1 Enforcement Rules (Not Just UI Conventions) ...............................................................49 22.2 Where Each Step Lives in Code ....................................................................................50 23. API Contract ........................................................................................................................51 23.1 Authentication ................................................................................................................51 23.2 Representative Endpoints by Module ............................................................................51 23.3 Keeping the Contract Honest .........................................................................................52 24. Shared Design Language ....................................................................................................53 24.1 Brand Tokens (from the PRD's brand principles) ...........................................................53 24.2 Calm-Tone Copy Rules (Enforced Convention, Not Code) ............................................53 

Page 4 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

25. Local Development & CLAUDE.md Strategy .......................................................................54 25.1 Quick Start (summary — full steps in each repo's README) ........................................54 25.2 How the CLAUDE.md Files Relate ................................................................................54 26. Adding New Modules, Features & Functionality ..................................................................55 26.1 Adding a New Backend Feature (e.g. a future "Styling Notes" automation) ...................55 26.2 Adding a New Screen/Feature on Mobile or Web ..........................................................55 26.3 What This Structure Deliberately Does Not Solve ..........................................................55 27. What Ships With the Scaffolded Repos ...............................................................................57 27.1 Suggested Immediate Next Steps ..................................................................................57 28. What Was Built ...................................................................................................................59 28.1 dream-atelier-api — Built ...............................................................................................59 28.1.1 The One Rule Enforced in Code, Not Just Policy ....................................................60 28.1.2 What's Configured but Not Connected to Real Infrastructure ..................................60 28.2 dream-atelier-mobile — Built .........................................................................................60 28.3 dream-atelier-web — Built .............................................................................................61 29. Running All Three Repos Together .....................................................................................63 30. Consolidated Remaining Work ............................................................................................64 30.1 Product Decisions Needed (founder/team call, not engineering) ....................................64 30.2 Infrastructure Decisions Needed ....................................................................................64 30.3 Engineering Work Remaining (clear, scoped, ready to start) .........................................64 30.4 What Should Not Be Reopened Without Good Reason .................................................64 31. Appendix .............................................................................................................................66 31.1 Glossary ........................................................................................................................66 31.2 How This Document Was Assembled ............................................................................66 31.3 Source Material .............................................................................................................66 31.4 Document Control ..........................................................................................................67 

Page 5 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **PART I** 

## **Product Requirements** 

_What Dream Atelier needs to do, and why — sections 1 through 16_ 

Page 6 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **1. Executive Summary** 

**What this is:** A direct-to-consumer women's clothing platform where a customer describes the outfit she wants — in her own words, with optional mood tags, inspiration images, and occasion context — and a real human designer/tailor turns that description into a physical, purchasable garment. The finished piece is then published back into the app as a social, story-driven product card: her words next to the photo of the finished outfit. Other users browse this feed, buy what resonates, save what they love, and are prompted to submit their own dream — creating a selfreinforcing content and demand loop. 

**What it is not:** This is not a mass-production fast-fashion catalog, not an AI-only image generator with no real garment behind it, and not a generic e-commerce app with a request form bolted on. The dream-to-garment pipeline and the emotional, story-led feed ARE the product — not a feature inside it. 

## **1.1 The Core Loop** 

The entire product is built around one repeating cycle. Every module in this document exists to serve one of these five steps: 

1. She dreams — submits a free-text description of an outfit, optionally with mood tags, an inspiration photo, and an occasion. 

2. We create — the brief is routed to a human designer/tailor, who produces the garment (AIassisted generation is a planned future input to this step, not a v1 dependency). 

3. It's featured — with her explicit consent, the finished piece appears on the app as a Showcase Card: photo + her original words. 

4. It's discovered and bought — other users browse the Showcase feed, buy the piece, save it, or feel moved to submit a dream of their own. 

5. It compounds — the original dreamer sees social proof ("30 women loved your idea"), feels ownership and pride, and the wall of real stories grows organically, which is also the product's core trust signal for new visitors ("Is this real? Does this actually work?"). 

## **1.2 Document Scope** 

This PRD documents the full intended product vision across all 6 modules described in the founding concept, at a level of detail intended to brief engineering and design teams. It does not yet cut this scope down to a minimum viable product (MVP) — that prioritization exercise is flagged as an explicit open decision in Section 11, because several features described here (AIassisted generation, virality-based trending, real-time "stages of making" tracking) have meaningfully different build costs and the founding team should make that call deliberately rather than by default. 

Page 7 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

Wherever the source concept left a decision unresolved or only partially specified, this 

document calls it out explicitly as an ⚑ Open Decision rather than silently assuming an answer, so nothing gets built on an unstated guess. 

Page 8 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **2. Product Vision & Brand Principles** 

## **2.1 Vision Statement** 

_"A wardrobe should feel like an extension of who you are, not a costume you put on."_ 

The platform exists to close the gap between what a woman imagines for herself and what's actually available to buy. Fast fashion offers volume and trend-chasing; this platform offers personal authorship — every product on the platform began as one real woman's described idea, made physical, and made available to others. 

## **2.2 Brand Principles (apply to every screen, not just marketing)** 

- **Real over generated.** Real designs, made from real customer ideas, worn by real women, photographed candidly. Over-styled or stock-feeling photography works against the brand. 

- **Comfort is non-negotiable.** Not comfort that compromises style — comfort that elevates it. This is a product requirement that should inform fabric sourcing and tailor briefs, not just a marketing line. 

- **Calm, never pushy.** Notifications, checkout prompts, and order tracking use a gentle, reassuring tone. No urgency tactics ("BUY NOW", countdown pressure). This directly shapes copy guidelines in Module 6. 

- **Personal, not transactional.** Profile is framed as "her closet/diary," wishlist as "things you're dreaming about," stats as warm milestones, never as vanity leaderboards. 

- **Variety as foundation, not afterthought.** The catalog should hold genuinely different moods (soft, bold, classic, edgy, romantic, minimal) rather than one homogenous aesthetic — variety is core positioning, not a stretch goal. 

## **2.3 What Makes This Defensible** 

The founding concept is explicit that the wall of real submitted dreams is something "no fastfashion brand can ever copy." From a product standpoint, this means the Showcase feed (Module 3) and My Dreams archive (Module 4) are not secondary content sections — they are the primary trust and acquisition mechanism, and should be prioritized accordingly in any MVP cut. 

Page 9 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **3. Primary Personas** 

Two roles recur throughout this document. Most users move between them over time. 

## **3.1 The Dreamer** 

A woman who submits an outfit idea via the Dream Input screen (Module 3). She is emotionally invested in the outcome — she wants to feel heard, see her idea taken seriously, and ultimately wear something that feels authored by her. Her motivation is identity expression, not just acquiring a garment. 

- Primary touchpoints: Dream Input screen, My Dreams archive, push notifications about her dream's status. 

- Success for her: the finished garment matches what she pictured, she feels proud seeing it featured, and she sees social proof that others loved her idea. 

## **3.2 The Browser/Buyer** 

A woman exploring the app primarily to find and buy pieces, who may or may not ever submit her own dream. She is drawn in by the authenticity of the Showcase feed and by specific products in the catalog. A successful product converts a meaningful share of Browsers into Dreamers over time — this conversion is the engine behind the compounding loop in Section 1.1. 

- Primary touchpoints: Home Dashboard, Explore All Products, Showcase feed, Wishlist, Cart/Checkout. 

- Success for her: finds something genuinely different from mass-market options, trusts the brand because the stories feel real, and is nudged (not pushed) toward submitting her own dream. 

## **3.3 The Designer/Tailor (internal/partner role)** 

Not an end-user of the consumer app, but a critical actor in the core loop. Receives a customer's brief (text, mood tags, inspiration images, occasion), produces the garment, and supplies progress photos for the My Dreams stage-tracking feature. This document treats this role as a B2B/internal workflow, detailed in Section 5.3 and Section 9. 

Page 10 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **4. End-to-End User Journey** 

This section traces a single dream from submission to its second-order effect (inspiring another user), mapping it against the modules and screens involved. Use this as the reference flow when reviewing module specs in Sections 5-10 — every module exists to serve one stage of this journey. 

|||||
|---|---|---|---|
|**Stage**|**What happens**|**Module(s)**<br>**involved**|**Key state/data**<br>**created**|
|||||
|1. Discovery|New visitor opens app, sees<br>the Home Dashboard and/or<br>Showcase feed of real dreams-<br>to-garments.|Module 1, Module 3<br>(Part 2)|Session/anonymous<br>browsing|
|||||
|2. Trust<br>formed|Visitor sees real photos + real<br>customer words, answering "is<br>this real?"|Module 3 (Part 2)|—|
|||||
|3.<br>Submission|She signs up (Phone OTP),<br>opens Dream Input, describes<br>her outfit, optionally adds mood<br>tags, inspiration photo,<br>occasion.|Module 3 (Part 1)|Dream record: status<br>= Submitted|
|||||
|4. Routing|Brief is sent to a designer/tailor<br>(manual queue at launch).|Internal ops<br>(Section 9)|Dream record: status<br>= In Review /<br>Assigned|
|||||
|5. Making|Designer/tailor produces the<br>garment; progress photos<br>captured at stages.|Module 4 (stage<br>tracking)|Dream record: status<br>= In Progress, stage<br>photos attached|
|||||
|6. Delivery to<br>dreamer|Finished piece delivered first to<br>the woman who submitted the<br>idea.|Module 6 (Order<br>Tracking)|Dream record: status<br>= Delivered to<br>Dreamer|
|||||
|7. Consent &<br>publish|With her explicit blessing, the<br>piece is published as a<br>Showcase Card and added to<br>the purchasable catalog.|Module 3 (Part 2),<br>Module 1, Module 2|Dream record: status<br>= Live; Product record<br>created|
|||||
|8. Discovery<br>loop|Other users browse, buy, save,<br>or love the card; counts accrue.|Module 1, 2, 3|Product:<br>purchase/save/love<br>counts|
|||||



Page 11 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

|||||
|---|---|---|---|
|**Stage**|**What happens**|**Module(s)**<br>**involved**|**Key state/data**<br>**created**|
|||||
|9. Social<br>proof<br>returned|Original dreamer sees "30<br>women loved your idea" in her<br>My Dreams archive.|Module 4|Dream record: social<br>proof counters|
|||||
|10.<br>Compounding|She shares with friends; a new<br>visitor or existing browser<br>submits her own dream.|Module 3 (Part 1)|New Dream record<br>created → loop<br>restarts|
|||||



Page 12 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **5. Information Architecture & Navigation** 

## **5.1 Primary Navigation (Bottom Tab Bar — proposed)** 

The source concept describes 6 modules but does not specify the navigation shell that ties them together. This is called out as an open decision in Section 11.1; the structure below is the recommended default based on how the modules map to user intent. 

||||
|---|---|---|
|**Tab**|**Maps to**|**Primary intent**|
||||
|Home|Module 1|Browse curated/trending/new|
||||
|Dreams|Module 3 (both parts)|Submit a dream + browse the Showcase<br>feed|
||||
|Explore|Module 2|Full catalog search/browse|
||||
|My Dreams|Module 4|Track personal submissions|
||||
|Profile|Module 5|Wardrobe, wishlist, settings|



**Note:** Cart, checkout, notifications, and order tracking (Module 6) are cross-cutting — not a single tab — and are specified as system-wide behaviors in Section 10. 

## **5.2 Sitemap** 

- Home Dashboard (Module 1) 

   - Offer Banner 

   - Category Cards (Kurtis / Tops) 

   - New Arrivals 

   - Trending Now (future version) 

   - Full Product List 

- Explore All Products (Module 2) 

   - Product Detail Card → Shop This Look / Love-Save 

- Dreams (Module 3) 

   - Dream Input Screen (Part 1) 

   - Showcase Feed (Part 2) 

- My Dreams (Module 4) 

   - Dream Detail / Stage Tracker 

- Profile (Module 5) 

   - My Wardrobe (Previously Bought) 

Page 13 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

   - Saved & Wishlist 

   - Edit Profile 

   - Settings (Notifications, Privacy, Account, Help, Talk to Us) 

- Cross-cutting (Module 6) 

   - Cart & Checkout 

   - Order Tracking 

   - Notifications Center 

Page 14 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **6. Module 1 — Home Dashboard** 

_"The brain of the app"_ — the default landing screen. Showcases ready-to-buy designs, starting with kurtis and tops, expanding to dresses and co-ord sets in future versions. 

## **6.1 Screen Composition (top to bottom)** 

## **6.1.1 Offer Banner** 

Dynamic promotional banner at the top of the screen. Reference cited in source material: the Savana app's banner pattern (auto-rotating, image-led, tappable through to a campaign/landing page). 

- Auto-rotating carousel, swipeable, with dot indicators. 

- Each banner is an admin-configurable content unit: image, optional headline, deep link target. 

- **Data need:** admin-side CMS or simple backend table so banners can be updated without an app release. See Section 9.2. 

## **6.1.2 Category Cards** 

Two large cards directly below the banner for exploring the two launch categories: Kurtis and Tops. Each category is explicitly framed as "designed by real customers and available for anyone to purchase" — copy and visuals here should reinforce the dream-to-garment origin, not present as a generic category tile. 

- Tapping a card → filtered product list (reuses Module 2's product list component, prefiltered by category). 

- **Open decision:** category card artwork — use a real customer photo per category (reinforces authenticity) vs. an illustrated/stylized category icon. Recommend real photo given brand principle 2.2. 

## **6.1.3 New Arrivals** 

A dedicated section featuring customers' latest published designs. 

- Each entry: banner-style image of the outfit + a detailed description rendered in a dialoguebox / speech-bubble style UI (visually distinct from a standard product caption, intentionally evoking "someone is speaking") + a "Shop Now" button. 

- Sort order: most recently published first (publish = the moment a Dream's status becomes Live, per Section 4). 

- **Data need:** query on Product.publishedAt, filtered to isCustomerOriginated = true (see data model, Section 12). 

Page 15 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **6.1.4 Trending Now** 

## **FUTURE VERSION** 

Explicitly marked in the source concept as "planned for the next version" — included here for completeness of the full vision, but should not block an initial launch. 

Two qualifying triggers proposed for what counts as "trending": 

- **Delivery-based trending:** a product crosses a successful-delivery threshold (example given: 50 or 100 successful deliveries). 

- **Virality-based trending:** a spike in saves / shares / wishlist activity over a rolling window. 

**Open decision:** exact thresholds and the time window for "spike" detection are not specified in the source material and need a product/data decision before this can be built — flagged in Section 11.3. 

## **6.1.5 Product List** 

A scrollable list of all available items at the bottom of the Home screen, each with inline "Buy" and "Add to Cart" actions. Functionally, this is the same component used in Module 2's full catalog, just truncated/paginated for the home screen context. 

## **6.2 States to Design For** 

- Empty New Arrivals (no customer dreams published yet) — needs a graceful fallback, not a blank section, especially important at launch before the Showcase wall has volume. 

- Offline / slow network — banners and images should have placeholder/skeleton states given the image-heavy layout. 

- Logged-out browsing — Home should be fully browsable without an account; auth is only required at checkout or dream submission (standard for conversion-friendly e-commerce; confirm against Section 11.2 auth decision). 

## **6.3 Module 1 — Functional Requirements Summary** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
|M1-01|Display auto-rotating offer banner, admin-configurable, deep-<br>linkable.|Launch|
||||
|M1-02|Display two category cards (Kurtis, Tops) linking to filtered product<br>lists.|Launch|
||||
|M1-03|Display New Arrivals section sourced from recently published<br>customer-originated products.|Launch|



Page 16 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
||||
|M1-04|Render product descriptions in New Arrivals using a distinct<br>dialogue-box visual style.|Launch|
||||
|M1-05|Display scrollable full product list with Buy / Add to Cart actions.|Launch|
||||
|M1-06|Display Trending Now section with delivery-based and virality-based<br>qualifying logic.|Future<br>version|
||||
|M1-07|Support full unauthenticated browsing of Home.|Launch|



Page 17 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **7. Module 2 — Explore All Products** 

The full, unfiltered catalog of everything available in the store. Functions as the searchable/browsable counterpart to Home's curated sections. 

## **7.1 Product Card — Component Spec** 

This is the single most reused component in the app (appears in Home, Explore, Showcase, Wardrobe, Wishlist). Per the source material, each card should be "simple and minimal" and prioritize the following content, in priority order: 

1. Photo of the customer actually wearing the finished piece. Real and candid beats overstyled — this is a stated brand authenticity rule, not a style preference. Fallback: in-house model photo only when no customer photo is available or the dreamer opted out of being shown. 

2. "Shop This Look" button — every inspiring card must also be directly buyable. No card should be purely inspirational without a path to purchase. 

3. Love/Save action — lets browsers collect pieces that resonate with them, independent of purchase (feeds the Wishlist in Module 5). 

**Note on priority order:** the source material says the very first delivery priority is to _"the person who represents this idea"_ — i.e., before a piece is ever shown on Explore/Home, the dreamer herself must receive the finished garment and give consent. This is a fulfillment-sequencing rule, detailed as a hard gate in Section 9.1, not just a UI nicety. 

## **7.2 Filtering & Sorting** 

Not explicitly specified in the source material — recommended defaults below, flagged for founder confirmation: 

- Filter by category (Kurtis, Tops, and future categories as they launch). 

- Filter by mood/vibe tag (Soft, Bold, Classic, Edgy, Romantic, Minimal) — reuses the same tag taxonomy defined for Dream Input in Module 3, so a customer's mood selection at submission time becomes a discovery filter later. This connects two modules that the source material describes separately but which should share one tag system. 

- Sort by: Newest, Price, Most Loved (save count). 

## **7.3 Module 2 — Functional Requirements Summary** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
|M2-01|List all published, purchasable products in a scrollable/paginated<br>grid.|Launch|



Page 18 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
||||
|M2-02|Each card shows real customer photo (preferred) or model photo<br>(fallback), Shop This Look button, Love/Save action.|Launch|
||||
|M2-03|Support category filter (Kurtis, Tops).|Launch|
||||
|M2-04|Support mood/vibe tag filter shared with Dream Input taxonomy.|Launch|
||||
|M2-05|Support sort by newest, price, most loved.|Launch|
||||
|M2-06|Enforce dreamer-first delivery before a product can be marked<br>publishable (system-level gate, not just UI).|Launch|
||||



Page 19 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **8. Module 3 — Dream Input & Showcase Feed** 

**This is the emotional core of the product.** Per the source concept, this module should not feel like a form or a generic content feed — it should feel like journaling on the input side, and like a Pinterest board built from real stories on the output side. Every interaction design decision in this section should be checked against that bar. 

## **8.1 Part 1 — Dream Input Screen ("Tell Us Your Vision")** 

The emotional entry point of the entire product. Five components, in the order specified by the source material: 

1. **Open text space —** "Describe your dream outfit." Free-flowing, not restrictive; no character-count pressure or rigid structure. This should read and feel like a journal prompt, not a support-ticket field. 

2. **Mood/Vibe tags (optional at launch) —** quick-select chips: Soft, Bold, Classic, Edgy, Romantic, Minimal. Exists for women who struggle to put feelings into words. Explicitly optional per source material — full tag-driven matching/routing is a next-version enhancement. 

3. **Inspiration upload —** lets her attach a reference photo, a Pinterest screenshot, or even a colour swatch. Multi-image upload, no strict file-type gate beyond standard image formats. 

4. **Occasion tags —** Everyday, Celebration, Travel, Just for Me. Helps the designer/tailor understand context; this is functional metadata for Module 9 (designer briefing), not just a UI nicety. 

5. **Gentle prompt line —** "What feeling do you want this outfit to give you?" Designed to pull emotion, not specs. Should be presented as a soft, optional follow-up rather than a required field, consistent with the journaling tone. 

## **8.1.1 Interaction & Tone Requirements** 

- No red asterisks or harsh "required field" error states. If validation is needed (e.g., text box can't be empty on submit), use warm, first-person copy rather than system error tone. 

- Progressive disclosure is acceptable (e.g., mood tags and occasion tags can appear after she starts typing) but nothing should feel gated behind a multi-step wizard with a progress bar — that undercuts the "journaling, not filling a form" goal explicitly stated in source material. 

- On submit: an explicit confirmation moment that acknowledges her dream was received (not just a silent screen transition) — this is the first emotional payoff in the loop and should not be treated as a throwaway success toast. 

## **8.2 Part 2 — Showcase Cards ("Where Vision Becomes Real")** 

Page 20 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

The proof layer — visible evidence that submitted dreams actually become real, purchasable garments. This is the trust mechanism referenced in Section 1.1 that answers every new visitor's unspoken question. 

## **8.2.1 Showcase Card — Component Spec** 

1. Photo of her wearing the finished outfit. 

2. Her original words, displayed below the card exactly as she wrote them — unedited, attributed to her. Source material suggests a slightly handwritten-style font for warmth and legibility; this should be tested for actual readability at small sizes, not just chosen for aesthetic effect. 

**Open decision:** does the dreamer's name/handle appear on the card, or does it stay anonymous ("a woman who dreamed of...")? The source material emphasizes her words being attributed to her as "hers," which implies some level of named/identified attribution, but this has real privacy implications and should be an explicit opt-in choice at submission time, not a default. See Section 11.4. 

## **8.2.2 Feed Behavior** 

- Presented as a scrollable feed, structurally similar to a Pinterest board — variable card heights are acceptable and probably desirable, since uniform grid cards would undercut the personal, handmade feel. 

- Each card carries a Save/Heart action, independent of purchase, so visitors can save outfits or ideas that resonate with their own mood even before buying. 

- Cards should deep-link to the full purchasable product (this feed and the Module 2 catalog are two views into the same underlying Product+Dream record, not separate datasets). 

## **8.3 Why This Module Carries Outsized Weight** 

Per Section 2.3, the Showcase feed is the product's primary defensibility — a generic competitor can copy the UI, but not the accumulated real stories. This has two concrete implications for build sequencing, surfaced here and repeated in Section 11.3: 

- Launch needs enough seeded, real Dream→Product cycles completed before public launch that the feed doesn't look sparse or fake on day one — an empty or thin Showcase feed actively undermines the trust mechanic it exists to create. 

- The pipeline from "dream submitted" to "card published" (Sections 4 and 9) needs to be fast and reliable enough at launch that early dreamers actually get featured — a slow, manual backlog in the early weeks risks losing the very people the loop depends on. 

## **8.4 Module 3 — Functional Requirements Summary** 

Page 21 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
|M3-01|Dream Input: free-text open field, no required minimum length<br>beyond non-empty.|Launch|
||||
|M3-02|Dream Input: optional mood/vibe tag chips (Soft, Bold, Classic,<br>Edgy, Romantic, Minimal).|Launch|
||||
|M3-03|Dream Input: multi-image inspiration upload.|Launch|
||||
|M3-04|Dream Input: occasion tag selection (Everyday, Celebration, Travel,<br>Just for Me).|Launch|
||||
|M3-05|Dream Input: optional "what feeling" prompt field.|Launch|
||||
|M3-06|Submission confirmation screen/state with warm, non-generic copy.|Launch|
||||
|M3-07|Showcase feed: Pinterest-style scrollable masonry of published<br>Dream+Product cards.|Launch|
||||
|M3-08|Showcase card: customer photo + her original words rendered<br>verbatim, with attribution setting respected.|Launch|
||||
|M3-09|Showcase card: Save/Heart action independent of purchase.|Launch|
||||
|M3-10|Explicit consent capture from dreamer before any card is published.|Launch|
||||



Page 22 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **9. Module 4 — My Dreams** 

A dedicated, personal archive of everything a dreamer has submitted — visible to her, with a public-facing component (other people's stories, for inspiration) layered on the same screen. 

## **9.1 My Dreams List View** 

When she opens this screen, she sees every idea she's ever submitted, each rendered as a soft card containing: 

- A small thumbnail — her own reference/inspiration image if she provided one, or a gentle placeholder illustration if she didn't. 

- The first line of her dream, in her own words. 

- Date shared. 

- Current status (see status taxonomy below). 

## **9.1.1 Status Taxonomy** 

The source material references status conceptually ("current status of it") without enumerating the exact states. The list below is derived from the full pipeline traced in Section 4 and is recommended as the canonical status set — confirm against actual ops workflow once a designer/tailor pipeline exists (Section 9 ops detail, cross-reference Section 10): 

||||
|---|---|---|
|**Status**|**Meaning**|**Visible to dreamer as**|
||||
|Submitted|Dream received, not yet routed to a<br>designer.|"We've got your dream!"|
||||
|In Review|Being reviewed/assigned to a designer<br>or tailor.|"Someone's reading your<br>dream..."|
||||
|In Progress|Being made; stage photos may be<br>attached.|"It's coming to life" + stage photos|
||||
|Delivered to<br>Dreamer|Finished piece shipped/delivered to her<br>first.|"It's on its way to you"|
||||
|Live|Published as a Showcase card +<br>purchasable product (post-consent).|"X women loved your idea"|
||||
|Declined/Paused|Not moving forward (capacity,<br>feasibility, or her own choice).|Honest, gentle messaging —<br>avoid silence|
||||



## **9.2 Empty State** 

Page 23 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

If she hasn't shared anything yet, the screen should not simply be blank. Source-specified copy: a warm empty message — "Your dreams will live here. Share your first one?" — with a button that routes directly to the Dream Input screen (Module 3, Part 1). 

## **9.3 Inspiration Layer: Other People's Stories** 

Below her own dreams list, the screen also surfaces stories from other dreamers, for inspiration. This is functionally a smaller, embedded version of the Showcase feed (Module 3, Part 2) — recommend reusing the same Showcase Card component rather than building a parallel one. 

## **9.4 Dream Detail / Stage Tracker** 

Tapping a dream card opens the full story of that one idea — including the visual progress captured while it's being made, presented as stages with images. 

- **Stages:** not explicitly enumerated in source material. Recommended default sequence: Brief Received → Fabric/Pattern Selected → In Production → Quality Check → Shipped — each stage optionally carries a photo supplied by the designer/tailor. This needs confirmation against actual production workflow once tailor partners are onboarded (Section 9 ops, Section 11.5). 

- **Locked final action:** the source material specifies that the final action button on this screen "stays locked with a quiet 'unlocks soon'" — deliberately building anticipation without frustration. What this final action actually is (e.g., "reorder this exact piece," "request a variation," "share your finished look") is not specified in source material and needs a product decision before this can be designed. Flagged in Section 11.6. 

- **Social proof line:** under each viral idea card, display lines like "12 women loved your idea." This reuses the same love/save counters tracked on the published Product (Module 2, Section 7.1) but surfaced back to the original dreamer — i.e., this is one counter with two display contexts, not two separate counters. 

## **9.5 Module 4 — Functional Requirements Summary** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
|M4-01|Display list of all dreams submitted by the current user, each with<br>thumbnail, first line, date, status.|Launch|
||||
|M4-02|Empty state with warm copy and direct CTA into Dream Input.|Launch|
||||
|M4-03|Surface other dreamers' published stories for inspiration below the<br>personal list.|Launch|
||||
|M4-04|Dream detail view with stage-by-stage progress images.|Launch|
||||



Page 24 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
|M4-05|Locked "unlocks soon" final action button (destination TBD — see<br>Open Decisions).|Launch<br>(placeholder)<br>/ Future (full<br>feature)|
||||
|M4-06|Surface social-proof love count ("X women loved your idea") on<br>each dream once Live.|Launch|
||||



Page 25 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **10. Module 5 — Profile, Wardrobe & Settings** 

Explicitly reframed away from a standard "My Account" screen. Source framing: "her closet, her diary, her story, all in one warm, personal space." 

## **10.1 My Wardrobe (Previously Bought)** 

Everything she's bought, presented like a real closet rather than an order history table. 

- Soft grid of purchased outfits, each tappable to revisit full detail. 

- "Wear it again" button per piece → straight reorder, or repurchase in another colour. 

- **Dream-origin callback:** if a purchased piece originated from her own submitted dream, show her original words under it — e.g., "This started as your wish for something soft for work." This is an explicit emotional through-line connecting Module 5 back to Module 3/4 and should not be treated as optional polish; it's the moment the full loop closes for her personally. 

- Photo + name, optional — privacy-respecting default of a soft illustrated avatar if she skips uploading a photo. 

- Styling notes per piece (e.g., "Pairs beautifully with...") — source material frames this as turning the closet into "a quiet stylist." At launch this likely needs to be manually curated by the team per product; automated styling recommendations are a reasonable future-version upgrade. 

## **10.2 Edit Profile** 

- Personal bio line, written by her, gentle tone (example given: "Lover of soft fabrics and slow mornings"). 

- Photo + name + standard profile fields. 

- **Quiet stat line —** explicitly not vanity metrics or a leaderboard. Example given: "3 dreams shared · 5 pieces loved (wish-list)." Copy and visual treatment should stay understated; avoid badge/achievement-style UI patterns common in gamified apps, since that directly conflicts with brand principle 2.2. 

## **10.3 Saved & Wishlist** 

- Soft collection of pieces she's hearted but hasn't bought. 

- **Required framing:** "Things you're dreaming about," not a plain "Wishlist" label — this is a stated copy requirement, not a suggestion. 

## **10.4 Settings** 

Page 26 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

- Standard fields: Notifications, Privacy, Account, Help. 

- **"Talk to us" —** an AI-assisted support module. Source material flags this as a module needing its own scoping; treat as a distinct sub-feature with its own requirements (chat UI, escalation to human support, scope of what it can answer) rather than a simple FAQ link. See Section 11.7. 

_Note from source material:_ "Remaining fields will be same as another app's" — this is a placeholder instruction to benchmark against a reference app the founder has in mind, not yet specified. Flagged in Section 11.8. 

## **10.5 Module 5 — Functional Requirements Summary** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
|M5-01|My Wardrobe grid of past purchases with detail view per piece.|Launch|
||||
|M5-02|"Wear it again" reorder/recolor action per piece.|Launch|
||||
|M5-03|Dream-origin callback text on purchased pieces that originated from<br>the user's own dream.|Launch|
||||
|M5-04|Optional photo upload with illustrated-avatar fallback.|Launch|
||||
|M5-05|Editable personal bio line.|Launch|
||||
|M5-06|Quiet, non-gamified stat line (dreams shared / pieces loved).|Launch|
||||
|M5-07|Wishlist screen framed as "Things you're dreaming about."|Launch|
||||
|M5-08|Standard settings: notifications, privacy, account, help.|Launch|
||||
|M5-09|"Talk to us" AI-assisted support entry point.|Future<br>version<br>(needs<br>scoping)|
||||
|M5-10|Manually curated per-piece styling notes ("Pairs beautifully with...").|Launch<br>(manual) /<br>Future<br>(automated)|
||||



Page 27 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **11. Module 6 — Notifications, Cart, Checkout & Order Tracking** 

Cross-cutting systems that touch every other module. Grouped here because they share one governing constraint stated directly in the source material: every interaction in this layer must stay calm and reassuring, never urgent or pushy — described explicitly as something that would "break brand's calm tone" if done wrong. 

## **11.1 Notifications** 

- **Tone rule (hard constraint):** gentle, non-pushy nudges only. Example given of the right tone: "Still thinking about this one?" Example given of what to avoid: aggressive "BUY NOW" urgency framing. 

- Notification types needed across the product: dream status updates (Module 4), new arrivals relevant to saved moods (Module 1/2), wishlist reminders, order/shipping updates (Section 11.3), social proof updates ("X women loved your idea"). 

- **Open decision:** push notification permissions/timing strategy and frequency caps are not specified in source material and should be defined before implementation, particularly because the calm-tone constraint makes typical e-commerce notification cadences (multiple daily pushes) inappropriate by the brand's own stated values. 

## **11.2 Cart & Checkout** 

- Standard add-to-cart and checkout flow, payment via Razorpay (confirmed tech stack choice, Section 13). 

- Toast messages and alerts required for every CRUD operation across the app (explicit source requirement) — applies to cart actions, dream submission, save/love actions, profile edits, etc. This is a global UI requirement, not specific to checkout, and should be treated as a cross-app design-system rule. 

## **11.3 Order Tracking** 

Source material specifies order tracking should do exactly two jobs — no more: 

1. Reassure — communicate that the order is handled, nothing to worry about. 

2. Build anticipation — communicate that something lovely is on its way. 

This is a deliberate scope constraint: it explicitly excludes turning order tracking into a dense logistics/status-code screen. Carrier-level granular tracking (Delhivery, BlueDart, India Post — confirmed shipping partners, Section 13) can exist underneath, but the customer-facing presentation layer should stay at the emotional register described above, not expose raw carrier statuses verbatim. 

Page 28 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **11.4 Module 6 — Functional Requirements Summary** 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
|M6-01|Notification system with calm-tone copy guidelines enforced as a<br>content standard.|Launch|
||||
|M6-02|Notification types: dream status, new arrivals, wishlist reminders,<br>shipping, social proof.|Launch|
||||
|M6-03|Cart and checkout flow integrated with Razorpay.|Launch|
||||
|M6-04|Toast/alert confirmation on every create/update/delete action app-<br>wide.|Launch|
||||
|M6-05|Order tracking UI limited to reassurance + anticipation framing,<br>backed by carrier data underneath.|Launch|
||||
|M6-06|Carrier integration: Delhivery, BlueDart, India Post.|Launch|
||||



Page 29 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **12. Operations: The Dream-to-Garment Pipeline** 

This is the part of the product that lives outside the app itself but determines whether the core loop (Section 1.1, Section 4) actually works at the speed and quality the brand promises. Per the founder's confirmation, designers/tailors handle this manually at launch — there is no AIgeneration step in v1. 

## **12.1 Manual Workflow (Launch)** 

1. Dream submitted via app (Module 3, Part 1) → creates a Dream record with status Submitted. 

2. Internal team reviews the brief (text + mood tags + inspiration images + occasion) and routes it to a designer/tailor, manually at launch. Status → In Review. 

3. Designer/tailor accepts and begins production. Status → In Progress. Stage photos are captured and uploaded by the designer/tailor (or by internal staff on their behalf) at each meaningful step, feeding the Module 4 stage tracker. 

4. Finished piece is shipped to the original dreamer first — this sequencing is a hard rule from the source material, not a suggestion. Status → Delivered to Dreamer. 

5. Team requests her explicit consent to publish (this should be an active opt-in ask, not a passive default, given the privacy implications flagged in Section 8.2.1 / Section 14.4). If granted: a Product record is created, linked to the Dream, and the Showcase card goes live. Status → Live. 

## **12.2 Sourcing & Supply-Side Needs (from founder notes)** 

The source material lists several operational dependencies that exist outside the app's codebase but materially affect whether the product can function. Capturing them here so engineering scoping accounts for the integrations and admin tooling they imply: 

- **Fabric sourcing:** fabric will be collected based on customer feedback or founder discretion. Implies a need for an internal fabric/material catalog, even if simple, so designer briefs can reference available options. 

- **Tailors & manufacturers:** to be found online or through existing market contacts, with an eventual goal of building an in-house production capability. This is a staffing/ops question, but the app needs a way to represent "who is making this" internally even if that's never customer-facing. 

- **Non-engineering roles explicitly called out as needed:** banner/photoshoot design, sales & analysis reporting, social media management. These are hiring needs, not app features, but are included here because Module 1's offer banners and Module 3's photography quality directly depend on them. 

Page 30 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **12.3 Admin/Internal Tooling Implied by This Workflow** 

The consumer-facing modules in Sections 6-11 all assume an internal admin system exists to manage them. This admin layer is not separately specified in the source material but is a hard prerequisite for the product to function — flagged here as in-scope build work, not optional tooling: 

|||
|---|---|
|**Admin capability**|**Serves which module**|
|||
|Dream queue: view, triage, assign<br>Submitted dreams to a designer/tailor|Module 3 / Section 12.1|
|||
|Dream status updates + stage photo upload|Module 4|
|||
|Consent capture + product publishing<br>workflow|Module 3, Module 1, Module 2|
|||
|Banner/CMS management for Home offer<br>banner|Module 1|
|||
|Product catalog management (pricing,<br>inventory, categories)|Module 1, Module 2|
|||
|Basic fabric/material reference list|Section 12.2|
|||
|Order and shipment status sync from<br>carriers|Module 6|



**Open decision:** whether this admin layer is a bespoke internal tool built alongside the consumer app, or a lightweight wrapper on top of Supabase's existing dashboard for v1. Given the confirmed Supabase/PostgreSQL backend (Section 13), a thin custom admin panel reading/writing the same tables is the recommended default rather than building two separate systems, but this needs founder sign-off given it's real, additional build scope. 

Page 31 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **13. Confirmed Tech Stack** 

As specified by the founding team. This document does not second-guess these choices, but notes implications for the build where relevant. 

||||
|---|---|---|
|**Layer**|**Choice**|**Notes**|
||||
|Frontend<br>(mobile)|React Native + Expo|Single codebase for iOS/Android; Expo<br>simplifies OTA updates for banner/content<br>changes.|
||||
|Frontend<br>(web)|Next.js (React)|Marketing site + web app surface, likely shares<br>component library with mobile via a design<br>system.|
||||
|Backend & DB|Supabase, PostgreSQL,<br>Node.js + NestJS|Supabase gives auth, storage, and realtime<br>out of the box; NestJS layer for custom<br>business logic (dream routing, status<br>transitions, admin workflows).|
||||
|Image storage|Cloudinary or GCP|Image-heavy app (every product, every dream,<br>every stage photo) — recommend Cloudinary<br>specifically for built-in responsive transforms<br>given the volume of customer photography<br>described across Modules 1-5.|
||||
|Authentication|Supabase Auth with Phone<br>OTP|India-first user base; phone OTP is the right<br>default. Confirm fallback for users without<br>consistent SMS reception.|
||||
|Payments|Razorpay|India-focused gateway; integrates with Module<br>6 checkout.|
||||
|Shipping|Delhivery, BlueDart, India<br>Post|Multiple carriers implies an abstraction layer in<br>the backend so Module 6's order tracking<br>doesn't hardcode carrier-specific logic.|



## **13.1 Implications for Build Sequencing** 

- The realtime capability in Supabase is a natural fit for Module 4's stage-tracking and socialproof counters ("X women loved your idea") updating live without requiring a full app refresh. 

- Because image volume is high across nearly every module, establish the Cloudinary/GCP pipeline and image-handling conventions early — this is a dependency for Modules 1, 2, 3, 4, and 5, not a late-stage concern. 

Page 32 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

- NestJS business logic should own the Dream status state machine (Section 12.1) as a single source of truth, since at least four modules (3, 4, 1/2 on publish) read or react to that status. 

Page 33 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **14. Data Model (Proposed)** 

Not specified in source material — this is a recommended starting schema derived from the functional requirements in Sections 6-11, intended as a discussion draft for the engineering team rather than a final schema. 

## **14.1 Core Entities** 

## **14.1.1 User** 

- id, phone (OTP-verified), name, bio, avatarUrl (nullable — illustrated avatar fallback), photoVisibility (public/avatar-only), createdAt 

## **14.1.2 Dream** 

- id, userId (submitter), freeText, moodTags[] (nullable), inspirationImages[], occasionTag, feelingPrompt (nullable), status (Submitted / In Review / In Progress / Delivered to Dreamer / Live / Declined-Paused), consentToPublish (boolean, default false), consentRequestedAt, consentGrantedAt, assignedDesignerId (nullable), createdAt 

## **14.1.3 DreamStage** 

- id, dreamId, stageName, stagePhotoUrl (nullable), notes, createdAt — one-to-many against Dream, powers Module 4's stage tracker 

## **14.1.4 Product** 

- id, originDreamId (nullable — null for non-customer-originated/model-photographed pieces), title, category (Kurti / Top / future categories), moodTags[], priceInINR, customerPhotoUrl (preferred) / modelPhotoUrl (fallback), description, publishedAt, deliveryCount, saveCount, loveCount, shareCount, isPublishable (gate enforced per Section 7.1's dreamer-first delivery rule) 

## **14.1.5 Order** 

- id, userId, productId(s), status, carrier (Delhivery/BlueDart/India Post), trackingRef, totalInINR, createdAt 

## **14.1.6 SavedItem / Wishlist** 

- id, userId, productId, createdAt 

## **14.1.7 DesignerTailor (internal/admin-facing)** 

- id, name, contactInfo, specialty/category, active assignment(s) — minimal record needed to support the admin queue in Section 12.3 

## **14.2 Relationship Summary** 

Page 34 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

One Dream produces at most one Product (when published). One Product may have zero originating Dreams (non-customer-originated catalog items, if any exist at launch — see Open Decision in Section 15.9 on whether the catalog launches purely dream-sourced or with a seed catalog). A User can have many Dreams, many Orders, many SavedItems. 

## **14.3 Status State Machine (Dream)** 

Submitted → In Review → In Progress → Delivered to Dreamer → Live, with Declined/Paused reachable from any pre-Live state. No state should be skippable in the customer-facing UI even if internal ops occasionally fast-track a step, so that Module 4's stage tracker always tells a coherent story. 

## **14.4 Privacy Flags Required by This Model** 

Two privacy-sensitive fields are required by the functional spec and should not be treated as nullable afterthoughts: 

- **User.photoVisibility:** governs whether her real photo or an illustrated avatar shows in her profile (Module 5, Section 10.1). 

- **Dream.consentToPublish:** must default to false and require an explicit, logged grant before a Product can be created from a Dream — this is the technical enforcement of the "first delivered to her, then published with her blessing" rule repeated across Sections 4, 7.1, and 12.1. 

Page 35 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **15. Open Decisions — Compiled** 

Every item below was flagged inline in its relevant section because the source concept left it unresolved or only partially specified. Compiled here as a single checklist so the founding team can work through them before (or alongside) the build, rather than having engineering guess and build the wrong thing. Each references back to its source section. 

|||||
|---|---|---|---|
|**#**|**Decision needed**|**Why it matters**|**Ref.**|
|||||
|1|Primary navigation shell —<br>confirm bottom-tab structure<br>(Home / Dreams / Explore / My<br>Dreams / Profile) or an<br>alternative IA.|Determines how all 6 modules are<br>stitched together; affects every<br>screen's nav chrome.|5.1|
|||||
|2|Auth gating — confirm<br>browsing is fully open and auth<br>is only required at<br>checkout/dream submission.|Affects conversion funnel and<br>onboarding flow design.|6.2|
|||||
|3|Trending Now thresholds —<br>exact delivery-count threshold<br>and the time window/sensitivity<br>for virality detection.|Cannot be built without concrete<br>numbers; currently only examples<br>(50/100) are given.|6.1.4|
|||||
|4|Showcase card attribution —<br>does the dreamer's<br>name/handle show on her<br>card, or does it stay<br>anonymous by default?|Real privacy + consent implications;<br>affects the data model's consent<br>fields.|8.2.1, 14.4|
|||||
|5|Production stage taxonomy —<br>confirm the actual stage names<br>used by designers/tailors<br>(proposed: Brief Received →<br>Fabric/Pattern Selected → In<br>Production → Quality Check →<br>Shipped).|Module 4's stage tracker is built<br>directly off this list; needs to match<br>real ops, not a guess.|9.4|
|||||
|6|Locked "final action" on Dream<br>detail — define what this<br>button actually does once<br>unlocked (reorder exact piece?<br>request variation? share<br>finished look?).|Currently specified only as a<br>placeholder ("unlocks soon") with<br>no defined destination.|9.4|
|||||



Page 36 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

|||||
|---|---|---|---|
|**#**|**Decision needed**|**Why it matters**|**Ref.**|
|||||
|7|"Talk to us" AI support —<br>scope what it can answer,<br>whether/how it escalates to a<br>human, and whether it ships at<br>launch or later.|Currently just a label in source<br>material; meaningfully different<br>builds depending on scope.|10.4|
|||||
|8|Settings parity reference app<br>— identify the specific app the<br>founder meant by "remaining<br>fields will be same as another<br>app's."|Needed to actually fill in standard<br>settings fields rather than guessing.|10.4|
|||||
|9|Seed catalog — does the<br>product launch purely with<br>dream-sourced products, or<br>does it need a seed catalog<br>(non-dream-originated pieces)<br>to avoid a sparse Day 1<br>storefront?|Affects both data model<br>(Product.originDreamId nullability)<br>and launch readiness.|8.3, 14.2|
|||||
|10|Admin tooling approach —<br>bespoke internal admin app vs.<br>a thin layer over Supabase's<br>dashboard for v1.|Real, additional scope either way;<br>needs explicit sign-off rather than<br>default assumption.|12.3|
|||||
|11|Notification<br>cadence/permissions strategy<br>— frequency caps and timing,<br>consistent with the calm-tone<br>brand constraint.|Typical e-commerce push cadences<br>conflict with the brand's own stated<br>values; needs deliberate limits.|11.1|
|||||
|12|MVP cut — which of the above<br>(and which future-version-<br>tagged features) actually<br>belong in v1 vs. later phases.|This document deliberately<br>documents full vision without cutting<br>scope, per current direction; this<br>remains the single biggest follow-on<br>decision before sprint planning.|1.2|
|||||



## **15.1 Suggested Next Step** 

Recommend a single working session with the founding team to resolve items 1-11 above (most are quick founder calls, not deep design exercises), followed by a dedicated MVP-scoping pass (item 12) before sprint planning begins. Items already tagged Future Version throughout this document (Trending Now in Module 1, automated styling notes in Module 5, AI-assisted generation in the ops pipeline) are reasonable default exclusions from a v1 cut, but that should be a confirmed decision, not an assumption carried forward silently. 

Page 37 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **16. Appendix** 

## **16.1 Glossary** 

|||
|---|---|
|**Term**|**Meaning in this document**|
|||
|Dream|A customer's submitted outfit description, the unit of input to the core<br>loop.|
|||
|Dreamer|The user who submitted a given Dream.|
|||
|Showcase Card|The published photo + her-own-words content unit shown in the Module<br>3 feed.|
|||
|Stage tracker|The Module 4 view showing progress photos as a Dream becomes a<br>physical garment.|
|||
|Core loop|The five-step cycle defined in Section 1.1: dream → create → feature →<br>discover/buy → compound.|



## **16.2 Source Material** 

This PRD is derived from the founding team's original concept document (provided as a PDF), covering the product vision, brand voice, all 6 functional modules, and the confirmed tech stack. Where this PRD adds structure, defaults, or recommendations beyond the source material, it is explicitly marked as such inline (Open Decision callouts, Future Version tags, and "recommended default" language). 

## **16.3 Document Control** 

Version 1.0 — full-vision PRD, pre-MVP-scoping, prepared for engineering and design briefing. Recommend versioning this document going forward as decisions in Section 15 are resolved, rather than maintaining decisions in a separate untracked doc. 

Page 38 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **PART II** 

## **Technical Architecture** 

_How it gets built — sections 17 through 27_ 

Page 39 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **17. Purpose of This Document** 

The Product Requirements Document (PRD v1.0) defines what Dream Atelier needs to do — six modules, a dream-to-garment workflow, and a calm, story-driven brand voice. This document defines how that gets built: the system architecture, the three-repository structure, the data model, the API contract between frontend and backend, and the conventions that keep the codebase easy to extend as new modules and features are added. 

**Audience:** engineers joining the project, and Claude Code (or any AI coding agent) working inside any of the three repos. Each repo ships its own _CLAUDE.md_ — Section 25 explains how those relate to each other and to this document. 

## **17.1 Confirmed Decisions This Document Builds On** 

- Three fully separate repositories: dream-atelier-api, dream-atelier-mobile, dream-atelierweb. No monorepo tooling, no shared package between them beyond a documented API contract. 

- Mobile (React Native + Expo) and Web (React) are both built from day one, as two real, independent products against the same backend — neither is a stub or a future phase. 

- Backend: Django + Django REST Framework + PostgreSQL, replacing the PRD's original NestJS/Supabase suggestion. Image storage (Cloudinary/GCP), payments (Razorpay), and shipping carriers (Delhivery, BlueDart, India Post) remain as specified in the PRD. 

- Designers/tailors are real people working from a manually-routed brief at launch. No AI image generation in the pipeline for v1 — this shapes the data model's DreamStage tracking in Section 21. 

Page 40 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **18. Repository Strategy** 

Three repos, one contract. The Django API is the single source of truth for data and business logic; both frontends are consumers of the same REST endpoints. Neither frontend repo depends on the other, and the API repo has no knowledge of either frontend's internal structure. 

## **18.1 Why Three Separate Repos (and What It Costs)** 

This is a deliberate tradeoff, not a default. Separate repos buy independence: the mobile team can ship without touching web code, the API can deploy on its own schedule, and each repo's CI pipeline only runs what's relevant to it. The cost is that anything shared — types, validation rules, the visual design language — has to be either duplicated deliberately or formalized as a versioned contract instead of a shared import. Section 22 (API contract) and Section 24 (design tokens) exist specifically to manage that cost. 

## **18.2 Repository Overview** 

|||||
|---|---|---|---|
|**Repo**|**Stack**|**Deploys to**|**Owns**|
|||||
|dream-atelier-api|Django 5 + DRF +<br>PostgreSQL|Render/Railway/EC2<br>(TBD)|All data,<br>business logic,<br>admin UI, auth|
|||||
|dream-atelier-mobile|React Native + Expo<br>(TypeScript)|App Store + Play<br>Store via EAS|iOS/Android app|
|||||
|dream-atelier-web|React + Vite (TypeScript)|Vercel/Netlify (TBD)|Marketing site +<br>web app|



## **18.3 How the Pieces Talk to Each Other** 

Page 41 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

_Both frontends call one Django API, which is the only thing that talks to the database and external services._ 

Both frontends are pure API consumers — they hold no business logic that the backend doesn't also enforce server-side. This matters because a mobile app's client-side validation can always be bypassed by someone calling the API directly; every rule that matters (the dreamer-first delivery gate, consent requirements, status transitions) is enforced in Django, and the frontend checks are there only for responsive UX, not as the actual guarantee. 

Page 42 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **19. Backend: dream-atelier-api** 

Django organized as one app per product module, mirroring the PRD's module numbering rather than a generic MVC split. The goal stated in the brief — simple to extend with new modules, features, and functionality — is solved structurally: a new feature is a new Django app, registered once in settings, never requiring changes to existing apps' internals. 

_Each Django app owns one slice of the product. New functionality is added as a new app, not as changes scattered across existing ones._ 

## **19.1 App Responsibilities** 

|**App**|**PRD module**|**Responsibility**|
|---|---|---|
|core|—|Abstract base models (timestamps, UUID pk), shared<br>utilities, custom permissions|
|accounts|—|User model, phone OTP auth, profile fields, photo visibility<br>setting|
|dreams|Module 3 & 4|Dream submission, status state machine, DreamStage<br>tracking, consent capture|
|catalog|Module 1 & 2|Product, banners, categories, mood tags, trending logic,<br>search/filter|
|orders|Module 6|Cart, checkout, Razorpay integration, Order/OrderItem,<br>carrier sync|



Page 43 of 67 

Complete Product & Engineering Record 

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



## **19.2 Why Django Admin Matters Here** 

The PRD (Section 12.3) flags that an internal admin layer is a hard prerequisite, not optional tooling — someone has to triage the dream queue, assign designers, upload stage photos, and approve products for publishing. Django's built-in admin, customized per-app via ModelAdmin classes, covers most of this without a separate internal tool. The ops app exists specifically to hold the customizations (custom admin actions like "assign to designer" or "publish product from dream") that go beyond what a default ModelAdmin provides. 

## **19.3 Project Layout** 

Actual directory structure (also reflected in the scaffolded repo): 

- config/ — settings, root urls.py, wsgi/asgi entrypoints, split into base.py / dev.py / prod.py 

- apps/ — one directory per app from the table above, each with models.py, serializers.py, views.py, urls.py, admin.py, tests.py 

- apps/core/ — shared AbstractBaseModel, custom permission classes, common pagination class 

- requirements/ — base.txt, dev.txt, prod.txt (split so production doesn't install dev/test tooling) 

- manage.py, .env.example, README.md, CLAUDE.md 

Page 44 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **20. Frontend Repos: Mobile & Web** 

Both frontend repos use the same feature-folder convention and the same feature names as the backend's apps, so a contributor moving between repos finds dreams-related code under a folder called dreams in all three places. This is a naming convention only — there is no shared code between the repos, by the founder's explicit choice (Section 18). 

_Mobile and web mirror each other's feature folders. Screens differ; the underlying concepts and naming don't._ 

## **20.1 dream-atelier-mobile (React Native + Expo)** 

- src/features/{home, catalog, dreams, wardrobe, orders}/ — each with screens/, components/, api.ts (typed fetch calls to the Django API), and hooks.ts 

- src/navigation/ — React Navigation stacks/tabs matching the PRD's proposed IA (Section 5.1): Home, Dreams, Explore, My Dreams, Profile 

- src/shared/ — design tokens, primitive components (Button, Card, TextInput) used across features, API client base config 

- app.json / eas.json — Expo and EAS Build configuration 

## **20.2 dream-atelier-web (React + Vite)** 

- src/features/{home, catalog, dreams, wardrobe, orders}/ — same shape as mobile, webappropriate components 

- src/routes/ — React Router routes matching the same IA 

Page 45 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

- src/shared/ — design tokens (kept in sync with mobile's values manually, per Section 24), primitive components 

## **20.3 What's Deliberately Not Shared** 

No shared npm package, no monorepo workspace, no symlinked code between mobile and web. If a validation rule or a piece of copy needs to match across both (e.g. the calm-tone notification copy rules from PRD Section 11.1), it is documented once in this architecture doc or in a shared CLAUDE.md excerpt (Section 25) and implemented twice. This is the direct cost of the three-repo decision, called out explicitly so it isn't accidentally violated later by introducing a shared package that re-couples the repos. 

Page 46 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **21. Data Model** 

This extends the proposed schema from the PRD (Section 14) into the actual Django models that will exist in the dreams, catalog, orders, and wardrobe apps. Field names below map directly to Django model fields, not just a conceptual sketch. 

Page 47 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

_Entity-relationship diagram for the core schema. A Dream optionally becomes a Product once published; everything downstream (orders, saves) reads from Product._ 

## **21.1 Key Relationships, Explained** 

- **Dream → Product is optional and one-directional.** Not every Dream becomes a Product (it may be declined or stay private). A Product's origin_dream_id is nullable specifically to support the PRD's Open Decision #9 (seed catalog) — if the team decides to launch with some non-dream-originated pieces, the schema already supports it without a migration. 

- **DreamStage is its own table, not a JSON field.** Stage tracking (PRD Module 4) needs ordering, timestamps, and per-stage photos. A separate table with a foreign key to Dream keeps this queryable and lets the admin (Section 19.2) add a new stage with a normal form, rather than editing a blob. 

- **SavedItem and OrderItem are both join tables.** SavedItem links User to Product for wishlist (PRD Module 5); OrderItem links Order to Product for what was actually purchased, at the price/quantity at time of purchase — kept separate from Product's live price so historical orders don't silently change if a price updates later. 

- **DesignerTailor is intentionally minimal.** Per the founder's confirmation that designers/tailors are real people handling briefs manually, this table is just enough to assign a Dream to someone and show that assignment in the admin queue (Section 19.2) — it is not a full HR or vendor-management system. 

## **21.2 Dream Status Field** 

Implemented as a Django TextChoices enum on Dream.status, matching the PRD's recommended taxonomy (Section 9.1.1 of the PRD) exactly, so the workflow diagram in Section 22 below and the actual code never drift apart: 

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



Page 48 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **22. The Dream-to-Garment Workflow** 

This is the engineering view of the PRD's core loop (PRD Section 1.1 and Section 4) — the same five conceptual steps, expressed as the actual status transitions enforced in the dreams app. 

_Status transitions for a Dream record. The consent gate is a hard branch — a Dream cannot reach Live without it._ 

## **22.1 Enforcement Rules (Not Just UI Conventions)** 

Per the discussion when this document was scoped, the dreamer-first delivery and consent rule is treated as a hard backend rule, not a UI nicety. Concretely, this means: 

1. A Product can only be created from a Dream whose status is Delivered to Dreamer or later. 

Page 49 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

2. Dream.consent_to_publish defaults to False at the database level and can only be set True through a dedicated endpoint that records who/when consent was granted — never through a generic PATCH on the Dream object. 

3. The catalog app's product-publish action checks both conditions above before allowing a Product to be marked is_publishable. This check lives in a service function, not scattered across views, so every entry point (admin action, future API endpoint) goes through the same gate. 

## **22.2 Where Each Step Lives in Code** 

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



Page 50 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **23. API Contract** 

The contract both frontends are built against. This is a representative surface, not the full OpenAPI spec — the actual contract of record should be generated from the Django code (Section 23.3) so it can never silently drift from what the backend really returns. 

## **23.1 Authentication** 

- POST /api/auth/otp/request/ — { phone } → triggers OTP send 

- POST /api/auth/otp/verify/ — { phone, code } → { access_token, refresh_token, user } 

- POST /api/auth/refresh/ — { refresh_token } → { access_token } 

- Both frontends store tokens and attach Authorization: Bearer <token> on every authenticated request. 

## **23.2 Representative Endpoints by Module** 

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



Page 51 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

|||||
|---|---|---|---|
|**Endpoint**|**Method**|**Purpose**|**Module**|
|||||
|/api/me/|GET,<br>PATCH|Profile, bio, photo visibility|accounts|



## **23.3 Keeping the Contract Honest** 

**Recommendation:** use drf-spectacular to auto-generate an OpenAPI schema directly from the DRF serializers and views. Both frontend repos can then generate typed API clients from that schema (e.g. via openapi-typescript) instead of hand-writing fetch calls and risking drift from what the backend actually returns. This is a recommendation for the team to adopt, not yet wired into the scaffolded repos — flagged as a near-term setup task in Section 26. 

Page 52 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **24. Shared Design Language** 

Because there's no shared package between repos (Section 20.3), the visual brand has to be kept consistent by convention: the same token values, copied into each repo's own token file, not imported from a common source. 

## **24.1 Brand Tokens (from the PRD's brand principles)** 

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



## **24.2 Calm-Tone Copy Rules (Enforced Convention, Not Code)** 

Per PRD Section 11.1, every notification, toast, and order-tracking message follows the calmtone rule. This can't be enforced by a linter, so it's documented once here and should be copyreviewed in both frontend repos against this same list: 

- No countdown urgency ("Only 2 left!", "Sale ends in 1 hour"). 

- No command-style CTAs in push copy ("BUY NOW") — prefer gentle questions or observations ("Still thinking about this one?"). 

- Order tracking copy stays at the reassurance/anticipation register (PRD Section 11.3) — never expose raw carrier status strings directly in the UI without rewriting them. 

Page 53 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **25. Local Development & CLAUDE.md Strategy** 

## **25.1 Quick Start (summary — full steps in each repo's README)** 

|||
|---|---|
|**Repo**|**Run locally with**|
|||
|dream-atelier-api|python -m venv venv && pip install -r requirements/dev.txt &&<br>python manage.py migrate && python manage.py runserver|
|||
|dream-atelier-mobile|npm install && npx expo start|
|||
|dream-atelier-web|npm install && npm run dev|



## **25.2 How the CLAUDE.md Files Relate** 

You supplied a general-purpose CLAUDE.md (behavioral guidelines: think before coding, simplicity first, surgical changes, goal-driven execution). That file is good as-is and not specific to this project — it's about how an AI coding agent should behave in any codebase. Rather than editing it, each of the three repos gets its own project-specific CLAUDE.md that assumes those general guidelines are already in effect and adds only what's specific to that repo: its module-toapp mapping, its own commands, and pointers back to this architecture document and the PRD for anything about product behavior. 

**Practical effect:** when Claude Code (or another agent) opens any of the three repos, it reads that repo's CLAUDE.md first. If your organization-wide behavioral CLAUDE.md is also present (e.g. at a higher directory level or merged in per your existing setup), the two combine — general behavior rules from yours, project specifics from the repo's own file. Section 27 ships the exact CLAUDE.md content for each repo. 

Page 54 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **26. Adding New Modules, Features & Functionality** 

This section exists because the brief explicitly asked for a repo structure that's simple to extend. Below is the literal, step-by-step recipe for adding something new, so this isn't a vague promise of "good architecture" but an actual checklist anyone (human or AI agent) can follow. 

## **26.1 Adding a New Backend Feature (e.g. a future "Styling Notes" automation)** 

1. Create a new app: python manage.py startapp styling_notes inside apps/. 

2. Add it to INSTALLED_APPS in config/settings/base.py — this is the only existing file touched. 

3. Define models in apps/styling_notes/models.py, inheriting core.AbstractBaseModel for consistent id/timestamps. 

4. Write serializers, views, and urls.py within the new app folder only. 

5. Wire the new app's urls into config/urls.py with one include() line. 

6. Register any admin needs in apps/styling_notes/admin.py. 

7. Write tests in apps/styling_notes/tests.py before/alongside the feature, per the goal-driven execution principle in your CLAUDE.md. 

**No existing app's files are modified** except the two single-line registrations in step 2 and step 

5. This is the concrete mechanism behind the diagram in Section 19. 

## **26.2 Adding a New Screen/Feature on Mobile or Web** 

1. Create src/features/{feature_name}/ with screens/ (or pages/ on web), components/, api.ts, hooks.ts. 

2. Add the new screen to the relevant navigator (mobile) or router config (web) — one new entry, existing routes untouched. 

3. If the feature needs a new API endpoint, that's a backend change first (Section 26.1) — frontend work should never invent business logic that the API doesn't also enforce (Section 18.3). 

## **26.3 What This Structure Deliberately Does Not Solve** 

Worth being honest about the limits here: this structure makes adding isolated features cheap, but it does not automatically prevent two apps from becoming entangled if a developer imports directly between them (e.g. catalog importing internals from dreams instead of going through dreams' public serializer). The convention to maintain is that apps talk to each other only through models' public fields and serializers, never by reaching into another app's internal 

Page 55 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

helper functions. This is a code-review discipline, not something enforced by the folder structure alone. 

Page 56 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **27. What Ships With the Scaffolded Repos** 

Alongside this document, three starter repositories are provided, each containing: 

- The folder structure described in Sections 19 and 20, already created (not just described). 

- Working configuration: Django settings split by environment, Expo app.json, Vite config. 

- The data model from Section 21 implemented as actual Django models with migrations, for the dreams and catalog apps as a reference pattern — orders, wardrobe, and notifications are scaffolded as empty apps ready for the same treatment. 

- A project-specific CLAUDE.md in each repo, per Section 25.2. 

- A README.md per repo with the exact local setup commands from Section 25.1. 

- .env.example files listing every environment variable the app expects (database URL, Cloudinary keys, Razorpay keys, OTP provider keys) without real secrets. 

## **27.1 Suggested Immediate Next Steps** 

1. Resolve the PRD's Section 15 Open Decisions list — several (stage taxonomy, seed catalog, nav shell) directly affect what the dreams and catalog apps' models should look like before more migrations are written. 

2. Set up drf-spectacular (Section 23.3) early, before the API surface grows, so the contractdrift problem never starts. 

3. Pick and configure real hosting targets for all three repos (placeholders used throughout this document) and wire up CI for each independently. 

4. Decide the production OTP provider (e.g. Twilio, MSG91) — the PRD specifies phone OTP auth but not a vendor. 

Page 57 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **PART III** 

## **What Was Built** 

_The three repos that exist right now — sections 28 through 31_ 

Page 58 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **28. What Was Built** 

Parts I and II of this document specify what Dream Atelier should do and how it should be built. This part records what actually exists right now: three working starter repositories — dreamatelier-api, dream-atelier-mobile, dream-atelier-web — built directly from the specifications in Parts I and II. Nothing described here is aspirational; it is a factual account of delivered code, checked for syntax validity before this document was written. 

Treat this part as the bridge between the plan and the codebase: anyone picking up the project should be able to read this section, then go straight to the relevant repo and continue from exactly where it was left off. 

## **28.1 dream-atelier-api — Built** 

Eight Django apps, matching Section 19.1's table exactly. Two are built out completely as the reference pattern; the rest have real models and are ready for the same treatment. 

||||
|---|---|---|
|**App**|**Status**|**What exists**|
||||
|core|Complete|AbstractBaseModel (UUID pk, timestamps), shared<br>pagination class|
||||
|accounts|Complete|Custom User model (phone-first, no username/email),<br>OTP request/verify flow, JWT issuing, profile endpoint|
||||
|dreams|Complete —<br>reference pattern|Dream, DreamStage, DreamInspirationImage,<br>DesignerTailor models; full status state machine; the<br>consent-gate services (request_consent, grant_consent,<br>decline_consent, can_become_product);<br>list/detail/feed/consent views; admin dream queue with<br>bulk status actions; tests covering the consent gate<br>specifically|
||||
|catalog|Complete —<br>reference pattern|Product, Banner models; publish_product_from_dream()<br>service that calls into dreams' consent gate;<br>list/detail/save views with filtering and search; admin;<br>tests covering publish-before-consent rejection|
||||
|orders|Complete|Order, OrderItem, CartItem models; real Razorpay order-<br>creation in checkout(); cart, checkout, order history, and<br>tracking views; admin|
||||
|wardrobe|Complete|SavedItem, StylingNote models; wardrobe view with the<br>dream-origin callback text ("This started as your wish<br>for..."); wishlist view|
||||



Page 59 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

||||
|---|---|---|
|**App**|**Status**|**What exists**|
||||
|notifications|Complete|Notification model; a working calm-tone linter<br>(violates_calm_tone()) that pattern-matches and rejects<br>urgency language before a notification can be created;<br>tests|
||||
|ops|Complete|No models by design — holds the cross-app admin action<br>that publishes a Product from a Dream directly from the<br>Django admin, attached onto DreamAdmin without a<br>circular import|
||||



## **28.1.1 The One Rule Enforced in Code, Not Just Policy** 

Section 22.1 describes the dreamer-first-delivery-then-consent rule as a hard backend rule. This is not aspirational in the delivered code: apps/dreams/services.py implements 

request_consent(), grant_consent(), and decline_consent() as the only sanctioned way to move a Dream's consent_to_publish field, each one raising ValidationError if called out of sequence. apps/catalog/services.py's publish_product_from_dream() calls dreams' can_become_product() before creating any Product. Both have passing tests that specifically assert the rejection path, not just the happy path. 

## **28.1.2 What's Configured but Not Connected to Real Infrastructure** 

- OTP sending is stubbed to print to console in DEBUG mode and raises NotImplementedError in production until a real SMS provider is wired in — see Section 27.1's open item on choosing a vendor. 

- Settings are split base/dev/prod correctly, but no real hosting target (Render, Railway, EC2, etc.) has been provisioned — DATABASE_URL, REDIS_URL, and the Cloudinary/Razorpay keys in .env.example are all placeholders. 

- drf-spectacular is listed in requirements/dev.txt but not yet wired into settings — Section 23.3's recommendation to auto-generate the OpenAPI schema is still a next step, not done. 

## **28.2 dream-atelier-mobile — Built** 

Expo + React Native, TypeScript throughout. Feature-folder structure matches Section 20.1 exactly. 

||||
|---|---|---|
|**Feature**|**Status**|**What exists**|
||||
|home|Screen built|HomeScreen.tsx — banner, two category cards, horizontal<br>new-arrivals row, full grid; api.ts/hooks.ts complete|



Page 60 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

||||
|---|---|---|
|**Feature**|**Status**|**What exists**|
||||
||||
|dreams|Screens built —<br>reference pattern|DreamInputScreen.tsx (the journaling-style submission flow,<br>mood/occasion chips, confirmation state),<br>ShowcaseFeedScreen.tsx (Pinterest-style real-story feed),<br>MyDreamsScreen.tsx (personal archive with PRD-quoted<br>empty state); api.ts/hooks.ts complete|
||||
|catalog|API/hooks only|Typed fetch functions and React Query hooks for banners,<br>product list, product detail, save action. Screens not yet<br>built.|
||||
|wardrobe|API/hooks only|fetchWardrobe/fetchWishlist with matching hooks. Screens<br>not yet built.|
||||
|orders|API/hooks only|Cart, checkout, order history functions and hooks, calling<br>the real orders endpoints. Screens not yet built.|



Shared layer: a Button and Card primitive (src/shared/components/), brand tokens matching the architecture doc's Section 24.1 values exactly (src/shared/tokens.ts), and an Axios client with SecureStore-backed token storage and one automatic silent-refresh retry on 401 (src/services/apiClient.ts). Navigation is wired for Home and the Dreams stack (Showcase feed, Dream input, My Dreams) via React Navigation's bottom tabs. 

**Not yet done:** Explore and Profile tabs are not wired into RootNavigator.tsx — the comment in that file points to where they go. Building them is a matter of writing screens for catalog/wardrobe/orders using HomeScreen.tsx as the template, then adding two more Tab.Screen entries. 

## **28.3 dream-atelier-web — Built** 

React + Vite, TypeScript throughout, same feature folders as mobile with pages/ instead of screens/ and inline styles instead of StyleSheet. Built to the same completeness split as mobile, feature for feature: 

||||
|---|---|---|
|**Feature**|**Status**|**What exists**|
||||
|home|Page built|HomePage.tsx, re-exporting catalog's banner/product data<br>rather than duplicating it|
||||
|dreams|Pages built —<br>reference pattern|DreamInputPage.tsx, ShowcaseFeedPage.tsx,<br>MyDreamsPage.tsx — same copy and logic as mobile's<br>screens, ported to web conventions|
||||
|catalog|API/hooks only|Identical function signatures to mobile's catalog/api.ts by<br>design — see this repo's CLAUDE.md on why the two must<br>not drift|



Page 61 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

||||
|---|---|---|
|**Feature**|**Status**|**What exists**|
||||
||||
|wardrobe|API/hooks only|Mirrors mobile exactly|
||||
|orders|API/hooks only|Mirrors mobile exactly|



Routing is handled by React Router (src/routes/router.tsx) with a shared Layout component providing top navigation. The CSS custom properties in src/shared/tokens.css mirror the same brand values and are imported once in main.tsx. 

**Not yet done:** same gap as mobile — Explore and Profile routes are not yet added to router.tsx, for the same reason: their underlying API/hooks layers exist, their pages don't yet. 

Page 62 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **29. Running All Three Repos Together** 

Each repo's own README has its individual setup commands (Sections 19.3, 20.1, 20.2 reference where they live in each repo). This section is the combined picture: what order to start things in, and how they find each other. 

1. Start PostgreSQL and Redis locally (or point .env at hosted instances). 

2. In dream-atelier-api: copy .env.example to .env, fill in real values, run pip install -r requirements/dev.txt, then python manage.py migrate and python manage.py runserver. The API is now serving at http://localhost:8000/api/. 

3. In dream-atelier-mobile: npm install, confirm app.json's expo.extra.apiBaseUrl points at the running API, then npx expo start. 

4. In dream-atelier-web: npm install, copy .env.example to .env (VITE_API_BASE_URL should point at the same API), then npm run dev. The web app is now at http://localhost:5173. 

5. Create a superuser (python manage.py createsuperuser) to access Django admin at http://localhost:8000/admin/ — this is where dreams get triaged, assigned, and published per Section 19.2. 

**To see the full loop work end to end locally:** submit a dream from either frontend, open Django admin and walk it through In review → In progress → Delivered to dreamer using the bulk actions on DreamAdmin, then use the ops app's "Publish product from this dream" admin action — this only succeeds once consent has been granted via the API's consent endpoint, which you can call directly (e.g. with curl or the DRF browsable API) since neither frontend has a consent UI built yet. 

Page 63 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **30. Consolidated Remaining Work** 

Every open item from across this entire document, in one place, grouped by what kind of work it is. Items already listed individually in Sections 15 and 27.1 are repeated here rather than crossreferenced, so this section alone is a complete to-do list. 

## **30.1 Product Decisions Needed (founder/team call, not engineering)** 

- Navigation shell confirmation, OTP-auth gating boundaries, Trending Now thresholds, Showcase card attribution (named vs. anonymous), production stage taxonomy, the locked "final action" destination, "Talk to us" AI support scope, settings parity reference app, seed catalog decision, admin tooling approach, notification cadence limits, and the overall MVP cut — see Section 15 for the full table with reasoning for each. 

## **30.2 Infrastructure Decisions Needed** 

- Production OTP/SMS vendor (Twilio, MSG91, or other). 

- Hosting targets for all three repos and CI setup for each. 

- Real Cloudinary/GCP, Razorpay, and database credentials — currently all placeholders in .env.example files. 

## **30.3 Engineering Work Remaining (clear, scoped, ready to start)** 

- Build catalog, wardrobe, and orders screens/pages on both frontends, using dreams/home as the template — the API and hooks layers are already done and tested against the real backend shape. 

- Wire Explore and Profile into both frontends' navigation. 

- Set up drf-spectacular for OpenAPI schema generation, then generate typed clients for both frontends instead of hand-maintained types. 

- Build the consent-granting UI on both frontends — the backend endpoint exists (POST /api/dreams/{id}/consent/) but no screen calls it yet. 

- Add SavedItem creation/deletion to the catalog save endpoint properly — it currently only increments a counter; the wardrobe app's SavedItem model exists but isn't yet written to from that endpoint. 

## **30.4 What Should Not Be Reopened Without Good Reason** 

Two things are settled and shouldn't be casually revisited: the three-repo split (Section 18.1 explains the tradeoff that was accepted), and the dreamer-first-delivery-then-consent rule (Section 22.1, enforced in code per Section 28.1.1). Both were explicit decisions made during 

Page 64 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

scoping, not defaults — reopening either has consequences documented in the sections referenced. 

Page 65 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

## **31. Appendix** 

## **31.1 Glossary** 

|||
|---|---|
|**Term**|**Meaning in this document**|
|||
|Dream|A customer's submitted outfit description, the unit of input to the core<br>loop.|
|||
|Dreamer|The user who submitted a given Dream.|
|||
|Showcase Card|The published photo + her-own-words content unit shown in the Module<br>3 feed.|
|||
|Stage tracker|The Module 4 view showing progress photos as a Dream becomes a<br>physical garment.|
|||
|Core loop|The five-step cycle defined in Section 1.1: dream → create → feature →<br>discover/buy → compound.|
|||
|Consent gate|The backend rule that a Dream must reach Live status with<br>consent_to_publish = True before a Product can exist — Section 22.1,<br>enforced per Section 28.1.1.|
|||
|Reference pattern|A feature built out completely (model through screen) specifically so<br>other features can copy its shape — dreams and home/catalog serve<br>this role across all three repos.|



## **31.2 How This Document Was Assembled** 

This document merges two documents written in sequence — a Product Requirements Document (Sections 1–16) and a Technical Architecture document (Sections 17–27, renumbered from that document's own 1–11 to fit this sequence) — with a new Part III (Sections 28–30) added to record what was actually built in the three companion repositories afterward. Section numbers in Parts I and II are internally consistent within this single document; any cross-reference of the form "PRD Section X" found in Part II's prose refers to Part I's original numbering, which did not need to shift. 

## **31.3 Source Material** 

Part I is derived from the founding team's original concept document (a PDF covering product vision, brand voice, and all 6 functional modules) plus the confirmed tech-stack decision to use React Native, React, and Django in place of the concept document's original NestJS/Supabase suggestion. Part II and Part III were produced from that confirmed direction. Where this document adds structure, defaults, or recommendations beyond what was explicitly specified, 

Page 66 of 67 

Complete Product & Engineering Record 

**Dream Atelier** 

that is marked inline — as an Open Decision callout, a Future Version tag, or "recommended default" language — rather than presented as settled fact. 

## **31.4 Document Control** 

Version 1.0 of this combined document. The three companion repositories (dream-atelier-api, dream-atelier-mobile, dream-atelier-web) are the executable counterpart to Part III and should be treated as the actual source of truth for anything Part III summarizes — if this document and the code ever disagree, the code reflects what really happened and this document should be corrected to match, not the other way around. 

Page 67 of 67 

