# Task Template

Copy to `tasks/backlog/TASK-NNN-<slug>.md` and complete every section.
Use `feature-template.md` / `bugfix-template.md` when the type is known (they extend this one).

---

```markdown
# TASK-NNN: <Title>

- Status: Backlog | Planned | Active | Implementation | Review | Testing | Approved | Completed | Archived
- Type: feature | bugfix | refactor | chore | docs
- Priority: low | medium | high | urgent
- Created: YYYY-MM-DD
- Assignee: chasha-agent

## Description

<What is this task about? Facts only.>

## Objective

<The single outcome that defines success.>

## Scope

In scope:

- <...>

Out of scope:

- <...>

## Technical context

<Verified findings from repository/architecture analysis, with claim labels:
existing-behavior / existing-rule / assumption, plus file paths.>

## Target module

`src/modules/v1/<context>` (+ shared/config/infrastructure areas touched)

## Dependencies

- <Tasks, migrations, operator decisions, or external systems this depends on.>

## Expected behavior

<Observable behavior after completion: endpoints, envelopes, status codes,
permission behavior, data effects. No implementation details here.>

## Acceptance criteria

- [ ] <Criterion 1 — verifiable statement>
- [ ] <Criterion 2>
- [ ] quality-rules §R6 checklist satisfied

## Testing requirements

<Required case families per testing-rules §R1–R2; or explicit approved deferral.>

## Documentation requirements

- Swagger/OpenAPI: required | not applicable
- Permission seeds: required | not applicable
- `.opencode/context` updates: required | not applicable

## Implementation notes

<Filled during planning: ordered steps, API contract, permission triple,
DB impact, reuse list.>

## Final report

<Appended at completion per AGENTS.md §10.>
```
