# CHASHA-BE-TASK-023 — Complete FAQ Admin CRUD (Requested as Task 21)

## Metadata

- **Task ID:** CHASHA-BE-TASK-023
- **Type:** Feature
- **Priority:** High
- **Status:** Completed
- **Domain:** API Engineering / Backend
- **Module:** FAQs — Platform Admin
- **Date:** 2026/09/15
- **Dependencies:** None
- **Required Skills:** Backend Engineering; API Design; TypeORM; Clean Architecture; Testing

---

## Context

`existing-behavior`: The `faqs` module (`src/modules/v1/faqs/`) currently exposes only the Global flow: `GET /api/v1/:lang/global/faq/get-all` (`find-all-faq-by-type` query/handler/repository + `find-faq-type-by-slug`), paginated in CHASHA-BE-TASK-021. No Admin CRUD exists.

`existing-behavior`: CHASHA-BE-TASK-021 (pagination audit) and CHASHA-BE-TASK-022 (Mehkam attribution) occupy IDs 021–022; this task is the next globally sequential ID. The requester's "Task 21" label refers to their own tracking; it does not duplicate CHASHA-BE-TASK-021.

`existing-rule`: Admin flows follow the Early Access Request / Platform Admin Role pattern — `presentation → application → domain contracts → infrastructure/TypeORM`, POST-based detail/delete with body `id`, `PATCH /patch|/update` with at-least-one-field validation, TypeORM `softDelete`, `invalidateCache`, permission-guard per route, permission-resource migration + seed.

---

## Objective

Implement the full Platform Admin FAQ CRUD and list-option surface while preserving existing Global FAQ behavior without regression:

```text
GET   /admin/faq/get-all
GET   /admin/faq/list-option
POST  /admin/faq/detail
POST  /admin/faq/create
POST  /admin/faq/delete
PATCH /admin/faq/patch
```

---

## Scope

### In scope

- Admin presentation: request/response DTOs, zod validations, controllers, `admin-faq.route.ts`, registration in `admin.route.ts` (`/faq` + `requirePlatformAdminAuthMiddleware`).
- Application: `find-all-admin-faq`, `find-admin-faq-by-id`, `get-list-option-admin-faq` queries; `create/update/delete-admin-faq` commands; handlers with no-op update protection and soft delete.
- Domain contracts + TypeORM repositories (incl. `find-faq-by-id`, `find-faq-by-slug`, `find-faq-type-by-id`).
- Authorization: 7 `faq_*` permission resources (page/get-all/list-options/detail/create/delete/update), permission migration + `src/index.ts` export, permission seed entries.
- Messages: `FAQ_*` validation keys in shared enum + fa/en i18n entries.
- Unit tests for new validations/handlers; route-registration coverage.

### Out of scope

- Changing Global FAQ behavior or response shape.
- OpenAPI JSON edits (admin endpoints are not documented there — verified: no `early-access-request` admin paths present).
- Unrelated route renames (the route-naming rule is adopted for new FAQ routes only).

---

## Technical requirements

- Paginated `get-all` reusing `PaginationQueryValidation` + `paginationResponseHandler`; search across `faqQuestionFa/En`, `faqAnswerFa/En`, `faqSlug`; optional `faqTypeId` filter; ordering `faqSortOrder ASC, faqId ASC`; never expose `deletedAt` (FAQ or `faqType` relation).
- `list-option` response mirrors the early-access shape (`faqSearch` fields + `faqFilters.faqType`).
- Create: required `faqTypeId, faqQuestionFa, faqAnswerFa, faqSlug, faqSortOrder`; optional `faqQuestionEn/En`; verify FAQ Type exists; 409 on duplicate slug; invalidate `faqs` cache.
- Update: all fields optional + at-least-one refine; explicit per-field comparison against persisted row — no UPDATE query when nothing changed; validate new `faqTypeId` when changed.
- Delete: `softDelete` only; 404 when missing.
- Route operation suffixes: `get-all`, `list-option`, `detail`, `create`, `delete`, `patch`.

---

## Acceptance criteria

- [ ] All six routes registered under `/api/v1/:lang/admin/faq/*` with Platform Admin auth + per-route permission guard.
- [ ] Paginated get-all with search/filter, no `deletedAt` leakage.
- [ ] List-option search fields + `faqTypeId` filter work.
- [ ] Detail/create/delete behave per spec; create validates FAQ Type + slug uniqueness.
- [ ] No-op update executes no UPDATE query; changed update persists.
- [ ] Soft delete only; deleted rows excluded from lists/details per TypeORM convention.
- [ ] Global FAQ regression-free.
- [ ] `tsc`, `eslint`, `prettier`, `jest` green.

---

## Validation

- `npm run npm:check:types`
- `npm run lint`
- `npx prettier --check` on touched files
- `npx jest __test__/unit/modules/v1/faqs`

---

## Implementation notes

`existing-behavior`: reused Early Access Request admin + Platform Admin Role patterns verbatim (POST detail/delete with body id, `PATCH /patch` per task spec, `AtLeastOne` + zod refine for at-least-one-field, TypeORM `softDelete`, `invalidateCache(['faqs'])`, per-route `permissionGuardPlatformAdminMiddleware`, permission migration + seed). `derived-decision`: guard module key is `platform-admin-faq` (authorization pattern, prefixed); update handler compares each supplied field against the persisted row and returns early with no repository call when nothing changed; optional English fields default to `''` on create (columns are non-nullable, schema untouched); `PUT /permissions` → `/replace-permissions` renames from the route-convention cleanup (`d1aaa39`) were respected — new FAQ routes use operation suffixes throughout. `assumption`: no max `paginationLimit` (consistent with existing endpoints).

---

## Final report

Task ID: CHASHA-BE-TASK-023
Status: Completed
Implementation summary: Full Platform Admin FAQ CRUD + list-option across presentation/application/domain/infrastructure with 7 `faq_*` permission resources, migration, seeds, and 11 new test specs. Global FAQ untouched and green.
Files created: 60+ (admin queries/commands/handlers/results, contracts, repos, DTOs, validations, controllers, admin route, migration, 11 specs — see commits).
Files modified: `AGENTS.md` untouched; `admin.route.ts`, permission seed, `src/index.ts`, shared `ValidationMessage` enum + i18n, `PermissionResourceEnum`, FAQ barrels.
Database changes: `1787614209563-Add_Permission_Resource_Faq_System` (permission enum only, additive up / restorative down). No schema changes.
API changes: `GET /api/v1/:lang/admin/faq/get-all`, `GET .../list-option`, `POST .../detail`, `POST .../create`, `POST .../delete`, `PATCH .../patch` (Platform Admin auth + guard).
Permission changes: `faq_page/get_all/list_options/detail/create/delete/update` resources, module `platform-admin-faq`, seeded for super_admin via grant-all seed.
Swagger changes: None (admin endpoints are not in the OpenAPI doc — verified).
Tests: 11 new specs; full suite 38 suites / 155 tests pass.
Validation results: `tsc --noEmit` ✅, `eslint --max-warnings=0` ✅ (src + new specs), `prettier --check` ✅, `jest` ✅.
Commit messages:

- `feat(faq): add admin faq queries and repositories`
- `feat(faq): add admin faq routes and controllers`
- `feat(faq): add admin faq routes and permissions`
- `test(faq): verify admin faq crud`
  Remaining issues:
- `proposed-improvement`: consider explicit max `paginationLimit`.
- Pre-existing (out of scope): `platform_admin_authz_role_update_permission` (+business twin) exists in enum/seeds but was never added to the DB enum by any migration; untouched.

---

## Task Storage

.opencode/tasks/pending/2026-09-15/CHASHA-BE-TASK-023.md

---

## Final report

- To be filled on completion (per `.opencode/AGENTS.md` mandatory format).
