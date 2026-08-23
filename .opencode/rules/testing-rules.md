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

- Co-locate as `*.spec.ts` / `__tests__/` **inside `src/`** so jest `roots`/`testMatch` pick
  them up, or move scaffolding from `__test__/` into scope — but whichever is chosen becomes
  the convention and gets recorded here.
- Reuse ts-jest + `@/` alias; no second runner/assertion library without approval.
- Unit-scope tests mock repository contracts (they are plain functions — easy to stub via
  module mocking); do not spin a full HTTP stack per unit test. If integration coverage is
  wanted, propose it as its own task (it needs DB strategy decisions).

## R4. Wiring duties for the first test task

- Replace the failing placeholder `npm test` script with the real jest invocation.
- Decide and document: file placement convention, mocking approach, DB strategy for
  persistence tests (none | dev MySQL | throwaway schema).
- Update this file and `context/engineering-context.md` to reflect the new state.

## R5. Honesty rules

- A green build is not a complete task if required tests were skipped — say so explicitly
  and get operator sign-off.
- Never weaken assertions to make tests pass; never ignore failing tests without an
  explicit, reported justification.
- Do not add a new testing architecture (supertest harnesses, test containers...) inside a
  feature task.
