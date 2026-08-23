# CHASHA-BE-TASK-001 — Implement Platform Admin Role List API

## Metadata

- **Task ID:** CHASHA-BE-TASK-001
- **Type:** Feature
- **Priority:** High
- **Status:** Backlog
- **Domain:** Authorization
- **Module:** Authorizations
- **Dependencies:** None

---

## Context

The Chasha Backend already contains the platform-admin role domain model, role repository structure, role queries, and an existing role `list-option` flow.

A complete platform-admin role management system requires a full role listing endpoint that can return roles using the project's standard list, pagination, search, and response conventions.

The existing platform-admin role list definitions under the `platform-admins` module should be treated as the reference for the required list behavior.

---

## Objective

Implement the platform-admin role list API that allows an authenticated and authorized platform administrator to retrieve a paginated list of platform-admin roles.

---

## Scope

### In Scope

- Platform-admin role list query/use-case.
- Repository contract and implementation required for retrieving the role list.
- Pagination.
- Existing role list search/filter behavior where applicable.
- Request DTO and validation.
- Controller.
- Route.
- Authentication.
- Authorization.
- Permission creation and seed synchronization.
- Response DTO.
- Swagger/OpenAPI documentation.
- Relevant tests.

### Out of Scope

- Role creation.
- Role detail.
- Role update.
- Role deletion.
- Adding permissions to a role.
- Removing permissions from a role.
- Changes to the platform-admin role database schema.
- Changes to the existing role `list-option` endpoint.

---

## Technical Requirements

- Add the platform-admin role list endpoint under the existing authorization route hierarchy:

  `GET /admin/authz/role/list`

- The endpoint must require the existing platform-admin authentication middleware.
- The endpoint must require a dedicated permission for viewing the platform-admin role list.
- The required permission must be synchronized with the authorization permission seed.
- Support pagination using the existing project pagination request and response conventions.
- Follow the existing platform-admin role list definitions:
  - `platform-admin-role-list.definition.ts`
  - `platform-admin-role-list.fields.ts`
  - `platform-admin-role-list.search.ts`
- Use the existing application query/handler architecture.
- Use the existing repository contract pattern between application and infrastructure.
- Use the project's existing validation and validation-message system.
- Use the project's standard success response envelope.
- Use the existing error handling mechanism.
- Return an empty paginated result when no roles match the requested criteria.
- Swagger/OpenAPI must accurately describe the endpoint, request parameters, response schema, authentication, and required authorization.
- Do not introduce a new architectural pattern for list handling.

---

## Implementation Guidance

- Inspect the existing `find-all-platform-admin-role.query.ts` before creating a new query.
- Inspect the existing `find-all-platform-admin-role.result.ts` and determine whether it can be reused or needs to be completed.
- Inspect the existing platform-admin role repository under:

  `modules/v1/platform-admins/infrastructure/repositories/platform-admin-role`

- Follow the list implementation pattern used by existing modules such as `early-access-requests`.
- Reuse the project's existing pagination helpers, DTOs, repository pagination types, and response handlers.
- Inspect the existing platform-admin permission routes and `permission-guard-platform-admin.middleware.ts`.
- Follow the existing permission seed structure under:

  `database/seeds/categories/system-init/authorizations/permissions`

- Inspect the current Swagger/OpenAPI document structure before modifying it.
- The implementation agent must inspect the repository before deciding whether existing queries, results, repositories, DTOs, or list definitions can be reused.

---

## Acceptance Criteria

- [ ] `GET /admin/authz/role/list` is registered under the existing platform-admin authorization route hierarchy.
- [ ] An authenticated platform administrator with the required permission can retrieve platform-admin roles.
- [ ] Unauthenticated requests are rejected using the existing authentication mechanism.
- [ ] Authenticated platform administrators without the required permission are rejected using the existing authorization mechanism.
- [ ] Pagination follows the project's existing pagination contract.
- [ ] The returned data follows the existing platform-admin role list definition.
- [ ] Existing role search/filter behavior is applied where defined by the repository.
- [ ] An empty result returns the project's standard empty paginated response.
- [ ] Invalid pagination or query input is rejected using the existing validation mechanism and message conventions.
- [ ] The endpoint uses the standard API success/error response structures.
- [ ] The required permission exists in the permission seed.
- [ ] Swagger/OpenAPI accurately represents the implemented endpoint.
- [ ] Existing role `list-option` behavior remains unaffected.
- [ ] No unrelated role-management functionality is implemented.

---

## Validation

### Required Checks

- [ ] TypeScript compilation
- [ ] Lint
- [ ] Formatting
- [ ] Relevant authorization tests
- [ ] Permission seed validation
- [ ] Swagger/OpenAPI validation

---

## Testing Requirements

- [ ] Successfully retrieve a paginated platform-admin role list.
- [ ] Verify pagination metadata and returned items.
- [ ] Verify empty-result behavior.
- [ ] Verify valid search/filter behavior where supported.
- [ ] Verify invalid pagination/query input.
- [ ] Verify unauthenticated access is rejected.
- [ ] Verify authenticated users without the required permission are rejected.
- [ ] Verify the required permission is correctly recognized by the authorization middleware.
- [ ] Verify existing role `list-option` functionality is not regressed.

---

## Documentation Requirements

- Swagger/OpenAPI synchronization is required.
- No separate architecture documentation changes are required.

---

## Commit

### Recommended Commit Message

`feat(authz): add platform admin role list`

### Commit Requirements

- Dedicated commit for this task.
- No unrelated changes.
- Review the final diff before committing.

---

## Definition of Done

- [ ] Implementation complete
- [ ] Existing architecture preserved
- [ ] Required validation implemented
- [ ] Required authorization implemented
- [ ] Required permission synchronized
- [ ] Required tests implemented
- [ ] Swagger/OpenAPI synchronized
- [ ] Relevant validation checks pass
- [ ] Final diff reviewed
- [ ] Dedicated commit created

---

## Notes

- Do not invent role fields, search fields, or filter fields. Derive them from the existing platform-admin role model and list definitions.
- Do not modify the database schema unless repository inspection proves that the requested list behavior cannot be implemented with the existing schema.
- The existing `list-option` functionality is separate from this task and must not be replaced or duplicated.
