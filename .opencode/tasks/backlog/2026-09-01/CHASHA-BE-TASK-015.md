# CHASHA-BE-TASK-015 — Remove or Mount Empty Module Routers

## Metadata

- **Task ID:** CHASHA-BE-TASK-015
- **Type:** Refactor
- **Priority:** Low
- **Domain:** Architecture
- **Module:** Backend / Routes
- **Status:** Planned
- **Dependencies:** None

---

## Context

`existing-behavior`: Several module `presentation/routes/*.route.ts` files are empty stubs — they create a `Router()` but register **no routes** and are not mounted anywhere:

- `src/modules/v1/business-employees/presentation/routes/business-employee.route.ts`
- `src/modules/v1/businesses/presentation/routes/business.route.ts`
- `src/modules/v1/platform-admins/presentation/routes/platform-admin.route.ts`
- `src/modules/v1/platform-admin-sessions/presentation/routes/platform-admin-session.route.ts`

`existing-behavior`: The mounted route tree is `src/modules/v1/v1.route.ts` -> `routes/{admin,business,global}.route.ts`. It mounts auth, authz, early-access, faq, lockup routers. The empty stubs above are exported but unreferenced by any mounted router.

`existing-rule`: `.opencode/context/engineering-context.md` lists "Remove or mount the defined-but-unmounted module routers" as a suggested backlog seed. The `.opencode/AGENTS.md` non-negotiables state "Never modify unrelated code" and "never leave stray TODOs/dangling artifacts."

---

## Objective

Eliminate dangling empty router stubs: either remove each empty `presentation/routes/*.route.ts` (plus its barrel export if it is exclusively a stub) or, where the module genuinely needs an HTTP surface, mount real routes. Removal is the default for empty stubs.

---

## Scope

In scope:

- For each of the four empty stub routers: remove the file and any barrel export that re-exports it, **unless** the module requires the router to be mounted (then implement/mount it).
- Verify no import references the removed barrels.

Out of scope:

- Adding new business routes to those modules.
- Any change to mounted routers (`admin`/`business`/`global`).

---

## Technical Requirements

- `Router()` stubs with no routes that are not mounted must be removed cleanly, including barrel (`index.ts`) exports and any `presentation/routes/index.ts` re-export.
- `npx tsc --noEmit`, `npm run lint`, `npx prettier --check .` remain green.

---

## Acceptance Criteria

- [ ] No empty/unmounted `Router()` stub remains in `src/**/*.route.ts`.
- [ ] No dangling barrel export or import references the removed files.
- [ ] Mounted route behavior is unchanged.
- [ ] All quality gates pass.

---

## Validation

- Grep for each removed router name returns no imports.
- `npx tsc --noEmit` (catches dangling imports), `npm run lint`, `npx prettier --check .`.

---

## Testing Requirements

- Existing route-structure specs (e.g. `role.route.spec.ts`) must remain green.
- Full suite remains green.

---

## Documentation Requirements

- Swagger/OpenAPI: not applicable.
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

Recommended: `refactor(routes): remove empty unmounted module router stubs`

---

## Task Storage

.opencode/tasks/backlog/2026-09-01/CHASHA-BE-TASK-015.md
