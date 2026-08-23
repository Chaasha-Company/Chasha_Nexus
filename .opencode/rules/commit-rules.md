# Commit Rules

Conventional Commits are machine-enforced (commitlint: conventional config, header ≤ 100
chars). Beyond the tooling, these rules keep history auditable per task.

## R1. Format

```
<type>(<scope>): <short imperative summary>
```

- Allowed types (commitlint): `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `style`,
  `build`, `ci`, `chore`, `revert`.
- Header ≤ 100 characters, imperative mood, no trailing period.

## R2. Scope vocabulary

Prefer the bounded-context name in singular kebab-case; use cross-cutting scopes for
shared changes:

`auth`, `authz`, `permission`, `role`, `admin`, `employee`, `business`, `customer`,
`session`, `faq`, `early-access-request`, `lockup`, `database`, `api`, `validation`,
`security`, `config`, `deps`, `docs`.

## R3. Examples

```
feat(auth): add refresh token rotation
feat(early-access-request): add admin detail endpoint with permission guard
fix(auth): prevent expired refresh token reuse
fix(permission): synchronize role permission seed with new resource
refactor(business): separate business application handlers
test(authz): add role authorization coverage
docs(api): update early access request specification
chore(database): add permission resource index migration
```

## R4. Granularity

- One task = one commit. Never batch unrelated tasks.
- A task producing multiple logical deliverables still lands as one commit unless the
  operator asks for a split; keep the header focused on the primary outcome.
- Mixed type? Choose the dominant one (`feat` if user-visible behavior was added; `fix`
  if correcting existing behavior).

## R5. Pre-commit procedure (mandatory)

```bash
git status          # confirm expected file set, nothing stray
git diff            # read the full diff — this is also the review input
git add <files>     # stage explicitly; avoid blanket adds
git commit          # hooks run npm:check + lint repo-wide + commitlint
```

- Only the current task's files may be staged. Unrelated dirty state must be reported, not committed.
- Pre-commit runs the full suite repo-wide and can be slow — that is intended. Never skip,
  amend around, or bypass hooks.
- If commit-msg rejects the message, fix the message and re-commit normally.

## R6. Hygiene

- Never commit secrets, `.env*` values, credentials, tokens, or local-only artifacts.
- Task/report artifacts under `.opencode/tasks|daily` may be committed with the task's
  commit when they document that task (e.g., completed task file), keeping docs and code
  atomic.

## R7. After commit

Report commit message + hash in the final task report. Do not push unless the operator asked.
