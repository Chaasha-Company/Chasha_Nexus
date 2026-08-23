# Authentication & Authorization

## Purpose

Protect every externally reachable behavior with the codebase's two-layer model:
session-backed authentication per actor family, then DB-driven permission triples per
route. Repo policy: `../../rules/security-rules.md`; architecture facts:
`../../context/architecture-context.md` (Authorization section).

## When This Skill Applies

- Any task touching login/logout/refresh/session flows, tokens, cookies, or auth middlewares.
- Adding or modifying any protected endpoint (guard + permission seed work is mandatory).
- Reviewing authorization for new business resources or actor families.

## Responsibilities

- Determine per endpoint: who accesses it, which auth middleware family applies
  (`requirePlatformAdminAuthMiddleware` vs `requireBusinessEmployeeAuthMiddleware`),
  and the exact permission triple (`module`, `PermissionResourceEnum`, `PermissionActionEnum`).
- Keep permissions synchronized: seed row keyed `<module>.<resource-slug>.<action>`
  (subject/module/resource/action/version + bilingual labels) plus role-permission
  assignment, in the same task as the route.
- Preserve session validation semantics in auth middlewares: JWT verification,
  `auth_token_type` check, DB session existence/active/not-expired/not-revoked.
- Treat frontend authorization as UX only — never as a security control.
- Flag security-adjacent known risks when working nearby (hardcoded dev OTP check in admin
  login verify; `super_admin` grant-all role-permission seed marked temporary test data)
  without fixing them outside a task.

## Required Knowledge

- Chasha token mechanics: short-lived access JWT + refresh JWT; cookies `Access_Token-V1`
  / `Refresh_Token-V1` or `Authorization: Bearer`; refresh tokens stored bcrypt-hashed
  with IP/user-agent; sessions revocable (`revoked_at`).
- Admin OTP flow (phone+password → cached OTP session via node-cache → verify → tokens)
  versus employee password flow — including their different exposure surfaces.
- RBAC concepts (roles, permissions, subjects) and how Chasha's guard resolves them from
  DB rows rather than Casbin at runtime; Casbin exists but is unused by routes — do not
  wire or remove it without approval.
- Resource ownership: employee-scoped data must be checked against
  `auth_token_business_id` relationships in handlers.

## Repository Inspection

1. The route's mount chain: does its prefix already carry the family auth middleware?
2. Existing permission seeds and enums for the target module before adding values.
3. Sibling guards' triple usage to keep module strings byte-identical with seeds.
4. Session repositories involved (platform-admin-sessions / business-employee-sessions).

## Validation

- Protected route ⇒ guard present with seeded, assigned permission; public route ⇒ no
  accidental guard or auth requirement drift.
- Token-type enforcement cannot let one family's token authenticate the other surface.
- No new secret material hardcoded; expiry/TTL values come from env configuration.

## Common Failure Modes

- Guard module string differing by one character from the seed's `permissionModule`.
- Adding a permission but forgetting role assignment (endpoint unusable), or granting to
  broad roles without operator sign-off.
- Ownership checks omitted on business-scoped reads/writes (IDOR).
- Treating a valid access token as sufficient without the DB-session check.

## Anti-Patterns

- Client-side-only gating for sensitive actions.
- Per-endpoint bespoke authorization logic where the triple model fits.
- Disabling auth/guard middleware "temporarily" for testing and committing it.
- Storing raw refresh tokens or OTPs, logging credentials/tokens.

## Engineering Expectations

Every endpoint ships with an explicit, documented answer to: who, authenticated how,
permitted by what, owning which resources. Authorization gaps are release blockers.

## Definition of Done

- AuthN/AuthZ checklist (security-rules) passes; permissions seeded + assigned + guarded;
  review question 5 ("authorization gaps?") answered yes-safe with evidence.
