# CHASHA-BE-TASK-017 — Complete Platform Admin & Business Employee Authentication and Authorization

## Metadata

- **Task ID:** CHASHA-BE-TASK-017
- **Type:** Feature
- **Priority:** High
- **Status:** Backlog
- **Domain:** Authentication & Authorization
- **Module:** Backend / Authentication + Authorization
- **Dependencies:** CHASHA-BE-TASK-016 (stabilize super admin seed)
- **Required Skills:** Backend Engineering; Authentication & Authorization; API Engineering; Persistence; Security; Testing

---

## Context

`existing-behavior`: The backend already has the building blocks for both actor families:

- Platform Admin authentication: OTP-based login with phone + password + OTP (`src/modules/v1/authentications`), platform admin sessions, JWT access/refresh tokens, `requirePlatformAdminAuthMiddleware`, and permission guard middleware.
- Business Employee authentication: direct password login, forgot/reset-password handlers, business employee sessions, JWT access/refresh tokens, `requireBusinessEmployeeAuthMiddleware`, and business permission guard middleware.
- Authorization model: DB-driven permissions (`module`, `resource`, `action`, `subject`), role-permission assignments, and guards consumed by the existing admin/business authz routers.

`existing-rule`: The project already enforces a permission triple model (`module` string, `PermissionResourceEnum`, `PermissionActionEnum`) and requires route guard + seed + role assignment to stay synchronized.

`existing-rule`: Authentication middleware must verify JWT signature/expiry, enforce the `auth_token_type` claim, and validate the DB session (active, not expired, not revoked). Business endpoints must also enforce business ownership where applicable.

`existing-rule`: Casbin is initialized at boot but not used by routes; do not introduce Casbin checks without explicit operator approval.

The current state is **functional primitives, but no coherent end-to-end auth/authz surface** for either actor family. Some pieces are mocked/commented, some flows are incomplete, and some guarded routes/permission seeds may be missing or out of sync. This task is about making the auth/authz system complete and consistent, not inventing a new one.

---

## Objective

Complete the Authentication and Authorization system for both Platform Admins and Business Employees so either actor can authenticate, refresh, logout, and access protected endpoints guarded by correct permissions that are seeded and assigned.

---

## Scope

### In scope

**Platform Admin Auth/AuthZ**

- Verify/fix the OTP login flow end to end (login with phone → create/verify OTP session → issue access + refresh tokens → store hashed refresh token + session → return tokens/cookies for web/mobile).
- Verify/fix refresh token rotation (verify refresh token, check session, compare stored hashed refresh token, rotate, update session activity/expiry, set new cookies/tokens).
- Verify/fix logout (revoke session, invalidate refresh token, clear cookies for web).
- Verify/fix auth status endpoint (`/me`) behavior.
- Verify/fix platform admin authorization: permission guards on all protected platform admin endpoints, permission seeds present, `super_admin` role assignment deterministic and no longer blanket grant-all from temporary test-data logic.
- Ensure permission triple on each protected platform admin route matches a seeded permission row and a role assignment.
- Clean up any dead/commented auth code paths that are truly unused, but **do not** remove intentional feature scaffolding.

**Business Employee Auth/AuthZ**

- Verify/fix business login flow (phone + password → issue tokens + session + hashed refresh token).
- Verify/fix business refresh token rotation.
- Verify/fix business logout.
- Verify/fix business auth status endpoint behavior.
- Verify/fix forgot-password flow end to end (request reset → store hashed reset token/session → send SMS via MeliPayamak consumer → verify reset token → update password + revoke usable sessions).
- Verify/fix business authorization: permission guards on protected business endpoints, permission seeds present, business role assignments correct.
- Ensure business ownership checks exist where a business-scoped resource is accessed.

**Shared correctness**

- JWT sign/verify behavior must be consistent and usable by auth middleware and refresh handlers (investigate and fix the current sign `{ exp, data: payload }` vs verify returning the raw decoded object so callers read `auth_token_type` correctly).
- Session expiry/normalization must be consistent across login and refresh paths (the two paths currently use different ms/expiry conventions).
- Token/session/OTP must never be logged.
- All secrets remain env-driven; no hardcoded credentials committed.

### Out of scope

- New business features unrelated to auth/authz.
- Casbin enforcement on routes (initialized but unused by design).
- Re-architecting the existing module anatomy; reuse existing patterns.

---

## Current project state notes for the implementer

- Auth modules live under `src/modules/v1/authentications`, with separate admin vs business routes/controllers/validations, auth middlewares under `presentation/middlewares/platform-admin` and `.../business`, and infrastructure providers/JWT under `infrastructure/providers/jwt`.
- Authorization guards and enums live under `src/modules/v1/authorizations`.
- Platform admin roles/permissions and business roles/permissions are implemented in their respective modules; platform admin role-permission seeds currently carry temporary test-data comments and a blanket grant-all behavior that should be replaced/stabilized as part of (or after) TASK-016.
- Existing known issues to resolve here or in TASK-016 coordination:
  - JWT sign wraps payload as `{ exp, data }` but verify returns the whole decoded object, so `auth_token_type` reads as `undefined` in middleware/refresh consumers.
  - Login handlers set session expiry using `EnvValueConfig.JWT_REFRESH_TOKEN_EXPIRES_AT` as raw ms; refresh handlers wrap it with `ms(...)`. These units/conventions must be normalized.
  - `super_admin` seed carries temporary test-data comments and blanket grant-all; replace with deterministic behavior.
  - Business forgot-password flow has an incomplete/unreachable reset-token delivery path; complete it.

---

## Technical requirements

- Reuse existing project patterns: curried repository factories, handler-as-service, translator-based messages, shared exception factories, shared response helpers, Zod strict validations, permission triple guards.
- Auth/refresh/forgot-password sensitive endpoints must keep per-route rate limiting where appropriate.
- JWT tokens must be signed/verified consistently; middleware and refresh consumers must read the payload the same way.
- Refresh tokens must be stored bcrypt-hashed; sessions must be validated for active/expiry/revoked.
- Business-scoped resources must enforce ownership (employee `auth_token_business_id` → target business) where applicable.
- No `any` without justification; no suppressed errors; no hardcoded secrets.

---

## Acceptance criteria

- [ ] Platform admin: login, OTP verify, resend OTP, refresh token, logout, and auth-status behave correctly end to end and are internally consistent.
- [ ] Business employee: login, refresh token, logout, auth-status, and forgot-password/verify flows behave correctly end to end and are internally consistent.
- [ ] JWT sign/verify behavior is consistent and usable; middleware/refresh consumers can read `auth_token_type` and session id reliably.
- [ ] Session expiry handling is normalized across login and refresh paths.
- [ ] Every protected platform admin route has a correct permission guard, and the triple matches seeded permissions + role assignment.
- [ ] Every protected business route has the correct guard/ownership behavior and seeded permissions where applicable.
- [ ] Super admin role-permission initialization is deterministic and no longer the temporary blanket grant-all marked as test data.
- [ ] No hardcoded credentials, OTPs, or secrets committed.
- [ ] All quality gates pass.

---

## Validation

- `npm run npm:check` + `npm run lint` green.
- Functional verification of each flow above via the existing dev harness (request/response inspection), plus tests where required.
- Grep confirms no hardcoded dev OTP/credential remains; no leftover temporary-test-data flags unresolved.

---

## Testing requirements

- Unit tests for auth command/query handlers where behavior is non-trivial (OTP verify correctness, token issuance, session checks, refresh rotation branches, forgot-password token handling).
- Validation tests for new/changed schemas if any.
- Existing suite remains green.

---

## Documentation requirements

- Swagger/OpenAPI: synchronize any changed endpoint behavior/status codes with `src/config/open-api/document/base/en-base-config.config.json`.
- Permission seeds: update/confirm seed rows and role assignments as part of implementation.
- `.opencode/context/` updates if auth/authz conventions change materially.

---

## Implementation notes

- Inspect existing handlers/providers/middlewares first; do not assume current bug-compensating code is correct.
- If you find other real bugs while implementing auth/authz, fix them directly; this is not a reporting-only task.
- Coordinate with TASK-016 if super admin seed stabilization is not yet done; describe any remaining dependency in the final report.

---

## Definition of Done

- [ ] Platform admin auth flows complete and consistent
- [ ] Business employee auth flows complete and consistent
- [ ] JWT sign/verify behavior consistent
- [ ] Session expiry handling normalized
- [ ] All protected routes guarded and permission seeds/assignments synchronized
- [ ] Super admin seed strategy no longer temporary blanket grant-all
- [ ] No hardcoded secrets/OTPs
- [ ] Tests added/fixed where required
- [ ] Swagger/OpenAPI updated where applicable
- [ ] `npm:check` + `lint` green
- [ ] One Conventional Commit created

---

## Commit

Recommended: `feat(auth): complete platform admin and business employee authentication and authorization`

---

## Task Storage

.opencode/tasks/backlog/2026-09-01/CHASHA-BE-TASK-017.md

---

## Final report

(empty until completion)
