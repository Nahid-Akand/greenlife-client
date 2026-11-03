# GreenLife — Social Development Events Platform

Next.js 16 client (Turbopack, Tailwind v4, React compiler) for organizing and joining community development events.

Auth + events are backed by a separate Express + MongoDB backend in the sibling directory `../greenlife-server` (own `AGENTS.md`).

## Getting started

1. Start the backend (required for login + events):
   ```bash
   cd ../greenlife-server
   node index.js
   ```
   It needs `.env` `MONGODB_URI` + a running MongoDB; auth routes return 500 without it. Backend CORS is hardcoded to `http://localhost:3000`.

2. Start the client:
   ```bash
   npm run dev        # http://localhost:3000 (falls back to 3001, …)
   ```

3. Open http://localhost:3000.

## Commands

- `npm run dev` — Turbopack dev server. A second `npm run dev` detects the running instance and exits.
- `npm run build` / `npm run start` — production build / serve.
- `npx tsc --noEmit` — strict typecheck (no script in package.json).
- `npm run lint` — eslint flat config.
- No test suite. Verify with `npx tsc --noEmit` + `npm run lint`.

See `AGENTS.md` for agent-facing conventions, gotchas, and the pre-existing lint/typecheck baseline.

## Routes

`/`, `/login`, `/register`, `/events`, `/events/create`, `/events/manage`, `/events/joined`, `/events/[id]`, plus section-preview scratch pages.

## Deploy

Standard Next.js deploy (Vercel adapter not required). Point `NEXT_PUBLIC_API_URL` at your deployed backend.
