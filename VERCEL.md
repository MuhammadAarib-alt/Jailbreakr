# Deploying to Vercel

This project is a **Vite SPA + Convex backend**. The frontend deploys to
Vercel as static files; the Convex backend runs on a Convex deployment
(managed by Freebuff in this workspace, or your own at
[dashboard.convex.dev](https://dashboard.convex.dev)).

## Why `npm run build` used to exit with 2

Vercel clones a **clean** copy of your repo and runs `npm run build`
(`tsc -b && vite build`). It failed because:

1. `src/convex/_generated/` was gitignored, so the Convex API types were
   missing on a fresh clone. Every Convex file imports from
   `./_generated/server`, so `tsc -b` failed with
   `error TS2307: Cannot find module './_generated/server'` — that is the
   exit-code-2 failure you kept seeing.
2. The generated files **cannot be regenerated on Vercel**: `convex
   codegen` requires Convex deployment credentials, which CI does not
   have. The Convex CLI's own docs say generated code should be committed
   to the repo ("your code won't typecheck without it!").

### What was fixed

- `.gitignore` no longer ignores `src/convex/_generated/`, and the
  generated files are committed.
- `vercel.json` keeps `npm run build` as the build command, sets `dist` as the
  output directory, and adds SPA rewrites so `/auth`, `/dashboard`, etc. load
  correctly on refresh (plus immutable caching for hashed `/assets/*`).
  (Node 24.x was set in project settings; `engines.node >= 22` in
  `package.json` also pins the CLI runtime.)
- `package.json` gained an `engines.node >= 22` hint (Vite 7 requires
  Node 20.19+ / 22.12+).

No UI, routing, or Convex workflow changed.

## Vercel setup (one time)

1. **Import the repo** on Vercel. Framework preset: **Vite** (auto-detected
   from `vercel.json`). Build command and output directory are already
   correct — leave them alone.

2. **Add environment variables** in Vercel → Project → Settings →
   Environment Variables:

   | Variable           | Required | Value |
   |--------------------|----------|-------|
   | `VITE_CONVEX_URL`  | yes      | Your Convex deployment URL, e.g. `https://your-deployment.convex.cloud` |

   `VITE_…` variables are baked into the bundle at **build time** — if you
   change `VITE_CONVEX_URL`, trigger a new deployment.

3. **Tell Convex about itself** (needed for sign-in to work in production).
   In the Convex dashboard (Settings → Environment Variables) set:

   - `CONVEX_SITE_URL` = your **Convex deployment URL** (e.g.
     `https://your-deployment.convex.cloud`) — this is the JWT issuer the
     deployment validates its own sign-in tokens against, and OIDC
     discovery is served on the deployment itself, so it must be the
     convex.cloud URL, *not* the Vercel URL.
   - `VLY_CONVEX_AUTH_ISSUER` = `https://freebuff.com` (enables the
     federated Freebuff-token provider in `auth.config.ts`).

   (`CONVEX_SITE_URL` is not read by the frontend bundle — no Vercel-side
   copy needed.)

4. **Deploy.** `npm run build` should now succeed.

## Keeping the Convex backend in sync

Vercel deploys the **frontend only**. When you change files under
`src/convex/`, push the backend functions to your production deployment
with:

```bash
npx convex deploy
```

(Use `bun convex dev --once` locally to sync functions + regenerate
`src/convex/_generated/` during development. If generated files ever go
stale, `tsc -b` will catch it before deploy.)

## Freebuff sandbox variables

`VLY_INTEGRATION_KEY`, `VITE_VLY_APP_ID`, `VITE_VLY_MONITORING_URL`, and
`VLY_CONVEX_AUTH_ISSUER` are injected by the Freebuff workspace and are
**not needed on Vercel** — the app degrades gracefully without them
(error reporting is opt-in and skipped when absent).
