# CHASHA-BE-TASK-007 — Remove Permission from Platform Admin Role

## Metadata

- **Task ID:** CHASHA-BE-TASK-007
- **Type:** Feature
- **Priority:** High
- **Status:** Completed
- **Domain:** Authorization
- **Module:** Authorizations
- **Dependencies:** CHASHA-BE-TASK-006

---

## Context

Platform Admin Role management now supports assigning an existing Permission to an existing Platform Admin Role.

The authorization system also needs the inverse operation: removing an existing Permission assignment from a Platform Admin Role.

The existing database schema contains the Platform Admin Role-Permission relationship, and the authorization module already provides the domain and infrastructure structure required to manage this relationship.

This task must remove an existing role-permission relationship without deleting either the Role or the Permission itself.

---

## Objective

Implement an authenticated and authorized Platform Admin API that removes an existing Permission assignment from an existing Platform Admin Role.

The operation must delete only the role-permission relationship and must preserve both the Role and Permission records.

---

## Scope

### In Scope

- Add the Platform Admin Role → Permission removal API.
- Resolve the target Platform Admin Role.
- Resolve the target Permission.
- Validate the request.
- Verify the requesting Platform Admin is authenticated.
- Enforce a dedicated permission for this operation.
- Remove the existing role-permission relationship.
- Handle non-existing Role/Permission references using existing exception patterns.
- Handle removal of a non-existing role-permission assignment using the existing error conventions.
- Synchronize the required authorization permission in the permission seed.
- Synchronize route guard and permission seed definitions.
- Add/update relevant DTOs, validation, controller, route, application handler, repository contract/implementation, and exports according to existing architecture.
- Update Swagger/OpenAPI documentation.
- Add relevant tests.

### Out of Scope

- Creating a Platform Admin Role.
- Updating Platform Admin Role data.
- Deleting a Platform Admin Role.
- Adding a permission to a Platform Admin Role.
- Creating, updating, or deleting Permission records.
- Changing the global authorization architecture.
- Changing the existing Role-Permission database structure unless a repository-compatible change is genuinely required.
- Implementing bulk permission removal.

---

## Technical Requirements

- Add a dedicated authenticated Platform Admin endpoint for removing a permission from a role.
- The endpoint must use the existing Platform Admin authentication middleware.
- The endpoint must use the existing Platform Admin permission-guard mechanism.
- Create a dedicated permission definition for this operation using the existing permission resource/action/subject conventions.
- Synchronize the new permission through the existing permission seed.
- Ensure the route guard permission exactly matches the seeded permission definition.
- The request must identify:
  - the target Platform Admin Role
  - the Permission to remove
- Use the existing request DTO and Zod validation conventions.
- Reject malformed request data through the existing validation and localized message system.
- Verify that the target Platform Admin Role exists according to existing repository/application conventions.
- Verify that the target Permission exists according to existing repository/application conventions.
- Verify that the requested Role-Permission relationship exists before attempting removal.
- Remove only the corresponding Role-Permission relationship.
- Do not delete or modify the underlying Role or Permission records.
- Return the existing API success-response envelope and status-code conventions used by comparable mutation endpoints.
- Use an application-level repository contract rather than accessing infrastructure persistence directly from the controller.
- Preserve the existing domain/application/infrastructure/presentation separation.
- Use the existing database transaction mechanism if the established implementation pattern requires transactional behavior.
- Update all required barrel exports.
- Update Swagger/OpenAPI with request, response, security, authorization, validation, not-found, and server-error behavior consistent with the existing API documentation.

---

## Implementation Guidance

- Inspect the implementation completed for CHASHA-BE-TASK-006 before designing this operation.
- Follow the same architectural pattern used by the Platform Admin Role-Permission assignment flow where applicable.
- Inspect the existing `platform-admin-role-permissions.schema.ts` and related entity before implementing persistence behavior.
- Follow existing repository contract and repository implementation conventions.
- Reuse existing not-found, unauthorized, unauthenticated, and validation error mechanisms.
- Inspect the existing authorization permission seed and add the new removal permission using the same conventions.
- Preserve existing `super_admin` role-permission initialization behavior.
- Pay particular attention to preventing accidental deletion of the Role or Permission entity itself.
- Inspect existing Swagger mutation endpoints before documenting the new route.
- The implementation agent must inspect the repository and current git history before coding.

---

## Acceptance Criteria

- [ ] An authenticated Platform Admin with the required permission can remove an existing Permission assignment from an existing Platform Admin Role.
- [ ] Unauthenticated requests are rejected by the existing Platform Admin authentication mechanism.
- [ ] Authenticated Platform Admins without the required permission are rejected by the existing authorization mechanism.
- [ ] Invalid request payloads are rejected through the existing validation system.
- [ ] A non-existing Platform Admin Role results in the existing not-found behavior.
- [ ] A non-existing Permission results in the existing not-found behavior.
- [ ] A Role-Permission relationship that does not exist is rejected using the existing appropriate error convention.
- [ ] A successful request removes exactly the requested Role-Permission relationship.
- [ ] The underlying Platform Admin Role remains unchanged.
- [ ] The underlying Permission remains unchanged.
- [ ] Other permissions assigned to the same Role remain unchanged.
- [ ] Other Roles using the same Permission remain unchanged.
- [ ] The required removal permission exists in the permission seed.
- [ ] The route guard permission and seeded permission are exactly synchronized.
- [ ] Existing `super_admin` permission initialization remains valid.
- [ ] Existing Role Management and Permission Management endpoints continue to work.
- [ ] Swagger/OpenAPI contains the new endpoint and all referenced schemas resolve successfully.
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
- [ ] Existing related Role Management tests

---

## Testing Requirements

Tests must cover:

- [ ] Successful permission removal.
- [ ] Invalid request validation.
- [ ] Unauthenticated access.
- [ ] Unauthorized Platform Admin access.
- [ ] Non-existing Platform Admin Role.
- [ ] Non-existing Permission.
- [ ] Non-existing Role-Permission relationship.
- [ ] Persistence verification that the relationship is removed.
- [ ] Verification that the Role record is preserved.
- [ ] Verification that the Permission record is preserved.
- [ ] Verification that unrelated Role-Permission relationships remain intact.
- [ ] Regression coverage for existing Platform Admin Role and Permission functionality.

---

## Documentation Requirements

- [ ] Update Swagger/OpenAPI documentation for the new endpoint.
- [ ] Document request and response schemas.
- [ ] Document authentication and required authorization permission.
- [ ] Document relevant error responses.
- [ ] Ensure all Swagger `$ref` references resolve successfully.
- [ ] No additional architecture documentation is required.

---

## Commit

### Recommended Commit Message

`feat(authz): remove permission from platform admin role`

### Commit Requirements

- Dedicated commit for this task.
- No unrelated changes.
- Review the final diff before committing.
- Do not amend previous Role Management or Permission Management commits.

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

- This task intentionally covers **removing** a Permission assignment from a Platform Admin Role only.
- It must not delete the Role or Permission entity.
- It must not implement bulk removal.
- It must not recreate functionality already delivered by previous Role Management tasks.
- Before implementation, inspect the current repository and git history to ensure no equivalent removal flow has already been implemented.

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

1. Verified no equivalent removal flow exists (grep across src: only TASK-005 bulk soft-delete by roleId and TASK-006 assign exist).
2. Route: POST /admin/authz/role/remove-permission — mirrors the '/assign-permission' compound verb-phrase convention from CHASHA-BE-TASK-006.
3. Permission triple: module 'platform-admin-role' / DELETE / new resource PLATFORM_ADMIN_AUTHZ_ROLE_REMOVE_PERMISSION ('platform_admin_authz_role_remove_permission'); seed key authz.platform-admin-role.remove-permission.delete; ACTION type; super_admin auto-grant preserved via existing role-permission seed. DELETE chosen because the operation removes a relationship row, mirroring assign=CREATE pairing.
4. Request contract identical to assignment flow (platformAdminRoleId + platformAdminPermissionId uuids); validation reuses the TASK-006 message keys.
5. Removal mechanism: repository-level softDelete on the composite (roleId, permissionId) — consistent with the established deletion convention for platform_admin_role_permissions (TASK-005) and the model's @DeleteDateColumn; touches exactly one relationship, leaving role and permission records and all other assignments untouched. New singular repo deletePlatformAdminRolePermissionRepository kept distinct from TASK-005's plural bulk variant.
6. Non-existent relationship → 404 NOT_FOUND with new message key PLATFORM_ADMIN_ROLE_PERMISSION_NOT_FOUND (shared enum + both i18n dictionaries), matching not-found conventions of sibling flows.
7. Response: data:null envelope with DELETED_SUCCESS at 200, mirroring update/delete mutation endpoints; no response DTO file per precedent.
8. Single write — no transaction required (mirrors create/assign single-write precedents). No cached read is affected by this write (role list cache holds role rows only), so no cache invalidation needed.

## Final Report

- Task ID: CHASHA-BE-TASK-007
- Status: Completed
- Implementation summary: POST /api/v1/{lang}/admin/authz/role/remove-permission soft-deletes exactly one platform-admin role-permission relationship after existence checks on role (404), permission (404) and the assignment itself (404); returns standard DELETED_SUCCESS envelope with data:null; guarded by dedicated permission.
- Files created: remove command/handler, delete-platform-admin-role-permission repository contract & implementation (singular composite variant), request DTO, Zod validation, controller, migration 1787607373487, handler spec (5 tests), validation spec (5 tests).
- Files modified: permission-resource.enum.ts (+PLATFORM_ADMIN_AUTHZ_ROLE_REMOVE_PERMISSION), permission.seed.ts (+authz.platform-admin-role.remove-permission.delete), shared+i18n validation enums (+PLATFORM_ADMIN_ROLE_PERMISSION_NOT_FOUND fa/en), barrels (8), src/index.ts (migration re-export), role.route.ts, Swagger en-base-config.config.json (path /remove-permission + RemovePlatformAdminRolePermissionRequest/Response schemas).
- Database changes: permissions.permission_resource MySQL enum extended to 16-value superset; down() restores prior 15-value chain; no table schema change.
- API changes: new endpoint POST /{language_prefix}/admin/authz/role/remove-permission (200/400/401/403/404 role-or-permission-or-assignment/500 documented).
- Permission changes: seed row authz.platform-admin-role.remove-permission.delete (PLATFORM_ADMIN / platform-admin-role / delete / ACTION v1); auto-assigned to super_admin by existing role-permission seed; route guard triple byte-equal verified.
- Swagger changes: path + request/response schemas; all $refs resolve; security CookieAuth/BearerAuth declared.
- Tests: remove handler spec 5/5 (success removal with exact composite criteria, role 404, permission 404, missing assignment 404, single-target verification); remove validation spec 5/5. Full suite 52/52 across 13 suites incl. regression coverage for list/list-option/detail/create/update/delete/assign.
- Validation results: npm ls PASS, tsc --noEmit PASS, eslint --max-warnings=0 PASS, prettier --check PASS repo-wide, jest 52/52 PASS, Swagger JSON parses with zero unresolved refs, seed↔route sync byte-verified.
- Commit message: feat(authz): remove permission from platform admin role
- Remaining issues: pre-existing list-option guard module typo ('platoform-admin-role') still open - operator decision pending; HTTP-level integration tests deferred until an approved harness exists.
