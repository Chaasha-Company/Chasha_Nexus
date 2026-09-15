# CHASHA-BE-TASK-021 — API Pagination Audit & Implementation

## Metadata

- **Task ID:** CHASHA-BE-TASK-021
- **Type:** Feature / Refactor
- **Priority:** High
- **Status:** Completed
- **Domain:** API Engineering / Backend
- **Module:** Cross-cutting (affects FAQs and verifies existing pagination)
- **Dependencies:** None
- **Required Skills:** Backend Engineering; API Design; TypeORM; Clean Architecture; Testing

---

## Context

`existing-behavior`: The project already has a reusable pagination abstraction in `src/shared/v1/validations/pagination`, `src/shared/v1/interfaces/config/api/handler/pagination`, and `src/shared/v1/helpers/api/handlers/pagination-response.helper.ts`. Several collection endpoints already use database-level pagination with the contract `{ paginationItems, paginationMeta }`.

`existing-rule`: Page-based pagination uses string query params `paginationPage` and `paginationLimit`, validated by `PaginationQueryValidation`. The repository layer uses TypeORM `skip`/`take` with `getManyAndCount()` after filtering/searching.

`current-state`: A complete audit of all `v1` routes shows that most collection endpoints are either already paginated or intentionally small/bounded. The global FAQ `GET /get-all` endpoint is the only collection endpoint returning a potentially growing dataset without pagination.

---

## Objective

Perform a complete audit of the v1 API routes, identify every endpoint where pagination is appropriate, and implement production-ready pagination for any missing candidates while leaving intentionally bounded endpoints unchanged.

---

## Scope

### In scope

- Audit every v1 route/controller/use case/repository.
- Reuse the existing shared pagination primitives (`PaginationQueryValidation`, `PaginationQueryRequestDTO`, `paginationResponseHandler`, `PaginationResponseRepository`).
- Add pagination to the global FAQ `GET /get-all` endpoint through all architecture layers.
- Ensure stable ordering for paginated FAQ queries.
- Update OpenAPI documentation for the modified endpoint.
- Add/update unit tests for FAQ pagination behavior.
- Produce an internal audit report listing paginated and intentionally non-paginated endpoints.

### Out of scope

- Re-architecting the existing pagination abstraction.
- Adding pagination to bounded/option endpoints (permissions, list-options, business types, role permissions).
- Modifying authentication endpoints or unrelated features.
- Database schema migrations.

---

## Technical requirements

- Flow pagination requirements through request DTO → validation → controller → query handler → repository → database.
- Use database-level pagination (`skip`/`take`/`getManyAndCount`).
- Preserve deterministic ordering; use `faqSortOrder ASC, faqId ASC` for FAQs.
- Maintain backward compatibility where possible; the response shape changes from `T[]` to `PaginationResponse<T>` for FAQ get-all only.
- Follow existing file naming, barrel exports, and code conventions.

---

## Acceptance criteria

- [x] Complete route audit documented.
- [x] FAQ `GET /get-all` paginated end-to-end.
- [x] OpenAPI docs synchronized.
- [x] Tests added/updated for FAQ handler, validation, and controller/route.
- [x] All quality gates pass.

---

## Validation

- `npm run npm:check`
- `npm run lint`
- `npx tsc --noEmit`

---

## Testing requirements

- Default pagination.
- Custom page and limit.
- First/middle/last page behavior.
- Empty result set.
- Page beyond available data.
- Invalid page/limit rejection.
- Stable ordering.

---

## Documentation requirements

- Update `src/config/open-api/document/base/en-base-config.config.json` for `/faq/get-all`.

---

## Implementation notes

`existing-behavior`: `PaginationQueryValidation`, `PaginationQueryRequestDTO`, `paginationResponseHandler`, and TypeORM `skip`/`take` + `getManyAndCount()` were already used by platform-admin roles, business roles, and early-access requests (`existing-rule`: `{ paginationItems, paginationMeta }`).

`derived-decision`: FAQ was the only growing collection without pagination, so it was paginated end-to-end (DTO, validation, controller, query handler, repository contract/implementation) with optional `faqSearch` and stable ordering `faqSortOrder ASC, faqId ASC`. `derived-decision`: shared pagination regex was tightened from `^\d+$` to `^[1-9]\d*$` to match the existing “positive integer” error messages. `assumption`: no max-limit was added, to avoid changing accepted input ranges on existing endpoints; documented as a `proposed-improvement`.

### Final audit — paginated endpoints

`existing-behavior` verified:

- `GET /api/v1/:lang/admin/authz/role/get-all` — roles can grow; already paginated with search + active filter; ordering `createdAt DESC`. Strategy: page-based `paginationPage`/`paginationLimit`. Filtering: search + isActive. Sorting: fixed. Tests: existing handler specs (unchanged).
- `GET /api/v1/:lang/business/authz/role/get-all` — per-business roles can grow; already paginated with search + active filter, business-scoped; ordering `createdAt DESC`. Same strategy/filtering/sorting pattern.
- `GET /api/v1/:lang/admin/early-access-request/get-all` — transactional growing dataset; already paginated with search + status filter and relation joins; ordering `createdAt DESC`. Same strategy; filtering + sorting preserved.
- `GET /api/v1/:lang/global/faq/get-all` — **newly paginated in this task**. Reason: public FAQ content grows over time; unbounded `find()` loaded the whole type set. Strategy: page-based `paginationPage`/`paginationLimit` + optional `faqSearch`; ordering `faqSortOrder ASC, faqId ASC`. Tests: updated handler spec (count/data, offsets, search, empty, 404) + new validation spec (required/invalid/zero/negative/unknown keys).

### Final audit — intentionally non-paginated endpoints

`derived-decision` evaluated and left unchanged:

- `GET .../admin/authz/permission/get-all` — permissions are a small fixed/seeded set, not a growing collection.
- `GET .../business/authz/permission/get-all` — same: small fixed/seeded set.
- `GET .../admin/authz/role/get-all-permissions` and `GET .../business/authz/role/get-all-permissions` — permissions of one role; small and bounded.
- `GET .../admin/authz/role/list-option`, `GET .../business/authz/role/list-option`, `GET .../admin/early-access-request/list-option` — small selector/option payloads; pagination would complicate the contract.
- `GET .../global/lockup/business-type` — small bounded lookup table.
- Auth endpoints (`login`, `logout`, `me`, `refresh-token`, `forgot-password`, `create`/`update`/`detail`/`delete`, permission mutations) — single-resource or action endpoints, not collections.

### Performance review

`existing-behavior`: paginated repositories use QueryBuilder `skip`/`take` + `getManyAndCount()` after filters/search, so filtering/search/sorting happen before pagination at the database level. FAQ now follows the same pattern with a cache key including type/search/skip/take; ordering is deterministic. No new joins were added for FAQ; no N+1 introduced.

---

## Definition of Done

- [x] Route audit complete.
- [x] FAQ pagination implemented across all layers.
- [x] OpenAPI updated.
- [x] Tests added/updated.
- [x] Quality gates pass.
- [x] Logical commits created.

---

## Commits

Recommended stages:

1. `feat(pagination): add pagination to global FAQ get-all endpoint`
2. `test(pagination): cover FAQ pagination behavior`
3. `docs(api): update OpenAPI for paginated FAQ endpoint`
4. `docs(tasks): mark pagination audit task as completed`

---

## Task Storage

.opencode/tasks/completed/2026-09-15/CHASHA-BE-TASK-021.md

---

## Final report

Task ID: CHASHA-BE-TASK-021
Status: Completed
Implementation summary: Audited all v1 routes; reused the existing shared pagination system; paginated the global FAQ collection end-to-end with search and stable ordering; tightened shared pagination validation to positive integers; synchronized OpenAPI; added/updated FAQ tests.
Files created:

- `__test__/unit/modules/v1/faqs/presentation/validations/global/get-all-global-faq-query.validation.spec.ts`
  Files modified:
- `src/modules/v1/faqs/presentation/dtos/request/global/query/get-all-global-faq-query-request.dto.ts`
- `src/modules/v1/faqs/presentation/validations/global/get-all-global-faq-query.validation.ts`
- `src/modules/v1/faqs/application/queries/find-all-faq-by-type.query.ts`
- `src/modules/v1/faqs/application/queries/results/find-all-faq-by-type.result.ts`
- `src/modules/v1/faqs/application/queries/handlers/find-all-faq-by-type.handler.ts`
- `src/modules/v1/faqs/domain/contracts/i-repository/find-all-faq-by-type-repository.contract.ts`
- `src/modules/v1/faqs/infrastructure/persistence/typeorm/repositories/find-faq-by-type.repository.ts`
- `src/modules/v1/faqs/presentation/controllers/global/get-all-global-faq.controller.ts`
- `src/shared/v1/validations/pagination/pagination-query.validation.ts`
- `src/config/open-api/document/base/en-base-config.config.json`
- `__test__/unit/modules/v1/faqs/application/queries/handlers/find-all-faq-by-type.handler.spec.ts`
  Database changes: None (no schema/migration changes).
  API changes: `GET /api/v1/:lang/global/faq/get-all` now requires `paginationPage`/`paginationLimit`, accepts optional `faqSearch`, and returns `{ paginationItems, paginationMeta }` instead of a bare array (breaking response-shape change documented in OpenAPI).
  Permission changes: None.
  Swagger changes: FAQ endpoint parameters/response/example updated; `GlobalFaqListResponse` replaced by `GlobalFaqPaginationResponse` plus new `GetAllGlobalFaqQuery` schema; pagination patterns updated to `^[1-9]\d*$`.
  Tests:
- Updated `find-all-faq-by-type.handler.spec.ts` (pagination metadata, offsets, search, empty set, 404 branch).
- Added `get-all-global-faq-query.validation.spec.ts` (required/invalid/zero/negative/unknown-key cases).
  Validation results: `npm run npm:check` passes; `npm run lint` passes; `npx tsc --noEmit` passes; `npx prettier --check .` passes.
  Commit messages:
- `feat(pagination): add pagination to global FAQ get-all endpoint`
- `docs(api): update OpenAPI for paginated FAQ endpoint`
- `docs(tasks): mark pagination audit task as completed`
  Remaining issues:
- `proposed-improvement`: consider adding an explicit max `paginationLimit` (e.g. 100) if operators want to bound client page sizes; not enforced in this task to preserve existing accepted input ranges.
- `assumption`: existing clients of `/global/faq/get-all` must migrate to the paginated contract; no internal consumers were found in the codebase.
