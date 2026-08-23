# Review Workflow

Every task passes a full self-review before commit; the operator may re-review at any time.
Record: `templates/review-template.md` appended to the task file.

## Procedure

1. Generate the complete diff (`git status` + `git diff` including untracked file contents).
2. Walk it file-by-file against the task's acceptance criteria — nothing outside scope may appear.
3. Evaluate each dimension below; classify findings.

## Dimensions & findings

| Dimension      | Check                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Architecture   | Layers/boundaries respected; established idioms used; barrels updated; no cross-context internals.                       |
| Business logic | Matches acceptance criteria exactly; no invented requirements; behavior changes all trace to the task.                   |
| Security       | security-rules checklist (auth family, guard, ownership, validation, leakage, secrets).                                  |
| Authorization  | Correct actor middleware; permission triple present, seeded, assigned; admin/employee surfaces distinct.                 |
| Validation     | Strict schemas cover every input; messages via translator with fa+en; pagination shared schema reused.                   |
| Database       | Model conventions; migration created + re-exported in `src/index.ts`; down() sane; seeds idempotent; cache invalidation. |
| Tests          | Required families covered or deferral approved; assertions meaningful.                                                   |
| Swagger        | Path/tag/operationId/security/schemas match implementation; real status codes; `$ref`s resolve.                          |
| Error handling | Shared exceptions only; translated messages; central handler path intact.                                                |
| Naming         | Matches naming-rules; sibling consistency (including existing typos policy).                                             |
| Duplication    | No reinvented helper/DTO/validator; reuse list from analysis honored.                                                    |

Finding severity:

- **Blocker** — violates a rule, breaks architecture/security, or misses acceptance criteria. Must fix before commit.
- **Major** — likely defect or inconsistency; fix or get explicit operator waiver.
- **Minor / Note** — improvement opportunities; record, do not fix inline if out of scope.

## The ten questions (all must be answered explicitly)

1. Does the implementation satisfy the task?
2. Does it preserve architecture?
3. Does it introduce unnecessary coupling?
4. Does it create security risks?
5. Does it create authorization gaps?
6. Does it maintain API consistency?
7. Does it maintain database consistency?
8. Are tests sufficient?
9. Is Swagger synchronized?
10. Is the code production-ready?

Any "No" is a blocker to completion until resolved or waived by the operator.

## Verdict

- `approved` → proceed to commit (G8), move task toward Completed.
- `changes-required` → fix, re-run gates, re-review changed portion plus integration points.
- Record verdict + findings in the review template inside the task file; keep it after archiving
  so decisions remain auditable.
