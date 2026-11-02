<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# GreenLife — Social Development Events Platform

Next.js 16 client. The auth backend is a **separate app in the sibling directory `../greenlife-server`** (Express + MongoDB, own `AGENTS.md`).

## Commands
- `npm run dev` — Turbopack dev server, http://localhost:3000; if busy it takes the next free port (3001, …). If a dev server is already running for this directory, a second `npm run dev` detects it and exits, pointing at the running instance (log: `.next/dev/logs/next-development.log`).
- `npm run build` / `npm run start` — production build / serve.
- `npx tsc --noEmit` — typecheck (strict TS; no typecheck script). Currently passes clean.
- `npm run lint` — `eslint` (flat config, next vitals + TS rules). **Exits 1 on pre-existing errors**: `@typescript-eslint/no-explicit-any` in `src/app/login/page.tsx` (×2) and `src/app/register/page.tsx` (×1), `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx`, plus 4 `no-img-element` warnings. Don't fix these unless asked; just don't add new ones.
- No test suite exists. Verify with `npx tsc --noEmit` + lint (compare against the baseline above).

## Backend (required for login/register to work)
- `src/lib/api.ts` calls `NEXT_PUBLIC_API_URL` or `http://localhost:5001` with `credentials: "include"` (cookie sessions). Start the backend with `node index.js` in `../greenlife-server`; it needs `.env` `MONGODB_URI` + a running MongoDB or auth routes return 500.
- **CORS is hardcoded to origin `http://localhost:3000` in the backend** — if the dev server fell back to port 3001, auth calls fail with a CORS error.
- Only auth is server-backed; **events CRUD is localStorage-only** (key `greenlife_events`).
- Known contract mismatch (as of this writing): the server responds `{ user }` on success and `{ error }` on failure, but `api.ts` returns the body unchanged and reads `error.message` — so `login()`/`register()` currently store the envelope `{ user: … }` and API failures always surface as "Request failed". Fix both sides together when touching auth.
- "Continue with Google" posts a stub token to `POST /auth/google`, which the backend does not implement (404).

## Architecture
- Root layout `src/app/layout.tsx` wraps everything: `ThemeProvider` (next-themes) → `AuthProvider` → `EventsProvider` → `Navbar` + `Toaster` + `ThemeScript`. Do not add more global providers elsewhere.
- Auth: `src/contexts/auth-context.tsx` — `useAuth()`; `login(user)` takes a **User object returned by the API** (not credentials); `logout()` only clears localStorage key `greenlife_user` — it does **not** call `authAPI.logout` (defined in `api.ts`, never used), so the server session cookie survives. `isLoading` is hardcoded `false`. `DEMO_USER` is an unused leftover (the old demo login is gone).
- Events: `src/contexts/events-context.tsx` — `createEvent`/`joinEvent`/`leaveEvent`/`deleteEvent`/`updateEvent`/`getEventById`, persisted to localStorage; seed data `SEED_EVENTS` lives in the auth-context file.
- Routes: `/`, `/login`, `/register`, `/events/create`, `/events/manage`, `/events/joined`, `/events/[id]`, plus section-preview scratch pages `/banner`, `/gallery`, `/features`, `/newsletter`, `/recent-events`, `/navbar`.
- **`AuthGuard` (`src/components/auth-guard.tsx`) exists but is used nowhere** — no route redirects to `/login`. Pages handle auth inline instead: `EventCard` join redirects to `/login`, the event-detail Join button is disabled with a sign-in hint, manage/joined render empty states when logged out, and create's `handleSave` silently no-ops without a user.

## Conventions / gotchas
- Path alias: `@/*` → `./src/*` (see `tsconfig.json` paths).
- UI: shadcn **base-nova** style over **Base UI** (`@base-ui/react`) + lucide-react — **not Radix**; most online shadcn examples won't match this codebase.
- `cn` is imported directly as `import { cn } from "cn"` (the `cn` npm package) throughout existing components. `@/lib/utils` re-exports it but nothing imports it; the shadcn CLI alias points there, so CLI-generated files may use `@/lib/utils`.
- Base UI has **no `asChild`** (Radix API). Use the `render` prop instead (see `src/components/ui/dialog.tsx`) or navigate with `onClick={() => router.push(...)}` as existing pages do.
- Next.js **16**: dynamic route `params` is a Promise — `src/app/events/[id]/page.tsx` resolves it via `params.then(...)` inside `useEffect`. Read `node_modules/next/dist/docs/` before writing non-obvious Next code (see block above).
- `next.config.ts`: `cacheComponents: true`, `partialPrefetching: true`, `reactCompiler: true` (babel-plugin-react-compiler), Tailwind v4 CSS loaded via `@tailwindcss/turbopack`. If the dev UI looks stale after edits, restart `npm run dev`.
