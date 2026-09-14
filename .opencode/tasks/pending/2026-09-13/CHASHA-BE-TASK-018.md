# CHASHA-BE-TASK-018 — Standardize File, Folder, Type, Enum & Shared Naming Conventions

## Metadata

- **Task ID:** CHASHA-BE-TASK-018
- **Type:** Refactor
- **Priority:** Medium
- **Status:** Backlog
- **Domain:** Cross-cutting / Architecture
- **Module:** All modules
- **Dependencies:** None

---

## Context

`existing-rule`: `.opencode/rules/naming-rules.md` defines the project's naming standards — kebab-case files, mandatory layer suffixes, PascalCase identifiers, SCREAMING_SNAKE enum values, singular kebab-case URLs. However, the actual codebase has accumulated numerous deviations from these rules.

`existing-behavior`: A repository-wide audit reveals inconsistent file naming, typos in identifiers, inconsistent enum file naming, inconsistent folder naming, and inconsistent identifier casing — all of which reduce maintainability and make it harder for new developers (and AI agents) to predict naming conventions.

`derived-decision`: This task focuses exclusively on **naming consistency** — not architectural restructuring (covered by other tasks). The goal is to unify naming so that every equivalent concept uses one predictable naming pattern.

---

## Objective

Audit and standardize file, folder, type, enum, and identifier naming conventions across the entire Chasha Backend codebase so that every equivalent concept follows one consistent, predictable naming pattern aligned with the established rules in `.opencode/rules/naming-rules.md`.

---

## Scope

### In scope

- File naming across all modules and shared directories
- Folder naming across all modules and shared directories
- Class, interface, type, and enum identifier naming
- Enum member naming conventions
- Repository file naming
- Handler file naming
- Command/query file naming
- DTO file naming
- Entity interface naming
- Shared type and enum naming
- Known typos in identifiers (files, types, variables, parameters)
- Inconsistent singular/plural folder names
- Inconsistent file suffix usage
- Inconsistent enum file naming patterns
- Inconsistent schema folder naming
- Copy-paste naming errors
- Missing or incorrect PascalCase in identifiers

### Out of scope

- Architectural folder restructuring (covered by other tasks)
- Moving files between architectural layers
- Changing business behavior
- Changing database schemas
- Modifying API routes or contracts
- Adding new features
- Modifying `.opencode` task structure (covered by TASK-011)

---

## Technical Requirements

### R1. Naming Standard

All naming must follow the conventions established in `.opencode/rules/naming-rules.md`:

**Files & directories:** kebab-case everywhere. Layer suffixes mandatory:

- Routes: `*.route.ts`
- Controllers: `*.controller.ts`
- DTOs: `*.dto.ts`
- Validations: `*.validation.ts`
- Commands/Queries: `*.command.ts` / `*.query.ts`
- Handlers: `*.handler.ts`
- Results: `*.result.ts`
- Repositories: `*.repository.ts`
- Contracts: `*.contract.ts`
- Entities: `*.entity.ts`
- DB models: `*.schema.ts`
- Middlewares: `*.middleware.ts`
- Seeds: `*.seed.ts`
- Enums: `*.enum.ts`

**Identifiers:**

- Controllers: `<verb><Scope><Entity>Controller` (camelCase)
- Handlers: camelCase query/command name + `Handler` suffix
- Commands/Queries/Results: PascalCase interface names
- Repositories: verb-first camelCase factories
- Entities: `<Prefix>Entity` interfaces; Models: `<Prefix>Model` classes
- Enums: PascalCase export with SCREAMING_SNAKE values

**Database:**

- Tables: plural snake_case
- Columns: explicit `{ name: '<entityPrefix>_<snake_case>' }`

### R2. Enum File Naming Standard

All enum files must follow one consistent pattern. The established convention is lowercase kebab-case with `.enum.ts` suffix:

- `validation-message.enum.ts` (correct)
- `response-message.enum.ts` (correct)
- `REGEX-PATTERN.enum.ts` (wrong — should be `regex-pattern.enum.ts`)
- `RABBIT_MQ_QUEUE.enum.ts` (wrong — should be `rabbit-mq-queue.enum.ts`)
- `HTTP_STATUS.enum.ts` (wrong — should be `http-status.enum.ts`)
- `EVENT_NAME.enum.ts` (wrong — should be `event-name.enum.ts`)
- `ERROR_CODE.enum.ts` (wrong — should be `error-code.enum.ts`)
- `CACHE_KEY.enum.ts` (wrong — should be `cache-key.enum.ts`)

### R3. Identifier Naming Standard

All TypeScript identifiers must follow consistent PascalCase conventions:

- Interfaces: PascalCase, no `I` prefix unless the codebase already uses it
- Types: PascalCase
- Enums: PascalCase
- Enum members: SCREAMING_SNAKE_CASE
- Classes: PascalCase
- Functions: camelCase
- Variables: camelCase

### R4. Folder Naming Standard

All folders must use consistent naming:

- Module directories: kebab-case (e.g., `business-employees`, `early-access-requests`)
- Sub-directories within modules: consistent singular/plural (e.g., always `handlers/` not `handler/`)
- Schema directories: follow DB table naming (underscore snake_case) — this is intentional and should be preserved
- Infrastructure directories: consistent naming across modules

### R5. Schema Folder Naming

Schema folders under `shared/v1/database/schema/` use underscore naming matching DB table names. This is a deliberate convention and should be preserved. Do not rename schema folders to kebab-case.

---

## Specific Issues to Fix

### Category 1: Typos in Identifiers

| Location                                                                                                                                | Current                              | Correct                           |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | --------------------------------- |
| `early-access-requests/.../find-ealry-access-request-status-by-slug.repository.ts`                                                      | `ealry`                              | `early`                           |
| `early-access-requests/.../find-ealry-access-request-status-by-slug-repository.contract.ts`                                             | `ealry`                              | `early`                           |
| `early-access-requests/.../update-early-access-request.command.ts` type `UpdateEalryAccessRequestCommand`                               | `Ealry`                              | `Early`                           |
| `early-access-requests/.../update-early-access-request.handler.ts` parameter `ealryAccessRequestData`                                   | `ealry`                              | `early`                           |
| `early-access-requests/.../create-global-early-access-request.handler.ts` variable `ealryAccessRequestPendingStatus`                    | `ealry`                              | `early`                           |
| `early-access-requests/.../find-early-access-request-status-by-id.repository.ts` variable `ealryAccessRequestStatusRepository`          | `ealry`                              | `early`                           |
| `early-access-requests/.../find-ealry-access-request-status-by-slug-repository.contract.ts` parameter `ealryAccessRequestStatusData`    | `ealry`                              | `early`                           |
| `businesses/.../find-buisness-type-by-slug-repository.contract.ts` filename                                                             | `buisness`                           | `business`                        |
| `shared/v1/enums/rabbit-mq-queue/RABBIT_MQ_QUEUE.enum.ts` member `COUNSEL_REUQEST_SMS_QUEUE`                                            | `REUQEST`                            | `REQUEST`                         |
| `business-employee-sessions/.../create-business-employee-session-request.dto.ts` interface `CreatebusinessEmployeeSessionRequestDTO`    | `Createbusiness`                     | `CreateBusiness`                  |
| `business-employee-sessions/.../create-business-employee-session.command.ts` interface `CreatebusinessEmployeeSessionCommand`           | `Createbusiness`                     | `CreateBusiness`                  |
| `business-employee-sessions/.../create-business-employee-session-repository.contract.ts` parameter `datacreatePlatformAdminSessionData` | `datacreatePlatformAdminSessionData` | proper camelCase                  |
| `businesses/domain/entities/business-type.entity.ts` property `businessTypebusinesses`                                                  | `businessTypebusinesses`             | `businessTypeBusinesses`          |
| `early-access-requests/domain/entities/early-access-status.entity.ts` property `EarlyAccessRequests`                                    | PascalCase property                  | `earlyAccessRequests` (camelCase) |

### Category 2: File Naming Inconsistencies

| Location                                                                                                         | Issue                               | Fix                                       |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------- |
| `shared/v1/enums/REGEX-PATTERN.enum.ts`                                                                          | UPPER-KEBAB case                    | Rename to `regex-pattern.enum.ts`         |
| `shared/v1/enums/RABBIT_MQ_QUEUE.enum.ts`                                                                        | UPPER_SNAKE case                    | Rename to `rabbit-mq-queue.enum.ts`       |
| `shared/v1/enums/HTTP_STATUS.enum.ts`                                                                            | UPPER_SNAKE case                    | Rename to `http-status.enum.ts`           |
| `shared/v1/enums/EVENT_NAME.enum.ts`                                                                             | UPPER_SNAKE case                    | Rename to `event-name.enum.ts`            |
| `shared/v1/enums/ERROR_CODE.enum.ts`                                                                             | UPPER_SNAKE case                    | Rename to `error-code.enum.ts`            |
| `shared/v1/enums/CACHE_KEY.enum.ts`                                                                              | UPPER_SNAKE case                    | Rename to `cache-key.enum.ts`             |
| `shared/v1/helpers/api/handlers/pagination-response.handler.ts`                                                  | Suffix `handler` should be `helper` | Rename to `pagination-response.helper.ts` |
| `platform-admins/application/queries/.../get-list-option-platform-admin-role.query.ts` inside `handlers/`        | `.query.ts` file in `handlers/` dir | Rename to `.handler.ts`                   |
| `early-access-requests/application/queries/.../get-list-option-early-access-request.query.ts` inside `handlers/` | `.query.ts` file in `handlers/` dir | Rename to `.handler.ts`                   |

### Category 3: Folder Naming Inconsistencies

| Location                                                                                   | Issue                     | Fix                                                          |
| ------------------------------------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------ |
| `authentications/application/commands/business/refresh-token/handler/`                     | Singular `handler/`       | Rename to `handlers/`                                        |
| `business-employees/.../find-platform-admin-by-phone-number.repository.ts`                 | Wrong module name in file | Rename to reference `business-employee`                      |
| `business-employee-sessions/.../platform-admin-session.route.ts`                           | Wrong module name in file | Rename to reference `business-employee-session`              |
| `business-employee-sessions/.../revoked-all-business-employee-session-by-id.repository.ts` | Past-tense `revoked`      | Rename to present-tense `revoke-all-...` or `delete-all-...` |
| `infrastructure/cache-system/node-cache/other/dtos/requests/`                              | Plural `requests/`        | Rename to singular `request/`                                |
| `infrastructure/cache-system/node-cache/other/dtos/responses/`                             | Plural `responses/`       | Rename to singular `response/`                               |

### Category 4: Shared Type/Interface Naming Inconsistencies

| Location                                                                                             | Issue                                | Fix                       |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------- |
| `shared/v1/types/config/api/error/error-response.type.ts` exports `ErrorsResponse`                   | Inconsistent with `ApiErrorResponse` | Standardize naming        |
| `shared/v1/interfaces/config/api/handler/success-response.interface.ts` exports `ApiSuccessResponse` | Check consistency                    | Verify consistent pattern |

### Category 5: DTO Naming Inconsistencies

| Location                                                                      | Issue            | Fix                        |
| ----------------------------------------------------------------------------- | ---------------- | -------------------------- |
| `early-access-requests/.../get-all-early-access-request-request-query.dto.ts` | Double `request` | Rename to remove duplicate |
| `authorizations/.../get-platform-admin-role-permissions-request-query.dto.ts` | Double `request` | Rename to remove duplicate |
| `authorizations/.../get-all-platform-admin-role-request-query.dto.ts`         | Double `request` | Rename to remove duplicate |

---

## Acceptance Criteria

- [ ] All known typos in identifiers are corrected (files, types, variables, parameters)
- [ ] All enum files follow one consistent naming pattern (lowercase kebab-case)
- [ ] All files follow kebab-case with mandatory layer suffixes
- [ ] All folders follow consistent singular/plural naming
- [ ] All `.query.ts` files in `handlers/` directories are renamed to `.handler.ts`
- [ ] All `handler/` singular folders are renamed to `handlers/` plural
- [ ] All wrong-module-name files are corrected
- [ ] All past-tense repository names are corrected to present-tense
- [ ] All plural `requests/`/`responses/` directories are corrected to singular
- [ ] All double-`request` DTO filenames are corrected
- [ ] All interface/type PascalCase inconsistencies are corrected
- [ ] All imports and references are updated after renames
- [ ] No broken imports remain
- [ ] TypeScript compilation succeeds
- [ ] All tests pass
- [ ] No behavior is unintentionally changed

---

## Validation

- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes (eslint --max-warnings=0)
- [ ] `npx prettier --check .` passes
- [ ] `npm test` passes (all suites)
- [ ] `npm run build:production` passes
- [ ] Global search for `ealry` returns zero results
- [ ] Global search for `buisness` returns zero results
- [ ] Global search for `REUQEST` returns zero results
- [ ] Global search for `Createbusiness` returns zero results
- [ ] All enum files follow `*.enum.ts` kebab-case pattern
- [ ] All handler files in `handlers/` directories have `.handler.ts` suffix
- [ ] No `handler/` (singular) directories remain
- [ ] No wrong-module-name files remain
- [ ] No past-tense repository names remain
- [ ] No plural `requests/`/`responses/` directories remain in infrastructure

---

## Testing Requirements

- [ ] Existing test suites remain green after all renames
- [ ] No new tests required (naming-only change)
- [ ] Verify no stale imports by running full compilation

---

## Documentation Requirements

- Update `.opencode/rules/naming-rules.md` if any convention is clarified or added during implementation
- Update `.opencode/context/repository-context.md` known typos section — remove fixed typos
- Swagger/OpenAPI: not applicable
- Permission seeds: not applicable

---

## Implementation notes

(empty until planning)

---

## Final report

(empty until completion)

---

## Commit

### Recommended Commit Message

```
refactor(naming): standardize file, folder, type and enum naming conventions
```

If the existing git convention requires a different commit format, follow that convention.

---

## Task Storage

.opencode/tasks/pending/2026-09-13/CHASHA-BE-TASK-018.md
