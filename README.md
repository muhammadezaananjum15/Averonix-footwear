# Averonix Footwear

A premium React + TypeScript storefront for Averonix, a performance footwear brand.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Data and backend

The storefront is frontend-only. Product inventory is static and bag/saved-style state is persisted in the browser with local storage. It makes no database, API, authentication, payment, or checkout requests; the Vite app is the active entry point through `index.html`.
