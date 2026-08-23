# Distributed Systems

## Purpose

Responsible for correctness across process/async boundaries — but scoped honestly to what
Chasha actually runs today: in-process `EventEmitter` flows, a dormant RabbitMQ adapter,
and a single-node in-memory cache. General distributed theory is applied only where a real
mechanism exists or an operator-approved task introduces one.

## When This Skill Applies

- Tasks touching event emission/consumption (`eventEmitterConfig`, `infrastructure/event-bus/consumers`).
- Any proposal to enable RabbitMQ (currently commented out by explicit decision: "server
  capacity"), add Redis/Kafka, or run multiple app instances.
- Reviewing async side effects (e.g., SMS sending after early-access creation).

## Responsibilities

- Use the existing in-process event pattern exactly: typed payloads in `domain/events`,
  emit from application handlers via `EventName`, consumers registered at import time under
  `infrastructure/event-bus/consumers`.
- State durability facts plainly: in-process events are not durable — a crash between
  write and consumer completion loses the side effect. Acceptable today only because the
  operator accepted this trade-off; re-evaluate with the operator before adding critical flows.
- Treat `node-cache` as single-instance memory: OTP sessions and per-route rate-limit
  counters are invalid if the app ever scales horizontally — flag this constraint whenever
  deployment topology discussions arise.
- Never introduce new distributed infrastructure (message broker activation, Redis, Kafka)
  without explicit task mandate and operator approval.

## Required Knowledge

- Event-driven concepts: at-most/at-least-once delivery, idempotent consumers, retries
  with backoff, dead-letter handling, ordering guarantees (or lack thereof).
- Eventual consistency and its UX consequences; compensating actions versus distributed
  transactions (sagas) — and why Chasha currently avoids needing them.
- Queue semantics for the dormant amqplib adapter: prefetch configured, consumer loader
  commented out; enabling requires reviewing both.
- Failure containment: consumers must catch and log their own errors without corrupting
  the request path.

## Repository Inspection

1. Existing event vocabulary (`EventName`) and payload types before defining new events.
2. The consumer's error handling and external-call behavior (SMS helper) when touching flows.
3. Whether RabbitMQ bootstrap lines remain commented in `bootstrap.ts` / consumer loader.
4. Cache usage sites (`node-cache`) that would break under multi-instance deployment.

## Validation

- Event payload types match consumer expectations (compile-time proof, not casting).
- Consumers are idempotent or the flow documents duplicate-delivery consequences.
- No new broker/cache technology appears in diffs without approval.
- Side-effect ordering documented: what happens if the process dies mid-flow.

## Common Failure Modes

- Emitting events for critical business outcomes while assuming queue-grade reliability.
- Consumer errors silently swallowed, leaving no trace of lost SMS/notifications.
- Reusing one `EventName` value for two incompatible payloads.
- Designing around Redis assumptions (TTL, atomic counters) using node-cache equivalents
  that do not share semantics.

## Anti-Patterns

- Adding Kafka/RabbitMQ "for scale" on a single-instance deployment.
- Distributed transaction choreography where one DB transaction suffices.
- Fire-and-forget promises without error capture.
- Assuming message ordering from EventEmitter fan-out to multiple consumers.

## Engineering Expectations

The engineer states the consistency model of every async flow in one sentence and can
defend it. Distributed machinery is added when requirements demand it — never as
architecture tourism.

## Definition of Done

- Event/async changes follow the established emitter-consumer pattern, document their
  delivery/durability semantics, and introduce zero unapproved infrastructure.
