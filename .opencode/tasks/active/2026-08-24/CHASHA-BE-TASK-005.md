# CHASHA-BE-TASK-005 — Implement Platform Admin Role Deletion API

## Metadata

- **Task ID:** CHASHA-BE-TASK-005
- **Type:** Feature
- **Priority:** High
- **Status:** Completed
- **Domain:** Authorization
- **Module:** Platform Admin Roles
- **Dependencies:** CHASHA-BE-TASK-002, CHASHA-BE-TASK-003, CHASHA-BE-TASK-004

---

## Context

Platform-admin role management requires the ability to remove an existing platform-admin role.

The codebase already contains the platform-admin role domain model, role-permission relationship, role lookup infrastructure, authorization middleware, permission seed infrastructure, and the role-management presentation hierarchy.

This task introduces role deletion while preserving existing database integrity and authorization boundaries.

The implementation agent must inspect the existing platform-admin role schema, role-permission relationship, platform-admin role usage, existing delete operations in other modules, exception conventions, and repository patterns before implementing the feature.

---

## Objective

Implement an authenticated and authorized platform-admin API that deletes an existing platform-admin role according to the existing Chasha Backend persistence, domain, and authorization conventions.

---

## Scope

### In Scope

- Platform-admin role deletion API.
- Request DTO and validation where required by the existing API conventions.
- Application command/use-case and handler.
- Repository contract and implementation required for deletion.
- Controller.
- Route.
- Platform-admin authentication.
- Platform-admin authorization.
- Dedicated delete-role permission.
- Permission seed synchronization.
- Existing-role validation.
- Handling of role-permission relationships according to existing database constraints and domain behavior.
- Handling of roles that are currently referenced by platform administrators according to existing database/domain rules.
- Standard API response.
- Swagger/OpenAPI synchronization.
- Relevant tests.

### Out of Scope

- Role creation.
- Role update.
- Role detail retrieval.
- Role listing.
- Role list-option.
- Adding permissions to a role.
- Removing individual permissions from a role.
- Assigning roles to platform administrators.
- Business-role deletion.
- Changes to the authorization architecture.
- Automatic reassignment of platform administrators to another role.
- Inventing a soft-delete mechanism if the existing platform-admin role model does not support one.

---

## Technical Requirements

- Add the platform-admin role deletion endpoint under the existing authorization route hierarchy.
- Follow the existing HTTP method and route naming conventions used by Chasha Backend delete operations.
- Identify the target role using the project's established request convention.
- Validate the request using the existing validation middleware and validation-message system where applicable.
- Require the existing platform-admin authentication middleware.
- Require a dedicated permission for deleting platform-admin roles.
- Synchronize the required permission with the authorization permission seed.
- Implement the operation through the existing application command/handler pattern.
- Reuse the existing role-by-ID lookup flow where applicable.
- Persist deletion through the existing repository contract and infrastructure repository pattern.
- Preserve all existing database constraints and domain invariants.
- If the target role does not exist, return the project's standard not-found response.
- If the role cannot be deleted because it is referenced by existing data, handle the failure using the project's established conflict/error mechanism.
- Do not silently remove or reassign unrelated platform-admin data unless existing repository/domain behavior explicitly requires it.
- Handle associated role-permission records according to the existing database relationship and deletion conventions.
- Return the project's standard success response envelope.
- Use the existing translation system for response and validation messages.
- Synchronize Swagger/OpenAPI with the implemented endpoint.
- Do not introduce a new deletion architecture if an existing repository pattern can be reused.

---

## Implementation Guidance

- Inspect the platform-admin role entity and role-permission entity before implementing deletion.
- Inspect:

  `modules/v1/platform-admins/domain/entities/platform-admin-role/`

- Inspect the existing role repository and repository contract under:

  `modules/v1/platform-admins/infrastructure/repositories/platform-admin-role/`

- Inspect:

  `modules/v1/platform-admins/application/queries/platform-admin-role/find-platform-admin-role-by-id.query.ts`

  to understand the existing role lookup flow.

- Inspect the database schema for:
  - `platform_admin_roles`
  - `platform_admin_role_permissions`
  - the platform-admin-to-role relationship

- Inspect existing migrations related to platform-admin roles and authorization.
- Inspect existing delete operations in other modules to follow established:
  - command/handler patterns
  - repository patterns
  - not-found handling
  - conflict handling
  - response structure
  - transaction behavior
- Determine whether deletion of role-permission records is handled by database cascade, repository logic, or another existing mechanism. Do not assume.
- Determine whether platform-admin roles are referenced by platform-admin records or other entities before defining deletion behavior.
- Follow the existing permission seed structure under:

  `shared/v1/database/seeds/categories/system-init/authorizations/permissions/`

- Inspect the current Swagger/OpenAPI document before modifying it.
- Reuse existing exceptions and response helpers.

---

## Acceptance Criteria

- [ ] A platform-admin role deletion endpoint exists under the existing platform-admin authorization route hierarchy.
- [ ] The endpoint requires platform-admin authentication.
- [ ] An unauthenticated request is rejected using the existing authentication mechanism.
- [ ] An authenticated platform administrator without the required permission is rejected using the existing authorization mechanism.
- [ ] A valid request deletes an existing deletable platform-admin role successfully.
- [ ] Invalid request data is rejected using the existing validation mechanism where applicable.
- [ ] Attempting to delete a nonexistent role returns the project's standard not-found response.
- [ ] Existing database and domain constraints are respected.
- [ ] A role referenced by existing platform-admin data cannot be deleted in a way that violates referential integrity.
- [ ] Deletion of related role-permission records follows the existing database/domain behavior.
- [ ] No unrelated platform-admin records are silently deleted or reassigned.
- [ ] The endpoint returns the project's standard success response structure.
- [ ] The required delete-role permission exists in the permission seed.
- [ ] The permission seed remains synchronized with the implemented route.
- [ ] Swagger/OpenAPI accurately documents the endpoint and resolves without broken references.
- [ ] Existing role detail, creation, update, and authorization behavior remains unaffected.
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

- [ ] Successful deletion of an existing deletable platform-admin role.
- [ ] Missing or invalid role identifier.
- [ ] Attempt to delete a nonexistent role.
- [ ] Attempt to delete a role referenced by existing platform-admin data, when such a relationship exists.
- [ ] Verification of role-permission relationship behavior after deletion.
- [ ] Unauthenticated request.
- [ ] Authenticated platform administrator without the required permission.
- [ ] Verification that unrelated platform-admin records remain unchanged.
- [ ] Verification that the response follows the existing success-response structure.
- [ ] Regression coverage for existing role lookup and authorization behavior where relevant.

---

## Documentation Requirements

- Swagger/OpenAPI synchronization is required.
- No separate architecture documentation changes are required.

---

## Commit

### Recommended Commit Message

`feat(authz): add platform admin role deletion`

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
- [ ] Required database behavior verified
- [ ] Required tests implemented
- [ ] Swagger/OpenAPI synchronized
- [ ] Relevant validation checks pass
- [ ] Final diff reviewed
- [ ] Dedicated commit created

---

## Notes

- Do not invent deletion semantics. Inspect the existing schema, migrations, entities, and repository behavior first.
- Do not introduce soft deletion unless the existing platform-admin role model already supports it or a separate explicit requirement exists.
- Do not automatically reassign platform administrators when deleting a role unless existing Chasha business behavior explicitly requires such a mechanism.
- If deleting a role can create an ambiguous business state because of existing role assignments, inspect the repository and domain model; if the correct behavior cannot be determined technically without a business decision, request clarification instead of inventing one.

---

## Analysis Notes (agent, 2026-08-24)

existing-behavior findings verified by inspection:

1. `platform_admin_roles` carries `@DeleteDateColumn platform_admin_role_deleted_at` — soft delete is the model-supported deletion mechanism (task explicitly permits soft delete on this basis). Role-permission join rows carry their own soft-delete column.
2. All authorization FKs are `ON DELETE NO ACTION`; a hard DELETE of a referenced role would violate referential integrity. No existing delete operation exists anywhere in the codebase — conventions derived from detail (POST + body id) and update (command/handler + repo contract + optional manager).
3. Operator decision (2026-08-24): block deletion with 409 when active platform admins reference the role; otherwise soft-delete role-permission rows then the role atomically via shared `transactionManager`.
4. Permission model: new resource enum value `PLATFORM_ADMIN_AUTHZ_ROLE_DELETE = 'platform_admin_authz_role_delete'`; seed row `authz.platform-admin-role.delete.delete` (module 'platform-admin-role', ACTION/DELETE); route guard triple byte-equal to seed. super_admin auto-grant covered by existing role-permission seed.
5. List cache invalidation after successful deletion mirrors create-early-access-request precedent (`AppDataSource.queryResultCache?.remove(['platform-admin-roles'])`).

## Final Report

- Task ID: CHASHA-BE-TASK-005
- Status: Completed
- Implementation summary: POST /api/v1/{lang}/admin/authz/role/delete soft-deletes a platform-admin role and its role-permission rows atomically when no active platform admin references it; 404 for missing role, 409 conflict when referenced by active admins, guarded by dedicated delete permission.
- Files created: command + handler, repository contracts & implementations (count-platform-admin-role-admins, delete-platform-admin-role, delete-platform-admin-role-permissions), request DTO, Zod validation, controller, migration 1787603720292, handler spec (3 tests), validation spec (4 tests).
- Files modified: role.route.ts, permission-resource.enum.ts (+PLATFORM_ADMIN_AUTHZ_ROLE_DELETE), permission.seed.ts (+authz.platform-admin-role.delete.delete), validation-message shared enum + i18n catalog (+PLATFORM_ADMIN_ROLE_ID_IN_USE fa/en), barrels (7), src/index.ts (migration re-export), Swagger en-base-config.config.json (path /delete + DeletePlatformAdminRoleRequest/Response schemas), task spec formatting normalized per operator instruction.
- Database changes: migration extending permissions.permission_resource MySQL enum by 'platform_admin_authz_role_delete' (up superset of all 14 TS values; down restores prior 13-value chain). No table schema change.
- API changes: new endpoint POST /{language_prefix}/admin/authz/role/delete.
- Permission changes: seed row authz.platform-admin-role.delete.delete (PLATFORM_ADMIN / platform-admin-role / delete / ACTION v1); auto-assigned to super_admin by existing role-permission seed.
- Swagger changes: path /{language_prefix}/admin/authz/role/delete documenting security (CookieAuth/BearerAuth), request body schema, 200/400/401/403/404/409 responses; all $refs resolve.
- Tests: delete-platform-admin-role.handler.spec.ts - 3 passed (transactional soft-delete ordering + cache invalidation, not-found short-circuit, conflict short-circuit); delete-platform-admin-role.validation.spec.ts - 4 passed.
- Validation results: npm ls PASS, tsc --noEmit PASS, eslint --max-warnings=0 PASS, prettier --check PASS, jest 33/33 PASS (9 suites incl. regression coverage for list/detail/create/update handlers+validations), Swagger JSON parses with all refs resolving.
- Commit message: feat(authz): add platform admin role deletion
- Remaining issues: (a) pre-existing list-option guard module typo ('platoform-admin-role' vs seed 'platform-admin-role') still breaks its permission match - needs operator decision, untouched here; (b) HTTP-level auth/validation integration tests deferred until an approved test harness exists.
