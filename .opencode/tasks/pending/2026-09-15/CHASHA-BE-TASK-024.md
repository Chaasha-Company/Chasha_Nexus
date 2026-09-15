# CHASHA-BE-TASK-024 — Complete FAQ Type Admin CRUD (Requested as Task 22)

## Metadata

- **Task ID:** CHASHA-BE-TASK-024
- **Type:** Feature
- **Priority:** High
- **Status:** In Progress
- **Domain:** API Engineering / Backend
- **Module:** FAQs / FAQ Types — Platform Admin
- **Date:** 2026/09/15
- **Dependencies:** None
- **Required Skills:** Backend Engineering; API Design; TypeORM; Clean Architecture; Testing

---

## Context

`existing-behavior`: CHASHA-BE-TASK-023 delivered FAQ Admin CRUD (`/admin/faq/*`) reusing Early Access Request / Platform Admin Role patterns. FAQ Types currently have no admin surface; only `find-faq-type-by-slug` (global flow) and `findAllAdminFaqTypeRepository` (unfiltered helper for FAQ list-option filters) exist.

`existing-behavior`: CHASHA-BE-TASK-021 (pagination), 022 (attribution), 023 (FAQ Admin CRUD) occupy IDs 021–023; this task is the next globally sequential ID. The requester's "Task 22" label refers to their own tracking and does not duplicate any existing task.

`existing-rule`: Admin flows are `presentation → application → domain contracts → infrastructure/TypeORM`, POST-based detail/delete with body id, `PATCH /patch` with at-least-one-field validation, TypeORM `softDelete`, `invalidateCache`, per-route permission guard, permission-resource migration + seed. Operation routes carry explicit operation suffixes (`d1aaa39`).

---

## Objective

Implement the full Platform Admin FAQ Type CRUD and list-option surface while preserving existing FAQ and Global FAQ behavior without regression:

```text
GET   /admin/faq-type/list-option
GET   /admin/faq-type/get-all
POST  /admin/faq-type/detail
POST  /admin/faq-type/create
PATCH /admin/faq-type/patch
POST  /admin/faq-type/delete
```

---

## Scope

### In scope

- Admin presentation: request/response DTOs, zod validations, controllers, `admin-faq-type.route.ts` (`adminFaqTypeRouter`), registration in `admin.route.ts` (`/faq-type` + `requirePlatformAdminAuthMiddleware`).
- Application: `find-all-admin-faq-type`, `find-admin-faq-type-by-id`, `get-list-option-admin-faq-type` queries; `create/update/delete-admin-faq-type` commands; handlers with no-op update protection and soft delete.
- Domain contracts + TypeORM repositories (paginated search get-all, by-id, by-slug, create, update, soft-delete).
- Authorization: 7 `faq_type_*` permission resources (page/get-all/list-options/detail/create/delete/update), permission migration + `src/index.ts` export, permission seed entries (module `platform-admin-faq-type`).
- Messages: `FAQ_TYPE_*` validation keys in shared enum + fa/en i18n entries.
- Unit tests for new validations/handlers/routes; Global FAQ + FAQ admin regression via full suite.

### Out of scope

- Standalone changes to FAQ (`/admin/faq/*`) or Global FAQ behavior.
- OpenAPI JSON edits (admin endpoints are not documented there — verified in TASK-023).
- Unrelated route renames; parent `/admin` grouping untouched.

---

## Technical requirements

- Paginated `get-all` reusing `PaginationQueryValidation` + `paginationResponseHandler`; search across `faqTypeNameFa/En`, `faqTypeSlug`, `faqTypeDescriptionFa/En`; ordering `faqTypeSortOrder ASC, faqTypeId ASC`; never expose `deletedAt`.
- `list-option` exposes the five searchable fields per the early-access shape (static field metadata; no filter dimension exists for types).
- Detail/delete accept numeric `faqTypeId` in the POST body (spec shorthand `id` mapped to the codebase's explicit `faqTypeId` convention, as in TASK-023's `faqId`).
- Create: required `faqTypeNameFa`, `faqTypeSlug`, `faqTypeDescriptionFa`; optional `faqTypeNameEn`, `faqTypeDescriptionEn` (defaulted to `''` — columns are non-nullable, schema untouched); 409 on duplicate slug; invalidate `faq-types` cache.
- Update: all five fields optional + at-least-one refine; explicit per-field comparison — no UPDATE query when nothing changed; 409 on slug collision.
- Delete: `softDelete` only; 404 when missing.

---

## Acceptance criteria

- [ ] All six routes registered under `/api/v1/:lang/admin/faq-type/*` with Platform Admin auth + per-route permission guard.
- [ ] Paginated get-all with five-field search, no `deletedAt` leakage.
- [ ] List-option exposes all five searchable fields.
- [ ] Detail/create/delete behave per spec.
- [ ] No-op update executes no UPDATE query; changed update persists.
- [ ] Soft delete only; deleted rows excluded per TypeORM convention.
- [ ] FAQ + Global FAQ regression-free.
- [ ] `tsc`, `eslint`, `prettier`, `jest` green.

---

## Validation

- `npm run npm:check:types`
- `npm run lint`
- `npx prettier --check` on touched files
- `npx jest __test__/unit/modules/v1/faqs`

---

## Implementation notes

- To be filled during execution.

---

## Task Storage

.opencode/tasks/pending/2026-09-15/CHASHA-BE-TASK-024.md

---

## Final report

- To be filled on completion (per `.opencode/AGENTS.md` mandatory format).
