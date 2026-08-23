# Daily Plan Template

Create as `daily/YYYY-MM-DD-day-NN.md` (NN = zero-padded day number of this engagement).
Archive to `daily/archive/` at end of day after updating outcomes.

---

```markdown
# Daily Plan — YYYY-MM-DD (Day NN)

- Operator assignments: <list TASK IDs, 4–6 tasks>
- Agent: chasha-agent

## Task board

| Task     | Title   | Type    | Priority | Start status | End status | Commit      |
| -------- | ------- | ------- | -------- | ------------ | ---------- | ----------- |
| TASK-0XX | <title> | feature | high     | Planned      | Completed  | <hash or —> |
| TASK-0XY | <title> | bugfix  | medium   | Planned      | Review     | —           |

## Execution log

### TASK-0XX — <title>

- Workflow used: feature-workflow
- Analysis highlights: <2–4 bullets with claim labels>
- Gates: npm:check PASS · lint PASS · tests <...> · swagger <...>
- Deviations/blocks: <none | description>
- Outcome: <Completed w/ commit hash | moved to review | blocked because ...>

(Repeat per task.)

## End-of-day summary

- Completed: <IDs>
- In review: <IDs>
- Blocked / carried over: <IDs + reason>
- Proposed improvements raised (not implemented): <list>
- Assumptions needing operator confirmation: <list>

## Notes for tomorrow

<Handover notes: next IDs, pending decisions, watch-outs.>
```
