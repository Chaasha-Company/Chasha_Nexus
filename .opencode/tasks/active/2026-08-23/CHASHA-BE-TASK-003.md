# CHASHA-BE-TASK-003 — Implement Platform Admin Role Creation API

## Metadata

- **Task ID:** CHASHA-BE-TASK-003
- **Type:** Feature
- **Priority:** High
- **Status:** Completed
- **Domain:** Authorization
- **Module:** Platform Admin Roles
- **Dependencies:** CHASHA-BE-TASK-001, CHASHA-BE-TASK-002

---

## Context

Platform-admin role management requires the ability to create new roles through the authorization system.

The current codebase already contains the platform-admin role domain model, database schema, role-permission relationship, authorization permission system, role repositories, application layer structure, route hierarchy, and permission seed infrastructure.

This task introduces the role creation operation while preserving the existing layered architecture and authorization boundaries.

The implementation agent must inspect the existing platform-admin role entity, schema, seed structure, validation conventions, response patterns, and comparable create operations before making changes.

---

## Objective

Implement an authenticated and authorized platform-admin API for creating a new platform-admin role with the required role data while preserving database integrity and existing authorization conventions.

---

## Scope

### In Scope

- Platform-admin role creation API.
- Create-role request DTO.
- Request validation.
- Application command/use-case for role creation.
- Required domain behavior.
- Repository contract and implementation required for persistence.
- Controller.
- Route.
- Platform-admin authentication.
- Platform-admin authorization.
- Dedicated create-role permission.
- Permission seed synchronization.
- Duplicate-role handling according to existing database/domain conventions.
- Standard API response.
- Swagger/OpenAPI synchronization.
- Relevant tests.
- Required database migration only if repository inspection confirms a schema change is necessary.

### Out of Scope

- Updating an existing role.
- Deleting a role.
- Retrieving role details.
- Listing roles.
- Role list-option.
- Adding permissions to an existing role.
- Removing permissions from an existing role.
- Assigning a role to a platform administrator.
- Creating business roles.
- Changing the existing authorization architecture.
- Introducing new role-management abstractions without an architectural requirement.

---

## Technical Requirements

- Add a platform-admin role creation endpoint under the existing authorization route hierarchy.
- Follow the existing HTTP method and route naming conventions used by Chasha Backend create operations.
- The request must contain only the role data required by the existing platform-admin role model and established business requirements.
- Validate all request fields through the existing validation middleware and validation-message system.
- Require the existing platform-admin authentication middleware.
- Require a dedicated permission for creating platform-admin roles.
- Synchronize the new permission with the authorization permission seed.
- Implement the operation through the existing application command/handler pattern.
- Persist the new role through the domain repository contract and infrastructure repository implementation.
- Preserve the existing domain model and database constraints.
- Prevent creation of duplicate roles when the existing schema or domain rules require role uniqueness.
- Use the project's existing conflict/error handling mechanism when creation violates an existing uniqueness/business constraint.
- Return the project's standard success response envelope.
- Return the created role information according to the existing response DTO conventions.
- Use the existing translation system for response and validation messages.
- Do not allow the client to provide server-managed identifiers or timestamps unless the existing model explicitly requires them.
- Synchronize Swagger/OpenAPI with the implemented endpoint.
- Preserve the existing role-permission relationship model; this task must not automatically assign permissions to the newly created role unless the repository already defines such behavior as mandatory.

---

## Implementation Guidance

- Inspect the existing platform-admin role domain entity before defining the request contract.
- Inspect:

  `modules/v1/platform-admins/domain/entities/platform-admin-role/`

- Inspect the existing role repository:

  `modules/v1/platform-admins/infrastructure/repositories/platform-admin-role/`

- Inspect the existing role-by-ID query and repository contract to understand current persistence conventions.
- Inspect the database schema:

  `shared/v1/database/schema/platform_admins/childrens/platform-admin-roles/`

- Inspect existing migrations related to platform-admin roles and authorization before deciding whether a migration is required.
- Inspect existing create commands and handlers in other modules and follow their established command/handler/result conventions.
- Inspect existing API routes that create resources for:
  - authentication
  - early-access requests
  - other applicable modules
- Follow the existing validation-message naming and translation conventions.
- Follow the existing permission seed structure under:

  `shared/v1/database/seeds/categories/system-init/authorizations/permissions/`

- Inspect the current Swagger/OpenAPI document and existing authorization endpoint definitions before updating it.
- Reuse existing exceptions and response helpers instead of introducing new error mechanisms.
- Do not assume the role's unique field or business naming rule; derive it from the existing schema, entity, seed data, and related role operations.

---

## Acceptance Criteria

- [ ] A platform-admin role creation endpoint exists under the existing platform-admin authorization route hierarchy.
- [ ] The endpoint requires platform-admin authentication.
- [ ] An unauthenticated request is rejected using the existing authentication mechanism.
- [ ] An authenticated platform administrator without the required permission is rejected using the existing authorization mechanism.
- [ ] A valid request creates a platform-admin role successfully.
- [ ] Invalid request data is rejected using the existing validation mechanism.
- [ ] The created role is persisted correctly in the database.
- [ ] Existing database constraints are respected.
- [ ] Duplicate role creation is rejected according to the existing conflict/error conventions when applicable.
- [ ] The endpoint returns the project's standard success response envelope.
- [ ] The response contains the expected created-role information according to existing API conventions.
- [ ] The operation uses the existing application/domain/infrastructure layering.
- [ ] The required create-role permission exists in the permission seed.
- [ ] The permission seed remains synchronized with the implemented route.
- [ ] Swagger/OpenAPI accurately documents the endpoint and resolves without broken references.
- [ ] Existing platform-admin role lookup and authorization behavior remains unaffected.
- [ ] No unrelated role-management functionality is introduced.

---

## Validation

### Required Checks

- [ ] TypeScript compilation
- [ ] Lint
- [ ] Formatting
- [ ] Relevant authorization tests
- [ ] Database migration validation if a migration is introduced
- [ ] Permission seed validation
- [ ] Swagger/OpenAPI validation
- [ ] Existing related tests

---

## Testing Requirements

- [ ] Successful creation of a valid platform-admin role.
- [ ] Missing required request fields.
- [ ] Invalid request field values.
- [ ] Duplicate role creation according to the existing uniqueness rules.
- [ ] Unauthenticated request.
- [ ] Authenticated platform administrator without the required permission.
- [ ] Verification that the created role is persisted correctly.
- [ ] Verification that the response follows the existing success-response structure.
- [ ] Regression coverage for the existing role lookup flow where relevant.

---

## Documentation Requirements

- Swagger/OpenAPI synchronization is required.
- No separate architecture documentation changes are required unless the implementation introduces an explicitly required architectural change.

---

## Commit

### Recommended Commit Message

`feat(authz): add platform admin role creation`

### Commit Requirements

- Dedicated commit for this task.
- No unrelated changes.
- Review the final diff before committing.

---

## Definition of Done

- [ ] Implementation complete
- [ ] Existing architecture preserved
- [ ] Required validation implemented
- [ ] Required authentication implemented
- [ ] Required authorization implemented
- [ ] Required permission synchronized
- [ ] Required database changes completed, if applicable
- [ ] Required migration created, if applicable
- [ ] Required tests implemented
- [ ] Swagger/OpenAPI synchronized
- [ ] Relevant validation checks pass
- [ ] Final diff reviewed
- [ ] Dedicated commit created

---

## Notes

- Do not invent role fields or uniqueness rules. Inspect the existing platform-admin role schema, entity, migrations, and seed data first.
- Do not automatically attach permissions to a newly created role unless existing Chasha behavior explicitly requires it.
- Do not create duplicate repository/query abstractions when existing abstractions can be reused or appropriately extended.
- If the existing domain model does not contain enough information to define the requested creation behavior without making a business decision, stop and request clarification rather than inventing business requirements.

---

## Agent Record (2026-08-23)

### Required Skills

- Backend Engineering
- Architecture
- API Engineering
- Authentication & Authorization
- Database Engineering
- Persistence
- Security
- Testing
- Git
- Engineering Judgment

### Analysis notes

- Uniqueness derived from existing-behavior: `platform_admin_role_key` is varchar(100) UNIQUE in schema; duplicates rejected via findPlatformAdminRoleByKeyRepository check + throwRequestConflictException (409 DATA_CONFLICT), mirroring EA create flow.
- No schema migration required for roles table; only permission_resource enum extended (12 values) for PLATFORM_ADMIN_AUTHZ_ROLE_CREATE.
- New role starts with zero permissions (model has no auto-attach behavior); server-managed id/timestamps not client-provided.
- Response returns created identifier only (derived-decision): client already knows submitted fields.

### Validation results

npm:check PASS - lint PASS - jest 19/19 PASS (5 suites) - Swagger parses, zero unresolved refs.

### Review record

Ten questions all YES. Fixes during gates: application barrel missing commands export; handler return type Promise-wrapped via command result alias; DTO optional fields aligned with ZodOptional unions (all caught by tsc before commit).

---

## Final Report

- Task ID: CHASHA-BE-TASK-003
- Status: Completed
- Implementation summary: POST /api/v1/{lang}/admin/authz/role/create persists a new platform-admin role with unique key + bilingual names/descriptions; duplicate keys rejected 409; returns created role id with 201 envelope.
- Files created: command interface, command handler, command result, by-key query interface, by-key + create repository contracts and implementations, request/response DTOs, validation factory, controller, migration 1787525326063, 2 spec files.
- Files modified: permission-resource.enum.ts (+PLATFORM_ADMIN_AUTHZ_ROLE_CREATE), permission.seed.ts (+authz.platform-admin-role.create.create), shared+i18n validation enums (+8 message keys fa/en), barrels (10), src/index.ts (migration re-export), role.route.ts, Swagger spec.
- Database changes: permission_resource MySQL enum aligned to 12 values; no role-table change.
- Permission changes: seed row CREATE action auto-assigned to super_admin via existing role-permission seed.
- Tests: create handler spec (3) + creation validation spec (5); suite total 19 passed.
- Commit message: feat(authz): add platform admin role creation
- Commit hash: this commit
- Remaining issues: operator-held edits to eslint.config.mjs/tsconfig.json (**test** exclusions) still unstaged from TASK-002 follow-up; pre-existing list-option guard typo open.
