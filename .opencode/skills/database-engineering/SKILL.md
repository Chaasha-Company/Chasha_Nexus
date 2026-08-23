# Database Engineering

## Purpose

Responsible for relational integrity of the Chasha MySQL database: modeling, schema
evolution through migrations, constraints, indexing, transactions, and seed data.
Repo policy: `../../rules/database-rules.md`.

## When This Skill Applies

- Any task adding/changing tables, columns, relations, enums, indexes, or constraints.
- Migration work (creation, review, or troubleshooting) and seed changes.
- Tasks where query correctness depends on schema semantics (soft delete, bilingual columns).

## Responsibilities

- Model within established conventions: centralized `*Model` schemas in
  `src/shared/v1/database/schema/`, UUID PKs `<prefix>_id`, explicit snake_case column
  names, timestamp trio with `@DeleteDateColumn`, `_fa`/`_en` bilingual pairs, MySQL
  `enum` columns for fixed sets, `utf8mb4`.
- Evolve schema only via new migrations (`<13-digit-timestamp>-<Snake_Description>.ts`,
  `up`/`down`); never modify an already-applied migration without explicit authorization.
- Re-export every new migration from `src/index.ts` or production builds will not bundle it.
- Respect the dev/prod datasource path split in migration scripts
  (`src/shared/...data-source.ts` vs dist `shared/...data-source.js`).
- Keep seeds idempotent upserts keyed by stable business keys, inserted deliberately into
  the fixed boot order in `main.seed.ts`.

## Required Knowledge

- Relational modeling: normalization to 3NF as default; denormalization only with a
  stated read-path justification.
- MySQL specifics used here: replication (writes → master; reads may hit replicas),
  InnoDB assumptions, enum column migration patterns.
- Indexing: PK/unique/foreign-key defaults from existing DDL; composite indexes for real
  list queries (search/filter/sort combinations), not speculative ones.
- Transactions and isolation: when multi-write invariants need the shared
  `transactionManager`; read-after-write implications across master/replica.
- Schema evolution safety: additive-first, expand/contract for destructive steps,
  backups before releases.

## Repository Inspection

1. Existing models, relations, and join-column naming for the domain area.
2. Migration history for the affected tables — what has been applied cannot be rewritten.
3. How repositories query the tables (cache keys, soft-delete reliance) before altering them.
4. Seed interplay: will new columns/constraints break upsert seeds at next boot?

## Validation

- Migration runs cleanly on dev (`migration:run:dev`) and `down()` is coherent.
- Naming conventions intact; DataSource entities array + schema barrel updated for new models.
- Cache invalidation keys updated wherever cached reads are affected by writes.
- No `synchronize`-style schema drift; all change flows through migrations.

## Common Failure Modes

- Editing an applied migration file instead of adding a corrective one.
- Forgetting the `src/index.ts` re-export (works in dev, silently missing in production bundle).
- Nullable-column omissions breaking existing rows on deploy (migrations auto-run at boot).
- Seeds that assume fresh databases and crash on second boot.

## Anti-Patterns

- Business logic in triggers/stored procedures; logic belongs in application layers.
- Polymorphic "json everything" columns where a relation is the honest model.
- Indexing every column "for speed"; unused indexes tax writes.
- Hand-editing the database outside migrations.

## Engineering Expectations

Schema changes are treated as irreversible-by-default public contracts. A professional
change states its rollback story and data-safety plan before implementation, not after.

## Definition of Done

- Migration + re-export present and verified; models/seeds consistent; conventions intact;
  destructive steps operator-approved with documented safety plan.
