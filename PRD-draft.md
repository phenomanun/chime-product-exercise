# Spotify Events & Concerts Booking (Listener-First) — PRD (Initial)

## 1) Context & framing
- **Mission**: Spotify connects global artists with their fans through their art and experiences.
- **Why this product**: Spotify already dominates listener attention and has strong artist/venue-side partnerships (distribution, promotion, data). Live events are the highest-intent fan experience and a natural extension of “connect artists with fans.”
- **Strategy (What)**: Lead with a **listener discovery → booking handoff** experience that helps listeners attend more concerts.
- **Who (stakeholders)**: Artists, listeners, publishers, concert venues, and venue platforms / ticketing partners (e.g., Ticketmaster, SeatGeek).

## 2) Problem statement
Listeners frequently miss concerts they would have attended because:
- **Discovery is fragmented** across venue sites, ticketing apps, social feeds, and word-of-mouth.
- **Relevance is weak** (generic local listings vs. personalized to a listener’s taste).
- **Friction is high** from “I’m interested” to “I bought tickets,” especially on mobile.

## 3) Target users & stakeholders
### Primary user (V1)
- **Listener**: A Spotify user who wants to find and attend concerts they’ll love.

### Partner/stakeholder ecosystem (V1 dependencies, not primary flows)
- **Artists**: Benefit from incremental ticket sales and stronger fan connection.
- **Concert venues / promoters**: Supply event inventory via platforms.
- **Venue platforms / ticketing partners**: Provide event catalog, availability, and purchase flow.
- **Publishers/labels**: May support promotion, sponsorship, rights, and marketing.

## 4) Goals and non-goals
### Goals
- **Primary objective**: Increase the **% of listeners attending concerts**.
- **Secondary objective**: Increase **engagement from concertgoers** in Spotify before/after the event.

### Non-goals (V1)
- **No native ticket purchase** in Spotify (no payments, no ticket wallet, no customer support for purchases).
- **No artist/venue ops tooling** (tour management, inventory management, on-sale configuration).
- **No full marketplace** build. V1 is discovery + intent + partner handoff + lifecycle engagement.

## 5) V1 scope & assumptions (explicit)
- **Listener-first experience**: All UI/flows are built for listeners; partner and artist experiences are out of scope for V1 PRD.
- **Booking model**: “Get tickets” **deep-links to partner** app/web checkout with attribution tracking.
- **Inventory source**: Event catalog and availability come from partners (directly or via an aggregator).
- **Geography**: Start with a limited geo rollout (e.g., 1–2 metro areas) to validate relevance, conversion, and measurement.

## 6) Product principles
- **Taste-first relevance**: Use Spotify signals (listening, follows, saves, genres) to rank events.
- **Low-friction conversion**: Reduce steps and ambiguity between discovery and purchase handoff.
- **Trust and clarity**: Transparent partner attribution, availability state, and expectations (fees/pricing handled by partner).
- **Lifecycle experience**: Delight before (plan) and after (relive) the show, not just at the moment of purchase.

## 7) Key user journeys (MVP)
### Journey A: Discover → Evaluate → Buy (partner handoff)
- **Entry points**:
  - Home feed module: “Live events for you”
  - Dedicated hub: “Live near you”
  - Search: artist search result includes events
  - Artist page: “Events” section
- **Steps**:
  - Listener sees event card (with artist/venue/date + distance).
  - Taps into event detail page.
  - Taps “Get tickets” and is deep-linked to partner checkout.
- **End state**:
  - Successful handoff (tracked). Purchase confirmation may be unknown unless partner postback exists.

### Journey B: Save & plan (increase intent and reduce drop-off)
- **Entry**: Event card or event details.
- **Steps**:
  - Save event to “Saved events.”
  - Add to calendar (ICS / native calendar integration).
  - Set reminders (e.g., 1 week before, 1 day before, day-of).
  - Optional: share to friends.
- **End state**:
  - Listener has a lightweight plan and reminders that increase attendance likelihood.

### Journey C: Day-of → Post-event (concertgoer engagement)
- **Entry**: Push notification or in-app card around event time.
- **Steps**:
  - Day-of reminder (time + venue + map link).
  - Post-event “Relive the show” module: curated playlist / setlist-inspired mix, artist follow prompts.
- **End state**:
  - Increased post-event listening, sharing, and artist affinity.

## 8) MVP feature requirements (V1)
### 8.1 Surfaces (discovery)
- **Personalized event feed module** on Home.
- **“Live near you” hub** with filtering (date range, distance) and sorting (recommended, soonest).
- **Artist page events section** showing upcoming events tied to the artist.

### 8.2 Event card (list view)
Must display:
- Artist(s) / headliner
- Date/time (localized)
- Venue + city
- Distance (if location known)
- Availability state (if partner provides)
- Partner badge (source)

### 8.3 Event detail page (EDP)
Must include:
- Full lineup (if provided) + venue details (address, map link)
- Date/time + timezone
- Partner options (if multiple partners)
- **Primary CTA**: “Get tickets” (deep-link)
- Secondary CTAs: Save, Share, Add to calendar
- “Why recommended” explanation (at least 1–2 top reasons)

### 8.4 Partner handoff and attribution
- Deep-link to partner app if installed; fallback to web.
- Pass **attribution parameters** for measurement (campaign + event + user/session).
- Handle error states gracefully:
  - partner unavailable / deep-link failed → show fallback options
  - sold out → offer “similar shows” and “follow artist for next tour”

### 8.5 Notifications & lifecycle messaging
- Saved-event reminders
- On-sale reminders (if partner provides on-sale date)
- Day-of reminder
- Post-event engagement module (playlist/artist follow) within 24 hours

## 9) Data & integrations (assumptions)
### Event catalog ingestion
- Ingest events from partners (Ticketmaster/SeatGeek/etc.) via API feeds.
- Normalize core event entities:
  - **Event**: event_id, start_time, venue_id, lineup, availability state, partner_id, purchase_url
  - **Venue**: venue_id, geo coordinates, address, capacity (if available)
  - **Artist mapping**: Spotify artist_id ↔ partner artist identifiers

### Entity resolution (critical)
- Lineup/artist matching quality directly affects relevance.
- Maintain **confidence score** for artist-event mapping; filter/flag low-confidence matches.

### Deep-link templates
- Partner-specific link formats (app + web).
- UTM-like attribution parameters, plus internal tracking IDs.

## 10) Success metrics & measurement plan
### North-star (primary)
- **% of listeners attending concerts**

Because purchase occurs off-platform in V1, attendance must be measured using a combination of:
- **Direct partner conversion signals** (preferred where available)
- **Modeled conversion** (fallback)
- **Attendance proxies** (e.g., calendar + geo + engagement signals; carefully privacy-reviewed)

### Funnel definitions (listener discovery → booking)
Define a consistent funnel with an event taxonomy:
1) **EventImpression**: event card or module shown (includes surface + rank position).
2) **EventCardClick**: click on an event card.
3) **EventDetailView**: event detail page loaded.
4) **GetTicketsClick**: click on “Get tickets” CTA.
5) **PartnerLanding** (proxy): partner app/web opened successfully (deep-link resolution success).
6) **PartnerConversion** (where supported): partner postback indicates purchase completed.

Primary conversion KPIs:
- **Event CTR**: EventCardClick / EventImpression
- **EDP CTR**: GetTicketsClick / EventDetailView
- **Handoff success rate**: PartnerLanding / GetTicketsClick
- **Partner conversion rate (where supported)**: PartnerConversion / PartnerLanding

### Measuring “% of listeners attending concerts”
V1 measurement approach (in order of reliability):
- **Tier 1 (best)**: Partner postback or server-to-server conversion confirmation (purchase completed).
- **Tier 2**: Redirect + return signal (e.g., confirmed return intent) if partner supports.
- **Tier 3 (modeled)**: Predict conversion using:
  - PartnerLanding + historical partner conversion rates by partner/geo/price band
  - Event-level covariates (demand, time-to-event)
  - User-level aggregates (without exposing sensitive data)

Reporting should separate:
- **Observed attendance/conversion** (Tier 1/2)
- **Modeled attendance** (Tier 3)

### Concertgoer engagement (pre and post)
Define a “concertgoer” cohort as:
- **Confirmed purchaser** (Tier 1/2), or **high-confidence modeled attendee** (Tier 3 above threshold).

Pre-event engagement KPIs:
- Save rate: Saves / EventDetailView
- Calendar add rate: CalendarAdds / EventDetailView
- Reminder opt-in rate and reminder open rate
- Lift in related listening in the 7 days prior (artist, similar artists, event playlist)

Post-event engagement KPIs (0–7 days post):
- “Relive the show” module CTR
- Playlist starts and completion rate
- Artist follow rate
- Listening lift vs. matched control group
- Share rate

### Instrumentation requirements (minimum)
Log events with common identifiers:
- event_id, venue_id, partner_id, artist_ids, surface_id, rank_position, geo_bucket, timestamp
- user_id (or privacy-safe pseudonymous id), session_id
- deep_link_result (success/failure), failure_reason (if applicable)

## 11) Risks & mitigations
- **Attribution gaps (off-platform purchase)**:
  - Mitigate with partner postbacks where possible; otherwise use modeled conversion with clear labeling.
- **Relevance failures**:
  - Start with high-precision signals (follows, top artists) before broader similarity expansion.
  - Add “Why recommended” to build trust and allow debugging.
- **Data quality** (duplicates, wrong lineup, wrong venue):
  - Dedup rules; confidence scoring; rapid feedback loop from user reports.
- **Partner dependency / inconsistent inventory**:
  - Multi-partner coverage; fallback messaging; avoid hard dependency on any single partner.
- **Privacy & user trust**:
  - Keep measurement privacy-reviewed; allow opt-outs for location-based features.

## 12) Rollout & experimentation
- **Geo rollout**: Start with 1–2 metros; expand based on relevance and measured conversion confidence.
- **Experimentation**:
  - Module placement on Home
  - Ranking model variants (follow-based vs. listening-affinity-based)
  - CTA copy and EDP layout
  - Reminder timing and frequency

## 13) Open questions (next iteration)
- Which initial geos for V1 and how to handle travelers/multi-city listeners?
- Which partners can support **purchase confirmation postbacks** and what are the contract requirements?
- What is the product policy for showing pricing expectations and fees (given partner checkout)?
- What is the minimum viable quality bar for artist-event matching confidence?

