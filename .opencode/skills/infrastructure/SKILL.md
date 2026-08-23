# Infrastructure

## Purpose

Responsible for the runtime environment the Chasha backend ships into: build artifacts,
runtime configuration, process startup, and environment hygiene — as they actually exist
(manual deployment, no containerization or CI at repo root as of 2026-08-23).

## When This Skill Applies

- Tasks touching build output (`vite.config.ts`, `copy-asset`, `__plugin__/`), asset
  copying, or `dist` layout assumptions (e.g., migration path differences).
- Environment/runtime configuration changes (`.env.example`, env loader behavior).
- Operator-directed infrastructure work (server setup, process management, CI creation).

## Responsibilities

- Protect the build contract: ESM output, `preserveModulesRoot: 'src'` (why production
  migration scripts import without the `src/` prefix), `copy-asset` mirroring `.env*`,
  `.htaccess`, `index.html`, `package.json`, `public/`, `__data__/` into `dist/`.
- Keep runtime configuration explicit and validated through the typed env readers; every
  new variable lands in `.env.example` and is consumed via `EnvValueConfig` patterns.
- Respect the env-loader rule: `.env.{NODE_ENV}` loads from CWD at import time; unset
  `NODE_ENV` means production — always run via npm scripts.
- Do not introduce infrastructure artifacts (Dockerfiles, CI pipelines, nginx configs)
  unless the task explicitly requires them; propose, don't plant.

## Required Knowledge

- Node.js 24 runtime pinning (`engines`, `.nvmrc`) and its implications for features used.
- Process management realities of manual deploys: who restarts on crash, where logs go
  (pino file logger), how uptime is monitored (currently: nothing automatic — report gaps).
- Static hosting hints in the repo (`.htaccess`, root `index.html`) implying an
  Apache-style front — verify actual topology with the operator before relying on it.
- CI/CD fundamentals sufficient to design one when asked (lint → typecheck → test → build),
  without inventing one preemptively.
- Twelve-factor config principles as realized here: config via env only, per-environment files.

## Repository Inspection

1. Build scripts and copy pipeline before changing anything that affects `dist` contents.
2. Env consumption sites for variables being added/renamed (grep before edit).
3. Bootstrap ordering when runtime dependencies change.
4. Existing ignore rules so local-only infra files never enter diffs accidentally.

## Validation

- Production build completes and `dist` contains everything boot requires (migrations
  re-exported, assets copied).
- New env vars documented in `.env.example`; no secrets committed.
- App boots from clean checkout + `.env.development` after changes.

## Common Failure Modes

- Adding runtime files that `copy-asset` does not mirror (works in dev, breaks in prod).
- Renaming env vars without migrating all environments' files and docs.
- Assuming a CI pipeline exists to catch mistakes — none does; gates are local hooks.

## Anti-Patterns

- Snowflake servers: undocumented manual steps that code assumes.
- Committing environment-specific secrets "because it's private".
- Containerizing opportunistically while the operator runs bare-metal.
- Editing generated `dist` content instead of the source pipeline.

## Engineering Expectations

Infrastructure changes are deliberate, reversible, and documented. The engineer treats
"works on my machine" as a bug report waiting to happen and keeps the deploy story
reproducible from the repository alone.

## Definition of Done

- Build/deploy path verified end-to-end for affected pieces; config changes documented;
  zero unapproved infrastructure additions.
