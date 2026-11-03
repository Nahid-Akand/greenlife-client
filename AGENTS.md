<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# GreenLife — Social Development Events Platform

Next.js 16 client (Turbopack, Tailwind v4, React compiler). Auth backend is the sibling app `../greenlife-server` (Express + MongoDB). Auth + events are backend-backed via cookie sessions — **not** localStorage.

## Commands
- `npm run dev` — Turbopack dev server, http://localhost:3000; falls back to the next free port (3001, …). A second `npm run dev` detects the running instance and exits (log: `.next/dev/logs/next-development.log`).
- `npm run build` / `npm run start` — production build / serve.
- `npx tsc --noEmit` — strict typecheck (no script in package.json).
- `npm run lint` — eslint flat config.
- No test suite. Verify with `npx tsc --noEmit` + `npm run lint`.

## Verification baseline (measured; pre-existing — do not treat as your regressions)
`npx tsc --noEmit` exits 1 with 3 errors, all `Property 'status' is missing ... required in type 'EventCardProps'` (`EventCardProps.status` is `"upcoming" | "active" | "completed"` and is required):
- `src/app/events/joined/page.tsx:34`
- `src/app/events/manage/page.tsx:161`
- `src/components/sections/recent-events.tsx:47`

`npm run lint` exits 1 with 15 problems (9 errors, 6 warnings):
Errors — `no-explicit-any`: `src/app/login/page.tsx:53,85`, `src/app/register/page.tsx:94`; `react-hooks/set-state-in-effect`: `src/app/events/[id]/page.tsx:34`, `src/components/theme-toggle.tsx:13`, `src/components/ui/carousel.tsx:98`, `src/contexts/events-context.tsx:78`; `react-hooks/purity`: `src/app/events/page.tsx:40` (`Date.now` during render); `react/no-unescaped-entities`: `src/app/events/manage/page.tsx:144`.
Warnings — 6 × `no-img-element`: `src/app/events/[id]/page.tsx:78`, `src/components/events/event-card.tsx:55`, `src/components/events/event-form.tsx:391`, `src/components/sections/index.tsx:36,121,335`.

Don't add new lint/tsc issues. Don't claim the tree is clean.

## Backend (required for login + events)
- `src/lib/api.ts`: base = `NEXT_PUBLIC_API_URL` or `http://localhost:5001`, `credentials: "include"` (cookie sessions). `.env` sets `NEXT_PUBLIC_API_URL=http://localhost:5001`.
- Start the backend with `node index.js` in `../greenlife-server`; it needs `.env` `MONGODB_URI` + a running MongoDB or routes return 500.
- Backend CORS is hardcoded to origin `http://localhost:3000` — if dev fell back to port 3001, auth calls fail with CORS.
- Google login posts `{ credential }` to `POST /auth/google` (client `authAPI.googleLogin`); server-side implementation is unverified.

## Auth (`src/contexts/auth-context.tsx`)
- `useAuth()`; `login(user)` takes a **User object returned by the API** (not credentials).
- `logout()` calls `authAPI.logout()` then clears the frontend user.
- On mount, `useEffect` calls `authAPI.me()` to restore the session; `isLoading` is real state (starts `true`).
- No route redirects to `/login`. `AuthGuard` (`src/components/auth-guard.tsx`) exists but is **unused**. Pages handle auth inline: event-detail Join is disabled with a sign-in hint when logged out; manage/joined render empty states when logged out; create no-ops without a user.

## Events (`src/contexts/events-context.tsx`)
- `createEvent`/`joinEvent`/`leaveEvent`/`deleteEvent`/`updateEvent`/`getEventById`/`loadEvents`, all `fetch` to `${API_URL}/events…` with `credentials: "include"`. Persisted to the backend (MongoDB), not localStorage. No seed data file.

## Layout / providers
- `src/app/layout.tsx`: `GoogleProvider` > `Providers` > `Navbar` + `{children}`. `Providers` (`src/components/providers.tsx`): `ThemeProvider` (next-themes, `storageKey="greenlife-theme"`, default `light`, `enableSystem={false}`) → `AuthProvider` → `EventsProvider`. **Do not add more global providers elsewhere.**
- `Toaster`/`ThemeScript` components exist but are **not mounted** in the layout.

## Routes
- `/`, `/login`, `/register`, `/events`, `/events/create`, `/events/manage`, `/events/joined`, `/events/[id]`; scratch previews `/banner`, `/gallery`, `/features`, `/newsletter`, `/recent-events`, `/navbar`.

## Conventions / gotchas
- Path alias: `@/*` → `./src/*` (`tsconfig.json` paths).
- UI: shadcn **base-nova** over **Base UI** (`@base-ui/react`) + lucide-react — **not Radix**; no `asChild`. Use the `render` prop (see `src/components/ui/dialog.tsx`) or `router.push()`.
- `import { cn } from "cn"` (the `cn` package) throughout. `@/lib/utils` defines `cn` too but nothing imports it from there; the shadcn CLI alias points to `@/lib/utils`, so CLI-generated files may use `@/lib/utils`.
- Next.js 16: `useParams()` returns a plain object here (`const id = params.id`), **not** a Promise — do not `await`/`.then()` it.
- `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, `reactCompiler: true`; Tailwind v4 via `@tailwindcss/turbopack` under `turbopack.rules["*.css"]`. `globals.css` uses `@import "tailwindcss"` + `@theme inline`. If dev UI looks stale after edits, restart `npm run dev`.
