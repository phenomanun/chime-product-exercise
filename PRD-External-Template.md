# PRD — External template

*Codename: **Project Do More**. Filled from* `PRD.md` *using Chime's PRD Template.*

---

## Project Title

**Project Do More** — Spotify Events & Concerts: listener-first discovery and partner booking handoff (V1)

## One-line description

A listener-first live events experience that turns listening affinity into relevant concert discovery and hands off purchase to ticketing partners—with saves, reminders, and post-show engagement intentionally kept within Spotify.

---

## Problem

### What is the problem?

Listeners who would happily attend concerts often **never discover the right show** or **drop off before buying** because:

- **Discovery is fragmented** across venue sites, ticketing apps, social, and word-of-mouth—nothing sits where their taste already lives.
- **Relevance is weak**: generic “near you” lists miss the artists and genres they actually care about.
- **Friction is high** from interest to checkout (planning, multiple hops, unclear inventory, weak planning tools).
- **Pricing is opaque** to users who want to more directly support their artists by attending events (platform price gouging)

### How does this connect to company goals and strategy?

Spotify’s mission is to connect artists and fans through art and **experiences**. Live events are the highest-intent fan moment and align with deepening listener relationships and artist success (incremental ticket demand, stronger fandom). This initiative **extends time spent and emotional connection** in the product without requiring Spotify to become a full ticketing merchant in V1.

**Impact vs effort (qualitative):** High strategic alignment (listener + artist + partners); V1 scopes **discovery, intent, attribution, and lifecycle**—not payments or inventory ops—so effort is bounded while still moving the attendance needle if relevance and handoff quality land.

### Why is this problem important?

If we don’t solve it, listeners keep **leaking to fragmented channels**; Spotify leaves **high-intent demand** and **attribution** on the table; artists and venues miss **incremental, taste-qualified demand**. Current handling (no unified, personalized live layer in-app) is **insufficient** because the user’s **taste graph and session context** live in Spotify, not in siloed ticketing UIs.

---

## Goals & Non-goals

### Goals

1. **Primary:** Increase **% of listeners attending concerts** (measurement plan per **Metrics** below and `PRD.md` §10).
2. **Secondary:** Increase **engagement from concertgoers** in Spotify before and after the event (saves, calendar, reminders, post-show modules).

### Non-goals (V1)

- **No native ticket purchase** in Spotify (no payments, ticket wallet, or purchase support).
- **No artist/venue ops tooling** (tour management, inventory, on-sale configuration).
- **No full marketplace**; V1 is **discovery + intent + partner handoff + lifecycle engagement**.
- **No price visibility**; V2+ is **artist price share + tips + meet & greet**.

---

## Proposal

### Hypothesis

By surfacing **taste-relevant** live events where listeners already spend time (Home, hub, search, artist), **with** transparent partner checkout handoff, and lightweight **planning** (map/location, save, calendar, reminders), **we will** increase **handoff success and modeled/observed attendance**, and increase **pre/post-event engagement** among concertgoers—**without** taking on full ticketing liability in V1.

### How does the proposed solution work?

**Listener journeys (summary):**

1. **Discover → evaluate → buy (partner):** Personalized surfaces → event card → event detail page (EDP) → **Get tickets** deep-link (app preferred, web fallback) with attribution parameters.
2. **Save & plan:** Save to **Saved events**, add to calendar, reminders; optional share.
3. **Day-of → post-event:** Day-of reminder; within ~24h, **relive**-style module (e.g. playlist / follow prompts).

**Partners (V1):** **Ticketmaster** and **SeatGeek**.

**Design / architecture reference:**

- **Interactive prototype:** [chime-product-exercise.vercel.app](https://chime-product-exercise.vercel.app/)
- **Source:** [github.com/phenomanun/chime-product-exercise](https://github.com/phenomanun/chime-product-exercise)

**Before / after (conceptual):**


| Before                                                   | After                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| User hunts shows across apps/sites; weak personalization | Personalized modules and artist-tied events inside Spotify  |
| Opaque path to buy; weak attribution                     | Clear partner CTA(s), Pricing, tracked funnel               |
| Little in-app planning or post-show hook                 | Map view, Saves, calendar, reminders, post-event engagement |


---

## Metrics

Success metrics, funnel definitions, and engagement KPIs follow as below. Experiments are evaluated against these definitions and treatment is compared to global 5% holdout.

### North-star (primary)

- **% of listeners attending concerts**

Because purchase occurs off-platform in V1, attendance is measured using a combination of **direct partner conversion signals** (where available), **modeled conversion** (fallback), and **attendance proxies** (e.g. calendar + geo + engagement signals; privacy-reviewed). Partner-level postback contracts and legal details are **out of scope** for this PRD.

Reporting separates **observed attendance/conversion** (Tier 1/2 in `PRD.md`) and **modeled attendance** (Tier 3).

### Primary conversion KPIs


| Funnel Metrics to measure                      | Tracking Event Definition          |
| ---------------------------------------------- | ---------------------------------- |
| **Event CTR**                                  | EventCardClick / EventImpression   |
| **Event Detail Page CTR**                      | GetTicketsClick / EventDetailView  |
| **Handoff success rate**                       | PartnerLanding / GetTicketsClick   |
| **% of users attending concerts** (North Star) | PartnerConversion / PartnerLanding |


### Guardrail metrics


| Guardrail        | Definition                                                                                               | Expectation                             |
| ---------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Engagement**   | Core product engagement (e.g. sessions, listening time, key engagement indices—exact set per DS/product) | No material negative impact vs. holdout |
| **Unsubscribes** | Unsubscribe and notification/marketing opt-out rates relevant to this surface                            | No meaningful increase vs. holdout      |


---

## Scope & requirements

*Prioritized **what** + **why** for builders. Detail level can be expanded per squad.*


| Area                      | Priority | Requirement                                                                                                                                                                          | Why                                           |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| **Discovery surfaces**    | P0       | Personalized Home module; “Live near you” hub with filter/sort; artist page events; search surfacing                                                                                 | Meet users where taste and intent already are |
| **Event card**            | P0       | Artist, localized date/time, venue+city, distance (if known), availability (if partner), partner badge                                                                               | Reduce ambiguity; set trust before click      |
| **EDP**                   | P0       | Lineup/venue/map, timezone; **Ticketmaster** and **SeatGeek** when both have supply (badges + discrete handoff per partner); **Get tickets**, Save/Share/Calendar; “Why recommended” | Conversion + planning + transparency          |
| **Handoff & attribution** | P0       | App deep-link + web fallback; campaign/event/session params; graceful errors; sold-out → similar + follow artist                                                                     | Measurement + fewer dead ends                 |
| **Saved & planning**      | P1       | Saved events list; calendar; reminder scheduling                                                                                                                                     | Intent persistence; attendance lift           |
| **Lifecycle messaging**   | P1       | Saved/on-sale/day-of reminders; post-event module ≤24h                                                                                                                               | Pre/post engagement goals                     |
| **Data / integrations**   | P0       | Ingest from **Ticketmaster** and **SeatGeek**; normalized Event/Venue/Artist mapping; **confidence scoring** for matches                                                             | Relevance and quality bar                     |
| **Instrumentation**       | P0       | Funnel events with ids, surface, rank, geo bucket, deep_link_result, etc.                                                                                                            | Success metrics and debugging                 |


---

## Alternate proposals


| Proposal                                       | Ruling              | Rationale                                                                            |
| ---------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------ |
| **Native checkout / ticket wallet in Spotify** | Out of scope V1     | Support, payments, fraud, refunds—large liability; partner handoff matches non-goals |
| **Build full two-sided marketplace**           | Out of scope V1     | Inventory and ops explosion; V1 validates discovery + conversion path                |
| **Geo-only browse with no personalization**    | Rejected as primary | Weak differentiation vs ticketing apps; taste-first is core principle                |
| **Single partner only**                        | Rejected for V1     | Ticketmaster + SeatGeek for coverage and redundancy                                  |
| **No “why recommended”**                       | Rejected            | Trust, debugging, and relevance transparency (mitigates bad matches)                 |


---

## Plan

### Rollout geography

**Pilot metros:** **Los Angeles**, **San Francisco**, **New York City** (large metropolitan areas). Inventory, relevance tuning, and marketing should align to listeners in these markets for V1 validation.

### Experiment overview


| Variant         | Allocation              | Description                                                                                  |
| --------------- | ----------------------- | -------------------------------------------------------------------------------------------- |
| **Control**     | **5%** (global holdout) | No Project Do More surfaces (or minimal exposure per implementation)—baseline for comparison |
| **Treatment 1** | ~47.5% of non-holdout*  | Personalized module + default ranking (e.g. follow-heavy signals)                            |
| **Treatment 2** | ~47.5% of non-holdout*  | Alternative ranking (e.g. listening-affinity-heavy) and/or placement                         |


### Experiment success criteria & decision guide


| Metric outcome                                                                                                                         | Decision                                           |
| -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| North-star and primary KPIs in show X% lift (more data needed for goal) vs. **5% holdout**; guardrails (engagement, unsubscribes) flat | **Ship** / expand geos                             |
| Mixed: funnel strong but attendance proxy flat                                                                                         | **Iterate** (ranking, surfaces, copy, measurement) |
| Guardrail breach (engagement down, unsubscribes up)                                                                                    | **Stop** or narrow scope; fix before retry         |
| Underpowered in pilot metros                                                                                                           | **Extend** runtime or refine power analysis        |


---

*Source: internal draft `PRD.md` (sections 1–13). Template structure: `PRD Template - External.pdf`.*