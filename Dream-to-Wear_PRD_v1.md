**Dream-to-Wear** 

Product Requirements Document 

## **DREAM-TO-WEAR** 

# A Custom-Design Women's Clothing Platform 

_Working name — to be replaced with final brand name_ 

## **PRODUCT REQUIREMENTS DOCUMENT** 

Version 1.0  ·  Draft for Engineering & Design Brief Prepared: June 2026 

Status: Full vision documented — pre-MVP scoping pending founder review 

Page 1 of 36 

**Dream-to-Wear** 

Product Requirements Document 

## **Table of Contents** 

Table of Contents ....................................................................................................................... 2 1. Executive Summary ............................................................................................................... 5 1.1 The Core Loop.................................................................................................................. 5 1.2 Document Scope .............................................................................................................. 5 2. Product Vision & Brand Principles .......................................................................................... 7 2.1 Vision Statement .............................................................................................................. 7 2.2 Brand Principles (apply to every screen, not just marketing) ............................................. 7 2.3 What Makes This Defensible ............................................................................................ 7 3. Primary Personas................................................................................................................... 8 3.1 The Dreamer .................................................................................................................... 8 3.2 The Browser/Buyer ........................................................................................................... 8 3.3 The Designer/Tailor (internal/partner role) ........................................................................ 8 4. End-to-End User Journey ....................................................................................................... 9 5. Information Architecture & Navigation ...................................................................................11 5.1 Primary Navigation (Bottom Tab Bar — proposed) ..........................................................11 5.2 Sitemap ...........................................................................................................................11 6. Module 1 — Home Dashboard ..............................................................................................13 6.1 Screen Composition (top to bottom) ................................................................................13 6.1.1 Offer Banner .............................................................................................................13 6.1.2 Category Cards .........................................................................................................13 6.1.3 New Arrivals ..............................................................................................................13 6.1.4 Trending Now ............................................................................................................14 6.1.5 Product List ...............................................................................................................14 6.2 States to Design For ........................................................................................................14 6.3 Module 1 — Functional Requirements Summary .............................................................14 7. Module 2 — Explore All Products ..........................................................................................16 7.1 Product Card — Component Spec...................................................................................16 7.2 Filtering & Sorting ............................................................................................................16 7.3 Module 2 — Functional Requirements Summary .............................................................16 8. Module 3 — Dream Input & Showcase Feed.........................................................................18 8.1 Part 1 — Dream Input Screen ("Tell Us Your Vision") ......................................................18 8.1.1 Interaction & Tone Requirements ..............................................................................18 8.2 Part 2 — Showcase Cards ("Where Vision Becomes Real") ............................................18 8.2.1 Showcase Card — Component Spec ........................................................................19 

Page 2 of 36 

**Dream-to-Wear** 

Product Requirements Document 

8.2.2 Feed Behavior ...........................................................................................................19 8.3 Why This Module Carries Outsized Weight ......................................................................19 8.4 Module 3 — Functional Requirements Summary .............................................................19 9. Module 4 — My Dreams........................................................................................................21 9.1 My Dreams List View .......................................................................................................21 9.1.1 Status Taxonomy ......................................................................................................21 9.2 Empty State .....................................................................................................................21 9.3 Inspiration Layer: Other People's Stories .........................................................................22 9.4 Dream Detail / Stage Tracker ..........................................................................................22 9.5 Module 4 — Functional Requirements Summary .............................................................22 10. Module 5 — Profile, Wardrobe & Settings ...........................................................................24 10.1 My Wardrobe (Previously Bought) .................................................................................24 10.2 Edit Profile .....................................................................................................................24 10.3 Saved & Wishlist ............................................................................................................24 10.4 Settings .........................................................................................................................24 10.5 Module 5 — Functional Requirements Summary ...........................................................25 11. Module 6 — Notifications, Cart, Checkout & Order Tracking ...............................................26 11.1 Notifications ...................................................................................................................26 11.2 Cart & Checkout ............................................................................................................26 11.3 Order Tracking ...............................................................................................................26 11.4 Module 6 — Functional Requirements Summary ...........................................................27 12. Operations: The Dream-to-Garment Pipeline ......................................................................28 12.1 Manual Workflow (Launch) ............................................................................................28 12.2 Sourcing & Supply-Side Needs (from founder notes) .....................................................28 12.3 Admin/Internal Tooling Implied by This Workflow ...........................................................29 13. Confirmed Tech Stack .........................................................................................................30 13.1 Implications for Build Sequencing ..................................................................................30 14. Data Model (Proposed) .......................................................................................................32 14.1 Core Entities ..................................................................................................................32 14.1.1 User ........................................................................................................................32 14.1.2 Dream .....................................................................................................................32 14.1.3 DreamStage ............................................................................................................32 14.1.4 Product ...................................................................................................................32 14.1.5 Order .......................................................................................................................32 14.1.6 SavedItem / Wishlist ................................................................................................32 14.1.7 DesignerTailor (internal/admin-facing) .....................................................................32 

Page 3 of 36 

**Dream-to-Wear** 

Product Requirements Document 

14.2 Relationship Summary ...................................................................................................32 14.3 Status State Machine (Dream) .......................................................................................33 14.4 Privacy Flags Required by This Model ...........................................................................33 15. Open Decisions — Compiled ..............................................................................................34 15.1 Suggested Next Step .....................................................................................................35 16. Appendix .............................................................................................................................36 16.1 Glossary ........................................................................................................................36 16.2 Source Material .............................................................................................................36 16.3 Document Control ..........................................................................................................36 

Page 4 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 5 of 36 

**Dream-to-Wear** 

Product Requirements Document 

Wherever the source concept left a decision unresolved or only partially specified, this 

document calls it out explicitly as an ⚑ Open Decision rather than silently assuming an answer, so nothing gets built on an unstated guess. 

Page 6 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 7 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 8 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 9 of 36 

**Dream-to-Wear** 

Product Requirements Document 

|||||
|---|---|---|---|
|**Stage**|**What happens**|**Module(s)**<br>**involved**|**Key state/data**<br>**created**|
|||||
|9. Social<br>proof<br>returned|Original dreamer sees "30<br>women loved your idea" in her<br>My Dreams archive.|Module 4|Dream record: social<br>proof counters|
|||||
|10.<br>Compounding|She shares with friends; a new<br>visitor or existing browser<br>submits her own dream.|Module 3 (Part 1)|New Dream record<br>created → loop<br>restarts|
|||||



Page 10 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 11 of 36 

**Dream-to-Wear** 

Product Requirements Document 

   - Saved & Wishlist 

   - Edit Profile 

   - Settings (Notifications, Privacy, Account, Help, Talk to Us) 

- Cross-cutting (Module 6) 

   - Cart & Checkout 

   - Order Tracking 

   - Notifications Center 

Page 12 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 13 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 14 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 15 of 36 

**Dream-to-Wear** 

Product Requirements Document 

## **7. Module 2 — Explore All Products** 

The full, unfiltered catalog of everything available in the store. Functions as the searchable/browsable counterpart to Home's curated sections. 

## **7.1 Product Card — Component Spec** 

This is the single most reused component in the app (appears in Home, Explore, Showcase, Wardrobe, Wishlist). Per the source material, each card should be "simple and minimal" and prioritize the following content, in priority order: 

6. Photo of the customer actually wearing the finished piece. Real and candid beats overstyled — this is a stated brand authenticity rule, not a style preference. Fallback: in-house model photo only when no customer photo is available or the dreamer opted out of being shown. 

7. "Shop This Look" button — every inspiring card must also be directly buyable. No card should be purely inspirational without a path to purchase. 

8. Love/Save action — lets browsers collect pieces that resonate with them, independent of purchase (feeds the Wishlist in Module 5). 

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



Page 16 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 17 of 36 

**Dream-to-Wear** 

Product Requirements Document 

## **8. Module 3 — Dream Input & Showcase Feed** 

**This is the emotional core of the product.** Per the source concept, this module should not feel like a form or a generic content feed — it should feel like journaling on the input side, and like a Pinterest board built from real stories on the output side. Every interaction design decision in this section should be checked against that bar. 

## **8.1 Part 1 — Dream Input Screen ("Tell Us Your Vision")** 

The emotional entry point of the entire product. Five components, in the order specified by the source material: 

9. **Open text space —** "Describe your dream outfit." Free-flowing, not restrictive; no character-count pressure or rigid structure. This should read and feel like a journal prompt, not a support-ticket field. 

10. **Mood/Vibe tags (optional at launch) —** quick-select chips: Soft, Bold, Classic, Edgy, Romantic, Minimal. Exists for women who struggle to put feelings into words. Explicitly optional per source material — full tag-driven matching/routing is a next-version enhancement. 

11. **Inspiration upload —** lets her attach a reference photo, a Pinterest screenshot, or even a colour swatch. Multi-image upload, no strict file-type gate beyond standard image formats. 

12. **Occasion tags —** Everyday, Celebration, Travel, Just for Me. Helps the designer/tailor understand context; this is functional metadata for Module 9 (designer briefing), not just a UI nicety. 

13. **Gentle prompt line —** "What feeling do you want this outfit to give you?" Designed to pull emotion, not specs. Should be presented as a soft, optional follow-up rather than a required field, consistent with the journaling tone. 

## **8.1.1 Interaction & Tone Requirements** 

- No red asterisks or harsh "required field" error states. If validation is needed (e.g., text box can't be empty on submit), use warm, first-person copy rather than system error tone. 

- Progressive disclosure is acceptable (e.g., mood tags and occasion tags can appear after she starts typing) but nothing should feel gated behind a multi-step wizard with a progress bar — that undercuts the "journaling, not filling a form" goal explicitly stated in source material. 

- On submit: an explicit confirmation moment that acknowledges her dream was received (not just a silent screen transition) — this is the first emotional payoff in the loop and should not be treated as a throwaway success toast. 

## **8.2 Part 2 — Showcase Cards ("Where Vision Becomes Real")** 

Page 18 of 36 

**Dream-to-Wear** 

Product Requirements Document 

The proof layer — visible evidence that submitted dreams actually become real, purchasable garments. This is the trust mechanism referenced in Section 1.1 that answers every new visitor's unspoken question. 

## **8.2.1 Showcase Card — Component Spec** 

14. Photo of her wearing the finished outfit. 

15. Her original words, displayed below the card exactly as she wrote them — unedited, attributed to her. Source material suggests a slightly handwritten-style font for warmth and legibility; this should be tested for actual readability at small sizes, not just chosen for aesthetic effect. 

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

Page 19 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 20 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 21 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 22 of 36 

**Dream-to-Wear** 

Product Requirements Document 

||||
|---|---|---|
|**ID**|**Requirement**|**Priority**|
||||
|M4-05|Locked "unlocks soon" final action button (destination TBD — see<br>Open Decisions).|Launch<br>(placeholder)<br>/ Future (full<br>feature)|
||||
|M4-06|Surface social-proof love count ("X women loved your idea") on<br>each dream once Live.|Launch|
||||



Page 23 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 24 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 25 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

16. Reassure — communicate that the order is handled, nothing to worry about. 

17. Build anticipation — communicate that something lovely is on its way. 

This is a deliberate scope constraint: it explicitly excludes turning order tracking into a dense logistics/status-code screen. Carrier-level granular tracking (Delhivery, BlueDart, India Post — confirmed shipping partners, Section 13) can exist underneath, but the customer-facing presentation layer should stay at the emotional register described above, not expose raw carrier statuses verbatim. 

Page 26 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 27 of 36 

**Dream-to-Wear** 

Product Requirements Document 

## **12. Operations: The Dream-to-Garment Pipeline** 

This is the part of the product that lives outside the app itself but determines whether the core loop (Section 1.1, Section 4) actually works at the speed and quality the brand promises. Per the founder's confirmation, designers/tailors handle this manually at launch — there is no AIgeneration step in v1. 

## **12.1 Manual Workflow (Launch)** 

18. Dream submitted via app (Module 3, Part 1) → creates a Dream record with status Submitted. 

19. Internal team reviews the brief (text + mood tags + inspiration images + occasion) and routes it to a designer/tailor, manually at launch. Status → In Review. 

20. Designer/tailor accepts and begins production. Status → In Progress. Stage photos are captured and uploaded by the designer/tailor (or by internal staff on their behalf) at each meaningful step, feeding the Module 4 stage tracker. 

21. Finished piece is shipped to the original dreamer first — this sequencing is a hard rule from the source material, not a suggestion. Status → Delivered to Dreamer. 

22. Team requests her explicit consent to publish (this should be an active opt-in ask, not a passive default, given the privacy implications flagged in Section 8.2.1 / Section 14.4). If granted: a Product record is created, linked to the Dream, and the Showcase card goes live. Status → Live. 

## **12.2 Sourcing & Supply-Side Needs (from founder notes)** 

The source material lists several operational dependencies that exist outside the app's codebase but materially affect whether the product can function. Capturing them here so engineering scoping accounts for the integrations and admin tooling they imply: 

- **Fabric sourcing:** fabric will be collected based on customer feedback or founder discretion. Implies a need for an internal fabric/material catalog, even if simple, so designer briefs can reference available options. 

- **Tailors & manufacturers:** to be found online or through existing market contacts, with an eventual goal of building an in-house production capability. This is a staffing/ops question, but the app needs a way to represent "who is making this" internally even if that's never customer-facing. 

- **Non-engineering roles explicitly called out as needed:** banner/photoshoot design, sales & analysis reporting, social media management. These are hiring needs, not app features, but are included here because Module 1's offer banners and Module 3's photography quality directly depend on them. 

Page 28 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 29 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 30 of 36 

**Dream-to-Wear** 

Product Requirements Document 

- NestJS business logic should own the Dream status state machine (Section 12.1) as a single source of truth, since at least four modules (3, 4, 1/2 on publish) read or react to that status. 

Page 31 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 32 of 36 

**Dream-to-Wear** 

Product Requirements Document 

One Dream produces at most one Product (when published). One Product may have zero originating Dreams (non-customer-originated catalog items, if any exist at launch — see Open Decision in Section 15.9 on whether the catalog launches purely dream-sourced or with a seed catalog). A User can have many Dreams, many Orders, many SavedItems. 

## **14.3 Status State Machine (Dream)** 

Submitted → In Review → In Progress → Delivered to Dreamer → Live, with Declined/Paused reachable from any pre-Live state. No state should be skippable in the customer-facing UI even if internal ops occasionally fast-track a step, so that Module 4's stage tracker always tells a coherent story. 

## **14.4 Privacy Flags Required by This Model** 

Two privacy-sensitive fields are required by the functional spec and should not be treated as nullable afterthoughts: 

- **User.photoVisibility:** governs whether her real photo or an illustrated avatar shows in her profile (Module 5, Section 10.1). 

- **Dream.consentToPublish:** must default to false and require an explicit, logged grant before a Product can be created from a Dream — this is the technical enforcement of the "first delivered to her, then published with her blessing" rule repeated across Sections 4, 7.1, and 12.1. 

Page 33 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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



Page 34 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 35 of 36 

**Dream-to-Wear** 

Product Requirements Document 

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

Page 36 of 36 

