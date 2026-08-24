# CHASHA-BE-TASK-008 — Update Platform Admin Role

## Metadata

- **Task ID:** CHASHA-BE-TASK-008
- **Type:** Feature
- **Priority:** High
- **Status:** Completed
- **Domain:** Authorization
- **Module:** Authorizations
- **Dependencies:** CHASHA-BE-TASK-003, CHASHA-BE-TASK-005

---

## Context

Platform Admin Role management already supports creating, listing, and deleting roles, while role-permission management is handled separately.

A Platform Admin must also be able to modify the editable data of an existing Platform Admin Role without recreating the role or modifying its permission assignments.

The existing Platform Admin Role domain model, persistence schema, validation conventions, and application architecture must be reused for this operation.

---

## Objective

Implement an authenticated and authorized Platform Admin API for updating the editable data of an existing Platform Admin Role.

The operation must update only the role data explicitly supported by the existing domain model and must preserve its existing permission assignments.

---

## Scope

### In Scope

- Add the Platform Admin Role update API.
- Resolve the target Platform Admin Role.
- Validate the update request.
- Enforce Platform Admin authentication.
- Enforce a dedicated permission for role update.
- Update supported editable Role fields.
- Handle duplicate Role keys according to existing conflict conventions.
- Preserve existing Role-Permission relationships.
- Synchronize the required permission in the permission seed.
- Synchronize route guard and permission seed definitions.
- Update DTOs, validation, controller, application handler, repository contract/implementation, routes, and exports where required.
- Update Swagger/OpenAPI.
- Add relevant tests.

### Out of Scope

- Creating a Role.
- Deleting a Role.
- Adding a Permission to a Role.
- Removing a Permission from a Role.
- Creating or modifying Permission records.
- Changing Role-Permission assignments.
- Changing the authorization architecture.
- Introducing bulk Role updates.

---

## Technical Requirements

- Add a dedicated authenticated Platform Admin endpoint for updating a Role.
- Use the existing Platform Admin authentication middleware.
- Use the existing Platform Admin permission-guard mechanism.
- Add a dedicated permission definition for Role update using the existing authorization naming conventions.
- Synchronize the permission through the existing permission seed.
- Ensure the route guard and seeded permission are exactly synchronized.
- The request must identify the target Role according to the existing Role API conventions.
- Use the existing DTO and Zod validation patterns.
- Use existing localized validation messages.
- Verify that the target Role exists.
- Reject an update that violates an existing unique Role key constraint using the existing conflict behavior.
- Update only fields supported by the existing Platform Admin Role model.
- Do not modify Role-Permission relationships as part of this operation.
- Preserve existing timestamps and persistence conventions.
- Use the existing repository contract/application boundary.
- Follow the existing transaction pattern if required by the repository implementation.
- Return the existing API success-response envelope and status conventions.
- Update all required barrel exports.
- Synchronize Swagger/OpenAPI documentation.

---

## Implementation Guidance

- Inspect the existing Platform Admin Role entity and database schema before defining the update payload.
- Inspect existing Role creation and deletion implementations and follow their architectural patterns.
- Inspect existing update commands/handlers in other modules for partial-update behavior.
- Reuse existing repository patterns rather than introducing a new persistence abstraction.
- Reuse existing exception helpers for Not Found and Conflict cases.
- Inspect the permission seed before adding the Role Update permission.
- Preserve existing `super_admin` role-permission initialization behavior.
- Do not assume which Role fields are editable; derive the allowed fields from the existing domain model and established Role API behavior.
- Inspect current git history before implementation to ensure an equivalent update operation does not already exist.

---

## Acceptance Criteria

- [ ] An authenticated Platform Admin with the required permission can update an existing Platform Admin Role.
- [ ] Unauthenticated requests are rejected by the existing authentication mechanism.
- [ ] Platform Admins without the required permission are rejected by the existing authorization mechanism.
- [ ] Invalid request data is rejected through the existing validation system.
- [ ] Updating a non-existing Role returns the existing not-found behavior.
- [ ] Updating a Role key to an already-used key returns the existing conflict behavior.
- [ ] Only supported Role fields are modified.
- [ ] Existing Role-Permission assignments remain unchanged after the update.
- [ ] The required Role Update permission exists in the permission seed.
- [ ] Route guard and permission seed definitions are synchronized.
- [ ] Existing Role list, create, delete, and permission-management functionality remains intact.
- [ ] Swagger/OpenAPI documents the endpoint and all `$ref` references resolve.
- [ ] Relevant automated tests pass.

---

## Validation

### Required Checks

- [ ] TypeScript compilation
- [ ] Lint
- [ ] Formatting
- [ ] Unit tests
- [ ] Authorization tests
- [ ] Permission seed validation
- [ ] Swagger/OpenAPI validation
- [ ] Existing Role Management regression tests

---

## Testing Requirements

Tests must cover:

- [ ] Successful Role update.
- [ ] Invalid request validation.
- [ ] Unauthenticated access.
- [ ] Unauthorized Platform Admin access.
- [ ] Non-existing Role.
- [ ] Duplicate Role key.
- [ ] Preservation of existing Role-Permission assignments.
- [ ] Persistence of updated Role data.
- [ ] Regression coverage for existing Role APIs.

---

## Documentation Requirements

- [ ] Update Swagger/OpenAPI for the new endpoint.
- [ ] Document request and response schemas.
- [ ] Document authentication and required permission.
- [ ] Document relevant error responses.
- [ ] Ensure all Swagger `$ref` references resolve successfully.

---

## Commit

### Recommended Commit Message

`feat(authz): add platform admin role update`

### Commit Requirements

- Dedicated commit for this task.
- No unrelated changes.
- Review the final diff before committing.
- Do not amend previous task commits.

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

- Do not modify Role-Permission relationships in this task.
- Do not invent editable Role fields. Inspect the existing domain model and established API behavior first.
- Before implementation, verify that this functionality has not already been implemented under another task or route.

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

### Analysis notes

existing-behavior finding: this task is a material duplicate of CHASHA-BE-TASK-004 ("Implement Platform Admin Role Update API", Status: Completed, commit 3e76b84 `feat(authz): add platform admin role update`). Same endpoint (PATCH /admin/authz/role/update), same dedicated permission triple, same editable-field contract, and an identical recommended commit message. Per agent-contract non-negotiables (never reimplement completed tasks; one dedicated commit per task), no re-implementation or duplicate feature commit was created; execution consisted of full acceptance-criteria verification at HEAD plus closure of this record.

Duplicate-key criterion note: the update payload deliberately excludes platformAdminRoleKey (editable fields are nameFa/nameEn/descriptionFa/descriptionEn only, per the established TASK-004 contract); a key change through this API is impossible by construction, so the unique-key conflict path cannot be triggered here and the DB unique index remains the backstop.

### Verification Record (2026-08-24, HEAD 6449baa)

- Endpoint registered: PATCH /{language_prefix}/admin/authz/role/update under requirePlatformAdminAuthMiddleware -> adminAuthzRouter -> role route. PASS
- Permission guard triple ('platform-admin-role' / UPDATE / PLATFORM_ADMIN_AUTHZ_ROLE_UPDATE) byte-equal to seed row authz.platform-admin-role.update.update. PASS
- Validation via validateBodyMiddleware(UpdatePlatformAdminRoleValidation), Zod strictObject with at-least-one-field refinement, i18n messages. PASS
- Non-existing role -> 404 via findPlatformAdminRoleByIdRepository + throwNotFoundException. PASS
- Only supported fields modified: command type restricted to nameFa/nameEn/descriptionFa/descriptionEn; role-permission relationships untouched by the update repository. PASS
- Migration 1787527674995 present and re-exported from src/index.ts. PASS
- Swagger PATCH documented (operationId updatePlatformAdminRole; responses 200/400/401/403/404/500); all $refs resolve. PASS
- super_admin initialization intact; list/create/delete/get-all/list-option/detail and permission-management regression specs pass.
- Gates: npm ls PASS, tsc --noEmit PASS, eslint --max-warnings=0 PASS, prettier --check PASS (after normalizing this spec file), jest 52/52 across 13 suites incl. update handler spec and update validation spec. PASS

## Final Report

- Task ID: CHASHA-BE-TASK-008
- Status: Completed (closed as duplicate of completed CHASHA-BE-TASK-004 / commit 3e76b84)
- Implementation summary: none required - role update flow already implemented, tested, documented, and permission-synchronized in main.
- Files created: this task-record update only.
- Files modified: none in src/.
- Database changes: none.
- API changes: none.
- Permission changes: none.
- Swagger changes: none.
- Tests: full suite executed - 52/52 passed (13 suites).
- Validation results: npm ls PASS, tsc --noEmit PASS, eslint --max-warnings=0 PASS, prettier --check PASS, Swagger JSON parses with zero unresolved refs, seed-route sync byte-verified.
- Commit message: docs(tasks): reconcile chasha-be-task-008 with completed role update
- Remaining issues: pre-existing list-option guard module typo ('platoform-admin-role') still open - operator decision pending; HTTP-level integration tests deferred until an approved harness exists.
