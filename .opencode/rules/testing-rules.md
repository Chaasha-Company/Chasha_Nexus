# Testing Rules

Current reality (2026-08-23): Jest 30 + ts-jest are configured (`jest.config.ts`, roots
`src/`, alias `@/`), but the repository contains **zero test files** and `npm test`
intentionally fails. Testing is therefore introduced deliberately, one decision at a time,
with operator approval — not improvised per feature.

## R1. When tests are required

Every meaningful behavior change must ship with appropriate tests:

- New/changed application handlers (business rules, existence checks, permission-sensitive paths).
- Validation schemas (accepted/rejected cases, message keys).
- Repository logic containing non-trivial queries (filters/search/cache keys) where feasible.
- Bug fixes: a regression test reproducing the bug first, then the fix.

Pure wiring (barrel exports, route registration) may be covered by review instead of tests
until test infrastructure matures.

## R2. Required case families

For each tested behavior cover, as applicable:

1. Happy path.
2. Validation failures (each distinct constraint that matters).
3. Authorization failures (missing/wrong permission triple, wrong actor family).
4. Authentication failures (invalid/expired/revoked session) where relevant.
5. Business-rule failures (not found, conflict, inactive status...).
6. Edge cases (empty results, boundary pagination, at-least-one-field updates).
7. Persistence behavior for multi-write invariants (transaction paths).

## R3. Conventions

- **Decided (operator, 2026-08-23): all tests live under the repo-root `__test__/` tree**,
  organized as `__test__/unit|integration|e2e/` mirroring `src/` paths
  (e.g. `__test__/unit/modules/v1/<context>/.../<name>.handler.spec.ts`).
  Jest `roots` is set to `<rootDir>/__test__` only; specs placed anywhere else are not picked up.
- Import tested code via the `@/` alias; mock module boundaries with explicit
  `jest.mock('<alias-path>', () => ({ ... }))` factories — never automock, or the real
  module graph (and env loading) loads.
- Use globals imported from `@jest/globals`; no second runner/assertion library without approval.
- Unit-scope tests stub repository-contract factories; do not spin a full HTTP stack per
  unit test. Integration coverage is its own approved task (DB strategy decision).
- ts-jest runs type diagnostics on executed specs; production `tsc --noEmit` does not cover
  `__test__/` (`tsconfig.test.json` exists for that scope).

## R4. Honesty rules

- A green build is not a complete task if required tests were skipped — say so explicitly
  and get operator sign-off.
- Never weaken assertions to make tests pass; never ignore failing tests without an
  explicit, reported justification.
- Do not add a new testing architecture (supertest harnesses, test containers...) inside a
  feature task.
