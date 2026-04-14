# Spotify Events (V1) — Prototype

This is a clickable V1 prototype built from `[PRD.md](../PRD.md)` for a **listener-first** concerts discovery experience with **partner deep-link checkout**.

## What’s implemented (mapped to PRD)
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

## Notes / intentional limitations (V1 per PRD)
- Checkout happens **off-platform** via partner deep-link.
- Partner “purchase confirmation” is **not** implemented; this prototype only demonstrates the funnel events and handoff logging.
- Data is mocked in `src/domain/mockData.ts`.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
