# Architecture Rules

The existing Chasha Backend architecture is authoritative. Consistency beats novelty.

## R1. Preserve the established structure

- Bounded contexts live in `src/modules/v1/<context>/` with exactly these layers:
  `application/`, `domain/`, `infrastructure/`, `presentation/` (plus optional module-level
  extras like `list/`), each directory with an `index.ts` barrel.
- Shared kernel lives in `src/shared/v1/`; app config in `src/config/`; external adapters
  in `src/infrastructure/`. New cross-cutting code goes there, not into modules.
- All new work stays under the current version namespace (`v1`).

## R2. Dependency direction

```
presentation → application → domain
infrastructure → domain (implements contracts)
shared/config/infrastructure-adapters are depended on; they never depend on modules
```

- Domain contains no framework imports beyond pure TypeScript vocabulary.
- Application may import domain contracts and shared helpers; it must not import TypeORM
  models directly — it consumes repository contracts.
- Infrastructure implements domain contracts using centralized models from
  `src/shared/v1/database/schema/`.
- Presentation imports application handlers and shared response/validation helpers only.
- Never import across bounded contexts' internals; if a module needs another module's data,
  follow the existing pattern of importing that module's barrel exports (as login handlers
  import repositories from `platform-admins` / `business-employees` barrels).

## R3. Layer responsibilities

| Layer          | May do                                                                    | Must not do                                           |
| -------------- | ------------------------------------------------------------------------- | ----------------------------------------------------- |
| presentation   | parse HTTP input, call one handler, shape envelope, translate message     | contain business rules, query DB directly, hold state |
| application    | orchestrate use case, enforce business rules, emit events, map to results | touch Request/Response, import TypeORM                |
| domain         | entities, enums, value objects, repository contracts, event definitions   | depend on any outer layer or driver                   |
| infrastructure | implement contracts with TypeORM/SMS/cache/etc.                           | make product decisions, leak driver types upward      |

## R4. Established implementation idioms (do not replace)

- No DI container, no CQRS bus: handlers are exported async arrow-function consts.
- Curried factory style for repositories: `export const xRepository = (): XContract => async (args, manager?) => {...}`.
- Contracts as type aliases in `domain/contracts/i-repository/`; inline mapping in handlers.
- Transactions via shared `transactionManager` helper passing optional `manager` down.
- Events via shared `eventEmitterConfig` + consumers registered at import time.

Introducing a different idiom requires an explicit operator-approved architectural task.

## R5. When architecture may change

Only when: explicitly required by the task; required to fix a serious violation; or approved
by the operator. Before proposing any architectural change, document: existing modules
inspected, dependency direction impact, boundary impact, composition-root impact, and at
least two comparable existing implementations.

## R6. Controllers stay thin

One controller = parse input → invoke handler → respond. Business logic belongs in
application handlers/domain; persistence details belong behind repository contracts.

## R7. Composition & startup

Startup order lives in `src/bootstrap.ts` (DB test → migrations → seeds → GeoIP → Casbin).
Do not add startup steps casually; new boot-time concerns need a task and must respect
ordering and failure handling of existing steps.

## Pre-implementation checklist

1. Inspect a similar existing feature end-to-end (routes → controller → handler → contract → repository → schema).
2. Confirm target module and layer placement.
3. List every boundary you will cross; confirm none is new without approval.
4. Reuse shared helpers (envelopes, exceptions, validators, translator) instead of local equivalents.
