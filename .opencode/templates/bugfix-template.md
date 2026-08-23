# Bugfix Task Template

Extends `task-template.md` (all base sections required). Add/complete the sections below
per bugfix-workflow.

---

```markdown
## Symptoms

- Observed: <actual behavior, exact envelope/codes/messages>
- Expected: <correct behavior + source of truth for the expectation (cite task/rule/spec)>

## Reproduction

Steps / request to reproduce deterministically:

1. <...>

Reproduction status: reproduced | not reproduced (explain)

## Diagnosis

- Faulty layer & location: <file:line>
- Root cause statement: "Because <cause>, <failure> happens when <condition>."
- Classification: existing-behavior bug | regression | spec/doc drift
- Evidence: <claim labels + paths>

## Affected surface

- Sibling call sites with same defect: <searched, list>
- Endpoints/flows impacted by the fix: <list>

## Fix strategy

<Smallest correct change; why it removes the cause; regression risks.>

## Verification plan

- [ ] Reproduction now passes
- [ ] Regression test added (failing-before/passing-after) or deferral approved: <...>
- [ ] Gates G4–G6 green; conditional checks per quality-rules §R2 listed
```
