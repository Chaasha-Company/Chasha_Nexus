# CHASHA-BE-TASK-009 — Replace Platform Admin Role Permissions

## Metadata

- **Task ID:** CHASHA-BE-TASK-009
- **Type:** Feature
- **Priority:** High
- **Status:** Completed
- **Domain:** Authorization
- **Module:** Authorizations

## Objective

Implement the Platform Admin Role Permission Replacement API.

This task introduces a NEW write operation for Platform Admin Role permissions.

TASK-008 already provides the read operation:

GET /{language_prefix}/admin/authz/role/get-all-permissions

TASK-009 must implement the corresponding permission-management operation.

The endpoint must replace the complete permission assignment of an existing Platform Admin Role with the permission set provided by the caller.

This is NOT a permission-listing task and MUST NOT duplicate TASK-008.

---

## Mandatory Pre-Implementation Duplicate Check

Before writing any source code, inspect:

- .opencode/tasks/active/
- existing Platform Admin Role routes
- existing Platform Admin Role controllers
- existing application commands/handlers
- existing repositories
- existing domain contracts
- existing migrations
- permission seeds
- role-permission seeds
- existing tests
- git history

Search specifically for functionality equivalent to:

- assigning permissions to a Platform Admin Role
- replacing role permissions
- synchronizing role permissions
- bulk role-permission update
- updating platform-admin-role-permissions

Also inspect completed TASK-001 through TASK-008.

If equivalent functionality already exists:

1. STOP implementation.
2. Identify the original task.
3. Identify the implementation commit.
4. Report the duplicate.
5. Do NOT create another implementation.

The task is valid only if the functionality below is genuinely missing.

---

# Endpoint

## Method

PUT

## Path

/{language_prefix}/admin/authz/role/permissions

## Authentication

Use the existing:

requirePlatformAdminAuthMiddleware

## Authorization

Protect the endpoint with a dedicated permission for modifying Platform Admin Role permissions.

Expected semantics:

Resource:
platform-admin-role

Action:
UPDATE

Subject/type:
follow the existing Platform Admin Authorization conventions.

Do NOT reuse the READ permission created for TASK-008.

---

# Request Body

The request body must contain:

{
"platformAdminRoleId": "string",
"permissionIds": ["string"]
}

The permissionIds array represents the COMPLETE desired permission set for the role.

Example:

{
"platformAdminRoleId": "role-id",
"permissionIds": [
"permission-id-1",
"permission-id-2",
"permission-id-3"
]
}

An empty permissionIds array is valid.

An empty array means:

Remove all currently assigned permissions from the role.

---

# Business Rules

## 1. Role Existence

The requested Platform Admin Role must exist.

If it does not exist:

- throw the standard Not Found exception
- use the existing response-message architecture
- use the existing i18n mechanism

---

## 2. Permission Existence

Every permission ID supplied by the client must correspond to an existing permission.

If any permission does not exist:

- reject the request
- do not partially update the role
- use the project's standard Not Found/Bad Request semantics according to existing conventions

---

## 3. Complete Replacement Semantics

The request represents the complete desired permission state.

For example:

Current:

[
A,
B,
C
]

Request:

[
B,
C,
D
]

Final state MUST be:

[
B,
C,
D
]

Therefore:

- A is removed
- B remains
- C remains
- D is added

Do NOT only append permissions.

---

## 4. Empty Permission Set

This request:

{
"platformAdminRoleId": "role-id",
"permissionIds": []
}

must result in the role having zero assigned permissions.

---

## 5. Duplicate Permission IDs

Duplicate permission IDs in the request must not create duplicate database records.

Prefer validation-level rejection if that matches existing project conventions.

If the existing project treats duplicates as harmless, normalize them before persistence.

Do not violate database uniqueness constraints.

---

## 6. Atomicity

Permission replacement MUST be atomic.

If any part of the operation fails:

- role-permission assignments must remain unchanged
- no partial synchronization may remain in the database

Use the project's existing transaction infrastructure:

shared/v1/database/transaction

Do not implement ad-hoc transaction handling.

---

## 7. Role Metadata

This endpoint MUST NOT modify:

- role key
- role name
- role description
- role active state
- createdAt
- updatedAt

Its only responsibility is role-permission assignment.

---

## 8. Permission Records

Do not modify permission definitions themselves.

This endpoint only modifies the relationship between:

Platform Admin Role

and

Permission.

---

# Architecture

Follow the existing project architecture:

Presentation
↓
Application
↓
Domain Contract
↓
Infrastructure

Business logic must remain outside controllers and repositories.

The controller must only:

- receive the request
- execute the application command
- return the standard response

The application handler must orchestrate:

1. role lookup
2. permission validation
3. permission reconciliation
4. transaction
5. result creation

The repository must contain persistence-specific operations only.

---

# Domain

Inspect the existing:

platform-admin-role.entity.ts

platform-admin-role-permission.entity.ts

permission.entity.ts

before implementing anything.

Use the existing domain model.

Do not introduce another role-permission entity.

Do not duplicate existing authorization abstractions.

---

# Repository

Create the minimum required repository contracts under the existing Platform Admin Role repository contract structure.

Potential operations include:

- find role by ID
- find permissions by IDs
- find existing role permissions
- remove role permissions
- create role permissions

Only introduce operations that are genuinely missing.

Do NOT create duplicate repositories if an existing repository already supports the required operation.

Repository contracts must remain in the domain layer.

Repository implementations must remain in infrastructure.

---

# Application

Implement a dedicated command for replacing Platform Admin Role permissions.

Follow the naming conventions already used by the Authorization module.

Recommended conceptual name:

replace-platform-admin-role-permissions.command.ts

and corresponding handler.

The handler must:

1. Validate role existence.
2. Validate all requested permission IDs.
3. Start/participate in the existing transaction mechanism.
4. Remove obsolete role-permission relationships.
5. Preserve valid existing relationships.
6. Insert newly requested relationships.
7. Commit atomically.
8. Return the resulting permission assignment.

Do not put database reconciliation logic directly inside the controller.

---

# Reconciliation Algorithm

The implementation should behave as a set reconciliation operation.

Given:

Existing permissions:
A, B, C

Requested permissions:
B, C, D

Calculate:

To Remove:
A

To Keep:
B, C

To Add:
D

Then persist the changes atomically.

Avoid unnecessary delete/reinsert operations when an existing relationship can safely remain unchanged.

The implementation should be idempotent.

Sending the same permission set twice must produce the same final database state without creating duplicates.

---

# Presentation

Create the required:

- controller
- route
- request DTO
- response DTO
- validation
- barrel exports

Follow the existing folder structure under:

src/modules/v1/authorizations/presentation/

Use the existing admin/role naming conventions.

Do not introduce an unrelated new module.

---

# Validation

Use the project's existing Zod validation architecture.

Validate:

- platformAdminRoleId is required
- platformAdminRoleId has the project's expected ID format
- permissionIds is required
- permissionIds must be an array
- each permission ID must follow the project's expected ID format
- duplicate IDs must be handled according to the business rule above

Validation messages MUST use the existing:

ValidationMessages

and translator/i18n architecture.

Do NOT hard-code user-facing messages inside the validation schema.

---

# Response

Follow the project's standard success-response structure.

Return enough information for the caller to understand the resulting assignment.

Recommended result:

{
"roleId": "string",
"permissionIds": ["string"],
"updatedAt": "string"
}

Use the project's existing response conventions and date serialization.

Do not invent a new API response envelope.

---

# Permission Seed

Create a dedicated permission for this endpoint.

Do NOT reuse:

authz.platform-admin-role.get-permissions.read

That permission belongs to TASK-008 and is read-only.

The new permission must represent modification of Platform Admin Role permissions.

Use the existing permission naming convention.

The permission must be added to:

src/shared/v1/database/seeds/categories/system-init/authorizations/permissions/

and must remain synchronized with the route guard.

The permission must also be granted to super_admin through the existing role-permission seed architecture.

---

# Database / Migration

Before creating a migration, inspect the current database schema and migrations.

Do NOT create a migration unless the current schema actually requires one.

The existing:

platform_admin_role_permissions

table must remain compatible.

If a schema change is genuinely required, create a properly named TypeORM migration and export it through the existing migration chain.

---

# Swagger / OpenAPI

Update the existing Swagger document.

Document:

- PUT endpoint
- authentication
- authorization
- request body
- 200 response
- 400 validation error
- 401 unauthenticated
- 403 unauthorized
- 404 not found
- 500 internal error

Reuse existing schemas wherever possible.

Do not duplicate an existing schema unnecessarily.

After modification:

- Swagger JSON must parse
- every $ref must resolve
- documented request/response must match the actual implementation

---

# Tests

Add tests using the project's existing Jest conventions.

## Handler Tests

At minimum:

1. Successfully replaces permissions.
2. Adds newly requested permissions.
3. Removes permissions no longer requested.
4. Preserves permissions that remain assigned.
5. Supports an empty permission array.
6. Rejects a non-existing role.
7. Rejects a non-existing permission.
8. Does not partially modify data when validation fails.
9. Repeating the same request is idempotent.
10. Transaction failure does not leave partial changes.

## Validation Tests

At minimum:

1. Missing platformAdminRoleId.
2. Invalid platformAdminRoleId.
3. Missing permissionIds.
4. Invalid permissionIds.
5. Duplicate permission IDs according to the chosen validation behavior.
6. Empty permissionIds accepted.

## Regression Tests

Verify existing Role Management functionality remains intact:

- create
- get-all
- list-option
- detail
- delete
- get-all-permissions

Do not modify existing tests simply to make them pass.

---

# Quality Gates

Before completion run:

npm ls

npm test

npx tsc --noEmit

npx eslint . --max-warnings=0

npx prettier --check .

Also verify:

1. Swagger JSON parses successfully.
2. All Swagger $refs resolve.
3. Permission seed ↔ route guard synchronization passes.
4. super_admin receives the new permission.
5. Database migration chain remains valid.
6. Transaction behavior is verified.
7. Existing authorization tests remain green.
8. No unrelated source files are modified.
9. No duplicate implementation exists.
10. Working tree contains only intentional changes.

---

# Commit

Only create a commit after all implementation and verification steps pass.

Recommended commit:

feat(authz): add platform admin role permission replacement

Do not create a commit for a duplicate implementation.

---

# Definition of Done

- [ ] Duplicate check completed before implementation
- [ ] Existing TASK-001 through TASK-008 reviewed
- [ ] Existing codebase searched for equivalent functionality
- [ ] New permission-management use case confirmed missing
- [ ] Repository contracts implemented only where required
- [ ] Repository implementations implemented only where required
- [ ] Application command implemented
- [ ] Application handler implemented
- [ ] Transaction implemented using existing infrastructure
- [ ] Permission reconciliation implemented
- [ ] Empty permission set supported
- [ ] Idempotency verified
- [ ] Request DTO implemented
- [ ] Response DTO implemented
- [ ] Validation implemented
- [ ] Controller implemented
- [ ] Route implemented
- [ ] Dedicated permission created
- [ ] Permission synchronized with route guard
- [ ] super_admin permission assignment synchronized
- [ ] Swagger updated
- [ ] Swagger refs validated
- [ ] Handler tests implemented
- [ ] Validation tests implemented
- [ ] Regression tests pass
- [ ] npm ls passes
- [ ] Jest passes
- [ ] TypeScript passes
- [ ] ESLint passes
- [ ] Prettier passes except unrelated pre-existing failures
- [ ] No unrelated source changes
- [ ] Commit created

---

# Task Storage

.opencode/tasks/active/2026-08-25/CHASHA-BE-TASK-009.md

---

## Agent Record (agent, 2026-08-25)

### Duplicate check result (mandatory pre-implementation)

Confirmed missing: only single add (POST /assign-permission, 5d125ab), single remove (POST /remove-permission, 6449baa) and read (GET /get-all-permissions, 1de1317) exist. No bulk replace/synchronize operation anywhere in routes, handlers, repositories, or git history. Task valid - proceeded.

### Implementation notes (derived-decision unless noted)

1. Route PUT /admin/authz/role/permissions; guard triple ('platform-admin-role' / UPDATE / new resource PLATFORM_ADMIN_AUTHZ_ROLE_REPLACE_PERMISSIONS); seed key authz.platform-admin-role.replace-permissions.update; ACTION type; super_admin auto-grant via existing seed.
2. Reconciliation as set difference against ACTIVE assignments (soft-deleted rows invisible via TypeORM @DeleteDateColumn semantics): toRemove = current \\ requested, toAdd = requested \\ current, keep untouched -> idempotent, no unnecessary delete/reinsert.
3. Atomicity via shared transactionManager wrapping the remove/add loops with manager passed into existing repos.
4. Permission-existence gate before any write using new findPlatformAdminPermissionsByIdsRepository (In() query); 404 when any id missing; empty array short-circuits to [] and removes all.
5. Duplicates rejected at validation level via strictObject refine (PLATFORM_ADMIN_PERMISSION_IDS_DUPLICATE).
6. Response: { platformAdminRoleId, platformAdminPermissionIds } with 200 UPDATED_SUCCESS envelope (recommended updatedAt field omitted: role metadata is explicitly not modified by this endpoint, echoing it would mislead).
7. Migration 1787614209562 extends permission_resource enum to 18-value superset; down restores 17. No table schema change.
8. New validation-message keys: PLATFORM_ADMIN_PERMISSION_IDS_REQUIRED/\_INVALID/\_DUPLICATE/\_NOT_FOUND (shared enum + fa/en catalog).

### Final Report

- Task ID: CHASHA-BE-TASK-009
- Status: Completed
- Files created: replace command/handler/result, find-platform-admin-permissions-by-ids query/contract/repository, request/response DTOs, Zod validation, controller, migration 1787614209562, handler spec (6 tests), validation spec (8 tests).
- Files modified: permission-resource.enum.ts, permission.seed.ts, shared+i18n message enums, barrels (9), src/index.ts, role.route.ts (+PUT /permissions), Swagger document.
- Tests: handler spec 6/6 (full reconcile A,B,C->B,C,D; idempotent no-write; empty-set removes all; role 404; missing permission 404 pre-write; transaction failure propagation). Validation spec 8/8. Suite total 73/73 across 17 suites.
- Validation results: tsc PASS, eslint --max-warnings=0 PASS, prettier PASS, Swagger parses + all $refs resolve, seed-route triple byte-equal verified.
- Commit message: feat(authz): add platform admin role permission replacement
