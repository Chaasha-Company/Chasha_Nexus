# API Development Rules

Every endpoint follows existing Chasha conventions. Before implementing, inspect the most
similar existing routes (e.g. `early-access-requests` for protected admin CRUD,
`faqs`/`lockups` for public reads, `authentications` for auth flows).

## R1. Route construction

- Mount under `/api/v1/:lang` (automatic) inside one of `admin`, `business`, `global`
  aggregate routers in `src/modules/v1/routes/*.route.ts`.
- Protected prefixes attach their auth middleware once at mount:
  `router.use('/early-access-request', requirePlatformAdminAuthMiddleware, router)`.
- One file per endpoint under `<module>/presentation/routes/{global|admin|business}/`;
  register it in the module barrel and the appropriate aggregate route file.
- Middleware order on each route: auth (from prefix) → permission guard → validation → controller.

## R2. Endpoint decision checklist (answer before coding)

Route naming & method · request DTO shape · validation schema · error messages · response
envelope & status code · authentication family · permission triple · Swagger entry ·
pagination/search/filter/sort needs · language behavior (`req.lang` from path).

## R3. Controllers

- Arrow-function consts named per naming rules; signature
  `(req: Request, res: Response, next: NextFunction): Promise<void>` with try/catch → `next(error)`.
- Read input as established: validated body/query via DTO casts (`req.query as unknown as XDTO`
  where existing code does so); pass `req.lang` into handlers/messages.
- Respond only through helpers: `successResponseHandler` (default 200),
  `paginationResponseHandler` (lists), `HttpStatus.CREATED` + `CREATED_SUCCESS` message for creates.

## R4. Application handlers

- One query/command + handler (+ result interface) per use case under
  `application/{queries,commands}/<scope>/`; scope folders follow existing split
  (`global/`, `admin/`, `business/`).
- Handlers perform existence checks and business rules using repository contracts and shared
  exception factories with translated details; emit events through `eventEmitterConfig`
  when side effects exist (SMS etc.), defining event payload types in domain/events and a
  consumer under infrastructure/event-bus/consumers when needed.

## R5. Pagination, search, filtering

- List endpoints accept `paginationPage`/`paginationLimit` via shared
  `PaginationQueryValidation(lang)` (spread its `.shape` into module schemas).
- Return via `paginationResponseHandler` so `data.paginationItems` + `data.paginationMeta` shapes match exactly.
- Search/filter fields are declared in the module's top-level `list/` definition object
  (see `platform-admins/list/` and `early-access-requests/list/`) and applied through the
  established helper pattern; paginated queries set explicit composite cache keys and
  writers invalidate them via `AppDataSource.queryResultCache?.remove([...])`.

## R6. Status codes & errors

- 200 read/update success (updates may return `data: null` with `UPDATED_SUCCESS`),
  201 create, errors exclusively by throwing shared exceptions (400/401/403/404/409/429).
- Never invent response keys outside the envelopes; never return raw arrays at top level.

## R7. Permissions sync (mandatory)

For every new protected endpoint:

1. Choose/extend the permission triple (`module` string, `PermissionResourceEnum`,
   `PermissionActionEnum`).
2. Add permission seed row(s) (key `<module>.<slug>.<action>`, subject, bilingual labels).
3. Extend role-permission seed assignment if the role should hold it.
4. Wire `permissionGuard*Middleware` with the same triple on the route.
5. Verify guard module string equals seed `permissionModule` exactly.

Permissions and routes must never drift; a merged protected route without a seeded,
assigned permission is a defect.

## R8. Swagger/OpenAPI sync (mandatory)

Update the static spec `src/config/open-api/document/base/en-base-config.config.json`:

- Path entry using `{language_prefix}` placeholder; correct tag group and camelCase operationId.
- Request/response schemas under `components/schemas` matching real envelopes (success shape,
  pagination meta names, error envelope); `$ref`s resolve.
- Protected endpoints declare `security: [{ CookieAuth: [] }, { BearerAuth: [] }]`.
- Match actual status codes (do not repeat the existing create=200 drift).
- Validate JSON parses after editing.

## R9. Language behavior

All endpoints receive `req.lang ∈ {fa,en}` from `languageFilterMiddleware`; messages must be
translated; do not add alternate locale mechanisms (e.g., Accept-Language handling) without approval.
