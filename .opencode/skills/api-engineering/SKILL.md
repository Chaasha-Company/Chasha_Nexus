# API Engineering

## Purpose

Design and evolve Chasha's HTTP surface with strict internal consistency: URL grammar,
controller shape, DTO contracts, Zod validation, response envelopes, status codes,
pagination, and the hand-maintained OpenAPI document. Repo policy: `../../rules/api-rules.md`.

## When This Skill Applies

- Any task adding, modifying, or removing endpoints, DTOs, validations, or Swagger entries.
- Tasks touching pagination, search, filtering, sorting, or list definitions (`list/` folders).
- API contract reviews and documentation-drift fixes.

## Responsibilities

- Follow the established grammar: `/api/v1/{lang}/{admin|business|global}/<resource-singular>/<verb-phrase>`.
- Keep controllers as thin adapters: parse → one handler call → envelope helper; `next(error)` always.
- Reuse envelope helpers only (`successResponseHandler`, `paginationResponseHandler`,
  central error handler); never invent response shapes per endpoint.
- Synchronize the static spec (`src/config/open-api/document/base/en-base-config.config.json`)
  with every implementation change — paths, schemas, security, status codes, `$ref`s.
- Maintain permission guards on protected routes in the same change (see
  authentication-authorization skill).

## Required Knowledge

- HTTP semantics actually honored by this codebase: 200 reads/updates (updates may return
  `data: null`), 201 creates, 400/401/403/404/409/429 via exception factories.
- REST conventions as practiced here (resource-singular paths, verb phrases like
  `get-all`, `list-option`, `detail`, `update`) over textbook purity.
- Contract-first thinking for DTOs: request/response interfaces mirrored by Zod factories
  (`(lang) => z.strictObject<DTO>`) — validation and DTO must never diverge.
- Pagination contract: shared `PaginationQueryValidation` input; `data.paginationItems` +
  `data.paginationMeta{...}` output with exact meta field names.
- OpenAPI structure: `{language_prefix}` path placeholder, tags, camelCase operationIds,
  `CookieAuth`/`BearerAuth` security schemes.

## Repository Inspection

1. Closest sibling endpoint of the same surface (admin/business/global) — copy its full stack shape.
2. Existing verb phrases before coining new ones; existing resource naming style.
3. Module `list/` definition objects for search/filter field conventions on lists.
4. Current spec entries for the module — fix drift found while editing (or report it).

## Validation

- Spec JSON parses; every `$ref` resolves; documented status codes equal implemented ones.
- Request examples match real envelopes (known past drift: create documented 200 vs actual 201).
- Empty-body/query rejection behavior preserved (`NO_DATA_RECEIVED`).
- Unknown-key rejection intact (`z.strictObject`).

## Common Failure Modes

- Returning raw arrays or ad-hoc objects at the top level.
- Documenting an endpoint differently from its implementation "because the doc was already wrong".
- Forgetting `req.lang` propagation into messages/handlers.
- Inventing a new pagination meta shape instead of the exact `paginationMeta*` fields.

## Anti-Patterns

- Per-endpoint response conventions ("just this once").
- Business logic or multi-handler orchestration inside controllers.
- Skipping the Swagger update because UI docs are "internal".
- New query-param naming styles (`page` vs `paginationPage`) breaking consistency.

## Engineering Expectations

An engineer familiar with one Chasha module can predict another module's endpoints exactly.
Consistency outranks personal preference; where the convention is deficient, propose a
uniform migration — never a local exception.

## Definition of Done

- Endpoint behaves per contract; validation complete; guard present (if protected);
  spec synchronized and valid; api-rules checklist satisfied.
