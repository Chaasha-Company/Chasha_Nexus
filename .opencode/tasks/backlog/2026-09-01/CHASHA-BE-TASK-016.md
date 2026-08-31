# CHASHA-BE-TASK-016 — Stabilize Super Admin Seed & Hardcoded Credential

## Metadata

- **Task ID:** CHASHA-BE-TASK-016
- **Type:** Refactor / Security
- **Priority:** High
- **Domain:** Security / Data
- **Module:** Backend / Seeds
- **Status:** Planned
- **Dependencies:** None

---

## Context

`existing-behavior`: `src/shared/v1/database/seeds/categories/system-init/platform-admins/platform-admin.seed.ts` seeds a real platform admin with a **hardcoded plaintext password `erfan123456`** and a real phone number `09393929968` (lines 22–31). Password is stored via the model; encryption/validation is not performed here.

`existing-behavior`: `src/shared/v1/database/seeds/categories/system-init/authorizations/platform-admin-roles/platform-admin-role.seed.ts` (lines 1–2) and `.../role-permissions/platform-admin-role-permission.seed.ts` (lines 1–2) both carry the comment `// TODO: This seed contains temporary test data. Replace final authorization strategy.`

`existing-behavior`: `platform-admin-role-permission.seed.ts` grants **every** permission row to the `super_admin` role (`permissionRepository.find()` -> add all, lines 20–42). This is the "temporary grant-all" strategy.

`existing-rule`: `.opencode/context/engineering-context.md` lists "Stabilize `super_admin` permission seed (replace 'temporary test data' grant-all)" as a suggested backlog seed, and notes security-sensitive items (dev OTP bypass, temporary permissions) must be flagged to the operator.

---

## Objective

Replace the temporary, security-sensitive seed strategy with a deterministic, operator-configurable one: no hardcoded real credential/plaintext password in source, and a deliberate (not blanket grant-all) initialization of platform-admin roles, permissions, and the super admin account.

---

## Scope

In scope:

- Remove the hardcoded real phone number + plaintext password from `platform-admin.seed.ts`; source the initial super admin credential from environment/config and hash it via the project's password provider (see `hashPasswordProvider`/bcryptjs used in `authentications`).
- Replace the `super_admin` grant-all (`role-permission` seed) with an explicit, curated permission set or a documented env-driven behavior.
- Remove the temporary "TODO / Replace final authorization strategy" comments where the replacement resolves them.
- Update `.env.example` with any newly required variables.

Out of scope:

- Changing authorization middleware logic.
- Adding new endpoints.

---

## Technical Requirements

- Reuse the existing password hashing helper used by `authentications` (`hashPasswordProvider` or equivalent bcryptjs usage) rather than storing plaintext.
- Secrets (password) must come from environment variables, **never** be hardcoded in a committed seed.
- Keep seeds idempotent (existing non-empty guard preserved).
- `npx tsc --noEmit`, `npm run lint`, `npx prettier --check .` remain green.

---

## Acceptance Criteria

- [ ] No plaintext password or real personal phone number is committed in any seed file.
- [ ] Super admin account is created from env/config values and its password is stored hashed.
- [ ] `super_admin` role permission initialization no longer blindly grants all permissions; behavior is explicit and documented.
- [ ] Temporary "Replace final authorization strategy" comments are resolved or clearly scoped.
- [ ] `.env.example` documents the new variables.
- [ ] All quality gates pass.

---

## Validation

- Grep confirms no hardcoded `erfan123456` / real phone remains in `src/`.
- `npx tsc --noEmit`, `npm run lint`, `npx prettier --check .`.
- Seed idempotency reviewed (guard against duplicate runs).

---

## Testing Requirements

- If feasible, a unit test asserting the password is hashed (not plaintext) before persistence.
- Existing suite remains green.

---

## Documentation Requirements

- Swagger/OpenAPI: not applicable.
- Permission seeds: yes (the target).
- `.opencode/context` updates: remove this item from suggested backlog seeds when done; update any seed description that changes.

---

## Implementation notes

(empty until planning)

---

## Final report

(empty until completion)

---

## Commit

Recommended: `refactor(seeds): stabilize super admin seed and externalize credentials`

---

## Task Storage

.opencode/tasks/backlog/2026-09-01/CHASHA-BE-TASK-016.md
