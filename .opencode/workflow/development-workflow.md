# Development Workflow — Master Loop

The canonical pipeline for every engineering task. `feature-workflow.md` and
`bugfix-workflow.md` specialize stages 3–5; gates and reporting are identical for all.

## Pipeline

```
Daily Plan → Task Selection → Repository Analysis → Architecture Analysis
→ Implementation Plan → Implementation → Validation → Tests
→ Swagger/Documentation Updates → Code Review → Commit → Task Completion
```

## Gates

| Gate                    | Passes when                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| G0 Task ready           | Task file exists with status Planned, acceptance criteria clear, no blocking ambiguity.                              |
| G1 Analysis done        | Similar implementations inspected; technical context recorded in the task file.                                      |
| G2 Plan approved-inline | Steps, permission model, DB impact, and API contract written into task file (operator ping only if ambiguous/risky). |
| G3 Implementation done  | Code complete per rules; barrels updated; no unrelated changes.                                                      |
| G4 Validation green     | `npm run npm:check` + `npm run lint` pass; conditional checks per quality-rules §R2.                                 |
| G5 Tests handled        | Required tests added/passed, or explicit approved deferral recorded.                                                 |
| G6 Docs synced          | Swagger + seeds/permissions + `.opencode` context updates included where applicable.                                 |
| G7 Review passed        | review-workflow executed; all ten questions answered; blockers resolved.                                             |
| G8 Committed            | One Conventional Commit containing exactly this task's changes; hash recorded.                                       |

## Stage notes

**Repository & architecture analysis (before any edit)**

- Locate the closest sibling feature end-to-end (routes → controller → handler → contract → repository → schema → seed → swagger).
- Note exact names, envelope usage, guard triples, validation idioms to mirror.
- Record findings as labeled claims (`existing-behavior`, `existing-rule`, ...).

**Implementation order (greenfield endpoints)**

1. Domain: entity interface, enums/value objects if needed, repository contract.
2. Shared schema: TypeORM model registration (if new table) + migration (+ re-export in `src/index.ts`).
3. Infrastructure: repository factory implementing the contract.
4. Application: command/query + handler + result; events/consumers if side effects.
5. Presentation: DTOs, Zod validations, controller, route file, barrel + aggregate router wiring.
6. Permissions: enum values (if needed), permission seed, role-permission seed, guard on route.
7. Swagger spec entries.
8. Tests per testing-rules.

Bug fixes invert the order: reproduce/diagnose first, then the smallest correct change.

**Validation**: run gates G4–G6 yourself before review; never let hooks be the first check.

**Completion**: move the task file to `tasks/review/` during review; to `tasks/completed/`
only after G8; produce the final report (AGENTS.md §10). Archived after operator acceptance.

## Multi-task days

Execute tasks sequentially unless truly independent; never mix two tasks' changes in the
working tree at once. If a discovered issue belongs to another task, log it in that task's
file or backlog — do not fix inline.
