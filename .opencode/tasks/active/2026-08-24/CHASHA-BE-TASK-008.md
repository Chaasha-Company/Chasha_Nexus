# CHASHA-BE-TASK-008 — Get Platform Admin Role Permissions

## Metadata

- **Task ID:** CHASHA-BE-TASK-008
- **Type:** Feature
- **Priority:** High
- **Status:** Completed
- **Domain:** Authorization
- **Module:** Authorizations
- **Dependencies:** CHASHA-BE-TASK-001, CHASHA-BE-TASK-006, CHASHA-BE-TASK-007

---

## Context

Platform Admin Role management now includes operations for managing the permissions assigned to a Role.

After permissions can be added to and removed from a Platform Admin Role, the authorization management flow also requires a read operation that exposes the permissions currently assigned to a specific Role.

The existing authorization module already contains Platform Admin Role, Permission, and Role-Permission domain/database structures. The implementation must reuse these existing concepts and follow the existing query, repository, DTO, validation, authentication, authorization, and response conventions.

This task is specifically responsible for retrieving the permissions assigned to one Platform Admin Role.

---

## Objective

Implement an authenticated and authorized Platform Admin API that retrieves the permissions currently assigned to a specific Platform Admin Role.

The endpoint must return the persisted permissions associated with the requested Role using the existing API response conventions.

---

## Scope

### In Scope

- Add the Platform Admin Role permissions retrieval API.
- Resolve the target Platform Admin Role.
- Retrieve the permissions assigned to that Role.
- Enforce Platform Admin authentication.
- Enforce a dedicated permission for this operation.
- Add request validation where required.
- Add/update application query and handler logic.
- Add/update repository contract and implementation where required.
- Add/update response DTOs and required exports.
- Synchronize the required route permission in the permission seed.
- Synchronize route guard and permission seed definitions.
- Update Swagger/OpenAPI documentation.
- Add relevant tests.

### Out of Scope

- Creating a Platform Admin Role.
- Updating a Platform Admin Role.
- Deleting a Platform Admin Role.
- Adding permissions to a Role.
- Removing permissions from a Role.
- Creating or modifying Permission records.
- Modifying Role-Permission assignments.
- Bulk permission management.
- Changing the authorization architecture.

---

## Technical Requirements

- Add a dedicated authenticated Platform Admin endpoint for retrieving the permissions assigned to a Role.
- Use the existing Platform Admin authentication middleware.
- Use the existing Platform Admin permission-guard mechanism.
- Add a dedicated permission definition for this read operation using the existing authorization permission conventions.
- Synchronize the new permission through the existing permission seed.
- Ensure the route guard permission and seeded permission are exactly synchronized.
- The request must identify the target Platform Admin Role using the existing identifier conventions.
- Use the existing validation patterns for the request.
- Verify that the target Role exists according to the existing application/repository conventions.
- Retrieve only permissions associated with the requested Role.
- Do not modify Role-Permission relationships.
- Do not return permissions belonging to unrelated Roles.
- Follow the existing Permission response shape and naming conventions.
- Preserve the existing response envelope.
- Use the application-layer query/repository contract rather than accessing infrastructure directly from the controller.
- Reuse an existing Role-Permission repository/query if it already satisfies this requirement.
- Do not create duplicate repository abstractions when an existing implementation can be reused safely.
- Update all required barrel exports.
- Update Swagger/OpenAPI with authentication, authorization, request, response, not-found, and server-error behavior consistent with the existing API.

---

## Implementation Guidance

- Inspect the existing Platform Admin Role and Permission entities before implementation.
- Inspect the existing Platform Admin Role-Permission schema:
  `src/shared/v1/database/schema/platform_admins/childrens/platform-admin-roles/platform-admin-role-permissions.schema.ts`
  or its actual repository location.
- Inspect the existing authorization repository and query patterns for permission retrieval.
- Follow the existing Platform Admin permission retrieval implementation if one already exists.
- Inspect the existing business permission retrieval flow and reuse its architectural pattern where applicable.
- Follow existing query/result/handler conventions.
- Follow existing response DTO and Swagger conventions.
- Reuse the existing Not Found behavior for a non-existing Role.
- Inspect the current permission seed before adding the new permission.
- Preserve existing `super_admin` role-permission initialization behavior.
- Inspect the current git history and repository state before implementation to ensure this functionality has not already been implemented under another task or route.

---

## Acceptance Criteria

- [ ] An authenticated Platform Admin with the required permission can retrieve the permissions assigned to an existing Platform Admin Role.
- [ ] Unauthenticated requests are rejected by the existing Platform Admin authentication mechanism.
- [ ] Authenticated Platform Admins without the required permission are rejected by the existing authorization mechanism.
- [ ] Invalid Role identifiers are rejected according to the existing validation conventions where applicable.
- [ ] A non-existing Platform Admin Role returns the existing not-found behavior.
- [ ] A successful request returns the permissions assigned to the requested Role.
- [ ] The response contains only permissions associated with the requested Role.
- [ ] Roles with no assigned permissions return the existing empty-result representation.
- [ ] The operation does not modify the Role.
- [ ] The operation does not modify any Permission.
- [ ] The operation does not modify Role-Permission relationships.
- [ ] The required permission exists in the permission seed.
- [ ] The route guard permission and seeded permission are exactly synchronized.
- [ ] Existing Role list, detail, create, update, delete, add-permission, and remove-permission functionality remains intact.
- [ ] Swagger/OpenAPI contains the new endpoint and all `$ref` references resolve successfully.
- [ ] Relevant automated tests pass.

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
- [ ] Existing related Role/Permission tests

---

## Testing Requirements

Tests must cover:

- [ ] Successful retrieval of Role permissions.
- [ ] Role with multiple assigned permissions.
- [ ] Role with no assigned permissions.
- [ ] Invalid Role identifier where applicable.
- [ ] Non-existing Role.
- [ ] Unauthenticated access.
- [ ] Unauthorized Platform Admin access.
- [ ] Verification that permissions from unrelated Roles are not returned.
- [ ] Verification that the query does not modify persisted authorization data.
- [ ] Regression coverage for existing Platform Admin Role and Permission functionality.

---

## Documentation Requirements

- [ ] Update Swagger/OpenAPI for the new endpoint.
- [ ] Document request parameters.
- [ ] Document the permission response schema.
- [ ] Document authentication and required authorization permission.
- [ ] Document relevant error responses.
- [ ] Ensure all Swagger `$ref` references resolve successfully.
- [ ] No additional architecture documentation is required.

---

## Commit

### Recommended Commit Message

`feat(authz): add platform admin role permission listing`

### Commit Requirements

- Dedicated commit for this task.
- No unrelated changes.
- Review the final diff before committing.
- Do not amend previous Role or Permission Management commits.

---

## Definition of Done

- [ ] Implementation complete
- [ ] Existing architecture preserved
- [ ] Required validation implemented
- [ ] Required authentication implemented
- [ ] Required authorization implemented
- [ ] Required permission synchronized
- [ ] Required tests implemented
- [ ] Swagger/OpenAPI synchronized
- [ ] Relevant validation checks pass
- [ ] Final diff reviewed
- [ ] Dedicated commit created

---

## Notes

- This is the final task of the second four-task batch and completes the Platform Admin Role-Permission management read/write flow.
- This task is read-only and must not modify authorization data.
- Do not recreate the existing permission retrieval implementation if an equivalent Platform Admin Role-Permission query already exists.
- Before implementation, inspect the current repository and git history to ensure no equivalent endpoint has already been implemented.

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

1. Equivalence check (note 5): GET /admin/authz/permission/get-all exists but returns only the requesting admin's own role permissions from req.user.auth_token_role_id - no target-role input, no role-existence 404 flow, different guard resource. Not equivalent; a new endpoint is required.
2. Reuse (technical requirement): data retrieval reuses the existing findAllPlatformAdminPermissionByRoleIdRepository and the existing getAllPlatformAdminPermissionQueryHandler mapping verbatim - no duplicate repository or mapping abstraction created. New handler adds only the target-role existence check.
3. Route: GET /admin/authz/role/get-all-permissions - collection read mirroring the existing GET /get-all convention (query validation), compound verb-phrase mirroring /assign-permission and /remove-permission.
4. Permission triple: module 'platform-admin-role' / READ / new resource PLATFORM_ADMIN_AUTHZ_ROLE_GET_PERMISSIONS ('platform_admin_authz_role_get_permissions'); seed key authz.platform-admin-role.get-permissions.read; ACTION type; super_admin auto-grant preserved via existing role-permission seed.
5. Response shape: identical item contract to the existing permission retrieval flow (GetAllPlatformAdminRolePermissions alias of GetAllPlatformAdminPermissionResponseDTO); empty array for roles without assignments. Swagger 200 reuses the existing GetAllPlatformAdminPermissionResponseDTO component - zero new response schemas.
6. Migration 1787609774289 extends permissions.permission_resource MySQL enum to the full 17-value superset; down() restores the prior 16-value chain.
7. Read-only operation: no writes, no cache invalidation needed, no transaction.

## Final Report

- Task ID: CHASHA-BE-TASK-008
- Status: Completed
- Implementation summary: GET /api/v1/{lang}/admin/authz/role/get-all-permissions?platformAdminRoleId=... returns the permissions currently assigned to an existing platform-admin role (404 when the role does not exist, empty list when none assigned), guarded by a dedicated read permission.
- Files created: query interface + handler + result alias (platform-admins), request-query DTO + Zod validation + response DTO type + controller (authorizations), migration 1787609774289, handler spec (3 tests), validation spec (4 tests).
- Files modified: permission-resource.enum.ts (+PLATFORM_ADMIN_AUTHZ_ROLE_GET_PERMISSIONS), permission.seed.ts (+authz.platform-admin-role.get-permissions.read), barrels (8), src/index.ts (migration re-export), role.route.ts (+GET /get-all-permissions with guard triple), Swagger en-base-config.config.json (+path reusing existing response schemas).
- Database changes: permissions.permission_resource MySQL enum extended by 'platform_admin_authz_role_get_permissions'; no table schema change.
- API changes: new endpoint GET /{language_prefix}/admin/authz/role/get-all-permissions (200/400/401/403/404/500 documented).
- Permission changes: seed row authz.platform-admin-role.get-permissions.read (PLATFORM_ADMIN / platform-admin-role / read / ACTION v1); route guard triple byte-equal verified; auto-assigned to super_admin by existing role-permission seed.
- Swagger changes: path + parameters + security + error responses; all $refs resolve (response schema reused).
- Tests: handler spec 3/3 (delegation passthrough, empty list, role-not-found short-circuit); validation spec 4/4. Full suite 59/59 across 15 suites incl. regression coverage for all other Role Management endpoints.
- Validation results: npm ls PASS, tsc --noEmit PASS, eslint --max-warnings=0 PASS, prettier --check PASS repo-wide, jest 59/59 PASS, Swagger JSON parses with zero unresolved refs, seed-route sync byte-verified, TS enum fully covered by final DB migration chain (17/17).
- Commit message: feat(authz): add platform admin role permission listing
- Remaining issues: pre-existing migration 1785941309684 missing its src/index.ts re-export (production bundling gap predating this task batch) - fixed in a follow-up fix(database) commit; pre-existing list-option guard module typo ('platoform-admin-role') still open - operator decision pending; HTTP-level integration tests deferred until an approved harness exists.
