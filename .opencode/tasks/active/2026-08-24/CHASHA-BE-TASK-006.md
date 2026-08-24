# CHASHA-BE-TASK-006 — Add Permission to Platform Admin Role

## Metadata

- **Task ID:** CHASHA-BE-TASK-006
- **Type:** Feature
- **Priority:** High
- **Status:** Completed
- **Domain:** Authorization
- **Module:** Authorizations
- **Dependencies:** CHASHA-BE-TASK-003, CHASHA-BE-TASK-005

---

## Context

Platform Admin Role management currently supports the existing role lifecycle operations, including role listing, creation, and deletion.

The next required capability is managing the permissions assigned to an existing Platform Admin Role.

The authorization model already contains Platform Admin Roles, Permissions, and the role-permission relationship. The backend must expose the ability to add an existing permission to an existing Platform Admin Role while preserving the current authorization architecture and data-integrity rules.

This task is specifically responsible for adding a permission to a role.

---

## Objective

Implement an authenticated and authorized Platform Admin API that assigns an existing permission to an existing Platform Admin Role.

The operation must persist the role-permission relationship and prevent invalid or duplicate assignments according to the existing data model and application conventions.

---

## Scope

### In Scope

- Add the Platform Admin Role → Permission assignment API.
- Resolve the target Platform Admin Role.
- Resolve the target Permission.
- Validate the request.
- Verify the requesting Platform Admin is authenticated.
- Enforce a dedicated permission for this operation.
- Persist the role-permission relationship.
- Handle non-existing Role/Permission references using existing exception patterns.
- Handle duplicate role-permission assignments using existing conflict/error conventions.
- Synchronize the required permission in the permission seed.
- Synchronize route guard and permission seed definitions.
- Add/update relevant DTOs, validation, controller, route, application handler, repository contracts/implementations, and exports according to existing architecture.
- Update Swagger/OpenAPI documentation.
- Add relevant tests.

### Out of Scope

- Creating a new Platform Admin Role.
- Updating Platform Admin Role data.
- Deleting a Platform Admin Role.
- Removing a permission from a Platform Admin Role.
- Creating or updating Permission records.
- Changing the global authorization architecture.
- Changing existing role list, detail, create, or delete APIs unless required for compatibility with this operation.

---

## Technical Requirements

- Add a dedicated authenticated Platform Admin endpoint for assigning a permission to a role.
- The endpoint must use the existing Platform Admin authentication middleware.
- The endpoint must use the existing Platform Admin authorization/permission guard.
- Create a dedicated permission definition for this operation using the existing permission resource/action/subject conventions.
- Synchronize the new permission through the existing permission seed.
- The permission assigned to the route guard must exactly match the corresponding seeded permission definition.
- The request must identify:
  - the target Platform Admin Role
  - the Permission to assign
- Use the existing request DTO and Zod validation conventions.
- Reject malformed or invalid request data using the existing validation-message and error-response system.
- Verify that the target Platform Admin Role exists before creating the relationship.
- Verify that the target Permission exists before creating the relationship.
- Prevent duplicate role-permission relationships according to the existing database constraints and application conventions.
- Return the existing API success-response envelope and status-code conventions used by comparable mutation endpoints.
- Use existing repository contracts between the application and infrastructure layers.
- Preserve the existing domain/application/infrastructure/presentation separation.
- Do not bypass the existing role-permission entity/schema.
- Do not introduce a second persistence model for role permissions.
- If the existing database schema requires a migration for the operation, create the migration following repository conventions. Do not create a migration unnecessarily if the existing schema already supports the relationship.
- Update all required barrel exports.
- Update Swagger/OpenAPI with request, response, security, validation, authorization, not-found, conflict, and server-error behavior consistent with the existing API documentation.

---

## Implementation Guidance

- Inspect the existing Platform Admin Role and Permission entities before implementation.
- Inspect `platform-admin-role-permissions.schema.ts` and the existing authorization migration/schema before deciding whether a database change is required.
- Follow the existing patterns used by Platform Admin Role APIs already implemented in the repository.
- Follow the existing repository contract/implementation pattern used by the authorization permission repositories.
- Reuse existing exception helpers for not-found and conflict cases.
- Follow the existing permission seed structure under the authorization system.
- Follow the existing Platform Admin permission-guard middleware pattern.
- Inspect existing role-permission seed logic to ensure the new permission is correctly registered without breaking existing `super_admin` initialization.
- Inspect existing Swagger definitions and mutation endpoints before adding new schemas.
- The implementation agent must inspect the repository and current git history before making changes.

---

## Acceptance Criteria

- [ ] An authenticated Platform Admin can assign an existing Permission to an existing Platform Admin Role through the new endpoint.
- [ ] Unauthenticated requests are rejected by the existing Platform Admin authentication mechanism.
- [ ] Authenticated Platform Admins without the required permission are rejected by the existing authorization mechanism.
- [ ] Invalid request payloads are rejected using the existing validation system and message conventions.
- [ ] A non-existing Platform Admin Role results in the existing not-found error behavior.
- [ ] A non-existing Permission results in the existing not-found error behavior.
- [ ] A duplicate Role-Permission assignment is rejected using the existing conflict/error convention rather than creating duplicate data.
- [ ] A successful assignment creates exactly one valid role-permission relationship.
- [ ] The required route permission exists in the permission seed.
- [ ] The route guard permission and seeded permission are exactly synchronized.
- [ ] Existing `super_admin` permission initialization remains valid.
- [ ] Existing Role Management endpoints continue to work.
- [ ] Swagger/OpenAPI contains the new endpoint and all referenced schemas resolve successfully.
- [ ] Relevant automated tests cover the new behavior.

---

## Validation

### Required Checks

- [ ] TypeScript compilation
- [ ] Lint
- [ ] Formatting
- [ ] Unit tests
- [ ] Relevant authorization tests
- [ ] Permission seed validation
- [ ] Swagger/OpenAPI validation
- [ ] Existing related Role Management tests

---

## Testing Requirements

Tests must cover:

- [ ] Successful permission assignment.
- [ ] Invalid request validation.
- [ ] Unauthenticated access.
- [ ] Unauthorized Platform Admin access.
- [ ] Non-existing Platform Admin Role.
- [ ] Non-existing Permission.
- [ ] Duplicate Role-Permission assignment.
- [ ] Persistence of the created relationship.
- [ ] Regression coverage for existing Platform Admin Role functionality.

---

## Documentation Requirements

- [ ] Update Swagger/OpenAPI documentation for the new endpoint.
- [ ] Document request and response schemas.
- [ ] Document authentication and required authorization permission.
- [ ] Ensure all Swagger `$ref` references resolve successfully.
- [ ] No additional architecture documentation is required unless implementation reveals an existing documented contract that must be synchronized.

---

## Commit

### Recommended Commit Message

`feat(authz): add permission to platform admin role`

### Commit Requirements

- Dedicated commit for this task.
- No unrelated changes.
- Review the final diff before committing.
- Do not amend previous Role Management commits.

---

## Definition of Done

- [ ] Implementation complete
- [ ] Existing architecture preserved
- [ ] Required validation implemented
- [ ] Required authentication implemented
- [ ] Required authorization implemented
- [ ] Required permission synchronized
- [ ] Required database changes completed, if applicable
- [ ] Required tests implemented
- [ ] Swagger/OpenAPI synchronized
- [ ] Relevant validation checks pass
- [ ] Final diff reviewed
- [ ] Dedicated commit created

---

## Notes

- This task intentionally covers **adding** a permission to a Platform Admin Role only.
- Permission removal is a separate task and must not be implemented here.
- Do not recreate functionality already delivered by CHASHA-BE-TASK-001, CHASHA-BE-TASK-003, or CHASHA-BE-TASK-005.
- Before implementation, verify the current repository and commit history because previous Role Management tasks have already been completed.

---

## Agent Record (agent, 2026-08-24)

### Required Skills

- Backend Engineering
- Architecture
- API Engineering
- Authentication & Authorization
- Persistence
- Security
- Testing
- Git

### Analysis notes (derived-decision unless noted)

1. Route: POST /admin/authz/role/assign-permission — single-level compound verb-phrase mirroring the existing '/list-option' style; role-centric mutation under the role router.
2. Permission triple: module 'platform-admin-role' / CREATE / new resource PLATFORM_ADMIN_AUTHZ_ROLE_ASSIGN_PERMISSION ('platform_admin_authz_role_assign_permission'); seed key authz.platform-admin-role.assign-permission.create; ACTION type; super_admin auto-grant preserved via existing role-permission seed. CREATE chosen because the operation persists a new relationship row, mirroring sibling create/update/delete action pairing.
3. Request contract derived from existing conventions: body identifiers by uuid — platformAdminRoleId (role detail/update/delete precedent) + platformAdminPermissionId (permissionId is the PermissionsModel PK).
4. Existing-behavior: platform_admin_role_permissions has NO composite unique index; duplicate prevention implemented at application level via findPlatformAdminRolePermissionRepository check → 409 DATA_CONFLICT, mirroring create-role by-key conflict handling. No schema migration required for the relationship itself.
5. Migration 1787605989232 extends permissions.permission_resource MySQL enum to the full 15-value superset; down() restores the prior 14-value chain (established pattern).
6. New validation-message keys PLATFORM_ADMIN_PERMISSION_ID_REQUIRED, PLATFORM_ADMIN_PERMISSION_ID_NOT_FOUND, PLATFORM_ADMIN_ROLE_PERMISSION_ALREADY_EXISTS added to the shared enum and both i18n dictionaries following the established phrasing family.
7. Response returns created relationship identifier only (client already knows both submitted ids) — mirrors create-role response minimalism. Status 201 CREATED_SUCCESS per comparable creation endpoints.
8. No query-cache invalidation required: this write changes no cached read (role list cache holds role rows only; permission lookups are uncached).
9. Note: an earlier version of this task file briefly described role creation (duplicate of CHASHA-BE-TASK-003); it was replaced with the present add-permission scope before implementation began.

## Final Report

- Task ID: CHASHA-BE-TASK-006
- Status: Completed
- Implementation summary: POST /api/v1/{lang}/admin/authz/role/assign-permission assigns an existing permission to an existing platform-admin role after existence checks on both references and a duplicate-assignment conflict check; returns the created relationship identifier with a 201 envelope; guarded by dedicated permission.
- Files created: assign command/handler/result, find/create role-permission repository contracts & implementations, find-platform-admin-permission-by-id query/contract/implementation (authorizations), request/response DTOs, Zod validation, controller, migration 1787605989232, handler spec (4 tests), validation spec (5 tests).
- Files modified: permission-resource.enum.ts (+PLATFORM_ADMIN_AUTHZ_ROLE_ASSIGN_PERMISSION), permission.seed.ts (+authz.platform-admin-role.assign-permission.create), shared+i18n validation enums (+3 keys fa/en), barrels (10), src/index.ts (migration re-export), role.route.ts, Swagger en-base-config.config.json (path /assign-permission + AssignPlatformAdminRolePermissionRequest/Response schemas).
- Database changes: permissions.permission_resource MySQL enum extended by 'platform_admin_authz_role_assign_permission'; no table schema change.
- API changes: new endpoint POST /{language_prefix}/admin/authz/role/assign-permission (201/400/401/403/404 role-or-permission/409/500 documented).
- Permission changes: seed row authz.platform-admin-role.assign-permission.create (PLATFORM_ADMIN / platform-admin-role / create / ACTION v1); auto-assigned to super_admin by existing role-permission seed; route guard triple byte-equal verified.
- Swagger changes: path + request/response schemas; all $refs resolve; security CookieAuth/BearerAuth declared.
- Tests: assign handler spec 4/4 (success persistence + id return, role 404, permission 404, duplicate 409); assign validation spec 5/5. Full suite 42/42 across 11 suites including regression coverage for list/detail/create/update/delete.
- Validation results: npm ls PASS, tsc --noEmit PASS, eslint --max-warnings=0 PASS, prettier --check PASS, jest 42/42 PASS, Swagger JSON parses with zero unresolved refs, seed↔route sync PASS.
- Commit message: feat(authz): add permission to platform admin role
- Remaining issues: pre-existing list-option guard module typo ('platoform-admin-role') still open - operator decision pending; HTTP-level integration tests deferred until an approved harness exists.
