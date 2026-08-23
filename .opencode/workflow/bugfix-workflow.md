# Bugfix Workflow

Use for correcting existing behavior. Template: `templates/bugfix-template.md`.
Primary objectives: correct cause, not symptom; prove the fix; change nothing else.

## Stage 1 — Reproduce & diagnose

1. Capture symptoms: endpoint/flow, expected vs actual (envelopes, codes, messages).
2. Reproduce deterministically where possible (curl against dev server, a script, or — once
   wired — a failing test). Record exact reproduction steps in the task file.
3. Trace the path: route → middleware order → controller → handler → repository → data.
   Identify the faulty layer and the precise line(s).
4. Classify: `existing-behavior` bug (code does X but requirement says Y — cite the task
   that defines Y) vs regression (worked before; find the commit/change) vs spec/doc drift
   (implementation is fine, documentation lies — fix docs, not code).

## Stage 2 — Root-cause statement

Write one sentence: "Because <cause>, <observable failure> happens when <condition>."
If you cannot write it, you have not found the root cause — keep diagnosing.

## Stage 3 — Fix plan

- Smallest change that removes the cause for all affected paths (check for sibling call
  sites with the same defect).
- Regression risk list: what else depends on the faulty behavior? Search usages.
- If the "bug" is actually intended behavior or a business decision, stop and ask.

## Stage 4 — Implement

- Minimal diff; no drive-by refactors; follow all coding/naming rules.
- If the fix touches shared middlewares/envelopes/auth, treat impact as cross-module:
  enumerate affected endpoints explicitly.

## Stage 5 — Prove it

- The reproduction from Stage 1 now passes.
- Regression test added per testing-rules (failing-before, passing-after) whenever feasible;
  otherwise justify deferral explicitly.
- Full gates G4–G6 (validation + conditional checks per quality-rules §R2).

## Stage 6 — Review, commit, report

Review-workflow on the full diff. Commit as `fix(<scope>): <what was corrected>`, e.g.
`fix(auth): prevent expired refresh token reuse`. One commit per task; append final report
to the task file; deliver to operator.

### Urgent/hotfix note

There is no separate hotfix pipeline in this repository yet. For production-urgent fixes,
mark the task `priority: urgent` in the file, keep the same workflow stages (compressed
analysis is acceptable, none may be skipped), and inform the operator before committing.
