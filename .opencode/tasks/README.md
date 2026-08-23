# Tasks

Engineering tasks live here as individual Markdown files and move between subdirectories as
their status changes. The directory is the status signal.

## Layout

| Directory    | Statuses                  | Meaning                                              |
| ------------ | ------------------------- | ---------------------------------------------------- |
| `backlog/`   | Backlog, Planned          | Captured & analyzed work waiting for a slot.         |
| `active/`    | Active, Implementation    | Currently being executed (one at a time).            |
| `review/`    | Review, Testing, Approved | Diff under review / tests / approved-pending-commit. |
| `completed/` | Completed                 | Committed + reported; awaiting archival.             |
| `archived/`  | Archived                  | Historical record only.                              |

## Rules

- Lifecycle, IDs, naming, transitions: see `workflow/task-workflow.md`.
- Templates: `templates/task-template.md`, plus feature/bugfix variants.
- Every task file carries its own final report and review record once past review.
- Task IDs are global, monotonic (`TASK-001`, `TASK-002`, ...), never reused; the next ID
  is highest existing + 1 across all directories.
- Never delete task files — cancel by archiving with a note.
