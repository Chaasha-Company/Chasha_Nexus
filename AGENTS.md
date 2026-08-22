# AGENTS.md

Guidance for AI coding agents working in this repo (Chasha Core Backend — Express 5 + TypeScript Restaurant OS backend).

## Commands

- Requires Node `24.18.0` (`.nvmrc`, `engines` in package.json) and npm >= 11.
- Dev server: `npm run start:dev` (sets `NODE_ENV=development`, runs `tsx watch src/index.ts`). Do NOT run `tsx src/index.ts` directly — see Env loading below.
- Full verification (what pre-commit runs): `npm run npm:check` then `npm run lint`
  - `npm:check` = `npm ls` + `npm run npm:check:types` (`tsc -p tsconfig.json --noEmit`) + `lint` (eslint `--max-warnings=0`) + `format:check` (prettier).
- Tests are NOT wired up: `npm test` intentionally exits with an error. Jest config exists (`jest.config.ts`, roots `src/`, alias `@/` mapped) but there are no test files yet; scaffolding lives in `__test__/` which jest does not scan. Treat `npm:check` + `lint` as the verification step.
- Production build: `npm run build:production` = `vite build` + `copy-asset` script. Run via `npm run start:production` (`node dist/index.js`).

## Env loading gotcha

- `src/config/env/env-loader.config.ts` loads `.env.{NODE_ENV}` from CWD at import time. If `NODE_ENV` is unset it defaults to **production**, silently loading `.env.production`. Always go through the npm scripts (they set `NODE_ENV` via `cross-env`). `.env.example` documents required variables.

## Database & migrations

- MySQL via TypeORM with master/replica replication; `synchronize: false` — every schema change requires a migration file in `src/shared/v1/database/migrations/`.
- New migration files MUST also be re-exported from `src/index.ts` (see the TODO there): Vite only bundles migrations listed there, and production migration commands run against compiled JS in `dist`.
- Migration scripts differ by env on purpose: dev points at `./src/shared/v1/database/core/data-source.ts`, production at `./shared/v1/database/core/data-source.js` (dist output drops the `src/` prefix because of `preserveModulesRoot: 'src'` in `vite.config.ts`).
- On startup, `bootstrap()` connects to the DB, loads migrations and seeds, initializes GeoIP and Casbin. RabbitMQ consumer setup exists but is commented out.

## Build quirks

- Vite (with `vite-plugin-node`) bundles this Express server to ESM (`"type": "module"`) into `dist/`, preserving module structure rooted at `src`.
- `copy-asset` copies runtime assets into `dist`: `.env*` files, `.htaccess`, `index.html`, `package.json`, `public/`, `__data__/`. A local Vite plugin in `__plugin__/` copies JSON files during build.

## Structure

- Entrypoint flow: `src/index.ts` -> `src/bootstrap.ts` -> `src/app.ts` (Express app).
- Bounded contexts live in `src/modules/v1/<context>/` (authentications, authorizations, businesses, early-access-requests, faqs, ...) each layered as `application/` (commands, queries, events), `domain/`, `infrastructure/`, `presentation/` (controllers, dtos, routes, validations) with barrel `index.ts` per directory.
- Cross-cutting code: `src/shared/v1/` (database core/schema/migrations/seeds, middlewares, exceptions, validations, ...), app config in `src/config/` (env, cors, helmet, logger, rate-limit, open-api), external-system adapters in `src/infrastructure/` (Casbin authz, cache, SMS via MeliPayamak, S3-compatible storage via ArvanCloud, GeoIP).
- Versioned folders (`v1`) are part of the API/module versioning convention — put new work under the current `v1` namespace.
- Import alias `@/` maps to `src/` (configured in tsconfig `paths`, vite `resolve.alias`, and jest `moduleNameMapper` — keep all three consistent when touching config).

## Git hooks & commits

- Conventional Commits are enforced by commitlint on commit-msg; header max 100 chars, allowed types: feat, fix, refactor, perf, test, docs, style, build, ci, chore, revert.
- pre-commit hook runs the full `npm:check` + `lint` suite repo-wide (not just staged files) — expect slow commits; fix issues rather than skipping hooks.
- pre-push runs `lint` + `format:check`.

## Docs vs reality

- README describes aspirational infra (PostgreSQL, Redis, OpenTelemetry). The actual stack is MySQL (mysql2), a database-backed TypeORM query cache (`chasha_caches` table), prom-client metrics, and pino logging. Trust code/config over README prose.
