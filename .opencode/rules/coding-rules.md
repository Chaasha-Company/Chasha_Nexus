# Coding Rules

TypeScript-first, match existing style. The codebase's conventions outrank personal
preference and generic best-practice opinions.

## R1. Language & strictness

- TypeScript strict mode (`tsconfig.base.json`: `strict: true`, ES2022 target, decorators
  enabled). Never weaken compiler options.
- `any` is forbidden unless explicitly justified in the task/report. Prefer precise types;
  reuse DTO interfaces; where the codebase unions Zod types into DTOs for inference, follow
  that established pattern rather than inventing a new one.
- Use the `@/` import alias (mapped to `src/` in tsconfig, vite, jest — keep all three
  consistent if ever touched).
- Class fields on entities use definite assignment (`!:`) per existing schema style.

## R2. Style (enforced by tooling)

- Prettier is authoritative: effective config `.prettierrc` (`printWidth: 260`,
  singleQuote, trailingComma all). Do not hand-wrap lines to narrower widths.
- ESLint must pass with `--max-warnings=0`. Do not add inline disables without a
  documented reason in the task report.
- No comments unless they carry non-obvious rationale; do not narrate code. The existing
  codebase uses comments sparingly.

## R3. Functions & modules

- Exported arrow-function consts are the default for controllers, handlers, repositories,
  helpers, middlewares (matches existing style). Classes appear only where TypeORM models
  require them.
- One endpoint per route file; one handler per file; barrels (`index.ts`) re-export every
  new file — update barrels whenever you add files.
- Curried factory invocation style for repositories: declare `xRepository()` then call with
  `(args, manager?)`.
- Keep files focused: a handler orchestrates one use case; extract shared logic only when a
  second real consumer exists or an obvious shared helper already exists.

## R4. Error handling

- Throw the shared exception factories (`throwBadRequestException`, `throwUnAuthenticatedException`,
  `throwUnAuthorizedException`, `throwNotFoundException`, `throwRequestConflictException`,
  `throwTooManyRequestException`) with translated messages/details — never raw `Error` with
  ad-hoc status handling, never `res.status(...)` inside application layers.
- Controllers always forward errors via `next(error)`; the central `errorHandlerHelper`
  formats responses. Never write competing error formatting.

## R5. Messages & translations

- Every user-facing string resolves through the translator: `t(ResponseMessages | ValidationMessages, KEY, req.lang)`.
  Adding a case means adding the enum key plus both `fa` and `en` dictionary entries.
- Never inline English/Persian literals into handlers/validators.

## R6. Hygiene

- No debugging leftovers (`console.log`, commented-out blocks, dead exports).
- No TODOs unless the task explicitly demands one; otherwise resolve or convert to backlog items.
- No unrelated reformatting: do not run global formatters or renames as side effects of a task.

## R7. Dependencies

- Adding npm dependencies requires operator approval and must be justified against existing
  ones (e.g., reuse zod/node-cache/prom-client instead of introducing alternatives).
- Known installed-but-unused packages (e.g., `melipayamak` wrapper vs axios-based SMS,
  `@prisma/client`) are not licenses to adopt them; ask first.
