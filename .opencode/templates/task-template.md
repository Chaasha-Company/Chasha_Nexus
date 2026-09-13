# Task Template

Copy to `tasks/backlog/YYYY-MM-DD/CHASHA-BE-TASK-NNN.md` and complete every section.
Use `feature-template.md` / `bugfix-template.md` when the type is known (they extend this one).
Task IDs are globally sequential — use the next available number (highest existing + 1).

---

```markdown
# CHASHA-BE-TASK-NNN — <Title>

## Metadata

- **Task ID:** CHASHA-BE-TASK-NNN
- **Type:** Feature | Bugfix | Refactor | Architecture | Docs
- **Priority:** Low | Medium | High | Critical
- **Status:** Backlog | Planned | Active | Implementation | Review | Testing | Approved | Completed | Archived
- **Domain:** <Bounded context name>
- **Module:** <Module name>
- **Dependencies:** <Task IDs or None>

---

## Required Skills

- <Skill name 1>
- <Skill name 2>

## Context

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

## Required Skills

<Select the minimal set, using exact skill names from `.opencode/skills/`:
Backend Engineering; Architecture; API Engineering; Authentication & Authorization;
Database Engineering; Persistence; Distributed Systems; Performance; Security; Testing;
Observability; Reliability; Infrastructure; Cloud; Git; Engineering Judgment.
Consult each selected `.opencode/skills/<skill>/SKILL.md` during implementation and review.>

- <Skill 1>
- <Skill 2>

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
