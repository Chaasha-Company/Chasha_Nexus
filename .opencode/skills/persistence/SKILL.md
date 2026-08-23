# Persistence

## Purpose

Responsible for how the application talks to the database through TypeORM: repository
contracts and implementations, query construction, relation loading, transactions,
soft deletion, caching interplay, and keeping driver detail out of application contracts.
Repo policy: `../../rules/database-rules.md` (schema) and `../../rules/architecture-rules.md` (boundaries).

## When This Skill Applies

- Writing or modifying repositories, repository contracts, or queries (including QueryBuilder lists).
- Tasks touching transaction flows, query-result cache keys/invalidation, or soft-delete behavior.
- Reviewing handlers for persistence leakage.

## Responsibilities

- Implement domain contracts as curried factories:
  `export const xRepository = (): XContract => async (args, manager?) => {...}` — invoked `xRepository()(args)`.
- Accept and thread the optional `EntityManager`; multi-write invariants wrap in the shared
  `transactionManager` helper rather than ad-hoc runners.
- Build list queries per established pattern: explicit composite cache keys, search/filter
  via module `list/` definitions, count+items pairing for pagination.
- Invalidate query-result cache after writes (`AppDataSource.queryResultCache?.remove([...])`)
  using the same key vocabulary the reads set.
- Map models to results inline in handlers following existing object-literal/destructuring
  style — stripping FK ids and `DeletedAt` fields from public results.

## Required Knowledge

- TypeORM 0.3.x: repository vs EntityManager APIs, QueryBuilder, `FindOptionsRelation`,
  eager/lazy trade-offs (`eager: false` is the norm here).
- N+1 recognition: loops issuing per-row queries; fix via joins/relation loading or
  batched `IN` queries — chosen to match sibling implementations.
- Soft-delete semantics: `@DeleteDateColumn` filters automatically in standard finds;
  beware raw QueryBuilder segments that bypass it.
- Repository pattern intent here: application depends on contract types only; mysql2/
  TypeORM specifics stay inside infrastructure.
- Query-cache mechanics: database-backed cache (`chasha_caches`, ~300s TTL), key
  composition, invalidation duty.

## Repository Inspection

1. Sibling repositories for the entity — factory signature, manager handling, cache usage.
2. The domain contract file the implementation must satisfy exactly.
3. Existing list definitions (`list/`) before inventing search/filter logic.
4. Where the model lives in `src/shared/v1/database/schema/` and its relation graph.

## Validation

- Contract signatures match implementations precisely (no silent type widening).
- Cached reads have corresponding invalidation on every write path that affects them.
- No driver types (`EntityTarget`, `ObjectLiteral`, `SelectQueryBuilder`) appear in
  application/domain signatures or results.
- Transaction paths actually pass `manager` down; partial-write windows are eliminated.

## Common Failure Modes

- Writes without cache invalidation → stale lists until TTL expiry.
- Forgetting `withDeleted` considerations when soft-deleted rows must (or must not) appear.
- Counting with a different filter set than the items query (pagination drift).
- Leaking full models (with FK ids, deleted-at, internal flags) into responses.

## Anti-Patterns

- Generic "base repository" frameworks replacing the explicit factory idiom.
- Raw SQL string concatenation (injection + bypasses soft delete/conventions).
- Application code calling `AppDataSource.getRepository(...)` directly instead of contracts.
- Eager-loading everything to dodge N+1 thoughtfully.

## Engineering Expectations

Persistence is replaceable detail behind stable contracts. Queries state their intent
(filters named from list definitions), respect soft deletes, and keep cache coherence as
part of correctness — not an optimization afterthought.

## Definition of Done

- Contracts satisfied, transactions atomic where required, cache keys coherent end-to-end,
  no leakage upward; persistence checklist in review passes.
