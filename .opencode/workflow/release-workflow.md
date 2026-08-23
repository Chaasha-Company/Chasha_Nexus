# Release Workflow

Status: **DRAFT** — no CI/CD or release automation exists in the repository (verified
2026-08-23). Deployment topology is operator-managed. Treat this as the manual baseline and
confirm specifics with the operator before performing a real release.

## Preconditions

- All intended tasks Completed (committed) with gates green.
- No dirty working tree; on the agreed release commit/branch.
- Operator explicitly requested the release.

## Build

```bash
npm run npm:check && npm run lint   # final gate
npm run build:production            # vite build + copy-asset into dist/
```

`copy-asset` mirrors `.env*`, `.htaccess`, `index.html`, `package.json`, `public/`,
`__data__/` into `dist/`. Verify production `.env.production` values with the operator —
never print secret contents in reports/logs.

## Database

- Migrations auto-run at boot (`AppDataSource.runMigrations()`), so deploying `dist` applies
  pending migrations against the production database automatically.
- Before releasing schema changes: confirm backups exist, migrations are additive-first,
  each is re-exported from `src/index.ts` (bundling), and destructive steps were approved
  with a data-safety plan.
- Production migration tooling path note: scripts target `./shared/v1/database/core/data-source.js`
  inside `dist` (Vite `preserveModulesRoot: 'src'`). Do not "fix" this difference.

## Deploy & smoke checks

1. `npm run start:production` (or operator's process manager).
2. Verify: boot log shows connection test OK for master+slave, migrations applied, seeds
   upserted without error, GeoIP + Casbin initialized.
3. Smoke: `GET /api/v1/en/global/faq/get-all` returns success envelope; Swagger UI loads at
   `OPEN_API_URL`; a protected endpoint correctly returns 401 without credentials and 403
   without permission; login flow issues tokens.

## Rollback posture

Rollback = redeploy previous artifact + restore database backup if (and only if) the
release contained irreversible migrations. This is why destructive migrations need approval
and expand-contract planning.

## Known gaps to raise with operator (not fixes to make silently)

No metrics endpoint exists yet despite prom-client collection; no health endpoint contract;
no automated release notes/versioning beyond `package.json` version. Each is backlog material.
