# Task Workflow — Lifecycle & File Management

## Lifecycle

```
Backlog → Planned → Active → Implementation → Review → Testing → Approved → Completed → Archived
```

Status semantics:

| Status         | Meaning                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| Backlog        | Captured idea; not yet analyzed or sized.                                 |
| Planned        | Analyzed, acceptance criteria set, scheduled (usually into a daily plan). |
| Active         | Selected for execution; analysis underway.                                |
| Implementation | Code being written.                                                       |
| Review         | Diff under review per review-workflow.                                    |
| Testing        | Test coverage being added/executed (follows review in this pipeline).     |
| Approved       | Review + testing passed; ready to commit/committed-pending-report.        |
| Completed      | Committed and reported.                                                   |
| Archived       | Historical record; no further action expected.                            |

## Directory mapping

| Directory                  | Holds statuses            |
| -------------------------- | ------------------------- |
| `tasks/pending/`           | Backlog, Planned          |
| `tasks/in-progress/`       | Active, Implementation    |
| `tasks/review/`            | Review, Testing, Approved |
| `tasks/completed/`         | Completed                 |
| `tasks/archive/`           | Archived                  |
| `tasks/archive/obsolete/`  | Obsolete                  |
| `tasks/archive/duplicate/` | Duplicate                 |
| `tasks/archive/invalid/`   | Invalid                   |

The file's location is the primary status signal; the front-matter `Status:` field must
always match the directory.

## Task IDs

- Format `CHASHA-BE-TASK-NNN`, three digits, global monotonic counter starting at `CHASHA-BE-TASK-001`.
- Never reuse IDs, even for abandoned work (abandoned tasks go to `archive/`).
- Next ID = highest existing ID + 1 across all task directories.

## File naming

`CHASHA-BE-TASK-NNN.md`, e.g. `CHASHA-BE-TASK-004.md`. Files are stored in date-based subfolders: `tasks/pending/2026-09-01/CHASHA-BE-TASK-012.md`.

## Creating a task

1. Copy `templates/task-template.md` (or feature/bugfix template when the type is known) into
   `tasks/pending/`.
2. Fill every section; unknowns stay explicit as `assumption` labels.
3. The agent may draft task files from operator descriptions, but business requirements come
   only from the operator; the agent marks anything it derived.
4. Declare the minimal `## Required Skills` set using exact skill names from
   `.opencode/skills/` (see AGENTS.md §6.1); the agent consults each selected
   `SKILL.md` during implementation and review.
5. A task becomes Planned only when objective, scope, acceptance criteria, and testing/doc
   requirements are complete.

## Moving & completing

- Move the file at each transition (update `Status:` in the same edit).
- On completion: append the final report block to the task file, then move to
  `tasks/completed/`. Include commit message + hash.
- Archival happens after operator acceptance of a batch/day (move whole day's tasks).

## Prohibitions

- No implementation without a task file.
- No silent scope changes: scope edits are recorded in the task file with a dated note;
  behavior-affecting changes need operator confirmation.
- No deleted tasks: cancel by moving to `archive/` with a cancellation note.
