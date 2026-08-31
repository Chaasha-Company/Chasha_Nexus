# CHASHA-BE-TASK-014 — Correct OpenAPI/ Swagger Drift

## Metadata

- **Task ID:** CHASHA-BE-TASK-014
- **Type:** Docs / Bugfix
- **Priority:** Medium
- **Domain:** API Documentation
- **Module:** Backend / Config (open-api)
- **Status:** Planned
- **Dependencies:** None

---

## Context

`existing-behavior`: The Swagger/OpenAPI spec is a single static JSON document at `src/config/open-api/document/base/en-base-config.config.json` (English only).

`existing-behavior`: **No `"201"` response key exists anywhere in the spec** — every endpoint response is documented under `"200"`. However, create controllers actually return `HttpStatus.CREATED`:

- `create-platform-admin-role.controller.ts` → `HttpStatus.CREATED` (201)
- `assign-platform-admin-role-permission.controller.ts` → `HttpStatus.CREATED` (201)
- `create-global-early-access-request.controller.ts` -> `HttpStatus.CREATED` (201)

`existing-rule`: `.opencode/context/engineering-context.md` lists "Swagger spec corrections (create → 201; pagination example shape)" as a suggested backlog seed. The `GetAllPlatformAdminRoleQueryValidation`/`paginationResponseHandler` uses a specific pagination envelope example which the spec's `GetAll...` response examples may not match.

---

## Objective

Reconcile the static OpenAPI document with the actual controller behavior: document create endpoints as returning `201 Created`, and correct the pagination response example shape to match `paginationResponseHandler` output.

---

## Scope

In scope:

- Audit every endpoint in `en-base-config.config.json` whose controller emits `HttpStatus.CREATED`, and change its documented success response from `200` to `201`.
- Correct the pagination response example(s) to match the real `paginationResponseHandler` envelope (`data`, `pagination: { paginationPage, paginationLimit, paginationTotalItems }`, etc. — confirm exact shape from the handler).
- Keep the JSON valid and prettier-clean.

Out of scope:

- Changing controller/source-of-truth behavior.
- Adding missing endpoints or any other spec restructure.
- Multi-language spec (still English-only).

---

## Technical Requirements

- `201` keys must mirror the structure currently under the corresponding `200` block (headers `x-request-id`, same schema refs).
- Do not remove the `200` keys where correctness requires them (e.g. non-create read endpoints).
- `npx tsc --noEmit` unaffected (JSON only); `npx prettier --check .` must pass; JSON must parse.

---

## Acceptance Criteria

- [ ] Every controller that returns `HttpStatus.CREATED` has a matching `"201"` documented response.
- [ ] Pagination example(s) reflect the real envelope shape.
- [ ] `en-base-config.config.json` remains valid JSON and prettier-clean.
- [ ] No behavioral source change.

---

## Validation

- `Select-String` confirms the set of `"201"` keys equals the set of create endpoints.
- JSON parses via `ConvertFrom-Json`.
- `npx prettier --check .`.

---

## Testing Requirements

- No new tests required (documentation-only). Existing suite remains green.

---

## Documentation Requirements

- Swagger/OpenAPI: yes (the target of this task).
- Permission seeds: not applicable.
- `.opencode/context` updates: remove this item from suggested backlog seeds when done.

---

## Implementation notes

(empty until planning)

---

## Final report

(empty until completion)

---

## Commit

Recommended: `docs(api): document created responses and fix pagination examples`

---

## Task Storage

.opencode/tasks/backlog/2026-09-01/CHASHA-BE-TASK-014.md
