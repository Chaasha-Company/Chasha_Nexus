# CHASHA-BE-TASK-009 — Get Platform Admin Role Permissions

## Metadata

- **Task ID:** CHASHA-BE-TASK-009
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

### Analysis notes

existing-behavior finding: this task file is a verbatim duplicate of CHASHA-BE-TASK-008 ("Get Platform Admin Role Permissions") - its internal Task ID even reads CHASHA-BE-TASK-008 as a copy-paste artifact (corrected here to CHASHA-BE-TASK-009 to match the filename). The required functionality was fully implemented, tested, documented, and permission-synchronized in the immediately preceding task execution and committed as 1de1317 `feat(authz): add platform admin role permission listing`. Per agent-contract non-negotiables (never reimplement completed tasks; never create duplicate commits), no re-implementation or second feature commit was created; execution consisted of full acceptance-criteria verification at HEAD plus closure of this record.

### Verification Record (2026-08-24, HEAD daf8752)

- Endpoint registered: GET /{language_prefix}/admin/authz/role/get-all-permissions under requirePlatformAdminAuthMiddleware -> adminAuthzRouter -> role route. PASS
- Permission guard triple ('platform-admin-role' / READ / PLATFORM_ADMIN_AUTHZ_ROLE_GET_PERMISSIONS) byte-equal to seed row authz.platform-admin-role.get-permissions.read. PASS
- Request validation via validateQueryMiddleware(GetPlatformAdminRolePermissionsQueryValidation) with existing i18n message keys. PASS
- Non-existing role -> 404; empty list for roles without assignments. PASS (handler spec 3/3)
- Read-only operation: no writes to Role, Permission, or relationship tables. PASS
- super_admin auto-grant preserved by existing role-permission seed. PASS
- Migration 1787609774289 present and re-exported from src/index.ts; TS enum fully covered by final DB migration chain (17/17). PASS
- Swagger path documented with security + parameter + error responses reusing existing schemas; all $refs resolve. PASS
- Gates: npm ls PASS, tsc --noEmit PASS, eslint --max-warnings=0 PASS, prettier --check PASS repo-wide, jest 59/59 across 15 suites incl. full Role Management regression coverage. PASS

## Final Report

- Task ID: CHASHA-BE-TASK-009
- Status: Completed (closed as duplicate of completed CHASHA-BE-TASK-008 / commit 1de1317)
- Implementation summary: none required - role permissions retrieval flow already implemented, tested, documented, and permission-synchronized in main.
- Files created: this task-record update only.
- Files modified: none in src/.
- Database changes: none.
- API changes: none.
- Permission changes: none.
- Swagger changes: none.
- Tests: full suite executed - 59/59 passed (15 suites).
- Validation results: npm ls PASS, tsc --noEmit PASS, eslint --max-warnings=0 PASS, prettier --check PASS, Swagger JSON parses with zero unresolved refs, seed-route sync byte-verified.
- Commit message: docs(tasks): reconcile chasha-be-task-009 with completed permission listing
- Remaining issues: pre-existing list-option guard module typo ('platoform-admin-role') still open - operator decision pending; HTTP-level integration tests deferred until an approved harness exists.
