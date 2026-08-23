# Testing

## Purpose

Responsible for behavior verification appropriate to risk, within the repo's current
reality: Jest 30 + ts-jest configured (`roots: src/`, `@/` alias) but zero test files and
`npm test` intentionally failing. Policy: `../../rules/testing-rules.md`.

## When This Skill Applies

- Any task changing business behavior (handlers, validators, repositories, auth logic).
- Bug fixes (regression test failing-before/passing-after whenever feasible).
- The operator-approved task that wires the testing foundation (first test task).

## Responsibilities

- Choose proportionate coverage per testing-rules §R1: application handlers and
  validation schemas first; pure wiring covered by review until infrastructure matures.
- Verify behavior over implementation: assert envelopes, status codes, translated
  messages, and state outcomes — not internal call sequences.
- Keep tests isolated: no shared mutable state, deterministic inputs, no reliance on
  execution order.
- Use test doubles where the architecture makes it natural — repository contracts are
  plain functions; mock at module boundaries rather than spinning full HTTP stacks for
  unit scope.
- For the first wiring task only: replace the `npm test` placeholder, fix placement
  convention (`*.spec.ts` inside `src/`), record decisions in rules + context files.

## Required Knowledge

- Test pyramid economics: unit (handlers/validators) cheap and numerous; integration
  (DB-backed) selective; E2E deferred until a harness is approved (`supertest` is installed).
- Mocking discipline in this codebase: mock repository-factory modules consumed by
  handlers; prefer `jest.mock` of the barrel path handlers import.
- Arrange-Act-Assert structure; one behavioral reason per test; names state expected
  behavior ("rejects update when body has only the id").
- Regression methodology: reproduce → failing test → minimal fix → green suite.
- What NOT to test: framework internals, generated code, trivial barrels.

## Repository Inspection

1. Whether sibling tests exist to mirror (likely none yet — then follow rules/testing-rules).
2. Handler dependencies to stub (repository factories, event emitter, translator catalogs).
3. jest.config.ts constraints (roots/testMatch/moduleNameMapper) before choosing file paths.

## Validation

- New/changed behavior has required case families (happy path, validation failures,
  authorization failures, auth failures where relevant, business-rule failures, edges).
- Suite green via the wired runner; no skipped tests without documented cause.
- Assertions meaningful: would catch the regression they claim to cover.

## Common Failure Modes

- Tests asserting mocks instead of behavior (change-detector tests).
- Hidden coupling to dictionary content causing brittle message equality everywhere.
- Integration ambitions smuggled into unit tasks (DB setup without approval).
- Green-but-meaningless coverage added to satisfy "tests" checkbox.

## Anti-Patterns

- Snapshot-everything tests that pass while the product breaks.
- Test-only branches inside production code without explicit design justification.
- One giant test file per module instead of per-behavior organization.
- Reintroducing a second runner/assertion library alongside Jest.

## Engineering Expectations

Tests are engineering artifacts with maintenance cost: minimal set with maximum regression
power for the changed behavior. A red build is a stopped line — never ignored silently.

## Definition of Done

- Required families covered or deferral explicitly approved and recorded;
  suite green; first-wiring duties completed if applicable.
