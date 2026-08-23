# Git

## Purpose

Responsible for version-control discipline: atomic history, Conventional Commits, clean
staging, diff-based self-review, and integration with the repo's enforced hooks. Policy:
`../../rules/commit-rules.md`; release context: `../../workflow/release-workflow.md`.

## When This Skill Applies

- Every task's commit stage (always active at completion).
- History archaeology: regressions, blame, "when did this behavior change".
- Branch/merge/revert operations requested by the operator.

## Responsibilities

- One task = one dedicated Conventional Commit; never batch unrelated tasks; never mix
  reformatting noise into functional diffs.
- Inspect before staging: `git status` + full `git diff`; stage explicit paths only.
- Work within enforced tooling: commitlint (types `feat fix refactor perf test docs style
build ci chore revert`, header ≤ 100 chars), husky pre-commit running the full check
  suite repo-wide — slow by design; fix causes, never skip hooks.
- Match observed history conventions for scopes (existing examples: `(opencode)`,
  `(config)`, `(agents)`, `(authz)` plus module contexts).
- Stay branch-aware: current line of development is `main`; confirm branch and remote
  state before committing/pushing; push only when instructed.

## Required Knowledge

- Commit anatomy: type/scope/subject grammar, imperative mood, body for context when needed.
- Staging control: `git add <path>` versus blanket adds; partial staging (`-p`) for splits.
- Inspection commands: `git log --oneline`, `git show`, `git blame`, `git diff main...HEAD`.
- Safe history operations: what may be rewritten locally vs what must never be rewritten
  once pushed/shared.
- Recovery basics: restore staged/unstaged work safely; revert commits publicly instead
  of force-push rewrites.

## Repository Inspection

1. `git status` cleanliness before starting a task (report unrelated dirty state).
2. Recent messages for scope/style consistency of the planned commit.
3. Whether hooks are installed (`husky`) and expected to run for the operation at hand.

## Validation

- Commit contains exactly the task's files (including its task-file/report updates when applicable).
- Message passes commitlint on first try; no secrets or `.env` material staged.
- Post-commit: `git status` clean of unintended leftovers; hash captured for reporting.

## Common Failure Modes

- `git add .` sweeping unrelated local changes into an atomic commit.
- Fixing a failed pre-commit by weakening checks instead of code/docs.
- Descriptive drift: message says one thing, diff does another.
- Committing debugging artifacts because they were in the working tree unnoticed.

## Anti-Patterns

- Mega-commits spanning features ("weekly backup commit").
- Force-pushing shared branches; rewriting others' baseline.
- Commit messages like `fix bug` / `updates` that fail both lint and archaeology.
- Treating WIP commits on `main` as acceptable defaults.

## Engineering Expectations

History is documentation: each commit should compile, pass gates, and tell a reviewer
exactly which task it fulfills. The engineer's commits are as reviewed as their code.

## Definition of Done

- Task committed atomically with passing hooks, conventional message matching the change,
  clean post-commit status, and hash reported in the task file/report.
