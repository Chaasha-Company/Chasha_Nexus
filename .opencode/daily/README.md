# Daily

Daily operating records for the 4–6 tasks/day cadence.

## Files

- Active daily plans: `YYYY-MM-DD-day-NN.md` in this directory.
- Finished plans move to `archive/` after the end-of-day summary is complete.
- Per-task execution log entries use `templates/day-log-template.md` inside the day file;
  the day file itself is created from `../templates/daily-plan-template.md`.

## Cadence

1. Operator lists today's 4–6 task IDs (from `tasks/backlog/` or new requests).
2. Agent creates the day file, marks tasks Planned → Active, and executes them sequentially
   through the development-workflow pipeline.
3. At day end: outcomes updated, summary written, file archived; unfinished tasks return to
   `tasks/backlog/` with a carry-over note.
