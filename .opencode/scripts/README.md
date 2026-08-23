# Scripts

Reserved for future automation helpers that support the `.opencode/` engineering system.

## Intended candidates (none implemented yet)

| Idea                        | Purpose                                                                 |
| --------------------------- | ----------------------------------------------------------------------- |
| `next-task-id`              | Scan `tasks/**` and print the next free `TASK-NNN`.                     |
| `validate-structure`        | Assert required directories/files of this system exist.                 |
| `task-status <id> <status>` | Move a task file between lifecycle directories and update front-matter. |

## Ground rules for future scripts

- Scripts assist; they never replace agent judgment or bypass hooks/gates.
- No secrets in scripts; no network calls without operator approval.
- Keep them dependency-free (Node built-ins) so they run with the repo's Node version.
