# CHASHA-BE-TASK-019 — Standardize `index.ts` Barrel Exports and Fix Typos/Naming Mistakes

## Metadata

- **Task ID:** CHASHA-BE-TASK-019
- **Type:** Refactor
- **Priority:** Medium
- **Status:** Backlog
- **Domain:** Cross-cutting / Architecture
- **Module:** All modules
- **Dependencies:** None

---

## Context

`existing-rule`: `.opencode/rules/naming-rules.md` defines the project's naming standards — kebab-case files, mandatory layer suffixes, PascalCase identifiers, SCREAMING_SNAKE enum values. The codebase contains **652 `index.ts` barrel files** across `src/`, but **149 are empty placeholder barrels** serving no current purpose. Several barrel exports are missing, inconsistent, or create layering violations. Additionally, known typos persist in the codebase that violate the established naming conventions.

`existing-rule`: `.opencode/rules/naming-rules.md` section R7 explicitly defers typo fixes to dedicated tasks ("renaming a typoed public identifier is a refactor that needs its own task approval"). This task provides that dedicated task.

`existing-behavior`: A repository-wide audit reveals:

1. **`index.ts` barrel issues**: The `shared/v1/database/schema/index.ts` barrel omits the `faqs` schema, making `faqs` schema types inaccessible via `@/shared/v1/database/schema`. Shared database schema files import from `@/modules/v1/` (4 files), creating a layering violation. Module root barrels re-export ALL layers, creating an overly wide public surface area. 149 empty placeholder barrels add maintenance burden with no current value.

2. **Known typos**: Several identifiers contain misspellings that violate the project's naming conventions. These are documented in `.opencode/context/repository-context.md` section "Known deviations" and include: `getAllEarlyAccessRequestContoller`, `UpdateEalryAccessRequestCommand`, `find-early-access-request-status-by-slug.*`, `find-buisness-type-by-slug-repository.contract.ts`, `COUNSEL_REUQEST_SMS_QUEUE`, `CreatebusinessEmployeeSession*`, `businessTypebusinesses`, `EarlyAccessRequests` property, migration names containing `Cusbin` (should be `Casbin`), `Emplooye` (should be `Employee`), `Statuess` (should be `Statuses`), `Documention` (should be `Documentation`), `permissioData` (should be `permissionData`), `revokedAllBusinessEmployeeSessionById` (should be `revokeAllBusinessEmployeeSessionById`), `childrens` directory (should be `children`), `Runned` (should be `Ran`), `refrence` (should be `reference`).

3. **Copy-paste module reference errors**: `business-employee-sessions/presentation/routes/index.ts` re-exports `platform-admin-session.route` instead of the correct business-employee-session route. `business-employees/infrastructure/persistence/typeorm/repositories/index.ts` re-exports `find-platform-admin-by-phone-number.repository.ts` instead of `find-business-employee-by-phone-number.repository.ts`.

`derived-decision`: This task focuses on two specific mechanical cleanups — (A) standardizing `index.ts` barrel export conventions to establish clear public export boundaries and eliminate unnecessary barrels, and (B) correcting genuine typos and naming mistakes that violate established naming conventions. This task does NOT duplicate the broader naming-convention standardization work of CHASHA-BE-TASK-018, which focuses on establishing naming standards for files, folders, classes, enums, and identifiers across the project. This task handles the mechanical cleanup of barrel files and the correction of specific documented typos.

---

## Objective

Standardize `index.ts` barrel file conventions across the entire Chasha Backend codebase and fix all genuine typos and naming mistakes identified in the repository audit, ensuring that barrel exports establish clear public boundaries, unnecessary barrels are removed, circular dependencies are prevented, and all naming follows the project's established conventions.

---

## Scope

### In scope

#### Part A: `index.ts` Standardization

- Audit all `index.ts` files across `src/`, `src/modules/v1/`, `src/shared/v1/`, `src/config/`, `src/infrastructure/`
- Establish which directories **require** a barrel `index.ts` and which do not
- Fix the `shared/v1/database/schema/index.ts` barrel to include the missing `faqs` schema export
- Eliminate layering violations where `shared/v1/database/schema/` files import from `@/modules/v1/`
- Remove unnecessary empty placeholder barrels (149 identified) where they add no value
- Standardize barrel export patterns to avoid overly wide public surface areas
- Prevent circular dependency risks introduced by module root barrels re-exporting all layers
- Ensure each architectural boundary has a clear, intentional public export surface
- Review and standardize `src/index.ts` migration re-exports

#### Part B: Typo and Naming Mistakes

- Fix all documented typos from `.opencode/context/repository-context.md` section "Known deviations":
  - `getAllEarlyAccessRequestContoller` → `getAllEarlyAccessRequestController`
  - `DetailEarlyAccessRequestReponseDTO` → `DetailEarlyAccessRequestResponseDTO`
  - `UpdateEalryAccessRequestCommand` → `UpdateEarlyAccessRequestCommand`
  - `create-early-access-request.repositroy.ts` → `create-early-access-request.repository.ts`
  - `find-ealry-access-request-status-by-slug.*` → `find-early-access-request-status-by-slug.*`
  - `find-buisness-type-by-slug-repository.contract.ts` → `find-business-type-by-slug-repository.contract.ts`
  - `COUNSEL_REUQEST_SMS_QUEUE` → `COUNSEL_REQUEST_SMS_QUEUE`
  - `CreatebusinessEmployeeSession*` → `CreateBusinessEmployeeSession*`
  - `businessTypebusinesses` → `businessTypeBusinesses`
  - `EarlyAccessRequests` property → `earlyAccessRequests`
  - `permissioData` → `permissionData`
  - `revokedAllBusinessEmployeeSessionById` → `revokeAllBusinessEmployeeSessionById`
  - `Runned` → `Ran`
  - `Documention` → `Documentation`
  - `refrence` → `reference`
  - `childrens` directory → `children`
  - `find-platform-admin-by-phone-number.repository.ts` in `business-employees` → `find-business-employee-by-phone-number.repository.ts`
  - `platform-admin-session.route.ts` in `business-employee-sessions` → `business-employee-session.route.ts`
  - Migration files: `Create_Cusbin_Rule` → `Create_Casbin_Rule`, `Emplooye` → `Employee`, `Statuess` → `Statuses`, `Chasha` filename typo in `Create_Chasha_Caches`
- Update all affected imports, exports, barrel re-exports, and references after each rename
- Verify no stale references remain after all renames

### Out of scope

- Architectural folder restructuring (covered by other tasks)
- Moving files between architectural layers
- Changing business behavior
- Changing database schemas or migration tracking (migration file renames require database-level coordination)
- Modifying API routes or contracts
- Adding new features
- General naming convention establishment (covered by CHASHA-BE-TASK-018)
- Modifying `.opencode` task structure

---

## Technical Requirements

### T1. `index.ts` Barrel Convention

All `index.ts` files must follow a single consistent convention based on the project's existing architecture:

- **Public export boundaries only**: A barrel `index.ts` should exist only where there is a genuine need to aggregate and re-export types/functions for consumers above that layer.
- **No unnecessary barrels**: Empty placeholder barrels with no exports should be removed unless they serve as scaffolding for future development (documented decision).
- **No layering violations**: `shared/v1/database/schema/` must NOT import from `@/modules/v1/`. Schema definitions must be self-contained or import only from `@/shared/v1/`.
- **Complete exports**: Every barrel that should export something must export it. Missing schema exports (e.g., `faqs`) must be added.
- **Circular dependency prevention**: Module root barrels must NOT re-export infrastructure internals (repository implementations) through the public surface. Only domain contracts and public interfaces should be exported at module roots.

### T2. Naming and Typo Fixes

All typos must be corrected following the naming rules in `.opencode/rules/naming-rules.md`:

- Files: kebab-case (`*.ts`, `*.entity.ts`, `*.repository.ts`, etc.)
- Identifiers: PascalCase for classes/interfaces/types/enums, camelCase for functions/variables
- Enum members: SCREAMING_SNAKE_CASE
- Database migration files: `<13-digit-timestamp>-<Snake_Case_Description>.ts`

### T3. Import/Export Propagation

When a typo or naming mistake is corrected, ALL of the following must be updated:

- Import statements referencing the old name
- Export statements referencing the old name
- Barrel `index.ts` re-exports referencing the old name
- Type references in other files
- Test file references
- Configuration references
- Migration file references (if applicable)

No stale references or broken imports may remain after corrections.

---

## Acceptance Criteria

- [ ] All required `index.ts` barrel files exist at architectural boundaries
- [ ] `shared/v1/database/schema/index.ts` includes the `faqs` schema export
- [ ] No `shared/v1/database/schema/` file imports from `@/modules/v1/`
- [ ] Unnecessary empty placeholder barrels removed or documented as intentional scaffolding
- [ ] No circular dependency risks introduced by barrel re-exports
- [ ] Module root barrels export only domain contracts and public interfaces (not infrastructure internals)
- [ ] All documented typos corrected (see Scope section Part B)
- [ ] All file names corrected (kebab-case, no misspellings)
- [ ] All class/interface/type/enum/function/variable names corrected
- [ ] All enum member names corrected
- [ ] All import/export references updated after renames
- [ ] No stale references remain (verified by global search)
- [ ] No broken imports remain
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run lint` passes
- [ ] `npm run format:check` passes
- [ ] `npm test` passes (all suites)
- [ ] `npm run build:production` passes
- [ ] Global search for each corrected typo returns zero results
- [ ] No behavior is unintentionally changed

---

## Validation

- `npx tsc --noEmit` (catches broken imports and type errors)
- `npm run lint` (eslint --max-warnings=0)
- `npx prettier --check .`
- `npm test` (all existing test suites)
- `npm run build:production`
- Global search for each corrected typo returns zero results
- Grep for `import` statements referencing old names returns no results
- Verify no circular dependencies with dependency analysis
- Verify `@/shared/v1/database/schema` exports include `faqs`
- Verify no `@/modules/v1` imports exist in `@/shared/v1/database/schema/`

---

## Testing Requirements

- All existing test suites remain green after all renames and barrel changes
- No new tests required (mechanical cleanup)
- Verify no stale imports by running full compilation (`npx tsc --noEmit`)
- Verify barrel exports resolve correctly by importing from each barrel path
- Verify no circular dependencies by checking import graphs

---

## Documentation Requirements

- Update `.opencode/context/repository-context.md` — remove the fixed typos from the "Known deviations" section
- Update `.opencode/rules/naming-rules.md` if any new barrel conventions need to be formally documented
- Update `.opencode/context/architecture-context.md` if barrel export boundaries change materially
- Swagger/OpenAPI: not applicable
- Permission seeds: not applicable
- `.opencode/context` updates: remove fixed typos from `repository-context.md` known deviations

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
refactor(barrels): standardize index.ts exports and fix naming typos
```

If the existing git convention requires a different commit format, follow that convention.

---

## Task Storage

.opencode/tasks/pending/2026-09-13/CHASHA-BE-TASK-019.md
