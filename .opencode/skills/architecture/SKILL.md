# Architecture

## Purpose

Guard the existing Chasha architecture: layered bounded contexts under `src/modules/v1/`,
a shared kernel in `src/shared/v1/`, configuration in `src/config/`, and external-system
adapters in `src/infrastructure/`. The codebase is authoritative; canonical description in
`../../context/architecture-context.md`, enforceable rules in `../../rules/architecture-rules.md`.

## When This Skill Applies

- Creating a new bounded context or module.
- Any change crossing layers or module boundaries, touching `src/shared/v1/`,
  `src/config/`, `src/infrastructure/`, or the composition root (`index.ts`/`bootstrap.ts`).
- Tasks proposing structural refactors, new abstractions, or new cross-cutting mechanisms.

## Responsibilities

- Inspect before proposing: map how at least two comparable existing features are structured.
- Preserve dependency direction: presentation → application → domain; infrastructure
  implements domain contracts; shared/config never depend on modules.
- Keep repository contracts in domain (`domain/contracts/i-repository`) and TypeORM models
  centralized in `src/shared/v1/database/schema/`.
- Treat established idioms (no DI container, no CQRS bus, curried factories, EventEmitter
  events) as fixed until an operator-approved architectural task changes them.
- Document trade-offs explicitly when any deviation is proposed — never ship one silently.

## Required Knowledge

- Layered, modular, Clean, and Hexagonal architecture: what they share, where they differ,
  and which parts Chasha already realizes (ports ≈ domain contracts, adapters ≈
  infrastructure repositories/consumers).
- Dependency Inversion as a discipline (depend on contracts) rather than a framework.
- Separation of concerns across presentation/application/domain/infrastructure.
- Bounded-context thinking: module barrels are the only legal surface between contexts.
- Trade-off analysis: coupling, testability, migration cost, team familiarity.

## Repository Inspection

1. Target module's four layers + barrels; which are empty placeholders versus implemented.
2. Aggregate route composition (`src/modules/v1/routes/*.route.ts`) for mount conventions.
3. Bootstrap ordering in `src/bootstrap.ts` before adding startup side effects.
4. Cross-module usage style: modules import other modules only through barrel exports
   (e.g., authentication handlers importing platform-admins repositories).
5. Existing shared kernel contents to avoid duplicating cross-cutting code.

## Validation

- No forbidden imports: application must not import TypeORM models or Express types;
  domain must not import drivers or frameworks.
- New files are exported from every enclosing barrel.
- No new architectural mechanism (bus, DI, ORM patterns) appears without task mandate.
- Startup sequence untouched unless the task requires it and ordering is justified.

## Common Failure Modes

- Business rules drifting into controllers or repositories.
- A "temporary" direct model import from application layer becoming permanent.
- Circular imports created by reaching into another module's internals.
- New boot-time work inserted into `bootstrap.ts` without failure-ordering analysis.

## Anti-Patterns

- Reorganizing working modules to match textbook layering ("Clean Architecture rewrite").
- Introducing an abstraction layer with exactly one implementation and no second use case.
- Distributed monolith signals: modules calling modules calling modules for data that
  belongs behind one contract.
- Growing a shared `common` bag where domain vocabulary should live in its module.

## Engineering Expectations

Structural consistency is a feature. The bar for architectural novelty is: explicit task
requirement, documented trade-off, operator approval, and no cheaper in-pattern alternative.

## Definition of Done

- Architecture checklist in review-workflow passes; all boundary crossings are sanctioned.
- If conventions evolved materially, `context/architecture-context.md` updated in the same commit.
