# CHASHA-BE-TASK-021 — API Pagination Audit & Implementation

## Metadata

- **Task ID:** CHASHA-BE-TASK-021
- **Type:** Feature / Refactor
- **Priority:** High
- **Status:** In Progress
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

- [ ] Complete route audit documented.
- [ ] FAQ `GET /get-all` paginated end-to-end.
- [ ] OpenAPI docs synchronized.
- [ ] Tests added/updated for FAQ handler, validation, and controller/route.
- [ ] All quality gates pass.

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

(empty until planning)

---

## Definition of Done

- [ ] Route audit complete.
- [ ] FAQ pagination implemented across all layers.
- [ ] OpenAPI updated.
- [ ] Tests added/updated.
- [ ] Quality gates pass.
- [ ] Logical commits created.

---

## Commits

Recommended stages:

1. `feat(pagination): add pagination to global FAQ get-all endpoint`
2. `test(pagination): cover FAQ pagination behavior`
3. `docs(api): update OpenAPI for paginated FAQ endpoint`
4. `docs(tasks): mark pagination audit task as completed`

---

## Task Storage

.opencode/tasks/pending/2026-09-15/CHASHA-BE-TASK-021.md

---

## Final report

(empty until completion)
