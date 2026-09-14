# Tasks

Engineering tasks live here as individual Markdown files and move between subdirectories as
their status changes. The directory is the status signal.

## Layout

| Directory            | Statuses                  | Meaning                                                    |
| -------------------- | ------------------------- | ---------------------------------------------------------- |
| `pending/`           | Backlog, Planned          | Captured & analyzed work waiting for a slot.               |
| `in-progress/`       | Active, Implementation    | Currently being executed (one at a time).                  |
| `review/`            | Review, Testing, Approved | Diff under review / tests / approved-pending-commit.       |
| `completed/`         | Completed                 | Committed + reported; awaiting archival.                   |
| `archive/`           | Archived                  | Historical record only.                                    |
| `archive/obsolete/`  | Obsolete                  | No longer relevant due to architecture/product change.     |
| `archive/duplicate/` | Duplicate                 | Superseded by a canonical task.                            |
| `archive/invalid/`   | Invalid                   | Malformed, meaningless, or based on incorrect assumptions. |

## Date subfolders

Within each status directory, tasks are grouped by the date they are assigned/executed using a
`YYYY-MM-DD/` subfolder (e.g. `pending/2026-09-01/`, `in-progress/2026-09-27/`, `completed/2026-08-24/`).
This matches the physical location a task file declares in its `## Task Storage` section.

## Rules

- Lifecycle, IDs, naming, transitions: see `workflow/task-workflow.md`.
- Templates: `templates/task-template.md`, plus feature/bugfix variants.
- Every task file carries its own final report and review record once past review.
- Task IDs are global, monotonic (`CHASHA-BE-TASK-001`, `CHASHA-BE-TASK-002`, ...), never reused; the next ID
  is highest existing + 1 across all directories.
- Never delete task files — cancel by archiving with a note.

## Task Storage

Every task file must declare its physical location via a `## Task Storage` section at the
end of the file. The path must match where the file actually lives. For example:

```
## Task Storage

.opencode/tasks/pending/2026-09-01/CHASHA-BE-TASK-012.md
```

When a task moves between directories (e.g. `in-progress/` to `completed/`), update the storage
section to reflect the new path.
