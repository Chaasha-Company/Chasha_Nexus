# Engineering Context — Process State & Working Agreements

> Snapshot 2026-08-23. Update whenever engineering conventions or system state change.

## Purpose of this file

Complements the other context files with the current _state of engineering_: what exists,
what is deliberately not done yet, and which working agreements govern day-to-day execution.

## Current engineering state

| Area               | State                                                                                                                                                                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Verification gates | `npm run npm:check` + `npm run lint` are the mandatory green bar. Pre-commit runs them repo-wide.                                                                                                                                              |
| Tests              | Wired 2026-08-23: jest runs from `__test__/` (`roots: __test__`), first handler spec in place; `npm test` green. Convention + mocking rules recorded in `rules/testing-rules.md`. Integration/HTTP coverage still pending an approved harness. |
| Swagger/OpenAPI    | Single static JSON spec, `en` only. Known drift items exist (see repository-context deviations #8). Every endpoint task must update the spec.                                                                                                  |
| Permissions        | Seeded via upsert seeds at boot; route guards check DB permission rows. Adding a protected endpoint = adding permission seed + role assignment in the same task.                                                                               |
| Migrations         | Auto-run at boot. New migrations must be added to `src/index.ts` re-exports (Vite bundling requirement).                                                                                                                                       |
| Background jobs    | In-process EventEmitter only; RabbitMQ dormant by explicit decision ("server capacity"). Do not re-enable without operator approval.                                                                                                           |
| Observability      | pino request logs + prom-client counters active; no metrics endpoint yet — adding one is a task, not a drive-by.                                                                                                                               |

## Working agreements

1. **Task-driven**: no code changes without a task file (see `workflow/task-workflow.md`).
2. **Daily cadence**: operator assigns 4–6 tasks/day; agent produces a daily plan first.
3. **Analysis before code**: every feature/bugfix workflow starts with mandatory inspection
   steps; findings go into the task file's technical context section.
4. **Claim labels** (`existing-behavior`, `existing-rule`, `task-requirement`,
   `derived-decision`, `proposed-improvement`, `assumption`) are used in plans and reports
   so the operator can audit reasoning (defined in `.opencode/AGENTS.md`).
5. **One task = one commit**; commits follow Conventional Commits enforced by commitlint.
6. **Docs travel with code**: context files under `.opencode/context/` are updated in the
   same commit when a task changes architecture or conventions materially.

## How to treat known deviations

The deviations listed in `repository-context.md` (typos, unmounted routers, spec drift,
hardcoded dev OTP, temporary super_admin seeding) are recorded facts, not licenses. The
agent does not fix them opportunistically; each becomes a task when the operator prioritizes it.
Security-sensitive ones (dev OTP bypass, temporary permissions) should be flagged to the
operator whenever touched work makes them more dangerous.

## Suggested backlog seeds (for the operator to approve, not for autonomous execution)

These emerged from verified observations; none is authorized yet:

- Wire the testing setup decision (jest roots/test script) and add first handler-level tests.
- Add `/metrics` endpoint exposing the existing prom-client registry (and align `prometheus.yml`).
- Apply `requestIdMiddleware` in `app.ts` or remove it.
- Swagger spec corrections (create → 201; pagination example shape).
- Remove or mount the defined-but-unmounted module routers.
- Replace hardcoded development OTP check with env/config-driven behavior.
- Stabilize `super_admin` permission seed (replace "temporary test data" grant-all).

## Definition of done (short form)

Implementation respects architecture; validation + authorization correct; permissions,
migrations, seeds, tests, Swagger updated where applicable; `npm:check` + `lint` green;
diff reviewed; one dedicated Conventional Commit; final report delivered
(format in `.opencode/AGENTS.md` §10).
