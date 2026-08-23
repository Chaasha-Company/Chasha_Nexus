# Backend Engineering

## Purpose

Baseline craft skill for all server-side implementation in this repository. It is
responsible for code quality fundamentals — clarity, type safety, error handling,
dependency hygiene, and maintainability — applied within the existing Chasha idioms
(arrow-function handlers, curried repository factories, barrel exports, shared helpers).
Enforceable repo policy lives in `../../rules/coding-rules.md`; this skill supplies the
engineering judgment behind it.

## When This Skill Applies

- Every implementation, refactoring, and bugfix task (always active as the baseline).
- Any task creating or modifying handlers, controllers, repositories, validators, helpers,
  DTOs, enums, or configuration under `src/`.
- Refactoring requests where behavior must remain identical.

## Responsibilities

- Apply SOLID, DRY, KISS, and YAGNI proportionately: principles guide decisions; they do
  not justify speculative frameworks or layers the codebase does not use.
- Produce the smallest change that satisfies acceptance criteria without weakening
  neighboring code.
- Handle every failure path explicitly through the shared exception factories; no silent
  catches, no ad-hoc status handling.
- Preserve type safety: strict mode is non-negotiable; `any` only with written justification.
- Manage dependencies (npm) conservatively: prefer existing packages (`zod`, `node-cache`,
  `pino`, `prom-client`); new dependencies require operator approval.

## Required Knowledge

- SOLID interpreted for a function-first, no-DI-container codebase (e.g., DIP is already
  realized via domain repository contracts, not injection frameworks).
- DRY versus premature abstraction: extract on the second real consumer or when an obvious
  shared home exists (`shared/v1/helpers`, `enums`).
- Error-handling strategy design: typed application errors, central formatting, translation.
- TypeScript strict-mode tooling: discriminated unions, `satisfies`, utility types,
  definite assignment on entity models.
- Refactoring techniques safe under behavior preservation: extract function, inline,
  rename with reference search, parameter object.

## Repository Inspection

Before editing, inspect:

1. The nearest sibling feature end-to-end (route → controller → handler → contract →
   repository) and mirror its naming, structure, and idiom exactly.
2. Existing shared assets before writing anything new: `src/shared/v1/helpers`,
   `enums`, `validations`, `interfaces`, `types`.
3. Barrel files that must re-export new modules.
4. Message/translation catalogs to reuse rather than reinvent keys.

## Validation

- `npm run npm:check` + `npm run lint` pass (zero warnings).
- No `any`, no suppression comments, no debugging artifacts, no stray TODOs.
- All user-facing strings resolve through `t(...)` with fa+en dictionary entries.
- Barrels updated; imports use the `@/` alias consistently.
- Diff contains nothing unrelated to the task.

## Common Failure Modes

- God handlers accumulating validation, orchestration, mapping, and persistence detail.
- Copy-pasting a sibling endpoint instead of reusing its helper/schema.
- Silent `catch {}` or swallowing errors to keep a flow "working".
- Stringly-typed values where an existing enum exists (`EventName`, `ErrorCode`, message keys).
- HTTP concerns leaking into application handlers (Request/Response usage).

## Anti-Patterns

- Introducing classes/DI/service registries into a function-factory codebase.
- Utility graveyards: `utils.ts` dumping grounds detached from domain vocabulary.
- Deep inheritance or mixins; this codebase composes functions.
- Speculative generality: options objects, strategy patterns, or interfaces with a single
  implementation and no contract consumer.
- Boolean-flag parameters controlling divergent behaviors inside one handler.

## Engineering Expectations

A professional outcome reads as if the original authors wrote it: same idioms, same
naming grammar, same error discipline. Complexity must be earned and stated — if a
reviewer asks "why is this here?", the task file already answers.

## Definition of Done

- quality-rules §R6 checklist satisfied.
- Review finds no duplication against existing abstractions, no type-safety escapes,
  no hygiene violations.
- Behavior matches acceptance criteria exactly; any deviation is labeled and approved.
