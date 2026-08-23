# Performance

## Purpose

Responsible for evidence-driven efficiency of request paths and resource usage: event-loop
health, async I/O, query cost, connection pooling, and the existing caching layers.
Optimization must be justified by measurement or concrete cardinality reasoning — never
speculative.

## When This Skill Applies

- Tasks on list/search endpoints, heavy queries, or query-cache behavior.
- Any change adding per-request work (middleware, synchronous CPU work, large payloads).
- Operator-reported slowness investigations (measure first, then change).

## Responsibilities

- Follow the loop: observe → hypothesize → measure → change → re-measure; state how a
  "faster" claim would be verified (pino request logs today; `EXPLAIN` on dev; prom-client
  data once an endpoint exposes it).
- Keep request paths asynchronous and non-blocking; no added synchronous CPU-heavy work.
- Respect pool configuration (`DB_POOL_*` envs) and never assume connection starvation
  without checking settings and concurrency.
- Preserve cache correctness while tuning: key composition must cover every filter
  dimension; writes keep invalidation duty (`AppDataSource.queryResultCache?.remove`).
- Bound all data access: pagination on lists, bounded `IN` clauses, explicit `take`.

## Required Knowledge

- Node.js event-loop mechanics: what blocks it (sync loops, large JSON serialization,
  bcrypt), why obstruction degrades every route.
- Async I/O patterns: batching sequential awaits into single queries; avoiding N+1.
- MySQL performance: index selectivity, composite indexes for real search/filter/sort
  combinations, reading `EXPLAIN` output.
- Caching trade-offs: TTL fit (~300s default in `chasha_caches`), stampede basics,
  invalidation as part of correctness.
- Concurrency hazards: race conditions around expiring cached state (OTP sessions,
  rate-limit windows); backpressure concepts for streams/uploads.

## Repository Inspection

1. Query shape versus actual indexes in migration DDL; run `EXPLAIN` on dev when possible.
2. Cache keys and TTL fit for the access pattern being changed.
3. Payload sizes: list limits, pagination defaults, response mapping bloat.
4. CPU-sensitive code touched by the task (bcrypt cost via `BCRYPT_SALT`, UUID generation).
5. Existing metrics/log signals available for before/after comparison.

## Validation

- New queries have supporting indexes or documented cardinality justification.
- No unbounded queries introduced; admin lists enforce pagination.
- Event loop not obstructed by new synchronous work in request paths.
- Cache coherence intact after any read/write path change.

## Common Failure Modes

- Optimizing a cold path while logs point at an unindexed hot search.
- Cache keys missing a filter dimension → wrong cached rows (correctness bug posing as perf).
- Sequential per-row awaits replacing one set-based query.
- Profiling theater: load tests without representative data volumes or access mixes.

## Anti-Patterns

- Premature micro-optimization of trivially cheap operations.
- Denormalization without a measured read-path need.
- Cleverness over clarity (in-handler memoization) for negligible gain.
- Treating "should be faster" as a task acceptance criterion without evidence.

## Engineering Expectations

Performance is a property verified with evidence. The professional default answer to "is
this fast enough?" is data, and to "should we optimize?" is "not until it matters".

## Definition of Done

- Changes carry measurement or explicit indexing/cardinality rationale.
- Correctness preserved: cache coherence, soft delete, authorization filters.
- No payload-size or query-count regression without a documented, accepted trade-off.
