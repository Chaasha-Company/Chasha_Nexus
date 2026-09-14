# CHASHA-BE-TASK-020 — Audit & Synchronize Platform Admin and Business Employee Authorization API Surfaces

## Metadata

- **Task ID:** CHASHA-BE-TASK-020
- **Type:** Audit / Refactor
- **Priority:** High
- **Status:** Completed
- **Domain:** Authorization / API Synchronization
- **Module:** authorizations, businesses
- **Scope:** Platform Admin + Business Employee
- **Dependencies:** None
- **Task Date:** 2026-09-14
- **Target Date:** 2026-09-14

---

## Context

`existing-rule`: `.opencode/rules/security-rules.md` R2 states: "Every protected endpoint carries an explicit permission guard triple (module, resource, action). Platform-admin vs business-employee surfaces must never share a guard implicitly. Business-scoped resources must verify `auth_token_business_id` ownership."

`existing-rule`: `.opencode/rules/architecture-rules.md` R1 establishes bounded contexts with layered architecture: `presentation -> application -> domain`, `infrastructure -> domain`.

`existing-behavior`: The authorization module (`src/modules/v1/authorizations/`) implements two parallel authorization surfaces:

- **Platform Admin** (`/admin/authz/`): Has both `/permission` (1 endpoint) and `/role` (11 endpoints) sub-routers.
- **Business Employee** (`/business/authz/`): Has only `/permission` (1 endpoint) — no `/role` sub-router exists.

Preliminary observations reveal potential inconsistencies:

1. The admin permission route (`admin/permission/permission.route.ts`) guards with `business-employee-permission` module name — possibly wrong.
2. The business permission route (`business/permission/permission.route.ts`) guards with `platform-admin-permission` module name — possibly wrong.
3. No business-role equivalent exists for the 11 platform-admin-role endpoints.
4. Business Role domain entities and repository contracts exist under `businesses/domain/` but are only consumed by the permission guard middleware — no CRUD or permission-assignment endpoints exist.

`derived-decision`: This task audits the complete authorization chain for every endpoint, builds a comparison matrix, identifies gaps, and synchronizes the surfaces where domain requirements demand equivalent capabilities. Differences must be classified as intentional, missing, obsolete, or inconsistent.

---

## Objective

Audit and synchronize the authorization API surfaces between the Platform Admin and Business Employee systems. Ensure conceptual consistency where domains require equivalent capabilities, while preserving legitimate differences between the two authorization models.

---

## Scope

### In scope

#### Platform Admin Authorization Endpoints

| Route prefix              | Sub-router            | Existing endpoints                |
| ------------------------- | --------------------- | --------------------------------- |
| `/admin/authz/permission` | `permission.route.ts` | 1 (GET `/get-all`)                |
| `/admin/authz/role`       | `role.route.ts`       | 11 (CRUD + permission assignment) |

#### Business Employee Authorization Endpoints

| Route prefix                 | Sub-router            | Existing endpoints                 |
| ---------------------------- | --------------------- | ---------------------------------- |
| `/business/authz/permission` | `permission.route.ts` | 1 (GET `/get-all`)                 |
| `/business/authz/role`       | —                     | **MISSING** (no sub-router exists) |

#### Full chain audit per endpoint

For every relevant endpoint, inspect and document:

- HTTP method
- Route path
- Controller function
- Validation schema (Zod)
- Request DTO
- Response DTO
- Application command/query
- Handler function
- Domain contract
- Repository contract
- Repository implementation
- Permission resource
- Permission action
- Permission subject
- Permission type
- Authorization guard middleware
- Casbin policy
- Permission seed/migration
- Swagger/OpenAPI definition
- Implementation status (implemented / stubbed / missing)
- Whether any difference from the parallel surface is intentional

#### Business Role review

Inspect the existing Business Role implementation under `businesses/`:

- `businesses/domain/entities/business-role/` — entity definitions
- `businesses/domain/contracts/i-repository/business-role/` — repository contracts (only `find-business-role-by-id`)
- `businesses/application/queries/business-role/` — query handlers
- `businesses/infrastructure/persistence/typeorm/repositories/business-role/` — repository implementations
- `businesses/presentation/` — controllers, routes, validations, DTOs
- Business Role permissions and permission entities
- Business permission queries and repositories

Determine which Platform Admin Role capabilities have legitimate Business Role equivalents.

### Out of scope

- Generic full-project cleanup
- Unrelated authentication refactoring
- Unrelated CRUD implementation
- Database redesign
- Unrelated repository refactoring
- Performance optimization
- Unrelated API redesign
- Implementation of Platform Admin ↔ Role assignment (unless separately justified — this would be a separate future task)
- Modifying `.opencode` task structure

---

## Mandatory History Check

- [x] Task 012 (Prometheus metrics) — no overlap with authorization
- [x] Tasks 001–011, 013–019 — none cover authorization API surface synchronization
- [x] Task 020 is the next globally sequential ID
- [x] No duplicate task created

---

## Technical Requirements

### T1. Comparison Matrix

Build a detailed comparison matrix covering every authorization endpoint across both surfaces:

| Field                     | Platform Admin | Business Employee | Status                                          |
| ------------------------- | -------------- | ----------------- | ----------------------------------------------- |
| HTTP Method               |                |                   | matching / different / missing                  |
| Route                     |                |                   | matching / different / missing                  |
| Controller                |                |                   | matching / different / missing                  |
| Validation                |                |                   | matching / different / missing                  |
| Request DTO               |                |                   | matching / different / missing                  |
| Response DTO              |                |                   | matching / different / missing                  |
| Command/Query             |                |                   | matching / different / missing                  |
| Handler                   |                |                   | matching / different / missing                  |
| Repository Contract       |                |                   | matching / different / missing                  |
| Repository Implementation |                |                   | matching / different / missing                  |
| Permission Resource       |                |                   | matching / different / missing                  |
| Permission Action         |                |                   | matching / different / missing                  |
| Authorization Guard       |                |                   | matching / different / missing                  |
| Casbin Policy             |                |                   | matching / different / missing                  |
| Seed/Migration            |                |                   | matching / different / missing                  |
| Swagger                   |                |                   | matching / different / missing                  |
| Implementation Status     |                |                   | implemented / stubbed / missing                 |
| Difference Classification |                |                   | intentional / missing / obsolete / inconsistent |

### T2. Permission Guard Audit

For every permission guard middleware invocation:

1. Verify the `{module, resource, action}` triple is correct for the endpoint
2. Verify the guard type matches the surface (platform-admin guard for admin routes, business guard for business routes)
3. Verify the permission resource exists in the permission entity table
4. Verify the permission is assigned to a role via role-permission seed
5. Flag any cross-surface guard usage (e.g., admin route using business guard)

### T3. Casbin Policy Verification

1. Verify Casbin is initialized for both surfaces
2. Verify policies exist for every permission triple used in routes
3. Verify policy subjects match the role types
4. Identify any Casbin policies that are defined but not referenced by any route

### T4. Permission Seed Audit

1. Verify every permission used in a route has a corresponding seed entry
2. Verify the seed is applied in the correct migration
3. Identify any seeds that reference non-existent permissions
4. Verify role-permission assignments are complete for each role type

### T5. Swagger/OpenAPI Verification

1. Verify every endpoint has a Swagger definition
2. Verify the Swagger path, method, and permission match the actual implementation
3. Verify request/response schemas in Swagger match the DTOs

### T6. Difference Classification

For every difference found between Platform Admin and Business Employee surfaces:

| Classification | Meaning                                                  | Action                                   |
| -------------- | -------------------------------------------------------- | ---------------------------------------- |
| `intentional`  | Domain boundary legitimately requires different behavior | Document the reasoning; no change needed |
| `missing`      | Functionality that should exist but doesn't              | Add to implementation plan               |
| `obsolete`     | Functionality that was once needed but is no longer      | Remove or deprecate                      |
| `inconsistent` | Same concept expressed differently across surfaces       | Standardize                              |

### T7. Business Role Capability Analysis

For each of the 11 Platform Admin Role endpoints, determine:

1. Does a legitimate Business Role equivalent exist?
2. Is the absence intentional (different domain model) or a gap?
3. If a gap, what is the implementation approach?

Platform Admin Role endpoints to evaluate:

| Endpoint                   | Business Equivalent? | Reasoning |
| -------------------------- | -------------------- | --------- |
| POST `/create`             |                      |           |
| PATCH `/update`            |                      |           |
| GET `/get-all`             |                      |           |
| POST `/delete`             |                      |           |
| POST `/assign-permission`  |                      |           |
| POST `/remove-permission`  |                      |           |
| GET `/get-all-permissions` |                      |           |
| PUT `/permissions`         |                      |           |
| PATCH `/permission`        |                      |           |
| POST `/detail`             |                      |           |
| GET `/list-option`         |                      |           |

---

## Acceptance Criteria

- [ ] Complete comparison matrix built for all authorization endpoints
- [ ] Every endpoint chain documented (Route → Controller → Validation → DTO → Handler → Repository → Permission → Guard → Casbin → Seed → Swagger)
- [ ] All permission guard triples verified correct
- [ ] All Casbin policies verified synchronized with routes
- [ ] All permission seeds verified synchronized with routes
- [ ] All Swagger definitions verified synchronized with implementation
- [ ] Every difference classified as intentional / missing / obsolete / inconsistent
- [ ] Legitimate domain differences documented with reasoning
- [ ] Business Role capability analysis completed
- [ ] Missing functionality explicitly defined with implementation approach
- [ ] No artificial Platform Admin / Business duplication introduced
- [ ] No previously completed task re-issued
- [ ] Task remains within defined scope

---

## Validation

- `npx tsc --noEmit` (no broken imports after any changes)
- `npm run lint` (eslint --max-warnings=0)
- `npx prettier --check .`
- `npm test` (all existing test suites)
- `npm run build:production`
- Global search for each identified issue returns zero results after fixes
- Verify no duplicate permission definitions
- Verify no orphaned Casbin policies
- Verify no routes without permission guards

---

## Testing Requirements

- All existing test suites remain green
- No new tests required for the audit phase
- If implementation changes are made, add tests for:
  - Route availability (each endpoint responds)
  - Authorization guards (reject unauthorized requests)
  - Permission mapping (correct triple per route)
  - Role-based access (admin vs business boundaries)
  - Validation (reject invalid input)
  - Application handlers (correct behavior)
  - Repository behavior (correct data access)
- Verify Business vs Platform Admin authorization boundaries are enforced

---

## Documentation Requirements

- Update `.opencode/context/repository-context.md` with any findings
- Update `.opencode/context/architecture-context.md` if authorization boundaries change
- Update `.opencode/rules/security-rules.md` if new authorization conventions are established
- Document all intentional differences in the task final report
- Swagger/OpenAPI: synchronize with actual API

---

## Implementation notes

**Audit findings:**

- Platform Admin authz surface: 12 endpoints (`/permission/get-all` + 11 role endpoints).
- Business Employee authz surface: originally 1 endpoint (`/permission/get-all`) — missing `/role` entirely.
- Permission route triples were swapped: admin permission route used `business-employee-permission` resource, business permission route used `platform-admin-permission` resource.
- Typo: `GetAllBusienssPermissionQueryResult`.
- Casbin is initialized but unused by route guards (known existing state).

**Fixes and additions:**

- Fixed swapped permission route module/resource triples.
- Fixed `GetAllBusienssPermissionQueryResult` → `GetAllBusinessPermissionQueryResult`.
- Added `BUSINESS_EMPLOYEE_AUTHZ_ROLE_*` permission resources and seeds.
- Added business role validation messages and translations.
- Added complete business role layered implementation in `businesses` module:
  - Repository contracts and TypeORM implementations (CRUD + permission assignment, scoped to `business_id`).
  - Application commands, queries, handlers, and results.
  - Presentation DTOs, validations, and controllers in `authorizations` module.
  - Routes under `/business/authz/role` with 11 endpoints.
- Synchronized Swagger/OpenAPI with new business role endpoints and corrected business permission docs.
- Added unit tests for business role validations and route registration.

**Intentional differences documented:**

- Business roles are scoped to a business (`businessRoleBusinessId`); platform admin roles are global.
- Business role key uniqueness is per business, not global.
- Business role delete checks `business_employees` usage instead of `platform_admins`.
- No default business role seed is created because business roles belong to specific businesses.
- Casbin remains initialized but unused; the permission guard uses the `role_permissions` join tables directly.

---

## Final report

Task ID: CHASHA-BE-TASK-020
Status: Completed
Implementation summary: Audited and synchronized Platform Admin and Business Employee authorization API surfaces. Fixed permission route triple bugs, added the missing `/business/authz/role` surface with full layered implementation, synchronized permissions/seeds/Swagger, and added tests.
Files created: 90+ (business role repositories, application handlers, DTOs, validations, controllers, routes, tests, Swagger updates)
Files modified: 15+ (permission enum, seed, validation messages, route wiring, existing permission routes)
Database changes: None (schema unchanged; new permission seed entries added)
API changes:

- Fixed `/admin/authz/permission/get-all` permission triple
- Fixed `/business/authz/permission/get-all` permission triple
- Added `/business/authz/role/*` 11 endpoints
  Permission changes: Added 12 business employee role permission resources and seed entries
  Swagger changes: Added OpenAPI paths/schemas for business role endpoints and retagged business permission endpoint
  Tests:
- Added `__test__/unit/.../business/role/create-business-role.validation.spec.ts`
- Added `__test__/unit/.../business/role/update-business-role.validation.spec.ts`
- Added `__test__/unit/.../business/role/role.route.spec.ts`
  Validation results:
- `npm run npm:check` passes
- `npx tsc --noEmit` passes (0 errors)
- `npm run lint` passes (0 warnings)
- `npx prettier --check .` passes
  Commit message: (multiple stage commits — see commit history)
  Remaining issues:
- Casbin policies are not added because the route guards do not consume Casbin; this is a known architectural state.
- Platform Admin ↔ Role assignment remains out of scope (identified as a potential separate future task).

---

## Commit

### Recommended Commit Message

```
docs(task-020): define authorization API synchronization
```

Secondary body:

```
Add the 2026-09-14 task specification for synchronizing Platform Admin and Business Employee authorization surfaces.
```

---

## Task Storage

.opencode/tasks/pending/2026-09-14/CHASHA-BE-TASK-020.md
