# Observability

## Purpose

Responsible for operational visibility of production behavior: structured logs, metrics,
correlation identifiers, health signals, and diagnosability of new failure modes — using
the stack that exists (pino, prom-client), not aspirational tooling.

## When This Skill Applies

- Changes affecting production behavior, failure diagnosis, or background flows.
- Adding external calls or async side effects whose failure would otherwise be invisible.
- Tasks explicitly addressing observability gaps (e.g., exposing a metrics endpoint).

## Responsibilities

- Preserve existing instrumentation: `monitoringMiddleware` request logging (pino child
  logger) and prom-client counters/histograms must keep working through middleware changes.
- Log with structure and discipline: no secrets, tokens, OTPs, passwords, or full
  request bodies containing credentials; no `console.log` side channels.
- Consider correlation: `X-Request-ID` exists via helper; note that `requestIdMiddleware`
  is currently defined but not applied in `app.ts` — when adding async/event flows,
  propagate available identifiers rather than inventing parallel schemes.
- New failure modes introduced by a change get an observable signal (log line at proper
  severity, or metric where a counter already fits).
- Health semantics: boot performs master+slave connectivity checks; preserve them when
  touching startup; do not fake health endpoints without task mandate.

## Required Knowledge

- Structured logging practice: stable event names/fields over prose strings; severity
  selection (error = needs attention, warn = degraded but handled, info = state changes).
- Metrics hygiene: low-cardinality labels only (route shape, status class); never
  per-user/per-id label explosion.
- RED method for services (rate, errors, duration) mapped onto existing
  `http_requests_total` / response-size histogram.
- Current gaps to know and report, not silently patch: no `/metrics` endpoint served;
  root `prometheus.yml` scrapes a path nothing provides; no distributed tracing.

## Repository Inspection

1. Logger configuration (`src/config/logger`) and monitoring middleware before changing flow.
2. Existing log statements' style/severity in sibling handlers.
3. Whether touched flows already emit events/metrics that should be extended vs duplicated.
4. Error-handler path: ensure new error types still surface through central formatting.

## Validation

- Touched failure paths produce at least one actionable signal.
- No sensitive data added to logs/metrics; label cardinality bounded.
- Instrumentation survives middleware ordering changes.
- Observability additions match approved scope (no drive-by `/metrics` endpoint).

## Common Failure Modes

- Swallowed consumer errors making SMS/notification loss undetectable.
- Logging objects with circular refs or entire ORM entities.
- Metric labels with high-cardinality values blowing memory.
- "It works locally" diagnosis without checking what production logs will show.

## Anti-Patterns

- String-concatenated log lines unparseable by machines.
- Tracing frameworks adopted ad hoc without operator approval.
- Metrics for everything (cost without use) or nothing (blind spots).
- Treating console output as monitoring.

## Engineering Expectations

Every meaningful change answers: "When this breaks at 02:00, what tells the on-call what
happened?" — before merge, not after the incident.

## Definition of Done

- Failure modes of changed code are observable with appropriate severity/cardinality;
  no sensitive leakage; known gaps encountered are reported to the operator.
