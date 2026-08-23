# CHASHA-BE-TASK-004 — Implement Platform Admin Role Update API

## Metadata

- **Task ID:** CHASHA-BE-TASK-004
- **Type:** Feature
- **Priority:** High
- **Status:** Backlog
- **Domain:** Authorization
- **Module:** Platform Admin Roles
- **Dependencies:** CHASHA-BE-TASK-003

---

## Context

Platform-admin role management requires an update operation so an authorized platform administrator can modify the editable data of an existing platform-admin role.

The codebase already contains the platform-admin role domain model, role lookup infrastructure, authorization middleware, permission seed infrastructure, and role-related presentation structure.

This task adds the role update operation while preserving the existing application, domain, infrastructure, and presentation boundaries.

The implementation agent must inspect the existing role entity, database schema, role lookup flow, existing update commands in other modules, validation conventions, error handling, and API response patterns before implementing the feature.

---

## Objective

Implement an authenticated and authorized platform-admin API that updates the editable data of an existing platform-admin role while preserving existing authorization and database integrity rules.

---

## Scope

### In Scope

- Platform-admin role update API.
- Update-role request DTO.
- Request validation.
- Application command/use-case and handler.
- Required domain behavior.
- Repository contract and implementation required for persistence.
- Controller.
- Route.
- Platform-admin authentication.
- Platform-admin authorization.
- Dedicated update-role permission.
- Permission seed synchronization.
- Existing-role validation.
- Duplicate-role/conflict handling according to existing constraints.
- Standard API response.
- Swagger/OpenAPI synchronization.
- Relevant tests.

### Out of Scope

- Role creation.
- Role deletion.
- Role detail retrieval.
- Role listing.
- Role list-option.
- Adding permissions to a role.
- Removing permissions from a role.
- Assigning roles to platform administrators.
- Updating role permissions as part of role data update.
- Business-role management.
- Database schema changes unless repository inspection proves they are strictly required.
- Changes to the existing authorization architecture.

---

## Technical Requirements

- Add the platform-admin role update endpoint under the existing authorization route hierarchy.
- Follow the existing HTTP method and route naming conventions used by Chasha Backend update operations.
- The request must identify the target platform-admin role according to the existing Chasha Backend detail/update request conventions.
- Only fields that are actually editable according to the existing platform-admin role domain model and database constraints may be updated.
- Validate all request fields using the existing validation middleware and validation-message system.
- Require the existing platform-admin authentication middleware.
- Require a dedicated permission for updating platform-admin roles.
- Synchronize the required permission with the authorization permission seed.
- Implement the operation through the existing application command/handler pattern.
- Reuse the existing role-by-ID lookup flow where applicable.
- Persist changes through the existing repository contract and infrastructure repository pattern.
- Preserve existing database constraints and domain invariants.
- If the target role does not exist, return the project's standard not-found response.
- If the update violates an existing uniqueness constraint, return the project's standard conflict response.
- Return the project's standard success response envelope.
- Return the updated role information according to the existing response conventions when the established API pattern requires it.
- Use the existing translation system for response and validation messages.
- Do not allow modification of server-managed identifiers or fields that are not editable according to the existing domain model.
- Do not modify role-permission relationships through this endpoint.
- Synchronize Swagger/OpenAPI with the implemented endpoint.

---

## Implementation Guidance

- Inspect the existing platform-admin role entity before defining the update request contract.
- Inspect:

  `modules/v1/platform-admins/domain/entities/platform-admin-role/`

- Inspect the existing role repository and repository contract under:

  `modules/v1/platform-admins/infrastructure/repositories/platform-admin-role/`

- Inspect the existing:

  `find-platform-admin-role-by-id` query and repository flow.

- Inspect existing update commands and handlers, especially:

  `modules/v1/business-employees/application/commands/update-business-employee.command.ts`

  and its corresponding handler/repository implementation.

- Inspect the platform-admin role database schema and migrations before determining editable fields.
- Inspect existing update endpoints for:
  - request structure
  - validation
  - not-found handling
  - conflict handling
  - response structure
  - controller conventions
- Follow the existing permission seed structure under:

  `shared/v1/database/seeds/categories/system-init/authorizations/permissions/`

- Inspect the current Swagger/OpenAPI document before modifying it.
- Reuse existing exceptions, response helpers, validation utilities, and authorization middleware.
- Do not create duplicate role lookup or persistence abstractions if existing abstractions can be reused or appropriately extended.

---

## Acceptance Criteria

- [ ] A platform-admin role update endpoint exists under the existing platform-admin authorization route hierarchy.
- [ ] The endpoint requires platform-admin authentication.
- [ ] An unauthenticated request is rejected using the existing authentication mechanism.
- [ ] An authenticated platform administrator without the required permission is rejected using the existing authorization mechanism.
- [ ] A valid request successfully updates an existing platform-admin role.
- [ ] Invalid request data is rejected using the existing validation mechanism.
- [ ] Attempting to update a nonexistent role returns the project's standard not-found response.
- [ ] Updates respect all existing database and domain constraints.
- [ ] Duplicate/conflicting role data returns the project's standard conflict response when applicable.
- [ ] Only editable role fields can be changed through the endpoint.
- [ ] Role-permission relationships are not modified by this endpoint.
- [ ] The updated role is persisted correctly.
- [ ] The endpoint returns the project's standard success response structure.
- [ ] The required update-role permission exists in the permission seed.
- [ ] The permission seed remains synchronized with the implemented route.
- [ ] Swagger/OpenAPI accurately documents the endpoint and resolves without broken references.
- [ ] Existing role detail, list-option, and authorization behavior remains unaffected.
- [ ] No unrelated role-management functionality is introduced.

---

## Validation

### Required Checks

- [ ] TypeScript compilation
- [ ] Lint
- [ ] Formatting
- [ ] Relevant authorization tests
- [ ] Permission seed validation
- [ ] Swagger/OpenAPI validation
- [ ] Existing related tests

---

## Testing Requirements

- [ ] Successful update of an existing platform-admin role.
- [ ] Missing required request fields.
- [ ] Invalid request field values.
- [ ] Update request targeting a nonexistent role.
- [ ] Duplicate/conflicting role data where applicable.
- [ ] Unauthenticated request.
- [ ] Authenticated platform administrator without the required permission.
- [ ] Verification that only editable role fields are modified.
- [ ] Verification that role-permission relationships remain unchanged.
- [ ] Verification that updated data is persisted correctly.
- [ ] Verification that the response follows the existing success-response structure.
- [ ] Regression coverage for the existing role lookup flow where relevant.

---

## Documentation Requirements

- Swagger/OpenAPI synchronization is required.
- No separate architecture documentation changes are required.

---

## Commit

### Recommended Commit Message

`feat(authz): add platform admin role update`

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
- [ ] Required tests implemented
- [ ] Swagger/OpenAPI synchronized
- [ ] Relevant validation checks pass
- [ ] Final diff reviewed
- [ ] Dedicated commit created

---

## Notes

- Do not invent editable role fields. Determine them from the existing platform-admin role entity, schema, migrations, seed data, and established conventions.
- Do not modify role permissions as part of this task. Permission assignment/removal must remain a separate operation.
- Do not introduce a new architectural pattern when an existing update pattern can be reused.
- If the existing role model does not provide enough information to determine the editable fields without making a business decision, request clarification rather than inventing a business rule.
