# Reliability

## Purpose

Responsible for how the system behaves when things fail: timeouts, retry policy,
failure isolation, shutdown behavior, and recovery paths — evaluated against Chasha's
current architecture rather than generic resilience patterns.

## When This Skill Applies

- Changes adding external calls (HTTP clients, SMS, storage) or multi-step write flows.
- Startup/bootstrap changes where failure ordering matters.
- Tasks explicitly about resilience, recovery, or failure handling.

## Responsibilities

- Give every outbound dependency an explicit timeout contract. Database connection/query
  timeouts are env-configured (`DATABASE_CONNECTION_TIMEOUT`, `DATABASE_QUERY_TIMEOUT`);
  when touching the axios-based SMS path or S3 uploads, inspect their timeout/error
  handling before relying on them.
- Default to fail-fast for request-scoped errors via shared exceptions; do not add retries
  without justifying idempotency — a retried payment-like action must not double-apply.
- Keep multi-write invariants atomic with `transactionManager` so partial failure cannot
  strand state (pattern: password update + session revocation).
- Evaluate boot sequence changes for ordering hazards: connection test → migrations →
  seeds → GeoIP → Casbin; a failing early step must halt startup, not degrade silently.
- Graceful shutdown: no SIGTERM/SIGKILL handling has been audited in this codebase —
  verify before assuming; if a task adds long-running work (consumers), raise shutdown
  implications to the operator.
- Recovery posture: backups and destructive-migration gating are operator-managed
  (see release-workflow); code changes must not widen unrecoverable blast radius.

## Required Knowledge

- Timeout vs deadline vs cancellation semantics; why unbounded external calls convert
  local faults into outages.
- Retry economics: which errors are retryable (transient network) versus deterministic
  (validation) — and idempotency keys as prerequisite.
- Circuit-breaker concept: only relevant here if repeated external calls exist; do not
  introduce breaker libraries without need + approval.
- Failure isolation: one slow consumer/route must not starve the event loop or pool.
- Disaster-recovery basics: RPO/RTO vocabulary for operator conversations.

## Repository Inspection

1. External-call sites touched by the task: existing timeout/retry/error treatment.
2. Transaction coverage of the invariants involved.
3. Bootstrap ordering if startup behavior is affected.
4. Whether the flow creates state that outlives the request (sessions, codes) and its
   expiry/revocation handling.

## Validation

- No new unbounded waits on external dependencies.
- Retried operations (if any) proven idempotent or made single-shot.
- Atomicity verified for multi-write flows under simulated failure points.
- Failure of the added dependency degrades its feature only, not unrelated routes.

## Common Failure Modes

- Default axios/fetch without timeout hanging sockets until pool exhaustion.
- Retrying non-idempotent writes on transient errors.
- Catching dependency failure and returning success anyway.
- Ignoring revocation/expiry checks because "the token was valid".

## Anti-Patterns

- Blanket try/catch returning 200 with "error" field.
- Retry loops without backoff/jitter hammering a struggling dependency.
- Resilience libraries adopted for one call site.
- Assuming graceful shutdown exists without verifying.

## Engineering Expectations

The engineer can state, per dependency: what happens on timeout, on error, on repeated
failure — and what the user experiences. Undegraded honesty beats optimistic silence.

## Definition of Done

- Failure behavior documented in task file; atomicity/timeout/idempotency concerns
  addressed or consciously accepted by the operator.
