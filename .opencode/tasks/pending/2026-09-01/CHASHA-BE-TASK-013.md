# CHASHA-BE-TASK-013 — Apply or Remove `requestIdMiddleware`

## Metadata

- **Task ID:** CHASHA-BE-TASK-013
- **Type:** Refactor
- **Priority:** Medium
- **Domain:** Infrastructure
- **Module:** Backend / Middleware
- **Status:** Planned
- **Dependencies:** None

---

## Context

`existing-behavior`: `requestIdMiddleware` is fully implemented at `src/shared/v1/middlewares/global/request-id.middleware.ts`. It reads the `x-request-id` header, generates a unique ID via `createUniqueRequestIdHelper('Mehkam')` when absent, stores it on `req.request_id`, and echoes it back as the `X-Request-ID` response header.

`existing-behavior`: `app.ts` (`createChashaApplication`) applies `helmet`, `cors`, `cookieParser`, `express.json`, `hpp`, `rateLimitConfig`, and `monitoringMiddleware`, but **does not** call `app.use(requestIdMiddleware)`. The middleware is therefore defined but never mounted.

`existing-rule`: `.opencode/context/engineering-context.md` lists "Apply `requestIdMiddleware` in `app.ts` or remove it" as a suggested backlog seed.

---

## Objective

Decide and implement one consistent behavior: either mount `requestIdMiddleware` globally in `app.ts` (so every request carries a stable `x-request-id`/`X-Request-ID`), or remove the dead middleware. Mounting is the recommended default because OpenAPI responses document an `x-request-id` header.

---

## Scope

In scope:

- Mount `requestIdMiddleware` in `app.ts` (recommended), or delete the middleware file + its barrel export if it is intentionally unused.

Out of scope:

- Changing how the OpenAPI spec documents `x-request-id`.
- Any behavior change to other middleware.

---

## Technical Requirements

- If mounted: `app.use(requestIdMiddleware)` placed before the v1 router so downstream handlers can read `req.request_id`.
- If removed: delete `request-id.middleware.ts` and its export in `src/shared/v1/middlewares/global` barrel (and any other referencing barrel).
- `npx tsc --noEmit`, `npm run lint`, `npx prettier --check .` remain green.

---

## Acceptance Criteria

- [ ] A decision is recorded in the task (mount vs remove) with rationale.
- [ ] If mounted: every response includes a stable `X-Request-ID` header, and `req.request_id` is populated for all handlers.
- [ ] If removed: no dangling export or import of `requestIdMiddleware` remains.
- [ ] All quality gates pass.

---

## Validation

- `curl -i localhost:<port>/...` shows an `X-Request-ID` header (if mounted), or grep confirms no dangling references (if removed).
- `npx tsc --noEmit`, `npm run lint`, `npx prettier --check .`.

---

## Testing Requirements

- If mounted: a supertest check asserting `X-Request-ID` is present and identical across a round-trip using a client-supplied `x-request-id`.
- Existing suite remains green.

---

## Documentation Requirements

- Swagger/OpenAPI: not applicable (already documents `x-request-id`).
- Permission seeds: not applicable.
- `.opencode/context` updates: remove this item from suggested backlog seeds when done.

---

## Implementation notes

(empty until planning)

---

## Final report

(empty until completion)

---

## Commit

Recommended: `feat(middleware): apply request id middleware globally` (or `refactor(middleware): remove unused request id middleware`)

---

## Task Storage

.opencode/tasks/pending/2026-09-01/CHASHA-BE-TASK-013.md
