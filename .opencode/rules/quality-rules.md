# Quality Rules

Reliable, maintainable software is the objective; code is only the means. These gates are
binary — a task either passes them or is not complete.

## R1. Mandatory verification (every task)

Run from repo root:

```bash
npm run npm:check   # npm ls + tsc --noEmit + eslint --max-warnings=0 + prettier --check
npm run lint        # eslint --max-warnings=0
```

Both must be green before commit. Hooks will enforce this repo-wide at commit time anyway;
fix root causes instead of working around hooks.

## R2. Conditional verification

| If the task touched... | Also verify                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| DB schema              | New migration exists AND is re-exported in `src/index.ts`; runs on dev; `down()` sane. |
| Seeds                  | Boot order intact; upsert idempotency (run boot twice mentally/actually).              |
| Endpoints              | Swagger JSON parses; `$ref`s resolve; status codes match implementation.               |
| Auth/authz             | Guard triple matches seed; session checks untouched.                                   |
| Caching reads          | Invalidation keys updated after writes.                                                |
| Tests (once wired)     | `npm test` green.                                                                      |

## R3. Code health

- No `any` without explicit justification in the report.
- No suppressed lint/type errors (`@ts-ignore`, eslint disables) without documented reason.
- No debugging artifacts (`console.log`, dead code, commented-out blocks).
- No TODOs unless the task demands one.
- No unrelated reformatting/rename noise in the diff.

## R4. Behavioral honesty

- Behavior changes beyond the task scope are forbidden, even if improvements — record as
  `proposed-improvement` instead.
- Failing checks outside the task's scope are reported to the operator, not silently fixed
  or ignored.

## R5. Operational qualities to consider (proportionate)

Correctness first; then maintainability and architectural integrity; security by default;
testability of new logic; observability where a new failure mode appears (log/metric);
performance only where relevant scale demands it; operational simplicity over cleverness.

## R6. Definition of done (authoritative checklist)

- [ ] Implementation complete per task acceptance criteria.
- [ ] Architecture respected (boundaries, idioms, layering).
- [ ] Validation implemented for all new external input.
- [ ] Authorization correct; permissions seeded & assigned where required.
- [ ] Migrations created/re-exported where required; seeds updated where required.
- [ ] Tests added/updated where required (or absence explicitly approved).
- [ ] Swagger synchronized where applicable.
- [ ] `npm:check` + `lint` green (+ tests when wired).
- [ ] Full diff reviewed via review-workflow with the ten questions answered.
- [ ] One dedicated Conventional Commit containing only this task's changes.
