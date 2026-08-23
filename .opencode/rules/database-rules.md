# Database Rules

MySQL + TypeORM, `synchronize: false`. Schema changes are migration-gated and
backward-conscious. The database is shared state — treat every change as irreversible-by-default.

## R1. Inspect first (mandatory before any DB change)

Existing models in `src/shared/v1/database/schema/<group>/` · relations & join columns ·
indexes/uniques · naming conventions · soft-delete columns · relevant migrations · how
repositories use the tables · transaction needs · seed interactions.

## R2. Models

- Entities live centrally under `src/shared/v1/database/schema/<group>/*.schema.ts` as
  `*Model` classes; register new models in the DataSource entities array and the schema barrel.
- Follow column conventions exactly (see `naming-rules.md` §R5): explicit column names,
  UUID PKs named `<prefix>_id`, timestamp trio with `@DeleteDateColumn` soft delete,
  `<prefix>_is_active`, `_fa/_en` bilingual pairs, MySQL `enum` columns for fixed sets.
- Relations via `@ManyToOne`/`@OneToMany` with `@JoinColumn({ name: '<fk_column>' })`,
  matching existing eager/lazy choices (`eager: false` is the norm).
- Keep model TS types truthful; if you touch a model with known type drift, fix its types
  only when it does not ripple beyond the task scope.

## R3. Migrations

- One concern per migration; filename `<13-digit-timestamp>-<Snake_Case_Description>.ts`
  implementing `up(queryRunner)` / `down(queryRunner)`.
- **Never edit an already-applied migration.** Prefer a new forward migration even for fixes.
- Generate/diff against dev using `npm run migration:generate:dev` (or hand-write for
  precise control), then run `npm run migration:run:dev`.
- **Every new migration file MUST be re-exported from `src/index.ts`** (the TODO-marked
  block) or production builds will not bundle it.
- Remember the dev/prod datasource path split: dev `-d ./src/shared/v1/database/core/data-source.ts`,
  prod `-d ./shared/v1/database/core/data-source.js`.
- Migrations auto-run at boot (`AppDataSource.runMigrations()`); assume they execute on
  every environment on deploy.

## R4. Backward consciousness

- Additive-first: prefer nullable columns, defaults, new tables over destructive changes.
- Destructive steps (drop/rename/type-change) require: operator approval in the task,
  a documented data-safety plan (backup/expand-contract if needed), and matching `down()`.
- Enum column value changes follow the existing pattern of dedicated migrations.

## R5. Seeds

- Seeds run at every boot in fixed order from `src/shared/v1/database/seeds/main.seed.ts`
  (roles → statuses → platform admin → business types → early-access statuses → permissions →
  role-permissions → faq types → faqs). New seeds must be idempotent upserts keyed by a
  stable key (like `permissionKey`) and inserted into that order deliberately.
- Lookup/system data belongs in `categories/{system-init,lookup-data}/<domain>/<name>.seed.ts`.
- Never put volatile business data into seeds; never rely on seeds for runtime behavior.

## R6. Transactions & consistency

- Multi-write invariants must be atomic: wrap with the shared `transactionManager` helper
  and pass the optional `manager` through repository calls (pattern:
  forgot-password-verify handler updating password + revoking sessions).
- Repositories accept `(args, manager?)`; do not open ad-hoc query runners in application code.

## R7. Query cache

- Read caching uses the built-in database-backed cache (`chasha_caches`, default 300s).
- Lists set explicit composite cache keys; after any write that affects cached reads,
  invalidate affected keys via `AppDataSource.queryResultCache?.remove([...])`.
- Forgetting invalidation is a defect, not an optimization.

## R8. Replication awareness

Writes go to master automatically via replication config; design read paths to tolerate
replica lag for cross-request consistency (e.g., read-after-write inside one request should
reuse the same manager/transaction).

## Pre-merge checklist

Model registered & exported · migration created AND re-exported in `src/index.ts` ·
migration runs clean on dev · down() works · naming conventions intact · seeds updated &
idempotent · cache invalidation covered · no accidental synchronize/schema push.
