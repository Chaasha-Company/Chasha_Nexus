# Feature Workflow

Use for new endpoints, modules, seeds, integrations — anything that adds behavior.
Template: `templates/feature-template.md`.

## Stage 1 — Analysis (no code yet)

1. Read the task; restate objective and acceptance criteria in your own words inside the task file.
2. Find the closest existing feature(s) and walk them end-to-end:
   route file → controller → DTOs → validation → command/query handler → contract →
   repository → schema model → migrations/seeds → swagger entry.
3. Decide and record (labeled):
   - Target module & scope folders (`global` / `admin` / `business`).
   - API contract: method, path, request/response shapes, status codes, envelope variant.
   - Permission model: actor family, module/resource/action triple, which roles receive it,
     whether admin and employee surfaces differ.
   - DB impact: new/changed models, migration plan, seed impact, cache invalidation keys.
   - Reuse list: existing helpers/enums/patterns consumed; anything that would be duplicated.

## Stage 2 — Plan

Write ordered implementation steps into the task file following development-workflow's
implementation order. Flag every step that crosses an architectural boundary or changes
shared behavior (`proposed-improvement` requires operator approval before proceeding).

Ambiguity rule: if alternative interpretations change business behavior, ask before coding.

## Stage 3 — Implement

Follow `rules/` strictly. Reminders most often missed:

- Barrels updated for every new file.
- Migration re-exported in `src/index.ts`.
- Guard triple string-equal to seeded permission's module/resource/action.
- All messages via translator enums with fa+en entries.
- Strict Zod factories; pagination spread from shared schema for lists.
- Swagger spec entry with `{language_prefix}`, correct security blocks, real status codes.

## Stage 4 — Validate & test

Gates G4–G6 from development-workflow. Tests per testing-rules §R1–R3.

## Stage 5 — Review & commit

Run review-workflow against the full diff (the ten questions). Fix blockers, then commit:
one Conventional Commit, e.g. `feat(early-access-request): add admin detail endpoint`.
Move task file to `completed/`, append final report, deliver report to operator.

## Definition of done

quality-rules §R6 checklist fully satisfied for this feature.
