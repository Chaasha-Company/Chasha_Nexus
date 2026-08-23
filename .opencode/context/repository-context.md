# Repository Context — Facts, Tooling, Quirks

> Verified 2026-08-23. The codebase is the final source of truth; re-verify before relying
> on any fact during a task.

## Stack (from `package.json`, verified)

- Runtime: Node `>=24.18.0` (`.nvmrc`: `24.18.0`), npm `>=11.0.0`, `"type": "module"`.
- Framework: Express `5.2.1`; TypeScript `6.0.3` (`strict: true`, decorators enabled, target ES2022).
- Persistence: TypeORM `0.3.29` + `mysql2` `3.22.2` (master/replica replication).
- Validation: Zod `4.3.6`.
- Auth: `jsonwebtoken`, `bcryptjs`; Casbin `5.50.0` + `typeorm-adapter` (initialized, unused by routes).
- Docs: `swagger-ui-express` serving a hand-maintained static JSON spec.
- Observability: `pino`/`pino-http`, `prom-client` (metrics collected; no `/metrics` endpoint yet).
- Messaging: in-process `EventEmitter`; `amqplib` present but dormant.
- Build: Vite `8` + `vite-plugin-node` → ESM `dist/` with `preserveModulesRoot: 'src'`.
- Tests: Jest `30` + `ts-jest` configured (`roots: src/`) but **no test files exist**; `npm test` intentionally fails.

## Commands

| Command                                                     | Purpose                                                                                                                                      |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run start:dev`                                         | Dev server (`cross-env NODE_ENV=development tsx watch src/index.ts`). **Always use this**, never bare `tsx`.                                 |
| `npm run build:production`                                  | `vite build` + asset copy into `dist/`.                                                                                                      |
| `npm run start:production`                                  | `node dist/index.js`.                                                                                                                        |
| `npm run npm:check`                                         | `npm ls` + `tsc --noEmit` + eslint (`--max-warnings=0`) + prettier check.                                                                    |
| `npm run lint` / `lint:fix`                                 | ESLint over `src/**/*.{ts,js}`, zero warnings allowed.                                                                                       |
| `npm run format` / `format:check`                           | Prettier over repo.                                                                                                                          |
| `npm run migration:create`                                  | New blank migration (dev datasource).                                                                                                        |
| `npm run migration:generate:dev`                            | Diff-driven migration against dev DB via `src/shared/v1/database/core/data-source.ts`.                                                       |
| `npm run migration:run:dev`                                 | Run pending migrations (dev).                                                                                                                |
| `migration:generate:production`, `migration:run:production` | Same but against compiled `dist` datasource path `./shared/v1/database/core/data-source.js` (no `src/` prefix — Vite `preserveModulesRoot`). |
| `npm test`                                                  | Intentionally failing placeholder until tests are wired.                                                                                     |

## Env loading gotcha

`src/config/env/env-loader.config.ts` loads `.env.{NODE_ENV}` from CWD **at import time**;
unset `NODE_ENV` defaults to production (loads `.env.production`). Always go through npm
scripts. Variable names are documented in `.env.example` (app info, rate limits, OpenAPI,
master/replica DB, pools, MeliPayamak SMS, RabbitMQ, ArvanCloud S3, bcrypt salt, JWT
access/refresh secrets and expiries, admin OTP expiries, employee forgot-password expiry).

## Startup flow

`src/index.ts` → `src/bootstrap.ts` → `src/app.ts`.

Bootstrap order: DB connection test (master+slave) → migrations (`AppDataSource.runMigrations()`)
→ seeds (upsert-style, every boot) → GeoIP init → Casbin init. RabbitMQ consumer setup is
commented out. App mounts helmet, cors, cookie-parser, json, hpp, global rate limit,
monitoring middleware, then `/api/v1/:lang` router, then 404 helper and central error handler.

## Git hooks & commit conventions

- Husky: `pre-commit` runs full `npm:check` + `npm run lint` repo-wide (slow — expected);
  `pre-push` runs lint + format check; `commit-msg` runs commitlint.
- Commitlint (`commitlint.config.js`, config-conventional): types `build, chore, ci, docs,
feat, fix, perf, refactor, revert, style, test`; header max 100 chars.
- `lint-staged`: eslint --fix + prettier --write on staged ts/js, prettier on json/md/yaml.

## Formatting & linting specifics

- Two Prettier configs coexist; `.prettierrc` wins (`printWidth: 260`, singleQuote,
  trailingComma all) — matches the long-line style used across `src/`. Do not reformat
  code to a narrower width.
- ESLint ignores include `dist/**`, `coverage/**`, `node_modules/**`, `src/__scripts__/**`,
  and notably `src/shared/v1/enums/**`.
- Jest maps `@/` → `src/`; same alias exists in tsconfig paths and vite resolve.alias.

## Known deviations observed 2026-08-23 (re-verify before acting)

These are point-in-time observations, listed so the agent is not surprised. Do not "fix"
them unless a task explicitly covers them:

1. Identifier typos preserved in source (must be reproduced when extending, renamed only if a task says so):
   `getAllEarlyAccessRequestContoller`, `DetailEarlyAccessRequestReponseDTO`,
   `UpdateEalryAccessRequestCommand`, `create-early-access-request.repositroy.ts`,
   `find-ealry-access-request-status-by-slug.*`.
2. Several module routers are defined but never mounted (businesses, business-employees,
   platform-admins, both session modules).
3. `business-employee-sessions` contains a route file named like platform-admin-session (copy-paste artifact); it exports an empty router that is not mounted.
4. A misplaced repository copy exists at
   `business-employees/infrastructure/repositories/find-platform-admin-by-phone-number.repository.ts`.
5. `requestIdMiddleware` is defined but never applied; metrics middleware collects data but no `/metrics` endpoint exists; `prometheus.yml` scrapes a path nothing serves.
6. Admin login OTP verify contains a hardcoded development OTP check (`123456`).
7. The `super_admin` role-permission seed is marked in-source as temporary test data.
8. Swagger doc for early-access create documents HTTP 200 while the controller returns 201; get-all example shows an outdated pagination shape.
9. Some entity TS types lag reality (e.g. `BusinessesModel.businessTypeId!: number` holds a UUID).
10. README prose describes aspirational infra (PostgreSQL/Redis/OpenTelemetry) — actual stack differs; trust code/config.

## Repo-root extras

`opencode.json` holds opencode provider configuration only — do not modify it as part of
engineering tasks. `plopfile.ts` is empty. `.opencode/agent|command|instructions|plugin|skills`
are pre-existing empty opencode scaffolding directories.
