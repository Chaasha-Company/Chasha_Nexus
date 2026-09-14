# CHASHA-BE-TASK-012 — Expose Prometheus `/metrics` Endpoint

## Metadata

- **Task ID:** CHASHA-BE-TASK-012
- **Type:** Feature
- **Priority:** Medium
- **Status:** Planned
- **Domain:** Observability
- **Module:** Backend / Infrastructure
- **Dependencies:** None

---

## Context

`existing-behavior`: `src/config/logger/metrics/metrics.config.ts` creates a `promClient.Registry` named `register`, collects default Node metrics via `collectDefaultMetrics`, and defines two `prom-client` collectors: `requestCounter` (`http_requests_total`) and `responseSizeHistogram` (`http_response_size_bytes`). These metrics are registered and populated by `monitoringMiddleware` (`src/shared/v1/middlewares/global`), but **no HTTP route exposes the registry** to a Prometheus scraper.

`existing-rule`: `.opencode/context/engineering-context.md` lists "Add `/metrics` endpoint exposing the existing prom-client registry (and align `prometheus.yml`)" as a suggested backlog seed. `prometheus.yml` was referenced in that note; it is not currently present in the repo root.

---

## Objective

Expose the existing `prom-client` registry over an HTTP `GET /metrics` endpoint (Prometheus text format) so an external Prometheus instance can scrape process and HTTP request metrics.

---

## Scope

In scope:

- Add a `GET /metrics` route serving `register.metrics()` (Prometheus text exposition format).
- Keep the endpoint out of the `v1` language-prefixed router (metrics should be accessible without auth/lang/v1 path), or mount it exactly where the operator prefers.
- Set appropriate `Content-Type: text/plain; version=0.0.4; charset=utf-8`.
- If `prometheus.yml` is expected at repo root, add or align it with the chosen port/path.

Out of scope:

- Adding new metric collectors or changing existing counter/histogram definitions.
- Authentication on the `/metrics` endpoint (operator decision; default is an unauthenticated scrape in infra segment).
- RabbitMQ/OTLP export.

---

## Technical Requirements

- Use the existing `register` from `src/config/logger/metrics/metrics.config.ts`.
- Do not import `prom-client` into a new module; reuse the configured registry singleton.
- The route must not be blocked by the `routeNotFoundHelper` or require a language prefix.
- `npx tsc --noEmit`, `npm run lint`, and `npx prettier --check .` must remain green.

---

## Acceptance Criteria

- [ ] `GET /metrics` returns `200` with Prometheus text-format body containing `http_requests_total` and `http_response_size_bytes` (and Node default metrics).
- [ ] `Content-Type` header is `text/plain; version=0.0.4; charset=utf-8`.
- [ ] Scraping `GET /metrics` does not require a language prefix or auth.
- [ ] `prometheus.yml` (if present/intended) targets the same port/path.
- [ ] All quality gates pass.

---

## Validation

- `curl localhost:<port>/metrics` (or supertest) returns 200 text metrics.
- `npx tsc --noEmit`, `npm run lint`, `npx prettier --check .`.
- Confirm `/metrics` is not caught by `routeNotFoundHelper`.

---

## Testing Requirements

- A unit/supertest check that `GET /metrics` responds `200` with `Content-Type: text/plain` and includes at least one metric name.
- Existing suite must remain green.

---

## Documentation Requirements

- Swagger/OpenAPI: not applicable (infra endpoint).
- Permission seeds: not applicable.
- `.opencode/context` updates: update `engineering-context.md` observability row + remove this item from the suggested backlog seeds when done.

---

## Implementation notes

(empty until planning)

---

## Final report

(empty until completion)

---

## Commit

Recommended: `feat(observability): expose prometheus metrics endpoint`

---

## Task Storage

.opencode/tasks/pending/2026-09-01/CHASHA-BE-TASK-012.md
