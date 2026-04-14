# Spotify Events (V1) — Prototype

This is a clickable V1 prototype built from [`PRD-draft.md`](./PRD-draft.md) for a **listener-first** concerts discovery experience with **partner deep-link checkout**.

## What’s implemented (mapped to PRD draft)
- **Surfaces**:
  - Home: “Live events for you” + “Trending near you”
  - “Live near you” hub (basic filter + sort)
  - Artist page with Events section
  - Saved events page
- **Event detail page (EDP)**:
  - “Get tickets” (partner deep-link)
  - Save / Share / Add-to-calendar (ICS download)
  - “Why recommended”, lineup, venue logistics
  - Sold-out state shows alternatives
- **Measurement visibility**:
  - Logs PRD funnel events to the browser console (see below)

## Local dev
From this directory:

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

## Analytics (prototype-only)
Open DevTools → Console and interact with the UI.

You’ll see events like:
- `EventImpression`
- `EventCardClick`
- `EventDetailView`
- `GetTicketsClick`
- `PartnerLanding`
- `SaveEvent`
- `CalendarAdd`
- `Share`

Event logger implementation: `src/lib/analytics.ts`.

## Notes / intentional limitations (V1 per PRD draft)
- Checkout happens **off-platform** via partner deep-link.
- Partner “purchase confirmation” is **not** implemented; this prototype only demonstrates the funnel events and handoff logging.
- Data is mocked in `src/domain/mockData.ts`.
