# Architecture Context — How the Chasha Backend Is Built

> Verified 2026-08-23. This is the authoritative description of existing structure.
> The codebase wins over this document; propose doc updates when they diverge.

## Runtime composition

```
src/index.ts        entrypoint (loads env via config, calls bootstrap)
src/bootstrap.ts    DB connect test → migrations → seeds → GeoIP → Casbin init
src/app.ts          Express app: helmet, cors, cookies, json, hpp, global rate limit,
                    monitoring, mounts /api/v1/:lang, 404 helper, central error handler
```

## Top-level layout

| Path                        | Responsibility                                                                                                                                                          |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/modules/v1/<context>/` | Bounded contexts (feature modules), layered.                                                                                                                            |
| `src/shared/v1/`            | Shared kernel: database (core/schema/migrations/seeds/transaction), middlewares, exceptions, helpers, enums, interfaces, types, validations, domain primitives.         |
| `src/config/`               | App configuration: env, cors, helmet, logger (+metrics), rate-limit, open-api, emitter.                                                                                 |
| `src/infrastructure/`       | External-system adapters: casbin authz, node-cache, axios client, jalali dates, geo-ip, rabbit-mq (dormant), meli-payamak SMS, arvan-cloud S3 storage, i18n translator. |

Versioned namespaces (`v1`) are the API/module versioning convention. New work goes under
the current `v1`.

## Bounded contexts currently present

`authentications`, `authorizations`, `business-employee-sessions`, `business-employees`,
`businesses`, `early-access-requests`, `faqs`, `lockups`, `platform-admin-sessions`,
`platform-admins`, plus a flat `routes/` folder composing aggregate routers.

## Module anatomy (every module follows this)

```
modules/v1/<context>/
├── application/          orchestration of use cases
│   ├── commands/<scope>/<name>.command.ts + handlers/<name>.handler.ts
│   ├── queries/<scope>/<name>.query.ts   + handlers/<name>.handler.ts
│   ├── results/*.result.ts               (output contracts)
│   └── events/
├── domain/               pure business vocabulary
│   ├── entities/*.entity.ts             (interfaces)
│   ├── contracts/i-repository/*.contract.ts  (repository type aliases)
│   ├── enums/  value-objects/  events/  services/
├── infrastructure/       adapters implementing domain contracts
│   ├── repositories/*.repository.ts     (curried factory functions over TypeORM)
│   └── event-bus/consumers/
└── presentation/         HTTP edge
    ├── controllers/{global,admin,business}/<verb-scope-entity>.controller.ts
    ├── dtos/{request,response}/<scope>/...dto.ts
    ├── routes/{global,admin,business}/<resource>.route.ts   (one file per endpoint)
    ├── validations/*.validation.ts       (Zod schema factories)
    └── middlewares/
```

Every directory carries an `index.ts` barrel. Some modules additionally have a top-level
`list/` folder declaring searchable/filterable list fields.

### Established implementation style

- **No DI container and no CQRS bus**: handlers are directly-imported async arrow-function
  consts (`createGlobalEarlyAccessRequestCommandHandler`, `findAllFaqByTypeQueryHandler`).
  The handler _is_ the service.
- **Curried factories everywhere**: repositories are created as `export const xRepository =
(): XContract => async (args, manager?) => {...}` and invoked as `xRepository()(args)`.
- **Contracts live in domain** (`domain/contracts/i-repository/*.contract.ts` as type
  aliases); TypeORM implementations live in the module's infrastructure layer; entity
  models are centralized in `src/shared/v1/database/schema/` and imported by name.
- **Mapping model→result happens inline in handlers** (object literals / destructuring);
  there are no separate mapper files today.
- **Transactions** via shared `transactionManager(async (manager) => ...)`, passing the
  optional `manager` into repository calls (see forgot-password-verify handler).
- **Events**: `eventEmitterConfig.emit(EventName.X, payload)` from application handlers;
  consumers registered at import time under `infrastructure/event-bus/consumers/`.

## HTTP surface

- Mount chain: `app.use('/api/v1/:lang', languageFilterMiddleware, v1Router)`;
  `v1Router` mounts `/admin`, `/business`, `/global` (from `src/modules/v1/routes/`).
- Protected prefixes attach their auth middleware once (e.g. `/admin/authz` and
  `/admin/early-access-request` mount `requirePlatformAdminAuthMiddleware`), then each
  route adds `permissionGuard*Middleware({...})` → `validateBody/QueryMiddleware(schemaFactory)`
  → controller.
- Controllers are thin arrow functions: parse input → call query/command handler →
  `successResponseHandler` / `paginationResponseHandler`; errors go to `next(error)`.

### Response envelopes (shared helpers only)

Success: `{ status, success: true, author: 'Mehkam_Company', message, data, timeStamp, version }`.
Error: `{ status, success: false, author, message, errorCode, errors, timeStamp, version }`
(`errors` is `{ field: string[] }`). Pagination nests inside `data`:
`{ paginationItems, paginationMeta: { paginationMetaPage, paginationMetaLimit,
paginationMetaTotalItems, paginationMetaTotalPages, paginationMetaHasNextPage,
paginationMetaHasPreviousPage } }`.

### Errors

Exception factory functions (not classes): `throwBadRequestException` (400),
`throwUnAuthenticatedException` (401), `throwUnAuthorizedException` (403),
`throwNotFoundException` (404), `throwRequestConflictException` (409),
`throwTooManyRequestException` (429). They enrich plain `Error` with
`statusCode/errorCode/details`. One central `errorHandlerHelper` maps ZodError, MulterError,
AppError, and unknowns to the error envelope.

## Authorization architecture (as built)

1. Authentication middleware per actor family (`requirePlatformAdminAuthMiddleware`,
   `requireBusinessEmployeeAuthMiddleware`): verifies JWT (cookie or bearer), checks
   token-type claim, validates DB session (active/not expired/not revoked), sets `req.user`.
2. Permission guard per route (`permissionGuardPlatformAdminMiddleware({ module, resource, action })`)
   resolves the actor's role and checks an active permission row matching the triple.
3. Permissions themselves are rows seeded by key `<module>.<resourceSlug>.<action>` with
   subject/module/resource/action/version plus bilingual labels; role-permission seed
   assigns them to roles (`super_admin` gets all — marked temporary test data upstream).
4. Casbin (domain-aware RBAC model in `model.conf`: `sub, dom, obj, act`) initializes at
   boot but no route uses it yet. Do not introduce Casbin checks without operator approval.

## Database architecture summary

- Single `AppDataSource` with master/slave replication; reads may hit replicas; writes go
  to master. Built-in query-result cache persisted in table `chasha_caches` (default 300s).
- Entities centralized in `src/shared/v1/database/schema/<group>/*.schema.ts` (`*Model`
  classes); UUID PKs (`<prefix>_id`), explicit snake_case column names, timestamp trio
  created/updated/deleted (soft deletes via `@DeleteDateColumn`).
- Migrations in `src/shared/v1/database/migrations/<13-digit-timestamp>-<Snake_Description>.ts`,
  auto-run at boot, and must be re-exported from `src/index.ts` for Vite bundling.
- Seeds run on every boot in fixed order using upsert semantics.

Full rules: [`../rules/database-rules.md`](../rules/database-rules.md).

## Swagger/OpenAPI

No decorators. One hand-maintained static JSON document:
`src/config/open-api/document/base/en-base-config.config.json` (openapi `3.2.0`, `en` only),
loaded from disk and served via swagger-ui at `OPEN_API_URL` (default `/api-docs`) when
`OPEN_API_ENABLED`. Paths use a `{language_prefix}` placeholder segment. Security schemes:
`CookieAuth` (cookie `accessToken`) and `BearerAuth`.

## Cross-cutting behaviors to preserve

- `req.lang ∈ {fa,en}` set by `languageFilterMiddleware`; all messages resolved through
  translator dictionaries (`t(...)`), never inline literals.
- Rate limiting exists globally and as a per-route factory used on sensitive endpoints
  (e.g. login steps).
- Monitoring middleware logs requests (pino, `X-Request-ID`) and records prom-client metrics.
- Query cache invalidation after writes: `AppDataSource.queryResultCache?.remove([...keys])`;
  paginated lists build explicit composite cache keys.
