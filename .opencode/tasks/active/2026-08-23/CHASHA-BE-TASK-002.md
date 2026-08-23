# CHASHA-BE-TASK-002 — Implement Platform Admin Role Detail API

## Metadata

- **Task ID:** CHASHA-BE-TASK-002
- **Type:** Feature
- **Priority:** High
- **Status:** Backlog
- **Domain:** Authorization
- **Module:** Authorizations
- **Dependencies:** CHASHA-BE-TASK-001

---

## Context

Platform-admin role management requires a detail operation so an authorized platform administrator can retrieve the complete information of a specific role.

The repository already contains platform-admin role lookup infrastructure, including the existing `find-platform-admin-role-by-id` repository and application query. The task is to expose this existing capability through the authorization presentation layer while following the project's established validation, authentication, authorization, response, and error-handling conventions.

The implementation must not duplicate existing role lookup logic.

---

## Objective

Implement the platform-admin role detail API that allows an authenticated and authorized platform administrator to retrieve a specific platform-admin role by its identifier.

---

## Scope

### In Scope

- Platform-admin role detail API.
- Reuse or completion of the existing role-by-ID query flow.
- Request DTO.
- Request validation.
- Controller.
- Route.
- Authentication.
- Authorization.
- Dedicated permission and permission seed synchronization.
- Response DTO.
- Not-found handling.
- Swagger/OpenAPI documentation.
- Relevant tests.

### Out of Scope

- Role creation.
- Role update.
- Role deletion.
- Adding permissions to a role.
- Removing permissions from a role.
- Role list implementation.
- Role list-option implementation.
- Database schema changes unless repository inspection proves they are strictly required.

---

## Technical Requirements

- Add the platform-admin role detail endpoint under the existing authorization route hierarchy:

  `POST /admin/authz/role/detail`

- The role identifier must be received according to the existing Chasha Backend convention used by detail endpoints.
- Validate the request using the existing validation middleware and validation-message system.
- Require the existing platform-admin authentication middleware.
- Require a dedicated permission for viewing platform-admin role details.
- Synchronize the required permission with the authorization permission seed.
- Reuse the existing `find-platform-admin-role-by-id` application query and repository contract where applicable.
- Return the project's standard success response envelope.
- Return the existing not-found exception/response when the requested role does not exist.
- Follow the existing response DTO conventions.
- Keep all response and validation messages consistent with the existing translation/message system.
- Synchronize Swagger/OpenAPI with the implemented endpoint.
- Do not bypass the application and domain layers from the controller.

---

## Implementation Guidance

- Inspect the existing:

  `modules/v1/platform-admins/application/queries/platform-admin-role/find-platform-admin-role-by-id.query.ts`

- Inspect the existing:

  `modules/v1/platform-admins/infrastructure/repositories/platform-admin-role/find-platform-admin-role-by-id.repository.ts`

- Inspect the corresponding repository contract before creating or modifying contracts.
- Inspect existing detail endpoints, especially the Early Access Request detail flow, for:
  - request-body conventions
  - validation
  - not-found handling
  - result mapping
  - response DTO structure
  - controller structure
- Inspect existing platform-admin authorization routes and permission guards.
- Follow the existing permission seed structure.
- Inspect the current Swagger/OpenAPI document before modifying it.
- Reuse existing abstractions instead of introducing duplicate role lookup logic.

---

## Acceptance Criteria

- [ ] `POST /admin/authz/role/detail` is registered under the existing platform-admin authorization route hierarchy.
- [ ] A valid existing role identifier returns the expected platform-admin role detail.
- [ ] The endpoint requires platform-admin authentication.
- [ ] An unauthenticated request is rejected using the existing authentication mechanism.
- [ ] A platform administrator without the required permission is rejected using the existing authorization mechanism.
- [ ] Invalid request data is rejected using the existing validation mechanism.
- [ ] A nonexistent role returns the project's standard not-found response.
- [ ] The endpoint uses the existing role-by-ID application/repository flow where applicable.
- [ ] The response follows the project's standard API response structure.
- [ ] The required permission is present and synchronized in the permission seed.
- [ ] Swagger/OpenAPI accurately documents the endpoint and resolves without broken references.
- [ ] Existing role list and list-option behavior remains unaffected.
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

---

## Testing Requirements

- [ ] Successful retrieval of an existing platform-admin role.
- [ ] Invalid/missing role identifier.
- [ ] Nonexistent role identifier.
- [ ] Unauthenticated request.
- [ ] Authenticated platform administrator without the required permission.
- [ ] Verification that the expected response envelope is returned.
- [ ] Verification that the existing role lookup flow is used without regression.

---

## Documentation Requirements

- Swagger/OpenAPI synchronization is required.
- No separate architecture documentation changes are required.

---

## Commit

### Recommended Commit Message

`feat(authz): add platform admin role detail`

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

- Do not invent additional role fields. Derive the response from the existing platform-admin role domain model and established API conventions.
- Do not create a duplicate `find-by-id` query or repository if the existing implementation is sufficient.
- If the existing role-by-ID query does not expose information required by the established role-detail behavior, inspect related entities and repository patterns before deciding whether an extension is required.
